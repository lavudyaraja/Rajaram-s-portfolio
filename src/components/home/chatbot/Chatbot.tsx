"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  MessageCircle, Send, X, Bot, User, Trash2,
  RefreshCw, MoreVertical, TrendingUp, Calendar,
  Github, Mail, FileText, ArrowUpRight, Zap,
  Minimize2, Maximize2, Globe, Shield, Clock,
  ChevronRight, Phone, BookOpen, Code2, Star,
  AlertCircle, CheckCircle2, ExternalLink, Copy
} from "lucide-react";
import {
  chatbotService,
  createUserMessage,
  createAssistantMessage
} from "@/lib/chatbot";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
  timestamp?: number;
  id?: string;
  type?: "normal" | "error" | "meeting" | "navigation";
}

interface ChatbotProps {
  isOpen?: boolean;
  onToggle?: () => void;
}

// ─── Quick action grid ────────────────────────────────────────────────────────

const QUICK_ACTIONS = [
  {
    label: "Schedule a Call",
    icon: Calendar,
    accent: "text-lime-400",
    prompt: "I'd like to schedule a meeting with Rajaram.",
  },
  {
    label: "View Projects",
    icon: Code2,
    accent: "text-sky-400",
    prompt: "Tell me about Rajaram's best projects and what he has built.",
  },
  {
    label: "Skills & Stack",
    icon: Zap,
    accent: "text-violet-400",
    prompt: "What are Rajaram's technical skills and tech stack?",
  },
  {
    label: "Download Resume",
    icon: FileText,
    accent: "text-orange-400",
    prompt: "How can I download Rajaram's resume?",
  },
  {
    label: "Hire Rajaram",
    icon: Star,
    accent: "text-emerald-400",
    prompt: "I'm interested in hiring Rajaram. What's the best way to get in touch?",
  },
  {
    label: "Site Navigation",
    icon: Globe,
    accent: "text-pink-400",
    prompt: "Can you guide me through this portfolio website?",
  },
];

// ─── Meeting time slots ───────────────────────────────────────────────────────

const MEETING_SLOTS = [
  "Mon–Fri, 9 AM–12 PM IST",
  "Mon–Fri, 2 PM–5 PM IST",
  "Sat, 10 AM–1 PM IST",
];

// ─── URL renderer ─────────────────────────────────────────────────────────────

function renderWithLinks(text: string) {
  const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+)/g;
  return text.split(urlRegex).map((part, i) => {
    if (part.match(urlRegex)) {
      const href = part.startsWith("http") ? part : `https://${part}`;
      return (
        <a
          key={i}
          href={href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-0.5 text-lime-400 underline underline-offset-2 hover:text-lime-300 transition-colors"
        >
          {part}
          <ExternalLink size={10} className="shrink-0" />
        </a>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

// ─── Copy button ──────────────────────────────────────────────────────────────

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-md hover:bg-zinc-800"
      title="Copy"
    >
      {copied
        ? <CheckCircle2 size={11} className="text-lime-400" />
        : <Copy size={11} className="text-zinc-600" />
      }
    </button>
  );
}

// ─── Meeting Panel ────────────────────────────────────────────────────────────

function MeetingPanel({ onClose }: { onClose: () => void }) {
  const [step,     setStep]    = useState<"choose" | "details" | "sending" | "done" | "error">("choose");
  const [slot,     setSlot]    = useState<string | null>(null);
  const [name,     setName]    = useState("");
  const [email,    setEmail]   = useState("");
  const [title,    setTitle]   = useState("");
  const [message,  setMessage] = useState("");
  const [bookingId,setBookId]  = useState("");
  const [errMsg,   setErrMsg]  = useState("");

  const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const handleConfirm = async () => {
    if (!name.trim() || !email.trim() || !title.trim() || !slot) return;
    if (!isValidEmail(email)) { setErrMsg("Please enter a valid email address."); return; }
    setErrMsg("");
    setStep("sending");

    try {
      const res = await fetch("/api/meeting", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), title: title.trim(), slot, message: message.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Request failed");
      setBookId(data.id || "");
      setStep("done");
    } catch (e: any) {
      setErrMsg(e.message || "Something went wrong. Please try again.");
      setStep("error");
    }
  };

  // ── Success screen ────────────────────────────────────────────────────────
  if (step === "done") {
    return (
      <div className="flex flex-col items-center gap-4 py-8 px-6 text-center">
        <div className="w-12 h-12 bg-lime-400/10 border border-lime-500/20 rounded-2xl flex items-center justify-center">
          <CheckCircle2 size={22} className="text-lime-400" />
        </div>
        <div>
          <p className="font-bold text-white text-sm">Meeting request sent!</p>
          <p className="font-mono text-xs text-zinc-500 mt-1.5 leading-6">
            Confirmation emails sent to <span className="text-lime-400">{email}</span>
            <br />and to Rajaram. He'll confirm within 24 hrs.
          </p>
        </div>
        {bookingId && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2 w-full">
            <p className="font-mono text-xs text-zinc-600">Booking ID</p>
            <p className="font-mono text-xs text-zinc-300 mt-0.5">{bookingId}</p>
          </div>
        )}
        <div className="flex gap-2 w-full">
          <a href="https://calendly.com/raja" target="_blank" rel="noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200 font-mono text-xs transition-all duration-200">
            Calendly <ExternalLink size={10} />
          </a>
          <button onClick={onClose}
            className="flex-1 py-2.5 rounded-xl bg-lime-400 hover:bg-lime-300 text-black font-bold text-xs transition-all duration-200">
            Close
          </button>
        </div>
      </div>
    );
  }

  // ── Error screen ──────────────────────────────────────────────────────────
  if (step === "error") {
    return (
      <div className="flex flex-col items-center gap-4 py-8 px-6 text-center">
        <div className="w-12 h-12 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center">
          <AlertCircle size={22} className="text-red-400" />
        </div>
        <div>
          <p className="font-bold text-white text-sm">Something went wrong</p>
          <p className="font-mono text-xs text-zinc-500 mt-1.5 leading-6">{errMsg}</p>
        </div>
        <div className="flex gap-2 w-full">
          <button onClick={() => setStep("details")}
            className="flex-1 py-2.5 rounded-xl border border-zinc-800 hover:border-zinc-700 text-zinc-400 font-mono text-xs transition-all duration-200">
            Try again
          </button>
          <a href="mailto:codeml862@gmail.com"
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-lime-400 hover:bg-lime-300 text-black font-bold text-xs transition-all duration-200">
            Email directly
          </a>
        </div>
      </div>
    );
  }

  // ── Sending spinner ────────────────────────────────────────────────────────
  if (step === "sending") {
    return (
      <div className="flex flex-col items-center gap-4 py-10 px-6 text-center">
        <div className="w-12 h-12 bg-lime-400/10 border border-lime-500/20 rounded-2xl flex items-center justify-center">
          <RefreshCw size={20} className="text-lime-400 animate-spin" />
        </div>
        <p className="font-mono text-xs text-zinc-400">Sending your request…</p>
        <p className="font-mono text-xs text-zinc-600">Emails going to you and Rajaram</p>
      </div>
    );
  }

  return (
    <div className="p-5 space-y-4">
      {/* Panel header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-px w-4 bg-lime-400" />
          <span className="font-mono text-xs text-zinc-600 uppercase tracking-widest">
            {step === "choose" ? "Step 1 — Pick a Slot" : "Step 2 — Your Details"}
          </span>
        </div>
        <button onClick={onClose}
          className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-600 hover:text-zinc-300 transition-colors">
          <X size={13} />
        </button>
      </div>

      {/* ── Step 1: Slot picker ── */}
      {step === "choose" && (
        <>
          <p className="font-mono text-xs text-zinc-500">
            Available slots (IST timezone):
          </p>
          <div className="space-y-2">
            {MEETING_SLOTS.map((s) => (
              <button key={s} onClick={() => setSlot(s)}
                className={`w-full text-left px-4 py-3 rounded-xl border font-mono text-xs transition-all duration-200 flex items-center justify-between ${
                  slot === s
                    ? "bg-lime-400/10 border-lime-500/30 text-lime-400"
                    : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                }`}>
                <span><Clock size={11} className="inline mr-2 opacity-50" />{s}</span>
                {slot === s && <CheckCircle2 size={13} />}
              </button>
            ))}
          </div>
          <button
            onClick={() => slot && setStep("details")}
            disabled={!slot}
            className="w-full py-2.5 rounded-xl bg-lime-400 hover:bg-lime-300 disabled:bg-zinc-800 disabled:text-zinc-600 text-black font-bold text-xs transition-all duration-200 flex items-center justify-center gap-2">
            Continue <ChevronRight size={13} />
          </button>
          <a href="https://calendly.com/raja" target="_blank" rel="noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-zinc-800 hover:border-zinc-700 text-zinc-500 hover:text-zinc-200 font-mono text-xs transition-all duration-200">
            Or book on Calendly <ExternalLink size={11} />
          </a>
        </>
      )}

      {/* ── Step 2: Details form ── */}
      {step === "details" && (
        <>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 flex items-center gap-2">
            <Clock size={11} className="text-lime-400 shrink-0" />
            <span className="font-mono text-xs text-zinc-400">{slot}</span>
          </div>

          <div className="space-y-3">
            {[
              { label: "Full Name *",      val: name,    set: setName,    ph: "e.g. Priya Sharma",             type: "text"  },
              { label: "Your Email *",     val: email,   set: setEmail,   ph: "you@company.com",               type: "email" },
              { label: "Meeting Title *",  val: title,   set: setTitle,   ph: "e.g. Discussing ML role",       type: "text"  },
            ].map(({ label, val, set, ph, type }) => (
              <div key={label}>
                <label className="font-mono text-xs text-zinc-600 block mb-1.5">{label}</label>
                <input
                  type={type}
                  value={val}
                  onChange={(e) => set(e.target.value)}
                  placeholder={ph}
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-lime-500/50 rounded-xl px-3 py-2.5 font-mono text-xs text-zinc-200 placeholder-zinc-700 focus:outline-none transition-colors"
                />
              </div>
            ))}

            <div>
              <label className="font-mono text-xs text-zinc-600 block mb-1.5">
                Message <span className="text-zinc-700">(optional)</span>
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Anything you'd like Rajaram to know beforehand…"
                rows={2}
                className="w-full bg-zinc-900 border border-zinc-800 focus:border-lime-500/50 rounded-xl px-3 py-2.5 font-mono text-xs text-zinc-200 placeholder-zinc-700 focus:outline-none resize-none transition-colors"
              />
            </div>
          </div>

          {errMsg && (
            <div className="flex items-center gap-2 bg-red-500/8 border border-red-500/20 rounded-xl px-3 py-2.5">
              <AlertCircle size={11} className="text-red-400 shrink-0" />
              <p className="font-mono text-xs text-red-400">{errMsg}</p>
            </div>
          )}

          <p className="font-mono text-xs text-zinc-600 leading-5">
            Confirmation emails will be sent to your inbox and to Rajaram.
          </p>

          <div className="flex gap-2">
            <button onClick={() => setStep("choose")}
              className="flex-1 py-2.5 rounded-xl border border-zinc-800 hover:border-zinc-700 text-zinc-500 hover:text-zinc-200 font-mono text-xs transition-all duration-200">
              ← Back
            </button>
            <button
              onClick={handleConfirm}
              disabled={!name.trim() || !email.trim() || !title.trim()}
              className="flex-1 py-2.5 rounded-xl bg-lime-400 hover:bg-lime-300 disabled:bg-zinc-800 disabled:text-zinc-600 text-black font-bold text-xs transition-all duration-200 flex items-center justify-center gap-2">
              <Mail size={12} /> Send Request
            </button>
          </div>
        </>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Chatbot({ isOpen: controlled, onToggle }: ChatbotProps) {
  const [open,         setOpen]        = useState(controlled || false);
  const [expanded,     setExpanded]    = useState(false);
  const [showMenu,     setShowMenu]    = useState(false);
  const [showAnalytics,setAnalytics]   = useState(false);
  const [showMeeting,  setMeeting]     = useState(false);
  const [input,        setInput]       = useState("");
  const [loading,      setLoading]     = useState(false);
  const [typing,       setTyping]      = useState(false);
  const [showQuick,    setShowQuick]   = useState(true);
  const [unread,       setUnread]      = useState(0);
  const [pulse,        setPulse]       = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    createAssistantMessage(
      "Hi! I'm Rajaram's AI assistant — available 24/7 to help you explore this portfolio.\n\nI can help you with Rajaram's projects, skills, certifications, experience, or scheduling a meeting. What would you like to know?"
    ),
  ]);

  const bottomRef    = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textareaRef  = useRef<HTMLTextAreaElement>(null);
  const menuRef      = useRef<HTMLDivElement>(null);
  const abortRef     = useRef<AbortController | null>(null);

  // ── Pulse the FAB every 30s to attract attention
  useEffect(() => {
    if (open) return;
    const t = setInterval(() => {
      setPulse(true);
      setTimeout(() => setPulse(false), 1000);
    }, 30000);
    return () => clearInterval(t);
  }, [open]);

  // ── Sync controlled state
  useEffect(() => {
    if (controlled !== undefined) setOpen(controlled);
  }, [controlled]);

  // ── Scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  // ── Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 100) + "px";
    }
  }, [input]);

  // ── Close menu on outside click
  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node))
        setShowMenu(false);
    };
    if (showMenu) document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, [showMenu]);

  // ── Track unread when closed
  useEffect(() => {
    if (!open) {
      const last = messages[messages.length - 1];
      if (last?.role === "assistant" && messages.length > 1) {
        setUnread((p) => p + 1);
      }
    } else {
      setUnread(0);
    }
  }, [messages]);

  const toggle = useCallback(() => {
    setOpen((p) => !p);
    setUnread(0);
    onToggle?.();
  }, [onToggle]);

  // ── Send message
  const handleSend = async (text?: string) => {
    const msg = (text || input).trim();
    if (!msg || loading) return;

    // Check for meeting intent
    const meetingIntent = /\b(schedule|book|meeting|call|calendly|appointment|talk|chat live)\b/i.test(msg);
    if (meetingIntent && !showMeeting) {
      setMeeting(true);
      const userMsg = createUserMessage(msg);
      setMessages((p) => [
        ...p,
        userMsg,
        createAssistantMessage(
          "Sure! I've opened the meeting scheduler for you. Pick a time slot that works and fill in your details — Rajaram will confirm within 24 hours."
        ),
      ]);
      setInput("");
      setShowQuick(false);
      return;
    }

    const userMsg = createUserMessage(msg);
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setLoading(true);
    setTyping(true);
    setShowQuick(false);
    if (textareaRef.current) textareaRef.current.style.height = "44px";

    abortRef.current = new AbortController();

    try {
      let reply = "";

      await chatbotService.sendMessageStream(
        updated,
        (chunk) => {
          reply += chunk;
          setTyping(false);
          setMessages((prev) => {
            const msgs = [...prev];
            const last = msgs[msgs.length - 1];
            if (last?.role === "assistant") {
              msgs[msgs.length - 1] = { ...last, content: reply };
            } else {
              msgs.push(createAssistantMessage(reply));
            }
            return msgs;
          });
        },
        {
          onComplete: (full) => {
            const id = chatbotService.getCurrentConversationId();
            if (id)
              chatbotService.saveConversation(id, [
                ...updated,
                createAssistantMessage(full),
              ]);
          },
          signal: abortRef.current.signal,
          model: "fast",
        }
      );
    } catch {
      setMessages((p) => [
        ...p,
        createAssistantMessage(
          "Something went wrong on my end. Please try again or email codeml862@gmail.com directly."
        ),
      ]);
    } finally {
      setLoading(false);
      setTyping(false);
      abortRef.current = null;
    }
  };

  const clearChat = () => {
    setMessages([
      createAssistantMessage(
        "Chat cleared! I'm still here — ask me anything about Rajaram's work, skills, or how to get in touch."
      ),
    ]);
    setShowQuick(true);
    chatbotService.createNewConversation();
    setShowMenu(false);
  };

  const fmt = (ts?: number) =>
    new Date(ts || Date.now()).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

  const analytics = showAnalytics ? chatbotService.getAnalytics() : null;

  // Responsive sizing
  const W = expanded
    ? "sm:w-[540px] w-[calc(100vw-1.5rem)]"
    : "sm:w-[400px] w-[calc(100vw-1.5rem)]";
  const H = expanded ? "sm:h-[680px] h-[85vh]" : "sm:h-[560px] h-[75vh]";

  // ── Floating button ──────────────────────────────────────────────────────────
  if (!open) {
    return (
      <button
        onClick={toggle}
        aria-label="Open Rajaram's AI Assistant"
        className="fixed bottom-6 right-6 z-50"
      >
        <div className="relative">
          {pulse && (
            <span className="absolute inset-0 rounded-full bg-lime-400/40 animate-ping" />
          )}
          <div className="relative w-14 h-14 bg-lime-400 hover:bg-lime-300 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 shadow-xl shadow-lime-400/25">
            <MessageCircle size={22} className="text-black" />
          </div>
          {/* Unread */}
          {unread > 0 && (
            <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center border-2 border-black z-10">
              <span className="text-white text-xs font-black">{unread}</span>
            </div>
          )}
          {/* Online dot */}
          <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-black" />
        </div>
      </button>
    );
  }

  // ── Chat window ──────────────────────────────────────────────────────────────
  return (
    <div
      className={`fixed bottom-6 right-6 z-50 ${W} flex flex-col transition-all duration-300`}
      style={{ maxWidth: "calc(100vw - 1.5rem)" }}
    >
      <div
        className={`bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden flex flex-col shadow-2xl shadow-black/60 ${H} transition-all duration-300`}
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-zinc-900 bg-zinc-900/60 shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative shrink-0">
              <div className="w-9 h-9 bg-lime-400 rounded-xl flex items-center justify-center">
                <span className="font-black text-xs text-black">LR</span>
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-zinc-950" />
            </div>
            <div>
              <p className="font-bold text-white text-sm leading-none">
                Rajaram's Assistant
              </p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Shield size={9} className="text-lime-400" />
                <p className="font-mono text-xs text-lime-400">
                  Portfolio-only · 24/7
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {/* Schedule CTA */}
            <button
              onClick={() => setMeeting((p) => !p)}
              title="Schedule a meeting"
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-mono text-xs transition-all duration-200 ${
                showMeeting
                  ? "bg-lime-400/10 border-lime-500/30 text-lime-400"
                  : "border-zinc-800 text-zinc-500 hover:border-zinc-600 hover:text-zinc-200"
              }`}
            >
              <Calendar size={11} />
              <span>Meet</span>
            </button>

            <button
              onClick={() => setExpanded((p) => !p)}
              className="w-7 h-7 rounded-lg hover:bg-zinc-800 flex items-center justify-center text-zinc-500 hover:text-zinc-200 transition-colors"
            >
              {expanded ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
            </button>

            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setShowMenu((p) => !p)}
                className="w-7 h-7 rounded-lg hover:bg-zinc-800 flex items-center justify-center text-zinc-500 hover:text-zinc-200 transition-colors"
              >
                <MoreVertical size={13} />
              </button>
              {showMenu && (
                <div className="absolute right-0 top-9 w-48 bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden z-20 shadow-xl">
                  {[
                    {
                      label: showAnalytics ? "Hide Analytics" : "Analytics",
                      icon: TrendingUp,
                      fn: () => { setAnalytics((p) => !p); setShowMenu(false); },
                    },
                    {
                      label: "Schedule Meeting",
                      icon: Calendar,
                      fn: () => { setMeeting(true); setShowMenu(false); },
                    },
                    {
                      label: "Clear Chat",
                      icon: Trash2,
                      fn: clearChat,
                    },
                    {
                      label: "Email Rajaram",
                      icon: Mail,
                      fn: () => {
                        window.location.href = "mailto:codeml862@gmail.com";
                        setShowMenu(false);
                      },
                    },
                  ].map(({ label, icon: Ic, fn }) => (
                    <button
                      key={label}
                      onClick={fn}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 font-mono text-xs text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors text-left"
                    >
                      <Ic size={12} className="text-zinc-600" />
                      {label}
                    </button>
                  ))}
                  <div className="border-t border-zinc-800" />
                  <button
                    onClick={toggle}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 font-mono text-xs text-red-400 hover:bg-zinc-800 transition-colors"
                  >
                    <X size={12} /> Close
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={toggle}
              className="w-7 h-7 rounded-lg hover:bg-zinc-800 flex items-center justify-center text-zinc-500 hover:text-zinc-200 transition-colors"
            >
              <X size={13} />
            </button>
          </div>
        </div>

        {/* ── Meeting Panel (overlay) ── */}
        {showMeeting && (
          <div className="border-b border-zinc-900 bg-zinc-950 shrink-0 max-h-[40vh] overflow-y-auto scrollbar-hide">
            <MeetingPanel onClose={() => setMeeting(false)} />
          </div>
        )}

        {/* ── Analytics panel ── */}
        {showAnalytics && analytics && (
          <div className="border-b border-zinc-900 p-4 bg-zinc-900/30 shrink-0">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-4 bg-lime-400" />
              <span className="font-mono text-xs text-zinc-600 uppercase tracking-widest">
                Session Analytics
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { l: "Messages",  v: String(analytics.totalMessages),                c: "text-white"        },
                { l: "Cache",     v: analytics.cacheHitRate,                         c: "text-lime-400"     },
                { l: "Avg Speed", v: analytics.averageResponseTime.toFixed(0) + "ms",c: "text-sky-400"      },
              ].map(({ l, v, c }) => (
                <div
                  key={l}
                  className="bg-zinc-900 border border-zinc-800 rounded-xl p-2.5 text-center"
                >
                  <p className={`font-black text-sm ${c}`}>{v}</p>
                  <p className="font-mono text-xs text-zinc-700 mt-0.5">{l}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Messages ── */}
        <div
          ref={containerRef}
          className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0 scroll-smooth scrollbar-hide"
        >
          {messages.map((msg, i) => {
            const isUser = msg.role === "user";
            return (
              <div
                key={msg.id || i}
                className={`flex gap-2.5 ${isUser ? "justify-end" : "justify-start"}`}
              >
                {!isUser && (
                  <div className="w-7 h-7 bg-lime-400 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                    <Bot size={13} className="text-black" />
                  </div>
                )}
                <div className={`group flex flex-col gap-1 ${isUser ? "items-end" : "items-start"} max-w-[80%]`}>
                  <div
                    className={`relative px-4 py-2.5 rounded-2xl text-xs leading-6 whitespace-pre-wrap ${
                      isUser
                        ? "bg-lime-400 text-black font-medium rounded-br-sm"
                        : "bg-zinc-900 border border-zinc-800 text-zinc-200 rounded-bl-sm"
                    }`}
                  >
                    {renderWithLinks(msg.content)}
                    {!isUser && (
                      <div className="absolute -right-2 top-2">
                        <CopyButton text={msg.content} />
                      </div>
                    )}
                  </div>
                  <span className="font-mono text-xs text-zinc-700 px-1">
                    {fmt(msg.timestamp)}
                  </span>
                </div>
                {isUser && (
                  <div className="w-7 h-7 bg-zinc-900 border border-zinc-800 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                    <User size={13} className="text-zinc-400" />
                  </div>
                )}
              </div>
            );
          })}

          {/* Typing dots */}
          {typing && (
            <div className="flex gap-2.5 justify-start">
              <div className="w-7 h-7 bg-lime-400 rounded-lg flex items-center justify-center shrink-0">
                <Bot size={13} className="text-black" />
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl rounded-bl-sm px-4 py-3">
                <div className="flex gap-1.5 items-center h-4">
                  {[0, 0.2, 0.4].map((d, j) => (
                    <div
                      key={j}
                      className="w-1.5 h-1.5 bg-lime-400/60 rounded-full animate-bounce"
                      style={{ animationDelay: `${d}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Quick actions */}
          {showQuick && messages.length === 1 && (
            <div className="space-y-2 pt-1">
              <p className="font-mono text-xs text-zinc-600 px-1">
                Quick actions:
              </p>
              <div className="grid grid-cols-2 gap-1.5">
                {QUICK_ACTIONS.map(({ label, icon: Ic, accent, prompt }) => (
                  <button
                    key={label}
                    onClick={() => handleSend(prompt)}
                    className="group flex items-center gap-2 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/60 rounded-xl px-3 py-2.5 text-left transition-all duration-200"
                  >
                    <Ic size={11} className={`${accent} shrink-0`} />
                    <span className="font-mono text-xs text-zinc-500 group-hover:text-zinc-200 transition-colors leading-tight">
                      {label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* ── Input ── */}
        <div className="border-t border-zinc-900 p-4 bg-zinc-950 shrink-0">
          <div className="flex gap-2 items-end">
            <div className="flex-1 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 focus-within:border-lime-500/50 rounded-xl overflow-hidden transition-colors">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Ask about skills, projects, or schedule a call…"
                rows={1}
                disabled={loading}
                className="w-full bg-transparent px-4 py-3 font-mono text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none resize-none scrollbar-hide"
                style={{ minHeight: 44, maxHeight: 100 }}
              />
            </div>
            <button
              onClick={() => handleSend()}
              disabled={loading || !input.trim()}
              className="w-10 h-10 bg-lime-400 hover:bg-lime-300 disabled:bg-zinc-800 disabled:text-zinc-600 text-black rounded-xl flex items-center justify-center transition-all duration-200 hover:-translate-y-px hover:shadow-lg hover:shadow-lime-400/20 shrink-0"
            >
              {loading ? (
                <RefreshCw size={14} className="animate-spin text-zinc-500" />
              ) : (
                <Send size={14} />
              )}
            </button>
          </div>
          <p className="font-mono text-xs text-zinc-700 mt-2 text-center">
            ↵ send · ⇧↵ newline · portfolio questions only
          </p>
        </div>
      </div>
    </div>
  );
}