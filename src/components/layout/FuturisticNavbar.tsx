
"use client";

import React, { useState, useEffect } from 'react';
import { 
  Home, 
  User, 
  Brain, 
  BookOpen, 
  Award, 
  Mail, 
  Maximize, 
  Minimize,
  Zap,
  Menu,
  X,
  Sun,
  Moon,
  GraduationCap
} from 'lucide-react';
import { FolderKanban } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface NavItem {
  id: string;
  name: string;
  icon: React.ElementType;
  neonColor: string;
  link: string;
  description?: string;
}

const EnhancedFuturisticNavbar: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string>('home');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [particles, setParticles] = useState<Array<{
    left: string;
    top: string;
    animationDelay: string;
    animationDuration: string;
    size: string;
    color: string;
  }>>([]);
  const router = useRouter();

  const navItems: NavItem[] = [
    { 
      id: 'home', 
      name: 'Home', 
      icon: Home, 
      neonColor: 'text-pink-400',
      link: '/',
      description: 'Welcome to my portfolio'
    },
    { 
      id: 'about', 
      name: 'About', 
      icon: User, 
      neonColor: 'text-yellow-400',
      link: '#about',
      description: 'Learn more about me'
    },
    { 
      id: 'education', 
      name: 'Education', 
      icon: GraduationCap, 
      neonColor: 'text-indigo-400',
      link: '#education',
      description: 'My academic background'
    },
    { 
      id: 'skills', 
      name: 'Skills', 
      icon: Brain, 
      neonColor: 'text-cyan-400',
      link: '#skills',
      description: 'My technical expertise'
    },
    {
      id: 'projects',
      name: 'Projects',
      icon: FolderKanban,
      neonColor: 'text-green-400',
      link: '#projects',
      description: 'View my work'
    },    
    { 
      id: 'blog', 
      name: 'Blog', 
      icon: BookOpen, 
      neonColor: 'text-blue-400',
      link: '#blog',
      description: 'Read my articles'
    },
    { 
      id: 'certifications', 
      name: 'Certifications', 
      icon: Award, 
      neonColor: 'text-purple-400',
      link: '#certificates',
      description: 'My achievements'
    },
    { 
      id: 'contact', 
      name: 'Contact', 
      icon: Mail, 
      neonColor: 'text-orange-400',
      link: '#contact',
      description: 'Get in touch'
    },
  ];

  // Generate particles only on client side to avoid hydration mismatch
  useEffect(() => {
    const colors = ['bg-pink-400', 'bg-yellow-400', 'bg-cyan-400', 'bg-blue-400', 'bg-purple-400', 'bg-green-400'];
    const sizes = ['w-0.5 h-0.5', 'w-1 h-1', 'w-1.5 h-1.5'];
    
    const generatedParticles = Array.from({ length: 15 }, (_, i) => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 3}s`,
      animationDuration: `${2 + Math.random() * 3}s`,
      size: sizes[i % sizes.length],
      color: colors[i % colors.length]
    }));
    
    setParticles(generatedParticles);
  }, []);

  // Set active item based on current URL
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentPath = window.location.pathname;
      const hash = window.location.hash;
      
      // Check for hash routes first
      if (hash) {
        const matchedItem = navItems.find(item => item.link === hash);
        if (matchedItem) {
          setActiveItem(matchedItem.id);
          return;
        }
      }
      
      // Check for regular routes
      const matchedItem = navItems.find(item => 
        item.link === currentPath || 
        (currentPath !== '/' && item.link !== '/' && currentPath.includes(item.link))
      );
      
      if (matchedItem) {
        setActiveItem(matchedItem.id);
      }
    }
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error('Fullscreen toggle failed:', error);
    }
  };

  // Navigation handler using Next.js router
  const handleNavigation = (item: NavItem) => {
    setActiveItem(item.id);
    setIsMobileMenuOpen(false);
    
    // For hash links, scroll to section
    if (item.link.startsWith('#')) {
      const element = document.querySelector(item.link);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // For regular routes, use Next.js router
      router.push(item.link);
    }
    
    console.log(`Navigating to: ${item.name} (${item.link})`);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // You can also emit a theme change event or update a global theme context
    const themeEvent = new CustomEvent('themeChange', { 
      detail: { isDarkMode: !isDarkMode } 
    });
    window.dispatchEvent(themeEvent);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Enhanced Background with Gradient Mesh */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 overflow-hidden">
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-20">
          <div 
            className={`absolute inset-0 ${!isMobile ? 'animate-pulse' : ''}`}
            style={{
              backgroundImage: `
                linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(236, 72, 153, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
              animation: 'grid-move 20s linear infinite'
            }}
          />
        </div>

        {/* Floating Gradient Orbs */}
        <div className={`absolute top-0 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl ${!isMobile ? 'animate-float' : ''}`}></div>
        <div className={`absolute top-0 right-1/4 w-48 h-48 bg-pink-500/10 rounded-full blur-3xl ${!isMobile ? 'animate-float-delayed' : ''}`}></div>
        <div className={`absolute bottom-0 left-1/3 w-56 h-56 bg-cyan-500/10 rounded-full blur-3xl ${!isMobile ? 'animate-float-slow' : ''}`}></div>
      </div>

      {/* Main Navigation */}
      <nav className={`relative transition-all duration-300 ${
        isDarkMode 
          ? 'bg-slate-900/95 border-white/10 shadow-blue-500/10' 
          : 'bg-white/95 border-slate-200/50 shadow-slate-500/10'
      } backdrop-blur-2xl border-b shadow-2xl`}>
        
        {/* Desktop & Mobile Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            {/* Enhanced Logo */}
            <button
              onClick={() => handleNavigation(navItems[0])}
              className="flex items-center space-x-3 group cursor-pointer hover:scale-105 transition-transform duration-300"
              aria-label="Go to homepage"
            >
              <div className="relative">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center border-2 border-pink-400/50 shadow-lg shadow-pink-500/25 group-hover:scale-110 transition-all duration-300">
                  <Zap className={`w-5 h-5 sm:w-6 sm:h-6 text-white ${!isMobile ? 'animate-pulse' : ''}`} />
                </div>
                <div className={`absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-current ${!isMobile ? 'animate-pulse' : ''}`}></div>
              </div>
              <div className="hidden sm:block">
                <div className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Lavudya Raja
                </div>
                <div className={`text-xs -mt-1 transition-colors duration-300 ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  Full Stack Developer
                </div>
              </div>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex">
              <div className={`transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-slate-800/50 border-white/10' 
                  : 'bg-white/70 border-slate-200/50'
              } backdrop-blur-xl border rounded-2xl p-2 shadow-2xl`}>
                <div className="flex items-center space-x-2">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeItem === item.id;
                    
                    return (
                      <div key={item.id} className="relative group">
                        <button
                          onClick={() => handleNavigation(item)}
                          aria-label={`Navigate to ${item.name}`}
                          className={`
                            relative flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95
                            ${isActive 
                              ? 'bg-gradient-to-r from-pink-500/20 to-purple-500/10 border border-pink-400/30 shadow-lg shadow-pink-500/25' 
                              : isDarkMode
                                ? 'bg-slate-700/30 border border-transparent hover:bg-slate-600/50 hover:border-white/10'
                                : 'bg-slate-100/50 border border-transparent hover:bg-slate-200/70 hover:border-slate-300/30'
                            }
                          `}
                        >
                          <Icon 
                            className={`w-5 h-5 transition-all duration-300 ${
                              isActive 
                                ? item.neonColor 
                                : isDarkMode
                                  ? 'text-slate-400 group-hover:text-white'
                                  : 'text-slate-600 group-hover:text-slate-800'
                            }`} 
                          />
                          <span className={`text-sm font-medium transition-all duration-300 ${
                            isActive 
                              ? item.neonColor 
                              : isDarkMode
                                ? 'text-slate-300 group-hover:text-white'
                                : 'text-slate-700 group-hover:text-slate-900'
                          }`}>
                            {item.name}
                          </span>
                          
                          {/* Active Indicator */}
                          {isActive && (
                            <div className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 ${item.neonColor.replace('text-', 'bg-')} rounded-full ${!isMobile ? 'animate-pulse' : ''}`}></div>
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Side Controls */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              
              {/* Theme Toggle */}
              {/* <button
                onClick={toggleTheme}
                aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
                className={`w-10 h-10 lg:w-11 lg:h-11 rounded-xl transition-all duration-300 hover:scale-110 flex items-center justify-center group ${
                  isDarkMode 
                    ? 'bg-slate-800/50 border-white/10 hover:border-yellow-400/50' 
                    : 'bg-white/70 border-slate-200/50 hover:border-yellow-500/50'
                } border`}
              >
                {isDarkMode ? (
                  <Sun className="w-4 h-4 lg:w-5 lg:h-5 text-yellow-400 group-hover:rotate-180 transition-transform duration-500" />
                ) : (
                  <Moon className="w-4 h-4 lg:w-5 lg:h-5 text-blue-600 group-hover:rotate-12 transition-transform duration-300" />
                )}
              </button> */}

              {/* Fullscreen Toggle */}
              
              <button
                onClick={toggleFullscreen}
                aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg transition-all duration-300 hover:scale-110 flex items-center justify-center group ${
                  isDarkMode 
                    ? 'bg-slate-800/50 border-white/10 hover:border-blue-400/50' 
                    : 'bg-white/70 border-slate-200/50 hover:border-blue-500/50'
                } border`}
              >
                {isFullscreen ? (
                  <Minimize className="w-3 h-3 lg:w-5 lg:h-5 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                ) : (
                  <Maximize className="w-4 h-4 lg:w-5 lg:h-5 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={toggleMobileMenu}
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                className={`lg:hidden w-10 h-10 rounded-xl transition-all duration-300 hover:scale-110 flex items-center justify-center group ${
                  isDarkMode 
                    ? 'bg-slate-800/50 border-white/10 hover:border-cyan-400/50' 
                    : 'bg-white/70 border-slate-200/50 hover:border-cyan-500/50'
                } border`}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-cyan-400 group-hover:rotate-90 transition-transform duration-300" />
                ) : (
                  <Menu className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Mobile Menu */}
        <div className={`lg:hidden transition-all duration-500 ease-out ${
          isMobileMenuOpen 
            ? 'max-h-screen' 
            : 'max-h-0 overflow-hidden'
        }`}>
          <div className={`transition-all duration-300 border-t ${
            isDarkMode 
              ? 'bg-slate-900/95 border-white/5' 
              : 'bg-white/95 border-slate-200/30'
          } backdrop-blur-2xl`}>
            <div className="max-w-7xl mx-auto px-4 py-6">
              
              {/* Mobile Logo Section */}
              <div className="flex items-center justify-center mb-8 sm:hidden">
                <div className="text-center">
                  <div className="text-2xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-1">
                    Lavudya Raja
                  </div>
                  <div className={`text-sm transition-colors duration-300 ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    Full Stack Developer
                  </div>
                </div>
              </div>

              {/* Mobile Navigation Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeItem === item.id;
                  
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavigation(item)}
                      // aria-label={`Navigate to ${item.name}`}
                      className={`
                        relative p-4 rounded-2xl transition-all duration-300 transform active:scale-95 border group min-h-[100px] flex flex-col items-center justify-center
                        ${isActive 
                          ? 'bg-gradient-to-br from-pink-500/20 to-purple-500/10 border-pink-400/30 shadow-xl shadow-pink-500/25' 
                          : isDarkMode
                            ? 'bg-slate-800/30 border-white/5 hover:bg-slate-700/50 hover:border-white/10'
                            : 'bg-slate-50/50 border-slate-200/30 hover:bg-slate-100/70 hover:border-slate-300/50'
                        }
                      `}
                    >
                      <div className="flex flex-col items-center justify-center space-y-3 h-full">
                        <div className={`p-3 rounded-xl transition-all duration-300 ${
                          isActive 
                            ? 'bg-pink-500/20' 
                            : isDarkMode
                              ? 'bg-slate-700/50 group-hover:bg-slate-600/50'
                              : 'bg-white/80 group-hover:bg-white'
                        }`}>
                          <Icon 
                            className={`w-6 h-6 transition-all duration-300 ${
                              isActive 
                                ? item.neonColor 
                                : isDarkMode
                                  ? 'text-slate-400 group-hover:text-white'
                                  : 'text-slate-600 group-hover:text-slate-800'
                            }`} 
                          />
                        </div>
                        <div className="text-center">
                          <span className={`text-sm font-medium block leading-tight transition-all duration-300 ${
                            isActive 
                              ? item.neonColor 
                              : isDarkMode
                                ? 'text-slate-300 group-hover:text-white'
                                : 'text-slate-700 group-hover:text-slate-900'
                          }`}>
                            {item.name}
                          </span>
                          <span className={`text-xs font-mono opacity-70 block mt-1 ${
                            isDarkMode ? 'text-slate-500' : 'text-slate-500'
                          }`}>
                            {/* {item.link} */}
                          </span>
                        </div>
                      </div>
                      
                      {/* Active Indicator */}
                      {isActive && (
                        <div className={`absolute top-2 right-2 w-2 h-2 ${item.neonColor.replace('text-', 'bg-')} rounded-full ${!isMobile ? 'animate-pulse' : ''}`}></div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Enhanced Particle System */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle, i) => (
          <div
            key={i}
            className={`absolute ${particle.size} ${particle.color} rounded-full ${!isMobile ? 'animate-pulse' : ''} opacity-30`}
            style={{
              left: particle.left,
              top: particle.top,
              animationDelay: particle.animationDelay,
              animationDuration: particle.animationDuration
            }}
          />
        ))}
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(-3deg); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(2deg); }
        }
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 10s ease-in-out infinite; }
      `}</style>
      
    </div>
  );
};

export default EnhancedFuturisticNavbar;