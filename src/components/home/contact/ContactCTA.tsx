'use client'

import React, { useState, useEffect } from 'react';
import { 
  Mail, Github, Linkedin, Twitter, Calendar, MapPin, Globe, Zap, 
  ChevronRight, Send, Phone, MessageCircle, ExternalLink, Rocket,
  Terminal, Code, Database, Cloud, Shield, Cpu, Wifi, Star
} from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

export default function ContactCTA() {
  const [activePortal, setActivePortal] = useState<number | null>(null);
  const [hoveredMethod, setHoveredMethod] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [connectionStrength, setConnectionStrength] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  const fullText = "PROJECT LAUNCH SEQUENCE";

  // Typing effect
  useEffect(() => {
    if (isTyping && typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, 100);
      return () => clearTimeout(timeout);
    } else if (typedText.length === fullText.length) {
      setIsTyping(false);
    }
  }, [typedText, isTyping]);

  // Track mouse for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Simulate connection strength animation
  useEffect(() => {
    const interval = setInterval(() => {
      setConnectionStrength(prev => (prev + 1) % 101);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      subtitle: "Digital Mail",
      value: "codeml862@gmail.com",
      action: "mailto:codeml862@gmail.com",
      color: "from-cyan-400 to-blue-500",
      bgColor: "bg-cyan-500/10",
      borderColor: "border-cyan-500/30",
      protocol: "SMTP",
      speed: "Light Speed"
    },
    {
      icon: Phone,
      title: "Call",
      subtitle: "Voice Channel",
      value: "+91 7093221536",
      action: "tel:+91 7093221536",
      color: "from-green-400 to-emerald-500",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/30",
      protocol: "GSM",
      speed: "Real-time"
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      subtitle: "Instant Protocol",
      value: "Chat Now",
      action: "https://wa.me/917093221536?text=Hi%20Raja%2C%20I%20visited%20your%20portfolio%20and%20would%20like%20to%20connect!",
      color: "from-purple-400 to-pink-500",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/30",
      protocol: "E2E Encrypted",
      speed: "Instant"
    },
    {
      icon: Calendar,
      title: "Schedule",
      subtitle: "Time Portal",
      value: "Calendly",
      action: "https://calendly.com/raja",
      color: "from-orange-400 to-red-500",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/30",
      protocol: "Sync API",
      speed: "Scheduled"
    }
  ];

  const pathname = usePathname();
  const router = useRouter();
  const isContactCTAPage = pathname === "/contact";

  return (
    <div className="relative bg-black overflow-hidden">
      {/* Dynamic Background Grid */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        {/* Animated Connection Lines */}
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.3 }}>
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ec4899" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          
          {/* Dynamic connection lines */}
          {[...Array(5)].map((_, i) => (
            <line
              key={i}
              x1={`${20 + i * 15}%`}
              y1="10%"
              x2={`${30 + i * 12}%`}
              y2="90%"
              stroke="url(#lineGradient)"
              strokeWidth="1"
              strokeDasharray="5,5"
              className="animate-pulse"
              style={{ animationDelay: `${i * 0.5}s` }}
            />
          ))}
        </svg>

        {/* Floating Nodes */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400 rounded-full animate-pulse"
            style={{
              left: `${10 + i * 12}%`,
              top: `${15 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.3}s`,
              boxShadow: '0 0 10px rgba(6, 182, 212, 0.5)'
            }}
          ></div>
        ))}
      </div>

      {/* Main Content */}
      <main className="relative z-10 px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto">
          
          {/* Unique Header Section */}
          <section className="text-center mb-12 sm:mb-16 lg:mb-20">
            {/* Futuristic Title */}
            <div className="relative mb-6 sm:mb-8">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white">
                <span className="relative">
                  <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    CONNECT
                  </span>
                  <span className="absolute -inset-1 bg-gradient-to-r from-cyan-400/20 via-purple-400/20 to-pink-400/20 rounded-lg blur-xl"></span>
                </span>
                <br />
                <span className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-gray-400">WITH THE FUTURE</span>
              </h1>
            </div>
            
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto mb-8 sm:mb-12 px-4">
              Initialize connection. Choose your protocol. Let's build something extraordinary together.
            </p>
          </section>

          {/* Unique Portal Design */}
          <section className="mb-12 sm:mb-16 lg:mb-20">
            <div className="relative">
              {/* Central Hub */}
              <div className="relative mx-auto w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 mb-8 sm:mb-12 lg:mb-16">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full animate-pulse opacity-30"></div>
                <div className="relative w-full h-full bg-gradient-to-r from-cyan-600 to-purple-600 rounded-full flex items-center justify-center border-4 border-white/20">
                  <Rocket className="w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 text-white animate-bounce" />
                </div>
                
                {/* Connection Rings */}
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute inset-0 border-2 border-cyan-400/30 rounded-full animate-ping"
                    style={{ animationDelay: `${i * 0.5}s`, animationDuration: '3s' }}
                  ></div>
                ))}
              </div>

              {/* Contact Portals arranged in responsive grid */}
              <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
                {contactMethods.map((method, index) => {
                  const IconComponent = method.icon;
                  const isActive = activePortal === index;
                  const isHovered = hoveredMethod === index;
                  
                  return (
                    <div
                      key={index}
                      className="relative group"
                      onMouseEnter={() => {
                        setHoveredMethod(index);
                        setActivePortal(index);
                      }}
                      onMouseLeave={() => {
                        setHoveredMethod(null);
                        setActivePortal(null);
                      }}
                    >
                      {/* Connection Line from Center - Only on larger screens */}
                      {isActive && (
                        <div className="hidden lg:block absolute top-1/2 left-1/2 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-transparent transform -translate-x-1/2 -translate-y-1/2 origin-left animate-pulse"></div>
                      )}
                      
                      {/* Portal Card */}
                      <a
                        href={method.action}
                        className={`relative block ${method.bgColor} backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border ${method.borderColor} transition-all duration-500 transform hover:scale-105 hover:rotate-1 overflow-hidden`}
                      >
                        {/* Scanning Effect */}
                        <div className={`absolute inset-0 bg-gradient-to-r ${method.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                        
                        {/* Portal Ring */}
                        <div className={`absolute -inset-1 sm:-inset-2 border-2 ${isActive ? 'border-cyan-400 animate-pulse' : 'border-transparent'} rounded-2xl sm:rounded-3xl transition-all duration-300`}></div>

                        {/* Content */}
                        <div className="relative z-10 text-center">
                          {/* Icon Portal */}
                          <div className={`relative w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mx-auto mb-4 sm:mb-6 bg-gradient-to-r ${method.color} rounded-xl sm:rounded-2xl flex items-center justify-center transform transition-all duration-500 ${isHovered ? 'rotate-180 scale-110' : ''}`}>
                            <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white" />
                            {isActive && (
                              <div className="absolute inset-0 border-2 border-white rounded-xl sm:rounded-2xl animate-ping"></div>
                            )}
                          </div>

                          {/* Protocol Info */}
                          <div className="mb-3 sm:mb-4">
                            <div className="text-xs text-gray-400 mb-1">{method.protocol}</div>
                            <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white mb-1">{method.title}</h3>
                            <div className="text-xs sm:text-sm text-gray-400">{method.subtitle}</div>
                          </div>
                          
                          {/* Value */}
                          <div className="text-sm sm:text-base font-medium text-white mb-2 sm:mb-3">{method.value}</div>
                          
                          {/* Speed Indicator */}
                          <div className="flex items-center justify-center gap-2">
                            <Zap className="w-3 h-3 text-yellow-400" />
                            <span className="text-xs text-gray-400">{method.speed}</span>
                          </div>

                          {/* Hover Effects */}
                          {isHovered && (
                            <div className="absolute inset-0 pointer-events-none">
                              <div className="absolute top-2 right-2">
                                <Star className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400 animate-spin" style={{ animationDuration: '2s' }} />
                              </div>
                              <div className="absolute bottom-2 left-2">
                                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-pulse"></div>
                              </div>
                            </div>
                          )}
                        </div>
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Unique CTA Section */}
          <section className="mb-16">
            <div className="relative max-w-4xl mx-auto">
              {/* Holographic Projector */}
              <div className="relative">
                {/* Projection Base */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-64 h-32 bg-gradient-to-t from-purple-600/20 to-transparent rounded-t-full blur-xl"></div>
                
                {/* Main Hologram Container */}
                <div className="relative bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-xl rounded-3xl border border-white/20 p-12 overflow-hidden">
                  
                  {/* Holographic Grid Effect */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="h-full w-full" style={{
                      backgroundImage: `
                        linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)
                      `,
                      backgroundSize: '30px 30px',
                      animation: 'grid-move 10s linear infinite'
                    }}></div>
                  </div>

                  {/* Floating Particles */}
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
                      style={{
                        left: `${10 + i * 15}%`,
                        top: `${20 + (i % 2) * 30}%`,
                        animationDelay: `${i * 0.5}s`,
                        boxShadow: '0 0 6px rgba(0, 255, 255, 0.8)'
                      }}
                    ></div>
                  ))}

                  {/* Content */}
                  <div className="relative z-10 text-center">
                    {/* Glitch Title */}
                    <div className="relative mb-8">
                      <h2 className="text-4xl font-bold text-white relative">
                        <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                          {typedText}
                          {isTyping && <span className="animate-pulse">|</span>}
                        </span>
                      </h2>
                      
                      {/* Scanning Line */}
                      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scan"></div>
                    </div>
                    
                    {/* Terminal-style Description */}
                    <div className="mb-10 font-mono">
                      <div className="text-green-400 text-sm mb-2">&gt; System ready...</div>
                      <div className="text-cyan-300 text-sm mb-2">&gt; Vision detected: [USER_PROJECT]</div>
                      <div className="text-purple-300 text-sm mb-2">&gt; Establishing secure connection...</div>
                      <div className="text-pink-300 text-sm animate-pulse">&gt; Awaiting deployment command...</div>
                    </div>

                    {/* Interactive Command Console */}
                    <div className="relative mb-8">
                      <div className="bg-black/50 border border-cyan-500/30 rounded-xl p-4 font-mono text-sm">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          <span className="text-green-400">SYSTEM ONLINE</span>
                          <span className="text-gray-400 ml-auto">v2.0.25</span>
                        </div>
                        
                        <div className="text-left space-y-2">
                          <div className="text-gray-300">
                            <span className="text-cyan-400">$</span> deploy --mode=production --target=success
                          </div>
                          <div className="text-green-400 animate-pulse">
                            ▸ Ready to execute deployment protocol
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons as Command Keys */}
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                      {/* Deploy Button */}
                      <Link href="/projects">
                        <button className="group relative px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-green-500/25 transform hover:scale-105 overflow-hidden">
                          {/* Button Content */}
                          <span className="relative z-10 flex items-center justify-center gap-3">
                            <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                              <span className="text-xs font-bold">▶</span>
                            </div>
                            <span>EXECUTE DEPLOY</span>
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          </span>
                          
                          {/* Hover Effects */}
                          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          
                          {/* Scanning Effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                        </button>
                      </Link>
                      
                      {/* Schedule Button */}
                      <button className="group relative px-8 py-4 border border-purple-500/50 text-purple-300 hover:border-purple-400 font-bold rounded-xl transition-all duration-300 transform hover:scale-105 backdrop-blur-sm overflow-hidden">
                        <span className="relative z-10 flex items-center gap-3">
                          <Calendar className="w-5 h-5 group-hover:animate-pulse" />
                          <span>SCHEDULE SYNC</span>
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                        </span>
                        
                        {/* Hover Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </button>
                    </div>

                    {/* System Metrics */}
                    <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                      <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                        <div className="text-xs text-gray-400 mb-1">STATUS</div>
                        <div className="text-sm font-bold text-green-400">READY</div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                        <div className="text-xs text-gray-400 mb-1">UPTIME</div>
                        <div className="text-sm font-bold text-cyan-400">99.9%</div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                        <div className="text-xs text-gray-400 mb-1">QUEUE</div>
                        <div className="text-sm font-bold text-purple-400">0</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          </div>
      </main>
    </div>
  );
}