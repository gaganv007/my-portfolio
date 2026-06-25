import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  profile,
  skills,
  featuredProjects,
  experience,
  education,
  achievements,
} from "./data";

/* ============================================================
   "GV Bot" — a client-side AI sidekick.
   No backend / no API key: it matches the visitor's intent and
   answers straight from the portfolio data. Friendly, fast, free.
   ============================================================ */

const STARTER_CHIPS = [
  "Who is Gagan? 👋",
  "Best projects 🚀",
  "Tech skills 🧠",
  "Experience 💼",
  "How to hire 📬",
];

const allTech = skills.flatMap((c) => c.items.map((t) => t.toLowerCase()));

// Build a single reply object: { text, links?, chips? }
function getReply(raw, ctx) {
  const q = raw.toLowerCase().trim();
  const has = (...words) => words.some((w) => q.includes(w));

  // greeting
  if (has("hi", "hello", "hey", "yo ", "sup", "howdy") && q.length < 14) {
    return {
      text:
        "Hey there! 👋 I'm GV Bot, Gagan's AI sidekick. Ask me about his projects, skills, experience — or how to reach him!",
      chips: STARTER_CHIPS,
    };
  }

  // thanks
  if (has("thank", "thx", "thanks", "appreciate")) {
    return {
      text: "Anytime! 🙌 Anything else you'd like to know about Gagan?",
      chips: ["Best projects 🚀", "Tech skills 🧠", "How to hire 📬"],
    };
  }

  // contact / hire
  if (has("hire", "contact", "email", "reach", "available", "job", "recruit", "talk", "connect")) {
    return {
      text: `Gagan is open to AI/ML, Software, Data & MLOps roles (Boston, MA · remote-friendly). The fastest way to reach him is email — ${profile.email}. He usually replies within a day! 📬`,
      links: [
        { label: "✉️ Email Gagan", href: `mailto:${profile.email}` },
        { label: "in LinkedIn", href: profile.linkedin },
        { label: "GitHub", href: profile.github },
      ],
      chips: ["See his resume 📄", "Best projects 🚀"],
    };
  }

  // resume
  if (has("resume", "cv", "download", "résumé")) {
    return {
      text:
        "Here's Gagan's résumé — download it and take a look: 📄",
      links: [{ label: `↓ ${profile.resume.label} résumé`, href: `/${profile.resume.file}` }],
      chips: ["How to hire 📬", "Tech skills 🧠"],
    };
  }

  // a specific technology?
  const techHit = allTech.find((t) => q.includes(t) && t.length > 2);
  if (techHit) {
    const cat = skills.find((c) =>
      c.items.some((i) => i.toLowerCase() === techHit)
    );
    return {
      text: `Yes! ${cap(techHit)} is part of Gagan's toolkit (${cat.icon} ${cat.title}). He's used it in real, shipped projects — want to see which ones?`,
      chips: ["Best projects 🚀", "All skills 🧠"],
    };
  }

  // skills
  if (has("skill", "tech", "stack", "tool", "language", "framework", "know")) {
    return {
      text:
        "Gagan's stack spans the full ML lifecycle 🧠\n\n" +
        skills.map((c) => `${c.icon} ${c.title}: ${c.items.slice(0, 5).join(", ")}…`).join("\n"),
      chips: ["AWS experience ☁️", "LLMs / GenAI 🤖", "Best projects 🚀"],
    };
  }

  // a specific featured project by keyword
  const proj = featuredProjects.find((p) => {
    const key = p.title.toLowerCase();
    if (has("gavel", "oracle", "prediction market")) return key.includes("gavel");
    if (has("gnn", "stock", "graph")) return key.includes("gnn");
    if (has("fraud", "anomaly", "transaction")) return key.includes("anomaly");
    if (has("blockchain", "loyalty", "rewards", "billrewards")) return key.includes("billrewards");
    if (has("noise", "audio", "sound")) return key.includes("noise");
    if (has("mlops", "kubernetes", "docker")) return key.includes("ml-blockchain");
    return false;
  });
  if (proj) {
    return {
      text: `${proj.emoji} ${proj.title} (${proj.period})\n\n${proj.description}\n\n• ${proj.highlights.join("\n• ")}\n\nBuilt with: ${proj.tags.join(", ")}`,
      links: [{ label: "View on GitHub →", href: proj.repo }],
      chips: ["Another project 🔀", "How to hire 📬"],
    };
  }

  // projects (general)
  if (has("project", "build", "built", "work", "portfolio", "made", "best", "cool")) {
    return {
      text:
        "Here are a few highlights 🚀\n\n" +
        featuredProjects
          .slice(0, 4)
          .map((p) => `${p.emoji} ${p.title} — ${p.description.split(".")[0]}.`)
          .join("\n\n") +
        `\n\nPlus ${ctx.repoCount || "20+"} live repos auto-synced from GitHub below!`,
      chips: ["Tell me about Gavel ⚖️", "GNN stocks 📈", "GitHub repos 🛰️"],
    };
  }

  // experience
  if (has("experience", "internship", "intern", "career", "history", "worked")) {
    return {
      text:
        "💼 Experience:\n\n" +
        experience
          .map((x) => `• ${x.role} @ ${x.org.split("—")[0].trim()} (${x.period})`)
          .join("\n") +
        `\n\nHighlight: predicted student retention at 89% accuracy across 15,000+ records and cut ETL time by 65% on 5GB+ Spark pipelines.`,
      chips: ["Education 🎓", "Best projects 🚀", "How to hire 📬"],
    };
  }

  // education
  if (has("education", "study", "studied", "degree", "university", "college", "school", "boston", "master", "bachelor")) {
    return {
      text:
        "🎓 Education:\n\n" +
        education.map((e) => `• ${e.degree} — ${e.school} (${e.period})`).join("\n"),
      chips: ["Experience 💼", "Tech skills 🧠"],
    };
  }

  // achievements / hackathon
  if (has("award", "achievement", "hackathon", "win", "won", "prize", "certif")) {
    return {
      text: "🏆 A few wins:\n\n" + achievements.join("\n"),
      chips: ["Best projects 🚀", "How to hire 📬"],
    };
  }

  // location
  if (has("where", "location", "based", "live", "relocat", "remote")) {
    return {
      text: `📍 Gagan is based in ${profile.location}. Happy to work remote or relocate!`,
      chips: ["How to hire 📬", "Experience 💼"],
    };
  }

  // about / who
  if (has("who", "about", "yourself", "tell me", "gagan", "background", "summary")) {
    return {
      text: `${profile.blurb}`,
      chips: ["Best projects 🚀", "Tech skills 🧠", "How to hire 📬"],
    };
  }

  // github
  if (has("github", "repo", "code", "open source")) {
    return {
      text: `Gagan keeps ${ctx.repoCount || "lots of"} public repos on GitHub — and this site auto-syncs them live in the Projects section! 🛰️`,
      links: [{ label: "Open GitHub", href: profile.github }],
      chips: ["Best projects 🚀", "How to hire 📬"],
    };
  }

  // easter egg
  if (has("joke", "funny", "fun fact", "secret", "easter")) {
    const jokes = [
      "Why did the neural network break up? It couldn't handle the loss. 💔📉",
      "Fun fact: Gagan's AI oracle 'Gavel' resolves prediction-market questions in ~14 seconds. ⚡",
      "Gagan was Sports Secretary for a 15,000-student campus — so he can scale teams AND models. 🏅",
    ];
    return {
      text: jokes[Math.floor(Math.random() * jokes.length)],
      chips: ["Best projects 🚀", "How to hire 📬"],
    };
  }

  // fallback
  return {
    text:
      "Good question! 🤔 I know all about Gagan's projects, skills, experience, education and how to reach him. Try one of these:",
    chips: STARTER_CHIPS,
  };
}

const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

/* Animated GV Bot mascot — blinking eyes, pulsing antenna, gentle float.
   Head/ears/antenna use currentColor so it adapts to its container. */
function BotRobot({ className = "" }) {
  return (
    <svg className={`bot-robot ${className}`} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <g className="br-float">
        <line x1="20" y1="3.6" x2="20" y2="9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle className="br-antenna" cx="20" cy="3" r="2.1" />
        <line x1="4.6" y1="16.5" x2="4.6" y2="23.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        <line x1="35.4" y1="16.5" x2="35.4" y2="23.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        <rect x="6.5" y="9" width="27" height="22" rx="7.5" fill="currentColor" />
        <rect className="br-screen" x="11" y="13.4" width="18" height="13.2" rx="4.6" />
        <circle className="br-eye" cx="16" cy="20" r="2.2" />
        <circle className="br-eye br-eye2" cx="24" cy="20" r="2.2" />
      </g>
    </svg>
  );
}

export default function Chatbot({ repoCount }) {
  const [open, setOpen] = useState(false);
  const [typing, setTyping] = useState(false);
  const [msgs, setMsgs] = useState([
    {
      from: "bot",
      text: "Hi! 👋 I'm GV Bot — Gagan's AI sidekick. Ask me anything, or tap a suggestion:",
      chips: STARTER_CHIPS,
    },
  ]);
  const [input, setInput] = useState("");
  const [nudge, setNudge] = useState(false);
  const bodyRef = useRef(null);

  // allow other components (e.g. ⌘K palette) to open the bot
  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("open-bot", onOpen);
    return () => window.removeEventListener("open-bot", onOpen);
  }, []);

  // gentle attention nudge after a few seconds (once)
  useEffect(() => {
    const seen = sessionStorage.getItem("gvbot_seen");
    if (!seen) {
      const t = setTimeout(() => setNudge(true), 6000);
      return () => clearTimeout(t);
    }
  }, []);

  useEffect(() => {
    if (open) {
      setNudge(false);
      sessionStorage.setItem("gvbot_seen", "1");
    }
  }, [open]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, typing]);

  const send = (raw) => {
    const text = (raw ?? input).trim();
    if (!text) return;
    setMsgs((m) => [...m, { from: "user", text }]);
    setInput("");
    setTyping(true);
    const reply = getReply(text, { repoCount });
    const delay = Math.min(1100, 350 + reply.text.length * 4);
    setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [...m, { from: "bot", ...reply }]);
    }, delay);
  };

  return (
    <>
      {/* launcher */}
      <div className="bot-launch-wrap">
        <AnimatePresence>
          {nudge && !open && (
            <motion.div
              className="bot-nudge"
              initial={{ opacity: 0, y: 8, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              Need help? Ask me! 💬
            </motion.div>
          )}
        </AnimatePresence>
        <motion.button
          className="bot-launch"
          onClick={() => setOpen((o) => !o)}
          whileHover={{ scale: 1.08, rotate: open ? 0 : -8 }}
          whileTap={{ scale: 0.92 }}
          animate={nudge && !open ? { y: [0, -6, 0] } : {}}
          transition={nudge ? { duration: 1.2, repeat: Infinity } : {}}
          aria-label="Open chat"
        >
          {open ? "✕" : <BotRobot className="launch-robot" />}
          {!open && <span className="bot-ping" />}
        </motion.button>
      </div>

      {/* panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="bot-panel"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
          >
            <div className="bot-head">
              <div className="bot-id">
                <span className="bot-ava"><BotRobot /></span>
                <div>
                  <strong>GV Bot</strong>
                  <span className="bot-status"><i /> online · AI sidekick</span>
                </div>
              </div>
              <button className="bot-close" onClick={() => setOpen(false)} aria-label="Close">✕</button>
            </div>

            <div className="bot-body" ref={bodyRef}>
              {msgs.map((m, i) => (
                <div key={i} className={`bot-row ${m.from}`}>
                  {m.from === "bot" && <span className="bot-mini"><BotRobot /></span>}
                  <div className="bot-bubble">
                    <span className="bot-text">{m.text}</span>
                    {m.links && (
                      <div className="bot-links">
                        {m.links.map((l) => (
                          <a
                            key={l.label}
                            href={l.href}
                            target={l.href.startsWith("mailto") ? undefined : "_blank"}
                            rel="noreferrer"
                          >
                            {l.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {typing && (
                <div className="bot-row bot">
                  <span className="bot-mini"><BotRobot /></span>
                  <div className="bot-bubble typing">
                    <span /><span /><span />
                  </div>
                </div>
              )}

              {/* chips from the latest bot message */}
              {!typing && lastChips(msgs) && (
                <div className="bot-chips">
                  {lastChips(msgs).map((c) => (
                    <button key={c} onClick={() => send(c)}>{c}</button>
                  ))}
                </div>
              )}
            </div>

            <form
              className="bot-input"
              onSubmit={(e) => { e.preventDefault(); send(); }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Gagan…"
                aria-label="Message"
              />
              <button type="submit" aria-label="Send">➤</button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function lastChips(msgs) {
  for (let i = msgs.length - 1; i >= 0; i--) {
    if (msgs[i].from === "bot") return msgs[i].chips || null;
  }
  return null;
}
