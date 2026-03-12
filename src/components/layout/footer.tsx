"use client";

import {
  Github, Linkedin, Twitter, Instagram, Mail,
  MapPin, ArrowUpRight, Code2, Brain, Globe,
  Users, Terminal, Award, ChevronRight, Zap,
  Star, Coffee, Clock, Send, GitCommit,
  Rocket, Heart, Package, ArrowUp
} from "lucide-react";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiPython,
  SiFastapi,
  SiPytorch,
  SiPostgresql,
  SiDocker,
  SiTailwindcss,
  SiTensorflow
} from "react-icons/si";
import { useState, useEffect } from "react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Home",          href: "/",              icon: Globe    },
  { label: "About",         href: "#about",          icon: Users    },
  { label: "Skills",        href: "#skills",         icon: Brain    },
  { label: "Projects",      href: "#projects",       icon: Code2,   badge: "15+" },
  { label: "Blog",          href: "#blog",           icon: Terminal },
  { label: "Contact",       href: "#contact",        icon: Mail     },
  { label: "Certifications",href: "#certifications", icon: Award,   badge: "11"  },
  { label: "Education",     href: "#education",      icon: Package  },
];

const STACK_TAGS = [
  { icon: SiReact,      color: "bg-sky-500/10   text-sky-400    border-sky-500/20"     },
  { icon: SiNextdotjs,  color: "bg-zinc-800     text-zinc-300   border-zinc-700"       },
  { icon: SiTypescript, color: "bg-blue-500/10  text-blue-300   border-blue-500/20"    },
  { icon: SiPython,     color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" },
  { icon: SiFastapi,    color: "bg-lime-500/10  text-lime-400   border-lime-500/20"    },
  { icon: SiPytorch,    color: "bg-orange-500/10 text-orange-400 border-orange-500/20" },
  { icon: SiPostgresql, color: "bg-indigo-500/10 text-indigo-300 border-indigo-500/20" },
  { icon: SiDocker,     color: "bg-cyan-500/10  text-cyan-400   border-cyan-500/20"    },
  { icon: SiTailwindcss,color: "bg-teal-500/10  text-teal-400   border-teal-500/20"    },
  { icon: SiTensorflow, color: "bg-amber-500/10 text-amber-400  border-amber-500/20"   },
];

const RAM_QUOTES = [
  { text: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन", sub: "Focus on your work — not the reward. Bhagavad Gita 2.47" },
  { text: "नासै रोग हरै सब पीरा, जपत निरंतर हनुमत बीरा", sub: "Constant devotion removes all pain. — Hanuman Chalisa" },
  { text: "Some losses break you silently and change the way you breathe, think, and trust forever.", sub: "— Personal truth" },
  { text: "The pain of staying small was greater than the pain of building alone.", sub: "— Builder's creed" },
];

const SOCIALS = [
  { icon: Github,    href: "https://github.com/lavudyaraja",               label: "GitHub",    hov: "hover:text-white hover:border-zinc-500"     },
  { icon: Linkedin,  href: "https://www.linkedin.com/in/lavudyaraja5228/", label: "LinkedIn",  hov: "hover:text-sky-400 hover:border-sky-500/40"  },
  { icon: Twitter,   href: "https://x.com/LavudyaRaj22988",               label: "Twitter",   hov: "hover:text-sky-300 hover:border-sky-400/40"  },
  { icon: Instagram, href: "https://www.instagram.com/u_no_me_1536",       label: "Instagram", hov: "hover:text-pink-400 hover:border-pink-500/40"},
];

const STATS = [
  { icon: Rocket,    value: "15+",  label: "Projects",     color: "group-hover:text-lime-400"   },
  { icon: GitCommit, value: "200+", label: "Commits",      color: "group-hover:text-sky-400"    },
  { icon: Award,     value: "11",   label: "Certs",        color: "group-hover:text-violet-400" },
  { icon: Star,      value: "98%",  label: "Satisfaction", color: "group-hover:text-orange-400" },
];

// ─── Scroll helper ────────────────────────────────────────────────────────────

function scrollTo(href: string) {
  if (href === "/") { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
  if (href.startsWith("#")) document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Footer() {
  const [email,      setEmail]      = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [quoteIdx,   setQuoteIdx]   = useState(0);
  const [scrolled,   setScrolled]   = useState(false);
  const [clock,      setClock]      = useState("");

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 200);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const tick = () =>
      setClock(new Date().toLocaleTimeString("en-IN", { hour12: false, hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kolkata" }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setQuoteIdx(p => (p + 1) % RAM_QUOTES.length), 5000);
    return () => clearInterval(id);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3500);
  };

  return (
    <footer className="relative bg-black border-t border-zinc-900 text-white overflow-hidden">

      {/* Ambient glows — desktop only */}
      <div className="pointer-events-none hidden lg:block">
        <div className="absolute -left-48 bottom-0 w-96 h-96 bg-lime-500/3 rounded-full blur-3xl" />
        <div className="absolute -right-48 bottom-0 w-96 h-96 bg-violet-500/3 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10 lg:px-14 py-10 sm:py-14 lg:py-16 space-y-4">

        {/* ╔══════════════════════════════════════════╗
            ║  MOBILE — stacked single column layout  ║
            ╚══════════════════════════════════════════╝ */}

        {/* ━━ BRAND BLOCK ━━ */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 sm:p-6">

          {/* Logo row */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-lime-400 flex items-center justify-center shrink-0">
                <span className="font-black text-xs text-black">LR</span>
              </div>
              <div>
                <p className="font-black text-white text-sm leading-none tracking-tight">Lavudya Rajaram</p>
                <p className="font-mono text-xs text-zinc-600 mt-0.5">ML Eng. · Full-Stack Dev</p>
              </div>
            </div>

            {/* Online badge */}
            <div className="hidden sm:flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-50" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-lime-400" />
              </span>
              <span className="font-mono text-xs text-lime-400">Online</span>
              <span className="font-mono text-xs text-zinc-700 tabular-nums ml-1">{clock}</span>
            </div>
          </div>

          <p className="text-zinc-500 text-xs leading-6 mb-4">
            Building intelligent systems and polished interfaces — from ML pipelines to production
            full-stack products. Every line of code serves a purpose.
          </p>

          {/* Meta chips — horizontal scroll on very small screens */}
          <div className="flex flex-wrap gap-2 mb-5">
            {[
              { ic: MapPin, t: "Hyderabad, IN"       },
              { ic: Mail,   t: "codeml862@gmail.com" },
              { ic: Coffee, t: "Open to work"        },
            ].map(({ ic: Ic, t }) => (
              <div key={t} className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5">
                <Ic size={10} className="text-zinc-600 shrink-0" />
                <span className="font-mono text-xs text-zinc-400 whitespace-nowrap">{t}</span>
              </div>
            ))}
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-zinc-700 uppercase tracking-widest mr-1">Follow</span>
            {SOCIALS.map(({ icon: Ic, href, label, hov }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" title={label}
                className={`flex-1 h-9 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center text-zinc-600 ${hov} transition-all duration-200 hover:-translate-y-px`}>
                <Ic size={14} />
              </a>
            ))}
          </div>
        </div>

        {/* ━━ STATS — 2×2 grid, expands to 4 col on md ━━ */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {STATS.map(({ icon: Ic, value, label, color }) => (
            <div key={label}
              className="group bg-zinc-950 border border-zinc-800 hover:border-zinc-700 rounded-2xl p-4 flex flex-col gap-2 transition-all duration-200 hover:-translate-y-0.5 cursor-default">
              <Ic size={13} className={`text-zinc-700 transition-colors ${color}`} />
              <p className={`text-2xl font-black text-white transition-colors leading-none ${color}`}>{value}</p>
              <p className="font-mono text-xs text-zinc-600">{label}</p>
            </div>
          ))}
        </div>

        {/* ━━ NAV + STACK + QUOTE — responsive 3-col on lg ━━ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          {/* Navigation */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 sm:p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-5 bg-lime-400" />
              <span className="font-mono text-xs text-zinc-600 uppercase tracking-widest">Navigation</span>
            </div>

            {/* 2-col grid of nav buttons */}
            <div className="grid grid-cols-2 gap-2">
              {NAV_LINKS.map(({ label, href, icon: Ic, badge }) => (
                <button key={label} onClick={() => scrollTo(href)}
                  className="group flex items-center gap-2 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/80 rounded-xl px-3 py-2.5 transition-all duration-200 hover:-translate-y-px text-left">
                  <Ic size={11} className="text-zinc-600 group-hover:text-lime-400 transition-colors shrink-0" />
                  <span className="text-zinc-400 group-hover:text-white text-xs font-medium transition-colors flex-1 truncate">{label}</span>
                  {badge
                    ? <span className="font-mono text-xs text-zinc-700 group-hover:text-lime-400 transition-colors shrink-0">{badge}</span>
                    : <ChevronRight size={9} className="text-zinc-800 group-hover:text-zinc-500 transition-colors shrink-0" />
                  }
                </button>
              ))}
            </div>

            {/* CTA row */}
            <div className="flex gap-2 mt-4 pt-4 border-t border-zinc-900">
              <a href="mailto:codeml862@gmail.com"
                className="group flex-1 flex items-center justify-center gap-1.5 h-9 bg-lime-400 hover:bg-lime-300 text-black text-xs font-bold rounded-xl transition-all duration-200 hover:-translate-y-px hover:shadow-lg hover:shadow-lime-400/20">
                Hire Me
                <ArrowUpRight size={11} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a href="/Rajaram-resume.pdf" download
                className="flex items-center justify-center gap-1.5 px-4 h-9 border border-zinc-800 hover:border-zinc-600 text-zinc-400 hover:text-white text-xs font-medium rounded-xl transition-all duration-200 hover:bg-zinc-900">
                Resume
              </a>
            </div>
          </div>

          {/* Tech stack */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 sm:p-6 flex flex-col">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="h-px w-5 bg-lime-400" />
                <span className="font-mono text-xs text-zinc-600 uppercase tracking-widest">Tech Stack</span>
              </div>
              <Code2 size={12} className="text-lime-400" />
            </div>
            <div className="grid grid-cols-5 sm:grid-cols-5 gap-2 flex-1">
              {STACK_TAGS.map(({ icon: Icon, color }, index) => (
                <div key={index}
                  className={`${color} border font-mono text-xs px-3 py-3 rounded-md cursor-default hover:opacity-70 transition-opacity flex items-center justify-center`}>
                  <Icon size={50} />
                </div>
              ))}
            </div>

            {/* Newsletter — on mobile sits here, on md+ moves to its own col */}
            <div className="mt-5 pt-5 border-t border-zinc-900 block lg:hidden">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-px w-5 bg-lime-400" />
                <span className="font-mono text-xs text-zinc-600 uppercase tracking-widest">Stay Updated</span>
              </div>
              <NewsletterForm
                email={email} setEmail={setEmail}
                subscribed={subscribed} onSubmit={handleSubscribe}
                clock={clock}
              />
            </div>
          </div>

          {/* Ram's Wisdom — hidden on md, visible on lg */}
          <div className="hidden lg:flex bg-zinc-950 border border-zinc-800 rounded-2xl p-6 flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-5 bg-lime-400" />
                <span className="font-mono text-xs text-zinc-600 uppercase tracking-widest">Ram's Wisdom</span>
              </div>
              <div className="relative overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800 p-5 min-h-[120px]">
                {RAM_QUOTES.map((q, i) => (
                  <div key={i}
                    className={`absolute inset-5 flex flex-col justify-between transition-all duration-700 ${
                      i === quoteIdx
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-3 pointer-events-none"
                    }`}>
                    <div className="flex items-start gap-2">
                      <Star size={12} className="text-lime-400 shrink-0 mt-0.5" />
                      <p className="text-zinc-200 text-xs leading-6 italic">{q.text}</p>
                    </div>
                    <p className="font-mono text-xs text-zinc-600 mt-3">{q.sub}</p>
                  </div>
                ))}
              </div>
              {/* Pip dots */}
              <div className="flex items-center gap-1.5 mt-4">
                {RAM_QUOTES.map((_, i) => (
                  <button key={i} onClick={() => setQuoteIdx(i)}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      i === quoteIdx ? "w-5 bg-lime-400" : "w-1.5 bg-zinc-700 hover:bg-zinc-600"
                    }`} />
                ))}
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 pt-5 border-t border-zinc-900 mt-5">
              <span className="font-bold text-sm bg-gradient-to-r from-orange-500 via-white to-green-500 bg-clip-text text-transparent">
                जय श्री सीताराम
              </span>
              <span>🙏</span>
            </div>
          </div>
        </div>

        {/* ━━ NEWSLETTER — standalone on lg ━━ */}
        {/* <div className="hidden lg:block bg-zinc-950 border border-zinc-800 rounded-2xl p-6">
          <div className="grid grid-cols-2 gap-8 items-start">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="h-px w-5 bg-lime-400" />
                <span className="font-mono text-xs text-zinc-600 uppercase tracking-widest">Stay Updated</span>
              </div>
              <p className="text-zinc-500 text-xs leading-6">
                Get notified about new projects, articles, and tech deep-dives. No spam — just signal.
              </p>
            </div>
            <NewsletterForm
              email={email} setEmail={setEmail}
              subscribed={subscribed} onSubmit={handleSubscribe}
              clock={clock} horizontal
            />
          </div>
        </div> */}

        {/* ━━ BOTTOM BAR ━━ */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl px-5 sm:px-6 py-5">

          {/* Mobile layout — stacked */}
          <div className="flex flex-col sm:flex-row items-center gap-4">

            {/* Copyright */}
            <div className="flex-1 text-center sm:text-left">
              <p className="font-mono text-xs text-zinc-500">
                © 2025 Lavudya Rajaram · All rights reserved
              </p>
              <p className="font-mono text-xs text-zinc-800 mt-1 hidden sm:block">
                Built with failures, long nights, and an unstoppable urge to build
              </p>
            </div>

            {/* Built-with chips */}
            <div className="flex items-center gap-1.5 flex-wrap justify-center">
              <span className="font-mono text-xs text-zinc-700">Built with</span>
              {["Next.js", "Tailwind", "TypeScript"].map(t => (
                <span key={t}
                  className="font-mono text-xs text-zinc-600 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded-md">
                  {t}
                </span>
              ))}
              <Heart size={10} className="text-lime-400 ml-0.5" />
            </div>

            {/* Scroll to top */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className={`flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 hover:border-lime-500/30 hover:bg-lime-500/5 rounded-xl px-4 py-2 transition-all duration-300 hover:-translate-y-px ${
                scrolled ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}>
              <ArrowUp size={11} className="text-zinc-600 hover:text-lime-400 transition-colors" />
              <span className="font-mono text-xs text-zinc-500">Top</span>
            </button>
          </div>

          {/* Mobile only — quote teaser */}
          <div className="mt-4 pt-4 border-t border-zinc-900 lg:hidden">
            <div className="flex items-start gap-2">
              <Star size={11} className="text-lime-400 shrink-0 mt-0.5" />
              <p className="font-mono text-xs text-zinc-600 italic leading-5 line-clamp-2">
                {RAM_QUOTES[quoteIdx].text}
              </p>
            </div>
            <div className="flex items-center gap-1.5 mt-2">
              {RAM_QUOTES.map((_, i) => (
                <button key={i} onClick={() => setQuoteIdx(i)}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === quoteIdx ? "w-4 bg-lime-400" : "w-1.5 bg-zinc-700"
                  }`} />
              ))}
              <span className="font-mono text-xs text-zinc-700 ml-2">जय श्री सीताराम 🙏</span>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
}

// ─── Newsletter sub-component ─────────────────────────────────────────────────

interface NewsletterFormProps {
  email: string;
  setEmail: (v: string) => void;
  subscribed: boolean;
  onSubmit: (e: React.FormEvent) => void;
  clock: string;
  horizontal?: boolean;
}

function NewsletterForm({ email, setEmail, subscribed, onSubmit, clock, horizontal }: NewsletterFormProps) {
  return (
    <form onSubmit={onSubmit} className={horizontal ? "flex flex-col gap-3" : "space-y-3"}>
      {horizontal ? (
        <div className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="flex-1 h-10 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 focus:border-lime-500/50 focus:outline-none rounded-xl px-4 font-mono text-xs text-white placeholder-zinc-600 transition-colors"
          />
          <SubscribeButton subscribed={subscribed} />
        </div>
      ) : (
        <>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="w-full h-10 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 focus:border-lime-500/50 focus:outline-none rounded-xl px-4 font-mono text-xs text-white placeholder-zinc-600 transition-colors"
          />
          <SubscribeButton subscribed={subscribed} />
        </>
      )}

      {/* Live clock */}
      <div className="flex items-center gap-2">
        <Clock size={10} className="text-zinc-700" />
        <span className="font-mono text-xs text-zinc-700 tabular-nums">{clock} IST</span>
        <div className="flex-1" />
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-50" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-lime-400" />
        </span>
        <span className="font-mono text-xs text-lime-400">Online</span>
      </div>
    </form>
  );
}

function SubscribeButton({ subscribed }: { subscribed: boolean }) {
  return (
    <button type="submit"
      className={`group w-full h-10 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all duration-200 ${
        subscribed
          ? "bg-emerald-500/15 border border-emerald-500/30 text-emerald-400"
          : "bg-lime-400 hover:bg-lime-300 text-black hover:-translate-y-px hover:shadow-lg hover:shadow-lime-400/20"
      }`}>
      {subscribed ? (
        <><span className="w-2 h-2 rounded-full bg-emerald-400" /> Subscribed!</>
      ) : (
        <>
          <Send size={12} />
          Subscribe
          <ArrowUpRight size={11} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </>
      )}
    </button>
  );
}