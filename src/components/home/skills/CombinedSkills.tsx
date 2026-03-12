"use client";

import { useState, useEffect } from "react";
import {
  Code2, Database, Server, Brain, Palette,
  Wrench, Layers, ChevronRight, Zap
} from "lucide-react";

// ─── Icon URLs ─────────────────────────────────────────────────────────────────

const ICON: Record<string, string> = {
  "React":          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "TypeScript":     "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  "JavaScript":     "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  "Tailwind CSS":   "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  "HTML5":          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  "CSS3":           "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  "Sass":           "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg",
  "Bootstrap":      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
  "Next.js":        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  "Node.js":        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  "Python":         "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  "Flask":          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg",
  "FastAPI":        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
  "PostgreSQL":     "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  "MySQL":          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  "SQLite":         "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg",
  "Redis":          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
  "MongoDB":        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  "Prisma":         "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg",
  "Git":            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  "GitHub":         "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  "Docker":         "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  "Linux":          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
  "VS Code":        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
  "Postman":        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg",
  "npm":            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg",
  "Yarn":           "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/yarn/yarn-original.svg",
  "NumPy":          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg",
  "Pandas":         "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",
  "Matplotlib":     "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matplotlib/matplotlib-original.svg",
  "Keras":          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/keras/keras-original.svg",
  "TensorFlow":     "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
  "PyTorch":        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg",
  "OpenCV":         "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg",
  "Figma":          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
  "Canva":          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg",
  "Transformers":   "https://huggingface.co/front/assets/huggingface_logo-noborder.svg",
  "RAG":            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
  "Vector DB":      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
  "Computer Vision":"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg",
  "n8n":            "/n8n.png",
  "Neon DB":        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
};

// ─── Categories ────────────────────────────────────────────────────────────────

const CATEGORIES = [
  {
    id: "frontend",
    label: "Frontend",
    icon: Code2,
    accent: { text: "text-sky-400",    border: "border-sky-500/25",    bg: "bg-sky-500/8"    },
    skills: ["React","Next.js","TypeScript","JavaScript","Tailwind CSS","HTML5","CSS3","Sass","Bootstrap"],
  },
  {
    id: "backend",
    label: "Backend",
    icon: Server,
    accent: { text: "text-violet-400", border: "border-violet-500/25", bg: "bg-violet-500/8" },
    skills: ["Node.js","Python","Flask","FastAPI"],
  },
  {
    id: "database",
    label: "Database",
    icon: Database,
    accent: { text: "text-emerald-400",border: "border-emerald-500/25",bg: "bg-emerald-500/8"},
    skills: ["PostgreSQL","MySQL","SQLite","Redis","MongoDB","Prisma","Neon DB","Vector DB"],
  },
  {
    id: "devops",
    label: "DevOps",
    icon: Wrench,
    accent: { text: "text-orange-400", border: "border-orange-500/25", bg: "bg-orange-500/8" },
    skills: ["Git","GitHub","Docker","Linux","n8n"],
  },
  {
    id: "ai",
    label: "AI / ML",
    icon: Brain,
    accent: { text: "text-purple-400", border: "border-purple-500/25", bg: "bg-purple-500/8" },
    skills: ["PyTorch","TensorFlow","Keras","NumPy","Pandas","Matplotlib","OpenCV","Transformers","RAG","Computer Vision"],
  },
  {
    id: "design",
    label: "Design",
    icon: Palette,
    accent: { text: "text-pink-400",   border: "border-pink-500/25",   bg: "bg-pink-500/8"   },
    skills: ["Figma","Canva"],
  },
  {
    id: "tools",
    label: "Tools",
    icon: Layers,
    accent: { text: "text-amber-400",  border: "border-amber-500/25",  bg: "bg-amber-500/8"  },
    skills: ["VS Code","Postman","npm","Yarn"],
  },
];

const ALL_SKILLS = CATEGORIES.flatMap(c =>
  c.skills.map(s => ({ name: s, catId: c.id, accent: c.accent }))
);

// ─── Spinning neon border keyframes (injected once) ───────────────────────────

const NEON_STYLES = `
@property --neon-angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}
@keyframes neon-spin {
  to { --neon-angle: 360deg; }
}
.neon-card {
  position: relative;
  isolation: isolate;
}
.neon-card::before {
  content: '';
  position: absolute;
  inset: -1.5px;
  border-radius: inherit;
  background: conic-gradient(
    from var(--neon-angle),
    #a3e635, #34d399, #38bdf8, #818cf8,
    #e879f9, #fb923c, #facc15, #a3e635
  );
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
  animation: neon-spin 2.5s linear infinite paused;
}
.neon-card:hover::before,
.neon-card.neon-active::before {
  opacity: 1;
  animation-play-state: running;
}
.neon-card::after {
  content: '';
  position: absolute;
  inset: 1px;
  border-radius: inherit;
  background: #09090b;
  z-index: -1;
}
`;

// ─── Skill Card ───────────────────────────────────────────────────────────────

function SkillCard({ name, accent }: { name: string; accent: { text: string; border: string; bg: string } }) {
  const [err, setErr] = useState(false);
  const src = ICON[name];

  return (
    <div className="neon-card rounded-2xl">
      <div className={`group relative ${accent.bg} rounded-2xl p-3 sm:p-4 flex flex-col items-center gap-2.5 cursor-default transition-all duration-200 hover:-translate-y-0.5`}>
        {/* Icon */}
        <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
          {src && !err ? (
            <img
              src={src}
              alt={name}
              className="w-full h-full object-contain"
              onError={() => setErr(true)}
            />
          ) : (
            <div className={`w-8 h-8 rounded-lg ${accent.bg} border ${accent.border} flex items-center justify-center`}>
              <span className={`font-black text-sm ${accent.text}`}>{name[0]}</span>
            </div>
          )}
        </div>
        {/* Label */}
        <span className="font-mono text-xs text-zinc-500 group-hover:text-zinc-200 transition-colors text-center leading-tight">
          {name}
        </span>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Skills() {
  const [activeCat, setActiveCat] = useState<string | null>(null);
  const [ready,     setReady]     = useState(false);

  useEffect(() => { setReady(true); }, []);

  const currentCat = CATEGORIES.find(c => c.id === activeCat);
  const displayed  = activeCat
    ? CATEGORIES.find(c => c.id === activeCat)!.skills.map(s => ({
        name: s, catId: activeCat,
        accent: CATEGORIES.find(c => c.id === activeCat)!.accent
      }))
    : ALL_SKILLS;

  const totalSkills = ALL_SKILLS.length;

  return (
    <section id="skills" className="bg-black text-white">

      {/* Inject neon keyframes once */}
      <style dangerouslySetInnerHTML={{ __html: NEON_STYLES }} />

      <div className={`max-w-screen-xl mx-auto px-6 md:px-14 py-12 space-y-5 transition-all duration-700 ${ready ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>

        {/* ══ HEADER ══ */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-zinc-900">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8 bg-lime-400" />
              <span className="font-mono text-xs text-zinc-600 tracking-widest uppercase">03 — Skills</span>
            </div>
            <h2 className="font-black tracking-tighter leading-none text-white text-5xl sm:text-6xl xl:text-7xl">
              Tech &
            </h2>
            <h2 className="font-black tracking-tighter leading-none text-lime-400 text-5xl sm:text-6xl xl:text-7xl">
              Toolbox.
            </h2>
          </div>

          {/* Stats */}
          <div className="flex gap-3 shrink-0 flex-wrap">
            {[
              { v: String(totalSkills) + "+", l: "Skills"      },
              { v: String(CATEGORIES.length),  l: "Categories" },
              { v: "3+",                        l: "Years"      },
              { v: "Expert",                    l: "Level"      },
            ].map(({ v, l }) => (
              <div key={l} className="bg-zinc-950 border border-zinc-800 rounded-2xl px-5 py-4 text-center min-w-[80px]">
                <p className="font-black text-white text-xl leading-none">{v}</p>
                <p className="font-mono text-xs text-zinc-600 mt-1">{l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ══ CATEGORY TABS + GRID BENTO ══ */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">

          {/* Left — category selector */}
          <div className="lg:col-span-1 bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden">
            <div className="flex items-center gap-3 px-5 py-4 border-b border-zinc-900">
              <div className="h-px w-4 bg-lime-400" />
              <span className="font-mono text-xs text-zinc-600 uppercase tracking-widest">Filter</span>
            </div>

            <div className="p-3 flex flex-col gap-1.5">
              {/* All button */}
              <button
                onClick={() => setActiveCat(null)}
                className={`group flex items-center gap-3 w-full px-4 py-3 rounded-xl text-left transition-all duration-200 border ${
                  activeCat === null
                    ? "bg-lime-400/10 border-lime-500/25 text-lime-400"
                    : "border-transparent text-zinc-500 hover:bg-zinc-900 hover:text-zinc-200 hover:border-zinc-800"
                }`}>
                <Layers size={13} className={activeCat === null ? "text-lime-400" : "text-zinc-700 group-hover:text-zinc-500"} />
                <span className="font-mono text-xs font-bold">All Skills</span>
                <span className="ml-auto font-mono text-xs text-zinc-700">{totalSkills}</span>
              </button>

              {CATEGORIES.map(cat => {
                const isActive = activeCat === cat.id;
                const Ic = cat.icon;
                return (
                  <button key={cat.id}
                    onClick={() => setActiveCat(isActive ? null : cat.id)}
                    className={`group flex items-center gap-3 w-full px-4 py-3 rounded-xl text-left transition-all duration-200 border ${
                      isActive
                        ? `${cat.accent.bg} ${cat.accent.border} ${cat.accent.text}`
                        : "border-transparent text-zinc-500 hover:bg-zinc-900 hover:text-zinc-200 hover:border-zinc-800"
                    }`}>
                    <Ic size={13} className={isActive ? cat.accent.text : "text-zinc-700 group-hover:text-zinc-500"} />
                    <span className="font-mono text-xs font-bold">{cat.label}</span>
                    <span className="ml-auto font-mono text-xs text-zinc-700">{cat.skills.length}</span>
                    <ChevronRight size={10} className={`transition-transform duration-200 ${isActive ? "rotate-90" : ""} ${isActive ? cat.accent.text : "text-zinc-800"}`} />
                  </button>
                );
              })}
            </div>

            {/* Category description */}
            {currentCat && (
              <div className={`mx-3 mb-3 p-3 rounded-xl ${currentCat.accent.bg} border ${currentCat.accent.border}`}>
                <p className={`font-mono text-xs ${currentCat.accent.text}`}>
                  {currentCat.skills.length} skills in {currentCat.label}
                </p>
              </div>
            )}
          </div>

          {/* Right — skill cards grid */}
          <div className="lg:col-span-3 bg-zinc-950 border border-zinc-800 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="h-px w-4 bg-lime-400" />
                <span className="font-mono text-xs text-zinc-600 uppercase tracking-widest">
                  {activeCat ? currentCat?.label : "All Technologies"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Zap size={11} className="text-zinc-700" />
                <span className="font-mono text-xs text-zinc-700">Hover for neon</span>
              </div>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3">
              {displayed.map(({ name, accent }) => (
                <SkillCard key={name} name={name} accent={accent} />
              ))}
            </div>
          </div>
        </div>

        {/* ══ CATEGORY OVERVIEW STRIP ══ */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {CATEGORIES.map(cat => {
            const Ic = cat.icon;
            return (
              <button key={cat.id}
                onClick={() => setActiveCat(activeCat === cat.id ? null : cat.id)}
                className={`group flex flex-col items-center gap-2 bg-zinc-950 border rounded-2xl p-4 transition-all duration-200 hover:-translate-y-0.5 ${
                  activeCat === cat.id
                    ? `${cat.accent.bg} ${cat.accent.border}`
                    : "border-zinc-800 hover:border-zinc-700"
                }`}>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                  activeCat === cat.id ? `${cat.accent.bg} border ${cat.accent.border}` : "bg-zinc-900 border border-zinc-800 group-hover:border-zinc-700"
                }`}>
                  <Ic size={15} className={activeCat === cat.id ? cat.accent.text : "text-zinc-600 group-hover:text-zinc-300"} />
                </div>
                <p className={`font-mono text-xs font-bold transition-colors ${
                  activeCat === cat.id ? cat.accent.text : "text-zinc-600 group-hover:text-zinc-300"
                }`}>{cat.label}</p>
                <p className="font-mono text-xs text-zinc-700">{cat.skills.length}</p>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
}