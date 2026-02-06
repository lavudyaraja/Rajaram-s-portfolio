import { ArrowRight, Download, Code, Globe, Zap, Star, Sparkles, Network,Server, ChevronDown, Play, Github, Linkedin, Twitter, MessageCircle, Mail, MapPin, Calendar, MousePointer, Terminal, Rocket, Cpu, Layers, Command, Shield, Activity, Database, Cloud, Smartphone, Monitor, Code2, GitBranch, Package, Lock, Trophy, Target, Users, Award, Clock, Flame, Heart, Hexagon, Wifi, Atom, CircuitBoard, Dna, Box, Globe2, Palette, Bot, Gamepad2, Music, Camera, Film, BookOpen, Lightbulb, Gauge, BarChart3, PieChart, TrendingUp, Brain, Eye, EyeOff } from "lucide-react";
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
  const [activeSkill, setActiveSkill] = useState(0);
  const [matrixRain, setMatrixRain] = useState<string[][]>([]);
  const [glitchEffect, setGlitchEffect] = useState(false);
  const [hologramActive, setHologramActive] = useState(false);
  const [neuralNetworkActive, setNeuralNetworkActive] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<any[]>([]);
  const animationRef = useRef<number | undefined>(undefined);
  const matrixCanvasRef = useRef<HTMLCanvasElement>(null);

  const rotatingTexts = [
    "Full Stack Developer",
    "Software Engineer", 
    "Machine Learning ",
    "Deep Learning"
  ];

 const quotes = [
  "I build systems the hard way, because shortcuts never scale.",
  "Real learning begins when tutorials end and problems start.",
  "I don't wait for opportunities, I engineer them.",
  "Every bug teaches something no course ever will.",
  "Building from zero is painful, but that's where real skill is forged."
];


const neuralSkills = [
  { name: "Machine Learning", level: 90, color: "from-blue-400 to-cyan-400", icon: Brain },
  { name: "Deep Learning (CNN & ViT)", level: 88, color: "from-purple-400 to-indigo-400", icon: Atom },
  { name: "Computer Vision", level: 86, color: "from-green-400 to-emerald-400", icon: Eye },
  { name: "RAG & LLM Systems", level: 82, color: "from-pink-400 to-rose-400", icon: Network },
  { name: "Full-Stack Development", level: 89, color: "from-orange-400 to-red-400", icon: Code },
  { name: "API & Backend Engineering", level: 84, color: "from-indigo-400 to-purple-400", icon: Server }
];


 const commands = [
  { 
    cmd: "train_model --vit-efficientnet", 
    output: "Training complete: 98.0% validation accuracy achieved" 
  },
  { 
    cmd: "rag_pipeline --query", 
    output: "Top 5 relevant document chunks retrieved successfully" 
  },
  { 
    cmd: "api_server --start", 
    output: "FastAPI server running on http://localhost:8000" 
  },
  { 
    cmd: "evaluate_model --test-set", 
    output: "Inference optimized: latency reduced by 15%" 
  },
  { 
    cmd: "deploy_app --vercel", 
    output: "Deployment successful: production build live" 
  }
];


  const currentRole = rotatingTexts[currentText];

  // Matrix Rain Effect
  useEffect(() => {
    const canvas = matrixCanvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
    const matrixArray = matrix.split("");
    const fontSize = 10;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
    }

    const drawMatrix = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#0F0';
      ctx.font = fontSize + 'px monospace';
      
      for (let i = 0; i < drops.length; i++) {
        const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const matrixInterval = setInterval(drawMatrix, 35);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearInterval(matrixInterval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Enhanced particle system with neural connections
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const initParticles = () => {
      const particles = [];
      const particleCount = isMobile ? 30 : 60;
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 1.2,
          vy: (Math.random() - 0.5) * 1.2,
          size: Math.random() * 4 + 1,
          color: `hsl(${Math.random() * 60 + 200}, 100%, 50%)`,
          connections: [],
          pulsePhase: Math.random() * Math.PI * 2
        });
      }
      return particles;
    };

    if (particlesRef.current.length === 0) {
      particlesRef.current = initParticles();
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const particles = particlesRef.current;
      
      particles.forEach((particle, i) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.pulsePhase += 0.05;
        
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        
        const pulseSize = Math.max(0.5, particle.size + Math.sin(particle.pulsePhase) * 2);
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, pulseSize, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        
        // Neural network connections
        if (!isMobile) {
          particles.slice(i + 1).forEach(otherParticle => {
            const distance = Math.sqrt(
              Math.pow(particle.x - otherParticle.x, 2) + 
              Math.pow(particle.y - otherParticle.y, 2)
            );
            
            if (distance < 120) {
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              const opacity = (1 - distance / 120) * 0.3;
              ctx.strokeStyle = `rgba(0, 255, 255, ${opacity})`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          });
        }
        
        // Mouse interaction
        if (!isMobile) {
          const mouseDistance = Math.sqrt(
            Math.pow(particle.x - mousePosition.x, 2) + 
            Math.pow(particle.y - mousePosition.y, 2)
          );
          
          if (mouseDistance < 150) {
            const angle = Math.atan2(particle.y - mousePosition.y, particle.x - mousePosition.x);
            const force = (150 - mouseDistance) / 150;
            particle.vx += Math.cos(angle) * force * 0.5;
            particle.vy += Math.sin(angle) * force * 0.5;
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

    const skillInterval = setInterval(() => {
      setActiveSkill((prev) => (prev + 1) % neuralSkills.length);
    }, 2000);

    const glitchInterval = setInterval(() => {
      setGlitchEffect(true);
      setTimeout(() => setGlitchEffect(false), 200);
    }, 8000);

    const hologramInterval = setInterval(() => {
      setHologramActive(true);
      setTimeout(() => setHologramActive(false), 3000);
    }, 12000);

    const neuralInterval = setInterval(() => {
      setNeuralNetworkActive(true);
      setTimeout(() => setNeuralNetworkActive(false), 4000);
    }, 15000);

    // Enhanced stats simulation
    const statsInterval = setInterval(() => {
      setProjectCount(prev => prev + Math.floor(Math.random() * 3));
      setCodeLines(prev => prev + Math.floor(Math.random() * 150));
      setCommits(prev => prev + Math.floor(Math.random() * 8));
      if (Math.random() > 0.6) {
        setStars(prev => prev + 1);
      }
      if (Math.random() > 0.7) {
        setClients(prev => prev + 1);
      }
      setExperience(prev => Math.min(10, prev + 0.15));
      setSatisfaction(prev => Math.min(100, Math.max(95, prev + (Math.random() - 0.5) * 3)));
      setActiveProjects(prev => Math.max(1, prev + (Math.random() - 0.3) * 2));
      setTechnologies(prev => prev + Math.floor(Math.random() * 3));
      setCaffeine(prev => Math.min(999, prev + Math.floor(Math.random() * 7)));
      if (Math.random() > 0.92) {
        setBugs(prev => prev + 1);
      }
    }, 2500);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      clearInterval(textInterval);
      clearInterval(commandInterval);
      clearInterval(quoteInterval);
      clearInterval(skillInterval);
      clearInterval(glitchInterval);
      clearInterval(hologramInterval);
      clearInterval(neuralInterval);
      clearInterval(statsInterval);
    };
  }, [isMobile, rotatingTexts.length, neuralSkills.length]);

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/Rajaram-resume.pdf';
    link.download = 'Lavudya_Rajaram_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleViewProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Enhanced typing effect
  useEffect(() => {
    if (charIndex < currentRole.length) {
      const timeout = setTimeout(() => {
        setTypedText(prev => prev + currentRole[charIndex]);
        setCharIndex(prev => prev + 1);
      }, 80 + Math.random() * 40);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, currentRole]);

  return (
    <section className="relative bg-black overflow-hidden min-h-screen">
      {/* Matrix Rain Background */}
      <canvas 
        ref={matrixCanvasRef}
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{ zIndex: 1 }}
      />
      
      {/* Neural Network Canvas */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 2 }}
      />
      
      {/* Quantum Background Effects */}
      <div className="absolute inset-0" style={{ zIndex: 3 }}>
        {/* Holographic Grid */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(45deg, rgba(255, 0, 255, 0.05) 1px, transparent 1px),
              linear-gradient(-45deg, rgba(0, 255, 0, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px, 60px 60px, 120px 120px, 120px 120px',
            transform: `translate(${mousePosition.x * 0.03}px, ${mousePosition.y * 0.03}px) rotate(${scrollY * 0.01}deg)`
          }}
        />
        
        {/* Quantum Orbs */}
        <div className={`absolute ${isMobile ? 'top-10 left-10 w-48 h-48' : 'top-20 left-20 w-96 h-96'} bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-quantum-float`}></div>
        <div className={`absolute ${isMobile ? 'top-20 right-16 w-48 h-48' : 'top-40 right-32 w-96 h-96'} bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-quantum-float-delay`}></div>
        <div className={`absolute ${isMobile ? 'bottom-16 left-1/4 w-48 h-48' : 'bottom-32 left-1/3 w-96 h-96'} bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full blur-3xl animate-quantum-float-slow`}></div>
        <div className={`absolute ${isMobile ? 'bottom-20 right-10 w-48 h-48' : 'bottom-40 right-20 w-96 h-96'} bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full blur-3xl animate-quantum-float-delay-slow`}></div>
        
        {/* Neural Network Visualization */}
        {neuralNetworkActive && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="relative w-full h-full">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-4 h-4 bg-cyan-400 rounded-full animate-pulse"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    boxShadow: '0 0 20px rgba(0, 255, 255, 0.8)'
                  }}
                />
              ))}
            </div>
          </div>
        )}
        
        {/* Floating Hexagons */}
        {!isMobile && (
          <>
            <div 
              className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-cyan-400/30 rotate-45 animate-rotate-3d"
              style={{ transform: `rotate(45deg) rotateX(${scrollY * 0.2}deg) rotateY(${scrollY * 0.1}deg)` }}
            ></div>
            <div 
              className="absolute top-1/3 right-1/4 w-24 h-24 border-2 border-purple-400/30 animate-rotate-3d"
              style={{ transform: `rotate(${scrollY * 0.15}deg) rotateY(${scrollY * 0.2}deg)` }}
            ></div>
            <div 
              className="absolute bottom-1/3 left-1/3 w-28 h-28 border-2 border-green-400/30 rotate-45 animate-rotate-3d"
              style={{ transform: `rotate(45deg) rotateY(${scrollY * 0.2}deg) rotateX(${scrollY * 0.1}deg)` }}
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
            
            {/* Left Content - Quantum Enhanced */}
            <div className={`space-y-6 md:space-y-8 ${
              isVisible ? 'animate-quantum-slide-in-left' : 'opacity-0'
            }`}>
              {/* Quantum Status Badge */}
              <div className={`inline-flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 rounded-full border border-cyan-400/30 backdrop-blur-sm relative overflow-hidden group ${
                glitchEffect ? 'animate-glitch' : ''
              }`}>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 animate-pulse"></div>
                <div className="relative flex items-center gap-2 md:gap-3">
                  <div className="relative">
                    <div className="w-2 h-2 md:w-3 md:h-3 bg-cyan-400 rounded-full animate-pulse"></div>
                    <div className="absolute inset-0 bg-cyan-400 rounded-full blur-md"></div>
                  </div>
                  <span className="text-cyan-400 font-medium text-xs md:text-sm tracking-wider">QUANTUM ACTIVE</span>
                  <Cpu className="w-3 h-3 md:w-4 md:h-4 text-purple-400" />
                </div>
              </div>

              {/* Quantum Title */}
              <div className="space-y-4 md:space-y-6">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="flex items-center gap-1.5 md:gap-2">
                    <div className="w-3 h-3 md:w-4 md:h-4 bg-cyan-400 rounded-full animate-pulse"></div>
                    <div className="w-3 h-3 md:w-4 md:h-4 bg-purple-400 rounded-full animate-pulse delay-100"></div>
                    <div className="w-3 h-3 md:w-4 md:h-4 bg-pink-400 rounded-full animate-pulse delay-200"></div>
                  </div>
                  <Activity className="w-4 h-4 md:w-5 md:h-5 text-cyan-400 animate-pulse" />
                </div>
                
                <h1 className={`font-black leading-tight ${
                  isMobile ? 'text-4xl sm:text-5xl' : 'text-6xl md:text-7xl lg:text-8xl'
                } ${hologramActive ? 'animate-hologram' : ''}`}>
                  <span className="block text-white mb-2">Welcome to the</span>
                  <span className="block bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-quantum-gradient">
                    Builder’s Realm
                  </span>
                </h1>

                {/* Neural Typing Effect */}
                <div className="flex flex-wrap items-center gap-2 md:gap-3">
                  <Brain className="w-4 h-4 md:w-5 md:h-5 text-purple-400" />
                  <span className="text-gray-400 text-base md:text-lg">I'm a</span>
                  <div className="relative">
                    <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                      {typedText}
                    </span>
                    <span className="absolute -right-4 md:-right-6 top-0 w-3 h-3 md:w-4 md:h-4 bg-cyan-400 rounded-full animate-pulse"></span>
                  </div>
                </div>
              </div>

              {/* Enhanced Description */}
              <div className="relative pl-4 md:pl-0">
                <p className={`text-gray-300 leading-relaxed ${
                  isMobile ? 'text-base' : 'text-lg md:text-xl'
                }`}>
                  Bridging the gap between human creativity and artificial intelligence, 
                  I architect digital solutions that push the boundaries of what's possible. 
                  Welcome to a world where code meets consciousness.
                </p>
                <div className="absolute left-0 md:-left-4 top-0 w-1 h-full bg-gradient-to-b from-cyan-400 to-purple-400 rounded-full animate-pulse"></div>
              </div>

              {/* Neural Skills Display */}
              {/* <div className="space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Gauge className="w-5 h-5 text-cyan-400" />
                  Neural Capabilities
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {neuralSkills.slice(0, 6).map((skill, index) => {
                    const Icon = skill.icon;
                    return (
                      <div 
                        key={index}
                        className={`group relative bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl border border-white/10 rounded-xl p-3 hover:border-cyan-400/40 transition-all duration-300 hover:scale-105 ${
                          index === activeSkill ? 'ring-2 ring-cyan-400/50' : ''
                        }`}
                      >
                        <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-10 rounded-xl`}></div>
                        <div className="relative">
                          <Icon className="w-4 h-4 text-white mb-2" />
                          <p className="text-xs font-bold text-white mb-1">{skill.name}</p>
                          <div className="w-full bg-white/20 rounded-full h-1">
                            <div 
                              className={`h-full bg-gradient-to-r ${skill.color} transition-all duration-1000`}
                              style={{ width: index === activeSkill ? `${skill.level}%` : '0%' }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div> */}

              {/* Quantum CTA Buttons */}
              <div className={`flex gap-3 md:gap-4 ${
                isMobile ? 'flex-col' : 'flex-row'
              }`}>
                <button 
                  onClick={handleViewProjects}
                  className={`group relative px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl md:rounded-2xl font-bold text-white overflow-hidden transform hover:scale-105 transition-all duration-300 ${
                    isMobile ? 'w-full text-sm' : 'text-base'
                  }`}>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  <span className="relative flex items-center justify-center gap-2 md:gap-3">
                    <Rocket className="w-5 h-5 md:w-6 md:h-6" />
                    Enter Projects
                    <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                </button>
                
                <button 
                  onClick={handleDownloadCV}
                  className={`group relative px-6 md:px-8 py-3 md:py-4 bg-white/10 backdrop-blur-sm border-2 border-cyan-400/30 rounded-xl md:rounded-2xl font-bold text-white hover:bg-white/20 transition-all duration-300 transform hover:scale-105 ${
                    isMobile ? 'w-full text-sm' : 'text-base'
                  }`}>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative flex items-center justify-center gap-2 md:gap-3">
                    <Download className="w-5 h-5 md:w-6 md:h-6 text-cyan-400 group-hover:animate-bounce" />
                    Download Matrix
                  </span>
                </button>
              </div>

              {/* Enhanced Social Links */}
              <div className={`flex items-center gap-4 md:gap-6 ${
                isMobile ? 'flex-col items-start' : 'flex-row'
              }`}>
                <span className={`text-gray-500 text-xs md:text-sm font-medium ${
                  isMobile ? '' : ''
                }`}>Neural Links:</span>
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
                      className={`w-10 h-10 md:w-12 md:h-12 bg-white/5 border border-cyan-400/20 rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 hover:border-cyan-400/40 ${social.color}`}
                    >
                      <social.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Content - Quantum Terminal */}
            <div className={`flex items-center justify-center ${
              isVisible ? 'animate-quantum-slide-in-right' : 'opacity-0'
            } ${isMobile ? 'mt-8' : ''}`}>
              <div className={`relative w-full ${
                isMobile ? 'max-w-none' : 'max-w-lg'
              }`}>
                
                {/* Quantum Terminal */}
                <div className={`relative bg-black/90 backdrop-blur-2xl border border-cyan-400/30 rounded-2xl md:rounded-3xl overflow-hidden ${
                  isMobile ? 'p-4' : 'p-6 md:p-8'
                } ${hologramActive ? 'animate-hologram-glow' : ''}`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 pointer-events-none"></div>
                  
                  {/* Enhanced Terminal Header */}
                  <div className={`flex items-center justify-between mb-4 relative z-10 ${
                    isMobile ? 'mb-3' : 'md:mb-6'
                  }`}>
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-red-500 rounded-full hover:bg-red-400 transition-colors cursor-pointer"></div>
                      <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-yellow-500 rounded-full hover:bg-yellow-400 transition-colors cursor-pointer"></div>
                      <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-green-500 rounded-full hover:bg-green-400 transition-colors cursor-pointer"></div>
                    </div>
                    <span className="text-cyan-400 text-xs md:text-sm font-mono truncate max-w-[120px] md:max-w-none">
                      quantum@Rajaram:~$
                    </span>
                    <div className="flex items-center gap-2 md:gap-3">
                      <Code2 className="w-3 h-3 md:w-4 md:h-4 text-cyan-400" />
                      <GitBranch className="w-3 h-3 md:w-4 md:h-4 text-green-400" />
                      {!isMobile && <Package className="w-3 h-3 md:w-4 md:h-4 text-purple-400" />}
                      {!isMobile && <Shield className="w-3 h-3 md:w-4 md:h-4 text-cyan-400" />}
                    </div>
                  </div>

                  {/* Quantum Stats Bar */}
                  <div className="mb-3 md:mb-4 p-2.5 md:p-3 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-lg border border-cyan-400/20">
                    <div className={`grid gap-2 md:gap-3 text-xs ${
                      isMobile ? 'grid-cols-2' : 'grid-cols-4'
                    }`}>
                      <div className="flex items-center gap-1.5 md:gap-2">
                        <Rocket className="w-3 h-3 text-cyan-400 flex-shrink-0" />
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
                    <div className={`mt-2 text-xs text-cyan-400 font-mono ${
                      isMobile ? 'text-center text-[10px]' : ''
                    }`}>
                      Full Stack Developer | Software Engineer | Machine Learning | Deep Learning
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
                          <span className="text-cyan-400">$</span>
                          <span className="text-gray-300 truncate">{command.cmd}</span>
                          {index === activeCommand && (
                            <span className="w-1.5 h-3 md:w-2 md:h-4 bg-cyan-400 animate-pulse flex-shrink-0"></span>
                          )}
                        </div>
                        <div className="ml-4 md:ml-6 text-cyan-400 text-[10px] md:text-xs break-words">{command.output}</div>
                      </div>
                    ))}
                    
                    <div className="flex items-center gap-2">
                      <span className="text-cyan-400 animate-pulse">$</span>
                      <span className="text-gray-300 animate-pulse">_</span>
                    </div>
                  </div>
                </div>

                {/* Quantum Floating Elements */}
                <div className={`absolute ${isMobile ? '-top-6 -left-6 w-12 h-12' : '-top-12 -left-12 w-20 h-20'} bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl md:rounded-3xl flex items-center justify-center animate-quantum-float-slow`}>
                  <Atom className={`${isMobile ? 'w-6 h-6' : 'w-10 h-10'} text-white`} />
                </div>
                
                <div className={`absolute ${isMobile ? '-top-4 -right-4 w-10 h-10' : '-top-8 -right-8 w-16 h-16'} bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl md:rounded-2xl flex items-center justify-center animate-quantum-float`}>
                  <Brain className={`${isMobile ? 'w-5 h-5' : 'w-8 h-8'} text-white`} />
                </div>
                
                <div className={`absolute ${isMobile ? '-bottom-6 -left-6 w-11 h-11' : '-bottom-10 -left-10 w-18 h-18'} bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl md:rounded-3xl flex items-center justify-center animate-quantum-float-delay`}>
                  <Cpu className={`${isMobile ? 'w-5 h-5' : 'w-9 h-9'} text-white`} />
                </div>
                
                <div className={`absolute ${isMobile ? '-bottom-4 -right-6 w-9 h-9' : '-bottom-8 -right-12 w-14 h-14'} bg-gradient-to-br from-orange-500 to-red-500 rounded-xl md:rounded-2xl flex items-center justify-center animate-quantum-float-slow`}>
                  <Terminal className={`${isMobile ? 'w-4 h-4' : 'w-7 h-7'} text-white`} />
                </div>

                {/* Additional Quantum Elements */}
                {!isMobile && (
                  <>
                    <div className="absolute top-1/2 -left-16 w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center animate-rotate-3d">
                      <Hexagon className="w-6 h-6 text-white" />
                    </div>
                    
                    <div className="absolute top-1/3 -right-16 w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-lg flex items-center justify-center animate-quantum-float">
                      <Globe className="w-5 h-5 text-white" />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quantum Custom CSS */}
      <style>{`
        @keyframes quantum-float {
          0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
          25% { transform: translateY(-30px) rotate(90deg) scale(1.05); }
          50% { transform: translateY(-20px) rotate(180deg) scale(1.1); }
          75% { transform: translateY(-40px) rotate(270deg) scale(1.05); }
        }
        
        @keyframes quantum-float-delay {
          0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
          25% { transform: translateY(-25px) rotate(-90deg) scale(1.05); }
          50% { transform: translateY(-15px) rotate(-180deg) scale(1.1); }
          75% { transform: translateY(-35px) rotate(-270deg) scale(1.05); }
        }
        
        @keyframes quantum-float-slow {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-20px) scale(1.1); }
        }
        
        @keyframes quantum-float-delay-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(-5deg); }
        }
        
        @keyframes quantum-gradient {
          0%, 100% { background-position: 0% 50%; filter: hue-rotate(0deg); }
          50% { background-position: 100% 50%; filter: hue-rotate(30deg); }
        }
        
        @keyframes quantum-slide-in-left {
          from { 
            opacity: 0; 
            transform: translateX(-150px) rotateY(-45deg) scale(0.8); 
            filter: blur(10px);
          }
          to { 
            opacity: 1; 
            transform: translateX(0) rotateY(0deg) scale(1); 
            filter: blur(0px);
          }
        }
        
        @keyframes quantum-slide-in-right {
          from { 
            opacity: 0; 
            transform: translateX(150px) rotateY(45deg) scale(0.8); 
            filter: blur(10px);
          }
          to { 
            opacity: 1; 
            transform: translateX(0) rotateY(0deg) scale(1); 
            filter: blur(0px);
          }
        }
        
        @keyframes rotate-3d {
          0% { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
          25% { transform: rotateX(90deg) rotateY(90deg) rotateZ(0deg); }
          50% { transform: rotateX(180deg) rotateY(180deg) rotateZ(90deg); }
          75% { transform: rotateX(270deg) rotateY(270deg) rotateZ(180deg); }
          100% { transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg); }
        }
        
        @keyframes glitch {
          0%, 100% { 
            transform: translate(0); 
            filter: hue-rotate(0deg);
          }
          20% { 
            transform: translate(-2px, 2px); 
            filter: hue-rotate(90deg);
          }
          40% { 
            transform: translate(-2px, -2px); 
            filter: hue-rotate(180deg);
          }
          60% { 
            transform: translate(2px, 2px); 
            filter: hue-rotate(270deg);
          }
          80% { 
            transform: translate(2px, -2px); 
            filter: hue-rotate(360deg);
          }
        }
        
        @keyframes hologram {
          0%, 100% { 
            opacity: 1; 
            transform: scale(1) translateY(0px);
            filter: brightness(1) contrast(1);
          }
          25% { 
            opacity: 0.8; 
            transform: scale(1.02) translateY(-2px);
            filter: brightness(1.2) contrast(1.1);
          }
          50% { 
            opacity: 0.9; 
            transform: scale(0.98) translateY(2px);
            filter: brightness(0.9) contrast(1.2);
          }
          75% { 
            opacity: 0.85; 
            transform: scale(1.01) translateY(-1px);
            filter: brightness(1.1) contrast(0.9);
          }
        }
        
        @keyframes hologram-glow {
          0%, 100% { 
            box-shadow: 
              0 0 20px rgba(0, 255, 255, 0.5),
              0 0 40px rgba(0, 255, 255, 0.3),
              0 0 60px rgba(0, 255, 255, 0.1);
          }
          50% { 
            box-shadow: 
              0 0 30px rgba(0, 255, 255, 0.8),
              0 0 60px rgba(0, 255, 255, 0.5),
              0 0 90px rgba(0, 255, 255, 0.3);
          }
        }
        
        .animate-quantum-float { animation: quantum-float 12s ease-in-out infinite; }
        .animate-quantum-float-delay { animation: quantum-float-delay 14s ease-in-out infinite; }
        .animate-quantum-float-slow { animation: quantum-float-slow 16s ease-in-out infinite; }
        .animate-quantum-float-delay-slow { animation: quantum-float-delay-slow 18s ease-in-out infinite; }
        .animate-quantum-gradient { animation: quantum-gradient 6s ease infinite; background-size: 300% 300%; }
        .animate-quantum-slide-in-left { animation: quantum-slide-in-left 2s cubic-bezier(0.4, 0, 0.2, 1); }
        .animate-quantum-slide-in-right { animation: quantum-slide-in-right 2s cubic-bezier(0.4, 0, 0.2, 1) 0.4s; }
        .animate-rotate-3d { animation: rotate-3d 20s linear infinite; }
        .animate-glitch { animation: glitch 0.3s ease-in-out; }
        .animate-hologram { animation: hologram 3s ease-in-out infinite; }
        .animate-hologram-glow { animation: hologram-glow 3s ease-in-out infinite; }
        
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        .animation-delay-600 { animation-delay: 0.6s; }
        .animation-delay-800 { animation-delay: 0.8s }
        
        /* Mobile optimizations */
        @media (max-width: 768px) {
          .animate-quantum-float { animation: quantum-float 8s ease-in-out infinite; }
          .animate-quantum-float-delay { animation: quantum-float-delay 9s ease-in-out infinite; }
          .animate-quantum-float-slow { animation: quantum-float-slow 10s ease-in-out infinite; }
          .animate-quantum-float-delay-slow { animation: quantum-float-delay-slow 11s ease-in-out infinite; }
        }
      `}</style>
    </section>
  );
}