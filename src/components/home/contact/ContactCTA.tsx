"use client";

import {
  Mail, Phone, MessageCircle, Calendar,
  Github, Linkedin, Twitter, Instagram,
  ArrowUpRight, MapPin, Clock, CheckCircle,
  Zap, Terminal, Send, ChevronRight,
  Globe, Copy, ExternalLink, Coffee,
  Users, Code2, GitCommit, Star
} from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

// ─── Data ─────────────────────────────────────────────────────────────────────

const CONTACT_METHODS = [
  {
    id: "email",
    icon: Mail,
    label: "Email",
    value: "codeml862@gmail.com",
    subtext: "Preferred channel · Reply within 24h",
    href: "mailto:codeml862@gmail.com",
    accent: "text-lime-400",
    border: "border-lime-500/20",
    bg: "bg-lime-500/8",
    hoverBorder: "hover:border-lime-500/40",
    copyable: true,
  },
  {
    id: "phone",
    icon: Phone,
    label: "Phone",
    value: "+91 70932 21536",
    subtext: "Calls & SMS welcome",
    href: "tel:+917093221536",
    accent: "text-sky-400",
    border: "border-sky-500/20",
    bg: "bg-sky-500/8",
    hoverBorder: "hover:border-sky-500/40",
    copyable: true,
  },
  {
    id: "whatsapp",
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Chat on WhatsApp",
    subtext: "Instant · End-to-end encrypted",
    href: "https://wa.me/917093221536?text=Hi%20Rajaram%2C%20I%20visited%20your%20portfolio%20and%20would%20like%20to%20connect!",
    accent: "text-emerald-400",
    border: "border-emerald-500/20",
    bg: "bg-emerald-500/8",
    hoverBorder: "hover:border-emerald-500/40",
    copyable: false,
  },
  {
    id: "schedule",
    icon: Calendar,
    label: "Schedule a Call",
    value: "Book via Calendly",
    subtext: "Pick a time that works for you",
    href: "https://calendly.com/raja",
    accent: "text-violet-400",
    border: "border-violet-500/20",
    bg: "bg-violet-500/8",
    hoverBorder: "hover:border-violet-500/40",
    copyable: false,
  },
];

const SOCIALS = [
  { icon: Github,    href: "https://github.com/lavudyaraja",               label: "GitHub",    sub: "19+ Repos"   },
  { icon: Linkedin,  href: "https://www.linkedin.com/in/lavudyaraja5228/", label: "LinkedIn",  sub: "Connect"     },
  { icon: Twitter,   href: "https://x.com/LavudyaRaj22988",               label: "Twitter",   sub: "@LavudyaRaj" },
  { icon: Instagram, href: "https://www.instagram.com/u_no_me_1536",       label: "Instagram", sub: "Follow"      },
];

const AVAILABILITY = [
  { label: "Full-Time Role",      dot: "bg-lime-400"    },
  { label: "Internship",          dot: "bg-lime-400"    },
  { label: "Freelance Project",   dot: "bg-lime-400"    },
  { label: "Open Source Collab",  dot: "bg-lime-400"    },
  { label: "Remote Work",         dot: "bg-lime-400"    },
  { label: "Technical Consulting",dot: "bg-lime-400"    },
];

const TERMINAL_LINES = [
  { prefix: "$",  text: "whoami",                        color: "text-zinc-300"  },
  { prefix: ">",  text: "Lavudya Rajaram — ML & Full-Stack Engineer", color: "text-lime-400"  },
  { prefix: "$",  text: "status --availability",         color: "text-zinc-300"  },
  { prefix: ">",  text: "Open · Ready for immediate start", color: "text-emerald-400" },
  { prefix: "$",  text: "contact --method email",        color: "text-zinc-300"  },
  { prefix: ">",  text: "codeml862@gmail.com",           color: "text-sky-400"   },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function ContactCTA() {
  const [copied, setCopied]         = useState<string | null>(null);
  const [clock,  setClock]          = useState("");
  const [lineIdx, setLineIdx]       = useState(0);
  const [visibleLines, setVisible]  = useState<number[]>([]);

  // Live clock
  useEffect(() => {
    const tick = () =>
      setClock(new Date().toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit" }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Terminal line reveal — one line every 800ms
  useEffect(() => {
    if (lineIdx < TERMINAL_LINES.length) {
      const t = setTimeout(() => {
        setVisible(p => [...p, lineIdx]);
        setLineIdx(p => p + 1);
      }, 800);
      return () => clearTimeout(t);
    }
  }, [lineIdx]);

  const copy = (value: string, id: string) => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  return (
    <section id="contact" className="bg-black text-white min-h-screen">

      {/* Glow blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-60 right-0 w-[500px] h-[500px] rounded-full bg-lime-500/4 blur-3xl" />
        <div className="absolute bottom-0 -left-60 w-[500px] h-[500px] rounded-full bg-sky-500/4  blur-3xl" />
      </div>

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-14 py-12 space-y-5">

        {/* ══════════════════════════════════════════
            ROW 1 — Headline + status card
        ══════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* Giant headline — 2 cols */}
          <div className="lg:col-span-2 bg-zinc-950 border border-zinc-800 rounded-3xl p-8 md:p-12 flex flex-col justify-between min-h-[260px] relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-lime-500/0 via-lime-500/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" />

            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-lime-400" />
              <span className="font-mono text-xs text-zinc-600 tracking-widest uppercase">05 — Contact</span>
            </div>

            <div>
              <h2 className="font-black tracking-tighter leading-none text-white text-5xl sm:text-6xl xl:text-7xl">
                Let's build
              </h2>
              <h2 className="font-black tracking-tighter leading-none text-lime-400 text-5xl sm:text-6xl xl:text-7xl">
                something great.
              </h2>
              <p className="text-zinc-500 text-sm mt-5 max-w-lg leading-7">
                Have a project, a role, or just want to talk tech? 
                Pick a channel and reach out — I respond within 24 hours.
              </p>
            </div>
          </div>

          {/* Status card — 1 col */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-7 flex flex-col justify-between gap-5">
            {/* Availability indicator */}
            <div>
              <div className="flex items-center justify-between mb-5 pb-5 border-b border-zinc-900">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-50" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-lime-400" />
                  </span>
                  <span className="font-mono text-xs text-lime-400 uppercase tracking-widest">Available</span>
                </div>
                <span className="font-mono text-xs text-zinc-700 tabular-nums">{clock}</span>
              </div>

              <div className="space-y-2.5">
                {[
                  { ic: MapPin,  t: "Hyderabad, IN"             },
                  { ic: Globe,   t: "Remote / Hybrid / On-site" },
                  { ic: Coffee,  t: "Immediate start possible"  },
                  { ic: Clock,   t: "Replies within 24h"        },
                ].map(({ ic: Ic, t }) => (
                  <div key={t} className="flex items-center gap-2.5">
                    <Ic size={12} className="text-zinc-700 shrink-0" />
                    <span className="font-mono text-xs text-zinc-500">{t}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Primary CTA */}
            <div className="flex flex-col gap-2">
              <a href="mailto:codeml862@gmail.com"
                className="group flex items-center justify-center gap-2 h-11 bg-lime-400 hover:bg-lime-300 text-black text-sm font-bold rounded-xl transition-all duration-200 hover:-translate-y-px hover:shadow-xl hover:shadow-lime-400/25">
                <Mail size={14} />
                Email Me Now
                <ArrowUpRight size={13} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <Link href="/hireme"
                className="group flex items-center justify-center gap-2 h-11 border border-zinc-800 hover:border-lime-500/30 hover:bg-lime-500/5 text-zinc-400 hover:text-white text-sm font-medium rounded-xl transition-all duration-200">
                <Zap size={13} className="text-zinc-600 group-hover:text-lime-400 transition-colors" />
                Why Hire Me
                <ChevronRight size={12} className="text-zinc-700 group-hover:text-lime-400 transition-colors" />
              </Link>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            ROW 2 — 4 contact method cards
        ══════════════════════════════════════════ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CONTACT_METHODS.map(({ id, icon: Ic, label, value, subtext, href, accent, border, bg, hoverBorder, copyable }) => (
            <div key={id} className={`group bg-zinc-950 border border-zinc-800 ${hoverBorder} rounded-2xl p-6 flex flex-col gap-4 transition-all duration-200 hover:-translate-y-1`}>
              {/* Icon */}
              <div className={`w-10 h-10 rounded-xl ${bg} border ${border} flex items-center justify-center`}>
                <Ic size={16} className={accent} />
              </div>

              {/* Label + value */}
              <div className="flex-1">
                <p className="font-mono text-xs text-zinc-600 uppercase tracking-widest mb-1">{label}</p>
                <p className={`font-bold text-sm text-white leading-tight mb-1.5`}>{value}</p>
                <p className="font-mono text-xs text-zinc-600 leading-5">{subtext}</p>
              </div>

              {/* Actions */}
              <div className="flex gap-2 mt-auto">
                <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
                  className={`group/btn flex-1 flex items-center justify-center gap-1.5 h-9 ${bg} border ${border} ${accent} rounded-xl text-xs font-bold transition-all duration-200 hover:opacity-80`}>
                  {href.startsWith("http") ? <ExternalLink size={11} /> : <ArrowUpRight size={11} />}
                  Open
                </a>
                {copyable && (
                  <button
                    onClick={() => copy(value, id)}
                    className="w-9 h-9 bg-zinc-900 border border-zinc-800 hover:border-zinc-600 rounded-xl flex items-center justify-center text-zinc-500 hover:text-white transition-all duration-200"
                    title="Copy">
                    {copied === id
                      ? <CheckCircle size={12} className="text-lime-400" />
                      : <Copy size={12} />
                    }
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* ══════════════════════════════════════════
            ROW 3 — Terminal + Availability + Socials
        ══════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* Terminal card */}
          <div className="lg:col-span-1 bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden">
            {/* Chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-900 bg-zinc-900/30">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
              <div className="flex-1 flex items-center justify-center gap-2">
                <Terminal size={10} className="text-zinc-600" />
                <span className="font-mono text-xs text-zinc-600">rajaram — contact</span>
              </div>
            </div>
            {/* Lines */}
            <div className="p-5 space-y-3 min-h-[220px]">
              {TERMINAL_LINES.map((line, i) => (
                <div key={i}
                  className={`flex gap-2 font-mono text-xs transition-all duration-300 ${
                    visibleLines.includes(i) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
                  }`}>
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

          {/* Availability */}
          <div className="lg:col-span-1 bg-zinc-950 border border-zinc-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="h-px w-5 bg-lime-400" />
                <span className="font-mono text-xs text-zinc-600 uppercase tracking-widest">Open To</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-50" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-lime-400" />
                </span>
                <span className="font-mono text-xs text-lime-400">Active</span>
              </div>
            </div>
            <div className="space-y-2">
              {AVAILABILITY.map(({ label, dot }) => (
                <div key={label}
                  className="group flex items-center gap-3 bg-zinc-900 border border-zinc-800 hover:border-lime-500/25 hover:bg-lime-500/5 rounded-xl px-4 py-2.5 transition-all duration-200 cursor-default">
                  <div className={`w-1.5 h-1.5 rounded-full ${dot} shrink-0`} />
                  <span className="text-zinc-400 group-hover:text-zinc-200 text-xs font-medium transition-colors">{label}</span>
                  <CheckCircle size={10} className="text-lime-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </div>

          {/* Social links */}
          <div className="lg:col-span-1 bg-zinc-950 border border-zinc-800 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-5 bg-lime-400" />
              <span className="font-mono text-xs text-zinc-600 uppercase tracking-widest">Social Links</span>
            </div>
            <div className="flex flex-col gap-3">
              {SOCIALS.map(({ icon: Ic, href, label, sub }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer"
                  className="group flex items-center gap-3 bg-zinc-900 border border-zinc-800 hover:border-zinc-600 hover:bg-zinc-800/80 rounded-xl px-4 py-3 transition-all duration-200 hover:-translate-y-px">
                  <div className="w-8 h-8 rounded-lg bg-zinc-800 group-hover:bg-zinc-700 flex items-center justify-center shrink-0 transition-colors">
                    <Ic size={15} className="text-zinc-500 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-zinc-300 group-hover:text-white text-sm transition-colors">{label}</p>
                    <p className="font-mono text-xs text-zinc-600">{sub}</p>
                  </div>
                  <ArrowUpRight size={12} className="text-zinc-700 group-hover:text-lime-400 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            ROW 4 — Full-width CTA split banner
        ══════════════════════════════════════════ */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* Left — message */}
            <div className="p-8 md:p-12 flex flex-col justify-between gap-8 border-b lg:border-b-0 lg:border-r border-zinc-900">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-px w-8 bg-lime-400" />
                  <span className="font-mono text-xs text-zinc-600 uppercase tracking-widest">Start a Conversation</span>
                </div>
                <h3 className="font-black tracking-tighter leading-tight text-white text-3xl sm:text-4xl mb-4">
                  Have a project<br />
                  <span className="text-lime-400">in mind?</span>
                </h3>
                <p className="text-zinc-500 text-sm leading-7 max-w-sm">
                  Whether it's an ML system, a full-stack product, or a tough engineering
                  problem — I'm ready to dig in. Let's talk through it.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <a href="mailto:codeml862@gmail.com"
                  className="group flex items-center gap-2 bg-lime-400 hover:bg-lime-300 text-black font-bold text-sm px-6 py-3 rounded-xl transition-all duration-200 hover:-translate-y-px hover:shadow-xl hover:shadow-lime-400/25">
                  <Mail size={14} />
                  Send an Email
                  <ArrowUpRight size={13} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <a href="https://wa.me/917093221536" target="_blank" rel="noreferrer"
                  className="group flex items-center gap-2 border border-zinc-800 hover:border-zinc-600 text-zinc-300 hover:text-white text-sm font-medium px-6 py-3 rounded-xl transition-all duration-200 hover:bg-zinc-900">
                  <MessageCircle size={14} className="text-zinc-600 group-hover:text-emerald-400 transition-colors" />
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Right — quick facts */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <span className="font-mono text-xs text-zinc-600 uppercase tracking-widest mb-6">What to expect</span>
              <div className="space-y-3">
                {[
                  "Reply within 24 hours — always",
                  "Clear communication from day one",
                  "I ask the right questions upfront",
                  "Honest about timelines and trade-offs",
                  "You'll see work before the deadline",
                  "No ghost, no ghost revisions",
                  "Available across time zones",
                  "Code you can read, extend & maintain",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 group">
                    <div className="w-5 h-5 rounded-md bg-lime-400/10 border border-lime-500/25 flex items-center justify-center shrink-0 transition-colors group-hover:bg-lime-400/20">
                      <CheckCircle size={11} className="text-lime-400" />
                    </div>
                    <span className="text-zinc-500 group-hover:text-zinc-200 text-sm transition-colors">{item}</span>
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