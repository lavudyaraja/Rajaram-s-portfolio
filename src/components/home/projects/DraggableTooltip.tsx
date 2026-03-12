"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Github, ExternalLink, Calendar, Star, X,
  Users, Clock, Award, ArrowUpRight,
  CheckCircle, GitCommit, Code2, Move,
  Package, Eye, Layers
} from "lucide-react";
import { Project } from "@/types/project";
import { categoryIcons, categoryColors } from "@/constants/projectConstants";
import { getRealIconUrl } from "@/utils/realTechIcons";

// ─── Types ────────────────────────────────────────────────────────────────────

interface DraggableTooltipProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
  initialPosition?: { x: number; y: number };
}

// ─── Status style map ─────────────────────────────────────────────────────────

const STATUS_STYLE: Record<string, string> = {
  completed:    "bg-lime-500/10  text-lime-400  border-lime-500/25",
  "in-progress":"bg-sky-500/10   text-sky-400   border-sky-500/25",
  planned:      "bg-zinc-800     text-zinc-400  border-zinc-700",
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function DraggableTooltip({
  project,
  isOpen,
  onClose,
  initialPosition = { x: 100, y: 100 },
}: DraggableTooltipProps) {
  const [pos,       setPos]       = useState(initialPosition);
  const [dragging,  setDragging]  = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isMobile,  setIsMobile]  = useState(false);
  const handleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    setPos(isMobile ? { x: 10, y: 10 } : initialPosition);
  }, [isOpen, isMobile]);

  const onMouseDown = (e: React.MouseEvent) => {
    if (isMobile || !handleRef.current?.contains(e.target as Node)) return;
    setDragging(true);
    setDragStart({ x: e.clientX - pos.x, y: e.clientY - pos.y });
    e.preventDefault();
  };

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!dragging || isMobile) return;
    setPos({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  }, [dragging, dragStart, isMobile]);

  const onMouseUp = useCallback(() => setDragging(false), []);

  useEffect(() => {
    if (dragging) {
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
      return () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      };
    }
  }, [dragging, onMouseMove, onMouseUp]);

  if (!isOpen) return null;

  const CatIcon   = categoryIcons[project.category];
  const statusCls = STATUS_STYLE[project.status || "completed"] ?? STATUS_STYLE.completed;

  return (
    <div
      className={`fixed z-50 bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl shadow-black/60 overflow-hidden pointer-events-auto flex flex-col ${
        isMobile ? "w-[calc(100vw-20px)]" : "w-[480px]"
      }`}
      style={{ left: pos.x, top: pos.y, cursor: dragging ? "grabbing" : "default" }}
    >
      {/* ── Drag bar ── */}
      <div
        ref={handleRef}
        onMouseDown={onMouseDown}
        className={`flex items-center justify-between px-5 py-3 border-b border-zinc-900 bg-zinc-900/50 shrink-0 ${
          isMobile ? "cursor-default" : "cursor-grab active:cursor-grabbing"
        }`}
      >
        <div className="flex items-center gap-2">
          <Move size={12} className="text-zinc-600" />
          <span className="font-mono text-xs text-zinc-600">
            {isMobile ? "Project details" : "Drag to reposition"}
          </span>
        </div>
        <button
          onClick={onClose}
          className="w-7 h-7 rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 flex items-center justify-center text-zinc-500 hover:text-white transition-all duration-200">
          <X size={12} />
        </button>
      </div>

      {/* ── Scrollable content ── */}
      <div
        className="overflow-y-auto flex-1 p-6 space-y-5"
        style={{ maxHeight: isMobile ? "calc(100vh - 120px)" : "560px" }}
      >
        {/* Header */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0">
            <CatIcon size={18} className="text-lime-400" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 flex-wrap">
              <h3 className="font-bold text-white text-base leading-tight">{project.title}</h3>
              {project.featured && (
                <div className="flex items-center gap-1 bg-yellow-500/10 border border-yellow-500/25 px-2 py-0.5 rounded-full shrink-0">
                  <Star size={9} className="text-yellow-400 fill-yellow-400" />
                  <span className="font-mono text-xs text-yellow-400">Featured</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full border font-mono text-xs ${statusCls}`}>
                {(project.status || "completed").replace("-", " ")}
              </span>
              <div className="flex items-center gap-1">
                <Calendar size={10} className="text-zinc-700" />
                <span className="font-mono text-xs text-zinc-600">{project.date}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Image */}
        {project.imageUrl && (
          <div className="rounded-xl overflow-hidden border border-zinc-800 aspect-video">
            <img src={project.imageUrl} alt={project.title}
              className="w-full h-full object-cover" />
          </div>
        )}

        {/* Description */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="h-px w-4 bg-lime-400" />
            <span className="font-mono text-xs text-zinc-600 uppercase tracking-widest">About</span>
          </div>
          <p className="text-zinc-400 text-xs leading-6">
            {project.longDescription || project.description}
          </p>
        </div>

        {/* Duration + Team */}
        {(project.duration || project.teamSize) && (
          <div className="grid grid-cols-2 gap-3">
            {project.duration && (
              <div className="flex items-center gap-2.5 bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5">
                <Clock size={12} className="text-sky-400 shrink-0" />
                <span className="font-mono text-xs text-zinc-400">{project.duration}</span>
              </div>
            )}
            {project.teamSize && (
              <div className="flex items-center gap-2.5 bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5">
                <Users size={12} className="text-lime-400 shrink-0" />
                <span className="font-mono text-xs text-zinc-400">{project.teamSize} member{project.teamSize > 1 ? "s" : ""}</span>
              </div>
            )}
          </div>
        )}

        {/* Achievements */}
        {Array.isArray(project.achievements) && project.achievements.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="h-px w-4 bg-lime-400" />
              <span className="font-mono text-xs text-zinc-600 uppercase tracking-widest">Achievements</span>
            </div>
            <div className="space-y-2">
              {project.achievements?.map((a, i) => (
                <div key={i} className="flex items-start gap-2.5 bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5">
                  <CheckCircle size={11} className="text-lime-400 shrink-0 mt-0.5" />
                  <span className="font-mono text-xs text-zinc-400">{a}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Technologies */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="h-px w-4 bg-lime-400" />
            <span className="font-mono text-xs text-zinc-600 uppercase tracking-widest">Technologies</span>
          </div>
          {project.technologies ? (
            <div className="grid grid-cols-4 gap-2">
              {Object.values(project.technologies).flat().map((tech: string, i) => (
                <div key={`${tech}-${i}`}
                  className="group flex flex-col items-center gap-1.5 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-xl p-2.5 transition-all duration-200 cursor-default">
                  <img
                    src={getRealIconUrl(tech)} alt={tech}
                    className="w-5 h-5 object-contain"
                    onError={e => {
                      const img = e.target as HTMLImageElement;
                      img.style.display = "none";
                      const fb = document.createElement("div");
                      fb.className = "w-5 h-5 rounded bg-zinc-800 flex items-center justify-center text-xs text-lime-400 font-bold";
                      fb.textContent = tech[0].toUpperCase();
                      img.parentElement?.insertBefore(fb, img);
                    }}
                  />
                  <span className="font-mono text-xs text-zinc-600 group-hover:text-zinc-400 transition-colors text-center leading-tight truncate w-full">
                    {tech.length > 8 ? tech.slice(0, 7) + "…" : tech}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map(tag => (
                <span key={tag}
                  className="font-mono text-xs text-zinc-400 bg-zinc-900 border border-zinc-800 px-2.5 py-1 rounded-lg">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Stats */}
        {project.stats && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="h-px w-4 bg-lime-400" />
              <span className="font-mono text-xs text-zinc-600 uppercase tracking-widest">Stats</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Stars",  value: project.stats.stars,  icon: Star,      color: "text-yellow-400" },
                { label: "Forks",  value: project.stats.forks,  icon: GitCommit, color: "text-sky-400"    },
                { label: "Issues", value: project.stats.issues, icon: Eye,       color: "text-violet-400" },
              ].map(({ label, value, icon: Ic, color }) => (
                <div key={label} className="bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-center">
                  <Ic size={13} className={`${color} mx-auto mb-1.5`} />
                  <p className="font-black text-white text-lg leading-none mb-1">{value}</p>
                  <p className="font-mono text-xs text-zinc-600">{label}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 pt-2 border-t border-zinc-900">
          <a href={project.githubUrl} target="_blank" rel="noreferrer"
            onClick={e => e.stopPropagation()}
            className="group flex-1 flex items-center justify-center gap-2 h-11 bg-zinc-900 border border-zinc-800 hover:border-zinc-600 hover:bg-zinc-800 text-zinc-300 hover:text-white rounded-xl font-mono text-xs font-bold transition-all duration-200 hover:-translate-y-px">
            <Github size={13} />
            View Code
          </a>
          <a href={project.demoUrl} target="_blank" rel="noreferrer"
            onClick={e => e.stopPropagation()}
            className="group flex-1 flex items-center justify-center gap-2 h-11 bg-lime-400 hover:bg-lime-300 text-black rounded-xl font-mono text-xs font-bold transition-all duration-200 hover:-translate-y-px hover:shadow-lg hover:shadow-lime-400/20">
            <ExternalLink size={13} />
            Live Demo
            <ArrowUpRight size={11} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </div>
  );
}