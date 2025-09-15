import { ArrowRight, Download, Code, Globe, Zap, Star, Sparkles, ChevronDown, Play, Github, Linkedin, Twitter, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";

export default function ModernHero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [currentText, setCurrentText] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const rotatingTexts = [
    "Full-Stack Developer",
    "ML Engineer", 
    "UI/UX Enthusiast",
    "Problem Solver"
  ];

  useEffect(() => {
    setIsVisible(true);
    
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const handleMouseMove = (e) => {
      // Only track mouse on desktop
      if (!isMobile) {
        setMousePosition({ x: e.clientX, y: e.clientY });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    const textInterval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % rotatingTexts.length);
    }, 3000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', checkMobile);
      clearInterval(textInterval);
    };
  }, [isMobile]);

  const techIcons = [
    { name: "React", color: "text-cyan-400", bg: "bg-cyan-500/10", icon: "⚛️" },
    { name: "Python", color: "text-yellow-400", bg: "bg-yellow-500/10", icon: "🐍" },
    { name: "Typescript", color: "text-green-400", bg: "bg-green-500/10", icon: "🟢" },
    { name: "AI/ML", color: "text-purple-400", bg: "bg-purple-500/10", icon: "🤖" },
    { name: "Docker", color: "text-blue-400", bg: "bg-blue-500/10", icon: "🐳" },
    { name: "AWS", color: "text-orange-400", bg: "bg-orange-500/10", icon: "☁️" }
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="h-20"></div>
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated Grid - Responsive */}
        <div className={`absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.02)_1px,transparent_1px)] animate-pulse ${
          isMobile ? 'bg-[size:40px_40px]' : 'bg-[size:60px_60px]'
        }`}></div>
        
        {/* Floating Orbs - Mobile Optimized */}
        <div className={`absolute bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-xl animate-float ${
          isMobile ? 'top-10 left-5 w-20 h-20' : 'top-20 left-10 w-32 h-32'
        }`}></div>
        <div className={`absolute bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl animate-float-delay ${
          isMobile ? 'top-20 right-10 w-16 h-16' : 'top-40 right-20 w-24 h-24'
        }`}></div>
        <div className={`absolute bg-gradient-to-r from-orange-500/15 to-yellow-500/15 rounded-full blur-xl animate-float-slow ${
          isMobile ? 'bottom-20 left-1/4 w-24 h-24' : 'bottom-40 left-1/4 w-40 h-40'
        }`}></div>
        
        {/* Mouse Follower - Desktop Only */}
        {!isMobile && (
          <div 
            className="absolute w-96 h-96 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 rounded-full blur-3xl transition-all duration-1000 ease-out pointer-events-none"
            style={{
              left: mousePosition.x - 192,
              top: mousePosition.y - 192,
            }}
          ></div>
        )}
      </div>

      <div className={`relative z-10 max-w-7xl mx-auto min-h-screen flex flex-col justify-center ${
        isMobile ? 'px-4 py-8' : 'px-6 py-12'
      }`}>
        <div className={`grid items-center gap-8 ${
          isMobile ? 'grid-cols-1 text-center' : 'grid-cols-1 lg:grid-cols-2 gap-16'
        }`}>
          
          {/* Left Content */}
          <div className={`space-y-6 md:space-y-8 ${isVisible ? 'animate-slide-up' : 'opacity-0'} ${
            isMobile ? 'order-2 lg:order-1' : ''
          }`}>
            
            {/* Status Badge - Mobile Optimized */}
            <div className={`inline-flex items-center gap-2 md:gap-3 rounded-full bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-400/20 backdrop-blur-sm ${
              isMobile ? 'px-4 py-2 text-xs' : 'px-6 py-3'
            }`}>
              <div className="relative">
                <div className={`bg-emerald-400 rounded-full animate-ping ${isMobile ? 'w-2 h-2' : 'w-3 h-3'}`}></div>
                <div className={`absolute inset-0 bg-emerald-400 rounded-full ${isMobile ? 'w-2 h-2' : 'w-3 h-3'}`}></div>
              </div>
              <span className={`text-emerald-400 font-medium ${isMobile ? 'text-xs' : 'text-sm'}`}>
                Available for exciting projects
              </span>
              <div className="flex gap-1">
                {[...Array(3)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`bg-emerald-400/60 rounded-full animate-pulse ${isMobile ? 'w-0.5 h-0.5' : 'w-1 h-1'}`} 
                    style={{animationDelay: `${i * 0.2}s`}}
                  ></div>
                ))}
              </div>
            </div>

            {/* Main Heading - Mobile Responsive */}
            <div className="space-y-3 md:space-y-4">
              <div className="relative">
                <h1 className={`font-black leading-none ${
                  isMobile ? 'text-4xl sm:text-5xl' : 'text-6xl md:text-8xl'
                }`}>
                  <span className="block text-white/90">Hey, I'm</span>
                  <span className="block bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-x bg-300%">
                    Raja
                  </span>
                </h1>
                <div className={`absolute animate-bounce-slow ${
                  isMobile ? '-top-2 -right-2' : '-top-4 -right-4'
                }`}>
                  <Sparkles className={`text-yellow-400 animate-pulse ${
                    isMobile ? 'w-5 h-5' : 'w-8 h-8'
                  }`} />
                </div>
              </div>
              
              {/* Rotating Text - Mobile Optimized */}
              <div className={isMobile ? 'h-8 overflow-hidden' : 'h-12 overflow-hidden'}>
                <div 
                  className="transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateY(-${currentText * (isMobile ? 2 : 3)}rem)` }}
                >
                  {rotatingTexts.map((text, index) => (
                    <h2 
                      key={index} 
                      className={`font-bold text-gray-300 flex items-center justify-center lg:justify-start ${
                        isMobile ? 'text-lg sm:text-xl h-8' : 'text-3xl md:text-4xl h-12'
                      }`}
                    >
                      <span className="bg-gradient-to-r from-gray-300 to-gray-400 bg-clip-text text-transparent">
                        {text}
                      </span>
                    </h2>
                  ))}
                </div>
              </div>
            </div>

            {/* Description - Mobile Responsive */}
            <p className={`text-gray-400 leading-relaxed ${
              isMobile ? 'text-base max-w-sm mx-auto lg:mx-0' : 'text-xl max-w-2xl'
            }`}>
              I craft beautiful, performant web applications and intelligent systems that solve real-world problems. 
              <span className="text-cyan-400"> Let's build something amazing together.</span>
            </p>

            {/* CTA Buttons - Mobile Optimized */}
            <div className={`flex gap-3 md:gap-4 ${
              isMobile ? 'flex-col sm:flex-row justify-center lg:justify-start' : 'flex-col sm:flex-row'
            }`}>
              <button className={`group relative bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl font-bold text-white overflow-hidden transform hover:scale-105 transition-all duration-300 ${
                isMobile ? 'px-6 py-3 text-sm' : 'px-8 py-4'
              }`}>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <span className="relative flex items-center justify-center gap-2 md:gap-3">
                  <Play className={isMobile ? 'w-4 h-4' : 'w-5 h-5'} />
                  View My Work
                  <ArrowRight className={`group-hover:translate-x-1 transition-transform duration-300 ${
                    isMobile ? 'w-4 h-4' : 'w-5 h-5'
                  }`} />
                </span>
              </button>
              
              <button className={`group bg-white/5 border-2 border-white/10 hover:border-orange-400/50 rounded-2xl font-bold text-white backdrop-blur-sm transition-all duration-300 hover:bg-orange-500/10 ${
                isMobile ? 'px-6 py-3 text-sm' : 'px-8 py-4'
              }`}>
                <span className="flex items-center justify-center gap-2 md:gap-3">
                  <Download className={`text-orange-400 group-hover:animate-bounce ${
                    isMobile ? 'w-4 h-4' : 'w-5 h-5'
                  }`} />
                  Download Resume
                </span>
              </button>
            </div>

            {/* Social Links - Mobile Optimized */}
            <div className={`flex items-center gap-3 md:gap-4 pt-4 ${
              isMobile ? 'justify-center flex-col sm:flex-row lg:justify-start' : ''
            }`}>
              <span className={`text-gray-500 ${isMobile ? 'text-xs mb-2 sm:mb-0' : 'text-sm'}`}>
                Connect with me:
              </span>
              <div className="flex gap-2 md:gap-3">
                {[
                  { icon: Github, color: "hover:text-white", href: "https://github.com/lavudyaraja" },
                  { icon: Linkedin, color: "hover:text-blue-400", href: "https://www.linkedin.com/in/lavudyaraja5228/" },
                  { icon: Twitter, color: "hover:text-cyan-400", href: "https://x.com/LavudyaRaj22988" },
                  { icon: MessageCircle, color: "hover:text-green-400", href: "mailto:codeml862@gmail.com" }
                ].map((social, index) => (
                  <a 
                    key={index}
                    href={social.href}
                    className={`bg-white/5 border border-white/10 rounded-xl text-gray-400 ${social.color} transition-all duration-300 hover:scale-110 hover:bg-white/10 ${
                      isMobile ? 'p-2' : 'p-3'
                    }`}
                  >
                    <social.icon className={isMobile ? 'w-4 h-4' : 'w-5 h-5'} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content - 3D Card - Mobile Optimized */}
          <div className={`relative flex justify-center ${isVisible ? 'animate-slide-left' : 'opacity-0'} ${
            isMobile ? 'order-1 lg:order-2 mb-8 lg:mb-0' : 'lg:justify-end'
          }`}>
            <div className="relative group">
              
              {/* Main Card - Responsive Size */}
              <div className={`relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl transform group-hover:rotate-2 transition-all duration-500 hover:scale-105 ${
                isMobile ? 'w-80 h-80 p-6' : 'w-96 h-96 p-8'
              }`}>
                
                {/* Profile Image - Mobile Responsive */}
                <div className={`relative mx-auto mb-4 md:mb-6 ${
                  isMobile ? 'w-24 h-24' : 'w-32 h-32'
                }`}>
                  <img 
                    src="/Rajaimage.jpg" 
                    alt="Lavudya Raja" 
                    className="w-full h-full object-cover object-center rounded-2xl border border-white/20 backdrop-blur-sm"
                    style={{ objectPosition: 'center top' }}
                  />
                  <div className={`absolute bg-emerald-500 rounded-full flex items-center justify-center animate-pulse ${
                    isMobile ? '-top-1 -right-1 w-6 h-6' : '-top-2 -right-2 w-8 h-8'
                  }`}>
                    <div className={`bg-white rounded-full ${
                      isMobile ? 'w-2 h-2' : 'w-3 h-3'
                    }`}></div>
                  </div>
                </div>

                {/* Content - Mobile Responsive */}
                <div className="text-center space-y-3 md:space-y-4">
                  <h3 className={`font-bold text-white ${
                    isMobile ? 'text-xl' : 'text-2xl'
                  }`}>Lavudya Raja</h3>
                  <p className={`text-gray-400 ${
                    isMobile ? 'text-sm' : ''
                  }`}>Building the future, one line at a time</p>
                  
                  {/* Stats - Mobile Optimized */}
                  <div className="grid grid-cols-3 gap-2 md:gap-4 pt-3 md:pt-4">
                    {[
                      { label: "Projects", value: "5+" },
                      { label: "Experience", value: "1Y" },
                      { label: "Tech Stack", value: "10+" }
                    ].map((stat, index) => (
                      <div key={index} className="text-center">
                        <div className={`font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent ${
                          isMobile ? 'text-lg' : 'text-2xl'
                        }`}>
                          {stat.value}
                        </div>
                        <div className={`text-gray-500 ${
                          isMobile ? 'text-xs' : 'text-xs'
                        }`}>{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Floating Tech Icons - Hidden on Mobile */}
              {!isMobile && techIcons.map((tech, index) => (
                <div
                  key={index}
                  className={`absolute w-16 h-16 ${tech.bg} border border-white/20 rounded-2xl backdrop-blur-sm flex flex-col items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer group/tech animate-float-tech`}
                  style={{
                    top: `${20 + (index % 3) * 30}%`,
                    left: index < 3 ? '-20%' : '110%',
                    animationDelay: `${index * 0.5}s`
                  }}
                >
                  <div className="text-2xl mb-1">{tech.icon}</div>
                  <div className={`text-xs font-bold ${tech.color} opacity-0 group-hover/tech:opacity-100 transition-opacity duration-300`}>
                    {tech.name}
                  </div>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover/tech:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}

              {/* Mobile Tech Icons - Simplified Display */}
              {isMobile && (
                <div className="flex justify-center gap-2 mt-6">
                  {techIcons.slice(0, 4).map((tech, index) => (
                    <div
                      key={index}
                      className={`w-10 h-10 ${tech.bg} border border-white/20 rounded-xl backdrop-blur-sm flex items-center justify-center transition-all duration-300`}
                    >
                      <div className="text-lg">{tech.icon}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Orbiting Elements - Desktop Only */}
              {!isMobile && (
                <div className="absolute inset-0 animate-spin-slow">
                  <div className="absolute top-4 left-4 w-4 h-4 bg-cyan-400 rounded-full animate-pulse"></div>
                  <div className="absolute top-4 right-4 w-3 h-3 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                  <div className="absolute bottom-4 left-4 w-2 h-2 bg-pink-400 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
                  <div className="absolute bottom-4 right-4 w-3 h-3 bg-orange-400 rounded-full animate-pulse" style={{animationDelay: '3s'}}></div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Scroll Indicator - Mobile Optimized with proper spacing */}
        <div className={`absolute left-1/2 transform -translate-x-1/2 animate-bounce ${
          isMobile ? 'bottom-4' : 'bottom-4 md:bottom-8'
        }`}>
          <div className="flex flex-col items-center gap-1 md:gap-2 text-gray-500 cursor-pointer hover:text-cyan-400 transition-colors duration-300">
            <span className={isMobile ? 'text-xs' : 'text-sm'}>Scroll to explore</span>
            <ChevronDown className={isMobile ? 'w-5 h-5' : 'w-6 h-6'} />
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes float-delay {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-5deg); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes float-tech {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-left {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes gradient-x {
          0%, 100% { background-size: 200% 200%; background-position: left center; }
          50% { background-size: 200% 200%; background-position: right center; }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delay { animation: float-delay 8s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 10s ease-in-out infinite; }
        .animate-float-tech { animation: float-tech 4s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
        .animate-slide-up { animation: slide-up 1s ease-out; }
        .animate-slide-left { animation: slide-left 1s ease-out 0.3s both; }
        .animate-spin-slow { animation: spin-slow 30s linear infinite; }
        .animate-gradient-x { animation: gradient-x 4s ease infinite; }
        .bg-300% { background-size: 300% 300%; }
        
        /* Mobile-specific utilities */
        .line-clamp-3 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
        }
      `}</style>
    </section>
  );
}