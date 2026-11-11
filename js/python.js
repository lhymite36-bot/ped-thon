const DEFAULT_RUN_TIMEOUT = 15000;
const INIT_TIMEOUT = 180000;
const PACKAGE_TIMEOUT = 120000;

function selfHostedIndex() {
  try {
    return new URL("../pyodide/", import.meta.url).href;
  } catch {
    const path = location.pathname.replace(/\/index\.html$/, "/");
    const dir = path.endsWith("/") ? path : path.replace(/\/[^/]*$/, "/");
    return `${location.origin}${dir}pyodide/`;
  }
}

export function pyodideIndexCandidates() {
  return [
    selfHostedIndex(),
    "https://cdn.jsdelivr.net/pyodide/v0.27.7/full/",
    "https://unpkg.com/pyodide@0.27.7/",
  ];
}

let worker = null;
let ready = false;
let starting = null;
let seq = 0;
const pending = new Map();
const listeners = new Set();
let usedIndex = "";

export function onPythonStatus(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function emit(state, message) {
  for (const fn of listeners) {
    try { fn(state, message); } catch { /* ignore */ }
  }
}

function friendlyError(err) {
  const msg = String(err && err.message ? err.message : err || "");
  if (/Failed to fetch dynamically imported module|Failed to fetch|Load failed|NetworkError/i.test(msg)) {
    return "Could not start Python. The app may still be using an old cache, or the download was interrupted. Tap Retry. If that does not help, close Ped-thon completely and open it again — or in Chrome, clear data for this site and reopen the app.";
  }
  if (/timed out|timeout/i.test(msg)) {
    return msg;
  }
  if (/Worker|Python is not ready/i.test(msg) && !/Could not start/.test(msg)) {
    return msg;
  }
  return msg || "Something went wrong while running Python.";
}

function attachWorker(w) {
  w.onmessage = (event) => {
    const msg = event.data || {};
    if (msg.type === "status") {
      emit(msg.state, msg.message);
      return;
    }
    if (msg.id == null) return;
    const waiter = pending.get(msg.id);
    if (!waiter) return;
    pending.delete(msg.id);
    if (msg.type === "ok") waiter.resolve(msg.result);
    else waiter.reject(new Error(friendlyError(msg.error || "Python worker error")));
  };
  w.onerror = (event) => {
    const err = new Error(friendlyError(event.message || "The Python worker crashed."));
    emit("error", err.message);
    for (const [id, waiter] of pending) {
      pending.delete(id);
      waiter.reject(err);
    }
  };
}

function spawnWorker() {
  const w = new Worker(new URL("./python-worker.js", import.meta.url), { type: "module" });
  attachWorker(w);
  return w;
}

function callWorker(type, payload, timeoutMs) {
  if (!worker) throw new Error("Python is not ready yet.");
  const id = ++seq;
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      pending.delete(id);
      reject(new Error("This took too long and was stopped. Tap Retry, or press Stop sooner next time if you wrote a loop that never ends."));
    }, timeoutMs);
    pending.set(id, {
      resolve: (v) => { clearTimeout(timer); resolve(v); },
      reject: (e) => { clearTimeout(timer); reject(e); },
    });
    worker.postMessage({ id, type, ...payload });
  });
}

export function isPythonReady() {
  return ready;
}

export async function stopPython() {
  const err = new Error("Stopped.");
  if (worker) {
    try { worker.terminate(); } catch { /* ignore */ }
  }
  worker = null;
  ready = false;
  starting = null;
  for (const [, waiter] of pending) waiter.reject(err);
  pending.clear();
  emit("error", "Python was stopped. Tap Retry to start it again.");
}

export async function initPython() {
  if (ready && worker) return true;
  if (starting) return starting;
  emit("loading", "Getting Python ready… first load may take a minute, then it works offline.");
  starting = (async () => {
    if (!worker) worker = spawnWorker();
    try {
      const result = await callWorker("init", { indexURLs: pyodideIndexCandidates() }, INIT_TIMEOUT);
      usedIndex = result?.indexURL || selfHostedIndex();
      ready = true;
      emit("ready", "Python is ready.");
      return true;
    } catch (err) {
      ready = false;
      starting = null;
      try { worker?.terminate(); } catch { /* ignore */ }
      worker = null;
      const message = friendlyError(err);
      emit("error", message);
      throw new Error(message);
    }
  })();
  return starting;
}

export async function retryPython() {
  await stopPython();
  emit("loading", "Retrying Python…");
  return initPython();
}

export async function ensurePackages(packages = []) {
  await initPython();
  if (!packages.length) return;
  await callWorker("loadPackages", { packages }, PACKAGE_TIMEOUT);
}

export async function runStudentCode(code, options = {}) {
  await initPython();
  const packs = options.packages || [];
  const timeout = options.timeoutMs || (packs.length ? PACKAGE_TIMEOUT : DEFAULT_RUN_TIMEOUT);
  try {
    return await callWorker("run", {
      code,
      inputs: options.inputs || [],
      checks: options.checks || [],
      packages: packs,
    }, timeout);
  } catch (err) {
    const message = friendlyError(err);
    if (/too long|Stopped/i.test(message)) {
      // Kill a runaway loop, then bring Python back in the background.
      const snapshot = message;
      stopPython().then(() => initPython().catch(() => {}));
      return {
        stdout: "",
        stderr: "",
        error: snapshot,
        traceback: snapshot,
        results: (options.checks || []).map((c) => ({ ok: false, message: snapshot })),
        passed: false,
        preview: null,
        stopped: true,
      };
    }
    return {
      stdout: "",
      stderr: "",
      error: message,
      traceback: message,
      results: (options.checks || []).map((c) => ({ ok: false, message: c.message || message })),
      passed: false,
      preview: null,
    };
  }
}

export async function runPlayground(code, options = {}) {
  return runStudentCode(code, { checks: [], ...options });
}

export async function tickGame(payload) {
  if (!ready || !worker) return { cmds: [], error: "Python is not ready yet." };
  try {
    return await callWorker("tick", payload, 4000);
  } catch (err) {
    return { cmds: [], error: friendlyError(err) };
  }
}

let jediReady = false;
let jediFailed = false;
let jediLoading = null;

export function isJediReady() {
  return jediReady;
}

export async function initJedi() {
  if (jediReady) return true;
  if (jediFailed) return false;
  if (jediLoading) return jediLoading;
  jediLoading = (async () => {
    try {
      await initPython();
      emit("loading", "Loading smart autocomplete…");
      await ensurePackages(["jedi"]);
      jediReady = true;
      emit("ready", "Python is ready.");
      return true;
    } catch {
      jediFailed = true;
      jediReady = false;
      emit("ready", "Python is ready.");
      return false;
    }
  })();
  return jediLoading;
}

export async function completeWithJedi(code, line, column) {
  if (!jediReady || !worker) return null;
  try {
    return await callWorker("complete", { code, line, column }, 4000);
  } catch {
    return null;
  }
}

export function currentIndexURL() {
  return usedIndex;
}
