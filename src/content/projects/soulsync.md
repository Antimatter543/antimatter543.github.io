---
title: "SoulSync – Mood Tracker"
description: "A privacy-first, open-source mood tracker. 10-point mood scale, rigorous activity-impact correlations, plain-language insights, and health-data (heart rate / HRV) correlation — all 100% on-device. No account, no cloud, no tracking."
image: "/images/projects/soulsync-feature.png"
imageAlt: "SoulSync mood tracker — a private mood tracker, your data never leaves your phone"
technologies: ["Expo SDK 56", "React Native", "TypeScript", "SQLite", "GitHub Actions", "Android"]
hasWriteup: false
externalUrl: "https://play.google.com/store/apps/details?id=com.raeduslabs.soulsyncapp"
liveUrl: "https://play.google.com/store/apps/details?id=com.raeduslabs.soulsyncapp"
githubUrl: "https://github.com/Antimatter543/mood-tracker"
blogUrl: "/blog/soulsync-architecture-and-cicd"
featured: true
status: "completed"
startDate: "2025-03-24"
category: "Mobile App"
---

**SoulSync** is a privacy-first mood tracker built with React Native and Expo — now **fully open source (GPL-3.0)** and rebuilt from the ground up. Log your mood, attach activities, notes and photos, and let the app surface honest, plain-language patterns from *your own* data. Everything stays on your device: no accounts, no cloud, no tracking.

📖 Read the deep-dive on how it's built: [Inside SoulSync — Architecture & the Free CI Release Pipeline](/blog/soulsync-architecture-and-cicd)

## Features
- 📊 **10-point mood scale** – High/low precision modes, backdate entries, daily reminders
- 📈 **Rigorous statistics** – With/without activity correlation, day-of-week patterns, month-over-month comparison, heatmaps
- ❤️ **Health-data correlation** – Correlate mood against heart rate, resting HR and HRV with real Pearson *r*, *p*-value and sample size
- 🧠 **Insights tab** – Plain-language patterns discovered from your own history
- 🎨 **5 themes** – Dark, Light, Cherry Blossom, Midnight Blue, Forest
- 🔒 **100% local** – SQLite on-device; JSON import/export for full data portability
- 🛠️ **Open source** – 603 passing tests, TypeScript strict, free automated APK/AAB release pipeline

Built for anyone who wants real emotional self-awareness without handing their most private data to a company.
