import { loadSettings } from "./storage.js";

const MODELS = [
  "gemini-2.0-flash",
  "gemini-2.5-flash",
  "gemini-flash-latest",
  "gemini-1.5-flash",
];

export function hasApiKey() {
  return Boolean(loadSettings().geminiKey && loadSettings().geminiKey.trim());
}

async function callGemini(prompt) {
  const key = (loadSettings().geminiKey || "").trim();
  if (!key) {
    throw new Error("Add your Gemini API key in Settings to use the tutor. The app works fully without it.");
  }
  let lastErr = null;
  for (const model of MODELS) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(key)}`;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.3, maxOutputTokens: 512 },
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const msg = data?.error?.message || res.statusText || "Request failed";
        lastErr = new Error(msg);
        if (res.status === 404 || /not found|not supported/i.test(msg)) continue;
        throw lastErr;
      }
      const text = data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join("\n") || "";
      if (!text.trim()) throw new Error("The tutor returned an empty reply. Try again in a moment.");
      return text.trim();
    } catch (err) {
      lastErr = err;
      if (/Failed to fetch|NetworkError/i.test(String(err))) {
        throw new Error("Could not reach Gemini. Check your internet connection.");
      }
    }
  }
  throw lastErr || new Error("Could not reach the tutor.");
}

export async function explainError({ code, error, traceback, prompt }) {
  return callGemini(
    `You are a kind Python tutor for a beginner learning data science. Explain the error in plain English, in at most 8 short sentences. Point to the likely line or idea. Suggest how to fix it, but do not paste a complete finished solution.\n\nTask:\n${prompt || ""}\n\nStudent code:\n${code}\n\nError:\n${error || ""}\n${traceback || ""}`
  );
}

export async function giveHint({ code, prompt, hintLevel, officialHint }) {
  return callGemini(
    `You are a kind Python tutor for a beginner. Give ONE short hint (3-6 sentences max) for the next step. Do not reveal the full solution or write the complete code. If they are close, nudge them. If they are stuck, remind them of the key idea.\n\nTask:\n${prompt}\n\nOfficial hint they may already have seen:\n${officialHint || "(none)"}\n\nHint level (1 is gentlest): ${hintLevel || 1}\n\nStudent code:\n${code || "(empty)"}`
  );
}
