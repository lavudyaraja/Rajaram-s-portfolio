"use client";

import {
  GraduationCap, MapPin, Calendar, Award,
  BookOpen, University, Building, School,
  ChevronRight, Star, Code2, Brain, ArrowUpRight
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const EDUCATION = [
  {
    id: "btech",
    degree: "B.Tech Computer Science & Engineering",
    institution: "Central University of Haryana",
    location: "Haryana, India",
    period: "2022 – 2026",
    status: "Pursuing",
    score: "In Progress",
    icon: University,
    accent: { text: "text-sky-400", border: "border-sky-500/20", bg: "bg-sky-500/8", dot: "bg-sky-400" },
    achievements: [
      "Advanced algorithms & data structures",
      "Machine Learning concentration",
      "Full-stack web development track",
      "Software engineering principles",
    ],
    coursework: [
      "Data Structures & Algorithms",
      "Machine Learning",
      "Web Development",
      "Database Management Systems",
      "Software Engineering",
      "Computer Networks",
      "Artificial Intelligence",
    ],
  },
  {
    id: "intermediate",
    degree: "Intermediate — MPC",
    institution: "TTWREIS COE Boys Narsapur",
    location: "Narsapur, India",
    period: "2019 – 2021",
    status: "Completed",
    score: "91%",
    icon: Building,
    accent: { text: "text-violet-400", border: "border-violet-500/20", bg: "bg-violet-500/8", dot: "bg-violet-400" },
    achievements: [
      "Strong foundation in Mathematics",
      "Physics and Chemistry focus",
      "Analytical thinking development",
      "Problem-solving excellence",
    ],
    coursework: [
      "Mathematics",
      "Physics",
      "Chemistry",
      "Computer Science",
      "English Communication",
    ],
  },
  {
    id: "ssc",
    degree: "Secondary School Certificate",
    institution: "ZPHS Boys No-2 Pargi",
    location: "Pargi, Telangana, India",
    period: "2018 – 2019",
    status: "Completed",
    score: "83%",
    icon: School,
    accent: { text: "text-lime-400", border: "border-lime-500/20", bg: "bg-lime-500/8", dot: "bg-lime-400" },
    achievements: [
      "SSC Board of Secondary Education",
      "Strong academic foundation",
      "Excellence in Mathematics & Science",
    ],
    coursework: [
      "Mathematics",
      "Science",
      "Social Studies",
      "English",
      "Telugu",
      "Hindi",
    ],
  },
];

const STATS = [
  { value: "3",    label: "Levels"     },
  { value: "20+",  label: "Courses"    },
  { value: "91%",  label: "Best Score" },
  { value: "4",    label: "Years"      },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function Education() {
  const [active, setActive] = useState<string>("btech");
  const [ready, setReady]   = useState(false);
  const sectionRef          = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setReady(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const current = EDUCATION.find(e => e.id === active)!;
  const { accent } = current;

  return (
    <section id="education" ref={sectionRef} className="bg-black text-white">

      <div className={`max-w-screen-xl mx-auto px-6 md:px-14 py-12 space-y-5 transition-all duration-700 ${ready ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>

        {/* ══ HEADER ROW ══ */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-zinc-900">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8 bg-lime-400" />
              <span className="font-mono text-xs text-zinc-600 tracking-widest uppercase">02 — Education</span>
            </div>
            <h2 className="font-black tracking-tighter leading-none text-white text-5xl sm:text-6xl xl:text-7xl">
              Academic
            </h2>
            <h2 className="font-black tracking-tighter leading-none text-lime-400 text-5xl sm:text-6xl xl:text-7xl">
              Journey.
            </h2>
          </div>

          {/* Stat strip */}
          <div className="flex gap-3 flex-wrap lg:flex-nowrap shrink-0">
            {STATS.map(({ value, label }) => (
              <div key={label} className="bg-zinc-950 border border-zinc-800 rounded-2xl px-5 py-4 text-center min-w-[80px]">
                <p className="font-black text-white text-2xl leading-none">{value}</p>
                <p className="font-mono text-xs text-zinc-600 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ══ MAIN BENTO ══ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* Left — tab selector + timeline */}
          <div className="lg:col-span-1 flex flex-col gap-3">
            {EDUCATION.map((edu, i) => {
              const Ic = edu.icon;
              const isActive = active === edu.id;
              return (
                <button key={edu.id}
                  onClick={() => setActive(edu.id)}
                  className={`group w-full bg-zinc-950 border rounded-2xl p-5 text-left transition-all duration-200 hover:-translate-y-px ${
                    isActive
                      ? `${edu.accent.border} ${edu.accent.bg}`
                      : "border-zinc-800 hover:border-zinc-700"
                  }`}>
                  <div className="flex items-start gap-3">
                    {/* Timeline dot + line */}
                    <div className="flex flex-col items-center gap-1 shrink-0 pt-0.5">
                      <div className={`w-2.5 h-2.5 rounded-full transition-colors ${isActive ? edu.accent.dot : "bg-zinc-700"}`} />
                      {i < EDUCATION.length - 1 && (
                        <div className="w-px flex-1 min-h-[24px] bg-zinc-800" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Ic size={12} className={isActive ? edu.accent.text : "text-zinc-600"} />
                        <span className={`font-mono text-xs ${isActive ? edu.accent.text : "text-zinc-600"}`}>{edu.period}</span>
                      </div>
                      <p className={`font-bold text-sm leading-tight transition-colors ${isActive ? "text-white" : "text-zinc-400 group-hover:text-zinc-200"}`}>
                        {edu.degree}
                      </p>
                      <p className="font-mono text-xs text-zinc-600 mt-1 truncate">{edu.institution}</p>
                    </div>

                    <ChevronRight size={12}
                      className={`shrink-0 mt-1 transition-all duration-200 ${isActive ? `${edu.accent.text} translate-x-0.5` : "text-zinc-800 group-hover:text-zinc-600"}`} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right — detail panel */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-5">

            {/* Header card */}
            <div className={`sm:col-span-2 bg-zinc-950 border ${accent.border} ${accent.bg} rounded-2xl p-7`}>
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`w-8 h-8 rounded-xl ${accent.bg} border ${accent.border} flex items-center justify-center`}>
                      {(() => { const Ic = current.icon; return <Ic size={14} className={accent.text} />; })()}
                    </div>
                    <span className={`font-mono text-xs uppercase tracking-widest ${accent.text}`}>{current.status}</span>
                  </div>
                  <h3 className="font-black text-white text-xl sm:text-2xl leading-tight tracking-tight mb-2">
                    {current.degree}
                  </h3>
                  <p className={`font-bold text-sm ${accent.text}`}>{current.institution}</p>
                </div>

                <div className="flex gap-3 shrink-0">
                  <div className={`text-center bg-zinc-950 border ${accent.border} rounded-xl px-4 py-3`}>
                    <p className={`font-black text-lg leading-none ${accent.text}`}>{current.score}</p>
                    <p className="font-mono text-xs text-zinc-600 mt-1">Score</p>
                  </div>
                  <div className="text-center bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3">
                    <p className="font-black text-lg leading-none text-white">{current.period.split("–")[0].trim()}</p>
                    <p className="font-mono text-xs text-zinc-600 mt-1">Start</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-zinc-900">
                <MapPin size={11} className="text-zinc-700" />
                <span className="font-mono text-xs text-zinc-600">{current.location}</span>
                <div className="flex-1" />
                <Calendar size={11} className="text-zinc-700" />
                <span className="font-mono text-xs text-zinc-600">{current.period}</span>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-4 bg-lime-400" />
                <span className="font-mono text-xs text-zinc-600 uppercase tracking-widest">Achievements</span>
              </div>
              <div className="space-y-2.5">
                {current.achievements.map((a, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <Star size={10} className={`${accent.text} shrink-0 mt-0.5`} />
                    <span className="text-zinc-400 text-xs leading-5">{a}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Coursework */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-4 bg-lime-400" />
                <span className="font-mono text-xs text-zinc-600 uppercase tracking-widest">Coursework</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {current.coursework.map(c => (
                  <span key={c}
                    className={`font-mono text-xs px-2.5 py-1 rounded-lg border ${accent.bg} ${accent.border} ${accent.text}`}>
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}