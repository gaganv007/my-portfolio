import { useEffect, useState } from "react";
import { GITHUB_USERNAME } from "./data";

// Repos we don't want to surface (profile readme, throwaways, etc.)
const HIDE = new Set([
  GITHUB_USERNAME.toLowerCase(),
  "hello-world",
  "cs601-assignments",
]);

// Hand-written summaries (from each repo's README/code) used when a repo
// has no GitHub description of its own.
const REPO_DETAILS = {
  "jobpilot": "A local job-search command center — paste a job, get an honest fit score plus a tailored resume and cover letter. It automates the analysis, never the decision.",
  "agents": "A set of local AI agents that handle day-to-day chores — no cloud, no subscriptions, no API keys (except your own Gmail).",
  "career_agent": "An AI agent fine-tuned for BU students to ask for career advice and recommended courses.",
  "vmail": "A fully functional, Gmail-style email application built on AWS services.",
  "claimequity-ai": "ClaimEquity AI — an insurance-justice engine built for HackPrinceton 2025 (Healthcare track).",
  "role-match": "RoleMatch — a web app that helps software-engineering students find their ideal team role via a quick assessment quiz.",
  "flowfi": "FlowFi — real-time value streaming on the Aptos blockchain.",
  "gnn-based-stock-relations-and-prediction": "Graph Neural Networks over daily correlation graphs of 29 large-cap US stocks to forecast next-day direction — showing stock-to-stock relationships boost accuracy.",
  "polkaagents": "A decentralized AI-agent marketplace on Polkadot Asset Hub — deploy AI models as tokenized agents users can call trustlessly for a fee.",
  "citrak": "Citrak — a dynamic web app delivering real-time traffic data and insights for urban environments with an interactive map.",
  "railway-system": "A full-stack railway ticketing system with a modern UI — React frontend, Node.js + MySQL backend.",
  "hufflepay": "HufflePay — instant cross-currency payments on Bitcoin Lightning & Taproot.",
  "anomaly_detection": "Fraud / anomaly detection on highly imbalanced financial transactions using SMOTE and ML/deep-learning models.",
  "urban-noise-detection": "An audio-classification model that identifies urban sound categories from environmental recordings.",
  "autism-detection-using-cnn": "A CNN that detects autism from image data, using augmentation, batch-norm and dropout to push accuracy higher.",
  "stress-prediction": "A machine-learning model that predicts stress levels from physiological and behavioral signals.",
  "lyrics_predictor": "An NLP model that generates and predicts song lyrics.",
  "ml-lab": "Machine-learning coursework — lab notebooks and experiments.",
  "emotion-based-music-recommendation-using-media-pipe": "Recommends music based on facial emotion detected in real time with MediaPipe.",
  "hackprinceton25-main": "A HackPrinceton 2025 hackathon project.",
  "my-portfolio": "This portfolio site — React, Framer Motion and a live GitHub integration.",
  "portfolio": "An earlier iteration of my personal portfolio.",
};

const LANG_COLORS = {
  Python: "#3572A5",
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Java: "#b07219",
  "C++": "#f34b7d",
  Solidity: "#AA6746",
  Jupyter: "#DA5B0B",
  Shell: "#89e051",
};

export function langColor(lang) {
  return LANG_COLORS[lang] || "#9aa4b2";
}

// Fetches all public, non-forked repos. When Gagan pushes a NEW repo to
// GitHub, it shows up here automatically — no code change needed.
export function useGithubRepos() {
  const [repos, setRepos] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ok | error

  useEffect(() => {
    let alive = true;
    const cacheKey = "gh_repos_v1";

    // Show cached repos instantly, then refresh in the background.
    try {
      const cached = JSON.parse(sessionStorage.getItem(cacheKey) || "null");
      if (cached && Array.isArray(cached)) {
        setRepos(cached);
        setStatus("ok");
      }
    } catch (_) {}

    fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=pushed`
    )
      .then((r) => {
        if (!r.ok) throw new Error(`GitHub ${r.status}`);
        return r.json();
      })
      .then((data) => {
        if (!alive) return;
        const cleaned = data
          .filter((r) => !r.fork && !r.archived && !HIDE.has(r.name.toLowerCase()))
          .map((r) => ({
            id: r.id,
            name: r.name,
            description: r.description || REPO_DETAILS[r.name.toLowerCase()] || null,
            language: r.language,
            stars: r.stargazers_count,
            forks: r.forks_count,
            url: r.html_url,
            homepage: r.homepage,
            topics: r.topics || [],
            pushedAt: r.pushed_at,
          }))
          .sort(
            (a, b) =>
              b.stars - a.stars || new Date(b.pushedAt) - new Date(a.pushedAt)
          );
        setRepos(cleaned);
        setStatus("ok");
        try {
          sessionStorage.setItem(cacheKey, JSON.stringify(cleaned));
        } catch (_) {}
      })
      .catch(() => {
        if (alive) setStatus((s) => (s === "ok" ? "ok" : "error"));
      });

    return () => {
      alive = false;
    };
  }, []);

  return { repos, status };
}

// Pretty title from a repo slug: "gnn-stock-prediction" -> "Gnn Stock Prediction"
export function prettyName(name) {
  return name
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
