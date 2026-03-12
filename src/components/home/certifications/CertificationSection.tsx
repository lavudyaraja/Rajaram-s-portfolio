"use client";

import {
  Award, Calendar, Building2, ExternalLink,
  Eye, CheckCircle, Play, Pause, ChevronRight,
  ArrowUpRight, Star, Code2, Layers, Zap
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const CERTS = [
  {
    id: 1,
    title: "Frontend Developer (React)",
    org: "HackerRank",
    date: "April 2024",
    category: "Frontend",
    link: "https://www.hackerrank.com/certificates/iframe/ca23b67f365c",
    image: "/certificate/React.png",
    accent: { text: "text-sky-400", border: "border-sky-500/20", bg: "bg-sky-500/8", dot: "bg-sky-400" },
    skills: ["React.js", "JSX", "State Management", "Components"],
    description: "Proficiency in React.js, focusing on component-based architecture, state management, and JSX.",
  },
  {
    id: 2,
    title: "JavaScript (Intermediate)",
    org: "HackerRank",
    date: "March 2025",
    category: "Programming",
    link: "https://www.hackerrank.com/certificates/iframe/213b85bf036d",
    image: "/certificate/Javascript.png",
    accent: { text: "text-yellow-400", border: "border-yellow-500/20", bg: "bg-yellow-500/8", dot: "bg-yellow-400" },
    skills: ["JavaScript", "ES6+", "Async Programming", "DOM"],
    description: "Intermediate-level JavaScript — ES6 features, asynchronous programming, and DOM manipulation.",
  },
  {
    id: 3,
    title: "Problem Solving (Basic)",
    org: "HackerRank",
    date: "March 2025",
    category: "Algorithms",
    link: "https://www.hackerrank.com/certificates/iframe/3c156fb5a40b",
    image: "/certificate/ProblemSolving.png",
    accent: { text: "text-lime-400", border: "border-lime-500/20", bg: "bg-lime-500/8", dot: "bg-lime-400" },
    skills: ["Algorithms", "Data Structures", "Logic", "Analysis"],
    description: "Algorithm and data structure concepts that strengthen analytical thinking and problem-solving.",
  },
  {
    id: 4,
    title: "Python (Basic)",
    org: "HackerRank",
    date: "March 2025",
    category: "Programming",
    link: "https://www.hackerrank.com/certificates/iframe/25449949909c",
    image: "/certificate/Python.png",
    accent: { text: "text-violet-400", border: "border-violet-500/20", bg: "bg-violet-500/8", dot: "bg-violet-400" },
    skills: ["Python", "Syntax", "Functions", "Data Types"],
    description: "Fundamental Python programming skills — syntax, data types, functions, and file handling.",
  },
  // {
  //   id: 5,
  //   title: "SQL (Basic)",
  //   org: "HackerRank",
  //   date: "March 2025",
  //   category: "Database",
  //   link: "https://www.hackerrank.com/certificates/",
  //   image: "/certificate/SQL.png",
  //   accent: { text: "text-orange-400", border: "border-orange-500/20", bg: "bg-orange-500/8", dot: "bg-orange-400" },
  //   skills: ["SQL", "Queries", "Joins", "Aggregations"],
  //   description: "Basic SQL knowledge covering queries, filtering, joins, and aggregate functions.",
  // },
  {
    id: 6,
    title: "C++",
    org: "Udemy",
    date: "March 2025",
    category: "Programming",
    link: "https://www.udemy.com/certificate/UC-82ca3cf6-9b2f-4a62-ad66-54301b2a2744/",
    image: "/certificate/c++.png",
    accent: { text: "text-red-400", border: "border-red-500/20", bg: "bg-red-500/8", dot: "bg-red-400" },
    skills: ["C++", "OOP", "Memory Management", "Data Structures"],
    description: "Essentials of C++ — object-oriented programming, memory management, and data structures.",
  },
  {
    id: 7,
    title: "HTML & JavaScript",
    org: "Udemy",
    date: "March 2024",
    category: "Web Dev",
    link: "https://www.udemy.com/certificate/UC-778af9ca-4661-44f1-ba0d-4f0d4b6f9509/",
    image: "/certificate/HTML.png",
    accent: { text: "text-cyan-400", border: "border-cyan-500/20", bg: "bg-cyan-500/8", dot: "bg-cyan-400" },
    skills: ["HTML5", "JavaScript", "DOM", "Web Structure"],
    description: "Proficiency in HTML5 and JavaScript — webpage structure, interactive elements, client-side scripting.",
  },
  {
    id: 8,
    title: "Java & Python",
    org: "Udemy",
    date: "March 2025",
    category: "Programming",
    link: "https://www.udemy.com/certificate/UC-e5168811-562b-41df-b3a9-e0cea633d7f7/",
    image: "/certificate/pythonJava.png",
    accent: { text: "text-emerald-400", border: "border-emerald-500/20", bg: "bg-emerald-500/8", dot: "bg-emerald-400" },
    skills: ["Java", "Python", "OOP", "Core Features"],
    description: "Fundamental knowledge of Java and Python — OOP and core language features across both.",
  },
  {
    id: 9,
    title: "Java & Spring Boot",
    org: "Udemy",
    date: "September 2024",
    category: "Backend",
    link: "https://www.udemy.com/certificate/UC-f739e0a2-d800-4b98-9f97-e7a6726f08d2/",
    image: "/certificate/SpringBoot.png",
    accent: { text: "text-indigo-400", border: "border-indigo-500/20", bg: "bg-indigo-500/8", dot: "bg-indigo-400" },
    skills: ["Spring Boot", "REST APIs", "Java", "Database Integration"],
    description: "Spring Boot framework for backend apps — dependency injection, RESTful APIs, and database integration.",
  },
  {
    id: 10,
    title: "Machine Learning",
    org: "Udemy",
    date: "March 2025",
    category: "AI / ML",
    link: "https://www.udemy.com/certificate/UC-7b2923c5-93b7-4f9e-b7e8-a5dde2e548df/",
    image: "/certificate/LinearRegression.png",
    accent: { text: "text-purple-400", border: "border-purple-500/20", bg: "bg-purple-500/8", dot: "bg-purple-400" },
    skills: ["ML Algorithms", "Data Processing", "Supervised Learning", "Model Evaluation"],
    description: "Machine learning fundamentals — supervised & unsupervised learning, data preprocessing, and key algorithms.",
  },
  {
    id: 11,
    title: "Software Architecture",
    org: "Udemy",
    date: "March 2025",
    category: "Design",
    link: "https://www.udemy.com/certificate/UC-b0e4c14c-0b1d-46d3-b3d3-41dd2164a538/",
    image: "/certificate/Software.png",
    accent: { text: "text-amber-400", border: "border-amber-500/20", bg: "bg-amber-500/8", dot: "bg-amber-400" },
    skills: ["Design Patterns", "Scalability", "Architecture", "Maintainability"],
    description: "Software architecture principles — design patterns, scalability, and building maintainable systems.",
  },
];

const ORG_STYLE: Record<string, string> = {
  HackerRank: "bg-lime-500/10  text-lime-400  border-lime-500/25",
  Udemy:      "bg-violet-500/10 text-violet-400 border-violet-500/25",
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function Certifications() {
  const [active,      setActive]      = useState(0);
  const [autoPlay,    setAutoPlay]    = useState(true);
  const [imgError,    setImgError]    = useState<Record<number, boolean>>({});

  const next = useCallback(() => setActive(p => (p + 1) % CERTS.length), []);

  useEffect(() => {
    if (!autoPlay) return;
    const id = setInterval(next, 4000);
    return () => clearInterval(id);
  }, [autoPlay, next]);

  const cert = CERTS[active];
  const { accent } = cert;

  return (
    <section id="certificates" className="bg-black text-white">
      <div className="max-w-screen-xl mx-auto px-6 md:px-14 py-12 space-y-5">

        {/* ══ HEADER ══ */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-zinc-900">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8 bg-lime-400" />
              <span className="font-mono text-xs text-zinc-600 tracking-widest uppercase">06 — Certifications</span>
            </div>
            <h2 className="font-black tracking-tighter leading-none text-white text-5xl sm:text-6xl xl:text-7xl">
              Proof of
            </h2>
            <h2 className="font-black tracking-tighter leading-none text-lime-400 text-5xl sm:text-6xl xl:text-7xl">
              Learning.
            </h2>
          </div>

          {/* Stats */}
          <div className="flex gap-3 shrink-0 flex-wrap">
            {[
              { v: "11",       l: "Certs"      },
              { v: "5+",       l: "Categories" },
              { v: "2",        l: "Platforms"  },
              { v: "2024–25",  l: "Period"     },
            ].map(({ v, l }) => (
              <div key={l} className="bg-zinc-950 border border-zinc-800 rounded-2xl px-5 py-4 text-center min-w-[80px]">
                <p className="font-black text-white text-xl leading-none">{v}</p>
                <p className="font-mono text-xs text-zinc-600 mt-1">{l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ══ MAIN BENTO ══ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* ── LEFT: cert list ── */}
          <div className="lg:col-span-1 bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden flex flex-col">

            {/* autoplay toggle */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-zinc-900">
              <div className="flex items-center gap-2">
                <div className="h-px w-4 bg-lime-400" />
                <span className="font-mono text-xs text-zinc-600 uppercase tracking-widest">All Certificates</span>
              </div>
              <button onClick={() => setAutoPlay(p => !p)}
                className={`flex items-center gap-1.5 h-7 px-3 rounded-lg border font-mono text-xs transition-all duration-200 ${
                  autoPlay
                    ? "bg-lime-400/10 border-lime-500/25 text-lime-400"
                    : "bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-zinc-200"
                }`}>
                {autoPlay ? <Pause size={10} /> : <Play size={10} />}
                {autoPlay ? "Pause" : "Play"}
              </button>
            </div>

            {/* scrollable list */}
            <div className="flex-1 overflow-y-auto" style={{ maxHeight: 480 }}>
              {CERTS.map((c, i) => (
                <button key={c.id} onClick={() => { setActive(i); setAutoPlay(false); }}
                  className={`group w-full flex items-center gap-3 px-5 py-3.5 border-b border-zinc-900 text-left transition-all duration-200 ${
                    active === i ? `${c.accent.bg}` : "hover:bg-zinc-900/40"
                  }`}>
                  {/* index */}
                  <span className={`font-mono text-xs shrink-0 w-5 ${active === i ? c.accent.text : "text-zinc-700"}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* dot */}
                  <div className={`w-1.5 h-1.5 rounded-full shrink-0 transition-colors ${active === i ? c.accent.dot : "bg-zinc-700"}`} />

                  <div className="flex-1 min-w-0">
                    <p className={`font-bold text-xs leading-tight truncate transition-colors ${active === i ? "text-white" : "text-zinc-500 group-hover:text-zinc-300"}`}>
                      {c.title}
                    </p>
                    <p className="font-mono text-xs text-zinc-700 mt-0.5">{c.org} · {c.date}</p>
                  </div>

                  <ChevronRight size={11}
                    className={`shrink-0 transition-all duration-200 ${active === i ? `${c.accent.text} translate-x-0.5` : "text-zinc-800 group-hover:text-zinc-600"}`} />
                </button>
              ))}
            </div>

            {/* progress bar */}
            <div className="h-1 bg-zinc-900">
              <div className="h-full bg-lime-400 transition-all duration-300"
                style={{ width: `${((active + 1) / CERTS.length) * 100}%` }} />
            </div>
          </div>

          {/* ── RIGHT: detail view ── */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-5">

            {/* Certificate image card */}
            <div className={`sm:row-span-2 bg-zinc-950 border ${accent.border} ${accent.bg} rounded-2xl overflow-hidden flex flex-col`}>
              <div className="p-5 pb-3 flex items-center justify-between">
                <span className={`font-mono text-xs uppercase tracking-widest ${accent.text}`}>{cert.category}</span>
                <span className={`font-mono text-xs px-2.5 py-1 rounded-full border ${ORG_STYLE[cert.org] ?? "bg-zinc-900 border-zinc-800 text-zinc-500"}`}>
                  {cert.org}
                </span>
              </div>

              {/* Image */}
              <div className="flex-1 mx-5 mb-3 rounded-xl overflow-hidden border border-zinc-800 bg-white flex items-center justify-center min-h-[220px]">
                {imgError[cert.id] ? (
                  <div className="w-full h-full min-h-[220px] flex flex-col items-center justify-center gap-3 bg-zinc-900">
                    <Award size={32} className={accent.text} />
                    <span className="font-mono text-xs text-zinc-600 text-center px-4">{cert.title}</span>
                  </div>
                ) : (
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-contain max-h-[340px] transition-transform duration-500 hover:scale-105 p-2"
                    onError={() => setImgError(p => ({ ...p, [cert.id]: true }))}
                  />
                )}
              </div>

              {/* Pip dots */}
              <div className="flex items-center justify-center gap-1.5 pb-5">
                {CERTS.map((_, i) => (
                  <button key={i} onClick={() => { setActive(i); setAutoPlay(false); }}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      i === active ? "w-5 bg-lime-400" : "w-1.5 bg-zinc-700 hover:bg-zinc-500"
                    }`} />
                ))}
              </div>
            </div>

            {/* Title + meta */}
            <div className={`bg-zinc-950 border ${accent.border} ${accent.bg} rounded-2xl p-6 flex flex-col gap-4`}>
              <div className="flex items-center gap-2">
                <Building2 size={12} className="text-zinc-600" />
                <span className="font-mono text-xs text-zinc-500">{cert.org}</span>
                <div className="flex-1" />
                <Calendar size={11} className="text-zinc-700" />
                <span className="font-mono text-xs text-zinc-600">{cert.date}</span>
              </div>

              <h3 className={`font-black text-white text-xl leading-tight tracking-tight`}>
                {cert.title}
              </h3>

              <p className="text-zinc-500 text-xs leading-6 flex-1">{cert.description}</p>

              <a href={cert.link} target="_blank" rel="noreferrer"
                className="group flex items-center justify-center gap-2 h-10 bg-lime-400 hover:bg-lime-300 text-black text-xs font-bold rounded-xl transition-all duration-200 hover:-translate-y-px hover:shadow-lg hover:shadow-lime-400/25">
                <Eye size={13} />
                View Certificate
                <ArrowUpRight size={12} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>

            {/* Skills */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-4 bg-lime-400" />
                <span className="font-mono text-xs text-zinc-600 uppercase tracking-widest">Skills Covered</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {cert.skills.map(s => (
                  <span key={s}
                    className={`flex items-center gap-1.5 font-mono text-xs px-3 py-1.5 rounded-xl border ${accent.bg} ${accent.border} ${accent.text}`}>
                    <CheckCircle size={9} />
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ══ GRID OVERVIEW ══ */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-lime-400" />
            <span className="font-mono text-xs text-zinc-600 uppercase tracking-widest">All 11 Certifications</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {CERTS.map((c, i) => (
              <button key={c.id} onClick={() => { setActive(i); setAutoPlay(false); }}
                className={`group flex flex-col items-center gap-2.5 bg-zinc-900 border rounded-2xl p-4 text-center transition-all duration-200 hover:-translate-y-0.5 ${
                  active === i
                    ? `${c.accent.border} ${c.accent.bg}`
                    : "border-zinc-800 hover:border-zinc-700"
                }`}>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${c.accent.bg} border ${c.accent.border}`}>
                  <Award size={14} className={c.accent.text} />
                </div>
                <p className={`font-bold text-xs leading-tight text-center transition-colors ${active === i ? "text-white" : "text-zinc-500 group-hover:text-zinc-300"}`}>
                  {c.title.length > 16 ? c.title.slice(0, 15) + "…" : c.title}
                </p>
                <span className={`font-mono text-xs ${c.accent.text} opacity-70`}>{c.org}</span>
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}