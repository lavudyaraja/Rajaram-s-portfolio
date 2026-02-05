import { ArrowRight, Download, Code, Globe, Zap, Star, Sparkles, ChevronDown, Play, Github, Linkedin, Twitter, MessageCircle, Mail, MapPin, Calendar, MousePointer, Terminal, Rocket, Cpu, Layers, Command, Shield, Activity, Database, Cloud, Smartphone, Monitor, Code2, GitBranch, Package, Lock, Trophy, Target, TrendingUp, Users, Award, Clock, Flame, Heart } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";

export default function ModernHero() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentText, setCurrentText] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [typedText, setTypedText] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [activeCommand, setActiveCommand] = useState(0);
  const [projectCount, setProjectCount] = useState(15);
  const [codeLines, setCodeLines] = useState(50000);
  const [commits, setCommits] = useState(1200);
  const [stars, setStars] = useState(89);
  const [clients, setClients] = useState(12);
  const [awards, setAwards] = useState(5);
  const [experience, setExperience] = useState(2.5);
  const [satisfaction, setSatisfaction] = useState(98);
  const [activeProjects, setActiveProjects] = useState(3);
  const [technologies, setTechnologies] = useState(25);
  const [caffeine, setCaffeine] = useState(127);
  const [bugs, setBugs] = useState(0);
  const [currentQuote, setCurrentQuote] = useState(0);
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<any[]>([]);
  const animationRef = useRef<number>();

  const rotatingTexts = [
    "Full-Stack Architect",
    "AI Engineer", 
    "Creative Technologist",
    "Digital Innovator"
  ];

  const quotes = [
    "Code is like humor. When you have to explain it, it's bad.",
    "The best way to predict the future is to invent it.",
    "Simplicity is the soul of efficiency.",
    "First, solve the problem. Then, write the code.",
    "Experience is the name everyone gives to their mistakes."
  ];

  const commands = [
    { cmd: "whoami", output: "Lavudya Rajaram | Full-Stack Developer & AI Engineer" },
    { cmd: "ls -la /skills/", output: "React.js  Node.js  Python  TypeScript  AI/ML  AWS" },
    { cmd: "cat projects.json", output: "15+ projects completed across web, mobile, and AI domains" },
    { cmd: "systemctl status", output: "✓ Available for exciting opportunities" },
    { cmd: "ml-models --list", output: "TensorFlow  PyTorch  Scikit-learn  Keras  OpenAI  HuggingFace  FastAPI" }
  ];

  const currentRole = rotatingTexts[currentText];

  // Advanced canvas animation with particle connections
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Initialize particles directly in the effect
    const initParticles = () => {
      const particles = [];
      const particleCount = isMobile ? 40 : 80; // Reduce particles on mobile for performance
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          size: Math.random() * 3 + 1,
          color: `rgba(${Math.floor(Math.random() * 100 + 59)}, ${Math.floor(Math.random() * 100 + 130)}, ${Math.floor(Math.random() * 100 + 246)}, 0.6)`,
          connections: []
        });
      }
      return particles;
    };

    if (particlesRef.current.length === 0) {
      particlesRef.current = initParticles();
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const particles = particlesRef.current;
      
      // Update and draw particles
      particles.forEach((particle, i) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        
        // Draw connections (skip on mobile for performance)
        if (!isMobile) {
          particles.slice(i + 1).forEach(otherParticle => {
            const distance = Math.sqrt(
              Math.pow(particle.x - otherParticle.x, 2) + 
              Math.pow(particle.y - otherParticle.y, 2)
            );
            
            if (distance < 150) {
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.strokeStyle = `rgba(59, 130, 246, ${0.2 * (1 - distance / 150)})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          });
        }
        
        // Mouse interaction (desktop only)
        if (!isMobile) {
          const mouseDistance = Math.sqrt(
            Math.pow(particle.x - mousePosition.x, 2) + 
            Math.pow(particle.y - mousePosition.y, 2)
          );
          
          if (mouseDistance < 100) {
            const angle = Math.atan2(particle.y - mousePosition.y, particle.x - mousePosition.x);
            particle.vx += Math.cos(angle) * 0.2;
            particle.vy += Math.sin(angle) * 0.2;
          }
        }
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particlesRef.current = initParticles();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mousePosition, isMobile]);

  useEffect(() => {
    setIsVisible(true);
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const handleMouseMove = (e: any) => {
      if (!isMobile) {
        setMousePosition({ x: e.clientX, y: e.clientY });
      }
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    const textInterval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % rotatingTexts.length);
      setCharIndex(0);
      setTypedText("");
    }, 4000);

    const commandInterval = setInterval(() => {
      setActiveCommand((prev) => (prev + 1) % commands.length);
    }, 3000);

    const quoteInterval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 8000);

    // Hero stats simulation
    const statsInterval = setInterval(() => {
      setProjectCount(prev => prev + Math.floor(Math.random() * 3));
      setCodeLines(prev => prev + Math.floor(Math.random() * 100));
      setCommits(prev => prev + Math.floor(Math.random() * 5));
      if (Math.random() > 0.7) {
        setStars(prev => prev + 1);
      }
      if (Math.random() > 0.8) {
        setClients(prev => prev + 1);
      }
      setExperience(prev => Math.min(10, prev + 0.1));
      setSatisfaction(prev => Math.min(100, Math.max(95, prev + (Math.random() - 0.5) * 2)));
      setActiveProjects(prev => Math.max(1, prev + (Math.random() - 0.3) * 2));
      setTechnologies(prev => prev + Math.floor(Math.random() * 2));
      setCaffeine(prev => Math.min(999, prev + Math.floor(Math.random() * 5)));
      if (Math.random() > 0.95) {
        setBugs(prev => prev + 1);
      }
    }, 3000);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      clearInterval(textInterval);
      clearInterval(commandInterval);
      clearInterval(quoteInterval);
      clearInterval(statsInterval);
    };
  }, [isMobile, rotatingTexts.length]);

  const handleDownloadCV = () => {
    // Create a link element and trigger download
    const link = document.createElement('a');
    link.href = '/Rajaram-resume.pdf'; // Path to the resume file in public folder
    link.download = 'Lavudya_Rajaram_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleViewProjects = () => {
    // Smooth scroll to projects section
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Typing effect
  useEffect(() => {
    if (charIndex < currentRole.length) {
      const timeout = setTimeout(() => {
        setTypedText(prev => prev + currentRole[charIndex]);
        setCharIndex(prev => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, currentRole]);

  return (
    <section className="relative bg-black overflow-hidden">
      {/* Particle Canvas */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 1 }}
      />
      
      {/* Advanced Background */}
      <div className="absolute inset-0" style={{ zIndex: 2 }}>
        {/* Animated Grid */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: isMobile ? '30px 30px' : '50px 50px',
            transform: isMobile ? 'none' : `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
          }}
        ></div>
        
        {/* Radial Gradient Overlay */}
        {!isMobile && (
          <div 
            className="absolute inset-0 opacity-50"
            style={{
              background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.1) 0%, transparent 50%)`
            }}
          ></div>
        )}
        
        {/* Floating Orbs - Smaller on mobile - Removed glow effects */}
        <div className={`absolute ${isMobile ? 'top-10 left-10 w-48 h-48' : 'top-20 left-20 w-96 h-96'} bg-blue-500/10 rounded-full blur-2xl animate-float`}></div>
        <div className={`absolute ${isMobile ? 'top-20 right-16 w-48 h-48' : 'top-40 right-32 w-96 h-96'} bg-purple-500/10 rounded-full blur-2xl animate-float-delay`}></div>
        <div className={`absolute ${isMobile ? 'bottom-16 left-1/4 w-48 h-48' : 'bottom-32 left-1/3 w-96 h-96'} bg-cyan-500/10 rounded-full blur-2xl animate-float-slow`}></div>
        <div className={`absolute ${isMobile ? 'bottom-20 right-10 w-48 h-48' : 'bottom-40 right-20 w-96 h-96'} bg-pink-500/10 rounded-full blur-2xl animate-float-delay-slow`}></div>
        
        {/* Geometric Shapes - Hidden on mobile for simplicity */}
        {!isMobile && (
          <>
            <div 
              className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-blue-500/20 rotate-45 animate-spin-slow"
              style={{ transform: `rotate(45deg) rotateX(${scrollY * 0.1}deg)` }}
            ></div>
            <div 
              className="absolute top-1/3 right-1/4 w-24 h-24 border-2 border-purple-500/20 animate-spin-slow"
              style={{ transform: `rotate(${scrollY * 0.05}deg)` }}
            ></div>
            <div 
              className="absolute bottom-1/3 left-1/3 w-28 h-28 border-2 border-cyan-500/20 rotate-45 animate-spin-slow"
              style={{ transform: `rotate(45deg) rotateY(${scrollY * 0.1}deg)` }}
            ></div>
          </>
        )}
      </div>

      <div className={`relative z-10 flex items-center ${
        isMobile ? 'px-5 py-12 pt-20' : 'px-8 py-16'
      }`}>
        <div className="max-w-7xl mx-auto w-full">
          <div className={`grid gap-8 lg:gap-12 ${
            isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'
          }`}>
            
            {/* Left Content */}
            <div className={`space-y-6 md:space-y-8 ${
              isVisible ? 'animate-fade-in-left' : 'opacity-0'
            }`}>
              {/* Advanced Badge */}
              <div className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 backdrop-blur-sm relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <div className="relative flex items-center gap-2 md:gap-3">
                  <div className="w-2 h-2 md:w-3 md:h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 font-medium text-xs md:text-sm">Available for Work</span>
                  <Shield className="w-3 h-3 md:w-4 md:h-4 text-green-400" />
                </div>
              </div>

              {/* Advanced Title */}
              <div className="space-y-4 md:space-y-6">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="flex items-center gap-1.5 md:gap-2">
                    <div className="w-3 h-3 md:w-4 md:h-4 bg-blue-400 rounded-full animate-pulse"></div>
                    <div className="w-3 h-3 md:w-4 md:h-4 bg-purple-400 rounded-full animate-pulse delay-100"></div>
                    <div className="w-3 h-3 md:w-4 md:h-4 bg-pink-400 rounded-full animate-pulse delay-200"></div>
                  </div>
                  <Activity className="w-4 h-4 md:w-5 md:h-5 text-blue-400 animate-pulse" />
                </div>
                
                <h1 className={`font-black leading-tight ${
                  isMobile ? 'text-4xl sm:text-5xl' : 'text-6xl md:text-7xl lg:text-8xl'
                }`}>
                  <span className="block text-white mb-2">Building the</span>
                  <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
                    Digital Future
                  </span>
                </h1>

                {/* Advanced Typing Effect */}
                <div className="flex flex-wrap items-center gap-2 md:gap-3">
                  <Command className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
                  <span className="text-gray-400 text-base md:text-lg">I'm a</span>
                  <div className="relative">
                    <span className="text-lg md:text-xl font-bold text-blue-400">
                      {typedText}
                    </span>
                    <span className="absolute -right-4 md:-right-6 top-0 w-3 h-3 md:w-4 md:h-4 bg-blue-400 rounded-full animate-pulse"></span>
                  </div>
                </div>
              </div>

              {/* Enhanced Description */}
              <div className="relative pl-4 md:pl-0">
                <p className={`text-gray-300 leading-relaxed ${
                  isMobile ? 'text-base' : 'text-lg md:text-xl'
                }`}>
                  Passionate about creating exceptional digital experiences that blend creativity with cutting-edge technology. 
                  I transform complex problems into elegant, user-friendly solutions that make a difference.
                </p>
                <div className="absolute left-0 md:-left-4 top-0 w-1 h-full bg-gradient-to-b from-blue-400 to-purple-400 rounded-full"></div>
              </div>

              {/* Advanced CTA Buttons */}
              <div className={`flex gap-3 md:gap-4 ${
                isMobile ? 'flex-col' : 'flex-row'
              }`}>
                <button 
                  onClick={handleViewProjects}
                  className={`group relative px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl md:rounded-2xl font-bold text-white overflow-hidden transform hover:scale-105 transition-all duration-300 ${
                    isMobile ? 'w-full text-sm' : 'text-base'
                  }`}>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  <span className="relative flex items-center justify-center gap-2 md:gap-3">
                    <Rocket className="w-5 h-5 md:w-6 md:h-6" />
                    View Projects
                    <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                </button>
                
                <button 
                  onClick={handleDownloadCV}
                  className={`group relative px-6 md:px-8 py-3 md:py-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-xl md:rounded-2xl font-bold text-white hover:bg-white/20 transition-all duration-300 transform hover:scale-105 ${
                    isMobile ? 'w-full text-sm' : 'text-base'
                  }`}>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative flex items-center justify-center gap-2 md:gap-3">
                    <Download className="w-5 h-5 md:w-6 md:h-6 text-blue-400 group-hover:animate-bounce" />
                    Download CV
                  </span>
                </button>
              </div>

              {/* Enhanced Social Links */}
              <div className={`flex items-center gap-4 md:gap-6 ${
                isMobile ? 'flex-col items-start' : 'flex-row'
              }`}>
                <span className={`text-gray-500 text-xs md:text-sm font-medium ${
                  isMobile ? '' : ''
                }`}>Connect:</span>
                <div className={`flex gap-3 ${
                  isMobile ? 'justify-start' : ''
                }`}>
                  {[
                    { icon: Github, href: "https://github.com/lavudyaraja", color: "hover:bg-gray-800" },
                    { icon: Linkedin, href: "https://www.linkedin.com/in/lavudyaraja5228/", color: "hover:bg-blue-600" },
                    { icon: Twitter, href: "https://x.com/LavudyaRaj22988", color: "hover:bg-cyan-600" },
                    { icon: MessageCircle, href: "mailto:codeml862@gmail.com", color: "hover:bg-green-600" }
                  ].map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className={`w-10 h-10 md:w-12 md:h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 ${social.color}`}
                    >
                      <social.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Content - Ultra-Advanced Terminal */}
            <div className={`flex items-center justify-center ${
              isVisible ? 'animate-fade-in-right' : 'opacity-0'
            } ${isMobile ? 'mt-8' : ''}`}>
              <div className={`relative w-full ${
                isMobile ? 'max-w-none' : 'max-w-lg'
              }`}>
                
                {/* Ultra-Advanced Terminal */}
                <div className={`relative bg-black/80 backdrop-blur-2xl border border-white/20 rounded-2xl md:rounded-3xl overflow-hidden ${
                  isMobile ? 'p-4' : 'p-6 md:p-8'
                }`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 pointer-events-none"></div>
                  
                  {/* Enhanced Terminal Header */}
                  <div className={`flex items-center justify-between mb-4 relative z-10 ${
                    isMobile ? 'mb-3' : 'md:mb-6'
                  }`}>
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-red-500 rounded-full hover:bg-red-400 transition-colors cursor-pointer"></div>
                      <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-yellow-500 rounded-full hover:bg-yellow-400 transition-colors cursor-pointer"></div>
                      <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-green-500 rounded-full hover:bg-green-400 transition-colors cursor-pointer"></div>
                    </div>
                    <span className="text-gray-400 text-xs md:text-sm font-mono truncate max-w-[120px] md:max-w-none">
                      portfolio@Rajaram:~$
                    </span>
                    <div className="flex items-center gap-2 md:gap-3">
                      <Code2 className="w-3 h-3 md:w-4 md:h-4 text-blue-400" />
                      <GitBranch className="w-3 h-3 md:w-4 md:h-4 text-green-400" />
                      {!isMobile && <Package className="w-3 h-3 md:w-4 md:h-4 text-purple-400" />}
                      {!isMobile && <Lock className="w-3 h-3 md:w-4 md:h-4 text-gray-400" />}
                    </div>
                  </div>

                  {/* Enhanced Hero Stats Bar */}
                  <div className="mb-3 md:mb-4 p-2.5 md:p-3 bg-white/5 rounded-lg border border-white/10">
                    <div className={`grid gap-2 md:gap-3 text-xs ${
                      isMobile ? 'grid-cols-2' : 'grid-cols-4'
                    }`}>
                      <div className="flex items-center gap-1.5 md:gap-2">
                        <Rocket className="w-3 h-3 text-blue-400 flex-shrink-0" />
                        <span className="text-gray-400 truncate">Projects:</span>
                        <span className="text-white font-mono">{projectCount}</span>
                      </div>
                      <div className="flex items-center gap-1.5 md:gap-2">
                        <Code2 className="w-3 h-3 text-green-400 flex-shrink-0" />
                        <span className="text-gray-400 truncate">Lines:</span>
                        <span className="text-white font-mono">{(codeLines / 1000).toFixed(1)}k</span>
                      </div>
                      <div className="flex items-center gap-1.5 md:gap-2">
                        <GitBranch className="w-3 h-3 text-purple-400 flex-shrink-0" />
                        <span className="text-gray-400 truncate">Commits:</span>
                        <span className="text-white font-mono">{commits}</span>
                      </div>
                      <div className="flex items-center gap-1.5 md:gap-2">
                        <Star className="w-3 h-3 text-yellow-400 flex-shrink-0" />
                        <span className="text-gray-400 truncate">Stars:</span>
                        <span className="text-white font-mono">{stars}</span>
                      </div>
                    </div>
                    <div className={`mt-2 text-xs text-gray-500 font-mono ${
                      isMobile ? 'text-center text-[10px]' : ''
                    }`}>
                      Full-Stack Developer | AI Engineer | Creative Technologist
                    </div>
                  </div>
  
                  {/* Terminal Content */}
                  <div className="space-y-3 md:space-y-4 font-mono text-xs md:text-sm relative z-10">
                    {commands.map((command, index) => (
                      <div 
                        key={index}
                        className={`space-y-1.5 md:space-y-2 transition-all duration-500 ${
                          index === activeCommand ? 'opacity-100 transform scale-105' : 'opacity-50'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-green-400">$</span>
                          <span className="text-gray-300 truncate">{command.cmd}</span>
                          {index === activeCommand && (
                            <span className="w-1.5 h-3 md:w-2 md:h-4 bg-blue-400 animate-pulse flex-shrink-0"></span>
                          )}
                        </div>
                        <div className="ml-4 md:ml-6 text-blue-400 text-[10px] md:text-xs break-words">{command.output}</div>
                      </div>
                    ))}
                    
                    <div className="flex items-center gap-2">
                      <span className="text-green-400 animate-pulse">$</span>
                      <span className="text-gray-300 animate-pulse">_</span>
                    </div>
                  </div>
                </div>

                {/* Ultra-Advanced Floating Tech Icons - Adjusted for mobile - Removed glow effects */}
                <div className={`absolute ${isMobile ? '-top-6 -left-6 w-12 h-12' : '-top-12 -left-12 w-20 h-20'} bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl md:rounded-3xl flex items-center justify-center animate-float-slow`}>
                  <Code className={`${isMobile ? 'w-6 h-6' : 'w-10 h-10'} text-white`} />
                </div>
                
                <div className={`absolute ${isMobile ? '-top-4 -right-4 w-10 h-10' : '-top-8 -right-8 w-16 h-16'} bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl md:rounded-2xl flex items-center justify-center animate-float`}>
                  <Cpu className={`${isMobile ? 'w-5 h-5' : 'w-8 h-8'} text-white`} />
                </div>
                
                <div className={`absolute ${isMobile ? '-bottom-6 -left-6 w-11 h-11' : '-bottom-10 -left-10 w-18 h-18'} bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl md:rounded-3xl flex items-center justify-center animate-float-delay`}>
                  <Layers className={`${isMobile ? 'w-5 h-5' : 'w-9 h-9'} text-white`} />
                </div>
                
                <div className={`absolute ${isMobile ? '-bottom-4 -right-6 w-9 h-9' : '-bottom-8 -right-12 w-14 h-14'} bg-gradient-to-br from-orange-500 to-red-500 rounded-xl md:rounded-2xl flex items-center justify-center animate-float-slow`}>
                  <Terminal className={`${isMobile ? 'w-4 h-4' : 'w-7 h-7'} text-white`} />
                </div>

                {/* Additional Floating Elements - Hidden on small mobile */}
                {!isMobile && (
                  <>
                    <div className="absolute top-1/2 -left-16 w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-xl flex items-center justify-center animate-spin-slow">
                      <Smartphone className="w-6 h-6 text-white" />
                    </div>
                    
                    <div className="absolute top-1/3 -right-16 w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-lg flex items-center justify-center animate-float">
                      <Globe className="w-5 h-5 text-white" />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ultra-Advanced Custom CSS */}
      <style>{`
        @keyframes float-delay-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(-3deg); }
        }
        @keyframes float-delay {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(-5deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(5deg); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes fade-in-left {
          from { opacity: 0; transform: translateX(-100px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fade-in-right {
          from { opacity: 0; transform: translateX(100px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.5); }
          50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.8); }
        }
        @keyframes rotate-3d {
          0% { transform: rotateX(0deg) rotateY(0deg); }
          50% { transform: rotateX(180deg) rotateY(180deg); }
          100% { transform: rotateX(360deg) rotateY(360deg); }
        }
        .animate-float { animation: float 8s ease-in-out infinite; }
        .animate-float-delay { animation: float-delay 10s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 12s ease-in-out infinite; }
        .animate-float-delay-slow { animation: float-delay-slow 15s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
        .animate-fade-in-left { animation: fade-in-left 1.2s ease-out; }
        .animate-fade-in-right { animation: fade-in-right 1.2s ease-out 0.4s; }
        .animate-fade-in-up { animation: fade-in-up 1.2s ease-out; }
        .animate-gradient { animation: gradient 4s ease infinite; background-size: 200% 200%; }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
        .animate-rotate-3d { animation: rotate-3d 10s linear infinite; }
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        .animation-delay-600 { animation-delay: 0.6s; }
        .animation-delay-800 { animation-delay: 0.8s; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        
        /* Mobile-specific optimizations */
        @media (max-width: 768px) {
          .animate-float { animation: float 6s ease-in-out infinite; }
          .animate-float-delay { animation: float-delay 7s ease-in-out infinite; }
          .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
          .animate-float-delay-slow { animation: float-delay-slow 9s ease-in-out infinite; }
        }
      `}</style>
    </section>
  );
}