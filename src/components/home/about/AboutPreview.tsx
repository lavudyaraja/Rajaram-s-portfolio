'use client'

import { useState, useEffect } from "react";
import { User, Code, Globe, Zap, Award, ArrowRight, Sparkles, Target, TrendingUp, Brain, Rocket, Terminal, Database, Cpu, Lightbulb, Star, Github, Linkedin, Mail, MapPin, Calendar, GraduationCap } from "lucide-react";

const stats = [
  { label: "Years of Experience", value: "6 months+", icon: Zap, color: "from-blue-500 to-cyan-500" },
  { label: "Projects Completed", value: "15+", icon: Code, color: "from-purple-500 to-pink-500" },
  { label: "Skills Mastered", value: "10++", icon: Globe, color: "from-green-500 to-emerald-500" },
  { label: "Certifications", value: "10", icon: Award, color: "from-orange-500 to-red-500" },
];

const expertise = [
  { icon: Brain, title: "AI/ML Expertise", description: "TensorFlow, PyTorch, OpenAI", color: "from-purple-500 to-pink-500" },
  { icon: Code, title: "Full-Stack Development", description: "React, Node.js, Python", color: "from-blue-500 to-cyan-500" },
  { icon: Database, title: "Backend Architecture", description: "PostgreSQL, MongoDB, AWS", color: "from-green-500 to-emerald-500" },
  { icon: Cpu, title: "DevOps Engineering", description: "Docker,Github Actions,CI/CD", color: "from-orange-500 to-red-500" },
];

const achievements = [
  { icon: Star, text: "Academic Projects", value: "5+" },
  { icon: Github, text: "GitHub Repositories", value: "19+" },
  { icon: Lightbulb, text: "AI / ML Projects", value: "5+" },
  { icon: Award, text: "Certifications", value: "10+" },
  // { icon: Star, text: "Hackathons / Workshops", value: "+" },
];


interface AboutPreviewProps {
  onExpand: () => void;
}

export default function AboutPreview({ onExpand }: AboutPreviewProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative bg-black overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0">
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
        
        {/* Floating Gradient Orbs */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-40 right-32 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float-delay"></div>
        <div className="absolute bottom-32 left-1/3 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-float-delay-slow"></div>
        
        {/* Tech Icons Floating */}
        <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center animate-spin-slow">
          <Terminal className="w-8 h-8 text-blue-400" />
        </div>
        <div className="absolute top-1/3 right-1/4 w-14 h-14 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center animate-float">
          <Database className="w-7 h-7 text-purple-400" />
        </div>
        <div className="absolute bottom-1/3 left-1/3 w-12 h-12 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl flex items-center justify-center animate-float-delay">
          <Cpu className="w-6 h-6 text-green-400" />
        </div>
      </div>

      <div className="relative z-10 flex items-center px-4 py-16">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid gap-16 lg:grid-cols-2 items-center">
            
            {/* Left Column - Main Content */}
            <div className="space-y-12">
              {/* Badge */}
              <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 backdrop-blur-sm relative overflow-hidden group ${
                isVisible ? 'animate-fade-in-left' : 'opacity-0'
              }`}>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <div className="relative flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-blue-400 animate-pulse" />
                  <span className="text-blue-400 font-medium">About Me</span>
                  <User className="w-5 h-5 text-purple-400" />
                </div>
              </div>
              
              {/* Title */}
              <div className={`space-y-6 ${
                isVisible ? 'animate-fade-in-left animation-delay-200' : 'opacity-0'
              }`}>
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-black leading-tight">
                  <span className="block text-white mb-2">Meet the</span>
                  <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
                    Developer
                  </span>
                </h1>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-400 rounded-full animate-pulse"></div>
                    <div className="w-4 h-4 bg-purple-400 rounded-full animate-pulse delay-100"></div>
                    <div className="w-4 h-4 bg-pink-400 rounded-full animate-pulse delay-200"></div>
                  </div>
                  <Zap className="w-6 h-6 text-blue-400 animate-pulse" />
                </div>
              </div>
              
              {/* Description */}
              <div className={`space-y-6 ${
                isVisible ? 'animate-fade-in-left animation-delay-400' : 'opacity-0'
              }`}>
                <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
                  Passionate <span className="text-blue-400 font-semibold">Full-Stack Developer</span> & <span className="text-purple-400 font-semibold">AI Engineer</span> crafting innovative digital experiences.
                </p>
                <p className="text-lg text-gray-400 leading-relaxed">
                  I transform complex problems into elegant, user-friendly solutions that make a difference in the digital world.
                </p>
              </div>

              {/* Quick Info */}
              <div className={`grid grid-cols-3 gap-6 ${
                isVisible ? 'animate-fade-in-left animation-delay-600' : 'opacity-0'
              }`}>
                <div className="text-center">
                  <MapPin className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="text-white font-medium">India</p>
                </div>
                <div className="text-center">
                  <Calendar className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Experience</p>
                  <p className="text-white font-medium">6 months+ Years</p>
                </div>
                <div className="text-center">
                  <GraduationCap className="w-6 h-6 text-green-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Education</p>
                  <p className="text-white font-medium">B.Tech CSE</p>
                </div>
              </div>

              {/* CTA Button */}
              <div className={`${
                isVisible ? 'animate-fade-in-left animation-delay-800' : 'opacity-0'
              }`}>
                <button
                  onClick={onExpand}
                  className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-blue-500/50 hover:scale-105 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  <span className="relative flex items-center gap-3">
                    <Rocket className="w-6 h-6" />
                    <span>Discover My Journey</span>
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                </button>
              </div>
            </div>

            {/* Right Column - Expertise Cards */}
            <div className="space-y-8">
              {/* Expertise Grid */}
              <div className={`grid grid-cols-2 gap-4 ${
                isVisible ? 'animate-fade-in-right animation-delay-200' : 'opacity-0'
              }`}>
                {expertise.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div 
                      key={index}
                      className="group relative bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300 hover:scale-105 cursor-pointer"
                      onMouseEnter={() => setHoveredCard(index)}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`}></div>
                      
                      <div className="relative z-10">
                        <div className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        
                        <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                        <p className="text-sm text-gray-400">{item.description}</p>
                        
                        {hoveredCard === index && (
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full animate-pulse"></div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Stats Grid */}
              <div className={`grid grid-cols-2 lg:grid-cols-4 gap-4 ${
                isVisible ? 'animate-fade-in-right animation-delay-400' : 'opacity-0'
              }`}>
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div 
                      key={index} 
                      className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:border-white/20"
                    >
                      <div className={`w-10 h-10 mx-auto mb-3 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                      <div className="text-xs text-gray-500">{stat.label}</div>
                    </div>
                  );
                })}
              </div>

              {/* Achievement Badges */}
              <div className={`${
                isVisible ? 'animate-fade-in-right animation-delay-600' : 'opacity-0'
              }`}>
                <h3 className="text-xl font-bold text-white mb-4">Quick Wins</h3>
                <div className="grid grid-cols-2 gap-3">
                  {achievements.map((achievement, index) => {
                    const Icon = achievement.icon;
                    return (
                      <div key={index} className="flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg px-4 py-3 hover:bg-white/10 transition-all duration-300">
                        <Icon className="w-5 h-5 text-yellow-400" />
                        <div>
                          <p className="text-sm text-gray-300">{achievement.text}</p>
                          <p className="text-xs text-gray-500">{achievement.value}</p>
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

      {/* Custom CSS */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(5deg); }
        }
        @keyframes float-delay {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(-5deg); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes float-delay-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(-3deg); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes fade-in-left {
          from { opacity: 0; transform: translateX(-100px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fade-in-right {
          from { opacity: 0; transform: translateX(100px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-float { animation: float 8s ease-in-out infinite; }
        .animate-float-delay { animation: float-delay 10s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 12s ease-in-out infinite; }
        .animate-float-delay-slow { animation: float-delay-slow 15s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        .animate-fade-in-left { animation: fade-in-left 1.2s ease-out; }
        .animate-fade-in-right { animation: fade-in-right 1.2s ease-out; }
        .animate-gradient { animation: gradient 4s ease infinite; background-size: 200% 200%; }
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        .animation-delay-600 { animation-delay: 0.6s; }
        .animation-delay-800 { animation-delay: 0.8s; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
      `}</style>
    </section>
  );
}
