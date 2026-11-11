import { staticCompletions, mergeJedi, applyTemplate } from "./complete.js";
import { completeWithJedi, initJedi, isJediReady, isPythonReady } from "./python.js";

const HELPERS = [
  { label: "Tab", insert: "    " },
  { label: ":", insert: ":" },
  { label: "(", insert: "(" },
  { label: ")", insert: ")" },
  { label: "[", insert: "[" },
  { label: "]", insert: "]" },
  { label: "{", insert: "{" },
  { label: "}", insert: "}" },
  { label: '"', insert: '"' },
  { label: "'", insert: "'" },
  { label: "=", insert: "=" },
  { label: ",", insert: "," },
  { label: ".", insert: "." },
  { label: "#", insert: "#" },
];

let activeCm = null;
let helperBar = null;
let floating = false;
let hintTimer = 0;
let hintReq = 0;

function ensureHelperBar() {
  if (helperBar) return helperBar;
  helperBar = document.createElement("div");
  helperBar.className = "helper-keys";
  helperBar.setAttribute("aria-label", "Python symbol keys");
  for (const key of HELPERS) {
    const b = document.createElement("button");
    b.type = "button";
    b.textContent = key.label;
    b.addEventListener("mousedown", (e) => {
      e.preventDefault();
      if (!activeCm) return;
      activeCm.replaceSelection(key.insert);
      activeCm.focus();
      if (key.insert === "." || /[A-Za-z_]/.test(key.insert)) {
        scheduleHints(activeCm, 40);
      }
    });
    helperBar.appendChild(b);
  }
  return helperBar;
}

function onViewport() {
  if (!helperBar || !floating) return;
  const vv = window.visualViewport;
  if (!vv) return;
  const keyboard = Math.max(0, window.innerHeight - vv.height - vv.offsetTop);
  if (keyboard > 80) {
    helperBar.classList.add("floating");
    helperBar.style.bottom = `${keyboard}px`;
  } else {
    helperBar.classList.remove("floating");
    helperBar.style.bottom = "";
  }
  clampHintMenu();
}

function clampHintMenu() {
  const menu = document.querySelector(".CodeMirror-hints");
  if (!menu) return;
  const pad = 8;
  const rect = menu.getBoundingClientRect();
  let left = rect.left;
  if (rect.right > window.innerWidth - pad) left = Math.max(pad, window.innerWidth - rect.width - pad);
  if (left < pad) left = pad;
  menu.style.left = `${left}px`;
  const vv = window.visualViewport;
  const kb = vv ? Math.max(0, window.innerHeight - vv.height - vv.offsetTop) : 0;
  const maxBottom = window.innerHeight - kb - pad;
  if (rect.bottom > maxBottom) {
    const top = Math.max(pad, maxBottom - rect.height);
    menu.style.top = `${top}px`;
  }
}

const KIND_LABEL = {
  snippet: "snip",
  keyword: "kw",
  function: "fn",
  method: "method",
  class: "class",
  module: "mod",
  variable: "var",
  property: "prop",
  value: "val",
};

function renderHint(element, _data, completion) {
  element.classList.add("cm-hint-item");
  const kind = document.createElement("span");
  kind.className = `cm-hint-kind kind-${completion.kind || "value"}`;
  kind.textContent = KIND_LABEL[completion.kind] || completion.kind || "";
  const body = document.createElement("span");
  body.className = "cm-hint-body";
  const name = document.createElement("span");
  name.className = "cm-hint-name";
  name.textContent = completion.displayName || completion.text;
  body.appendChild(name);
  if (completion.sig) {
    const sig = document.createElement("span");
    sig.className = "cm-hint-sig";
    sig.textContent = completion.sig;
    body.appendChild(sig);
  }
  if (completion.doc) {
    const doc = document.createElement("span");
    doc.className = "cm-hint-doc";
    doc.textContent = completion.doc;
    body.appendChild(doc);
  }
  element.appendChild(kind);
  element.appendChild(body);
}

function toHintItem(item, from, to) {
  return {
    text: item.name,
    displayName: item.name,
    kind: item.kind,
    sig: item.sig || "",
    doc: item.doc || "",
    template: item.template,
    apply: item.apply,
    render: renderHint,
    from,
    to,
    hint: applyCompletion,
  };
}

function applyCompletion(cm, data, completion) {
  const from = completion.from || data.from;
  const to = completion.to || data.to;
  if (completion.template) {
    const { text, cursor, selLen } = applyTemplate(completion.template);
    cm.replaceRange(text, from, to, "complete");
    const start = cm.posFromIndex(cm.indexFromPos(from) + cursor);
    const end = cm.posFromIndex(cm.indexFromPos(from) + cursor + selLen);
    if (selLen > 0) cm.setSelection(start, end);
    else cm.setCursor(start);
    return;
  }
  let insert = completion.text;
  const after = cm.getRange(to, { line: to.line, ch: to.ch + 1 });
  const isCall = completion.apply === "call" && (completion.kind === "function" || completion.kind === "method" || completion.kind === "class");
  if (isCall && after !== "(" && !/[A-Za-z0-9_]/.test(after)) {
    insert = completion.text + "()";
    cm.replaceRange(insert, from, to, "complete");
    cm.setCursor({ line: from.line, ch: from.ch + completion.text.length + 1 });
    return;
  }
  cm.replaceRange(insert, from, to, "complete");
}

function currentPrefix(cm) {
  const cur = cm.getCursor();
  const lineText = cm.getLine(cur.line);
  const wordMatch = /[A-Za-z_][A-Za-z0-9_]*$/.exec(lineText.slice(0, cur.ch));
  return wordMatch ? wordMatch[0] : "";
}

function shouldComplete(cm) {
  const cur = cm.getCursor();
  const token = cm.getTokenAt(cur);
  if (token.type === "comment") return false;
  // Inside a string, only complete after a dot (string methods).
  const lineText = cm.getLine(cur.line);
  const before = lineText.slice(0, cur.ch);
  if (token.type === "string" && !/\.\s*[A-Za-z_]*$/.test(before)) return false;
  if (/\.\s*[A-Za-z_]*$/.test(before)) return true;
  const prefix = currentPrefix(cm);
  return prefix.length >= 1;
}

function buildHintResult(cm, list, fromCh) {
  const cur = cm.getCursor();
  const from = { line: cur.line, ch: fromCh };
  const to = cur;
  return {
    list: list.map((item) => toHintItem(item, from, to)),
    from,
    to,
  };
}

function pythonCoachHint(cm) {
  const cur = cm.getCursor();
  const lineText = cm.getLine(cur.line) || "";
  const code = cm.getValue();
  const stat = staticCompletions({ code, lineText, ch: cur.ch });
  const prefix = currentPrefix(cm);
  if (!stat.isMember && !prefix) return { list: [], from: cur, to: cur };
  return buildHintResult(cm, stat.list, stat.fromCh);
}

function showHints(cm, { updateWithJedi = true } = {}) {
  if (!cm || !window.CodeMirror?.showHint) return;
  if (!shouldComplete(cm)) {
    cm.closeHint && cm.state.completionActive && cm.state.completionActive.close();
    return;
  }
  const req = ++hintReq;
  const cur = cm.getCursor();
  const lineText = cm.getLine(cur.line) || "";
  const code = cm.getValue();
  const stat = staticCompletions({ code, lineText, ch: cur.ch });
  const prefix = currentPrefix(cm);

  cm.showHint({
    hint: () => buildHintResult(cm, stat.list, stat.fromCh),
    completeSingle: false,
    closeOnUnfocus: false,
    completeOnSingleClick: true,
    container: document.body,
    extraKeys: {
      Tab: (ed, handle) => handle.pick(),
      Enter: (ed, handle) => handle.pick(),
      Esc: (ed, handle) => handle.close(),
    },
  });
  requestAnimationFrame(clampHintMenu);

  if (updateWithJedi && isPythonReady()) {
    const line = cur.line + 1;
    const column = cur.ch;
    const startJedi = isJediReady() ? Promise.resolve(true) : initJedi();
    startJedi.then((ok) => {
      if (!ok || req !== hintReq) return;
      return completeWithJedi(code, line, column);
    }).then((jediList) => {
      if (!jediList || req !== hintReq) return;
      const still = cm.getCursor();
      if (still.line !== cur.line || still.ch !== cur.ch) return;
      if (!cm.state.completionActive) return;
      const merged = mergeJedi(stat.list, jediList, prefix, stat.isMember);
      cm.showHint({
        hint: () => buildHintResult(cm, merged, stat.fromCh),
        completeSingle: false,
        closeOnUnfocus: false,
        completeOnSingleClick: true,
        container: document.body,
        extraKeys: {
          Tab: (ed, handle) => handle.pick(),
          Enter: (ed, handle) => handle.pick(),
          Esc: (ed, handle) => handle.close(),
        },
      });
      requestAnimationFrame(clampHintMenu);
    }).catch(() => {});
  }
}

function scheduleHints(cm, delay = 90) {
  clearTimeout(hintTimer);
  hintTimer = setTimeout(() => showHints(cm), delay);
}

function handleEnter(cm) {
  if (cm.state.completionActive) {
    return window.CodeMirror.Pass;
  }
  const pos = cm.getCursor();
  const line = cm.getLine(pos.line);
  const before = line.slice(0, pos.ch);
  const after = line.slice(pos.ch);
  const indent = (line.match(/^\s*/) || [""])[0];
  const trimmed = before.trimEnd();
  cm.replaceSelection("\n", "end");
  if (/:\s*(#.*)?$/.test(trimmed)) {
    cm.replaceSelection(indent + "    ", "end");
    // If the rest of the line was empty or a comment only, good.
  } else if (/^\s*(return|break|continue|pass|raise)\b/.test(before) && indent.length >= 4 && !after.trim()) {
    cm.replaceSelection(indent.slice(0, indent.length - 4), "end");
  } else {
    cm.replaceSelection(indent, "end");
  }
}

function handleColon(cm) {
  cm.replaceSelection(":", "end");
  // Electric indent: if this is an if/for/def/class header, keep current indent.
  return;
}

export function mountEditor(host, { value = "", onChange } = {}) {
  host.innerHTML = "";
  const wrap = document.createElement("div");
  wrap.className = "editor-wrap";
  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("aria-label", "Python code editor");
  textarea.spellcheck = false;
  textarea.autocapitalize = "off";
  textarea.autocomplete = "off";
  textarea.autocorrect = "off";
  wrap.appendChild(textarea);
  const keys = ensureHelperBar();
  keys.classList.remove("floating");
  keys.style.bottom = "";
  wrap.appendChild(keys);
  host.appendChild(wrap);

  const cm = window.CodeMirror.fromTextArea(textarea, {
    mode: "python",
    theme: "material-darker",
    lineNumbers: true,
    indentUnit: 4,
    tabSize: 4,
    indentWithTabs: false,
    lineWrapping: true,
    viewportMargin: Infinity,
    autoCloseBrackets: true,
    matchBrackets: true,
    extraKeys: {
      Tab: (ed) => {
        if (ed.state.completionActive) return window.CodeMirror.Pass;
        ed.replaceSelection("    ");
      },
      "Ctrl-Space": (ed) => showHints(ed),
      "Cmd-Space": (ed) => showHints(ed),
      Enter: handleEnter,
    },
  });
  cm.setValue(value || "");
  cm.setSize("100%", "auto");
  if (onChange) cm.on("change", () => onChange(cm.getValue()));

  cm.on("inputRead", (ed, change) => {
    if (!change || (change.origin !== "+input" && change.origin !== "*compose" && change.origin !== "+complete")) return;
    if (change.origin === "+complete") return;
    const text = (change.text || []).join("");
    if (!text) return;
    const last = text.slice(-1);
    if (last === "." || /[A-Za-z0-9_]/.test(last) || text.length > 1) {
      scheduleHints(ed, last === "." ? 20 : 90);
    }
  });

  cm.on("keydown", (ed, ev) => {
    // Arrow keys are handled by the hint widget when it is open.
    if (ev.key === " " && ev.ctrlKey) {
      ev.preventDefault();
      showHints(ed);
    }
  });

  cm.on("focus", () => {
    activeCm = cm;
    floating = true;
    onViewport();
  });
  cm.on("blur", () => {
    setTimeout(() => {
      if (activeCm === cm && !cm.hasFocus()) {
        floating = false;
        keys.classList.remove("floating");
        keys.style.bottom = "";
        // Delay close so a tap on a hint is still registered.
        setTimeout(() => {
          if (!cm.hasFocus() && cm.state.completionActive) {
            const menu = document.querySelector(".CodeMirror-hints:hover");
            if (!menu) cm.state.completionActive.close();
          }
        }, 180);
      }
    }, 200);
  });
  window.visualViewport?.addEventListener("resize", onViewport);
  window.visualViewport?.addEventListener("scroll", onViewport);
  setTimeout(() => cm.refresh(), 40);
  // Warm Jedi in the background once Python is up, without blocking the lesson.
  if (isPythonReady()) initJedi().catch(() => {});

  return {
    getValue: () => cm.getValue(),
    setValue: (v) => cm.setValue(v),
    focus: () => cm.focus(),
    refresh: () => cm.refresh(),
    showHints: () => showHints(cm),
    cm,
  };
}

export { showHints };
