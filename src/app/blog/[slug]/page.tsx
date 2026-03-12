"use client";

import React, { useEffect, useState } from "react";
import { 
  BookOpen, Calendar, Clock, Mail, 
  Bell, Zap, PenTool, FileText,
  ArrowRight, Star, Users, TrendingUp,
  Sparkles, Coffee
} from "lucide-react";
import Link from "next/link";

// Animated counter component
const AnimatedCounter = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    
    return () => clearInterval(timer);
  }, [target]);
  
  return <>{count}{suffix}</>;
};

// Floating particles background
const Particles = () => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number }>>([]);
  
  useEffect(() => {
    const newParticles = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 5,
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
            animationDelay: `${particle.delay}s`,
            animationDuration: `${Math.random() * 3 + 3}s`,
          }}
        />
      ))}
    </div>
  );
};

// Typing animation component
const TypingText = ({ texts, className = "" }: { texts: string[]; className?: string }) => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  useEffect(() => {
    const text = texts[currentIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting && currentText.length < text.length) {
        setCurrentText(text.slice(0, currentText.length + 1));
      } else if (isDeleting && currentText.length > 0) {
        setCurrentText(text.slice(0, currentText.length - 1));
      } else if (!isDeleting && currentText.length === text.length) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && currentText.length === 0) {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % texts.length);
      }
    }, isDeleting ? 50 : 100);
    
    return () => clearTimeout(timeout);
  }, [currentText, currentIndex, isDeleting, texts]);
  
  return <span className={className}>{currentText}</span>;
};

export default function BlogSlugComingSoon() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setTimeout(() => setIsSubscribed(false), 3000);
      setEmail("");
    }
  };
  
  const upcomingTopics = [
    { icon: PenTool, title: "ML Engineering", desc: "Production ML systems" },
    { icon: Zap, title: "Computer Vision", desc: "CNN architectures & applications" },
    { icon: FileText, title: "FastAPI", desc: "Building scalable APIs" },
    { icon: TrendingUp, title: "React Patterns", desc: "Advanced component patterns" },
  ];
  
  const stats = [
    { icon: FileText, label: "Articles Drafted", value: 12 },
    { icon: Clock, label: "Hours of Research", value: 48 },
    { icon: Coffee, label: "Cups Consumed", value: 127 },
    { icon: Users, label: "Beta Readers", value: 8 },
  ];
  
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background elements */}
      <Particles />
      <div className="absolute inset-0 bg-gradient-to-br from-lime-500/5 via-transparent to-sky-500/5" />
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-lime-500/3 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-sky-500/2 rounded-full blur-3xl" />
      
      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between p-6 border-b border-zinc-900">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-lime-400 group-hover:bg-lime-300 flex items-center justify-center transition-all duration-200">
            <span className="font-black text-black text-sm">LR</span>
          </div>
          <span className="font-black text-white">Back to Portfolio</span>
        </Link>
        
        <div className="flex items-center gap-4">
          <Link 
            href="/blog"
            className="flex items-center gap-2 px-4 py-2 bg-lime-400/10 border border-lime-500/20 rounded-xl hover:bg-lime-400/20 transition-all duration-200"
          >
            <BookOpen className="w-4 h-4 text-lime-400" />
            <span className="text-lime-400">Blog Home</span>
          </Link>
          <Link 
            href="#contact" 
            className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl hover:bg-zinc-800 transition-all duration-200"
          >
            <Mail className="w-4 h-4" />
            <span>Contact</span>
          </Link>
        </div>
      </nav>
      
      {/* Main content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 text-center">
        
        {/* Hero section */}
        <div className="space-y-6 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-lime-400/10 border border-lime-500/20 rounded-full">
            <BookOpen className="w-4 h-4 text-lime-400" />
            <span className="text-sm font-mono text-lime-400">Article Not Found</span>
          </div>
          
          <h1 className="font-black text-5xl md:text-7xl lg:text-8xl leading-none tracking-tighter">
            <span className="text-zinc-800">Article</span>
            <br />
            <span className="text-white">Coming Soon</span>
          </h1>
          
          <div className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto">
            This article is still being crafted. I'm writing about{" "}
            <TypingText 
              texts={["ML Engineering", "Web Development", "Computer Vision", "System Design"]}
              className="text-lime-400 font-semibold"
            />
            {" "}and more exciting topics.
          </div>
          
          <div className="flex items-center justify-center gap-2 text-zinc-600">
            <Calendar className="w-4 h-4" />
            <span className="text-sm font-mono">Expected launch: Q2 2024</span>
          </div>
        </div>
        
        {/* Stats section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 backdrop-blur-sm">
                <Icon className="w-6 h-6 text-lime-400 mx-auto mb-3" />
                <div className="text-2xl font-black text-white mb-1">
                  <AnimatedCounter target={stat.value} suffix="+" />
                </div>
                <div className="text-xs text-zinc-600 font-mono">{stat.label}</div>
              </div>
            );
          })}
        </div>
        
        {/* Upcoming topics */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-lime-400" />
            What I'm Writing About
            <Sparkles className="w-5 h-5 text-lime-400" />
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            {upcomingTopics.map((topic, index) => {
              const Icon = topic.icon;
              return (
                <div 
                  key={index}
                  className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 backdrop-blur-sm hover:bg-zinc-900/80 hover:border-zinc-700 transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-lime-400/10 border border-lime-500/20 flex items-center justify-center group-hover:bg-lime-400/20 transition-colors">
                      <Icon className="w-6 h-6 text-lime-400" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-white mb-1">{topic.title}</h3>
                      <p className="text-sm text-zinc-600">{topic.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Newsletter signup */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-8 backdrop-blur-sm max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Bell className="w-5 h-5 text-lime-400" />
            <h3 className="text-xl font-bold text-white">Get Notified When This Article Goes Live</h3>
          </div>
          
          <p className="text-zinc-400 mb-6">
            Be the first to read this article and future tech content. No spam, just quality articles.
          </p>
          
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-lime-500/50 transition-colors"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-lime-400 hover:bg-lime-300 text-black font-bold rounded-xl transition-all duration-200 hover:-translate-y-px hover:shadow-lg hover:shadow-lime-400/20 group"
            >
              {isSubscribed ? (
                <span className="flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  Subscribed!
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Notify Me
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </button>
          </form>
        </div>
        
        {/* Quick links */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/blog"
            className="flex items-center gap-2 px-6 py-3 bg-zinc-900/60 border border-zinc-800 rounded-xl hover:bg-zinc-800 transition-all duration-200"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            <span>Blog Home</span>
          </Link>
          
          <Link
            href="/"
            className="flex items-center gap-2 px-6 py-3 bg-lime-400 hover:bg-lime-300 text-black font-bold rounded-xl transition-all duration-200 hover:-translate-y-px hover:shadow-lg hover:shadow-lime-400/20"
          >
            <TrendingUp className="w-4 h-4" />
            <span>View Projects</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
