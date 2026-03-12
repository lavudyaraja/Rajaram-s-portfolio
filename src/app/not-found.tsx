"use client";

import React, { useEffect, useState } from "react";
import { 
  Home, Search, ArrowLeft, Ghost, 
  Terminal, Zap, Code, Cpu, 
  Sparkles, ArrowRight
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Animated glitch text component
const GlitchText = ({ text, className = "" }: { text: string; className?: string }) => {
  const [glitch, setGlitch] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 200);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <span className={`relative inline-block ${className}`}>
      {text}
      {glitch && (
        <>
          <span className="absolute inset-0 text-red-500 animate-pulse" style={{ clipPath: 'inset(20% 0 30% 0)' }}>
            {text}
          </span>
          <span className="absolute inset-0 text-blue-500 animate-pulse" style={{ clipPath: 'inset(60% 0 10% 0)' }}>
            {text}
          </span>
        </>
      )}
    </span>
  );
};

// Floating particles background
const Particles = () => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number }>>([]);
  
  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
    }));
    setParticles(newParticles);
  }, []);
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute bg-lime-400/20 rounded-full animate-pulse"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${Math.random() * 3 + 2}s`,
          }}
        />
      ))}
    </div>
  );
};

export default function NotFound() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  // Typing effect for terminal
  useEffect(() => {
    const timer = setTimeout(() => setIsTyping(true), 500);
    return () => clearTimeout(timer);
  }, []);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };
  
  const quickLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "#about", label: "About", icon: Ghost },
    { href: "#projects", label: "Projects", icon: Code },
    { href: "#skills", label: "Skills", icon: Cpu },
    { href: "#contact", label: "Contact", icon: Zap },
  ];
  
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background elements */}
      <Particles />
      
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-lime-500/5 via-transparent to-sky-500/5" />
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-lime-500/3 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-sky-500/2 rounded-full blur-3xl" />
      
      {/* Main content */}
      <div className="relative z-10 max-w-2xl w-full text-center space-y-8">
        
        {/* Error code with glitch effect */}
        <div className="space-y-2">
          <GlitchText 
            text="404" 
            className="font-black text-[120px] md:text-[180px] leading-none tracking-tighter text-zinc-800"
          />
          <div className="text-2xl md:text-3xl font-bold text-zinc-600">
            Page Not Found
          </div>
        </div>
        
        {/* Terminal-style message */}
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <div className="w-3 h-3 rounded-full bg-green-500/60" />
            <span className="ml-2 font-mono text-xs text-zinc-600">terminal</span>
          </div>
          
          <div className="font-mono text-sm text-left space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-lime-400">$</span>
              <span className="text-zinc-300">find /portfolio -name "page"</span>
            </div>
            <div className="text-zinc-600 pl-4">
              {isTyping && (
                <span>
                  find: /portfolio: No such file or directory
                  <span className="animate-pulse">_</span>
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 mt-3">
              <span className="text-lime-400">$</span>
              <span className="text-zinc-300">echo "The page you're looking for has vanished into the digital void..."</span>
            </div>
          </div>
        </div>
        
        {/* Search bar */}
        <form onSubmit={handleSearch} className="relative max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for something..."
              className="w-full bg-zinc-900/80 border border-zinc-800 rounded-xl pl-12 pr-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-lime-500/50 focus:bg-zinc-900 transition-all duration-200 backdrop-blur-sm"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-lime-400 hover:bg-lime-300 text-black p-2 rounded-lg transition-colors duration-200"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
        
        {/* Quick actions */}
        <div className="space-y-6">
          <div className="flex items-center justify-center gap-2 text-zinc-600">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm">Try one of these instead:</span>
            <Sparkles className="w-4 h-4" />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {quickLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex flex-col items-center gap-2 p-4 bg-zinc-900/60 border border-zinc-800 rounded-xl hover:bg-zinc-800 hover:border-zinc-700 transition-all duration-200 hover:-translate-y-1"
                >
                  <Icon className="w-5 h-5 text-zinc-400 group-hover:text-lime-400 transition-colors" />
                  <span className="text-xs text-zinc-600 group-hover:text-zinc-300 transition-colors">
                    {link.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
        
        {/* Back button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 px-6 py-3 bg-zinc-900/80 border border-zinc-800 rounded-xl hover:bg-zinc-800 hover:border-zinc-700 transition-all duration-200 group"
          >
            <ArrowLeft className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
            <span className="text-zinc-300 group-hover:text-white">Go Back</span>
          </button>
          
          <Link
            href="/"
            className="flex items-center gap-2 px-6 py-3 bg-lime-400 hover:bg-lime-300 text-black font-bold rounded-xl transition-all duration-200 hover:-translate-y-px hover:shadow-lg hover:shadow-lime-400/20 group"
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
            <Zap className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
        
        {/* Easter egg message */}
        <div className="text-center text-zinc-700 text-xs font-mono">
          <p>Error Code: 0x404_PAGE_NOT_FOUND</p>
          <p>System Status: Confused but functional</p>
        </div>
      </div>
    </div>
  );
}
