import React, { useState, useEffect, useCallback } from 'react';
import { 
  ExternalLink, 
  Award, 
  Calendar, 
  Building2, 
  // ChevronLeft, 
  // ChevronRight, 
  Play, 
  Pause,
  Eye,
  CheckCircle
} from 'lucide-react';

interface Certificate {
  id: number;
  title: string;
  description: string;
  organization: string;
  date: string;
  link: string;
  image: string;
  color: string;
  category: string;
  skills: string[];
}

const EnhancedCertificationSection: React.FC = () => {
  const certificates: Certificate[] = [
    {
      id: 1,
      title: "Frontend Developer (React)",
      description: "A certification from HackerRank proving proficiency in React.js, focusing on frontend development skills like component-based architecture, state management, and JSX",
      organization: "HackerRank",
      date: "April 2024",
      link: "https://www.hackerrank.com/certificates/iframe/ca23b67f365c",
      image: "/certificate/React.png",
      color: "from-blue-500 to-cyan-500",
      category: "Frontend Development",
      skills: ["React.js", "JSX", "State Management", "Components"]
    },
    {
      id: 2,
      title: "JavaScript (Intermediate)",
      description: "A HackerRank certification that demonstrates intermediate-level understanding of JavaScript, including ES6 features, asynchronous programming, and DOM manipulation.",
      organization: "HackerRank",
      date: "March 2025",
      link: "https://www.hackerrank.com/certificates/iframe/213b85bf036d",
      image: "/certificate/Javascript.png",
      color: "from-yellow-500 to-orange-500",
      category: "Programming Languages",
      skills: ["JavaScript", "ES6", "DOM", "Async Programming"]
    },
    {
      id: 3,
      title: "Problem Solving (Basic)",
      description: "Problem Solving certification covering basic algorithm and data structure concepts, helping to strengthen analytical thinking and coding problem-solving skills.",
      organization: "HackerRank",
      date: "March 2025",
      link: "https://www.hackerrank.com/certificates/iframe/3c156fb5a40b",
      image: "/certificate/ProblemSolving.png",
      color: "from-green-500 to-emerald-500",
      category: "Problem Solving",
      skills: ["Algorithms", "Data Structures", "Logic", "Analysis"]
    },
    {
      id: 4,
      title: "Python (Basic)",
      description: "A certificate from HackerRank validating fundamental Python programming skills such as syntax, data types, functions, and basic file handling",
      organization: "HackerRank",
      date: "March 2025",
      link: "https://www.hackerrank.com/certificates/iframe/25449949909c",
      image: "/certificate/Python.png",
      color: "from-purple-500 to-pink-500",
      category: "Programming Languages",
      skills: ["Python", "Syntax", "Functions", "Data Types"]
    },
    {
      id: 6,
      title: "C++",
      description: "A certificate from Udemy covering the essentials of C++ programming, including object-oriented programming, memory management, and data structures",
      organization: "Udemy",
      date: "March 2025",
      link: "https://www.udemy.com/certificate/UC-82ca3cf6-9b2f-4a62-ad66-54301b2a2744/",
      image: "/certificate/c++.png",
      color: "from-red-500 to-rose-500",
      category: "Programming Languages",
      skills: ["C++", "OOP", "Memory Management", "Data Structures"]
    },
    {
      id: 7,
      title: "HTML, Javascript",
      description: "A Udemy certification demonstrating proficiency in HTML5 and JavaScript, covering webpage structure, interactive elements, and client-side scripting",
      organization: "Udemy",
      date: "March 2024",
      link: "https://www.udemy.com/certificate/UC-778af9ca-4661-44f1-ba0d-4f0d4b6f9509/",
      image: "/certificate/HTML.png",
      color: "from-cyan-500 to-blue-500",
      category: "Web Development",
      skills: ["HTML5", "JavaScript", "Web Structure", "DOM"]
    },
    {
      id: 8,
      title: "Java and Python",
      description: "A certificate from Udemy showcasing fundamental knowledge of both Java and Python programming languages, covering object-oriented programming and core language features",
      organization: "Udemy",
      date: "March 2025",
      link: "https://www.udemy.com/certificate/UC-e5168811-562b-41df-b3a9-e0cea633d7f7/",
      image: "/certificate/pythonJava.png",
      color: "from-teal-500 to-green-500",
      category: "Programming Languages",
      skills: ["Java", "Python", "OOP", "Core Features"]
    },
    {
      id: 9,
      title: "Java and Spring Boot",
      description: "Udemy certification focusing on Java and the Spring Boot framework for building backend applications, covering core concepts like dependency injection, RESTful APIs, and database integration",
      organization: "Udemy",
      date: "September 2024",
      link: "https://www.udemy.com/certificate/UC-f739e0a2-d800-4b98-9f97-e7a6726f08d2/",
      image: "/certificate/SpringBoot.png",
      color: "from-indigo-500 to-purple-500",
      category: "Backend Development",
      skills: ["Spring Boot", "REST APIs", "Java", "Database"]
    },
    {
      id: 10,
      title: "Machine Learning",
      description: "A certificate from Udemy demonstrating knowledge of machine learning fundamentals, including supervised and unsupervised learning, data preprocessing, and popular machine learning algorithms",
      organization: "Udemy",
      date: "March 2025",
      link: "https://www.udemy.com/certificate/UC-7b2923c5-93b7-4f9e-b7e8-a5dde2e548df/",
      image: "/certificate/LinearRegression.png",
      color: "from-violet-500 to-purple-500",
      category: "Machine Learning",
      skills: ["ML Algorithms", "Data Processing", "Supervised Learning", "Analysis"]
    },
    {
      id: 11,
      title: "Software Architecture",
      description: "A certification from Udemy covering essential software architecture principles, including design patterns, scalability, and building maintainable software systems",
      organization: "Udemy",
      date: "March 2025",
      link: "https://www.udemy.com/certificate/UC-b0e4c14c-0b1d-46d3-b3d3-41dd2164a538/",
      image: "/certificate/Software.png",
      color: "from-amber-500 to-yellow-500",
      category: "Software Design",
      skills: ["Design Patterns", "Scalability", "Architecture", "Systems"]
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % certificates.length);
  }, [certificates.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex(prev => (prev - 1 + certificates.length) % certificates.length);
  }, [certificates.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const toggleAutoPlay = useCallback(() => {
    setIsAutoPlaying(prev => !prev);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const currentCertificate = certificates[currentIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6">
            <Award className="w-5 h-5 text-blue-400 mr-2" />
            <span className="text-blue-400 font-medium">Professional Certifications</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              My Achievements
            </span>
          </h1>
          
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            A comprehensive collection of my professional certifications and continuous learning journey 
            in technology and software development.
          </p>

          {/* Stats */}
          <div className="flex justify-center space-x-8 mt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">{certificates.length}</div>
              <div className="text-slate-400 text-sm">Certifications</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">5+</div>
              <div className="text-slate-400 text-sm">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400">2024-2025</div>
              <div className="text-slate-400 text-sm">Years</div>
            </div>
          </div>
        </div>

        {/* Main Certificate Showcase */}
        <div className="mb-16">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-12 shadow-2xl hover:bg-white/10 transition-all duration-500">
            
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 xl:gap-12 items-center">
              
              {/* Certificate Image */}
              <div className="relative group order-2 xl:order-1">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
                <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-800/50">
                    <img 
                      src={currentCertificate.image} 
                      alt={`${currentCertificate.title} Certificate`}
                      className="w-full h-full object-cover rounded-xl hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJhIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjMzMzIi8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjNjY2Ii8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9InVybCgjYSkiLz48Y2lyY2xlIGN4PSIyMDAiIGN5PSIxMjAiIHI9IjQwIiBmaWxsPSIjOTk5IiBvcGFjaXR5PSIwLjciLz48cmVjdCB4PSIxMzAiIHk9IjE4MCIgd2lkdGg9IjE0MCIgaGVpZ2h0PSIxMiIgZmlsbD0iIzk5OSIgb3BhY2l0eT0iMC41Ii8+PHJlY3QgeD0iMTUwIiB5PSIyMDAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTIiIGZpbGw9IiM5OTkiIG9wYWNpdHk9IjAuNSIvPjx0ZXh0IHg9IjIwMCIgeT0iMjUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOTk5IiBmb250LXNpemU9IjE0IiBmb250LWZhbWlseT0iQXJpYWwiPkNlcnRpZmljYXRlIEltYWdlPC90ZXh0Pjwvc3ZnPg==';
                      }}
                    />
                  </div>
                  <div className="absolute top-3 right-3">
                    <div className={`px-3 py-1 bg-gradient-to-r ${currentCertificate.color} rounded-full text-white text-xs font-medium shadow-lg`}>
                      {currentCertificate.category}
                    </div>
                  </div>
                </div>
              </div>

              {/* Certificate Details */}
              <div className="space-y-8 order-1 xl:order-2">
                
                {/* Header */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <Building2 className="w-5 h-5 text-slate-400" />
                    <span className="text-slate-300 font-medium text-lg">{currentCertificate.organization}</span>
                    <div className="flex items-center space-x-2 text-slate-400">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{currentCertificate.date}</span>
                    </div>
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                    {currentCertificate.title}
                  </h2>
                </div>

                {/* Description */}
                <p className="text-slate-300 text-lg leading-relaxed">
                  {currentCertificate.description}
                </p>

                {/* Skills Tags */}
                <div className="space-y-3">
                  <h4 className="text-white font-semibold flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    Skills Covered
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {currentCertificate.skills.map((skill, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-white/10 border border-white/20 rounded-lg text-slate-200 text-sm font-medium hover:bg-white/20 transition-colors duration-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => window.open(currentCertificate.link, '_blank')}
                    className={`group flex items-center justify-center px-8 py-4 bg-gradient-to-r ${currentCertificate.color} text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300`}
                  >
                    <Eye className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-300" />
                    <span>View Certificate</span>
                    <ExternalLink className="w-4 h-4 ml-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-12">
          
          {/* Navigation Arrows */}
          {/* <div className="flex items-center space-x-4">
            <button
              onClick={prevSlide}
              className="w-12 h-12 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl flex items-center justify-center text-white hover:text-blue-400 transition-all duration-300 group"
            >
              <ChevronLeft className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            </button>
            
            <div className="text-slate-300 font-medium px-4">
              {currentIndex + 1} of {certificates.length}
            </div>
            
            <button
              onClick={nextSlide}
              className="w-12 h-12 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl flex items-center justify-center text-white hover:text-blue-400 transition-all duration-300 group"
            >
              <ChevronRight className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            </button>
          </div> */}

          {/* Auto-play Toggle */}
          <button
            onClick={toggleAutoPlay}
            className="flex items-center space-x-3 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white hover:text-cyan-400 transition-all duration-300 group"
          >
            {isAutoPlaying ? (
              <Pause className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
            ) : (
              <Play className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
            )}
            <span className="font-medium">{isAutoPlaying ? 'Pause' : 'Play'}</span>
          </button>
        </div>

        {/* Progress Indicators */}
        <div className="flex justify-center space-x-2 mb-8">
          {certificates.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? `w-8 h-2 bg-gradient-to-r ${currentCertificate.color}`
                  : 'w-2 h-2 bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to certificate ${index + 1}`}
            />
          ))}
        </div>

        {/* Certificate Grid Preview */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">All Certifications</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {certificates.map((cert, index) => (
              <button
                key={cert.id}
                onClick={() => goToSlide(index)}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`group relative aspect-square rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                  index === currentIndex
                    ? 'border-blue-400 shadow-lg shadow-blue-500/25 scale-105'
                    : 'border-white/20 hover:border-white/40 hover:scale-105'
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900"></div>
                <div className="relative p-3 h-full flex flex-col items-center justify-center">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${cert.color} flex items-center justify-center mb-2`}>
                    <Award className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-xs font-medium text-white text-center leading-tight">
                    {cert.title.split(' ').slice(0, 2).join(' ')}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    {cert.organization}
                  </div>
                </div>
                {index === currentIndex && (
                  <div className="absolute inset-0 bg-blue-500/20 border-2 border-blue-400 rounded-xl animate-pulse"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedCertificationSection;