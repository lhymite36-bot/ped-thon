const KEY = "ped-thon-progress-v1";
const SETTINGS_KEY = "ped-thon-settings-v1";

function todayStamp() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function yesterdayStamp() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

const defaultProgress = () => ({
  xp: 0,
  streak: 0,
  lastPracticeDate: null,
  completed: {}, // challengeId -> { at, attempts, hintsUsed, usedSolution }
  attempts: {},  // challengeId -> number of failed checks
  hintsUsed: {},
  usedSolution: {},
  mistakes: [],  // { id, challengeId, moduleId, title, error, at, resolved }
  daily: {},     // date -> { challengeDone, quizScore, quizTotal, quizAnswers }
});

export function loadProgress() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaultProgress();
    return { ...defaultProgress(), ...JSON.parse(raw) };
  } catch {
    return defaultProgress();
  }
}

export function saveProgress(p) {
  localStorage.setItem(KEY, JSON.stringify(p));
}

export function loadSettings() {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return { name: "", geminiKey: "", difficulty: "beginner" };
    const s = JSON.parse(raw);
    const difficulty = ["beginner", "intermediate", "advanced"].includes(s.difficulty) ? s.difficulty : "beginner";
    return { name: s.name || "", geminiKey: s.geminiKey || "", difficulty };
  } catch {
    return { name: "", geminiKey: "", difficulty: "beginner" };
  }
}

export function saveSettings(s) {
  const current = loadSettings();
  const next = { ...current, ...s };
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(next));
  return next;
}

export function resetProgress() {
  localStorage.removeItem(KEY);
  return defaultProgress();
}

export function touchStreak(p = loadProgress()) {
  const today = todayStamp();
  if (p.lastPracticeDate === today) return p;
  if (p.lastPracticeDate === yesterdayStamp()) p.streak = (p.streak || 0) + 1;
  else p.streak = 1;
  p.lastPracticeDate = today;
  saveProgress(p);
  return p;
}

export function addXp(amount) {
  const p = loadProgress();
  p.xp = (p.xp || 0) + amount;
  touchStreak(p);
  saveProgress(p);
  return p;
}

export function isComplete(challengeId) {
  return Boolean(loadProgress().completed[challengeId]);
}

export function markComplete(challengeId, meta = {}) {
  const p = loadProgress();
  if (!p.completed[challengeId]) {
    p.completed[challengeId] = {
      at: new Date().toISOString(),
      attempts: p.attempts[challengeId] || 0,
      hintsUsed: p.hintsUsed[challengeId] || 0,
      usedSolution: Boolean(p.usedSolution[challengeId]),
      ...meta,
    };
  }
  // resolve related mistakes
  p.mistakes = (p.mistakes || []).map((m) =>
    m.challengeId === challengeId ? { ...m, resolved: true } : m
  );
  saveProgress(p);
  return p;
}

export function recordAttempt(challengeId, failed) {
  const p = loadProgress();
  if (failed) p.attempts[challengeId] = (p.attempts[challengeId] || 0) + 1;
  saveProgress(p);
  return p.attempts[challengeId] || 0;
}

export function getAttempts(challengeId) {
  return loadProgress().attempts[challengeId] || 0;
}

export function recordHint(challengeId) {
  const p = loadProgress();
  p.hintsUsed[challengeId] = (p.hintsUsed[challengeId] || 0) + 1;
  saveProgress(p);
  return p.hintsUsed[challengeId];
}

export function getHintsUsed(challengeId) {
  return loadProgress().hintsUsed[challengeId] || 0;
}

export function markSolutionUsed(challengeId) {
  const p = loadProgress();
  p.usedSolution[challengeId] = true;
  saveProgress(p);
}

export function recordMistake({ challengeId, moduleId, title, error }) {
  const p = loadProgress();
  const existing = (p.mistakes || []).find((m) => m.challengeId === challengeId && !m.resolved);
  if (existing) {
    existing.error = error;
    existing.at = new Date().toISOString();
  } else {
    p.mistakes.unshift({
      id: `${challengeId}-${Date.now()}`,
      challengeId,
      moduleId,
      title,
      error: String(error || "").slice(0, 800),
      at: new Date().toISOString(),
      resolved: false,
    });
  }
  p.mistakes = p.mistakes.slice(0, 50);
  saveProgress(p);
}

export function getOpenMistakes() {
  return (loadProgress().mistakes || []).filter((m) => !m.resolved);
}

export function getDaily(date = todayStamp()) {
  return loadProgress().daily[date] || null;
}

export function setDaily(patch, date = todayStamp()) {
  const p = loadProgress();
  p.daily[date] = { ...(p.daily[date] || {}), ...patch };
  saveProgress(p);
  return p.daily[date];
}

export function completedCount(ids) {
  const p = loadProgress();
  return ids.filter((id) => p.completed[id]).length;
}

export { todayStamp };
