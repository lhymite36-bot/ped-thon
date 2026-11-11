const PYODIDE_INDEX = "https://cdn.jsdelivr.net/pyodide/v0.27.7/full/";

let pyodide = null;
let loading = null;
const loadedPackages = new Set(["micropip"]); // micropip may come later
const listeners = new Set();

export function onPythonStatus(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function emit(state, message) {
  for (const fn of listeners) {
    try { fn(state, message); } catch { /* ignore */ }
  }
}

export function isPythonReady() {
  return Boolean(pyodide);
}

export async function initPython() {
  if (pyodide) return pyodide;
  if (loading) return loading;
  if (typeof loadPyodide !== "function") {
    emit("error", "The Python engine script did not load. Check your connection and refresh.");
    throw new Error("Pyodide script missing");
  }
  emit("loading", "Downloading Python… first time can take a minute, then it works offline.");
  loading = (async () => {
    try {
      pyodide = await loadPyodide({ indexURL: PYODIDE_INDEX });
      emit("ready", "Python is ready.");
      return pyodide;
    } catch (err) {
      loading = null;
      emit("error", "Could not start Python. Go online once so it can finish downloading.");
      throw err;
    }
  })();
  return loading;
}

export async function ensurePackages(packages = []) {
  await initPython();
  const needed = packages.filter((p) => p && !loadedPackages.has(p));
  if (!needed.length) return;
  emit("loading", `Loading ${needed.join(", ")}…`);
  await pyodide.loadPackage(needed);
  needed.forEach((p) => loadedPackages.add(p));
  emit("ready", "Python is ready.");
}

function asJson(value) {
  if (value === undefined) return null;
  return value;
}

export async function runStudentCode(code, options = {}) {
  await ensurePackages(options.packages || []);
  const inputs = options.inputs || [];
  const checks = options.checks || [];

  pyodide.globals.set("_student_code", code);
  pyodide.globals.set("_mock_inputs", inputs);
  pyodide.globals.set("_checks_json", JSON.stringify(checks));

  const harness = `
import sys, io, json, math, traceback, types
_out = io.StringIO()
_err = io.StringIO()
_inputs = list(_mock_inputs.to_py() if hasattr(_mock_inputs, "to_py") else list(_mock_inputs))

def _input(prompt=""):
    if prompt not in (None, ""):
        print(prompt, end="" if str(prompt).endswith(chr(10)) else "")
    if not _inputs:
        raise EOFError("Your code asked for input, but no more input was provided.")
    return str(_inputs.pop(0))

_ns = {"__name__": "__main__", "input": _input}
_exc = None
_tb = None
_old_out, _old_err = sys.stdout, sys.stderr
sys.stdout, sys.stderr = _out, _err
try:
    exec(_student_code, _ns)
except Exception as e:
    _exc = type(e).__name__ + ": " + str(e)
    _tb = traceback.format_exc()
finally:
    sys.stdout, sys.stderr = _old_out, _old_err

def _close(v):
    if isinstance(v, float) and isinstance(_expect_tmp, (int, float)):
        return abs(v - float(_expect_tmp)) <= 1e-6
    return v == _expect_tmp

def _to_js(v):
    try:
        json.dumps(v)
        return v
    except TypeError:
        return repr(v)

_checks = json.loads(_checks_json)
_results = []
_stdout = _out.getvalue()
_stderr = _err.getvalue()

if _exc:
    for c in _checks:
        _results.append({"ok": False, "message": c.get("message") or "The program raised an error before this check could run."})
else:
    for c in _checks:
        typ = c.get("type")
        msg = c.get("message") or "Check failed."
        ok = False
        try:
            if typ == "stdout_contains":
                val = str(c.get("value", ""))
                hay = _stdout if c.get("caseSensitive", True) else _stdout.lower()
                needle = val if c.get("caseSensitive", True) else val.lower()
                ok = needle in hay
            elif typ == "stdout_equals":
                got = _stdout.strip()
                exp = str(c.get("value", "")).strip()
                if not c.get("caseSensitive", True):
                    got, exp = got.lower(), exp.lower()
                ok = got == exp
            elif typ == "stdout_lines":
                lines = [ln.rstrip() for ln in _stdout.strip().splitlines()]
                exp = list(c.get("value") or [])
                ok = lines == exp
            elif typ == "var_equals":
                name = c.get("name")
                if name not in _ns:
                    ok = False
                    msg = c.get("message") or f"Create a variable named {name}."
                else:
                    _expect_tmp = c.get("value")
                    got = _ns[name]
                    if isinstance(got, float) and isinstance(_expect_tmp, (int, float)):
                        ok = abs(got - float(_expect_tmp)) <= 1e-6
                    elif isinstance(got, set) and isinstance(_expect_tmp, list):
                        ok = got == set(_expect_tmp)
                    elif isinstance(got, tuple) and isinstance(_expect_tmp, list):
                        ok = list(got) == _expect_tmp
                    else:
                        ok = got == _expect_tmp
            elif typ == "var_type":
                name = c.get("name")
                typenames = c.get("value")
                if isinstance(typenames, str):
                    typenames = [typenames]
                if name not in _ns:
                    ok = False
                    msg = c.get("message") or f"Create a variable named {name}."
                else:
                    ok = type(_ns[name]).__name__ in typenames
            elif typ == "func":
                name = c.get("name")
                fn = _ns.get(name)
                if not callable(fn):
                    ok = False
                    msg = c.get("message") or f"Define a function named {name}."
                else:
                    got = fn(*(c.get("args") or []), **(c.get("kwargs") or {}))
                    _expect_tmp = c.get("expect")
                    if isinstance(got, float) and isinstance(_expect_tmp, (int, float)):
                        ok = abs(got - float(_expect_tmp)) <= 1e-6
                    elif isinstance(got, (tuple, set)) and isinstance(_expect_tmp, list):
                        ok = list(got) == list(_expect_tmp) if not isinstance(got, set) else got == set(_expect_tmp)
                    else:
                        ok = got == _expect_tmp
            elif typ == "source_contains":
                needle = str(c.get("value", ""))
                src = _student_code
                if not c.get("caseSensitive", True):
                    src, needle = src.lower(), needle.lower()
                ok = needle in src
            elif typ == "python":
                loc = {"_ns": _ns, "_stdout": _stdout, "_ok": False}
                exec(c.get("code") or "pass", _ns, loc)
                ok = bool(loc.get("_ok", True))
                # If the snippet sets _ok, use it; if it only asserts, success means no error.
                if "assert" in (c.get("code") or "") and "_ok" not in (c.get("code") or ""):
                    ok = True
            else:
                ok = False
                msg = "Unknown check type."
        except Exception as e:
            ok = False
            msg = (c.get("message") or msg) + f" ({type(e).__name__}: {e})"
        _results.append({"ok": bool(ok), "message": msg})

_payload = json.dumps({
    "stdout": _stdout,
    "stderr": _stderr,
    "error": _exc,
    "traceback": _tb,
    "results": _results,
})
_payload
`;

  try {
    const payload = await pyodide.runPythonAsync(harness);
    const data = JSON.parse(payload);
    data.passed = !data.error && (data.results || []).every((r) => r.ok);
    if (!(checks && checks.length) && !data.error) data.passed = true;
    return data;
  } catch (err) {
    return {
      stdout: "",
      stderr: "",
      error: String(err),
      traceback: String(err),
      results: checks.map((c) => ({ ok: false, message: c.message || "The Python engine hit a problem." })),
      passed: false,
    };
  }
}

export async function runPlayground(code) {
  return runStudentCode(code, { checks: [] });
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
      try {
        await pyodide.loadPackage("jedi");
      } catch {
        await pyodide.loadPackage("micropip");
        await pyodide.runPythonAsync("import micropip; await micropip.install('jedi')");
      }
      await pyodide.runPythonAsync("import jedi");
      jediReady = true;
      emit("ready", "Python is ready.");
      return true;
    } catch (err) {
      jediFailed = true;
      jediReady = false;
      emit("ready", "Python is ready.");
      return false;
    } finally {
      // if we failed or succeeded, don't leave status stuck on loading
    }
  })();
  return jediLoading;
}

export async function completeWithJedi(code, line, column) {
  if (!jediReady) return null;
  try {
    pyodide.globals.set("_jc_code", String(code ?? ""));
    pyodide.globals.set("_jc_line", line);
    pyodide.globals.set("_jc_col", column);
    const payload = await pyodide.runPythonAsync(`
import json, jedi
out = []
try:
    script = jedi.Script(_jc_code)
    comps = script.complete(line=int(_jc_line), column=int(_jc_col))
    for c in comps[:40]:
        name = c.name or ""
        typ = c.type or ""
        doc = ""
        try:
            desc = getattr(c, "description", "") or ""
            doc = str(desc)[:180]
        except Exception:
            doc = ""
        out.append({"name": name, "type": typ, "doc": doc, "sig": ""})
except Exception:
    out = []
json.dumps(out)
`);
    return JSON.parse(payload);
  } catch {
    return null;
  }
}
