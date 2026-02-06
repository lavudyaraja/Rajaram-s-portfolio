"use client";

import React, { useState, useEffect, useRef } from 'react';
import {
    Home,
    User,
    GraduationCap,
    Brain,
    FolderKanban,
    BookOpen,
    Award,
    Mail,
    Menu,
    X,
    Maximize2,
    Minimize2,
    ChevronRight,
    Grid3x3,
    Layers
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface NavItem {
    id: string;
    name: string;
    icon: React.ElementType;
    link: string;
    badge?: string;
    color?: string;
}

const HiddenNavbar: React.FC = () => {
    const [activeItem, setActiveItem] = useState<string>('home');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
    const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
    const [scrollProgress, setScrollProgress] = useState<number>(0);
    const [currentTime, setCurrentTime] = useState<string>('');
    const [isMenuExpanded, setIsMenuExpanded] = useState<boolean>(false);
    const [showNavbar, setShowNavbar] = useState<boolean>(false);
    const [showInitialMessage, setShowInitialMessage] = useState<boolean>(true);
    const lastScrollY = useRef<number>(0);
    const router = useRouter();

    const navItems: NavItem[] = [
        {
            id: 'home',
            name: 'Home',
            icon: Home,
            link: '/',
            color: 'from-blue-500 to-cyan-500'
        },
        {
            id: 'about',
            name: 'Profile',
            icon: User,
            link: '#about',
            color: 'from-purple-500 to-pink-500'
        },
        {
            id: 'education',
            name: 'Learning',
            icon: GraduationCap,
            link: '#education',
            color: 'from-indigo-500 to-blue-500',
            badge: '3'
        },
        {
            id: 'skills',
            name: 'Expertise',
            icon: Brain,
            link: '#skills',
            color: 'from-green-500 to-emerald-500'
        },
        {
            id: 'projects',
            name: 'Portfolio',
            icon: FolderKanban,
            link: '#projects',
            color: 'from-orange-500 to-red-500',
            badge: '12'
        },
        {
            id: 'blog',
            name: 'Articles',
            icon: BookOpen,
            link: '#blog',
            color: 'from-yellow-500 to-amber-500'
        },
        {
            id: 'certifications',
            name: 'Awards',
            icon: Award,
            link: '#certificates',
            color: 'from-pink-500 to-rose-500',
            badge: '5'
        },
        {
            id: 'contact',
            name: 'Connect',
            icon: Mail,
            link: '#contact',
            color: 'from-teal-500 to-cyan-500'
        },
    ];

    // Handle scroll behavior
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const scrollTop = currentScrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrollTop / docHeight) * 100;
            setScrollProgress(Math.min(100, Math.max(0, progress)));

            // Hide initial message after scrolling starts
            if (currentScrollY > 50) {
                setShowInitialMessage(false);
            }

            // Show navbar when scrolling starts (up or down), keep it visible
            if (currentScrollY > 10) {
                setShowNavbar(true);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Update current time
    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const time = now.toLocaleTimeString('en-US', {
                hour12: false,
                hour: '2-digit',
                minute: '2-digit'
            });
            setCurrentTime(time);
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    // Handle fullscreen change
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    // Set active item based on current URL
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const currentPath = window.location.pathname;
            const hash = window.location.hash;

            if (hash) {
                const matchedItem = navItems.find(item => item.link === hash);
                if (matchedItem) {
                    setActiveItem(matchedItem.id);
                    return;
                }
            }

            const matchedItem = navItems.find(item =>
                item.link === currentPath ||
                (currentPath !== '/' && item.link !== '/' && currentPath.includes(item.link))
            );

            if (matchedItem) {
                setActiveItem(matchedItem.id);
            }
        }
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

    const handleNavigation = (item: NavItem) => {
        setActiveItem(item.id);
        setIsMobileMenuOpen(false);

        if (item.link.startsWith('#')) {
            const element = document.querySelector(item.link);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            router.push(item.link);
        }
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const toggleMenuExpansion = () => {
        setIsMenuExpanded(!isMenuExpanded);
    };

    return (
        <>
            {/* Initial Welcome Message */}
            {showInitialMessage && (
                <div className="fixed top-0 left-0 right-0 z-40 bg-black transition-all duration-500">
                <div className="max-w-7xl py-4 sm:py-5">

                    <div className="relative flex flex-col md:flex-row items-center justify-center gap-0 md:gap-10 text-center animate-scroll-left">

                    {/* Left Text – FULL WIDTH, NEVER CUT */}
                    <h1
                        className="w-full md:w-auto text-base sm:text-xl md:text-2xl lg:text-3xl font-semibold
                        bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 to-green-400
                        bg-clip-text text-transparent
                        drop-shadow-md
                        animate-gradient-shift
                        text-center md:text-left"
                    >
                        Thank you for visiting Rajaram&apos;s Portfolio
                    </h1>

                    {/* Center Hand + Line (ABSOLUTE, DESKTOP ONLY) */}
                    {/* {!isMenuExpanded && (
                        <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 flex-col items-center">
                        <span className="text-xl animate-bounce">👉</span>
                        <span
                            className="mt-0.5 h-[2px] w-12 rounded-full
                            bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400
                            shadow-md"
                        />
                        </div>
                    )} */}

                    {/* Right Text */}
                    <p
                        className=" md:w-auto text-base sm:text-xl md:text-2xl lg:text-3xl font-semibold
                        bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 to-green-400
                        bg-clip-text text-transparent
                        drop-shadow-md
                        animate-gradient-shift
                        text-center "
                    >
                        Have a nice day
                    </p>
                    </div>
                </div>
                </div>
            )}

            {/* Progress Bar - Always visible */}
            <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-800">
                <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
                    style={{ width: `${scrollProgress}%` }}
                />
            </div>

            {/* Hidden Navigation - Appears on scroll */}
            <nav className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-500 transform
        ${showNavbar
                    ? 'translate-y-0 opacity-100'
                    : '-translate-y-full opacity-0'
                }
      `}>

                {/* Top Utility Bar */}
                <div className="bg-black/90 border-b border-gray-800 px-4 py-2 text-xs font-mono text-gray-400">
                    <div className="max-w-7xl mx-auto flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <span className="flex items-center space-x-1">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                <span>System Online</span>
                            </span>
                            <span>|</span>
                            <span>{currentTime}</span>
                            <span>|</span>
                            <span>Scroll: {Math.round(scrollProgress)}%</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span>{isFullscreen ? 'Fullscreen' : 'Windowed'}</span>
                        </div>
                    </div>
                </div>

                {/* Main Navigation Content */}
                <div className="bg-black border-b border-gray-800 shadow-lg">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="flex items-center justify-between h-16">

                            {/* Logo Section */}
                            <div className="flex items-center space-x-4">
                                <button
                                    onClick={() => handleNavigation(navItems[0])}
                                    className="group flex items-center space-x-3"
                                >
                                    <div className="relative">
                                        <div className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center group-hover:bg-gray-700 transition-all duration-300">
                                            <Grid3x3 className="w-6 h-6 text-gray-300 group-hover:text-white transition-colors duration-300" />
                                        </div>
                                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                                    </div>
                                    <div className="hidden md:block">
                                        <div className="text-lg font-bold text-white">
                                            Portfolio
                                        </div>
                                        <div className="text-xs font-mono text-gray-500">
                                            Professional
                                        </div>
                                    </div>
                                </button>

                                {/* Expand/Collapse Button */}
                                <button
                                        onClick={toggleMenuExpansion}
                                        className="hidden lg:flex items-center px-3 py-1.5 rounded-lg
                                                    bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400
                                                    bg-clip-text text-transparent
                                                    hover:from-cyan-400 hover:via-blue-400 hover:to-green-400
                                                    transition-all duration-300"
                                        title="Toggle Navigation"
                                        >
                                        View
                                        </button>  
                                   </div>

                            {/* Center Navigation */}
                            <div className={`
                hidden lg:flex items-center space-x-1 transition-all duration-300
                ${isMenuExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'}
              `}>
                                {navItems.map((item) => {
                                    const Icon = item.icon;
                                    const isActive = activeItem === item.id;

                                    return (
                                        <button
                                            key={item.id}
                                            onClick={() => handleNavigation(item)}
                                            className={`
                        relative flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 group
                        ${isActive
                                                    ? 'bg-gradient-to-r ' + item.color + ' text-white shadow-lg'
                                                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                                                }
                      `}
                                        >
                                            <Icon className="w-4 h-4" />
                                            <span className="text-sm font-medium">{item.name}</span>

                                            {item.badge && (
                                                <span className={`
                          px-1.5 py-0.5 text-xs rounded-full font-bold
                          ${isActive
                                                        ? 'bg-black text-white'
                                                        : 'bg-gray-700 text-gray-300'
                                                    }
                        `}>
                                                    {item.badge}
                                                </span>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Right Controls */}
                            <div className="flex items-center space-x-2">
                                {/* Fullscreen Toggle */}
                                <button
                                    onClick={toggleFullscreen}
                                    className="w-10 h-10 rounded-xl bg-gray-800 hover:bg-gray-700 text-blue-400 flex items-center justify-center transition-all duration-200"
                                >
                                    {isFullscreen ? (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                                        </svg>
                                    )}
                                </button>

                                {/* Mobile Menu Toggle */}
                                <button
                                    onClick={toggleMobileMenu}
                                    className="lg:hidden w-10 h-10 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-400 flex items-center justify-center transition-all duration-200"
                                >
                                    {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div className={`
          lg:hidden transition-all duration-300 bg-black border-t border-gray-800
          ${isMobileMenuOpen
                        ? 'max-h-96 opacity-100'
                        : 'max-h-0 opacity-0 overflow-hidden'
                    }
        `}>
                    <div className="px-4 py-4">
                        <div className="grid grid-cols-2 gap-2">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = activeItem === item.id;

                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => handleNavigation(item)}
                                        className={`
                      relative p-3 rounded-xl flex flex-col items-center space-y-2 transition-all duration-200
                      ${isActive
                                                ? 'bg-gradient-to-r ' + item.color + ' text-white'
                                                : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                                            }
                    `}
                                    >
                                        <Icon className="w-6 h-6" />
                                        <span className="text-xs font-medium">{item.name}</span>

                                        {item.badge && (
                                            <span className="absolute top-2 right-2 px-1.5 py-0.5 text-xs rounded-full font-bold bg-black">
                                                {item.badge}
                                            </span>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Custom Animations */}
            <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(100%); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateX(-100%); opacity: 0; }
        }
        
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-scroll-left { 
          animation: scroll-left 12s ease-in-out infinite; 
        }
        
        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 4s ease infinite;
        }
      `}</style>
        </>
    );
};

export default HiddenNavbar;
