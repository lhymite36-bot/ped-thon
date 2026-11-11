function hasVisual(preview) {
  if (!preview) return false;
  if (preview.images && preview.images.length) return true;
  if (preview.turtle && preview.turtle.length) return true;
  if (preview.html) return true;
  if (preview.game && preview.game.active) return true;
  return false;
}

export { hasVisual };

function cssColor(c, fallback = "#3ee0b2") {
  return c || fallback;
}

function worldToCanvas(x, y, w, h, bounds) {
  const { minX, maxX, minY, maxY } = bounds;
  const sx = w / Math.max(1, maxX - minX);
  const sy = h / Math.max(1, maxY - minY);
  const s = Math.min(sx, sy);
  const cx = (minX + maxX) / 2;
  const cy = (minY + maxY) / 2;
  return {
    x: w / 2 + (x - cx) * s,
    y: h / 2 - (y - cy) * s,
    s,
  };
}

function turtleBounds(cmds) {
  let minX = -80, maxX = 80, minY = -80, maxY = 80;
  const bump = (x, y) => {
    minX = Math.min(minX, x); maxX = Math.max(maxX, x);
    minY = Math.min(minY, y); maxY = Math.max(maxY, y);
  };
  for (const c of cmds) {
    if (c.t === "line") { bump(c.x1, c.y1); bump(c.x2, c.y2); }
    else if (c.t === "circle") { bump(c.x - c.r, c.y - c.r); bump(c.x + c.r, c.y + c.r); }
    else if (c.t === "poly") for (const p of c.pts || []) bump(p[0], p[1]);
    else if (c.t === "rect") { bump(c.x, c.y); bump(c.x + c.w, c.y + c.h); }
  }
  const pad = 20;
  return { minX: minX - pad, maxX: maxX + pad, minY: minY - pad, maxY: maxY + pad };
}

export function drawCommands(ctx, cmds, width, height, { turtleSpace = false } = {}) {
  const bounds = turtleSpace ? turtleBounds(cmds) : null;
  const map = (x, y) => {
    if (!turtleSpace) return { x, y };
    return worldToCanvas(x, y, width, height, bounds);
  };
  ctx.clearRect(0, 0, width, height);
  for (const c of cmds || []) {
    if (c.t === "clear") {
      ctx.fillStyle = cssColor(c.c, "#0b1220");
      ctx.fillRect(0, 0, width, height);
    } else if (c.t === "line") {
      const a = map(c.x1, c.y1);
      const b = map(c.x2, c.y2);
      ctx.strokeStyle = cssColor(c.c);
      ctx.lineWidth = c.w || 2;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    } else if (c.t === "rect") {
      const p = map(c.x, c.y);
      const s = turtleSpace ? worldToCanvas(c.x + c.w, c.y + c.h, width, height, bounds) : { x: p.x + c.w, y: p.y + c.h };
      ctx.fillStyle = cssColor(c.c);
      ctx.fillRect(p.x, p.y, s.x - p.x, s.y - p.y);
    } else if (c.t === "circle") {
      const p = map(c.x, c.y);
      const r = turtleSpace ? Math.max(1, (c.r || 0) * (map(c.x + (c.r || 0), c.y).x - p.x) / Math.max(c.r, 1)) : (c.r || 0);
      ctx.fillStyle = cssColor(c.c);
      ctx.beginPath();
      ctx.arc(p.x, p.y, Math.abs(r) || 2, 0, Math.PI * 2);
      ctx.fill();
    } else if (c.t === "poly") {
      const pts = (c.pts || []).map((pt) => map(pt[0], pt[1]));
      if (!pts.length) continue;
      ctx.fillStyle = cssColor(c.c);
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (const p of pts.slice(1)) ctx.lineTo(p.x, p.y);
      ctx.closePath();
      ctx.fill();
    } else if (c.t === "text") {
      const p = map(c.x, c.y);
      ctx.fillStyle = cssColor(c.c, "#e8eef8");
      ctx.font = `${c.sz || 16}px system-ui, sans-serif`;
      ctx.textBaseline = "top";
      ctx.fillText(c.s, p.x, p.y);
    }
  }
}

export function renderPreview(panel, preview, { onNeedGame, stopGame } = {}) {
  if (stopGame) stopGame();
  panel.innerHTML = "";
  if (!hasVisual(preview)) {
    panel.innerHTML = `<p class="muted">Nothing visual this time. Print text shows in Output. For a picture, try matplotlib, turtle, show_html(), or the game module — see Build for examples.</p>`;
    return;
  }
  if (preview.images && preview.images.length) {
    for (const src of preview.images) {
      const img = document.createElement("img");
      img.className = "preview-image";
      img.alt = "Chart from your Python code";
      img.src = `data:image/png;base64,${src}`;
      panel.appendChild(img);
    }
  }
  if (preview.turtle && preview.turtle.length) {
    const wrap = document.createElement("div");
    wrap.className = "preview-canvas-wrap";
    const canvas = document.createElement("canvas");
    const w = Math.min(360, panel.clientWidth || 360);
    const h = Math.round(w * 0.75);
    canvas.width = w * 2;
    canvas.height = h * 2;
    canvas.style.width = "100%";
    canvas.style.height = "auto";
    wrap.appendChild(canvas);
    panel.appendChild(wrap);
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#0b1220";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.scale(2, 2);
    drawCommands(ctx, preview.turtle, w, h, { turtleSpace: true });
  }
  if (preview.html) {
    const frame = document.createElement("iframe");
    frame.className = "preview-frame";
    frame.setAttribute("sandbox", "allow-scripts allow-forms allow-modals");
    frame.title = "HTML preview";
    frame.srcdoc = preview.html;
    panel.appendChild(frame);
  }
  if (preview.game && preview.game.active && onNeedGame) {
    onNeedGame(preview.game, panel);
  }
}

export function mountGame(panel, game, { tick } = {}) {
  const wrap = document.createElement("div");
  wrap.className = "preview-canvas-wrap game-wrap";
  const canvas = document.createElement("canvas");
  const logicalW = game.w || 360;
  const logicalH = game.h || 240;
  canvas.width = logicalW;
  canvas.height = logicalH;
  canvas.style.width = "100%";
  canvas.style.height = "auto";
  canvas.tabIndex = 0;
  wrap.appendChild(canvas);
  const pad = document.createElement("div");
  pad.className = "game-pad";
  pad.innerHTML = `
    <button type="button" data-key="ArrowLeft" aria-label="Left">◀</button>
    <div class="game-pad-mid">
      <button type="button" data-key="ArrowUp" aria-label="Up">▲</button>
      <button type="button" data-key="ArrowDown" aria-label="Down">▼</button>
    </div>
    <button type="button" data-key="ArrowRight" aria-label="Right">▶</button>
    <button type="button" data-key=" " class="game-action" aria-label="Action">●</button>
  `;
  wrap.appendChild(pad);
  panel.appendChild(wrap);

  const keys = Object.create(null);
  const setKey = (key, down) => {
    keys[key] = down;
    keys.left = !!(keys.ArrowLeft || keys.a || keys.A);
    keys.right = !!(keys.ArrowRight || keys.d || keys.D);
    keys.up = !!(keys.ArrowUp || keys.w || keys.W);
    keys.down = !!(keys.ArrowDown || keys.s || keys.S);
    keys.action = !!(keys[" "] || keys.Enter);
  };

  const onKey = (e, down) => {
    if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", " "].includes(e.key)) e.preventDefault();
    setKey(e.key, down);
  };
  const keydown = (e) => onKey(e, true);
  const keyup = (e) => onKey(e, false);
  window.addEventListener("keydown", keydown);
  window.addEventListener("keyup", keyup);

  pad.querySelectorAll("button").forEach((btn) => {
    const key = btn.dataset.key;
    const down = (e) => { e.preventDefault(); setKey(key, true); };
    const up = (e) => { e.preventDefault(); setKey(key, false); };
    btn.addEventListener("pointerdown", down);
    btn.addEventListener("pointerup", up);
    btn.addEventListener("pointerleave", up);
    btn.addEventListener("pointercancel", up);
  });

  const ctx = canvas.getContext("2d");
  let raf = 0;
  let last = performance.now();
  let stopped = false;
  const loop = async (now) => {
    if (stopped) return;
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    try {
      const result = await tick({ dt, keys: { ...keys } });
      if (stopped) return;
      if (result?.cmds) drawCommands(ctx, result.cmds, logicalW, logicalH, { turtleSpace: false });
      if (result?.error) {
        ctx.fillStyle = "#ff7a86";
        ctx.font = "12px system-ui";
        ctx.fillText(result.error, 8, 16);
      }
    } catch { /* ignore a missed frame */ }
    raf = requestAnimationFrame(loop);
  };
  raf = requestAnimationFrame(loop);
  canvas.focus();

  return () => {
    stopped = true;
    cancelAnimationFrame(raf);
    window.removeEventListener("keydown", keydown);
    window.removeEventListener("keyup", keyup);
  };
}
