/* Ped-thon Python worker — Pyodide runs off the UI thread so loops can be stopped. */
let pyodide = null;
let loadedPackages = new Set();
let usedIndex = "";

const PRELUDE = `
import sys, io, json, math, traceback, base64, types

# --- Visual helpers (turtle, HTML preview, tiny game API) ---
class _Turtle:
    def __init__(self, book):
        self._book = book
        self.x = 0.0
        self.y = 0.0
        self.heading_deg = 0.0
        self.pen_down = True
        self.color = "#3ee0b2"
        self.fill = None
        self._fill_pts = []
        self.width = 2

    def _pt(self):
        return [self.x, self.y]

    def _move(self, nx, ny):
        if self.pen_down:
            self._book.append({"t": "line", "x1": self.x, "y1": self.y, "x2": nx, "y2": ny, "c": self.color, "w": self.width})
        if self.fill is not None:
            self._fill_pts.append([nx, ny])
        self.x, self.y = nx, ny

    def forward(self, d):
        import math
        r = math.radians(self.heading_deg)
        self._move(self.x + d * math.cos(r), self.y + d * math.sin(r))
    fd = forward
    def backward(self, d):
        self.forward(-d)
    bk = backward
    back = backward
    def right(self, a):
        self.heading_deg = (self.heading_deg - a) % 360
    rt = right
    def left(self, a):
        self.heading_deg = (self.heading_deg + a) % 360
    lt = left
    def goto(self, x, y=None):
        if y is None and isinstance(x, (tuple, list)):
            x, y = x
        self._move(float(x), float(y))
    setpos = goto
    setposition = goto
    def setheading(self, a):
        self.heading_deg = float(a) % 360
    seth = setheading
    def heading(self):
        return self.heading_deg
    def pendown(self):
        self.pen_down = True
    pd = pendown
    down = pendown
    def penup(self):
        self.pen_down = False
    pu = penup
    up = penup
    def pencolor(self, *c):
        if not c:
            return self.color
        self.color = _turtle_color(c[0] if len(c) == 1 else c)
    def pensize(self, w=None):
        if w is None:
            return self.width
        self.width = w
    width = pensize
    def begin_fill(self):
        self.fill = self.color
        self._fill_pts = [self._pt()]
    def end_fill(self):
        if self._fill_pts:
            self._book.append({"t": "poly", "pts": self._fill_pts[:], "c": self.fill or self.color})
        self.fill = None
        self._fill_pts = []
    def circle(self, radius, extent=360):
        import math
        steps = max(12, int(abs(extent) / 8))
        for i in range(steps):
            self.left(extent / steps)
            self.forward(2 * math.pi * abs(radius) * (abs(extent) / 360) / steps)
    def dot(self, size=8, color=None):
        col = _turtle_color(color) if color is not None else self.color
        self._book.append({"t": "circle", "x": self.x, "y": self.y, "r": size / 2, "c": col})
    def home(self):
        self.pen_down = False
        self.goto(0, 0)
        self.setheading(0)
        self.pen_down = True
    def position(self):
        return (self.x, self.y)
    pos = position
    def speed(self, *a):
        return None
    def hideturtle(self):
        return None
    ht = hideturtle
    def showturtle(self):
        return None
    st = showturtle

def _turtle_color(c):
    if isinstance(c, str):
        return c
    if isinstance(c, (tuple, list)) and len(c) >= 3:
        r, g, b = c[:3]
        if max(r, g, b) <= 1:
            r, g, b = int(r * 255), int(g * 255), int(b * 255)
        return f"#{int(r):02x}{int(g):02x}{int(b):02x}"
    return "#3ee0b2"

_turtle_cmds = []
_html_preview = None
_game = {"active": False, "w": 360, "h": 240, "update": None, "draw": None, "state": None}

def _default_turtle():
    if not hasattr(_default_turtle, "t"):
        _default_turtle.t = _Turtle(_turtle_cmds)
    return _default_turtle.t

def Turtle(*a, **k):
    return _Turtle(_turtle_cmds)

def forward(d): _default_turtle().forward(d)
def fd(d): _default_turtle().forward(d)
def backward(d): _default_turtle().backward(d)
def bk(d): _default_turtle().backward(d)
def right(a): _default_turtle().right(a)
def rt(a): _default_turtle().right(a)
def left(a): _default_turtle().left(a)
def lt(a): _default_turtle().left(a)
def goto(x, y=None): _default_turtle().goto(x, y)
def setheading(a): _default_turtle().setheading(a)
def pendown(): _default_turtle().pendown()
def penup(): _default_turtle().penup()
def pencolor(*c): return _default_turtle().pencolor(*c)
def pensize(w=None): return _default_turtle().pensize(w)
def begin_fill(): _default_turtle().begin_fill()
def end_fill(): _default_turtle().end_fill()
def circle(r, extent=360): _default_turtle().circle(r, extent)
def dot(size=8, color=None): _default_turtle().dot(size, color)
def home(): _default_turtle().home()
def done(): return None
def exitonclick(): return None
def speed(*a): return None
def bgcolor(*c):
    col = _turtle_color(c[0] if len(c)==1 else c) if c else "#0b1220"
    _turtle_cmds.insert(0, {"t": "clear", "c": col})

class _TurtleModule:
    pass
# will be bound in the namespace

def show_html(s):
    global _html_preview
    _html_preview = str(s)
    return s

class _GameDraw:
    def __init__(self):
        self.cmds = []
    def clear(self, color="#0b1220"):
        self.cmds.append({"t": "clear", "c": color})
    def rect(self, x, y, w, h, color="#3ee0b2"):
        self.cmds.append({"t": "rect", "x": x, "y": y, "w": w, "h": h, "c": color})
    def circle(self, x, y, r, color="#3ee0b2"):
        self.cmds.append({"t": "circle", "x": x, "y": y, "r": r, "c": color})
    def line(self, x1, y1, x2, y2, color="#e8eef8", width=2):
        self.cmds.append({"t": "line", "x1": x1, "y1": y1, "x2": x2, "y2": y2, "c": color, "w": width})
    def text(self, x, y, s, color="#e8eef8", size=16):
        self.cmds.append({"t": "text", "x": x, "y": y, "s": str(s), "c": color, "sz": size})

def _game_set_size(w, h):
    _game["w"] = int(w)
    _game["h"] = int(h)

def _game_run(update, draw=None):
    _game["active"] = True
    _game["update"] = update
    _game["draw"] = draw

# Build a 'turtle' and 'game' module-like object later in the harness.
`;

function postStatus(state, message) {
  self.postMessage({ type: "status", state, message });
}

function normalizeIndex(url) {
  return url.endsWith("/") ? url : url + "/";
}

async function boot(indexURLs) {
  let lastErr = null;
  for (const raw of indexURLs) {
    const indexURL = normalizeIndex(raw);
    postStatus("loading", `Starting Python from ${indexURL.includes("/pyodide/") && !indexURL.includes("http") || indexURL.includes(self.location.host) ? "Ped-thon (this app)" : "a backup copy"}…`);
    try {
      const mod = await import(/* webpackIgnore: true */ indexURL + "pyodide.mjs");
      const engine = await mod.loadPyodide({ indexURL });
      usedIndex = indexURL;
      loadedPackages = new Set();
      return engine;
    } catch (err) {
      lastErr = err;
    }
  }
  const friendly = friendlyInitError(lastErr);
  throw new Error(friendly);
}

function friendlyInitError(err) {
  const msg = String(err && err.message ? err.message : err || "");
  if (/Failed to fetch dynamically imported module|Failed to fetch|Load failed|NetworkError|import/i.test(msg)) {
    return "Could not start Python. The phone may still be using an older app cache, or the network dropped while downloading. Tap Retry. If it keeps failing, close Ped-thon completely and open it again (or clear this site's data in Chrome).";
  }
  return "Could not start Python. Tap Retry to try again. If you just installed or updated the app, close it and reopen it once.";
}

async function ensurePackages(packages = []) {
  const needed = packages.filter((p) => p && !loadedPackages.has(p));
  if (!needed.length) return;
  postStatus("loading", `Loading ${needed.join(", ")}…`);
  await pyodide.loadPackage(needed);
  needed.forEach((p) => loadedPackages.add(p));
  if (needed.includes("matplotlib") || loadedPackages.has("matplotlib")) {
    try {
      await pyodide.runPythonAsync("import matplotlib\nmatplotlib.use('Agg')\n");
    } catch (e) { /* backend may already be set */ }
  }
}

function detectPackages(code, requested) {
  const set = new Set(requested || []);
  if (/\b(matplotlib|pyplot|plt\.)\b/.test(code)) {
    set.add("matplotlib");
    set.add("numpy");
  }
  if (/\b(numpy|np\.)\b/.test(code)) set.add("numpy");
  if (/\b(pandas|pd\.)\b/.test(code)) {
    set.add("pandas");
    set.add("numpy");
  }
  if (/\bjedi\b/.test(code)) set.add("jedi");
  return [...set];
}

function setupPrelude() {
  // already registered in the Python global runtime via runPython
}

const HARNESS = `
_turtle_cmds.clear()
# reset default turtle
if hasattr(_default_turtle, "t"):
    delattr(_default_turtle, "t")
_html_preview = None
_game["active"] = False
try:
    import matplotlib
    matplotlib.use("Agg")
    import matplotlib.pyplot as plt
    plt.close("all")
except Exception:
    pass
_game["update"] = None
_game["draw"] = None

import types as _types
_turtle_mod = _types.ModuleType("turtle")
for _name in ["Turtle","forward","fd","backward","bk","right","rt","left","lt","goto","setheading","pendown","penup","pencolor","pensize","begin_fill","end_fill","circle","dot","home","done","exitonclick","speed","bgcolor"]:
    setattr(_turtle_mod, _name, globals()[_name])
sys.modules["turtle"] = _turtle_mod

_game_mod = _types.ModuleType("game")
_game_mod.set_size = _game_set_size
_game_mod.run = _game_run
sys.modules["game"] = _game_mod

_out = io.StringIO()
_err = io.StringIO()
_inputs = list(_mock_inputs.to_py() if hasattr(_mock_inputs, "to_py") else list(_mock_inputs))

def _input(prompt=""):
    if prompt not in (None, ""):
        print(prompt, end="" if str(prompt).endswith(chr(10)) else "")
    if not _inputs:
        raise EOFError("Your code asked for input, but no more input was provided.")
    return str(_inputs.pop(0))

_ns = {
    "__name__": "__main__",
    "input": _input,
    "Turtle": Turtle,
    "forward": forward, "fd": fd,
    "backward": backward, "bk": bk,
    "right": right, "rt": rt,
    "left": left, "lt": lt,
    "goto": goto, "setheading": setheading,
    "pendown": pendown, "penup": penup,
    "pencolor": pencolor, "pensize": pensize,
    "begin_fill": begin_fill, "end_fill": end_fill,
    "circle": circle, "dot": dot, "home": home,
    "done": done, "exitonclick": exitonclick,
    "speed": speed, "bgcolor": bgcolor,
    "show_html": show_html,
    "game": _game_mod,
}
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
                loc = {"_ns": _ns, "_stdout": _stdout, "_ok": False, "_turtle_cmds": _turtle_cmds, "_html_preview": _html_preview, "_game": _game, "_student_code": _student_code}
                exec(c.get("code") or "pass", loc, loc)
                ok = bool(loc.get("_ok", True))
                if "assert" in (c.get("code") or "") and "_ok" not in (c.get("code") or ""):
                    ok = True
            else:
                ok = False
                msg = "Unknown check type."
        except Exception as e:
            ok = False
            msg = (c.get("message") or msg) + f" ({type(e).__name__}: {e})"
        _results.append({"ok": bool(ok), "message": msg})

# Capture previews
_images = []
try:
    import matplotlib
    matplotlib.use("Agg")
    import matplotlib.pyplot as plt
    for _num in list(plt.get_fignums()):
        _fig = plt.figure(_num)
        _buf = io.BytesIO()
        _fig.savefig(_buf, format="png", bbox_inches="tight", dpi=120, facecolor=_fig.get_facecolor())
        _images.append(base64.b64encode(_buf.getvalue()).decode("ascii"))
    plt.close("all")
except Exception:
    pass

_html = _html_preview
if _html is None:
    for _cand in ("html", "page", "website", "webpage"):
        _v = _ns.get(_cand)
        if isinstance(_v, str) and ("<" in _v and ">" in _v):
            _html = _v
            break

_payload = json.dumps({
    "stdout": _stdout,
    "stderr": _stderr,
    "error": _exc,
    "traceback": _tb,
    "results": _results,
    "preview": {
        "images": _images,
        "turtle": list(_turtle_cmds),
        "html": _html,
        "game": {"active": bool(_game["active"]), "w": _game["w"], "h": _game["h"]} if _game["active"] else None,
    },
})
_payload
`;

async function runStudent(code, options = {}) {
  if (!pyodide) throw new Error("Python is not ready yet.");
  const packs = detectPackages(code, options.packages || []);
  await ensurePackages(packs);
  pyodide.globals.set("_student_code", code);
  pyodide.globals.set("_mock_inputs", options.inputs || []);
  pyodide.globals.set("_checks_json", JSON.stringify(options.checks || []));
  const payload = await pyodide.runPythonAsync(HARNESS);
  const data = JSON.parse(payload);
  data.passed = !data.error && (data.results || []).every((r) => r.ok);
  if (!(options.checks && options.checks.length) && !data.error) data.passed = true;
  return data;
}

async function tickGame(payload) {
  if (!pyodide) throw new Error("Python is not ready yet.");
  pyodide.globals.set("_tick_keys", payload.keys || {});
  pyodide.globals.set("_tick_dt", payload.dt || 0.016);
  const raw = await pyodide.runPythonAsync(`
import json
_cmds = []
_keys = _tick_keys.to_py() if hasattr(_tick_keys, "to_py") else dict(_tick_keys)
_dt = float(_tick_dt)
_ended = False
_err = None
try:
    if _game.get("update"):
        _game["update"](_dt, _keys)
    _d = _GameDraw()
    if _game.get("draw"):
        _game["draw"](_d)
    _cmds = _d.cmds
except Exception as e:
    _err = type(e).__name__ + ": " + str(e)
json.dumps({"cmds": _cmds, "error": _err, "w": _game.get("w", 360), "h": _game.get("h", 240)})
`);
  return JSON.parse(raw);
}

async function completeJedi(code, line, column) {
  if (!pyodide) return [];
  try {
    await ensurePackages(["jedi"]);
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
    return [];
  }
}

self.onmessage = async (event) => {
  const msg = event.data || {};
  const { id, type } = msg;
  try {
    if (type === "init") {
      postStatus("loading", "Downloading Python… the first time can take a minute, then it stays on this device.");
      pyodide = await boot(msg.indexURLs || []);
      await pyodide.runPythonAsync(PRELUDE);
      postStatus("ready", "Python is ready.");
      self.postMessage({ id, type: "ok", result: { indexURL: usedIndex } });
      return;
    }
    if (type === "run") {
      const result = await runStudent(msg.code || "", {
        inputs: msg.inputs || [],
        checks: msg.checks || [],
        packages: msg.packages || [],
      });
      self.postMessage({ id, type: "ok", result });
      return;
    }
    if (type === "tick") {
      const result = await tickGame(msg);
      self.postMessage({ id, type: "ok", result });
      return;
    }
    if (type === "complete") {
      const result = await completeJedi(msg.code, msg.line, msg.column);
      self.postMessage({ id, type: "ok", result });
      return;
    }
    if (type === "loadPackages") {
      await ensurePackages(msg.packages || []);
      self.postMessage({ id, type: "ok", result: true });
      return;
    }
    throw new Error("Unknown worker message: " + type);
  } catch (err) {
    self.postMessage({
      id,
      type: "error",
      error: String(err && err.message ? err.message : err),
      traceback: String(err && err.stack ? err.stack : err),
    });
  }
};
