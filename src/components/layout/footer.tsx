"use client";

import {
  Github, Linkedin, Twitter, Instagram, Send, MapPin, Mail, Phone, Heart, ExternalLink, Code2, Palette, Cpu, Globe, Sparkles, Zap, Star, Brain, Clock, ArrowUpRight, Terminal, Database, Cloud, Shield, Rocket, Users, Award, TrendingUp, Layers, Grid3x3, Activity
} from "lucide-react";
import { useState, useEffect } from "react";

const techStack = [
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", color: "from-cyan-400 to-blue-500" },
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", color: "from-gray-100 to-gray-300" },
  { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", color: "from-cyan-400 to-teal-500" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", color: "from-green-400 to-emerald-500" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", color: "from-yellow-400 to-orange-500" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", color: "from-blue-400 to-indigo-500" },
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", color: "from-green-500 to-emerald-600" },
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", color: "from-blue-500 to-cyan-600" },
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", color: "from-blue-400 to-blue-600" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", color: "from-orange-400 to-red-500" },
];

const quickLinks = [
  { name: "Home", path: "/", icon: <Globe className="w-4 h-4" />, color: "from-blue-400 to-cyan-400" },
  { name: "About", path: "#about", icon: <Users className="w-4 h-4" />, color: "from-purple-400 to-pink-400" },
  { name: "Skills", path: "#skills", icon: <Brain className="w-4 h-4" />, color: "from-green-400 to-emerald-400" },
  { name: "Projects", path: "#projects", icon: <Code2 className="w-4 h-4" />, color: "from-orange-400 to-red-400" },
  { name: "Blog", path: "#blog", icon: <Terminal className="w-4 h-4" />, color: "from-yellow-400 to-orange-400" },
  { name: "Contact", path: "#contact", icon: <Mail className="w-4 h-4" />, color: "from-pink-400 to-rose-400" },
];

const services = [
  { name: "AI/ML Development", icon: <Brain className="w-5 h-5" />, description: "Building intelligent solutions" },
  { name: "Web Development", icon: <Code2 className="w-5 h-5" />, description: "Modern responsive applications" },
  // { name: "Cloud Architecture", icon: <Cloud className="w-5 h-5" />, description: "Scalable cloud solutions" },
  // { name: "DevOps & CI/CD", icon: <Shield className="w-5 h-5" />, description: "Automated deployment pipelines" },
];

const stats = [
  { name: "Projects Completed", value: "50+", icon: <Rocket className="w-5 h-5" />, color: "text-blue-400" },
  { name: "Happy Clients", value: "30+", icon: <Users className="w-5 h-5" />, color: "text-green-400" },
  { name: "Awards Won", value: "5+", icon: <Award className="w-5 h-5" />, color: "text-yellow-400" },
  { name: "Years Experience", value: "3+", icon: <TrendingUp className="w-5 h-5" />, color: "text-purple-400" },
];

const ramQuotes = [
  // Hanuman Chalisa
  "नासै रोग हरै सब पीरा, जपत निरंतर हनुमत बीरा – Constant remembrance of Hanuman removes suffering and pain",

  // Bhagavad Gita 2.47 – Sanskrit + English
  "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन । मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥ – Focus on doing the work with full dedication, and let the results take care of themselves.",

  // Heart pain
  "Some losses don’t break you loudly, they break you silently and change the way you breathe, think, and trust forever",

  // Hunger to build
  "I didn’t choose business for comfort, I chose it because the pain of staying small was greater than the pain of building alone"
];


export default function Footer() {
  const [email, setEmail] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(0);
  const [currentRamQuote, setCurrentRamQuote] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  const quotes = [
    "Innovation distinguishes between a leader and a follower.",
    "The only way to do great work is to love what you do.",
    "Code is poetry written in logic.",
    "Excellence is not a skill, it's an attitude.",
    "The future belongs to those who believe in the beauty of their dreams."
  ];

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 8000);

    return () => clearInterval(quoteInterval);
  }, [quotes.length]);

  useEffect(() => {
    const ramQuoteInterval = setInterval(() => {
      setCurrentRamQuote((prev) => (prev + 1) % ramQuotes.length);
    }, 4000);

    return () => clearInterval(ramQuoteInterval);
  }, [ramQuotes.length]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleQuickContact = () => {
    setShowSuccess(true);
    setEmail("");
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleNavClick = (path: string) => {
    if (path.startsWith('#')) {
      const element = document.querySelector(path);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    } else {
      console.log(`Navigating to: ${path}`);
    }
  };

  return (
    <footer className="relative bg-gradient-to-br from-gray-950 via-black to-gray-950 text-white overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>
      
      {/* Floating Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/20 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-pink-500/20 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-16 sm:py-20">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 sm:gap-12 mb-16">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-lg opacity-75"></div>
                  <div className="relative w-12 h-12 rounded-full bg-black border-2 border-white/20 flex items-center justify-center">
                    <Code2 className="w-6 h-6 text-cyan-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    Lavudya Raja
                  </h3>
                  <p className="text-sm text-gray-400">Full Stack Developer</p>
                </div>
              </div>
              
              <p className="text-gray-300 text-sm leading-relaxed">
                Passionate about creating innovative solutions at the intersection of AI and web development. Transforming ideas into reality through code.
              </p>
              
              <div className="flex items-center gap-3">
                <a href="mailto:codeml862@gmail.com" className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors text-sm">
                  <Mail className="w-4 h-4" />
                  <span>codeml862@gmail.com</span>
                </a>
              </div>
              
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-pink-400" />
                <span className="text-sm text-gray-400">Haryana, India</span>
              </div>
            </div>
          </div>

          {/* Services Section */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
              <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full"></div>
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">Services</span>
            </h4>
            <div className="space-y-4">
              {services.map((service, index) => (
                <div key={service.name} className="group cursor-pointer">
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02]">
                    <div className="p-2 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-lg text-green-400 group-hover:scale-110 transition-transform duration-300">
                      {service.icon}
                    </div>
                    <div>
                      <h5 className="text-white font-medium text-sm mb-1">{service.name}</h5>
                      <p className="text-gray-400 text-xs">{service.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          {/* <div className="lg:col-span-1">
            <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
              <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"></div>
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Tech Stack</span>
            </h4>
            <div className="grid grid-cols-3 gap-3">
              {techStack.map((tech) => (
                <div key={tech.name} className="group relative">
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3 hover:border-white/30 hover:bg-white/10 transition-all duration-300 hover:scale-110 cursor-pointer">
                    <div className={`bg-gradient-to-r ${tech.color} bg-clip-text text-transparent`}>
                      <img src={tech.icon} alt={tech.name} className="w-6 h-6 mx-auto filter brightness-0 invert" />
                    </div>
                  </div>
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-black/80 px-2 py-1 rounded">
                    {tech.name}
                  </div>
                </div>
              ))}
            </div>
          </div> */}

          {/* Lord Sri Ram Quotes */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
              <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full"></div>
              <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">Ram's Wisdom</span>
            </h4>
            <div className="relative h-32 flex items-center">
              <div className="absolute inset-0 flex items-center">
                {ramQuotes.map((quote, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-1000 border border-white/10 hover:border-orange-400/30 ${
                      index === currentRamQuote 
                        ? 'opacity-100 translate-x-0' 
                        : 'opacity-0 translate-x-full'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-gradient-to-r from-orange-400/20 to-yellow-400/20 rounded-lg text-orange-400 flex-shrink-0">
                        <Star className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-gray-300 text-sm leading-relaxed italic">
                          {quote}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center mt-4 gap-2">
              {ramQuotes.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentRamQuote(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentRamQuote 
                      ? 'bg-orange-400 w-6' 
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
              <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Stay Connected</span>
            </h4>
            <div className="space-y-4">
              <p className="text-gray-300 text-sm">
                Get the latest updates on projects, articles, and tech insights delivered to your inbox.
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all text-sm"
                />
                <button
                  onClick={handleQuickContact}
                  className="w-full px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                  {showSuccess ? (
                    <>
                      <Star className="w-4 h-4 animate-pulse" />
                      <span>Subscribed!</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Subscribe</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 mb-12">
          <h4 className="text-lg font-bold mb-6 text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Quick Navigation
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {quickLinks.map((link, index) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.path)}
                className="group relative overflow-hidden bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 rounded-xl p-4 transition-all duration-300 hover:scale-105"
              >
                <div className="flex flex-col items-center gap-3">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${link.color} text-white group-hover:scale-110 transition-transform duration-300`}>
                    {link.icon}
                  </div>
                  <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                    {link.name}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
              </button>
            ))}
            
            {/* <a
              href="#"
              className="group relative overflow-hidden bg-gradient-to-br from-orange-500/20 to-red-500/20 hover:from-orange-500/30 hover:to-red-500/30 border border-orange-500/30 hover:border-orange-400/50 rounded-xl p-4 transition-all duration-300 hover:scale-105"
            >
              <div className="flex flex-col items-center gap-3">
                <div className="p-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white group-hover:scale-110 transition-transform duration-300">
                  <ExternalLink className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium text-orange-400 group-hover:text-orange-300 transition-colors">
                  Resume
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400/10 to-red-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
            </a> */}
          </div>
        </div>

        {/* Quote Section */}
        <div className="text-center mb-12">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded-2xl blur-xl"></div>
            <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 max-w-3xl mx-auto">
              <Sparkles className="w-8 h-8 text-cyan-400 mx-auto mb-4" />
              <p className="text-lg sm:text-xl font-medium text-gray-300 italic mb-4 leading-relaxed">
                "{quotes[currentQuote]}"
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                <span>Daily inspiration</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
            {/* Copyright */}
            <div className="text-center lg:text-left">
              <p className="text-sm text-gray-400 mb-2">
                2024 Rajaram Lavudya. All rights reserved.
              </p>
              <p className="text-xs text-gray-500">
                Built with countless failures, long nights, and an unstoppable urge to build instead of wait for opportunities
              </p>
            </div>
              <span className="flex items-center gap-2">
              <span
                className="font-semibold
                bg-gradient-to-r from-orange-500 via-white to-green-500
                bg-clip-text text-transparent
                drop-shadow-[0_0_6px_rgba(255,153,51,0.35)]"
              >
                जय श्री सीताराम
              </span>
              <span aria-hidden>🙏</span>
            </span>
            {/* Social Links */}
            <div className="flex items-center gap-6">
              <a href="https://github.com/lavudyaraja" className="text-gray-400 hover:text-cyan-400 hover:scale-125 transition-all duration-300 hover:drop-shadow-[0_0_12px_rgba(34,211,238,0.8)]">
                <Github className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
              <a href="https://www.linkedin.com/in/lavudyaraja5228/" className="text-gray-400 hover:text-blue-400 hover:scale-125 transition-all duration-300 hover:drop-shadow-[0_0_12px_rgba(96,165,250,0.8)]">
                <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
              <a href="https://x.com/LavudyaRaj22988" className="text-gray-400 hover:text-pink-400 hover:scale-125 transition-all duration-300 hover:drop-shadow-[0_0_12px_rgba(244,114,182,0.8)]">
                <Twitter className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
              <a href="https://www.instagram.com/u_no_me_1536" className="text-gray-400 hover:text-orange-400 hover:scale-125 transition-all duration-300 hover:drop-shadow-[0_0_12px_rgba(251,146,60,0.8)]">
                <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
            </div>

            {/* Back to Top */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className={`flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 rounded-xl transition-all duration-300 hover:scale-105 ${
                isScrolled ? 'opacity-100' : 'opacity-50'
              }`}
            >
              <ArrowUpRight className="w-4 h-4" />
              <span className="text-sm">Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}