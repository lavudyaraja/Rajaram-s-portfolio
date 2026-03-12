"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Github, ExternalLink, Calendar, Star, Search,
  Code2, Globe, Smartphone, Database, Brain,
  ChevronRight, X, ArrowUpRight, Layers, Zap,
  GitCommit, Eye, Package, Filter
} from "lucide-react";
import { Project } from "@/types/project";
import { PROJECTS } from "@/data/projects";
import { categoryIcons, categoryColors, statusColors } from "@/constants/projectConstants";
import { getRealIconUrl } from "@/utils/realTechIcons";
import DraggableTooltip from "./DraggableTooltip";

// ─── Category config ──────────────────────────────────────────────────────────

const CATEGORIES = [
  { id: "all",       label: "All",       icon: Layers   },
  { id: "web",       label: "Web",       icon: Globe    },
  { id: "mobile",    label: "Mobile",    icon: Smartphone },
  { id: "ai",        label: "AI / ML",   icon: Brain    },
  { id: "fullstack", label: "Full-Stack",icon: Code2    },
];

const STATUS_STYLE: Record<string, string> = {
  completed:    "bg-lime-500/10   text-lime-400   border-lime-500/25",
  "in-progress":"bg-sky-500/10    text-sky-400    border-sky-500/25",
  planned:      "bg-zinc-800      text-zinc-400   border-zinc-700",
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function SmallProjectsView() {
  const [category,  setCategory]  = useState<"all" | Project["category"]>("all");
  const [search,    setSearch]    = useState("");
  const [selected,  setSelected]  = useState<Project | null>(null);
  const [tipPos,    setTipPos]    = useState({ x: 100, y: 100 });
  const [ready,     setReady]     = useState(false);

  useEffect(() => { const t = setTimeout(() => setReady(true), 80); return () => clearTimeout(t); }, []);

  const filtered = PROJECTS.filter(p => {
    const catOk = category === "all" || p.category === category;
    const q = search.toLowerCase();
    const srchOk = !q || p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
    return catOk && srchOk;
  });

  const handleClick = (project: Project, e: React.MouseEvent) => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      setTipPos({ x: 10, y: 10 });
    } else {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      setTipPos({
        x: Math.max(20, Math.min(rect.left, window.innerWidth - 540)),
        y: Math.max(20, Math.min(rect.bottom + 8, window.innerHeight - 600)),
      });
    }
    setSelected(project);
  };

  // Reveal helper
  const r = (delay = "") =>
    `transition-all duration-700 ${delay} ${ready ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`;

  return (
    <section id="projects" className="bg-black text-white">

      {/* Glow blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-60 -right-60 w-[500px] h-[500px] rounded-full bg-lime-500/4 blur-3xl" />
        <div className="absolute -bottom-60 -left-60 w-[500px] h-[500px] rounded-full bg-violet-500/4 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-14 py-12 space-y-6">

        {/* ══ HEADER ══ */}
        <div className={`flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-zinc-900 ${r("delay-100")}`}>
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8 bg-lime-400" />
              <span className="font-mono text-xs text-zinc-600 tracking-widest uppercase">03 — Projects</span>
            </div>
            <h2 className="font-black tracking-tighter leading-none text-white text-5xl sm:text-6xl xl:text-7xl">
              Things I've
            </h2>
            <h2 className="font-black tracking-tighter leading-none text-lime-400 text-5xl sm:text-6xl xl:text-7xl">
              built.
            </h2>
          </div>

          {/* Search */}
          <div className="relative w-full lg:w-72 shrink-0">
            <Search size={13} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search projects…"
              className="w-full h-11 pl-10 pr-4 bg-zinc-950 border border-zinc-800 hover:border-zinc-700 focus:border-lime-500/50 focus:outline-none rounded-xl font-mono text-xs text-white placeholder-zinc-600 transition-colors"
            />
            {search && (
              <button onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-500 hover:text-white transition-colors">
                <X size={10} />
              </button>
            )}
          </div>
        </div>

        {/* ══ CATEGORY TABS ══ */}
        <div className={`flex items-center gap-2 flex-wrap ${r("delay-150")}`}>
          <Filter size={12} className="text-zinc-700 shrink-0" />
          {CATEGORIES.map(({ id, label, icon: Ic }) => {
            const active = category === id;
            return (
              <button key={id}
                onClick={() => setCategory(id as typeof category)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-mono text-xs tracking-wide transition-all duration-200 border ${
                  active
                    ? "bg-lime-400/10 border-lime-500/30 text-lime-400"
                    : "bg-zinc-950 border-zinc-800 text-zinc-500 hover:text-zinc-200 hover:border-zinc-700"
                }`}>
                <Ic size={11} className={active ? "text-lime-400" : "text-zinc-700"} />
                {label}
              </button>
            );
          })}
          {(search || category !== "all") && (
            <button onClick={() => { setSearch(""); setCategory("all"); }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl font-mono text-xs border border-zinc-800 text-zinc-600 hover:text-white hover:border-zinc-600 transition-all duration-200 ml-1">
              <X size={10} />
              Clear
            </button>
          )}
          <span className="ml-auto font-mono text-xs text-zinc-700">{filtered.length} project{filtered.length !== 1 ? "s" : ""}</span>
        </div>

        {/* ══ GRID ══ */}
        {filtered.length > 0 ? (
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${r("delay-200")}`}>
            {filtered.map((project, i) => {
              const CatIcon = categoryIcons[project.category];
              return (
                <ProjectCard
                  key={project.id}
                  project={project}
                  CatIcon={CatIcon}
                  index={i}
                  onClick={handleClick}
                />
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-14 h-14 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-center">
              <Search size={20} className="text-zinc-700" />
            </div>
            <p className="font-mono text-sm text-zinc-600">No projects match your filters</p>
            <button onClick={() => { setSearch(""); setCategory("all"); }}
              className="flex items-center gap-2 bg-lime-400 hover:bg-lime-300 text-black text-xs font-bold px-5 py-2.5 rounded-xl transition-all duration-200">
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Tooltip */}
      {selected && (
        <DraggableTooltip
          project={selected}
          isOpen={true}
          onClose={() => setSelected(null)}
          initialPosition={tipPos}
        />
      )}
    </section>
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────────

function ProjectCard({
  project, CatIcon, index, onClick
}: {
  project: Project;
  CatIcon: React.ElementType;
  index: number;
  onClick: (p: Project, e: React.MouseEvent) => void;
}) {
  const statusStyle = STATUS_STYLE[project.status || "completed"] ?? STATUS_STYLE.completed;

  return (
    <div
      onClick={e => onClick(project, e)}
      className="group relative bg-zinc-950 border border-zinc-800 hover:border-zinc-700 rounded-2xl p-6 flex flex-col gap-4 cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40"
    >
      {/* Hover glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-lime-500/0 via-lime-500/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />

      {/* Featured pip */}
      {project.featured && (
        <div className="absolute top-4 right-4 flex items-center gap-1 bg-yellow-500/10 border border-yellow-500/25 px-2 py-0.5 rounded-full">
          <Star size={9} className="text-yellow-400 fill-yellow-400" />
          <span className="font-mono text-xs text-yellow-400">Featured</span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 group-hover:border-zinc-700 flex items-center justify-center shrink-0 transition-colors">
          <CatIcon size={16} className="text-zinc-500 group-hover:text-lime-400 transition-colors" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-white text-sm leading-tight truncate group-hover:text-lime-400 transition-colors">
            {project.title}
          </h3>
          <div className={`inline-flex items-center mt-1.5 px-2 py-0.5 rounded-full border font-mono text-xs ${statusStyle}`}>
            {(project.status || "completed").replace("-", " ")}
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-zinc-500 text-xs leading-6 line-clamp-3 flex-1">
        {project.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {project.tags.slice(0, 4).map(tag => (
          <span key={tag}
            className="flex items-center gap-1 font-mono text-xs text-zinc-500 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded-md">
            <img
              src={getRealIconUrl(tag)} alt={tag}
              className="w-3 h-3 object-contain"
              onError={e => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
            {tag}
          </span>
        ))}
        {project.tags.length > 4 && (
          <span className="font-mono text-xs text-zinc-700 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded-md">
            +{project.tags.length - 4}
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-zinc-900">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Calendar size={10} className="text-zinc-700" />
            <span className="font-mono text-xs text-zinc-700">{project.date}</span>
          </div>
          {project.stats && (
            <div className="flex items-center gap-1">
              <Star size={10} className="text-yellow-500" />
              <span className="font-mono text-xs text-zinc-500">{project.stats.stars}</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-1.5">
          <a href={project.githubUrl} target="_blank" rel="noreferrer"
            onClick={e => e.stopPropagation()}
            className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-600 flex items-center justify-center text-zinc-500 hover:text-white transition-all duration-200">
            <Github size={13} />
          </a>
          <a href={project.demoUrl} target="_blank" rel="noreferrer"
            onClick={e => e.stopPropagation()}
            className="w-8 h-8 rounded-lg bg-lime-400/10 border border-lime-500/20 hover:bg-lime-400 flex items-center justify-center text-lime-400 hover:text-black transition-all duration-200">
            <ArrowUpRight size={13} />
          </a>
        </div>
      </div>

      {/* "Click to details" hint on hover */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        <Eye size={9} className="text-zinc-600" />
        <span className="font-mono text-xs text-zinc-700">Click for details</span>
      </div>
    </div>
  );
}