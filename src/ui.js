import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ============================================================
   Reusable polish components for the "remaster" pass.
   ============================================================ */

/* --- intro preloader (once per session) --- */
export function Preloader() {
  const [done, setDone] = useState(() => !!sessionStorage.getItem("gv_loaded"));
  useEffect(() => {
    if (done) return;
    const t = setTimeout(() => {
      setDone(true);
      sessionStorage.setItem("gv_loaded", "1");
    }, 1700);
    return () => clearTimeout(t);
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="pre-logo"
            initial={{ scale: 0.6, rotate: -12, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 140, damping: 12 }}
          >
            GV
          </motion.div>
          <div className="pre-bar"><motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
          /></div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Loading something cool…
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* --- count-up number that animates when scrolled into view ---
   Runs once (guarded), shows the correct final value as a fallback,
   so it's robust even if the IntersectionObserver never fires.       */
export function CountUp({ value }) {
  const ref = useRef(null);
  const started = useRef(false);
  const [display, setDisplay] = useState(null); // null => render raw value

  useEffect(() => {
    const m = String(value).match(/^([^\d]*)([\d.]+)(.*)$/);
    const el = ref.current;
    if (!m || !el) return;
    const target = parseFloat(m[2]);
    const decimals = m[2].includes(".") ? m[2].split(".")[1].length : 0;

    const run = () => {
      if (started.current) return;
      started.current = true;
      const start = performance.now();
      const dur = 1300;
      const tick = (t) => {
        const p = Math.min(1, (t - start) / dur);
        const e = 1 - Math.pow(1 - p, 3);
        setDisplay(`${m[1]}${(target * e).toFixed(decimals)}${m[3]}`);
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => entries.some((e) => e.isIntersecting) && run(),
      { threshold: 0.35 }
    );
    io.observe(el);
    const fallback = setTimeout(run, 2500); // safety net for odd viewports
    return () => {
      io.disconnect();
      clearTimeout(fallback);
    };
  }, [value]);

  return <span ref={ref}>{display == null ? value : display}</span>;
}

/* --- 3D tilt card with a cursor-following glow --- */
export function TiltCard({ children, className = "", href }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--rx", `${(py - 0.5) * -7}deg`);
    el.style.setProperty("--ry", `${(px - 0.5) * 7}deg`);
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
  };
  const reset = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };
  return (
    <a
      ref={ref}
      className={className}
      href={href}
      target="_blank"
      rel="noreferrer"
      onMouseMove={onMove}
      onMouseLeave={reset}
    >
      {children}
    </a>
  );
}

/* --- infinite horizontal marquee --- */
export function Marquee({ items }) {
  const row = [...items, ...items];
  return (
    <div className="marquee" aria-hidden>
      <div className="marquee-track">
        {row.map((t, i) => (
          <span className="marquee-item" key={i}>
            {t}<i className="marquee-dot" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* --- desktop cursor glow --- */
export function CursorGlow() {
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const el = document.createElement("div");
    el.className = "cursor-glow";
    document.body.appendChild(el);
    let raf;
    const move = (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      });
    };
    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
      el.remove();
    };
  }, []);
  return null;
}

/* --- scroll-to-top button (bottom-left, clear of the chatbot) --- */
export function ScrollTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const f = () => setShow(window.scrollY > 700);
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          className="scroll-top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          initial={{ opacity: 0, scale: 0.5, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5 }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Back to top"
        >
          ↑
        </motion.button>
      )}
    </AnimatePresence>
  );
}
