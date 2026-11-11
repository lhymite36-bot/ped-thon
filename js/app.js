import {
  modules,
  getModule,
  getChallenge,
  allChallenges,
  totalChallengeCount,
  challengeIdsFor,
} from "./curriculum.js";
import { getDailyChallenge, getDailyQuiz } from "./daily.js";
import * as store from "./storage.js";
import { mountEditor } from "./editor.js";
import {
  initPython,
  onPythonStatus,
  runStudentCode,
  runPlayground,
  initJedi,
} from "./python.js";
import { hasApiKey, explainError, giveHint } from "./ai.js";

const appEl = () => document.getElementById("app");
let editor = null;
let deferredPrompt = null;

function refreshPills() {
  const p = store.loadProgress();
  const streak = document.getElementById("pill-streak");
  const xp = document.getElementById("pill-xp");
  if (streak) streak.textContent = `🔥 ${p.streak || 0}`;
  if (xp) xp.textContent = `⚡ ${p.xp || 0} XP`;
}

function toast(msg) {
  const el = document.getElementById("toast");
  if (!el) return;
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(toast._t);
  toast._t = setTimeout(() => el.classList.remove("show"), 2800);
}

function setNav(name) {
  document.querySelectorAll(".bottom-nav a").forEach((a) => {
    a.classList.toggle("active", a.dataset.nav === name);
  });
}

function hideSplash() {
  const el = document.getElementById("splash");
  if (!el || el.classList.contains("hiding")) return;
  el.classList.add("hiding");
  el.setAttribute("aria-hidden", "true");
  setTimeout(() => el.remove(), 450);
}

function isStandalone() {
  return window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
}

function installBannerHtml() {
  if (isStandalone() || localStorage.getItem("ped-thon-hide-install") === "1") return "";
  return `<div class="install-banner visible card" id="install-banner">
    <h3>Install Ped-thon</h3>
    <p class="muted">Add it to your home screen and use it like a real app — even offline after the first load.</p>
    <div class="install-actions">
      <button class="btn btn-primary" id="btn-install" type="button">Install app</button>
      <button class="btn btn-ghost" id="btn-install-help" type="button">How?</button>
      <button class="btn btn-ghost" id="btn-install-dismiss" type="button">Not now</button>
    </div>
    <p class="muted hidden" id="install-help" style="margin-top:10px">On a Samsung phone in Chrome, tap the menu (⋮), then <strong>Install app</strong> or <strong>Add to Home screen</strong>. On a computer, look for the install icon in the address bar.</p>
  </div>`;
}

function bindInstall() {
  const banner = document.getElementById("install-banner");
  if (!banner) return;
  document.getElementById("btn-install-dismiss")?.addEventListener("click", () => {
    localStorage.setItem("ped-thon-hide-install", "1");
    banner.remove();
  });
  document.getElementById("btn-install-help")?.addEventListener("click", () => {
    document.getElementById("install-help")?.classList.toggle("hidden");
  });
  document.getElementById("btn-install")?.addEventListener("click", async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice.catch(() => null);
      deferredPrompt = null;
      if (choice?.outcome === "accepted") banner.remove();
    } else {
      document.getElementById("install-help")?.classList.remove("hidden");
    }
  });
}

function displayName() {
  return (store.loadSettings().name || "").trim();
}

function casesOf(challenge) {
  if (challenge.cases && challenge.cases.length) return challenge.cases;
  return [{ inputs: challenge.inputs || [], checks: challenge.checks || [] }];
}

function moduleProgress(mod) {
  const ids = challengeIdsFor(mod.id);
  const done = store.completedCount(ids);
  return { done, total: ids.length };
}

function nextRecommended() {
  for (const mod of modules) {
    const { done, total } = moduleProgress(mod);
    if (done < total) {
      const ch = mod.challenges.find((c) => !store.isComplete(c.id));
      return { mod, ch };
    }
  }
  return null;
}

function renderHome(root) {
  setNav("home");
  const p = store.loadProgress();
  const total = totalChallengeCount();
  const done = store.completedCount(allChallenges().map((c) => c.id));
  const next = nextRecommended();
  const daily = store.getDaily();
  const name = displayName();
  const hello = name ? `Welcome back, ${escapeHtml(name)}` : "Welcome back";
  const dailyDone = Boolean(daily?.challengeDone);
  const quizDone = typeof daily?.quizScore === "number";

  root.innerHTML = `
    ${installBannerHtml()}
    <h1>${hello}</h1>
    <p class="muted">Ped-thon is your Python practice gym. A little every day goes a long way.</p>
    <div class="hero-stats">
      <div class="stat"><b>${p.xp || 0}</b><span>XP</span></div>
      <div class="stat"><b>${p.streak || 0}</b><span>Day streak</span></div>
      <div class="stat"><b>${done}/${total}</b><span>Challenges</span></div>
    </div>
    <div class="progress-bar" style="margin-bottom:16px"><span style="width:${total ? (done / total) * 100 : 0}%"></span></div>
    ${next ? `<a class="card cta" href="#/lesson/${next.mod.id}/${next.ch.id}" style="display:block;text-decoration:none;color:inherit">
      <div class="muted" style="font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase">Continue</div>
      <h2 style="margin-top:4px">${escapeHtml(next.mod.title)}</h2>
      <p class="muted" style="margin:0">Next: ${escapeHtml(next.ch.title)}</p>
    </a>` : `<div class="card cta"><h2>Path complete</h2><p class="muted" style="margin:0">You finished every lesson challenge. Keep the streak going with the daily practice.</p></div>`}
    <a class="card" href="#/daily" style="display:block;text-decoration:none;color:inherit">
      <div class="row space">
        <div>
          <h2>Daily practice</h2>
          <p class="muted" style="margin:0">${dailyDone ? "Today's coding challenge is done." : "A fresh coding challenge is waiting."}${quizDone ? " Quiz done." : " Plus a short quiz."}</p>
        </div>
        <span class="pill">${dailyDone && quizDone ? "✓" : "Today"}</span>
      </div>
    </a>
    <div class="grid-2">
      <a class="card" href="#/playground" style="text-decoration:none;color:inherit"><h3>Playground</h3><p class="muted" style="margin:0">Free coding, no tests.</p></a>
      <a class="card" href="#/review" style="text-decoration:none;color:inherit"><h3>Review</h3><p class="muted" style="margin:0">${store.getOpenMistakes().length} open mistake${store.getOpenMistakes().length === 1 ? "" : "s"}.</p></a>
    </div>
  `;
  bindInstall();
}

function renderLearn(root) {
  setNav("learn");
  root.innerHTML = `
    <h1>Learn</h1>
    <p class="muted">Twelve modules, from the first print to a taste of NumPy and Pandas. Jump around whenever you like.</p>
    <div class="module-list">
      ${modules.map((m, i) => {
        const { done, total } = moduleProgress(m);
        const pct = total ? Math.round((done / total) * 100) : 0;
        return `<a class="module-item" href="#/lesson/${m.id}">
          <div class="mod-icon">${m.icon || "📘"}</div>
          <div class="grow">
            <strong>${i + 1}. ${escapeHtml(m.title)}</strong>
            <div class="mod-meta">${escapeHtml(m.subtitle || "")} · ${done}/${total}</div>
            <div class="progress-bar" style="margin-top:8px"><span style="width:${pct}%"></span></div>
          </div>
          <div class="mod-check">${done === total && total ? "Done" : ""}</div>
        </a>`;
      }).join("")}
    </div>
  `;
}

function renderLesson(root, moduleId, challengeId) {
  setNav("learn");
  const mod = getModule(moduleId);
  if (!mod) {
    root.innerHTML = `<p>That lesson was not found.</p><a class="back" href="#/learn">← Back to Learn</a>`;
    return;
  }
  const challenges = mod.challenges || [];
  const ch = getChallenge(moduleId, challengeId) || challenges[0];
  const idx = challenges.findIndex((c) => c.id === ch.id);
  const { done, total } = moduleProgress(mod);

  root.innerHTML = `
    <a class="back" href="#/learn">← All modules</a>
    <h1>${escapeHtml(mod.title)}</h1>
    <p class="muted">${done}/${total} challenges complete</p>
    <div class="lesson-body" id="lesson-body">
      <h2>${escapeHtml(mod.lesson.title)}</h2>
      ${mod.lesson.html}
      <button class="toggle-lesson" id="toggle-lesson" type="button">Hide lesson</button>
    </div>
    <div class="chips">
      ${challenges.map((c, i) => `<a class="chip ${c.id === ch.id ? "on" : ""}" href="#/lesson/${mod.id}/${c.id}">${store.isComplete(c.id) ? "✓ " : ""}${i + 1}</a>`).join("")}
    </div>
    <div class="challenge-head">
      <div class="challenge-count">Challenge ${idx + 1} of ${challenges.length}</div>
      <h2>${escapeHtml(ch.title)}</h2>
      <p>${escapeHtml(ch.prompt)}</p>
    </div>
    <div id="editor-host"></div>
    <div class="btn-row" style="margin-top:10px">
      <button class="btn" id="btn-run" type="button">Run</button>
      <button class="btn btn-primary" id="btn-check" type="button">Check answer</button>
    </div>
    <div class="btn-row" style="margin-top:8px">
      <button class="btn btn-warn" id="btn-hint" type="button">Hint</button>
      ${hasApiKey() ? `<button class="btn" id="btn-ai-hint" type="button">Give me a hint</button>
      <button class="btn" id="btn-ai-error" type="button">Explain my error</button>` : ""}
      <button class="btn btn-ghost hidden" id="btn-solution" type="button">Reveal solution</button>
    </div>
    <div id="hint-area"></div>
    <div id="ai-area"></div>
    <div class="output empty" id="output">Output will show up here.</div>
    <div class="result-list" id="results"></div>
    <div class="row space" style="margin-top:12px">
      ${idx > 0 ? `<a class="btn" href="#/lesson/${mod.id}/${challenges[idx - 1].id}">Previous</a>` : `<span></span>`}
      ${idx < challenges.length - 1 ? `<a class="btn btn-primary" href="#/lesson/${mod.id}/${challenges[idx + 1].id}">Next</a>` : `<a class="btn" href="#/learn">Back to modules</a>`}
    </div>
  `;

  editor = mountEditor(document.getElementById("editor-host"), {
    value: ch.starter || "",
  });

  const hintArea = document.getElementById("hint-area");
  const aiArea = document.getElementById("ai-area");
  const out = document.getElementById("output");
  const results = document.getElementById("results");
  const solBtn = document.getElementById("btn-solution");
  let lastRun = null;
  let hintsShown = store.getHintsUsed(ch.id);
  if (store.getAttempts(ch.id) >= 2) solBtn.classList.remove("hidden");

  const lessonBody = document.getElementById("lesson-body");
  const fullLesson = `<h2>${escapeHtml(mod.lesson.title)}</h2>${mod.lesson.html}`;
  const bindToggle = () => {
    const btn = document.getElementById("toggle-lesson");
    if (!btn) return;
    btn.onclick = () => {
      if (lessonBody.classList.contains("collapsed")) {
        lessonBody.classList.remove("collapsed");
        lessonBody.innerHTML = `${fullLesson}<button class="toggle-lesson" id="toggle-lesson" type="button">Hide lesson</button>`;
      } else {
        lessonBody.classList.add("collapsed");
        lessonBody.innerHTML = `<button class="toggle-lesson" id="toggle-lesson" type="button">Show lesson</button>`;
      }
      bindToggle();
    };
  };
  bindToggle();

  function showOutput(run, { checking } = {}) {
    lastRun = run;
    if (run.error) {
      out.className = "output err";
      out.textContent = (run.traceback || run.error || "").trim();
    } else if ((run.stdout || "").length) {
      out.className = "output";
      out.textContent = run.stdout;
    } else {
      out.className = "output empty";
      out.textContent = checking ? "The program ran, but printed nothing." : "The program ran, but printed nothing.";
    }
  }

  document.getElementById("btn-run").addEventListener("click", async () => {
    const btn = document.getElementById("btn-run");
    btn.disabled = true;
    try {
      const first = casesOf(ch)[0];
      const run = await runStudentCode(editor.getValue(), {
        inputs: first.inputs || [],
        checks: [],
        packages: ch.packages || [],
      });
      results.innerHTML = "";
      showOutput(run);
    } catch (err) {
      out.className = "output err";
      out.textContent = String(err);
    } finally {
      btn.disabled = false;
    }
  });

  document.getElementById("btn-check").addEventListener("click", async () => {
    const btn = document.getElementById("btn-check");
    btn.disabled = true;
    results.innerHTML = "";
    try {
      const code = editor.getValue();
      const packs = ch.packages || [];
      const cases = casesOf(ch);
      let allPass = true;
      let combined = [];
      let last = null;
      for (let i = 0; i < cases.length; i++) {
        const c = cases[i];
        const run = await runStudentCode(code, {
          inputs: c.inputs || [],
          checks: c.checks || [],
          packages: packs,
        });
        last = run;
        if (run.error) allPass = false;
        const labeled = (run.results || []).map((r) => ({
          ...r,
          message: cases.length > 1 ? `Case ${i + 1}: ${r.message}` : r.message,
        }));
        if (labeled.some((r) => !r.ok) || !labeled.length && run.error) allPass = false;
        if (labeled.length) combined.push(...labeled);
        else if (run.error) combined.push({ ok: false, message: cases.length > 1 ? `Case ${i + 1}: ${run.error}` : run.error });
      }
      allPass = allPass && combined.length > 0 && combined.every((r) => r.ok);
      showOutput(last, { checking: true });
      results.innerHTML = combined.map((r) => `<div class="result-item ${r.ok ? "pass" : "fail"}">${r.ok ? "✓" : "✗"} ${escapeHtml(r.message)}</div>`).join("");

      if (allPass) {
        const already = store.isComplete(ch.id);
        if (!already) {
          const hints = store.getHintsUsed(ch.id);
          const usedSol = Boolean(store.loadProgress().usedSolution[ch.id]);
          let gained = ch.xp || 10;
          if (!hints && !usedSol) gained += 5;
          store.markComplete(ch.id);
          store.addXp(gained);
          refreshPills();
          toast(`Nice work! +${gained} XP`);
        } else {
          store.touchStreak();
          refreshPills();
          toast("Still correct. Streak kept up to date.");
        }
      } else {
        const attempts = store.recordAttempt(ch.id, true);
        store.recordMistake({
          challengeId: ch.id,
          moduleId: mod.id,
          title: ch.title,
          error: last?.error || combined.find((r) => !r.ok)?.message || "Check failed",
        });
        if (attempts >= 2) solBtn.classList.remove("hidden");
      }
    } catch (err) {
      out.className = "output err";
      out.textContent = String(err);
    } finally {
      btn.disabled = false;
    }
  });

  document.getElementById("btn-hint").addEventListener("click", () => {
    const list = ch.hints || [];
    if (!list.length) {
      hintArea.innerHTML = `<div class="hint-box">No written hints for this one — try the playground ideas in the lesson.</div>`;
      return;
    }
    const n = Math.min(store.recordHint(ch.id), list.length);
    hintsShown = n;
    hintArea.innerHTML = list.slice(0, n).map((h, i) => `<div class="hint-box"><strong>Hint ${i + 1}</strong>\n${escapeHtml(h)}</div>`).join("");
  });

  solBtn.addEventListener("click", () => {
    store.markSolutionUsed(ch.id);
    document.getElementById("hint-area").insertAdjacentHTML(
      "beforeend",
      `<div class="solution-box"><strong>Solution</strong><pre class="code">${escapeHtml(ch.solution || "")}</pre></div>`
    );
    solBtn.disabled = true;
  });

  document.getElementById("btn-ai-hint")?.addEventListener("click", async (e) => {
    e.target.disabled = true;
    aiArea.innerHTML = `<div class="ai-box">Thinking of a hint…</div>`;
    try {
      const official = (ch.hints || [])[Math.max(0, hintsShown - 1)] || "";
      const text = await giveHint({
        code: editor.getValue(),
        prompt: ch.prompt,
        hintLevel: hintsShown + 1,
        officialHint: official,
      });
      store.recordHint(ch.id);
      aiArea.innerHTML = `<div class="ai-box">${escapeHtml(text)}</div>`;
    } catch (err) {
      aiArea.innerHTML = `<div class="ai-box">${escapeHtml(err.message || String(err))}</div>`;
    } finally {
      e.target.disabled = false;
    }
  });

  document.getElementById("btn-ai-error")?.addEventListener("click", async (e) => {
    if (!lastRun || (!lastRun.error && !lastRun.stderr)) {
      aiArea.innerHTML = `<div class="ai-box">Run or check your code first so I can see the error.</div>`;
      return;
    }
    e.target.disabled = true;
    aiArea.innerHTML = `<div class="ai-box">Reading the error…</div>`;
    try {
      const text = await explainError({
        code: editor.getValue(),
        error: lastRun.error,
        traceback: lastRun.traceback,
        prompt: ch.prompt,
      });
      aiArea.innerHTML = `<div class="ai-box">${escapeHtml(text)}</div>`;
    } catch (err) {
      aiArea.innerHTML = `<div class="ai-box">${escapeHtml(err.message || String(err))}</div>`;
    } finally {
      e.target.disabled = false;
    }
  });
}

function renderPlayground(root) {
  setNav("playground");
  const saved = localStorage.getItem("ped-thon-playground") || "print(\"Hello from Ped-thon\")\n";
  root.innerHTML = `
    <h1>Playground</h1>
    <p class="muted">Write any Python you like. Nothing is graded here. Your last draft is saved on this device.</p>
    <div id="editor-host"></div>
    <div class="btn-row" style="margin-top:10px">
      <button class="btn btn-primary" id="btn-run" type="button">Run</button>
      <button class="btn" id="btn-clear" type="button">Clear</button>
    </div>
    <div class="output empty" id="output">Output will show up here.</div>
  `;
  editor = mountEditor(document.getElementById("editor-host"), {
    value: saved,
    onChange: (v) => localStorage.setItem("ped-thon-playground", v),
  });
  const out = document.getElementById("output");
  document.getElementById("btn-run").addEventListener("click", async (e) => {
    e.target.disabled = true;
    try {
      const run = await runPlayground(editor.getValue());
      if (run.error) {
        out.className = "output err";
        out.textContent = (run.traceback || run.error || "").trim();
      } else {
        out.className = run.stdout ? "output" : "output empty";
        out.textContent = run.stdout || "The program ran, but printed nothing.";
      }
    } catch (err) {
      out.className = "output err";
      out.textContent = String(err);
    } finally {
      e.target.disabled = false;
    }
  });
  document.getElementById("btn-clear").addEventListener("click", () => {
    editor.setValue("");
    localStorage.setItem("ped-thon-playground", "");
  });
}

function renderDaily(root) {
  setNav("daily");
  const challenge = getDailyChallenge();
  const quiz = getDailyQuiz();
  const state = store.getDaily() || {};
  root.innerHTML = `
    <h1>Daily practice</h1>
    <p class="muted">A new coding challenge and a short quiz every day. Come back tomorrow for a different set.</p>
    <div class="card">
      <div class="challenge-count">Today's challenge</div>
      <h2>${escapeHtml(challenge.title)}</h2>
      <p>${escapeHtml(challenge.prompt)}</p>
      <div id="editor-host"></div>
      <div class="btn-row" style="margin-top:10px">
        <button class="btn" id="btn-run" type="button">Run</button>
        <button class="btn btn-primary" id="btn-check" type="button">Check answer</button>
        <button class="btn btn-warn" id="btn-hint" type="button">Hint</button>
        <button class="btn btn-ghost hidden" id="btn-solution" type="button">Reveal solution</button>
      </div>
      <div id="hint-area"></div>
      <div class="output empty" id="output">Output will show up here.</div>
      <div class="result-list" id="results"></div>
    </div>
    <div class="card" id="quiz-card" style="margin-top:14px">
      <h2>Quick quiz</h2>
      <p class="muted">Five questions. Predict the output, or pick the right idea.</p>
      <div id="quiz"></div>
    </div>
  `;
  editor = mountEditor(document.getElementById("editor-host"), { value: challenge.starter || "" });
  const out = document.getElementById("output");
  const results = document.getElementById("results");
  const solBtn = document.getElementById("btn-solution");
  const hintArea = document.getElementById("hint-area");
  const dailyKey = `daily-${challenge.id}-${store.todayStamp()}`;
  if (store.getAttempts(dailyKey) >= 2) solBtn.classList.remove("hidden");

  document.getElementById("btn-run").addEventListener("click", async (e) => {
    e.target.disabled = true;
    try {
      const run = await runStudentCode(editor.getValue(), { inputs: [], checks: [], packages: challenge.packages || [] });
      out.className = run.error ? "output err" : run.stdout ? "output" : "output empty";
      out.textContent = run.error ? (run.traceback || run.error) : (run.stdout || "The program ran, but printed nothing.");
    } finally {
      e.target.disabled = false;
    }
  });

  document.getElementById("btn-check").addEventListener("click", async (e) => {
    e.target.disabled = true;
    try {
      const run = await runStudentCode(editor.getValue(), {
        inputs: [],
        checks: challenge.checks || [],
        packages: challenge.packages || [],
      });
      const passed = run.passed && !run.error;
      out.className = run.error ? "output err" : run.stdout ? "output" : "output empty";
      out.textContent = run.error ? (run.traceback || run.error) : (run.stdout || "The program ran, but printed nothing.");
      results.innerHTML = (run.results || []).map((r) => `<div class="result-item ${r.ok ? "pass" : "fail"}">${r.ok ? "✓" : "✗"} ${escapeHtml(r.message)}</div>`).join("");
      if (passed) {
        if (!store.getDaily()?.challengeDone) {
          store.setDaily({ challengeDone: true });
          store.addXp(challenge.xp || 15);
          refreshPills();
          toast(`Daily challenge complete! +${challenge.xp || 15} XP`);
        } else {
          store.touchStreak();
          refreshPills();
          toast("Correct again.");
        }
      } else {
        const attempts = store.recordAttempt(dailyKey, true);
        if (attempts >= 2) solBtn.classList.remove("hidden");
      }
    } finally {
      e.target.disabled = false;
    }
  });

  document.getElementById("btn-hint").addEventListener("click", () => {
    const n = Math.min(store.recordHint(dailyKey), (challenge.hints || []).length);
    hintArea.innerHTML = (challenge.hints || []).slice(0, n).map((h, i) => `<div class="hint-box"><strong>Hint ${i + 1}</strong>\n${escapeHtml(h)}</div>`).join("");
  });
  solBtn.addEventListener("click", () => {
    hintArea.insertAdjacentHTML("beforeend", `<div class="solution-box"><strong>Solution</strong><pre class="code">${escapeHtml(challenge.solution || "")}</pre></div>`);
    solBtn.disabled = true;
  });

  const quizEl = document.getElementById("quiz");
  if (typeof state.quizScore === "number") {
    quizEl.innerHTML = `<p>You scored <strong>${state.quizScore}/${quiz.length}</strong> today. Come back tomorrow for a new set.</p>`;
  } else {
    quizEl.innerHTML = quiz.map((item, i) => `
      <div class="quiz-q" data-q="${i}" style="margin-top:16px">
        <p style="white-space:pre-wrap;font-family:${/print\(|range\(|type\(/.test(item.q) ? "var(--mono)" : "inherit"}"><strong>${i + 1}.</strong> ${escapeHtml(item.q)}</p>
        ${item.options.map((opt, j) => `<button type="button" class="quiz-option" data-q="${i}" data-a="${j}">${escapeHtml(opt)}</button>`).join("")}
        <p class="muted hidden" data-explain="${i}"></p>
      </div>
    `).join("") + `<button class="btn btn-primary btn-block hidden" id="quiz-finish" type="button" style="margin-top:14px">See score</button>`;

    const answers = {};
    quizEl.addEventListener("click", (e) => {
      const btn = e.target.closest(".quiz-option");
      if (!btn) return;
      const q = Number(btn.dataset.q);
      const a = Number(btn.dataset.a);
      if (answers[q] !== undefined) return;
      answers[q] = a;
      const item = quiz[q];
      const group = quizEl.querySelectorAll(`.quiz-option[data-q="${q}"]`);
      group.forEach((b) => {
        b.disabled = true;
        if (Number(b.dataset.a) === item.answer) b.classList.add("correct");
      });
      if (a !== item.answer) btn.classList.add("wrong");
      const exp = quizEl.querySelector(`[data-explain="${q}"]`);
      if (exp) {
        exp.textContent = item.explain;
        exp.classList.remove("hidden");
      }
      if (Object.keys(answers).length === quiz.length) {
        document.getElementById("quiz-finish")?.classList.remove("hidden");
      }
    });
    document.getElementById("quiz-finish")?.addEventListener("click", () => {
      let score = 0;
      quiz.forEach((item, i) => { if (answers[i] === item.answer) score += 1; });
      store.setDaily({ quizScore: score, quizTotal: quiz.length });
      store.addXp(score * 4);
      refreshPills();
      toast(`Quiz: ${score}/${quiz.length}. +${score * 4} XP`);
      document.getElementById("quiz-finish").disabled = true;
    });
  }
}

function renderReview(root) {
  setNav("settings");
  const open = store.getOpenMistakes();
  root.innerHTML = `
    <a class="back" href="#/settings">← Settings</a>
    <h1>Review mistakes</h1>
    <p class="muted">These are challenges you missed. Fix one and it will leave this list.</p>
    ${open.length === 0 ? `<div class="card"><p style="margin:0">No open mistakes. Nice — try a daily quiz or the playground.</p></div>` : open.map((m) => `
      <a class="card" href="#/lesson/${m.moduleId}/${m.challengeId}" style="display:block;text-decoration:none;color:inherit">
        <strong>${escapeHtml(m.title)}</strong>
        <p class="muted" style="margin:6px 0 0;white-space:pre-wrap">${escapeHtml(m.error || "")}</p>
      </a>
    `).join("")}
  `;
}

function renderSettings(root) {
  setNav("settings");
  const s = store.loadSettings();
  const p = store.loadProgress();
  root.innerHTML = `
    ${installBannerHtml()}
    <h1>Settings</h1>
    <div class="card">
      <label class="field" for="set-name">What should Ped-thon call you?</label>
      <input class="input" id="set-name" type="text" maxlength="40" placeholder="Your name" value="${escapeAttr(s.name || "")}" />
      <label class="field" for="set-key">Optional Gemini API key (AI tutor)</label>
      <input class="input" id="set-key" type="password" autocomplete="off" spellcheck="false" placeholder="Paste a key to enable hints from Gemini" value="${escapeAttr(s.geminiKey || "")}" />
      <p class="muted">The key is stored only on this device, in localStorage. It is never uploaded to Ped-thon. The app works fully without it. Create a free key in Google AI Studio if you want the “Explain my error” and “Give me a hint” buttons.</p>
      <button class="btn btn-primary" id="btn-save" type="button">Save</button>
    </div>
    <div class="card">
      <h2>Install Ped-thon</h2>
      <p class="muted">You are ${isStandalone() ? "already using the installed app." : "in the browser. Use Install app on the home page, or Chrome’s menu → Install app / Add to Home screen."}</p>
      <p class="muted">After the first visit, lessons, the editor, and Python stay available offline. The optional AI tutor still needs an internet connection.</p>
    </div>
    <div class="card">
      <h2>Your progress</h2>
      <p>${p.xp || 0} XP · ${p.streak || 0} day streak · ${store.completedCount(allChallenges().map((c) => c.id))} challenges complete</p>
      <p><a href="#/review">Review mistakes (${store.getOpenMistakes().length})</a></p>
      <button class="btn btn-danger" id="btn-reset" type="button">Reset progress</button>
    </div>
    <div class="card">
      <h2>About Ped-thon</h2>
      <p class="muted">A free Python practice app for learners. Code runs in your browser with Pyodide. Built for phones and computers.</p>
    </div>
  `;
  bindInstall();
  document.getElementById("btn-save").addEventListener("click", () => {
    store.saveSettings({
      name: document.getElementById("set-name").value.trim(),
      geminiKey: document.getElementById("set-key").value.trim(),
    });
    toast("Saved on this device.");
    refreshPills();
  });
  document.getElementById("btn-reset").addEventListener("click", () => {
    if (confirm("Reset all XP, streaks, and completed challenges on this device? This cannot be undone.")) {
      store.resetProgress();
      refreshPills();
      toast("Progress has been reset.");
      renderSettings(root);
    }
  });
}

function escapeHtml(s) {
  return String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
function escapeAttr(s) {
  return escapeHtml(s);
}

function render() {
  refreshPills();
  const raw = (location.hash || "#/").replace(/^#/, "");
  const parts = raw.split("/").filter(Boolean);
  const root = parts[0] || "home";
  const host = appEl();
  editor = null;
  if (root === "learn") renderLearn(host);
  else if (root === "lesson") renderLesson(host, parts[1], parts[2]);
  else if (root === "daily") renderDaily(host);
  else if (root === "playground") renderPlayground(host);
  else if (root === "settings") renderSettings(host);
  else if (root === "review") renderReview(host);
  else renderHome(host);
  hideSplash();
  window.scrollTo(0, 0);
}

window.addEventListener("hashchange", render);
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
});
window.addEventListener("appinstalled", () => {
  deferredPrompt = null;
  document.getElementById("install-banner")?.remove();
  toast("Ped-thon is installed. Open it from your home screen.");
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
}

onPythonStatus((state, message) => {
  const box = document.getElementById("python-status");
  const text = document.getElementById("python-status-text");
  if (!box || !text) return;
  text.textContent = message;
  if (state === "ready") {
    box.classList.remove("error");
    box.classList.add("visible");
    setTimeout(() => box.classList.remove("visible"), 900);
  } else if (state === "error") {
    box.classList.add("visible", "error");
  } else {
    box.classList.add("visible");
    box.classList.remove("error");
  }
});

initPython()
  .then(() => initJedi().catch(() => {}))
  .catch(() => {});

render();
