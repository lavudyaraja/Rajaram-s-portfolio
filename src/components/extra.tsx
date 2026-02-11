"use client";

import { 
  GraduationCap, 
  Calendar, 
  MapPin, 
  Award, 
  BookOpen, 
  ChevronRight,
  Sparkles,
  School,
  University,
  Building2,
  Star,
  Trophy,
  Target
} from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Education() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const pathname = usePathname();
  const isEducationPage = pathname === "/education";

  useEffect(() => {
    if (isEducationPage) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('education-section');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [isEducationPage]);

  const education = [
    {
      id: 1,
      degree: "BTech Computer Science and Engineering",
      shortTitle: "BTech CSE",
      institution: "Central University Of Haryana",
      location: "Haryana, India",
      period: "2022 - 2026",
      startYear: "2022",
      status: "Pursuing",
      score: "In Progress",
      type: "university",
      icon: University,
      color: "cyan",
      achievements: [
        "Advanced Algorithms & Data Structures",
        "Full-Stack Web Development",
        "Machine Learning & AI",
        "Software Engineering Practices"
      ],
      skills: [
        "Data Structures",
        "Machine Learning",
        "Web Development",
        "DBMS",
        "Software Engineering",
        "Computer Networks",
        "Artificial Intelligence"
      ],
      highlights: ["Top Performer", "Research Projects", "Tech Lead"]
    },
    {
      id: 2,
      degree: "Intermediate (MPC)",
      shortTitle: "Intermediate",
      institution: "TTWREIS COE BOYS Narsapur",
      location: "Narsapur, India",
      period: "2019 - 2021",
      startYear: "2019",
      status: "Completed",
      score: "91%",
      type: "college",
      icon: Building2,
      color: "violet",
      achievements: [
        "Strong Mathematical Foundation",
        "Physics & Chemistry Excellence",
        "Analytical Problem Solving",
        "Critical Thinking Development"
      ],
      skills: [
        "Mathematics",
        "Physics",
        "Chemistry",
        "Computer Science",
        "English"
      ],
      highlights: ["91% Score", "Science Excellence", "Top 10%"]
    },
    {
      id: 3,
      degree: "School of Secondary Certification",
      shortTitle: "SSC",
      institution: "ZPHS Boys No-2 Pargi",
      location: "Pargi, Telangana, India",
      period: "2018 - 2019",
      startYear: "2018",
      status: "Completed",
      score: "83%",
      type: "school",
      icon: School,
      color: "emerald",
      achievements: [
        "Strong Academic Foundation",
        "Mathematics & Science Excellence",
        "All-Round Development",
        "Board Examination Success"
      ],
      skills: [
        "Mathematics",
        "Science",
        "Social Studies",
        "English",
        "Telugu",
        "Hindi"
      ],
      highlights: ["83% Score", "Academic Excellence", "Foundation Strong"]
    }
  ];

  const colorSchemes = {
    cyan: {
      primary: "cyan",
      gradient: "from-cyan-500 via-blue-500 to-cyan-600",
      border: "border-cyan-500/30",
      bg: "bg-cyan-500/5",
      text: "text-cyan-400",
      hover: "hover:border-cyan-500/60"
    },
    violet: {
      primary: "violet",
      gradient: "from-violet-500 via-purple-500 to-violet-600",
      border: "border-violet-500/30",
      bg: "bg-violet-500/5",
      text: "text-violet-400",
      hover: "hover:border-violet-500/60"
    },
    emerald: {
      primary: "emerald",
      gradient: "from-emerald-500 via-green-500 to-emerald-600",
      border: "border-emerald-500/30",
      bg: "bg-emerald-500/5",
      text: "text-emerald-400",
      hover: "hover:border-emerald-500/60"
    }
  };

  // Floating particles
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 20,
    duration: 15 + Math.random() * 25,
    size: 1 + Math.random() * 3
  }));

  return (
    <section 
      id={isEducationPage ? undefined : 'education-section'} 
      className="relative py-16 sm:py-24 lg:py-32 bg-gradient-to-b from-black via-gray-950 to-black overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Particles */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-blue-400/10 animate-float-particle"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
            }}
          />
        ))}

        {/* Gradient Orbs */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse-orb" />
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse-orb-delayed" />
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse-orb-slow" />

        {/* Grid Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className={`text-center mb-16 sm:mb-20 lg:mb-24 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'translate-y-10'}`}>
          <div className="inline-flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent animate-shimmer" />
            <div className="relative">
              <GraduationCap className="w-8 h-8 text-cyan-400 animate-bounce-gentle" />
              <div className="absolute -top-1 -right-1">
                <Sparkles className="w-4 h-4 text-yellow-400 animate-twinkle" />
              </div>
            </div>
            <div className="w-12 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent animate-shimmer" />
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-violet-400 to-emerald-400 bg-clip-text text-transparent animate-gradient-flow bg-300%">
            Educational Journey
          </h2>
          
          <p className="text-gray-400 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
            Building expertise through continuous learning and academic excellence
          </p>
        </div>

        {/* Timeline Layout - Mobile */}
        <div className="lg:hidden space-y-8">
          {education.map((edu, index) => {
            const colors = colorSchemes[edu.color as keyof typeof colorSchemes];
            const Icon = edu.icon;
            
            return (
              <div
                key={edu.id}
                className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : '-translate-x-10'}`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div 
                  className={`relative group cursor-pointer ${selectedCard === edu.id ? 'scale-[1.02]' : ''}`}
                  onClick={() => setSelectedCard(selectedCard === edu.id ? null : edu.id)}
                >
                  {/* Main Card */}
                  <div className={`relative bg-gray-900/40 backdrop-blur-xl border ${colors.border} ${colors.hover} rounded-2xl p-6 transition-all duration-500 shadow-xl`}>
                    {/* Header */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`relative flex-shrink-0 w-16 h-16 bg-gradient-to-br ${colors.gradient} rounded-xl flex items-center justify-center animate-float-gentle`}>
                        <Icon className="w-8 h-8 text-white" />
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
                          <Star className="w-3 h-3 text-gray-900" fill="currentColor" />
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-bold text-white mb-1 line-clamp-2">
                          {edu.degree}
                        </h3>
                        <p className={`text-sm ${colors.text} font-medium`}>
                          {edu.institution}
                        </p>
                      </div>
                    </div>

                    {/* Info Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Calendar className="w-4 h-4" />
                        <span>{edu.period}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <MapPin className="w-4 h-4" />
                        <span>{edu.location.split(',')[0]}</span>
                      </div>
                    </div>

                    {/* Score Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <div className={`px-4 py-2 ${colors.bg} border ${colors.border} rounded-lg`}>
                        <div className="text-xs text-gray-400 mb-0.5">Status</div>
                        <div className="text-sm font-bold text-white">{edu.status}</div>
                      </div>
                      <div className="px-4 py-2 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-lg">
                        <div className="text-xs text-yellow-400 mb-0.5">Score</div>
                        <div className="text-sm font-bold text-yellow-400">{edu.score}</div>
                      </div>
                    </div>

                    {/* Expandable Content */}
                    <div className={`overflow-hidden transition-all duration-500 ${selectedCard === edu.id ? 'max-h-96' : 'max-h-0'}`}>
                      <div className="pt-4 border-t border-gray-800 space-y-4">
                        {/* Highlights */}
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Trophy className="w-4 h-4 text-yellow-400" />
                            <h4 className="text-sm font-semibold text-white">Highlights</h4>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {edu.highlights.map((highlight, idx) => (
                              <span
                                key={idx}
                                className={`px-3 py-1 ${colors.bg} ${colors.border} border rounded-full text-xs ${colors.text} font-medium`}
                              >
                                {highlight}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Skills */}
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Target className="w-4 h-4 text-cyan-400" />
                            <h4 className="text-sm font-semibold text-white">Key Skills</h4>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {edu.skills.slice(0, 4).map((skill, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 bg-gray-800/50 border border-gray-700 rounded-lg text-xs text-gray-300"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Expand Indicator */}
                    <div className="flex justify-center mt-4">
                      <ChevronRight 
                        className={`w-5 h-5 ${colors.text} transition-transform duration-300 ${selectedCard === edu.id ? 'rotate-90' : ''}`} 
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Timeline Layout - Desktop */}
        <div className="hidden lg:block relative">
          {/* Central Timeline Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 -ml-0.5">
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-500 via-violet-500 to-emerald-500 opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-500 via-violet-500 to-emerald-500 opacity-50 animate-flow-down" />
          </div>

          {/* Education Cards */}
          <div className="space-y-24">
            {education.map((edu, index) => {
              const colors = colorSchemes[edu.color as keyof typeof colorSchemes];
              const Icon = edu.icon;
              const isLeft = index % 2 === 0;
              
              return (
                <div
                  key={edu.id}
                  className={`relative ${isVisible ? 'opacity-100' : ''} transition-all duration-1000`}
                  style={{ transitionDelay: `${index * 300}ms` }}
                  onMouseEnter={() => setHoveredCard(edu.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className="flex items-center">
                    {/* Left Side */}
                    <div className={`w-1/2 ${isLeft ? 'pr-12' : 'order-3 pl-12'}`}>
                      <div
                        className={`transform transition-all duration-700 ${
                          isLeft 
                            ? (isVisible ? 'translate-x-0' : '-translate-x-20')
                            : (isVisible ? 'translate-x-0' : 'translate-x-20')
                        } ${hoveredCard === edu.id ? 'scale-105' : ''}`}
                      >
                        <div className={`relative bg-gray-900/60 backdrop-blur-xl border ${colors.border} ${colors.hover} rounded-2xl p-8 transition-all duration-500 shadow-2xl group cursor-pointer`}
                             onClick={() => setSelectedCard(selectedCard === edu.id ? null : edu.id)}>
                          
                          {/* Connecting Line to Timeline */}
                          <div className={`absolute top-1/2 ${isLeft ? 'left-full' : 'right-full'} w-12 h-0.5 bg-gradient-to-r ${isLeft ? colors.gradient : `to-r ${colors.gradient}`} opacity-50`} />
                          
                          {/* Card Header */}
                          <div className="flex items-start gap-4 mb-6">
                            <div className={`relative flex-shrink-0 w-20 h-20 bg-gradient-to-br ${colors.gradient} rounded-2xl flex items-center justify-center animate-float-gentle`}>
                              <Icon className="w-10 h-10 text-white" />
                              <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                                <Star className="w-3.5 h-3.5 text-gray-900" fill="currentColor" />
                              </div>
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <h3 className="text-2xl font-bold text-white leading-tight">
                                  {edu.degree}
                                </h3>
                              </div>
                              <p className={`text-base ${colors.text} font-semibold mb-2`}>
                                {edu.institution}
                              </p>
                              <div className="flex items-center gap-4 text-sm text-gray-400">
                                <div className="flex items-center gap-1.5">
                                  <Calendar className="w-4 h-4" />
                                  <span>{edu.period}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <MapPin className="w-4 h-4" />
                                  <span>{edu.location}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Status Grid */}
                          <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className={`p-4 ${colors.bg} border ${colors.border} rounded-xl text-center`}>
                              <div className="text-xs text-gray-400 mb-1">Status</div>
                              <div className="text-lg font-bold text-white">{edu.status}</div>
                            </div>
                            <div className="p-4 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-xl text-center">
                              <div className="text-xs text-yellow-400 mb-1">Achievement</div>
                              <div className="text-lg font-bold text-yellow-400">{edu.score}</div>
                            </div>
                          </div>

                          {/* Expandable Section */}
                          <div className={`overflow-hidden transition-all duration-500 ${selectedCard === edu.id ? 'max-h-96' : 'max-h-0'}`}>
                            <div className="pt-6 border-t border-gray-800 space-y-4">
                              {/* Highlights */}
                              <div>
                                <div className="flex items-center gap-2 mb-3">
                                  <Trophy className="w-5 h-5 text-yellow-400" />
                                  <h4 className="text-sm font-semibold text-white uppercase tracking-wide">Highlights</h4>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                  {edu.highlights.map((highlight, idx) => (
                                    <span
                                      key={idx}
                                      className={`px-4 py-2 ${colors.bg} ${colors.border} border rounded-full text-sm ${colors.text} font-medium`}
                                    >
                                      {highlight}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              {/* Key Skills */}
                              <div>
                                <div className="flex items-center gap-2 mb-3">
                                  <Target className="w-5 h-5 text-cyan-400" />
                                  <h4 className="text-sm font-semibold text-white uppercase tracking-wide">Core Competencies</h4>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                  {edu.skills.slice(0, 6).map((skill, idx) => (
                                    <div
                                      key={idx}
                                      className="px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-sm text-gray-300 text-center"
                                    >
                                      {skill}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Expand Button */}
                          <button 
                            className="w-full mt-4 pt-4 border-t border-gray-800 flex items-center justify-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                          >
                            <span>{selectedCard === edu.id ? 'Show Less' : 'Show More'}</span>
                            <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${selectedCard === edu.id ? 'rotate-90' : ''}`} />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Timeline Node */}
                    <div className="relative z-10 order-2 flex-shrink-0">
                      <div className={`relative w-6 h-6 bg-gradient-to-br ${colors.gradient} rounded-full border-4 border-gray-950 transition-all duration-500 ${hoveredCard === edu.id ? 'scale-150' : ''}`}>
                        <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${colors.gradient} animate-ping-slow opacity-75`} />
                      </div>
                      
                      {/* Year Label */}
                      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 text-center`}>
                        <div className={`mt-12 px-4 py-2 bg-gray-900/90 backdrop-blur-sm border ${colors.border} rounded-lg`}>
                          <div className="text-xs text-gray-400">Started</div>
                          <div className={`text-sm font-bold ${colors.text}`}>{edu.startYear}</div>
                        </div>
                      </div>
                    </div>

                    {/* Right Side (Empty space for alternating layout) */}
                    <div className={`w-1/2 ${isLeft ? 'order-3' : ''}`} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats Section */}
        <div className={`mt-24 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'translate-y-10'}`}
             style={{ transitionDelay: '1000ms' }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "Education Levels", value: education.length.toString(), icon: GraduationCap, color: "cyan" },
              { label: "Years of Learning", value: "8+", icon: BookOpen, color: "violet" },
              { label: "Key Skills", value: "25+", icon: Target, color: "emerald" },
              { label: "Excellence", value: "A+", icon: Award, color: "yellow" }
            ].map((stat, idx) => {
              const StatIcon = stat.icon;
              return (
                <div
                  key={idx}
                  className="group relative bg-gray-900/40 backdrop-blur-xl border border-gray-800 hover:border-cyan-500/40 rounded-2xl p-6 transition-all duration-500 hover:scale-105 cursor-pointer"
                  style={{ transitionDelay: `${idx * 100}ms` }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <StatIcon className={`w-8 h-8 text-${stat.color}-400 group-hover:scale-110 transition-transform`} />
                    <div className={`text-4xl font-bold bg-gradient-to-r from-${stat.color}-400 to-${stat.color}-600 bg-clip-text text-transparent`}>
                      {stat.value}
                    </div>
                  </div>
                  <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes float-particle {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 0.2;
          }
          25% {
            transform: translate(10px, -10px) rotate(90deg);
            opacity: 0.5;
          }
          50% {
            transform: translate(5px, -20px) rotate(180deg);
            opacity: 0.3;
          }
          75% {
            transform: translate(-5px, -10px) rotate(270deg);
            opacity: 0.4;
          }
        }

        @keyframes pulse-orb {
          0%, 100% { 
            opacity: 0.1;
            transform: scale(1);
          }
          50% { 
            opacity: 0.15;
            transform: scale(1.1);
          }
        }

        @keyframes pulse-orb-delayed {
          0%, 100% { 
            opacity: 0.08;
            transform: scale(1);
          }
          50% { 
            opacity: 0.12;
            transform: scale(1.15);
          }
        }

        @keyframes pulse-orb-slow {
          0%, 100% { 
            opacity: 0.05;
            transform: scale(1);
          }
          50% { 
            opacity: 0.1;
            transform: scale(1.2);
          }
        }

        @keyframes shimmer {
          0% { opacity: 0.3; }
          50% { opacity: 1; }
          100% { opacity: 0.3; }
        }

        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        @keyframes twinkle {
          0%, 100% { 
            opacity: 0.3;
            transform: scale(0.8) rotate(0deg);
          }
          50% { 
            opacity: 1;
            transform: scale(1.2) rotate(180deg);
          }
        }

        @keyframes gradient-flow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes float-gentle {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-5px) rotate(3deg); }
        }

        @keyframes flow-down {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }

        @keyframes ping-slow {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }

        .animate-float-particle { animation: float-particle linear infinite; }
        .animate-pulse-orb { animation: pulse-orb 8s ease-in-out infinite; }
        .animate-pulse-orb-delayed { animation: pulse-orb-delayed 10s ease-in-out infinite; }
        .animate-pulse-orb-slow { animation: pulse-orb-slow 12s ease-in-out infinite; }
        .animate-shimmer { animation: shimmer 3s ease-in-out infinite; }
        .animate-bounce-gentle { animation: bounce-gentle 3s ease-in-out infinite; }
        .animate-twinkle { animation: twinkle 2s ease-in-out infinite; }
        .animate-gradient-flow { animation: gradient-flow 8s ease infinite; }
        .animate-float-gentle { animation: float-gentle 3s ease-in-out infinite; }
        .animate-flow-down { animation: flow-down 3s linear infinite; }
        .animate-ping-slow { animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite; }

        .bg-300% { background-size: 300% 300%; }
      `}</style>
    </section>
  );
}