"use client";

import {
  Brain, Code2, Database, Cpu, MapPin, Calendar,
  GraduationCap, Github, Star, Lightbulb, Award,
  ArrowUpRight, Zap, Activity, Terminal, Globe,
  GitCommit, Rocket, ChevronRight
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

// ─── Data ─────────────────────────────────────────────────────────────────────

const STATS = [
  { value: "15+",  label: "Projects",     icon: Rocket,    color: "text-lime-400",   hov: "group-hover:text-lime-400"   },
  { value: "200+", label: "Commits",      icon: GitCommit, color: "text-sky-400",    hov: "group-hover:text-sky-400"    },
  { value: "11",   label: "Certs",        icon: Award,     color: "text-violet-400", hov: "group-hover:text-violet-400" },
  { value: "19+",  label: "Repos",        icon: Github,    color: "text-orange-400", hov: "group-hover:text-orange-400" },
];

const EXPERTISE = [
  {
    icon: Brain,    title: "AI / ML",
    desc: "PyTorch · TensorFlow · LLMs · RAG · Computer Vision",
    accent: { text: "text-violet-400", border: "border-violet-500/20", bg: "bg-violet-500/8" },
    tags: ["PyTorch", "TensorFlow", "OpenCV", "RAG"],
  },
  {
    icon: Code2,    title: "Full-Stack",
    desc: "React · Next.js · Node.js · TypeScript · Tailwind",
    accent: { text: "text-sky-400",    border: "border-sky-500/20",    bg: "bg-sky-500/8"    },
    tags: ["React", "Next.js", "TypeScript", "Tailwind"],
  },
  {
    icon: Database, title: "Backend / DB",
    desc: "FastAPI · Flask · PostgreSQL · Redis · Prisma",
    accent: { text: "text-emerald-400",border: "border-emerald-500/20",bg: "bg-emerald-500/8"},
    tags: ["FastAPI", "PostgreSQL", "Redis", "Docker"],
  },
  {
    icon: Cpu,      title: "DevOps",
    desc: "Docker · Linux · GitHub Actions · n8n · CI/CD",
    accent: { text: "text-orange-400", border: "border-orange-500/20", bg: "bg-orange-500/8" },
    tags: ["Docker", "Git", "Linux", "CI/CD"],
  },
];

const ACHIEVEMENTS = [
  { icon: Star,      label: "Academic Projects", value: "5+",  color: "text-yellow-400" },
  { icon: Github,    label: "GitHub Repos",       value: "19+", color: "text-lime-400"   },
  { icon: Lightbulb, label: "AI Projects",        value: "5+",  color: "text-violet-400" },
  { icon: Award,     label: "Certifications",     value: "11",  color: "text-sky-400"    },
];

const TERMINAL_LINES = [
  { prefix: "$", text: "whoami",                             color: "text-zinc-300"    },
  { prefix: ">", text: "Lavudya Rajaram",                    color: "text-lime-400"    },
  { prefix: "$", text: "cat role.txt",                       color: "text-zinc-300"    },
  { prefix: ">", text: "ML Eng. + Full-Stack Dev",           color: "text-sky-400"     },
  { prefix: "$", text: "echo $STATUS",                       color: "text-zinc-300"    },
  { prefix: ">", text: "Open · Immediate start · Remote OK", color: "text-emerald-400" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function AboutPreview() {
  const [ready,   setReady]   = useState(false);
  const [lineIdx, setLineIdx] = useState(0);
  const [visibleLines, setVis] = useState<number[]>([]);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setReady(true); },
      { threshold: 0.05 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!ready || lineIdx >= TERMINAL_LINES.length) return;
    const t = setTimeout(() => {
      setVis(p => [...p, lineIdx]);
      setLineIdx(p => p + 1);
    }, 700);
    return () => clearTimeout(t);
  }, [ready, lineIdx]);

  return (
    <section id="about" ref={ref} className="bg-black text-white">
      <div className={`max-w-screen-xl mx-auto px-6 md:px-14 py-12 space-y-5 transition-all duration-700 ${ready ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>

        {/* ══ ROW 1 — Headline + Status ══ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* Headline — 2 cols */}
          <div className="lg:col-span-2 bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 md:p-12 flex flex-col justify-between min-h-[260px] relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-lime-500/0 via-lime-500/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" />

            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-lime-400" />
              <span className="font-mono text-xs text-zinc-600 tracking-widest uppercase">01 — About</span>
            </div>

            <div>
              <h2 className="font-black tracking-tighter leading-none text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                Building with
              </h2>
              <h2 className="font-black tracking-tighter leading-none text-lime-400 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                purpose.
              </h2>
              <p className="text-zinc-500 text-sm mt-5 max-w-lg leading-7">
                I'm Lavudya Rajaram — an ML engineer and full-stack developer crafting intelligent
                systems and polished interfaces. Every project ships with clean code, clear thinking,
                and an obsession with getting things right.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <Link href="#contact"
                className="group/b flex items-center justify-center gap-2 bg-lime-400 hover:bg-lime-300 text-black text-xs font-bold px-5 py-2.5 rounded-xl transition-all duration-200 hover:-translate-y-px hover:shadow-lg hover:shadow-lime-400/20 w-full sm:w-auto">
                Let's work together
                <ArrowUpRight size={13} className="transition-transform duration-200 group-hover/b:translate-x-0.5 group-hover/b:-translate-y-0.5" />
              </Link>
              <Link href="/hireme"
                className="group/b flex items-center justify-center gap-2 border border-zinc-800 hover:border-lime-500/30 hover:bg-lime-500/5 text-zinc-400 hover:text-white text-xs font-medium px-5 py-2.5 rounded-xl transition-all duration-200 w-full sm:w-auto">
                <Zap size={12} className="text-zinc-600 group-hover/b:text-lime-400 transition-colors" />
                Why hire me
                <ChevronRight size={11} className="text-zinc-700 group-hover/b:text-lime-400 transition-colors" />
              </Link>
            </div>
          </div>

          {/* Status card */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-5 sm:p-7 flex flex-col justify-between gap-5">
            <div>
              <div className="flex items-center justify-between mb-5 pb-5 border-b border-zinc-900">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-50" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-lime-400" />
                  </span>
                  <span className="font-mono text-xs text-lime-400 uppercase tracking-widest">Available</span>
                </div>
                <Activity size={12} className="text-zinc-700" />
              </div>

              <div className="space-y-3">
                {[
                  { Ic: MapPin,        t: "Hyderabad, India"          },
                  { Ic: Calendar,      t: "6+ months experience"      },
                  { Ic: GraduationCap, t: "B.Tech CSE · 2022–2026"   },
                  { Ic: Globe,         t: "Remote · Hybrid · On-site" },
                ].map(({ Ic, t }) => (
                  <div key={t} className="flex items-center gap-2.5">
                    <Ic size={12} className="text-zinc-700 shrink-0" />
                    <span className="font-mono text-xs text-zinc-500">{t}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
              <p className="font-mono text-xs text-zinc-500 leading-6 italic">
                "Built alone, breaking silently, choosing growth over comfort every single day."
              </p>
            </div>

            <div className="flex gap-2">
              {[
                { Ic: Github,   href: "https://github.com/lavudyaraja",               label: "GitHub"   },
                { Ic: Terminal, href: "mailto:codeml862@gmail.com",                    label: "Email"    },
                { Ic: Globe,    href: "https://www.linkedin.com/in/lavudyaraja5228/",  label: "LinkedIn" },
              ].map(({ Ic, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" title={label}
                  className="flex-1 h-9 bg-zinc-900 border border-zinc-800 hover:border-zinc-600 rounded-xl flex items-center justify-center text-zinc-600 hover:text-white transition-all duration-200 hover:-translate-y-px">
                  <Ic size={14} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ══ ROW 2 — 4 stat cards ══ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {STATS.map(({ value, label, icon: Ic, color, hov }) => (
            <div key={label}
              className="group bg-zinc-950 border border-zinc-800 hover:border-zinc-700 rounded-2xl p-4 sm:p-5 flex flex-col gap-3 transition-all duration-200 hover:-translate-y-0.5 cursor-default">
              <Ic size={12} className={`${color} shrink-0 sm:size-13`} />
              <p className={`font-black text-2xl sm:text-3xl leading-none text-white ${hov} transition-colors duration-200`}>{value}</p>
              <p className="font-mono text-xs text-zinc-600">{label}</p>
            </div>
          ))}
        </div>

        {/* ══ ROW 3 — Expertise + Terminal + Achievements ══ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* Expertise 2×2 */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {EXPERTISE.map(({ icon: Ic, title, desc, accent, tags }) => (
              <div key={title}
                className={`group bg-zinc-950 border border-zinc-800 hover:${accent.border} rounded-2xl p-4 sm:p-6 flex flex-col gap-3 transition-all duration-200 hover:-translate-y-0.5`}>
                <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl ${accent.bg} border ${accent.border} flex items-center justify-center shrink-0`}>
                 <Ic size={16} className={`${accent.text} w-4 h-4 sm:w-6 sm:h-6`} />
                </div>
                <div>
                  <p className="font-bold text-white text-sm mb-1">{title}</p>
                  <p className="font-mono text-xs text-zinc-600 leading-5">{desc}</p>
                </div>
                <div className="flex flex-wrap gap-1 sm:gap-1.5 mt-auto pt-3 border-t border-zinc-900">
                  {tags.map(t => (
                    <span key={t} className={`font-mono text-xs px-2 py-0.5 rounded-md ${accent.bg} border ${accent.border} ${accent.text}`}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Terminal + Achievements */}
          <div className="flex flex-col gap-5">

            {/* Terminal */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden flex-1">
              <div className="flex items-center gap-2 px-3 sm:px-4 py-3 border-b border-zinc-900 bg-zinc-900/40">
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-red-500/60" />
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-yellow-500/60" />
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-green-500/60" />
                <div className="flex-1 flex items-center justify-center gap-2">
                  <Terminal size={9} className="text-zinc-600 sm:size-10" />
                  <span className="font-mono text-xs text-zinc-600 hidden sm:inline">rajaram — about</span>
                  <span className="font-mono text-xs text-zinc-600 sm:hidden">rajaram</span>
                </div>
              </div>
              <div className="p-4 sm:p-5 space-y-2 sm:space-y-2.5 min-h-[176px]">
                {TERMINAL_LINES.map((line, i) => (
                  <div key={i}
                    className={`flex gap-2 font-mono text-xs transition-all duration-300 ${visibleLines.includes(i) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"}`}>
                    <span className="text-lime-400 shrink-0">{line.prefix}</span>
                    <span className={line.color}>{line.text}</span>
                  </div>
                ))}
                {lineIdx < TERMINAL_LINES.length && (
                  <div className="flex gap-2 font-mono text-xs">
                    <span className="text-lime-400">$</span>
                    <span className="inline-block w-0.5 h-3.5 bg-lime-400 animate-pulse" />
                  </div>
                )}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4 sm:p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-4 bg-lime-400" />
                <span className="font-mono text-xs text-zinc-600 uppercase tracking-widest">Achievements</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                {ACHIEVEMENTS.map(({ icon: Ic, label, value, color }) => (
                  <div key={label}
                    className="group flex items-center gap-2.5 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-xl px-3 py-2.5 transition-all duration-200 cursor-default">
                    <Ic size={12} className={color} />
                    <div>
                      <p className="font-black text-white text-sm leading-none">{value}</p>
                      <p className="font-mono text-xs text-zinc-700 mt-0.5 leading-tight">{label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}