# Ped-thon

A free, installable Python practice app. Lessons, coding challenges with automatic checks, a daily quiz, a playground, and optional AI hints. Python runs in your browser (Pyodide), so you do not install anything on the phone.

## Open the app

**Live site:** https://lhymite36-bot.github.io/ped-thon/

## Android APK preview

A signed preview APK (not marked Latest) is here:

- Release page: https://github.com/lhymite36-bot/ped-thon/releases/tag/v0.1.0-android
- APK: https://github.com/lhymite36-bot/ped-thon/releases/download/v0.1.0-android/Ped-thon-android-preview.apk

It is a Trusted Web Activity wrapper of the live site. Android 7.0+ and Chrome are required. Allow installs from this source if the phone asks. The first launch may briefly show a browser bar until Digital Asset Links are recognized.

## Install it on your phone

Ped-thon is a Progressive Web App. On a Samsung phone in Chrome:

1. Open the live site.
2. Wait for the first load to finish (Python downloads once, then works offline).
3. Tap **Install app** if you see the banner, or open Chrome’s menu (⋮) and choose **Install app** or **Add to Home screen**.
4. Open Ped-thon from your home screen. It runs in its own window, like a real app.

On a computer, look for the install icon in Chrome’s address bar.

## What’s inside

- **20 modules** in three tracks: Beginner, Intermediate, and Advanced. Switch the track on Home, Learn, Daily, or Settings.
- **97 lesson challenges** (49 core + 48 Advanced). Advanced covers recursion, algorithms, generators and decorators, OOP design, regex, data structures, NumPy/Pandas analysis, and LeetCode-style puzzles. Hidden tests check your answers.
- A rotating daily challenge and a 5-question quiz each day, matched to your difficulty.
- A **Preview** tab for visual output: matplotlib charts, turtle-style drawings, HTML/CSS/JS in a sandboxed iframe, and simple canvas games with an on-screen pad. The **Build** section has a chart dashboard, drawing art, a mini website, Snake, and Pong.
- A mobile-friendly editor with autocomplete (keywords, builtins, snippets, your own names, and members after a dot). After Python loads, Jedi can improve the suggestions.
- Python runs in a Web Worker (so you can Stop a runaway loop). The runtime is self-hosted, with CDN fallbacks and a Retry button if the first load fails.
- Progress, XP, and a streak saved on the device (localStorage).
- An optional Gemini tutor: paste your own API key in Settings. The key never leaves the device except to call Google. The app works fully without a key.

## If Python fails to load on your phone

The first version could show *TypeError: Failed to fetch dynamically imported module* (especially in Chrome or the installed app on a Samsung phone). Close Ped-thon completely and open it again so it can update. If you still see the error, tap **Retry**. If that is not enough: in Chrome, open the site → ⋮ → Site settings (or Settings → Site settings) → Clear & reset, then reopen the app and wait for Python to finish loading once.

## Privacy

No account is required. Progress and any Gemini key stay in the browser’s localStorage. Nothing is committed to this repository.

## Run locally

Serve the folder over HTTP (required for the service worker and Pyodide):

```bash
python3 -m http.server 8080
```

Then open http://127.0.0.1:8080/
