"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Home, User, Brain, FolderKanban, Award,
  Mail, GraduationCap, BookOpen, ArrowUpRight,
  X, Menu, ChevronRight, Zap, Clock, Download
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────

interface NavItem {
  id:     string;
  label:  string;
  icon:   React.ElementType;
  href:   string;
  badge?: string;
  desc?:  string;
}

// ─── Config ───────────────────────────────────────────────────────────────────

const NAV: NavItem[] = [
  { id: "home",           label: "Home",          icon: Home,          href: "/",             desc: "Back to top"          },
  { id: "about",          label: "About",         icon: User,          href: "#about",        desc: "Who I am"             },
  { id: "education",      label: "Education",     icon: GraduationCap, href: "#education",    desc: "Academic background"  },
  { id: "skills",         label: "Skills",        icon: Brain,         href: "#skills",       desc: "Tech stack"           },
  { id: "projects",       label: "Projects",      icon: FolderKanban,  href: "#projects",     desc: "Things I built",      badge: "15+" },
  { id: "blog",           label: "Articles",      icon: BookOpen,      href: "#blog",         desc: "Dev writing"          },
  { id: "certifications", label: "Certs",         icon: Award,         href: "#certificates", desc: "Verified learning",   badge: "11"  },
  { id: "contact",        label: "Contact",       icon: Mail,          href: "#contact",      desc: "Let's talk"           },
];

// ─── Helper ───────────────────────────────────────────────────────────────────

function smoothNav(href: string, router: ReturnType<typeof useRouter>) {
  if (href === "/") { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
  if (href.startsWith("#")) { document.querySelector(href)?.scrollIntoView({ behavior: "smooth" }); return; }
  router.push(href);
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Navbar() {
  const [active,      setActive]     = useState("home");
  const [scrollPct,   setScrollPct]  = useState(0);
  const [scrolled,    setScrolled]   = useState(false);
  const [mobileOpen,  setMobileOpen] = useState(false);
  const [clock,       setClock]      = useState("");
  const [greeting,    setGreeting]   = useState(true);
  const router = useRouter();

  // Scroll tracker
  useEffect(() => {
    const fn = () => {
      const top    = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct(height > 0 ? Math.min(100, (top / height) * 100) : 0);
      setScrolled(top > 60);
      if (top > 80) setGreeting(false);

      // Auto-detect active section
      const sections = NAV
        .filter(n => n.href.startsWith("#"))
        .map(n => ({ id: n.id, el: document.querySelector(n.href) }))
        .filter(s => s.el);

      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i].el!.getBoundingClientRect().top <= 120) {
          setActive(sections[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // IST clock
  useEffect(() => {
    const tick = () =>
      setClock(new Date().toLocaleTimeString("en-IN", {
        hour12: false, hour: "2-digit", minute: "2-digit",
        timeZone: "Asia/Kolkata",
      }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const navigate = useCallback((item: NavItem) => {
    setActive(item.id);
    setMobileOpen(false);
    smoothNav(item.href, router);
  }, [router]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      {/* ── SCROLL PROGRESS ─────────────────────────────── */}
      {/* <div className="fixed top-0 inset-x-0 z-[60] h-0.5 bg-zinc-900">
        <div
          className="h-full bg-lime-400 transition-all duration-150 ease-out"
          style={{ width: `${scrollPct}%` }}
        />
      </div> */}

      {/* ── GREETING BANNER ─────────────────────────────── */}
      <div className={`bg-black fixed inset-x-0 z-50 transition-all duration-500 overflow-hidden ${
        greeting ? "top-0.5 opacity-100" : "top-0.5 opacity-0 pointer-events-none"
      }`}>
        <div className="flex items-center justify-center gap-3 bg-zinc-950/95 backdrop-blur-sm border-b border-zinc-900 h-10">
          <span className="relative flex h-1.5 w-1.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-lime-400" />
          </span>
          <span className="font-mono text-xs text-zinc-500 tracking-widest hidden sm:block">
            Welcome to Rajaram's Portfolio · Have a great day 👋
          </span>
          <span className="font-mono text-xs text-zinc-500 sm:hidden">
            Welcome 👋
          </span>
          <button
            onClick={() => setGreeting(false)}
            className="ml-2 text-zinc-700 hover:text-zinc-400 transition-colors"
          >
            <X size={11} />
          </button>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════
          DESKTOP NAV  (md and above)
      ════════════════════════════════════════════════════ */}
      <nav className={`bg-black hidden md:block fixed inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "top-0.5" : greeting ? "top-10" : "top-0.5"
      }`}>
        <div className={`mx-auto max-w-screen-xl px-6 lg:px-14 transition-all duration-300 ${
          scrolled ? "py-2" : "py-3"
        }`}>
          <div className={`flex items-center justify-between gap-4 px-4 lg:px-6 rounded-2xl h-14 transition-all duration-300 ${
            scrolled
              ? "bg-black/90 backdrop-blur-xl border border-zinc-800/80 shadow-2xl shadow-black/50"
              : "bg-zinc-950/80 backdrop-blur-sm border border-zinc-900"
          }`}>

            {/* Logo */}
            <button onClick={() => navigate(NAV[0])} className="group flex items-center gap-3 shrink-0">
              <div className="w-8 h-8 rounded-xl bg-lime-400 group-hover:bg-lime-300 flex items-center justify-center transition-all duration-200 group-hover:-translate-y-px group-hover:shadow-lg group-hover:shadow-lime-400/30">
                <span className="font-black text-black text-xs">LR</span>
              </div>
              <div className="hidden lg:block">
                <p className="font-black text-white text-sm leading-none tracking-tight">Lavudya Rajaram</p>
                <p className="font-mono text-xs text-zinc-600 mt-0.5">ML Eng. · Full-Stack</p>
              </div>
            </button>

            {/* Pill nav */}
            <div className="flex items-center gap-0.5 bg-zinc-900/60 border border-zinc-800/60 rounded-xl px-1.5 py-1.5 overflow-x-auto scrollbar-hide">
              {NAV.map((item) => {
                const Icon  = item.icon;
                const isAct = active === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => navigate(item)}
                    title={item.label}
                    className={`group relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs tracking-wide transition-all duration-200 whitespace-nowrap shrink-0 ${
                      isAct
                        ? "bg-lime-400 text-black font-bold shadow-md shadow-lime-400/20"
                        : "text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/70"
                    }`}
                  >
                    <Icon size={12} className={isAct ? "text-black" : "text-zinc-700 group-hover:text-zinc-400 transition-colors"} />
                    <span className="hidden lg:inline">{item.label}</span>
                    {item.badge && (
                      <span className={`font-bold text-xs px-1 py-px rounded-md leading-none ${
                        isAct ? "bg-black/20 text-black" : "bg-zinc-700 text-zinc-400 group-hover:bg-zinc-600"
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Right */}
            <div className="flex items-center gap-2 shrink-0">
              <div className="hidden xl:flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-1.5">
                <Clock size={10} className="text-zinc-700" />
                <span className="font-mono text-xs text-zinc-500 tabular-nums">{clock}</span>
              </div>
              <a href="/Rajaram-resume.pdf" download
                className="hidden lg:flex items-center gap-1.5 border border-zinc-800 hover:border-zinc-600 text-zinc-400 hover:text-white font-mono text-xs px-3 py-2 rounded-xl transition-all duration-200 hover:bg-zinc-900">
                <Download size={11} /><span>Resume</span>
              </a>
              <Link href="/hireme"
                className="group flex items-center gap-1.5 bg-lime-400 hover:bg-lime-300 text-black font-bold text-xs px-4 py-2 rounded-xl transition-all duration-200 hover:-translate-y-px hover:shadow-lg hover:shadow-lime-400/25">
                <Zap size={11} />Hire Me
                <ArrowUpRight size={11} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* ════════════════════════════════════════════════════
          MOBILE TOP BAR  (below md)
      ════════════════════════════════════════════════════ */}
      <div className={`md:hidden fixed inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "top-0.5" : greeting ? "top-10" : "top-0.5"
      }`}>
        <div className={`flex items-center justify-between h-14 px-4 transition-all duration-300 ${
          scrolled
            ? "bg-black/95 backdrop-blur-xl border-b border-zinc-800"
            : "bg-zinc-950/90 backdrop-blur-sm border-b border-zinc-900"
        }`}>

          {/* Logo */}
          <button onClick={() => navigate(NAV[0])} className="group flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-lime-400 flex items-center justify-center">
              <span className="font-black text-black text-xs">LR</span>
            </div>
            <div>
              <p className="font-black text-white text-sm leading-none">Rajaram</p>
              <p className="font-mono text-xs text-zinc-600 mt-0.5">ML · Dev</p>
            </div>
          </button>

          {/* Right: Hire + Burger */}
          <div className="flex items-center gap-2">
            <Link href="/hireme"
              className="flex items-center gap-1 bg-lime-400 hover:bg-lime-300 text-black font-bold text-xs px-3 py-1.5 rounded-xl transition-colors">
              <Zap size={11} /> Hire
            </Link>
            <button
              onClick={() => setMobileOpen(p => !p)}
              className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition-all duration-200"
            >
              {mobileOpen ? <X size={15} /> : <Menu size={15} />}
            </button>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════
          MOBILE DRAWER
      ════════════════════════════════════════════════════ */}
      {/* Backdrop */}
      <div
        onClick={() => setMobileOpen(false)}
        className={`md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Sheet — slides up from bottom */}
      <div className={`md:hidden fixed inset-x-0 bottom-0 z-50 transition-transform duration-300 ease-out ${
        mobileOpen ? "translate-y-0" : "translate-y-full"
      }`}>
        <div className="bg-zinc-950 border-t border-zinc-800 rounded-t-3xl overflow-hidden">

          {/* Handle */}
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-zinc-700" />
          </div>

          {/* Sheet header */}
          <div className="flex items-center justify-between px-5 pb-4 pt-2">
            <div>
              <p className="font-black text-white text-sm">Navigate</p>
              <p className="font-mono text-xs text-zinc-600 mt-0.5">Where do you want to go?</p>
            </div>
            <div className="flex items-center gap-3">
              {/* Online + clock */}
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-lime-400" />
                </span>
                <span className="font-mono text-xs text-zinc-600 tabular-nums">{clock}</span>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="w-8 h-8 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-white transition-colors"
              >
                <X size={13} />
              </button>
            </div>
          </div>

          {/* ── 2-column nav grid ── */}
          <div className="px-4 pb-4 grid grid-cols-2 gap-2">
            {NAV.map((item) => {
              const Icon  = item.icon;
              const isAct = active === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => navigate(item)}
                  className={`group flex items-center gap-3 px-3.5 py-3.5 rounded-2xl border transition-all duration-200 text-left ${
                    isAct
                      ? "bg-lime-400/10 border-lime-500/25"
                      : "bg-zinc-900/60 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900"
                  }`}
                >
                  {/* Icon box */}
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    isAct ? "bg-lime-400/15" : "bg-zinc-800 group-hover:bg-zinc-700"
                  }`}>
                    <Icon size={15} className={isAct ? "text-lime-400" : "text-zinc-400 group-hover:text-zinc-200"} />
                  </div>

                  {/* Text */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <p className={`font-semibold text-sm leading-none truncate ${
                        isAct ? "text-lime-400" : "text-zinc-200 group-hover:text-white"
                      }`}>
                        {item.label}
                      </p>
                      {item.badge && (
                        <span className={`font-mono text-xs px-1.5 py-px rounded-md leading-none shrink-0 ${
                          isAct ? "bg-lime-400/20 text-lime-400" : "bg-zinc-700 text-zinc-400"
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <p className={`font-mono text-xs mt-1 truncate ${
                      isAct ? "text-lime-400/60" : "text-zinc-600"
                    }`}>
                      {item.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* ── CTA row ── */}
          <div className="px-4 pb-4 grid grid-cols-3 gap-2">
            <Link href="/hireme"
              className="col-span-1 flex items-center justify-center gap-1.5 py-3 bg-lime-400 hover:bg-lime-300 text-black font-bold text-xs rounded-2xl transition-all duration-200">
              <Zap size={12} /> Hire Me
            </Link>
            <a href="mailto:codeml862@gmail.com"
              className="col-span-1 flex items-center justify-center gap-1.5 py-3 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white text-xs font-medium rounded-2xl transition-all duration-200">
              <Mail size={12} /> Email
            </a>
            <a href="/Rajaram-resume.pdf" download
              className="col-span-1 flex items-center justify-center gap-1.5 py-3 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white text-xs font-medium rounded-2xl transition-all duration-200">
              <Download size={12} /> CV
            </a>
          </div>

          {/* ── Read progress ── */}
          <div className="px-4 pb-6">
            <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-3">
              <span className="font-mono text-xs text-zinc-600">Read</span>
              <div className="flex-1 h-1 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-lime-400 rounded-full transition-all duration-300"
                  style={{ width: `${scrollPct}%` }}
                />
              </div>
              <span className="font-mono text-xs text-zinc-500 tabular-nums w-8 text-right">
                {Math.round(scrollPct)}%
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* ── Desktop spacer ── */}
      <div className={`bg-black hidden md:block transition-all duration-500 ${greeting ? "h-24" : "h-20"}`} />
      {/* ── Mobile spacer (just for the top bar) ── */}
      <div className="md:hidden h-14" />
    </>
  );
}