import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import {
  profile,
  stats,
  skills,
  featuredProjects,
  experience,
  education,
  achievements,
} from "./data";
import { useGithubRepos, langColor, prettyName } from "./useGithubRepos";
import Chatbot from "./Chatbot";

const NAV = ["home", "about", "skills", "projects", "experience", "contact"];

/* ---------- small animation helpers ---------- */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

function Reveal({ children, i = 0, className = "", id }) {
  return (
    <motion.div
      id={id}
      className={className}
      variants={fadeUp}
      custom={i}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- animated role typewriter ---------- */
function Typewriter({ words }) {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);

  useEffect(() => {
    const word = words[idx % words.length];
    const speed = del ? 45 : 90;
    const t = setTimeout(() => {
      if (!del) {
        const next = word.slice(0, text.length + 1);
        setText(next);
        if (next === word) setTimeout(() => setDel(true), 1300);
      } else {
        const next = word.slice(0, text.length - 1);
        setText(next);
        if (next === "") {
          setDel(false);
          setIdx((i) => i + 1);
        }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [text, del, idx, words]);

  return (
    <span className="type">
      {text}
      <span className="caret">|</span>
    </span>
  );
}

const Portfolio = () => {
  const [theme, setTheme] = useState("dark");
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const { repos, status } = useGithubRepos();

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // active section highlighting
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -45% 0px" }
    );
    NAV.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const repoCount = useMemo(() => repos.length, [repos]);

  return (
    <div className="portfolio">
      {/* scroll progress bar */}
      <motion.div className="scroll-bar" style={{ scaleX: progress }} />

      {/* animated background */}
      <div className="bg" aria-hidden>
        <span className="blob b1" />
        <span className="blob b2" />
        <span className="blob b3" />
        <div className="grid-overlay" />
      </div>

      {/* NAV */}
      <nav className="nav">
        <div className="nav-inner">
          <motion.button
            className="logo"
            onClick={() => scrollTo("home")}
            whileHover={{ rotate: -6, scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>GV</span>
          </motion.button>

          <div className={`nav-links ${menuOpen ? "open" : ""}`}>
            {NAV.map((s) => (
              <button
                key={s}
                className={active === s ? "on" : ""}
                onClick={() => scrollTo(s)}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="nav-right">
            <button
              className="ghost-btn theme"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
            <button
              className={`burger ${menuOpen ? "x" : ""}`}
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Menu"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section id="home" className="hero">
        <div className="hero-grid">
          <motion.div
            className="hero-text"
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.12 } } }}
          >
            <motion.span className="pill" variants={fadeUp}>
              👋 Hey, I'm
            </motion.span>
            <motion.h1 className="hero-name" variants={fadeUp}>
              {profile.name.split(" ").map((w, i) => (
                <span key={i} className="word">
                  {w}{" "}
                </span>
              ))}
            </motion.h1>
            <motion.h2 className="hero-role" variants={fadeUp}>
              <Typewriter words={profile.roles} />
            </motion.h2>
            <motion.p className="hero-tag" variants={fadeUp}>
              {profile.tagline}
            </motion.p>
            <motion.div className="hero-cta" variants={fadeUp}>
              <motion.button
                className="btn primary"
                onClick={() => scrollTo("projects")}
                whileHover={{ y: -3, scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                🚀 View My Work
              </motion.button>
              <motion.a
                className="btn ghost"
                href={`mailto:${profile.email}`}
                whileHover={{ y: -3, scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                ✉️ Get in Touch
              </motion.a>
            </motion.div>
            <motion.div className="hero-socials" variants={fadeUp}>
              <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
              <span>📍 {profile.location}</span>
            </motion.div>
          </motion.div>

          <motion.div
            className="hero-avatar"
            initial={{ opacity: 0, scale: 0.6, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 80, delay: 0.2 }}
          >
            <motion.div
              className="avatar-ring"
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <img src={profile.avatar} alt={profile.name} />
            </motion.div>
            {["🧠", "⚡", "🤖", "📈"].map((e, i) => (
              <motion.span
                key={i}
                className={`sticker s${i}`}
                animate={{ y: [0, -10, 0], rotate: [0, 8, 0] }}
                transition={{
                  duration: 3 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.4,
                }}
              >
                {e}
              </motion.span>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="scroll-hint"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        >
          scroll ↓
        </motion.div>
      </section>

      {/* STATS */}
      <section className="stats-wrap">
        <div className="stats">
          {stats.map((s, i) => (
            <Reveal key={s.label} i={i} className="stat">
              <div className="stat-val">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="section">
        <Reveal>
          <h2 className="sec-title"><span className="num">01.</span> About Me</h2>
        </Reveal>
        <div className="about-grid">
          <Reveal i={1} className="about-card">
            <p>{profile.blurb}</p>
            <div className="badges">
              {achievements.map((a) => (
                <span key={a} className="badge">{a}</span>
              ))}
            </div>
          </Reveal>
          <Reveal i={2} className="edu-col">
            <h3>🎓 Education</h3>
            {education.map((e) => (
              <div className="edu-item" key={e.degree}>
                <div className="edu-top">
                  <strong>{e.degree}</strong>
                  <span>{e.period}</span>
                </div>
                <div className="edu-school">{e.school} · {e.location}</div>
                <p className="edu-note">{e.note}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="section">
        <Reveal>
          <h2 className="sec-title"><span className="num">02.</span> Skills & Tools</h2>
        </Reveal>
        <div className="skills-grid">
          {skills.map((cat, i) => (
            <Reveal key={cat.title} i={i} className="skill-card">
              <motion.div
                whileHover={{ y: -8, rotate: -1 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                className="skill-inner"
              >
                <div className="skill-icon">{cat.icon}</div>
                <h3>{cat.title}</h3>
                <div className="chips">
                  {cat.items.map((t) => (
                    <span className="chip" key={t}>{t}</span>
                  ))}
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="section">
        <Reveal>
          <h2 className="sec-title"><span className="num">03.</span> Featured Projects</h2>
        </Reveal>
        <div className="featured-grid">
          {featuredProjects.map((p, i) => (
            <Reveal key={p.title} i={i % 3}>
              <motion.a
                className={`feat-card accent-${p.accent}`}
                href={p.repo}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 240, damping: 18 }}
              >
                <div className="feat-top">
                  <span className="feat-emoji">{p.emoji}</span>
                  <span className="feat-period">{p.period}</span>
                </div>
                <h3>{p.title}</h3>
                <p className="feat-desc">{p.description}</p>
                <ul className="feat-points">
                  {p.highlights.map((h) => <li key={h}>{h}</li>)}
                </ul>
                <div className="chips">
                  {p.tags.map((t) => <span className="chip" key={t}>{t}</span>)}
                </div>
                <span className="feat-link">View on GitHub →</span>
              </motion.a>
            </Reveal>
          ))}
        </div>

        {/* LIVE GITHUB REPOS — auto-updates when you push new repos */}
        <Reveal className="live-head">
          <h3>
            🛰️ Live from GitHub{" "}
            {status === "ok" && <span className="live-count">{repoCount} repos</span>}
          </h3>
          <p>Auto-synced from <a href={profile.github} target="_blank" rel="noreferrer">@{profile.github.split("/").pop()}</a> — new projects appear here automatically.</p>
        </Reveal>

        {status === "error" && (
          <p className="live-msg">Couldn't reach GitHub right now — check it directly <a href={profile.github} target="_blank" rel="noreferrer">here</a>.</p>
        )}

        <div className="repo-grid">
          <AnimatePresence>
            {(status === "loading" ? Array.from({ length: 6 }) : repos).map(
              (r, i) =>
                r ? (
                  <motion.a
                    key={r.id}
                    className="repo-card"
                    href={r.homepage || r.url}
                    target="_blank"
                    rel="noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (i % 6) * 0.05 }}
                    whileHover={{ y: -6, scale: 1.02 }}
                  >
                    <div className="repo-top">
                      <span className="repo-folder">📁</span>
                      {r.homepage && <span className="repo-live">live ↗</span>}
                    </div>
                    <h4>{prettyName(r.name)}</h4>
                    <p>{r.description || "A project by Gagan — open to see more."}</p>
                    <div className="repo-meta">
                      {r.language && (
                        <span className="repo-lang">
                          <i style={{ background: langColor(r.language) }} />
                          {r.language}
                        </span>
                      )}
                      {r.stars > 0 && <span>⭐ {r.stars}</span>}
                      {r.forks > 0 && <span>🍴 {r.forks}</span>}
                    </div>
                  </motion.a>
                ) : (
                  <div key={i} className="repo-card skeleton" />
                )
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="section">
        <Reveal>
          <h2 className="sec-title"><span className="num">04.</span> Experience</h2>
        </Reveal>
        <div className="timeline">
          {experience.map((x, i) => (
            <Reveal key={x.role + x.period} i={i} className="tl-item">
              <div className="tl-dot" />
              <div className="tl-card">
                <div className="tl-head">
                  <strong>{x.role}</strong>
                  <span className="tl-period">{x.period}</span>
                </div>
                <div className="tl-org">{x.org} · {x.location}</div>
                <ul>
                  {x.points.map((p) => <li key={p}>{p}</li>)}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section contact">
        <Reveal>
          <span className="num center">05. What's next?</span>
          <h2 className="contact-title">Let's build something 🚀</h2>
          <p className="contact-sub">
            I'm open to AI/ML, Software, Data and MLOps roles — and always happy to chat.
          </p>
          <div className="contact-cta">
            <motion.a
              className="btn primary"
              href={`mailto:${profile.email}`}
              whileHover={{ y: -3, scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              ✉️ Say Hello
            </motion.a>
            <motion.a
              className="btn ghost"
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -3, scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              in LinkedIn
            </motion.a>
          </div>
          <div className="resume-row">
            <span>📄 Resumes:</span>
            {profile.resumes.map((r) => (
              <a key={r.file} href={`/${r.file}`} target="_blank" rel="noreferrer">
                {r.label}
              </a>
            ))}
          </div>
        </Reveal>
      </section>

      <footer className="footer">
        <p>Designed & built by {profile.name} · {new Date().getFullYear()}</p>
        <p className="footer-sub">React · Framer Motion · Live GitHub API</p>
      </footer>

      {/* AI sidekick */}
      <Chatbot repoCount={repoCount} />
    </div>
  );
};

export default Portfolio;
