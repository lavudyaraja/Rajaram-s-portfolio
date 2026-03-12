"use client";

import {
  ArrowUpRight, Download, Mail, Github, Linkedin, Twitter,
  Zap, Brain, Code2, Server, GitCommit, Star, Award,
  CheckCircle, Clock, Rocket, Users, Target, Layers,
  Terminal, Database, Globe, Shield, TrendingUp,
  MessageSquare, Calendar, MapPin, Coffee, ChevronRight,
  Flame, Package, Cpu, Eye, HeartHandshake
} from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const REASONS = [
  {
    number: "01",
    title: "I Ship, Not Just Build",
    body: "Every project I take on goes to production. From ML models to full-stack apps, I care about deployment, performance, and real-world impact — not just demo-ready code.",
    icon: Rocket,
    accent: "text-lime-400",
    border: "border-lime-500/20",
    bg: "bg-lime-500/8",
    tag: "Production-first mindset",
  },
  {
    number: "02",
    title: "Full-Stack + AI in One Person",
    body: "I bridge the gap between ML research and product engineering. Need a RAG pipeline with a React frontend and FastAPI backend? That's my default stack.",
    icon: Brain,
    accent: "text-violet-400",
    border: "border-violet-500/20",
    bg: "bg-violet-500/8",
    tag: "Rare cross-domain skill",
  },
  {
    number: "03",
    title: "Self-Driven & Async-Ready",
    body: "I don't wait to be told what to do next. I identify problems, propose solutions, and execute — whether remote, hybrid, or on-site. Zero hand-holding needed.",
    icon: Target,
    accent: "text-sky-400",
    border: "border-sky-500/20",
    bg: "bg-sky-500/8",
    tag: "Zero micro-management",
  },
  {
    number: "04",
    title: "I Learn Faster Than Most",
    body: "In 6 months of active work I completed 11 certifications, built 15+ projects, and crossed 200+ commits. New stack? Give me a week and I'll be productive.",
    icon: TrendingUp,
    accent: "text-orange-400",
    border: "border-orange-500/20",
    bg: "bg-orange-500/8",
    tag: "High learning velocity",
  },
  {
    number: "05",
    title: "Clean Code is Non-Negotiable",
    body: "TypeScript-first, modular architecture, 94%+ test coverage on backend modules. I write code that your team can read, extend, and maintain six months later.",
    icon: Code2,
    accent: "text-emerald-400",
    border: "border-emerald-500/20",
    bg: "bg-emerald-500/8",
    tag: "Maintainable by default",
  },
  {
    number: "06",
    title: "I Own Problems End-to-End",
    body: "From understanding requirements to deploying and monitoring — I own the full lifecycle. No task-dropping at handoff boundaries. If it breaks, I fix it.",
    icon: Shield,
    accent: "text-pink-400",
    border: "border-pink-500/20",
    bg: "bg-pink-500/8",
    tag: "Full ownership mindset",
  },
];

const STATS = [
  { value: "15+",  label: "Projects Shipped",  icon: Rocket    },
  { value: "200+", label: "GitHub Commits",     icon: GitCommit },
  { value: "11",   label: "Certifications",     icon: Award     },
  { value: "98%",  label: "Satisfaction Rate",  icon: Star      },
  { value: "6mo",  label: "Active Experience",  icon: Clock     },
  { value: "4",    label: "Tech Domains",       icon: Layers    },
];

const STACK = [
  { group: "AI / ML",    color: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/20", items: ["PyTorch", "TensorFlow", "OpenCV", "RAG", "LLMs", "CNNs", "ViT"] },
  { group: "Frontend",   color: "text-sky-400",    bg: "bg-sky-500/10",    border: "border-sky-500/20",    items: ["React", "Next.js", "TypeScript", "Tailwind"] },
  { group: "Backend",    color: "text-lime-400",   bg: "bg-lime-500/10",   border: "border-lime-500/20",   items: ["FastAPI", "Node.js", "Spring Boot", "REST"] },
  { group: "Data/Infra", color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20", items: ["PostgreSQL", "MongoDB", "Docker", "Vercel"] },
];

const WORK_TYPES = [
  { label: "Full-Time Role",      icon: Cpu,          available: true  },
  { label: "Internship",          icon: GraduationCap, available: true  },
  { label: "Freelance Project",   icon: Package,      available: true  },
  { label: "Open Source Collab",  icon: Github,       available: true  },
];

const TESTIMONIAL = {
  quote: "Rajaram consistently goes beyond what's asked. He understood the recommendation system requirements quickly, proposed improvements we hadn't considered, and delivered ahead of schedule.",
  author: "Vision AI Research & Org.",
  role: "ML Internship — June 2024",
};

const SOCIALS = [
  { icon: Github,   href: "https://github.com/lavudyaraja",               label: "GitHub"   },
  { icon: Linkedin, href: "https://www.linkedin.com/in/lavudyaraja5228/", label: "LinkedIn" },
  { icon: Twitter,  href: "https://x.com/LavudyaRaj22988",               label: "Twitter"  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function GraduationCap(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function HireMe() {
  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = "/Rajaram-resume.pdf";
    a.download = "Lavudya_Rajaram_Resume.pdf";
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
  };

  return (
    <div className="bg-black text-white min-h-screen">

      {/* Glow blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-60 -left-60 w-[600px] h-[600px] rounded-full bg-lime-500/4 blur-3xl" />
        <div className="absolute top-1/2 -right-60 w-[500px] h-[500px] rounded-full bg-violet-500/4 blur-3xl" />
        <div className="absolute -bottom-60 left-1/3 w-[500px] h-[500px] rounded-full bg-sky-500/3 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-14 py-20 space-y-5">

        {/* ══════════════════════════════════════════
            ROW 1 — Hero banner
        ══════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* Main headline — 2 cols */}
          <div className="lg:col-span-2 bg-zinc-950 border border-zinc-800 rounded-3xl p-8 md:p-12 flex flex-col justify-between min-h-[280px] relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-lime-500/0 via-lime-500/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" />

            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-lime-400" />
              <span className="font-mono text-xs text-zinc-600 tracking-widest uppercase">Why Hire Me</span>
            </div>

            <div>
              <h1 className="font-black tracking-tighter leading-none text-white text-5xl sm:text-6xl xl:text-7xl">
                You need
              </h1>
              <h1 className="font-black tracking-tighter leading-none text-lime-400 text-5xl sm:text-6xl xl:text-7xl">
                a builder.
              </h1>
              <p className="text-zinc-500 text-sm mt-5 max-w-lg leading-7">
                Not just a coder who closes tickets — someone who understands the problem,
                owns the solution, and ships work that matters. That's what I do.
              </p>
            </div>
          </div>

          {/* Identity quick-card — 1 col */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-7 flex flex-col justify-between">
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-zinc-900">
              <div className="relative shrink-0">
                <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                  <span className="font-black text-lg text-lime-400">LR</span>
                </div>
                <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-lime-400 rounded-full border-2 border-black" />
              </div>
              <div>
                <p className="font-bold text-white text-sm">Lavudya Rajaram</p>
                <p className="font-mono text-xs text-zinc-600 mt-0.5">ML Eng · Full-Stack Dev</p>
              </div>
            </div>

            <div className="space-y-2.5 flex-1 mb-6">
              {[
                { icon: MapPin,   text: "Hyderabad, IN"          },
                { icon: Coffee,   text: "Available immediately"  },
                { icon: Globe,    text: "Remote / Hybrid / On-site" },
              ].map(({ icon: Ic, text }) => (
                <div key={text} className="flex items-center gap-2.5">
                  <Ic size={12} className="text-zinc-700 shrink-0" />
                  <span className="font-mono text-xs text-zinc-500">{text}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-2 mb-4">
              {SOCIALS.map(({ icon: Ic, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer"
                  className="flex-1 h-9 bg-zinc-900 border border-zinc-800 hover:border-zinc-600 hover:bg-zinc-800 rounded-xl flex items-center justify-center text-zinc-500 hover:text-white transition-all duration-200">
                  <Ic size={13} />
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              <a href="mailto:codeml862@gmail.com"
                className="group flex items-center justify-center gap-2 h-10 bg-lime-400 hover:bg-lime-300 text-black text-sm font-bold rounded-xl transition-all duration-200 hover:-translate-y-px hover:shadow-lg hover:shadow-lime-400/20">
                <Mail size={13} />
                Email Me Now
                <ArrowUpRight size={12} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <button onClick={handleDownload}
                className="group flex items-center justify-center gap-2 h-10 border border-zinc-800 hover:border-zinc-600 text-zinc-400 hover:text-white text-sm font-medium rounded-xl transition-all duration-200 hover:bg-zinc-900">
                <Download size={13} className="text-zinc-600 group-hover:text-lime-400 transition-colors" />
                Download CV
              </button>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            ROW 2 — Stats strip
        ══════════════════════════════════════════ */}
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-4">
          {STATS.map(({ value, label, icon: Ic }) => (
            <div key={label}
              className="group bg-zinc-950 border border-zinc-800 hover:border-zinc-700 rounded-2xl p-5 flex flex-col gap-2 transition-all duration-200 hover:-translate-y-1 cursor-default">
              <Ic size={13} className="text-zinc-700 group-hover:text-lime-400 transition-colors" />
              <span className="text-2xl font-black text-white group-hover:text-lime-400 transition-colors leading-none">{value}</span>
              <span className="font-mono text-xs text-zinc-600 leading-tight">{label}</span>
            </div>
          ))}
        </div>

        {/* ══════════════════════════════════════════
            ROW 3 — 6 reasons grid (2×3)
        ══════════════════════════════════════════ */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-lime-400" />
            <span className="font-mono text-xs text-zinc-600 tracking-widest uppercase">6 Reasons to Hire Me</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {REASONS.map(({ number, title, body, icon: Ic, accent, border, bg, tag }) => (
              <div key={number}
                className={`group bg-zinc-950 border border-zinc-800 hover:${border} rounded-2xl p-6 flex flex-col gap-4 transition-all duration-200 hover:-translate-y-1 cursor-default`}>
                <div className="flex items-start justify-between">
                  <div className={`w-10 h-10 rounded-xl ${bg} border ${border} flex items-center justify-center shrink-0`}>
                    <Ic size={16} className={accent} />
                  </div>
                  <span className={`font-mono text-xs ${accent} opacity-40 font-black`}>{number}</span>
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm leading-tight mb-2 group-hover:text-white transition-colors">
                    {title}
                  </h3>
                  <p className="text-zinc-500 text-xs leading-6">{body}</p>
                </div>
                <div className={`mt-auto flex items-center gap-1.5 ${bg} border ${border} px-3 py-1.5 rounded-lg w-fit`}>
                  <CheckCircle size={10} className={accent} />
                  <span className={`font-mono text-xs ${accent}`}>{tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════════
            ROW 4 — Stack + Work types + Testimonial
        ══════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* Tech stack card */}
          <div className="lg:col-span-1 bg-zinc-950 border border-zinc-800 rounded-2xl p-6 flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-zinc-600 uppercase tracking-widest">Full Stack</span>
              <Cpu size={13} className="text-lime-400" />
            </div>
            {STACK.map(({ group, color, bg, border, items }) => (
              <div key={group}>
                <span className={`font-mono text-xs ${color} uppercase tracking-wider block mb-2`}>{group}</span>
                <div className="flex flex-wrap gap-1.5">
                  {items.map(item => (
                    <span key={item}
                      className={`${bg} border ${border} font-mono text-xs px-2.5 py-1 rounded-md text-zinc-300`}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Work types + testimonial stacked */}
          <div className="lg:col-span-2 flex flex-col gap-5">

            {/* Work type availability */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-5">
                <span className="font-mono text-xs text-zinc-600 uppercase tracking-widest">Open To</span>
                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-50" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-lime-400" />
                  </span>
                  <span className="font-mono text-xs text-lime-400">Active</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {WORK_TYPES.map(({ label, icon: Ic, available }) => (
                  <div key={label}
                    className="group flex items-center gap-3 bg-zinc-900 border border-zinc-800 hover:border-lime-500/30 hover:bg-lime-500/5 rounded-xl px-4 py-3 transition-all duration-200 cursor-default">
                    <div className="w-8 h-8 rounded-lg bg-zinc-800 group-hover:bg-lime-500/15 flex items-center justify-center shrink-0 transition-colors">
                      <Ic size={14} className="text-zinc-500 group-hover:text-lime-400 transition-colors" />
                    </div>
                    <span className="text-zinc-300 group-hover:text-white text-xs font-medium transition-colors flex-1">{label}</span>
                    {available && (
                      <div className="w-2 h-2 rounded-full bg-lime-400 shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonial */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between flex-1">
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare size={13} className="text-lime-400" />
                <span className="font-mono text-xs text-zinc-600 uppercase tracking-widest">What They Say</span>
              </div>
              <blockquote className="text-zinc-300 text-sm leading-7 italic mb-5 flex-1">
                "{TESTIMONIAL.quote}"
              </blockquote>
              <div className="flex items-center gap-3 pt-4 border-t border-zinc-900">
                <div className="w-9 h-9 rounded-xl bg-lime-400/10 border border-lime-500/20 flex items-center justify-center shrink-0">
                  <Users size={14} className="text-lime-400" />
                </div>
                <div>
                  <p className="font-bold text-white text-xs">{TESTIMONIAL.author}</p>
                  <p className="font-mono text-xs text-zinc-600 mt-0.5">{TESTIMONIAL.role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            ROW 5 — What you get (value props)
        ══════════════════════════════════════════ */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-7 md:p-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px w-8 bg-lime-400" />
            <span className="font-mono text-xs text-zinc-600 uppercase tracking-widest">What You Get</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Zap,           label: "Fast Delivery",       desc: "I hit deadlines. Production-ready code, not endless WIP branches.",         accent: "text-lime-400",   bg: "bg-lime-500/10",   border: "border-lime-500/20"   },
              { icon: Eye,           label: "Sharp Attention",     desc: "I catch edge cases, UX inconsistencies, and performance bottlenecks early.", accent: "text-sky-400",    bg: "bg-sky-500/10",    border: "border-sky-500/20"    },
              { icon: HeartHandshake,label: "Honest Comms",        desc: "Status updates, blockers, and trade-offs — you'll always know where things stand.", accent: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/20" },
              { icon: Flame,         label: "High Motivation",     desc: "I chose this field because I love it, not because it's safe. That drive shows in my work.", accent: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20" },
            ].map(({ icon: Ic, label, desc, accent, bg, border }) => (
              <div key={label}
                className={`group flex flex-col gap-4 ${bg} border ${border} rounded-2xl p-5 transition-all duration-200 hover:-translate-y-1 cursor-default`}>
                <Ic size={20} className={accent} />
                <div>
                  <p className={`font-bold text-sm ${accent} mb-1.5`}>{label}</p>
                  <p className="text-zinc-500 text-xs leading-6">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════════
            ROW 6 — Final CTA banner (full width)
        ══════════════════════════════════════════ */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* Left — copy */}
            <div className="p-8 md:p-12 flex flex-col justify-between gap-8 border-b lg:border-b-0 lg:border-r border-zinc-900">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-px w-8 bg-lime-400" />
                  <span className="font-mono text-xs text-zinc-600 uppercase tracking-widest">Let's Build Together</span>
                </div>
                <h2 className="font-black tracking-tighter leading-tight text-white text-3xl sm:text-4xl mb-4">
                  Ready to start<br />
                  <span className="text-lime-400">something great?</span>
                </h2>
                <p className="text-zinc-500 text-sm leading-7 max-w-sm">
                  Whether it's an ML system, a full-stack product, or a tough engineering
                  problem — I'm ready to dig in. Let's talk.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <a href="mailto:codeml862@gmail.com"
                  className="group flex items-center gap-2 bg-lime-400 hover:bg-lime-300 text-black font-bold text-sm px-6 py-3 rounded-xl transition-all duration-200 hover:-translate-y-px hover:shadow-xl hover:shadow-lime-400/25">
                  Email Me
                  <ArrowUpRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <a href="https://www.linkedin.com/in/lavudyaraja5228/" target="_blank" rel="noreferrer"
                  className="group flex items-center gap-2 border border-zinc-800 hover:border-zinc-600 text-zinc-300 hover:text-white text-sm font-medium px-6 py-3 rounded-xl transition-all duration-200 hover:bg-zinc-900">
                  <Linkedin size={13} />
                  LinkedIn
                </a>
                <button onClick={handleDownload}
                  className="group flex items-center gap-2 border border-zinc-800 hover:border-zinc-600 text-zinc-300 hover:text-white text-sm font-medium px-6 py-3 rounded-xl transition-all duration-200 hover:bg-zinc-900">
                  <Download size={13} className="text-zinc-600 group-hover:text-lime-400 transition-colors" />
                  Resume
                </button>
              </div>
            </div>

            {/* Right — quick-fire checklist */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <span className="font-mono text-xs text-zinc-600 uppercase tracking-widest mb-6">Quick Checklist</span>
              <div className="space-y-3">
                {[
                  "Available for immediate start",
                  "Comfortable with async remote work",
                  "Can own a project solo or in a team",
                  "Delivers clean, documented code",
                  "Brings ML + full-stack in one hire",
                  "Honest about blockers and timelines",
                  "Highly coachable and feedback-driven",
                  "Proactively improves what's already built",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 group">
                    <div className="w-5 h-5 rounded-md bg-lime-400/10 border border-lime-500/25 flex items-center justify-center shrink-0 transition-colors group-hover:bg-lime-400/20">
                      <CheckCircle size={11} className="text-lime-400" />
                    </div>
                    <span className="text-zinc-400 group-hover:text-zinc-200 text-sm transition-colors">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}