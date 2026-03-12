"use client";

import {
  PenTool, Code2, BookOpen, Calendar, Clock,
  Eye, Heart, MessageCircle, ArrowUpRight,
  Search, Star, Filter, X, ChevronRight,
  Zap, Layers, Grid3x3, List, Tag
} from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { getRealIconUrl } from "@/utils/realTechIcons";

// ─── Types ────────────────────────────────────────────────────────────────────

interface BlogPost {
  id: string;
  title: string;
  preview: string;
  publishDate: string;
  tags: string[];
  icon: "pen" | "code" | "book";
  readTime: string;
  featured?: boolean;
  views?: number;
  likes?: number;
  comments?: number;
  category?: string;
  difficulty?: "beginner" | "intermediate" | "advanced";
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const POSTS: BlogPost[] = [
  {
    id: "1",
    title: "Building Scalable React Applications with TypeScript",
    preview: "Advanced patterns and best practices for maintainable React apps using TypeScript — proper component architecture, state management, and performance optimization.",
    publishDate: "2024-07-15",
    tags: ["React", "TypeScript", "Architecture"],
    icon: "code",
    readTime: "8 min",
    featured: true,
    views: 15420,
    likes: 342,
    comments: 28,
    category: "Frontend",
    difficulty: "advanced",
  },
  {
    id: "2",
    title: "The Art of Clean Code: Principles Every Developer Should Know",
    preview: "Fundamental principles of writing clean, readable code — naming conventions, function design, and code organization that transforms your workflow.",
    publishDate: "2024-07-08",
    tags: ["Best Practices", "Clean Code", "Software Engineering"],
    icon: "pen",
    readTime: "12 min",
    featured: true,
    views: 12350,
    likes: 289,
    comments: 41,
    category: "Best Practices",
    difficulty: "intermediate",
  },
  {
    id: "3",
    title: "Modern CSS Techniques: From Grid to Container Queries",
    preview: "Master the latest CSS features — Grid, Flexbox, Container Queries, and building responsive layouts without media queries.",
    publishDate: "2024-06-28",
    tags: ["CSS", "Web Design", "Responsive"],
    icon: "book",
    readTime: "10 min",
    views: 9870,
    likes: 198,
    comments: 15,
    category: "CSS",
    difficulty: "intermediate",
  },
  {
    id: "4",
    title: "Mastering Git Workflows for Team Collaboration",
    preview: "Advanced Git techniques and workflows that streamline team collaboration — branching strategies, conflict resolution, and automation tools.",
    publishDate: "2024-06-20",
    tags: ["Git", "DevOps", "Collaboration"],
    icon: "code",
    readTime: "15 min",
    views: 7650,
    likes: 156,
    comments: 22,
    category: "DevOps",
    difficulty: "advanced",
  },
  {
    id: "5",
    title: "Performance Optimization in Modern Web Applications",
    preview: "Secrets of building lightning-fast web apps — bundle optimization, lazy loading, and techniques that significantly improve user experience.",
    publishDate: "2024-06-12",
    tags: ["Performance", "Optimization", "Web Vitals"],
    icon: "book",
    readTime: "14 min",
    views: 11200,
    likes: 267,
    comments: 33,
    category: "Performance",
    difficulty: "advanced",
  },
  {
    id: "6",
    title: "The Future of Frontend Development: Trends to Watch",
    preview: "Emerging frontend technologies and methodologies — what the next generation of web development looks like.",
    publishDate: "2024-06-05",
    tags: ["Frontend", "Trends", "Future Tech"],
    icon: "pen",
    readTime: "11 min",
    views: 18900,
    likes: 423,
    comments: 67,
    category: "Trends",
    difficulty: "beginner",
  },
];

const CATEGORIES = ["All", "Frontend", "Backend", "DevOps", "CSS", "Performance", "Best Practices", "Trends"];
const DIFFICULTIES = ["All", "beginner", "intermediate", "advanced"];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const ICON_MAP = { pen: PenTool, code: Code2, book: BookOpen };

const fmt = (d: string) =>
  new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

const DIFF_STYLE: Record<string, string> = {
  beginner:     "bg-lime-500/10  text-lime-400   border-lime-500/25",
  intermediate: "bg-sky-500/10   text-sky-400    border-sky-500/25",
  advanced:     "bg-violet-500/10 text-violet-400 border-violet-500/25",
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function PostIcon({ type }: { type: BlogPost["icon"] }) {
  const Ic = ICON_MAP[type];
  return <Ic size={14} />;
}

function FeaturedCard({ post }: { post: BlogPost }) {
  const diffCls = DIFF_STYLE[post.difficulty ?? "beginner"];
  return (
    <Link href={`/blog/${post.id}`}
      className="group relative bg-zinc-950 border border-zinc-800 hover:border-lime-500/30 rounded-2xl p-8 flex flex-col gap-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40 overflow-hidden">
      {/* hover glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-lime-500/0 via-lime-500/4 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />

      {/* badges row */}
      <div className="flex items-center gap-2 flex-wrap">
        <div className="flex items-center gap-1.5 bg-yellow-500/10 border border-yellow-500/25 px-2.5 py-1 rounded-full">
          <Star size={9} className="text-yellow-400 fill-yellow-400" />
          <span className="font-mono text-xs text-yellow-400">Featured</span>
        </div>
        {post.difficulty && (
          <span className={`font-mono text-xs px-2.5 py-1 rounded-full border ${diffCls}`}>
            {post.difficulty}
          </span>
        )}
        {post.category && (
          <span className="font-mono text-xs px-2.5 py-1 rounded-full border border-zinc-800 text-zinc-500">
            {post.category}
          </span>
        )}
      </div>

      {/* title */}
      <h3 className="font-black text-white text-xl sm:text-2xl leading-tight tracking-tight group-hover:text-lime-400 transition-colors">
        {post.title}
      </h3>

      <p className="text-zinc-500 text-sm leading-7 flex-1">{post.preview}</p>

      {/* tags */}
      <div className="flex flex-wrap gap-1.5">
        {post.tags.map(t => (
          <span key={t}
            className="flex items-center gap-1 font-mono text-xs text-zinc-500 bg-zinc-900 border border-zinc-800 px-2.5 py-1 rounded-md">
            <img src={getRealIconUrl(t)} alt={t} className="w-3 h-3"
              onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
            {t}
          </span>
        ))}
      </div>

      {/* footer */}
      <div className="flex items-center justify-between pt-4 border-t border-zinc-900">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-zinc-600">
            <PostIcon type={post.icon} />
            <span className="font-mono text-xs">{fmt(post.publishDate)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={11} className="text-zinc-700" />
            <span className="font-mono text-xs text-zinc-600">{post.readTime}</span>
          </div>
        </div>
        <div className="flex items-center gap-3 text-zinc-600 font-mono text-xs">
          <span className="flex items-center gap-1"><Eye size={11} />{post.views?.toLocaleString()}</span>
          <span className="flex items-center gap-1"><Heart size={11} />{post.likes}</span>
          <span className="flex items-center gap-1"><MessageCircle size={11} />{post.comments}</span>
        </div>
      </div>

      <div className="flex items-center gap-1.5 font-mono text-xs text-lime-400 font-bold">
        Read article
        <ArrowUpRight size={12} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </Link>
  );
}

function StandardCard({ post }: { post: BlogPost }) {
  const diffCls = DIFF_STYLE[post.difficulty ?? "beginner"];
  return (
    <Link href={`/blog/${post.id}`}
      className="group bg-zinc-950 border border-zinc-800 hover:border-zinc-700 rounded-2xl p-6 flex flex-col gap-4 transition-all duration-200 hover:-translate-y-1">

      {/* meta */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2 text-zinc-600">
          <PostIcon type={post.icon} />
          <span className="font-mono text-xs">{fmt(post.publishDate)}</span>
          <span className="font-mono text-xs">· {post.readTime}</span>
        </div>
        {post.difficulty && (
          <span className={`font-mono text-xs px-2.5 py-0.5 rounded-full border ${diffCls}`}>
            {post.difficulty}
          </span>
        )}
      </div>

      <h3 className="font-bold text-white text-sm leading-tight group-hover:text-lime-400 transition-colors flex-1">
        {post.title}
      </h3>

      <p className="text-zinc-600 text-xs leading-6 line-clamp-2">{post.preview}</p>

      {/* tags */}
      <div className="flex flex-wrap gap-1.5">
        {post.tags.slice(0, 3).map(t => (
          <span key={t}
            className="flex items-center gap-1 font-mono text-xs text-zinc-600 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded-md">
            <img src={getRealIconUrl(t)} alt={t} className="w-2.5 h-2.5"
              onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
            {t}
          </span>
        ))}
        {post.tags.length > 3 && (
          <span className="font-mono text-xs text-zinc-700 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded-md">
            +{post.tags.length - 3}
          </span>
        )}
      </div>

      {/* footer */}
      <div className="flex items-center justify-between pt-3 border-t border-zinc-900">
        <div className="flex items-center gap-3 text-zinc-700 font-mono text-xs">
          <span className="flex items-center gap-1"><Eye size={10} />{post.views?.toLocaleString()}</span>
          <span className="flex items-center gap-1"><Heart size={10} />{post.likes}</span>
        </div>
        <span className="flex items-center gap-1 font-mono text-xs text-lime-400">
          Read <ChevronRight size={10} />
        </span>
      </div>
    </Link>
  );
}

function CompactCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.id}`}
      className="group flex items-center gap-4 bg-zinc-950 border border-zinc-800 hover:border-zinc-700 rounded-xl px-5 py-3.5 transition-all duration-200 hover:bg-zinc-900/50">
      <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 text-zinc-600 group-hover:text-lime-400 group-hover:border-lime-500/25 transition-colors">
        <PostIcon type={post.icon} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-bold text-xs text-zinc-300 group-hover:text-white truncate transition-colors">{post.title}</p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="font-mono text-xs text-zinc-700">{fmt(post.publishDate)}</span>
          <span className="font-mono text-xs text-zinc-700">· {post.readTime}</span>
          <span className="flex items-center gap-0.5 font-mono text-xs text-zinc-700 ml-1">
            <Eye size={9} />{post.views?.toLocaleString()}
          </span>
        </div>
      </div>
      <ArrowUpRight size={12} className="text-zinc-700 group-hover:text-lime-400 shrink-0 transition-colors" />
    </Link>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

type View = "grid" | "list" | "compact";

export default function BlogSection() {
  const [view,       setView]       = useState<View>("grid");
  const [category,   setCategory]   = useState("All");
  const [difficulty, setDifficulty] = useState("All");
  const [search,     setSearch]     = useState("");
  const [showFilter, setShowFilter] = useState(false);

  const filtered = POSTS.filter(p => {
    const catOk  = category   === "All" || p.category   === category;
    const diffOk = difficulty === "All" || p.difficulty === difficulty;
    const q      = search.toLowerCase();
    const srcOk  = !q || p.title.toLowerCase().includes(q) || p.preview.toLowerCase().includes(q) || p.tags.some(t => t.toLowerCase().includes(q));
    return catOk && diffOk && srcOk;
  });

  const featured = filtered.filter(p => p.featured);
  const regular  = filtered.filter(p => !p.featured);
  const anyFilter = category !== "All" || difficulty !== "All" || search !== "";

  return (
    <section id="blog" className="bg-black text-white">
      <div className="max-w-screen-xl mx-auto px-6 md:px-14 py-12 space-y-5">

        {/* ══ HEADER ══ */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-zinc-900">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8 bg-lime-400" />
              <span className="font-mono text-xs text-zinc-600 tracking-widest uppercase">04 — Articles</span>
            </div>
            <h2 className="font-black tracking-tighter leading-none text-white text-5xl sm:text-6xl xl:text-7xl">
              Dev Blog &
            </h2>
            <h2 className="font-black tracking-tighter leading-none text-lime-400 text-5xl sm:text-6xl xl:text-7xl">
              Insights.
            </h2>
          </div>

          {/* Search + view toggle */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            {/* Search */}
            <div className="relative">
              <Search size={12} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-600 pointer-events-none" />
              <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search articles…"
                className="h-10 pl-9 pr-4 bg-zinc-950 border border-zinc-800 hover:border-zinc-700 focus:border-lime-500/50 focus:outline-none rounded-xl font-mono text-xs text-white placeholder-zinc-600 transition-colors w-60" />
              {search && (
                <button onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-white">
                  <X size={11} />
                </button>
              )}
            </div>

            {/* View toggle */}
            <div className="flex items-center gap-1 bg-zinc-950 border border-zinc-800 rounded-xl p-1">
              {([["grid", Grid3x3], ["list", List], ["compact", Layers]] as [View, React.ElementType][]).map(([v, Ic]) => (
                <button key={v} onClick={() => setView(v)}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                    view === v ? "bg-lime-400/10 text-lime-400 border border-lime-500/25" : "text-zinc-600 hover:text-zinc-300"
                  }`}>
                  <Ic size={13} />
                </button>
              ))}
            </div>

            {/* Filter toggle */}
            <button onClick={() => setShowFilter(p => !p)}
              className={`flex items-center gap-2 h-10 px-4 border rounded-xl font-mono text-xs transition-all duration-200 ${
                showFilter || anyFilter
                  ? "bg-lime-400/10 border-lime-500/25 text-lime-400"
                  : "bg-zinc-950 border-zinc-800 text-zinc-500 hover:text-zinc-200 hover:border-zinc-700"
              }`}>
              <Filter size={12} />
              Filters
              {anyFilter && <span className="w-1.5 h-1.5 rounded-full bg-lime-400" />}
            </button>
          </div>
        </div>

        {/* ══ FILTER PANEL ══ */}
        {showFilter && (
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <span className="font-mono text-xs text-zinc-600 uppercase tracking-widest block mb-3">Category</span>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(c => (
                  <button key={c} onClick={() => setCategory(c)}
                    className={`font-mono text-xs px-3 py-1.5 rounded-xl border transition-all duration-200 ${
                      category === c
                        ? "bg-lime-400/10 border-lime-500/25 text-lime-400"
                        : "bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-zinc-200 hover:border-zinc-700"
                    }`}>{c}</button>
                ))}
              </div>
            </div>
            <div>
              <span className="font-mono text-xs text-zinc-600 uppercase tracking-widest block mb-3">Difficulty</span>
              <div className="flex flex-wrap gap-2">
                {DIFFICULTIES.map(d => (
                  <button key={d} onClick={() => setDifficulty(d)}
                    className={`font-mono text-xs px-3 py-1.5 rounded-xl border transition-all duration-200 ${
                      difficulty === d
                        ? "bg-lime-400/10 border-lime-500/25 text-lime-400"
                        : "bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-zinc-200 hover:border-zinc-700"
                    }`}>{d}</button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ══ RESULTS META ══ */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-zinc-700">
            {filtered.length} article{filtered.length !== 1 ? "s" : ""}
            {search && ` matching "${search}"`}
          </span>
          {anyFilter && (
            <button onClick={() => { setCategory("All"); setDifficulty("All"); setSearch(""); }}
              className="flex items-center gap-1 font-mono text-xs text-zinc-600 hover:text-lime-400 transition-colors">
              <X size={10} /> Clear filters
            </button>
          )}
        </div>

        {/* ══ CONTENT ══ */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-14 h-14 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-center">
              <Search size={20} className="text-zinc-700" />
            </div>
            <p className="font-mono text-sm text-zinc-600">No articles match your filters</p>
            <button onClick={() => { setCategory("All"); setDifficulty("All"); setSearch(""); }}
              className="bg-lime-400 hover:bg-lime-300 text-black text-xs font-bold px-5 py-2.5 rounded-xl transition-all duration-200">
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="space-y-5">

            {/* Featured — only in grid mode */}
            {view === "grid" && featured.length > 0 && (
              <div className={`grid gap-5 ${featured.length === 1 ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-2"}`}>
                {featured.map(p => <FeaturedCard key={p.id} post={p} />)}
              </div>
            )}

            {/* Regular posts */}
            {view === "grid" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {(featured.length > 0 ? regular : filtered).map(p => <StandardCard key={p.id} post={p} />)}
              </div>
            )}

            {view === "list" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filtered.map(p => <StandardCard key={p.id} post={p} />)}
              </div>
            )}

            {view === "compact" && (
              <div className="space-y-2">
                {filtered.map(p => <CompactCard key={p.id} post={p} />)}
              </div>
            )}
          </div>
        )}

        {/* ══ CTA ══ */}
        <div className="flex justify-center pt-4">
          <Link href="/blog"
            className="group flex items-center gap-2.5 bg-zinc-950 border border-zinc-800 hover:border-lime-500/30 hover:bg-lime-500/5 text-zinc-400 hover:text-lime-400 font-mono text-xs font-bold px-6 py-3 rounded-xl transition-all duration-200 hover:-translate-y-px">
            View all articles
            <ArrowUpRight size={13} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

      </div>
    </section>
  );
}