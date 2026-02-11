'use client'

import { useState, useEffect } from "react";
import { User, Code, Globe, Zap, Award, ArrowRight, Sparkles, Target, TrendingUp, Brain, Rocket, Terminal, Database, Cpu, Lightbulb, Star, Github, Linkedin, Mail, MapPin, Calendar, GraduationCap, Hexagon, Layers, Activity, Wifi, Atom, CircuitBoard, Dna, Box, Globe2, Command, Palette, Shield } from "lucide-react";

const stats = [
  { label: "Code Years", value: "6m+", icon: Zap, color: "from-cyan-400 to-blue-500" },
  { label: "Projects Built", value: "15+", icon: Code, color: "from-purple-400 to-pink-500" },
  { label: "Tech Stack", value: "10+", icon: Globe, color: "from-green-400 to-emerald-500" },
  { label: "Certifications", value: "10", icon: Award, color: "from-orange-400 to-red-500" },
];

const expertise = [
  { icon: Brain, title: "AI/ML", description: "TensorFlow • PyTorch • OpenAI", color: "from-purple-400 to-pink-400", level: 85 },
  { icon: Code, title: "Full-Stack", description: "React • Node.js • Python", color: "from-blue-400 to-cyan-400", level: 90 },
  { icon: Database, title: "Backend", description: "PostgreSQL • MongoDB • AWS", color: "from-green-400 to-emerald-400", level: 75 },
  { icon: Cpu, title: "DevOps", description: "Docker • GitHub • CI/CD", color: "from-orange-400 to-red-400", level: 70 },
];

const achievements = [
  { icon: Star, text: "Academic Projects", value: "5+", glow: "yellow" },
  { icon: Github, text: "GitHub Repos", value: "19+", glow: "green" },
  { icon: Lightbulb, text: "AI Projects", value: "5+", glow: "purple" },
  { icon: Award, text: "Certificates", value: "10+", glow: "blue" },
];

const techIcons = [
  { icon: Terminal, color: "text-blue-400", delay: 0 },
  { icon: Database, color: "text-green-400", delay: 0.2 },
  { icon: Cpu, color: "text-purple-400", delay: 0.4 },
  { icon: Brain, color: "text-pink-400", delay: 0.6 },
  { icon: Shield, color: "text-cyan-400", delay: 0.8 },
  { icon: Globe2, color: "text-orange-400", delay: 1.0 },
];

interface AboutPreviewProps {
  onExpand: () => void;
}

export default function AboutPreview({ onExpand }: AboutPreviewProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeHexagon, setActiveHexagon] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    const hexagonInterval = setInterval(() => {
      setActiveHexagon((prev) => (prev + 1) % 6);
    }, 3000);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(hexagonInterval);
    };
  }, []);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-950 via-black to-slate-950 overflow-hidden">
      {/* Dynamic Hexagon Grid Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => {
            // Use deterministic values based on index to prevent hydration mismatch
            const left = ((i * 23) % 100);
            const top = ((i * 37) % 100);
            const delay = (i * 0.3) % 5;
            const duration = 3 + ((i * 0.7) % 4);
            
            return (
              <div
                key={i}
                className={`absolute ${!isMobile ? 'animate-pulse' : ''}`}
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                  animationDelay: `${delay}s`,
                  animationDuration: `${duration}s`
                }}
              >
                <Hexagon className="w-8 h-8 text-blue-400/20" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Tech Icons */}
      <div className="absolute inset-0 pointer-events-none">
        {techIcons.map((tech, index) => {
          const Icon = tech.icon;
          return (
            <div
              key={index}
              className={`absolute ${!isMobile ? 'animate-float-rotate' : ''}`}
              style={{
                left: `${15 + index * 15}%`,
                top: `${20 + (index % 2) * 30}%`,
                animationDelay: `${tech.delay}s`
              }}
            >
              <div className={`relative ${tech.color}`}>
                <Icon className="w-6 h-6" />
                <div className={`absolute inset-0 ${tech.color} blur-xl opacity-50`}></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mouse Follow Light */}
      <div 
        className="absolute w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
          transition: 'all 0.3s ease-out'
        }}
      />

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-16">
        <div className="max-w-7xl mx-auto w-full">
          
          {/* Central Hexagon Hub */}
          <div className="grid gap-16 lg:grid-cols-2 items-center">
            
            {/* Left Column - Personal Info */}
            <div className="space-y-12">
              {/* Animated Badge */}
              <div className={`relative inline-flex items-center gap-3 px-6 py-3 rounded-full border border-cyan-400/30 backdrop-blur-sm overflow-hidden group ${
                !isMobile && isVisible ? 'animate-slide-in-left' : ''
              }`}>
                <div className={`absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 ${!isMobile ? 'animate-pulse' : ''}`}></div>
                <div className="relative flex items-center gap-3">
                  <div className="relative">
                    <Sparkles className={`w-5 h-5 text-cyan-400 ${!isMobile ? 'animate-spin-slow' : ''}`} />
                    <div className="absolute inset-0 text-cyan-400 blur-md"></div>
                  </div>
                  <span className="text-cyan-400 font-medium tracking-wide">Digital Architect</span>
                  <User className="w-5 h-5 text-blue-400" />
                </div>
              </div>
              
              {/* Dynamic Title */}
              <div className={`space-y-4 ${
                !isMobile && isVisible ? 'animate-slide-in-left animation-delay-200' : ''
              }`}>
                <div className="relative">
                  <h1 className="text-7xl md:text-8xl lg:text-9xl font-black leading-none">
                    <span className="block text-white mb-2">Rajaram</span>
                    <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent ${!isMobile ? 'animate-gradient-shift' : ''}">
                      Lavudya
                    </span>
                  </h1>
                  <div className="absolute -top-4 -right-4 w-20 h-20">
                    <div className="relative w-full h-full">
                      <Hexagon className={`w-full h-full text-cyan-400/30 ${!isMobile ? 'animate-pulse' : ''}`} />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Code className="w-8 h-8 text-cyan-400" />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Status Indicators */}
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className={`w-3 h-3 bg-green-400 rounded-full ${!isMobile ? 'animate-pulse' : ''}`}></div>
                      <div className="absolute inset-0 bg-green-400 rounded-full blur-md"></div>
                    </div>
                    <span className="text-green-400 text-sm font-medium">Available for Work</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Activity className={`w-5 h-5 text-blue-400 ${!isMobile ? 'animate-pulse' : ''}`} />
                    <span className="text-blue-400 text-sm">Active Developer</span>
                  </div>
                </div>
              </div>
              
              {/* Enhanced Description */}
              <div className={`space-y-6 ${
                !isMobile && isVisible ? 'animate-slide-in-left animation-delay-400' : ''
              }`}>
                <div className="relative">
                  <p className="text-2xl md:text-3xl text-gray-300 leading-relaxed font-light">
                    Crafting <span className="text-cyan-400 font-semibold">intelligent solutions</span> at the intersection of 
                    <span className="text-purple-400 font-semibold"> AI</span> and 
                    <span className="text-blue-400 font-semibold"> web development</span>
                  </p>
                  <div className="absolute -bottom-2 left-0 w-full h-px bg-gradient-to-r from-cyan-400 to-purple-400"></div>
                </div>
                
                <p className="text-lg text-gray-400 leading-relaxed max-w-2xl">
                  Transforming complex challenges into elegant digital experiences through innovative code architecture and AI-driven solutions.
                </p>
              </div>

              {/* Interactive Info Cards */}
              <div className={`grid grid-cols-3 gap-6 ${
                !isMobile && isVisible ? 'animate-slide-in-left animation-delay-600' : ''
              }`}>
                <div className="group relative bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl border border-cyan-400/20 rounded-2xl p-6 hover:border-cyan-400/40 transition-all duration-300 hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-blue-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative">
                    <MapPin className="w-6 h-6 text-cyan-400 mb-3" />
                    <p className="text-sm text-gray-500 mb-1">Base</p>
                    <p className="text-white font-bold">Haryana, IN</p>
                  </div>
                </div>
                
                <div className="group relative bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl border border-purple-400/20 rounded-2xl p-6 hover:border-purple-400/40 transition-all duration-300 hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative">
                    <Calendar className="w-6 h-6 text-purple-400 mb-3" />
                    <p className="text-sm text-gray-500 mb-1">Experience</p>
                    <p className="text-white font-bold">6+ Months</p>
                  </div>
                </div>
                
                <div className="group relative bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl border border-green-400/20 rounded-2xl p-6 hover:border-green-400/40 transition-all duration-300 hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-emerald-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative">
                    <GraduationCap className="w-6 h-6 text-green-400 mb-3" />
                    <p className="text-sm text-gray-500 mb-1">Education</p>
                    <p className="text-white font-bold">B.Tech CSE</p>
                  </div>
                </div>
              </div>

              {/* Futuristic CTA Button */}
              <div
              className={`${
                !isMobile && isVisible ? 'animate-slide-in-left animation-delay-800' : ''
              }`}
            >
              <div className="relative inline-block">
                <p className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                  Built alone, breaking silently, choosing growth over comfort every single day
                </p>

                {/* Painful underline – always visible */}
                <span className="absolute left-0 -bottom-2 h-[2px] w-full bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 opacity-90"></span>
              </div>
            </div>
            </div>

            {/* Right Column - Interactive Skills Hub */}
            <div className="space-y-8">
              {/* Central Hexagon with Orbiting Skills */}
              <div className={`relative h-96 flex items-center justify-center ${
                !isMobile && isVisible ? 'animate-scale-in animation-delay-200' : ''
              }`}>
                {/* Central Hub */}
                <div className="relative w-32 h-32">
                  <div className={`absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full ${!isMobile ? 'animate-pulse' : ''}`}></div>
                  <div className="absolute inset-2 bg-black rounded-full flex items-center justify-center">
                    <div className="text-center">
                      <Brain className="w-8 h-8 text-cyan-400 mx-auto mb-1" />
                      <p className="text-xs text-cyan-400 font-bold">AI CORE</p>
                    </div>
                  </div>
                </div>
                
                {/* Orbiting Skill Nodes */}
                {expertise.map((skill, index) => {
                  const Icon = skill.icon;
                  const angle = (index * 90 + activeHexagon * 15) * (Math.PI / 180);
                  const radius = 120;
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;
                  
                  return (
                    <div
                      key={index}
                      className="absolute transition-all duration-1000 ease-in-out"
                      style={{
                        transform: `translate(${x}px, ${y}px)`,
                        left: '50%',
                        top: '50%',
                        marginLeft: '-60px',
                        marginTop: '-60px'
                      }}
                    >
                      <div 
                        className="group relative w-28 h-28 bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl border border-white/20 rounded-2xl p-4 hover:scale-110 transition-all duration-300 cursor-pointer"
                        onMouseEnter={() => setHoveredSkill(index)}
                        onMouseLeave={() => setHoveredSkill(null)}
                      >
                        <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-20 rounded-2xl`}></div>
                        
                        <div className="relative h-full flex flex-col items-center justify-center text-center">
                          <Icon className="w-6 h-6 text-white mb-2" />
                          <p className="text-xs font-bold text-white mb-1">{skill.title}</p>
                          
                          {/* Skill Level Bar */}
                          <div className="w-full bg-white/20 rounded-full h-1 overflow-hidden">
                            <div 
                              className={`h-full bg-gradient-to-r ${skill.color} transition-all duration-1000 ease-out`}
                              style={{ width: hoveredSkill === index ? `${skill.level}%` : '0%' }}
                            ></div>
                          </div>
                        </div>
                        
                        {/* Connecting Lines */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none">
                          <line
                            x1="50%"
                            y1="50%"
                            x2="50%"
                            y2="0"
                            stroke="currentColor"
                            strokeWidth="1"
                            className="text-cyan-400/30"
                          />
                        </svg>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Stats Dashboard */}
              <div className={`grid grid-cols-2 lg:grid-cols-4 gap-4 ${
                !isMobile && isVisible ? 'animate-slide-in-up animation-delay-400' : ''
              }`}>
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div 
                      key={index} 
                      className="group relative bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl border border-white/10 rounded-xl p-4 text-center hover:border-white/30 transition-all duration-300 hover:scale-105"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-10 rounded-xl`}></div>
                      
                      <div className="relative">
                        <div className={`w-12 h-12 mx-auto mb-3 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
                        <div className="text-xs text-gray-400 uppercase tracking-wider">{stat.label}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Achievement Matrix */}
              <div className={`${
                !isMobile && isVisible ? 'animate-slide-in-up animation-delay-600' : ''
              }`}>
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className={`w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full ${!isMobile ? 'animate-pulse' : ''}`}></div>
                  Achievement Matrix
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {achievements.map((achievement, index) => {
                    const Icon = achievement.icon;
                    const glowColors = {
                      yellow: 'from-yellow-400 to-orange-400',
                      green: 'from-green-400 to-emerald-400',
                      purple: 'from-purple-400 to-pink-400',
                      blue: 'from-blue-400 to-cyan-400'
                    };
                    
                    return (
                      <div key={index} className="group relative bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl border border-white/10 rounded-xl p-4 hover:border-white/30 transition-all duration-300 hover:scale-105">
                        <div className={`absolute inset-0 bg-gradient-to-br ${glowColors[achievement.glow as keyof typeof glowColors]} opacity-10 rounded-xl`}></div>
                        
                        <div className="relative flex items-center gap-4">
                          <div className={`relative w-12 h-12 bg-gradient-to-br ${glowColors[achievement.glow as keyof typeof glowColors]} rounded-xl flex items-center justify-center`}>
                            <Icon className="w-6 h-6 text-white" />
                            <div className={`absolute inset-0 bg-gradient-to-br ${glowColors[achievement.glow as keyof typeof glowColors]} rounded-xl blur-lg opacity-50 ${!isMobile ? 'animate-pulse' : ''}`}></div>
                          </div>
                          
                          <div>
                            <p className="text-sm font-bold text-white">{achievement.text}</p>
                            <p className="text-lg font-black bg-gradient-to-r from-gray-300 to-gray-100 bg-clip-text text-transparent">{achievement.value}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes float-rotate {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
            opacity: 0.7;
          }
          25% { 
            transform: translateY(-20px) rotate(90deg); 
            opacity: 1;
          }
          50% { 
            transform: translateY(-10px) rotate(180deg); 
            opacity: 0.8;
          }
          75% { 
            transform: translateY(-30px) rotate(270deg); 
            opacity: 1;
          }
        }
        
        @keyframes slide-in-left {
          from { 
            opacity: 0; 
            transform: translateX(-100px) rotateY(-30deg); 
          }
          to { 
            opacity: 1; 
            transform: translateX(0) rotateY(0deg); 
          }
        }
        
        @keyframes slide-in-up {
          from { 
            opacity: 0; 
            transform: translateY(100px) rotateX(30deg); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0) rotateX(0deg); 
          }
        }
        
        @keyframes scale-in {
          from { 
            opacity: 0; 
            transform: scale(0.5) rotate(180deg); 
          }
          to { 
            opacity: 1; 
            transform: scale(1) rotate(0deg); 
          }
        }
        
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-float-rotate { 
          animation: float-rotate 15s ease-in-out infinite; 
        }
        .animate-slide-in-left { 
          animation: slide-in-left 1.5s cubic-bezier(0.4, 0, 0.2, 1); 
        }
        .animate-slide-in-up { 
          animation: slide-in-up 1.5s cubic-bezier(0.4, 0, 0.2, 1); 
        }
        .animate-scale-in { 
          animation: scale-in 1.5s cubic-bezier(0.4, 0, 0.2, 1); 
        }
        .animate-gradient-shift { 
          animation: gradient-shift 4s ease infinite; 
          background-size: 200% 200%; 
        }
        .animate-spin-slow { 
          animation: spin-slow 8s linear infinite; 
        }
        
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        .animation-delay-600 { animation-delay: 0.6s; }
        .animation-delay-800 { animation-delay: 0.8s; }
      `}</style>
    </section>
  );
}
