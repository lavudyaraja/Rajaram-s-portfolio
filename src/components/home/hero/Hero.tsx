import { useState, useEffect, useRef } from "react";
import {
  ArrowUpRight, Download, Github, Linkedin,
  Twitter, Mail, ChevronDown, Code2,
  Layers, GitCommit, Star, Terminal, Zap
} from "lucide-react";

const ROLES = [
  "Full Stack Developer",
  "Machine Learning Eng.",
  "Deep Learning Specialist",
  "Software Engineer",
];

const COMMANDS = [
  { cmd: "train --arch vit-efficientnet --epochs 50", out: "✓  Acc 98.0% · saved to /models" },
  { cmd: "rag_pipeline --query 'vector search'",       out: "✓  5 chunks · latency 42ms"       },
  { cmd: "uvicorn app:main --reload",                  out: "✓  FastAPI → http://localhost:8000"  },
  { cmd: "pytest --cov=./src tests/",                  out: "✓  47 passed · coverage 94.2%"      },
  { cmd: "vercel --prod",                              out: "✓  Deployed to production 🚀"        },
];

const SKILLS = [
  { name: "PyTorch",         color: "bg-orange-500/10 text-orange-400 border border-orange-500/20" },
  { name: "TensorFlow",      color: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20" },
  { name: "Computer Vision", color: "bg-purple-500/10 text-purple-400 border border-purple-500/20" },
  { name: "LLMs / RAG",      color: "bg-lime-500/10   text-lime-400   border border-lime-500/20"   },
  { name: "FastAPI",         color: "bg-green-500/10  text-green-400  border border-green-500/20"  },
  { name: "React / Next.js", color: "bg-sky-500/10    text-sky-400    border border-sky-500/20"    },
  { name: "Python",          color: "bg-blue-500/10   text-blue-300   border border-blue-500/20"   },
  { name: "TypeScript",      color: "bg-indigo-500/10 text-indigo-300 border border-indigo-500/20" },
  { name: "Docker",          color: "bg-cyan-500/10   text-cyan-400   border border-cyan-500/20"   },
  { name: "PostgreSQL",      color: "bg-pink-500/10   text-pink-400   border border-pink-500/20"   },
];

const SOCIALS = [
  { Icon: Github,   href: "https://github.com/lavudyaraja",               label: "GitHub"   },
  { Icon: Linkedin, href: "https://www.linkedin.com/in/lavudyaraja5228/", label: "LinkedIn" },
  { Icon: Twitter,  href: "https://x.com/LavudyaRaj22988",               label: "Twitter"  },
  { Icon: Mail,     href: "mailto:codeml862@gmail.com",                   label: "Email"    },
];

const STATS = [
  { Icon: Layers,    value: "15+",  label: "Projects"    },
  { Icon: GitCommit, value: "200+", label: "Commits"     },
  { Icon: Star,      value: "98%",  label: "Satisfaction" },
];

export default function ModernHero() {
  const [visible, setVisible] = useState(false);
  const [roleIdx, setRoleIdx] = useState(0);
  const [typed,   setTyped]   = useState("");
  const [charIdx, setCharIdx] = useState(0);
  const [cmdIdx,  setCmdIdx]  = useState(0);
  const [cmdShow, setCmdShow] = useState(true);
  const [clock,   setClock]   = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number | null>(null);

  // Staggered mount
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Live clock
  useEffect(() => {
    const tick = () =>
      setClock(new Date().toLocaleTimeString("en-US", { hour12: false }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Typing
  const role = ROLES[roleIdx];
  useEffect(() => {
    if (charIdx < role.length) {
      const t = setTimeout(() => {
        setTyped(p => p + role[charIdx]);
        setCharIdx(p => p + 1);
      }, 65 + Math.random() * 35);
      return () => clearTimeout(t);
    }
  }, [charIdx, role]);
  useEffect(() => {
    const t = setTimeout(() => {
      setTyped(""); setCharIdx(0);
      setRoleIdx(p => (p + 1) % ROLES.length);
    }, 3600);
    return () => clearTimeout(t);
  }, [roleIdx]);

  // Terminal cycle
  useEffect(() => {
    const id = setInterval(() => {
      setCmdShow(false);
      setTimeout(() => { setCmdIdx(p => (p + 1) % COMMANDS.length); setCmdShow(true); }, 420);
    }, 3200);
    return () => clearInterval(id);
  }, []);

  // Animated dot-grid background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    let t = 0;
    const draw = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.004;
      const gap = 44;
      for (let x = 0; x <= canvas.width + gap; x += gap) {
        for (let y = 0; y <= canvas.height + gap; y += gap) {
          const wave = Math.sin(t + x * 0.045 + y * 0.038) * 0.5 + 0.5;
          ctx.beginPath();
          ctx.arc(x, y, 1.1, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(163,230,53,${0.025 + wave * 0.055})`;
          ctx.fill();
        }
      }
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      window.removeEventListener("resize", resize);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = "/Rajaram-resume.pdf";
    a.download = "Lavudya_Rajaram_Resume.pdf";
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
  };
  const handleProjects = () =>
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });

  // Reveal helper — staggered via Tailwind transition + delay classes
  const r = (delay = "") =>
    `transition-all duration-700 ${delay} ${
      visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
    }`;

  return (
    <section className="relative bg-black overflow-hidden flex flex-col">

      {/* ── Background canvas ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* ── Glow blobs ── */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-lime-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-sky-500/4 rounded-full blur-3xl pointer-events-none" />

      {/* ════════ TOP BAR ════════ */}
      <div className="relative z-10 border-b border-zinc-900 px-6 md:px-14 py-4 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <span className="font-mono text-sm font-black text-white tracking-widest">LR</span>
          <div className="hidden md:flex items-center gap-2 text-zinc-800">
            <div className="h-3 w-px bg-zinc-800" />
            <span className="font-mono text-xs text-zinc-700 tracking-wider">PORTFOLIO · 2025</span>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <span className="hidden md:block font-mono text-xs text-zinc-700 tabular-nums">{clock}</span>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-lime-400" />
            </span>
            <span className="font-mono text-xs text-lime-400 tracking-widest uppercase">Open to Work</span>
          </div>
        </div>
      </div>

      {/* ════════ MAIN GRID ════════ */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="w-full max-w-screen-xl mx-auto px-6 md:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-0 items-center py-0 lg:py-0 ">

            {/* ─── LEFT ─── */}
            <div className="flex flex-col justify-center gap-8 lg:pr-16 lg:border-r lg:border-zinc-900">

              {/* Section index */}
              <div className={`flex items-center gap-3 ${r("delay-100")}`}>
                <div className="h-px w-8 bg-lime-400" />
                <span className="font-mono text-xs text-zinc-600 tracking-widest uppercase">
                  01 — Introduction
                </span>
              </div>

              {/* HUGE display name */}
              <div className={r("delay-150")}>
                <h1 className="font-black leading-none tracking-tighter text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[104px]">
                  Rajaram
                </h1>
                <h1 className="font-black leading-none tracking-tighter text-lime-400 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[104px]">
                  Lavudya.
                </h1>
              </div>

              {/* Typed role */}
              <div className={`flex items-center gap-3 ${r("delay-200")}`}>
                <div className="w-2 h-2 rounded-full bg-lime-400 shrink-0 animate-pulse" />
                <span className="font-mono text-sm text-zinc-300">
                  {typed}
                  <span className="inline-block w-0.5 h-4 bg-lime-400 ml-0.5 align-middle animate-pulse" />
                </span>
              </div>

              {/* Bio */}
              <p className={`text-zinc-500 text-sm leading-7 max-w-md pl-5 border-l-2 border-zinc-800 ${r("delay-300")}`}>
                I design systems that{" "}
                <span className="text-zinc-200 font-medium">learn, scale, and ship</span> —
                bridging machine intelligence with real-world products.
                From CNN architectures to production APIs, every line serves a purpose.
              </p>

              {/* CTA */}
              <div className={`flex flex-col sm:flex-row gap-3 ${r("delay-300")}`}>
                <button
                  onClick={handleProjects}
                  className="group flex items-center justify-center gap-2 bg-lime-400 hover:bg-lime-300 text-black font-bold text-sm px-6 py-3 rounded-xl transition-all duration-200 hover:-translate-y-px hover:shadow-xl hover:shadow-lime-400/20 w-full sm:w-auto"
                >
                  View Projects
                  <ArrowUpRight
                    size={15}
                    className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </button>
                <button
                  onClick={handleDownload}
                  className="group flex items-center justify-center gap-2 border border-zinc-800 hover:border-zinc-600 text-zinc-300 hover:text-white text-sm font-medium px-6 py-3 rounded-xl transition-all duration-200 hover:-translate-y-px hover:bg-zinc-900/60 w-full sm:w-auto"
                >
                  <Download
                    size={14}
                    className="text-zinc-600 group-hover:text-zinc-300 transition-colors"
                  />
                  Resume
                </button>
              </div>

              {/* Socials */}
              <div className={`flex items-center gap-2 ${r("delay-500")}`}>
                <span className="font-mono text-xs text-zinc-700 uppercase tracking-widest mr-2 hidden sm:block">
                  Connect
                </span>
                {SOCIALS.map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    title={label}
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-zinc-950 border border-zinc-800 hover:border-zinc-600 hover:bg-zinc-800/80 flex items-center justify-center text-zinc-500 hover:text-white transition-all duration-200 hover:-translate-y-px"
                  >
                    <Icon size={13} />
                  </a>
                ))}
              </div>
            </div>

            {/* ─── RIGHT ─── */}
            <div className="flex flex-col gap-4 lg:pl-16">

              {/* Stats */}
              <div className={`grid grid-cols-3 gap-2 sm:gap-3 ${r("delay-200")}`}>
                {STATS.map(({ Icon, value, label }) => (
                  <div
                    key={label}
                    className="group bg-zinc-950 border border-zinc-800 hover:border-zinc-700 rounded-xl sm:rounded-2xl p-3 sm:p-5 flex flex-col gap-2 transition-all duration-200 hover:-translate-y-1 cursor-default"
                  >
                    <Icon
                      size={12}
                      className="text-zinc-700 group-hover:text-lime-400 transition-colors duration-200"
                    />
                    <span className="text-lg sm:text-2xl font-black text-white group-hover:text-lime-400 transition-colors duration-200 leading-none">
                      {value}
                    </span>
                    <span className="font-mono text-xs text-zinc-600 leading-tight">{label}</span>
                  </div>
                ))}
              </div>

              {/* Terminal */}
              <div className={`bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden ${r("delay-300")}`}>
                {/* Chrome bar */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-900/80 bg-zinc-900/30">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                  <div className="flex-1 flex items-center justify-center gap-2">
                    <Terminal size={11} className="text-zinc-600" />
                    <span className="font-mono text-xs text-zinc-600">rajaram@ml-lab — zsh</span>
                  </div>
                  {/* Progress pips */}
                  <div className="flex gap-1">
                    {COMMANDS.map((_, i) => (
                      <div
                        key={i}
                        className={`w-1 h-1 rounded-full transition-all duration-300 ${
                          i === cmdIdx ? "bg-lime-400" : "bg-zinc-800"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                {/* Output */}
                <div
                  className={`px-5 py-5 min-h-[76px] transition-all duration-300 ${
                    cmdShow ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
                  }`}
                >
                  <div className="font-mono text-xs flex items-start gap-2 mb-3">
                    <span className="text-lime-400 shrink-0">$</span>
                    <span className="text-zinc-200 break-all">{COMMANDS[cmdIdx].cmd}</span>
                  </div>
                  <div className="font-mono text-xs text-emerald-400 pl-4 border-l border-emerald-500/20">
                    {COMMANDS[cmdIdx].out}
                  </div>
                </div>
              </div>

              {/* Skill tag cloud */}
              <div className={`bg-zinc-950 border border-zinc-800 rounded-2xl p-4 sm:p-5 ${r("delay-500")}`}>
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <span className="font-mono text-xs text-zinc-600 uppercase tracking-widest">
                    Tech Stack
                  </span>
                  <Code2 size={12} className="text-lime-400" />
                </div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {SKILLS.map(({ name, color }) => (
                    <span
                      key={name}
                      className={`${color} font-mono text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg cursor-default hover:opacity-70 transition-opacity duration-200`}
                    >
                      {name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer meta */}
              <div className={`flex flex-col sm:flex-row items-center justify-between gap-2 px-1 ${r("delay-500")}`}>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse" />
                  <span className="font-mono text-xs text-zinc-700">Hyderabad, IN</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap size={10} className="text-zinc-800" />
                  <span className="font-mono text-xs text-zinc-700 text-center sm:text-left">ML · CV · Full-Stack</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* ════════ SCROLL HINT ════════ */}
      <div
        className="relative z-10 flex flex-col items-center gap-1.5 pb-7 cursor-pointer opacity-30 hover:opacity-70 transition-opacity duration-300"
        onClick={handleProjects}
      >
        <span className="font-mono text-xs text-zinc-500 tracking-widest uppercase">Scroll</span>
        <ChevronDown size={13} className="text-zinc-500 animate-bounce" />
      </div>
    </section>
  );
}