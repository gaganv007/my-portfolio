# Gagan Veginati — Portfolio

A modern, animated personal portfolio built with **React 19** and **Framer Motion**.

**Live:** https://gaganveginati.netlify.app/

![Tech](https://img.shields.io/badge/React-19-61dafb) ![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-ff4d8d) ![Netlify](https://img.shields.io/badge/Deploy-Netlify-00c7b7)

## ✨ Highlights

- **Auto-updating projects** — the Projects section fetches my repos **live from the GitHub API**, so every new repo I push shows up automatically. No code changes needed.
- **Curated featured projects** — richer write-ups for my best work (Gavel AI Oracle, GNN Stock Prediction, Anomaly Detection, and more).
- **Silky animations** — gradient-mesh background with drifting blobs, scroll-reveal sections, a typewriter role headline, spring-physics hover, and a scroll-progress bar.
- **Glassmorphism UI** with an animated gradient identity, **dark / light theme**, and a fully responsive, mobile-first layout.
- **Real content** sourced from my AI/ML, Data Science, DevOps/MLOps, and Software Engineering resumes (all downloadable from the site).

## 🧱 Tech Stack

- React 19 (hooks) · Framer Motion 12
- Modern CSS (custom properties, grid/flex, `color-mix`, backdrop-filter)
- GitHub REST API (live repo sync)
- Netlify hosting

## 🗂 Project Structure

```
src/
├── Portfolio.js        # main UI + sections + animations
├── data.js             # profile, skills, featured projects, experience (edit copy here)
├── useGithubRepos.js   # live GitHub fetch + helpers
├── App.css             # full design system / theming
└── index.js
public/                 # resumes (PDF), favicon, manifest
```

## 🚀 Run locally

```bash
npm install
npm start        # http://localhost:3000
npm run build    # production bundle
```

## 🔧 Updating content

- **Add/feature a project manually:** edit `featuredProjects` in `src/data.js`.
- **New GitHub repo:** just push it to GitHub — it appears in the “Live from GitHub” grid automatically.
- **Tweak copy / skills / experience:** edit `src/data.js`.

---

Designed & built by **Gagan Veginati** · AI/ML Engineer · M.S. Computer Science, Boston University.
