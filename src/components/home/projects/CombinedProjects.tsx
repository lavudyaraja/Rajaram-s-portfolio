"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Github, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { SimpleProject } from '@/types/project';
import { SIMPLE_PROJECTS } from '@/data/projects';
import { useAutoPlayingCarousel } from '@/hooks/useCarousel';
import { getRealIconUrl } from '@/utils/realTechIcons';

const getProjectColors = (color: string) => {
  const colors: Record<string, any> = {
    yellow: {
      accent: 'text-yellow-400',
      border: 'border-yellow-400/30',
      bg: 'bg-yellow-400/10',
      shadow: 'shadow-yellow-400/20',
      dot: 'bg-yellow-400',
      gradient: 'from-yellow-400/20 to-yellow-600/10',
      glow: 'shadow-yellow-500/20'
    },
    orange: {
      accent: 'text-orange-400',
      border: 'border-orange-400/30',
      bg: 'bg-orange-400/10',
      shadow: 'shadow-orange-400/20',
      dot: 'bg-orange-400',
      gradient: 'from-orange-400/20 to-orange-600/10',
      glow: 'shadow-orange-500/20'
    },
    pink: {
      accent: 'text-pink-400',
      border: 'border-pink-400/30',
      bg: 'bg-pink-400/10',
      shadow: 'shadow-pink-400/20',
      dot: 'bg-pink-400',
      gradient: 'from-pink-400/20 to-pink-600/10',
      glow: 'shadow-pink-500/20'
    },
    cyan: {
      accent: 'text-cyan-400',
      border: 'border-cyan-400/30',
      bg: 'bg-cyan-400/10',
      shadow: 'shadow-cyan-400/20',
      dot: 'bg-cyan-400',
      gradient: 'from-cyan-400/20 to-cyan-600/10',
      glow: 'shadow-cyan-500/20'
    },
    purple: {
      accent: 'text-purple-400',
      border: 'border-purple-400/30',
      bg: 'bg-purple-400/10',
      shadow: 'shadow-purple-400/20',
      dot: 'bg-purple-400',
      gradient: 'from-purple-400/20 to-purple-600/10',
      glow: 'shadow-purple-500/20'
    }
  };
  return colors[color] || colors.cyan;
};

const CombinedProjects: React.FC = () => {
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { currentIndex, setCurrentIndex, isAutoPlaying, setIsAutoPlaying, nextSlide, prevSlide, goToSlide, handleMouseEnter, handleMouseLeave } = useAutoPlayingCarousel(SIMPLE_PROJECTS.length, 4000);

  const currentProject = SIMPLE_PROJECTS[currentIndex];

  // Mobile-friendly carousel positioning
  const getCardStyle = (index: number) => {
    if (isMobile) {
      // Mobile: Simple slide-based positioning
      const diff = (index - currentIndex + SIMPLE_PROJECTS.length) % SIMPLE_PROJECTS.length;
      if (diff === 0) {
        return {
          transform: 'translateX(0px) scale(1)',
          opacity: 1,
          zIndex: 20
        };
      } else {
        return {
          transform: `translateX(${diff > SIMPLE_PROJECTS.length / 2 ? '-' : ''}100vw) scale(0.9)`,
          opacity: 0,
          zIndex: 1
        };
      }
    }

    // Desktop 3D carousel
    const diff = (index - currentIndex + SIMPLE_PROJECTS.length) % SIMPLE_PROJECTS.length;
    const totalCards = SIMPLE_PROJECTS.length;
    
    if (diff === 0) {
      // Center card - main focus
      return {
        transform: 'translateX(0px) translateZ(100px) rotateY(0deg) scale(1)',
        opacity: 1,
        zIndex: 20
      };
    } else if (diff === 1 || diff === totalCards - 1) {
      // Side cards
      const isRight = diff === 1;
      const xOffset = isRight ? 320 : -320;
      const rotation = isRight ? -25 : 25;
      
      return {
        transform: `translateX(${xOffset}px) translateZ(-50px) rotateY(${rotation}deg) scale(0.85)`,
        opacity: 0.7,
        zIndex: 10
      };
    } else if (diff === 2 || diff === totalCards - 2) {
      // Far side cards
      const isRight = diff === 2;
      const xOffset = isRight ? 500 : -500;
      const rotation = isRight ? -45 : 45;
      
      return {
        transform: `translateX(${xOffset}px) translateZ(-150px) rotateY(${rotation}deg) scale(0.7)`,
        opacity: 0.4,
        zIndex: 5
      };
    } else {
      // Hidden cards
      return {
        transform: 'translateX(0px) translateZ(-300px) rotateY(0deg) scale(0.6)',
        opacity: 0,
        zIndex: 1
      };
    }
  };

  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 md:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 md:mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto mb-4 sm:mb-6 md:mb-8 lg:mb-10 leading-relaxed px-2">
            Explore my latest development work through this immersive showcase featuring modern web applications
          </p>
          
          {/* View Mode Toggle - Hide on mobile for carousel, always show for grid */}
          <div className="flex justify-center mb-4 sm:mb-6 md:mb-8 lg:mb-12">
            <div className="inline-flex p-1 bg-gray-800/70 backdrop-blur-lg rounded-lg sm:rounded-xl border border-gray-700">
              <button
                onClick={() => setViewMode('carousel')}
                className={`px-2 sm:px-3 md:px-6 py-1.5 sm:py-2 md:py-3 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  viewMode === 'carousel'
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/25'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                {isMobile ? 'Cards' : '3D Carousel'}
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-2 sm:px-3 md:px-6 py-1.5 sm:py-2 md:py-3 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  viewMode === 'grid'
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/25'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                {isMobile ? 'Grid' : 'Detailed View'}
              </button>
            </div>
          </div>
        </div>

        {viewMode === 'carousel' ? (
          // Carousel View (Mobile-optimized)
          <div className="relative">
            {/* Carousel Container */}
            <div 
              className={`relative flex items-center justify-center overflow-hidden ${
                isMobile ? 'h-[500px]' : 'h-[600px]'
              }`}
              style={isMobile ? {} : { 
                perspective: '1500px',
                perspectiveOrigin: 'center center'
              }}
              onMouseEnter={!isMobile ? handleMouseEnter : undefined}
              onMouseLeave={!isMobile ? handleMouseLeave : undefined}
            >
              {/* Background Effects */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-48 md:w-96 h-48 md:h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-48 md:w-96 h-48 md:h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
              </div>
              
              {/* Project Cards */}
              {SIMPLE_PROJECTS.map((project, index) => {
                const colors = getProjectColors(project.color);
                const isActive = index === currentIndex;

                return (
                  <div
                    key={project.id}
                    className={`absolute transition-all duration-700 ease-out cursor-pointer ${
                      isMobile ? 'w-[320px] h-[450px]' : 'w-[420px] h-[550px]'
                    }`}
                    style={getCardStyle(index)}
                    onClick={() => goToSlide(index)}
                  >
                    <div
                      className={`
                        h-full rounded-2xl backdrop-blur-lg bg-gray-800/90 border overflow-hidden flex flex-col
                        ${isActive ? `${colors.border} shadow-2xl ${colors.glow}` : "border-gray-700/50 shadow-lg"}
                        hover:shadow-2xl transition-all duration-300
                      `}
                    >
                      {/* Card Image */}
                      <div className={`relative overflow-hidden ${isMobile ? 'h-40' : 'h-56'}`}>
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-transparent to-transparent"></div>
                        <div
                          className={`absolute top-4 right-4 w-3 h-3 ${colors.dot} rounded-full ${
                            isActive ? "animate-ping" : ""
                          }`}
                        ></div>
                      </div>

                      {/* Card Content */}
                      <div className={`flex flex-col flex-grow ${isMobile ? 'p-4' : 'p-6'}`}>
                        {/* Title */}
                        <h3
                          className={`font-bold mb-3 ${
                            isActive ? colors.accent : "text-white"
                          } transition-colors duration-300 ${isMobile ? 'text-lg' : 'text-2xl'}`}
                        >
                          {project.title}
                        </h3>

                        {/* Description */}
                        <p className={`text-gray-300 leading-relaxed mb-4 ${isMobile ? 'text-sm line-clamp-3' : 'text-base'}`}>
                          {isMobile ? project.description.slice(0, 100) + '...' : project.description}
                        </p>

                        {/* Technologies */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tags.slice(0, isMobile ? 3 : project.tags.length).map((tag) => (
                            <div
                              key={tag}
                              className={`flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-lg bg-gray-700/50 border border-gray-600/50 text-gray-300 ${
                                isMobile ? 'text-xs' : ''
                              }`}
                            >
                              <img
                                src={getRealIconUrl(tag)}
                                alt={tag}
                                className="w-3 h-3"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = 'none';
                                }}
                              />
                              <span>{tag}</span>
                            </div>
                          ))}
                          {isMobile && project.tags.length > 3 && (
                            <span className="px-2 py-1 text-xs font-semibold rounded-lg bg-gray-700/50 border border-gray-600/50 text-gray-300">
                              +{project.tags.length - 3}
                            </span>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3 mt-auto">
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`rounded-lg bg-gray-700/50 hover:bg-gray-600/50 border border-gray-600/50 hover:border-gray-500 transition-all duration-200 ${
                              isMobile ? 'p-2' : 'p-3'
                            }`}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Github className={`text-gray-300 ${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />
                          </a>
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`rounded-lg bg-gray-700/50 hover:bg-gray-600/50 border border-gray-600/50 hover:border-gray-500 transition-all duration-200 ${
                              isMobile ? 'p-2' : 'p-3'
                            }`}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ExternalLink className={`text-gray-300 ${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Navigation Arrows */}
            {/* <div className="flex justify-center gap-4 mt-6 md:mt-8">
              <button
                onClick={prevSlide}
                className={`flex items-center gap-2 bg-gray-800/70 hover:bg-gray-700/70 backdrop-blur-lg border border-gray-700 rounded-xl text-gray-300 hover:text-white transition-all duration-200 hover:scale-105 ${
                  isMobile ? 'px-4 py-2 text-sm' : 'px-6 py-3'
                }`}
              >
                <ChevronLeft className={isMobile ? 'w-4 h-4' : 'w-5 h-5'} />
                {!isMobile && 'Previous'}
              </button>
              
              <button
                onClick={nextSlide}
                className={`flex items-center gap-2 bg-gray-800/70 hover:bg-gray-700/70 backdrop-blur-lg border border-gray-700 rounded-xl text-gray-300 hover:text-white transition-all duration-200 hover:scale-105 ${
                  isMobile ? 'px-4 py-2 text-sm' : 'px-6 py-3'
                }`}
              >
                {!isMobile && 'Next'}
                <ChevronRight className={isMobile ? 'w-4 h-4' : 'w-5 h-5'} />
              </button>
            </div> */}

            {/* Project Info Display */}
            <div className="text-center mt-8 md:mt-12">
              {/* <h3 className={`font-bold text-white mb-4 transition-all duration-500 ${
                isMobile ? 'text-xl' : 'text-3xl'
              }`}>
                {currentProject.title}
              </h3>
              {!isMobile && (
                <p className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
                  {currentProject.description}
                </p>
              )} */}

              {/* Navigation Dots */}
              {/* <div className="flex justify-center mt-6 gap-2">
                {SIMPLE_PROJECTS.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? "bg-cyan-500 w-8"
                        : "bg-gray-600 hover:bg-gray-500"
                    }`}
                    aria-label={`Go to project ${index + 1}`}
                  />
                ))}
              </div> */}
            </div>
          </div>
        ) : (
          // Detailed Grid View (Mobile-optimized)
          <div className="relative max-w-5xl mx-auto">
            <div className="bg-gray-800/40 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-gray-700/50">
              <div className={`grid gap-0 min-h-[400px] md:min-h-[500px] ${isMobile ? 'grid-cols-1' : 'lg:grid-cols-2'}`}>
                {/* Image Section */}
                <div className={`relative overflow-hidden ${isMobile ? 'h-64' : ''}`}>
                  <img
                    src={currentProject.imageUrl}
                    alt={currentProject.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-900/40 to-transparent" />
                  <div className={`absolute left-4 md:left-6 ${isMobile ? 'top-4' : 'bottom-6'}`}>
                    <div className="flex gap-2">
                      {currentProject.featured && (
                        <span className="px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-lg border border-cyan-400/30 text-cyan-300 text-sm rounded-full font-medium">
                          Featured
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className={`flex flex-col justify-center ${isMobile ? 'p-6' : 'p-8 lg:p-12'}`}>
                  <div className="mb-4">
                    <span className="text-sm text-gray-400 font-medium tracking-wider uppercase">
                      Project {String(currentIndex + 1).padStart(2, '0')}
                    </span>
                  </div>
                  
                  <h3 className={`font-bold text-white mb-4 md:mb-6 leading-tight ${
                    isMobile ? 'text-2xl' : 'text-4xl'
                  }`}>
                    {currentProject.title}
                  </h3>
                  
                  <p className={`text-gray-300 leading-relaxed mb-6 md:mb-8 ${
                    isMobile ? 'text-base' : 'text-lg'
                  }`}>
                    {currentProject.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 md:gap-3 mb-6 md:mb-10">
                    {currentProject.tags.map((tag) => (
                      <div
                        key={tag}
                        className={`flex items-center gap-1 bg-gray-700/50 backdrop-blur-sm text-gray-200 rounded-xl border border-gray-600/50 font-medium hover:bg-gray-600/50 transition-all duration-200 ${
                          isMobile ? 'px-3 py-1 text-sm' : 'px-4 py-2'
                        }`}
                      >
                        <img
                          src={getRealIconUrl(tag)}
                          alt={tag}
                          className="w-3 h-3"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                        <span>{tag}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className={`flex gap-3 md:gap-4 ${isMobile ? 'flex-col sm:flex-row' : ''}`}>
                    <a
                      href={currentProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-center gap-3 bg-gray-700/70 hover:bg-gray-600/70 text-white rounded-xl transition-all duration-200 font-semibold backdrop-blur-sm border border-gray-600/50 ${
                        isMobile ? 'px-4 py-3 text-sm flex-1' : 'px-6 py-3'
                      }`}
                    >
                      <Github className={isMobile ? 'w-4 h-4' : 'w-5 h-5'} />
                      View Code
                    </a>
                    <a
                      href={currentProject.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-center gap-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white rounded-xl transition-all duration-200 font-semibold shadow-lg shadow-cyan-500/25 ${
                        isMobile ? 'px-4 py-3 text-sm flex-1' : 'px-6 py-3'
                      }`}
                    >
                      <ExternalLink className={isMobile ? 'w-4 h-4' : 'w-5 h-5'} />
                      Live Demo
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation for Grid View */}
            <div className="flex justify-center items-center mt-6 md:mt-8">
              <div className="flex gap-2">
                {SIMPLE_PROJECTS.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? 'bg-cyan-500 scale-125'
                        : 'bg-gray-600 hover:bg-gray-500'
                    }`}
                    aria-label={`Go to project ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* View All Projects Button */}
        <div className="text-center mt-12 md:mt-16">
          <a
            href="/projects"
            className={`inline-flex items-center gap-2 text-white font-semibold bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl hover:from-cyan-700 hover:to-blue-700 transition-all duration-300 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105 ${
              isMobile ? 'px-6 py-3 text-sm' : 'px-8 py-4'
            }`}
          >
            View All Projects
            <ExternalLink className={isMobile ? 'w-4 h-4' : 'w-5 h-5'} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default CombinedProjects;