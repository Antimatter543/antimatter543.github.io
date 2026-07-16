---
title: "Inside SoulSync — Architecture & the Free CI Release Pipeline"
description: "SoulSync is now fully open source. A quick tour of how a privacy-first, 100%-on-device mood tracker is built — and the free GitHub Actions pipeline that signs and ships every release."
pubDate: "2026-07-16"
tags: ['projects', 'engineering', 'open-source', 'react-native', 'ci-cd']
heroImage: "/images/projects/soulsync-feature.png"
draft: false
hideFromLatest: true
---

I rebuilt [**SoulSync**](https://play.google.com/store/apps/details?id=com.raeduslabs.soulsyncapp) from the ground up and made it **fully open source** ([GPL-3.0, on GitHub](https://github.com/Antimatter543/mood-tracker)). It's a privacy-first mood tracker: you log how you feel, attach activities and notes, and it hands back honest, plain-language patterns from *your own* data. Nothing ever leaves your phone — no account, no cloud, no analytics.

This is a short tour of two things I'm happy with: the **architecture** that keeps it fast and testable, and the **free CI pipeline** that signs and ships every build without spending a cent.

![SoulSync home dashboard](/images/projects/soulsync-1.png)

## The stack

Expo SDK 56, React Native 0.85, TypeScript in strict mode. It's plain [CNG](https://docs.expo.dev/workflow/continuous-native-generation/) — no custom native modules — so `android/` is generated, never committed, and Expo Go runs the app faithfully during development.

Everything persists to a **local SQLite database**. There's no server to talk to, which is the whole point: your mood history is some of the most private data you own, so it stays on-device.

## Architecture: pure functions you can test without booting the app

The rule that keeps SoulSync honest is a hard split between **I/O** and **logic**:

- **`databases/`** — a thin facade over small modules (`entries`, `activities`, `groups`, `user-settings`), each doing CRUD against SQLite. Schema changes only ever go through a versioned migration system that runs automatically on launch.
- **`components/visualisations/transforms/`** — every chart is fed by a **pure function** (`weeklyMood`, `streak`, `activityImpact`, `recoveryPatterns`, `heatmap`…). Give it rows in, get plot-ready data out. No database, no React.
- **`components/forms/hooks/`** — form state, mood-value snapping, and validation live in hooks, so the form components are thin renderers.

Because the load-bearing logic is pure, it's covered by **603 passing tests** across the transforms, date math, and database layer — and you can modify a chart's maths with confidence without ever opening the emulator. `tsc --noEmit` is clean, lint is zero-error, and a pre-commit hook runs typecheck + lint + tests.

One genuinely tricky area worth calling out: **timezones**. Query *windows* are computed in local time, and the streak logic that used to be a fragile recursive-CTE in SQL is now a tested pure function. Getting "what day did this entry happen on" right for someone logging at 11pm is the kind of edge case that only a test suite keeps honest.

## What's new: statistics that don't lie, and health correlation

The upgrade isn't just cosmetic. SoulSync now does **rigorous** stats — with/without activity correlation, day-of-week patterns, month-over-month comparison — and an **Insights tab** that translates them into plain language.

The one I'm proudest of: **health-data correlation**. Pull in heart rate, resting HR and HRV, and SoulSync correlates them against your mood with a real **Pearson _r_, a two-tailed _p_-value, and the sample size _n_** — plus a tappable explainer so the numbers actually mean something. No hand-wavy "you seem stressed." Real statistics, computed on your device.

![SoulSync insights tab — plain-language patterns from your own data](/images/projects/soulsync-insights.png)

## The CI/CD pipeline: signed releases, for free

Here's the part I like most as an engineering problem. EAS Build's free Android tier has a monthly quota. CI on a public GitHub repo is **free and unlimited**. So the entire Android release lane runs on **GitHub Actions** instead.

A single workflow (`release-apk.yml`) does the work. On every run it:

1. Checks out, sets up Node 22 + JDK 17 + Gradle.
2. Runs `expo prebuild` to regenerate `android/` from config plugins (arm-only ABIs, R8 minify + resource shrink for release).
3. Decodes a signing keystore from a GitHub secret **into the runner's temp dir only** — never the workspace.
4. Builds a **signed release APK and a signed AAB** with Gradle.

The keystore is **parity-verified to be the same certificate EAS signs with**, so a CI-built APK updates cleanly over a Play-Store install. That detail matters — a mismatched signature means users can't update, only reinstall.

What makes it pleasant to live with is the **trigger convention**:

- **Push to `main`** → build and publish a rolling `main-latest` **prerelease** — an installable signed dev build at a stable URL, refreshed on every merge.
- **Push a `v*` tag** → create the versioned GitHub Release for that version, idempotently.
- **Manual dispatch** → build any branch and upload the APK as a run artifact, for one-off QA.

One invariant ties it together: `git tag == app.json version == APK versionName == release tag == asset filename`. Everything about a build is traceable back to a single version string.

## Try it

SoulSync is on the [**Google Play Store**](https://play.google.com/store/apps/details?id=com.raeduslabs.soulsyncapp) — no account, no sign-in, just install and log. Prefer sideloading? Grab the latest signed APK from [GitHub Releases](https://github.com/Antimatter543/mood-tracker/releases/latest). And since it's open source, you can [read every line](https://github.com/Antimatter543/mood-tracker) of the code that touches your data.

If you find it useful, a Play Store review helps a tiny open-source project more than you'd think.
