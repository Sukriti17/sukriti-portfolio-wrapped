import { profile } from "../data/profile";
import { useMemo, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import GlassCard from "../ui/GlassCard";
import { useSwipeable } from "react-swipeable";


const slides = ["intro", "skills", "experience", "projects", "certs", "contact"];


// for now only 1 slide, we will add others slowly

function GradientBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Pastel animated gradient (main layer) */}
      <div className="absolute inset-0 bg-[linear-gradient(120deg,#ffb86c,#ff7eb3,#b28dff,#7afcff,#ffd36e)] bg-[length:300%_300%] animate-pastel" />

      {/* Extra soft wash (for smoother blend) */}
      <div className="absolute inset-0 opacity-70 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.20),transparent_55%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.12),transparent_60%)]" />

      {/* Premium depth overlay so text stays readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/25 to-black/55" />

      {/* Grain */}
      <div className="noise" />
    </div>
  );
}



function SlideShell({ subtitle, title, children }) {
  return (
<div className="min-h-screen w-full flex items-center justify-center px-4 pt-32 pb-10">
      <div className="w-full max-w-6xl">
        <div className="mb-7">
          <p className="text-xs tracking-[0.25em] text-white/60 uppercase">
            {subtitle}
          </p>
          <h1 className="mt-2 text-4xl md:text-6xl font-semibold text-white tracking-tight">

            {title}
          </h1>
        </div>
        {children}
      </div>
    </div>
  );
}

function MetricRow({ items = [] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
      {items.map((m, i) => (
        <div
          key={i}
          className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-4 py-3"
        >
          <p className="text-white text-2xl font-semibold tracking-tight">
            {m.value}
          </p>
          <p className="text-white/70 text-xs mt-1">{m.label}</p>
        </div>
      ))}
    </div>
  );
}
function CursorGlow() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-10"
      aria-hidden="true"
    >
      <div
        className="absolute h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[90px] opacity-30"
        style={{
          left: pos.x,
          top: pos.y,
          background:
            "radial-gradient(circle, rgba(255,255,255,0.22), transparent 60%)",
        }}
      />
    </div>
  );
}

export default function WrappedPortfolio() {
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);


  function next() {
  if (loading) return;
  setIndex((i) => Math.min(i + 1, slides.length - 1));
}

  function prev() {
  if (loading) return;
  setIndex((i) => Math.max(i - 1, 0));
}

useEffect(() => {
  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  };

  window.addEventListener("keydown", onKeyDown);
  return () => window.removeEventListener("keydown", onKeyDown);
}, []);
useEffect(() => {
  const t = setTimeout(() => setLoading(false), 1600);
  return () => clearTimeout(t);
}, []);

  const handlers = useSwipeable({
    onSwipedLeft: () => next(),
    onSwipedRight: () => prev(),
    preventScrollOnSwipe: true,
    trackMouse: true,
  });


  return (
<div {...handlers} className="relative">

      <GradientBackground />
      <CursorGlow />

        {/* INTRO LOADER */}
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[999] grid place-items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-2xl" />

          <motion.div
            className="relative text-center px-6"
            initial={{ y: 20, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -10, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-white/70 text-sm tracking-[0.25em] uppercase">
              Career Wrapped
            </p>
            <h1 className="mt-3 text-4xl md:text-6xl font-semibold text-white tracking-tight">
              Sukriti Wrapped 2025 ✨
            </h1>
            <p className="mt-4 text-white/70 text-base">
              Loading your story...
            </p>

            <div className="mt-7 flex justify-center">
              <div className="h-10 w-10 rounded-full border-4 border-white/25 border-t-white animate-spin" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
      {/* TOP DOTS / HUD */}
      <div className="fixed top-5 left-1/2 -translate-x-1/2 z-20 w-[min(92vw,980px)]">
<div className="relative flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-4 py-3 shadow-soft overflow-hidden">
{/* Progress bar */}
<div className="absolute left-0 top-0 h-[2px] w-full bg-white/10">
  <div
    className="h-full bg-white/80 transition-all duration-500"
    style={{ width: `${((index + 1) / slides.length) * 100}%` }}
  />
</div>

          <div className="leading-tight">
            <p className="text-white text-sm font-medium">{profile.name}</p>
            <p className="text-white/60 text-xs flex items-center gap-2">
  <span>{profile.role}</span>
  <span className="text-white/30">•</span>

  <AnimatePresence mode="wait" initial={false}>
    <motion.span
      key={index}
      className="tabular-nums text-white/80"
      initial={{ y: 8, opacity: 0, filter: "blur(4px)" }}
      animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
      exit={{ y: -8, opacity: 0, filter: "blur(6px)" }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {(index + 1).toString().padStart(2, "0")}
    </motion.span>
  </AnimatePresence>

  <span className="text-white/30">/</span>

  <span className="tabular-nums text-white/50">
    {slides.length.toString().padStart(2, "0")}
  </span>
</p>



          </div>

          <div className="flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={[
                  "h-2.5 w-2.5 rounded-full transition-all",
                  i === index ? "bg-white w-7" : "bg-white/25 hover:bg-white/40",
                ].join(" ")}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* SLIDES */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -16, filter: "blur(10px)" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }
          
        }
        >
          {/* INTRO SLIDE */}
          {slides[index] === "intro" && (
            <SlideShell subtitle="Career Wrapped" title="Sukriti’s Portfolio Wrap ">
              <MetricRow items={profile.metrics.intro} />
              <div className="grid md:grid-cols-2 gap-6">
                <GlassCard className="p-6">
                  <p className="text-white/70 text-sm">Welcome to</p>
                  <h2 className="text-white text-3xl font-semibold mt-2">
                    My Career Wrapped
                  </h2>
                  <p className="text-white/70 mt-3">
                    A premium, story-style portfolio with smooth transitions,
                    elegant glass cards, and my real journey.
                  </p>

                  <div className="mt-6 flex gap-3">
                    <button
                      onClick={next}
                      className="rounded-xl px-5 py-3 bg-white text-black font-medium hover:opacity-90 transition"
                    >
                      Start →
                    </button>
                    <a
                    className="rounded-xl px-5 py-3 border border-white/15 text-white/90 hover:bg-white/5 transition"
                    href={profile.links.github}
                    target="_blank"
                    rel="noreferrer"
                    >
                    View GitHub
                    </a>
                    <a
  href="https://sukriti17.github.io/sukriti-portfolio-wrapped/Sukriti_Singh_Resume.pdf"
  target="_blank"
  rel="noopener noreferrer"
  className="rounded-xl px-5 py-3 border border-white/15 text-white/90 hover:bg-white/5 transition"
>
  View Resume
</a>




                  </div>
                </GlassCard>

                <div className="grid gap-4">
                  {profile.highlights.map((h, i) => (

                    <GlassCard key={i} className="p-5">
                      <p className="text-white text-sm font-medium">{h}</p>
                    </GlassCard>
                  ))}
                </div>
              </div>
            </SlideShell>
          )}

          {/* SKILLS SLIDE */}
          {slides[index] === "skills" && (
            <SlideShell subtitle="Skills" title="What I’m strongest at">
              <MetricRow items={profile.metrics.skills} />
              <div className="grid md:grid-cols-2 gap-6">
                <GlassCard className="p-6">
                  <h3 className="text-white font-semibold text-lg mb-3">
                    Core Strength
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.core.map((s) => (

                      <span
                        key={s}
                        className="px-3 py-1 rounded-full text-xs text-white/85 border border-white/10 bg-white/5"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </GlassCard>

                <GlassCard className="p-6">
                  <h3 className="text-white font-semibold text-lg mb-3">
                    Tools I use
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.tools.map((s) => (

                      <span
                        key={s}
                        className="px-3 py-1 rounded-full text-xs text-white/85 border border-white/10 bg-white/5"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </GlassCard>

                <GlassCard className="p-6 md:col-span-2">
                  <h3 className="text-white font-semibold text-lg mb-3">
                    Engineering mindset
                  </h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {profile.skills.mindset.map((s) => (

                      <div
                        key={s}
                        className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white/85 text-sm"
                      >
                        {s}
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </div>
            </SlideShell>
          )}
          {/* EXPERIENCE SLIDE */}
            {slides[index] === "experience" && (
            <SlideShell subtitle="Experience" title="Where I created impact">
              <MetricRow items={profile.metrics.experience} />
                <div className="grid gap-6">
                {profile.experience.map((e) => (
                    <GlassCard key={e.title} className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <div>
                        <h3 className="text-white font-semibold text-xl">{e.title}</h3>
                        <p className="text-white/70">{e.company}</p>
                        </div>
                        <span className="text-white/60 text-sm">{e.period}</span>
                    </div>

                        <ul className="mt-4 grid md:grid-cols-2 gap-2">
                        {e.bullets.map((b, i) => (
                        <li
                            key={i}
                            className="text-white/80 text-sm rounded-xl border border-white/10 bg-white/5 px-4 py-3"
                        >
                            {b}
                        </li>
                        ))}
                    </ul>
                    </GlassCard>
                ))}
             </div>
            </SlideShell>
            )}
        {/* PROJECTS SLIDE */}
{slides[index] === "projects" && (
  <SlideShell subtitle="Projects" title="Things I built end-to-end">
    <MetricRow items={profile.metrics.projects} />
    <div className="grid md:grid-cols-3 gap-6">
      {profile.projects.map((p) => (
        <GlassCard key={p.title} className="p-6 hover:border-white/20 transition">
          <h3 className="text-white font-semibold text-lg">{p.title}</h3>
          <div className="mt-4 space-y-3 text-sm text-white/75 leading-relaxed">
  <div>
    <p className="text-white/50 text-xs uppercase tracking-[0.2em]">
      Problem
    </p>
    <p className="mt-1">{p.problem}</p>
  </div>

  <div>
    <p className="text-white/50 text-xs uppercase tracking-[0.2em]">
      What I built
    </p>
    <p className="mt-1">{p.build}</p>
  </div>

  <div>
    <p className="text-white/50 text-xs uppercase tracking-[0.2em]">
      Result
    </p>
    <p className="mt-1 text-white/85">{p.result}</p>
  </div>
</div>
{/* Key bullet pointers */}
<ul className="mt-4 space-y-2">
  {p.bullets?.slice(0, 5).map((b, i) => (
    <li key={i} className="flex gap-2 text-sm text-white/75 leading-relaxed">
      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/45 shrink-0" />
      <span>{b}</span>
    </li>
  ))}
</ul>


          <div className="mt-4 flex flex-wrap gap-2">
            {p.stack.map((s) => (
              <span
                key={s}
                className="px-2.5 py-1 rounded-full text-[11px] text-white/85 border border-white/10 bg-white/5"
              >
                {s}
              </span>
            ))}
          </div>
        </GlassCard>
      ))}
    </div>
  </SlideShell>
)}
{/* CERTS SLIDE */}
{slides[index] === "certs" && (
  <SlideShell subtitle="Certificates" title="Proof of credibility">
    <MetricRow items={profile.metrics.certs} />
    <div className="grid md:grid-cols-2 gap-4">
      {profile.certificates.map((c) => (
        <GlassCard key={c} className="p-5">
          <p className="text-white/90 text-sm font-medium">{c}</p>
        </GlassCard>
      ))}
    </div>
  </SlideShell>
)}
{/* CONTACT SLIDE */}
{slides[index] === "contact" && (
  <SlideShell subtitle="Contact" title="Let’s build something great">
    <MetricRow items={profile.metrics.contact} />
    <div className="grid md:grid-cols-2 gap-6">
      <GlassCard className="p-6">
        <h3 className="text-white font-semibold text-lg">Reach me</h3>

        <div className="mt-4 space-y-2 text-white/75 text-sm">
          <p>Email: {profile.contact.email}</p>
          <p>Phone: {profile.contact.phone}</p>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <a
            className="rounded-xl px-5 py-3 bg-white text-black font-medium hover:opacity-90 transition"
            href={`mailto:${profile.contact.email}`}
          >
            Email me
          </a>

          <a
            className="rounded-xl px-5 py-3 border border-white/15 text-white/90 hover:bg-white/5 transition"
            href={profile.links.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>

          <a
            className="rounded-xl px-5 py-3 border border-white/15 text-white/90 hover:bg-white/5 transition"
            href={profile.links.github}
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a
  className="rounded-xl px-5 py-3 border border-white/15 text-white/90 hover:bg-white/5 transition"
  href="/Sukriti_Singh_Resume.pdf"
  download
>
  Resume
</a>

        </div>
      </GlassCard>

      <GlassCard className="p-6">
        <p className="text-white/70 text-sm">Wrap completed</p>
        <p className="text-white text-xl font-semibold mt-2">That’s your wrap ✨</p>
        <p className="text-white/70 mt-3">
          Use arrows or dots to revisit sections anytime.
        </p>

        <div className="mt-6 flex gap-3">
          <button
            onClick={() => setIndex(0)}
            className="rounded-xl px-5 py-3 bg-white text-black font-medium hover:opacity-90 transition"
          >
            Restart
          </button>
        </div>
      </GlassCard>
    </div>
  </SlideShell>
)}


        </motion.div>
      </AnimatePresence>

      {/* BOTTOM NAV */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-20">
        <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-3 py-2 shadow-soft">
          <button
            onClick={prev}
            className="px-4 py-2 rounded-xl border border-white/10 text-white/85 hover:bg-white/5 transition"
          >
            ←
          </button>
          <button
            onClick={next}
            className="px-4 py-2 rounded-xl bg-white text-black font-medium hover:opacity-90 transition"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
