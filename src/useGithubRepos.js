import { useEffect, useState } from "react";
import { GITHUB_USERNAME } from "./data";

// Repos we don't want to surface (profile readme, throwaways, etc.)
const HIDE = new Set([
  GITHUB_USERNAME.toLowerCase(),
  "hello-world",
  "cs601-assignments",
]);

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
            description: r.description,
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
