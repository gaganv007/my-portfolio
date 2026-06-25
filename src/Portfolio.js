import React, { useEffect, useMemo, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
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
import {
  Preloader,
  CountUp,
  TiltCard,
  Marquee,
  CursorRing,
  Magnetic,
  ScrollTop,
  CommandPalette,
  RobotMark,
} from "./ui";

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
  const [theme, setTheme] = useState(() =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"
  );
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const { repos, status } = useGithubRepos();

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // follow the OS light/dark setting automatically
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = (e) => setTheme(e.matches ? "dark" : "light");
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

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

  // language filter for the live repo grid
  const [langFilter, setLangFilter] = useState("All");
  const languages = useMemo(() => {
    const set = new Map();
    repos.forEach((r) => r.language && set.set(r.language, (set.get(r.language) || 0) + 1));
    return ["All", ...[...set.entries()].sort((a, b) => b[1] - a[1]).map((e) => e[0])];
  }, [repos]);
  const shownRepos = useMemo(
    () => (langFilter === "All" ? repos : repos.filter((r) => r.language === langFilter)),
    [repos, langFilter]
  );

  const marqueeItems = useMemo(
    () => [...new Set(skills.flatMap((c) => c.items))].slice(0, 22),
    []
  );

  const commands = useMemo(
    () => [
      ...NAV.map((s) => ({
        label: s.charAt(0).toUpperCase() + s.slice(1),
        hint: "section",
        icon: "→",
        run: () => scrollTo(s),
      })),
      { label: "Download Résumé", hint: "PDF", icon: "📄",
        run: () => window.open(`/${profile.resume.file}`, "_blank") },
      { label: "Email Gagan", hint: "contact", icon: "✉️",
        run: () => { window.location.href = `mailto:${profile.email}`; } },
      { label: "Open GitHub", hint: "profile", icon: "🐙",
        run: () => window.open(profile.github, "_blank") },
      { label: "Open LinkedIn", hint: "profile", icon: "in",
        run: () => window.open(profile.linkedin, "_blank") },
      { label: "Chat with GV Bot", hint: "assistant", icon: "🤖",
        run: () => window.dispatchEvent(new Event("open-bot")) },
    ],
    [] // eslint-disable-line react-hooks/exhaustive-deps
  );

  return (
    <div className="portfolio">
      <Preloader />
      <CursorRing />
      <ScrollTop />
      <CommandPalette commands={commands} />
      <div className="grain" aria-hidden />

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
            aria-label="Gagan Veginati — home"
          >
            <RobotMark size={24} />
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
              className="kbd-btn"
              onClick={() => window.dispatchEvent(new Event("open-palette"))}
              aria-label="Open command menu"
            >
              <span className="kbd-key">⌘</span>K
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
              {profile.name.split(" ").map((word, wi) => (
                <span key={wi} className="word">
                  {word.split("").map((ch, ci) => (
                    <span
                      key={ci}
                      className="char"
                      style={{ animationDelay: `${(wi * 7 + ci) * 0.035 + 0.2}s` }}
                    >
                      {ch}
                    </span>
                  ))}
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
              <Magnetic>
                <button className="btn primary" onClick={() => scrollTo("projects")}>
                  View My Work →
                </button>
              </Magnetic>
              <Magnetic>
                <a className="btn ghost" href={`mailto:${profile.email}`}>
                  Get in Touch
                </a>
              </Magnetic>
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
              <div className="stat-val"><CountUp value={s.value} /></div>
              <div className="stat-label">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* tech marquee */}
      <Marquee items={marqueeItems} />

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
              <TiltCard className={`feat-card accent-${p.accent}`} href={p.repo}>
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
              </TiltCard>
            </Reveal>
          ))}
        </div>

        {/* MORE PROJECTS */}
        <Reveal className="live-head">
          <h3>
            More Projects{" "}
            {status === "ok" && <span className="live-count">{repoCount}</span>}
          </h3>
          <p>A wider selection of what I've built. <a href={profile.github} target="_blank" rel="noreferrer">See everything on GitHub →</a></p>
        </Reveal>

        {status === "error" && (
          <p className="live-msg">Couldn't load these right now — browse them <a href={profile.github} target="_blank" rel="noreferrer">on GitHub</a>.</p>
        )}

        {status === "ok" && languages.length > 2 && (
          <div className="repo-filter">
            {languages.map((l) => (
              <button
                key={l}
                className={langFilter === l ? "on" : ""}
                onClick={() => setLangFilter(l)}
              >
                {l !== "All" && (
                  <i style={{ background: langColor(l) }} />
                )}
                {l}
              </button>
            ))}
          </div>
        )}

        <div className="repo-grid">
          {(status === "loading" ? Array.from({ length: 6 }) : shownRepos).map(
              (r, i) =>
                r ? (
                  <motion.a
                    key={`${langFilter}-${r.id}`}
                    className="repo-card"
                    href={r.url}
                    target="_blank"
                    rel="noreferrer"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: (i % 8) * 0.04 }}
                    whileHover={{ y: -6, scale: 1.02 }}
                  >
                    <div className="repo-top">
                      <span className="repo-folder">📁</span>
                      <span className="repo-gh">View on GitHub →</span>
                    </div>
                    <h4>{prettyName(r.name)}</h4>
                    <p>{r.description || "Open on GitHub to learn more."}</p>
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
            <Magnetic>
              <a className="btn primary" href={`mailto:${profile.email}`}>
                Say Hello →
              </a>
            </Magnetic>
            <Magnetic>
              <a className="btn ghost" href={profile.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </Magnetic>
          </div>
          <div className="resume-row">
            <span>Résumé</span>
            <a href={`/${profile.resume.file}`} target="_blank" rel="noreferrer">
              ↓ Download ({profile.resume.label})
            </a>
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
