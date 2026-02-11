"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Github, ExternalLink, Calendar, Star, Code, Globe, Smartphone, Database, Zap, X, Users, Clock, Award, Search } from 'lucide-react';
import { Project } from '@/types/project';
import { PROJECTS } from '@/data/projects';
import { categoryIcons, categoryColors, statusColors } from '@/constants/projectConstants';
import { useCarousel } from '@/hooks/useCarousel';
import { getRealIconUrl } from '@/utils/realTechIcons';

interface ProjectTooltipProps {
  project: Project;
  children: React.ReactNode;
  isVisible: boolean;
  onVisibilityChange: (visible: boolean) => void;
  isClicked: boolean;
  onClick: () => void;
}

function ProjectTooltip({ project, children, isVisible, onVisibilityChange, isClicked, onClick }: ProjectTooltipProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [isHoveringTooltip, setIsHoveringTooltip] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (tooltipRef.current) {
      const rect = tooltipRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      let x = e.clientX + 15;
      let y = e.clientY + 15;
      
      if (x + rect.width > viewportWidth) {
        x = e.clientX - rect.width - 15;
      }
      if (y + rect.height > viewportHeight) {
        y = e.clientY - rect.height - 15;
      }
      
      setPosition({ x, y });
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onClick();
  };

  const shouldShow = isVisible || isClicked || isHoveringTooltip;

  const Icon = categoryIcons[project.category];
  const colorClass = categoryColors[project.category];

  return (
    <div
      className="relative"
      onMouseEnter={() => onVisibilityChange(true)}
      onMouseLeave={() => {
        onVisibilityChange(false);
        setTimeout(() => {
          if (!isHoveringTooltip && !isClicked) {
            onVisibilityChange(false);
          }
        }, 100);
      }}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
    >
      {children}
      
      {shouldShow && (
        <div
          ref={tooltipRef}
          className="fixed z-50 w-screen max-w-md bg-gray-900 border-2 border-gray-700 rounded-lg p-6 pointer-events-auto"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
          }}
          onMouseEnter={() => setIsHoveringTooltip(true)}
          onMouseLeave={() => {
            setIsHoveringTooltip(false);
            if (!isClicked) {
              onVisibilityChange(false);
            }
          }}
        >
          {isClicked && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onClick();
              }}
              className="absolute top-3 right-3 w-8 h-8 bg-gray-800 hover:bg-gray-700 rounded-md flex items-center justify-center text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3 flex-1 pr-8">
              <div className={`w-10 h-10 bg-gradient-to-r ${colorClass} rounded-lg flex items-center justify-center`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-white font-bold text-lg leading-tight">{project.title}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`px-2 py-0.5 ${statusColors[project.status || 'completed']} border rounded-full text-xs font-bold uppercase`}>
                    {project.status?.replace('-', ' ')}
                  </span>
                  <span className="text-xs text-gray-400">{project.date}</span>
                </div>
              </div>
            </div>
            {project.featured && (
              <div className="flex items-center gap-1 px-2 py-1 bg-yellow-500/20 border-2 border-yellow-500/40 rounded-full">
                <Star className="w-3 h-3 text-yellow-500" />
                <span className="text-yellow-500 text-xs font-bold">Featured</span>
              </div>
            )}
          </div>

          {/* Image */}
          <div className="relative h-40 overflow-hidden rounded-lg mb-4 border-2 border-gray-800">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Description */}
          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            {project.longDescription || project.description}
          </p>

          {/* Additional Info */}
          {(project.duration || project.teamSize) && (
            <div className="grid grid-cols-2 gap-2 mb-4">
              {project.duration && (
                <div className="flex items-center gap-2 text-xs text-gray-400 px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg">
                  <Clock className="w-3 h-3" />
                  <span>{project.duration}</span>
                </div>
              )}
              {project.teamSize && (
                <div className="flex items-center gap-2 text-xs text-gray-400 px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg">
                  <Users className="w-3 h-3" />
                  <span>{project.teamSize} members</span>
                </div>
              )}
            </div>
          )}

          {/* Technologies */}
          <div className="mb-4">
            <h5 className="text-xs font-bold text-gray-300 mb-2 uppercase">Technologies</h5>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.slice(0, 6).map((tag) => (
                <div
                  key={tag}
                  className="flex items-center gap-1 px-2 py-1 bg-gray-800 border border-gray-700 rounded text-xs text-gray-300 font-medium"
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
              {project.tags.length > 6 && (
                <span className="px-2 py-1 bg-gray-800 border border-gray-700 rounded text-xs text-gray-400">
                  +{project.tags.length - 6}
                </span>
              )}
            </div>
          </div>

          {/* Achievements */}
          {project.achievements && project.achievements.length > 0 && (
            <div className="mb-4">
              <h5 className="text-xs font-bold text-gray-300 mb-2 flex items-center gap-1 uppercase">
                <Award className="w-3 h-3 text-yellow-500" />
                Key Achievements
              </h5>
              <div className="space-y-1.5">
                {project.achievements.slice(0, 2).map((achievement, index) => (
                  <div key={index} className="flex items-start gap-2 px-2 py-1.5 bg-gray-800/50 border border-gray-700 rounded-lg">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                    <span className="text-gray-300 text-xs">{achievement}</span>
                  </div>
                ))}
                {project.achievements.length > 2 && (
                  <span className="text-gray-400 text-xs ml-2">+{project.achievements.length - 2} more...</span>
                )}
              </div>
            </div>
          )}

          {/* Stats */}
          {project.stats && (
            <div className="flex items-center gap-4 mb-4 text-xs">
              <div className="flex items-center gap-1.5 text-gray-400">
                <Star className="w-3 h-3 text-yellow-500" />
                <span className="font-semibold">{project.stats.stars} stars</span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-400">
                <Code className="w-3 h-3 text-blue-500" />
                <span className="font-semibold">{project.stats.forks} forks</span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-400">
                <span className="font-semibold">{project.stats.issues} issues</span>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-2 pt-4 border-t-2 border-gray-800">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-800 hover:bg-gray-700 border-2 border-gray-700 rounded-lg text-gray-300 hover:text-white transition-colors text-sm font-semibold"
            >
              <Github className="w-4 h-4" />
              Code
            </a>
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r ${colorClass} rounded-lg text-white font-semibold transition-transform hover:scale-105 text-sm`}
            >
              <ExternalLink className="w-4 h-4" />
              Live Demo
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CarouselProjectsView() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | Project['category']>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [clickedProject, setClickedProject] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const filteredProjects = PROJECTS.filter(project => {
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const { currentIndex, setCurrentIndex, isPaused, setIsPaused, goToSlide } = useCarousel(filteredProjects.length, 4000);

  // Show 1 project on mobile, 3 on desktop
  const visibleCount = isMobile ? 1 : 3;
  const visibleProjects = filteredProjects.slice(currentIndex, currentIndex + visibleCount);
  const hasMoreProjects = filteredProjects.length > visibleCount;

  const handleProjectClick = (projectId: string) => {
    setClickedProject(clickedProject === projectId ? null : projectId);
  };

  const handleProjectHover = (projectId: string | null) => {
    setHoveredProject(projectId);
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className={`text-center mb-8 sm:mb-12 lg:mb-16 ${!isMobile && isVisible ? 'animate-fade-in-up' : ''}`}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4">My Projects</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base lg:text-lg">
            Hover over projects to explore detailed information
          </p>
        </div>

        {/* Search and Filters */}
        <div className={`flex flex-col gap-4 sm:gap-6 items-center justify-between mb-8 sm:mb-12 ${!isMobile && isVisible ? 'animate-fade-in-up animation-delay-200' : ''}`}>
          {/* Search */}
          <div className="relative w-full sm:w-auto lg:w-96">
            <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 bg-gray-900 border-2 border-gray-800 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors font-medium text-sm sm:text-base"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center lg:justify-end">
            {[
              { id: 'all', label: 'All Projects' },
              { id: 'web', label: 'Web Apps' },
              { id: 'mobile', label: 'Mobile' },
              { id: 'ai', label: 'AI/ML' },
              { id: 'fullstack', label: 'Full Stack' }
            ].map((category) => {
              const isActive = selectedCategory === category.id;
              
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id as typeof selectedCategory)}
                  className={`px-3 sm:px-5 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-300 text-xs sm:text-sm ${
                    isActive
                      ? 'bg-blue-600 text-white border-2 border-blue-500'
                      : 'bg-gray-900 border-2 border-gray-800 text-gray-400 hover:border-gray-700 hover:text-white'
                  }`}
                >
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Carousel Container */}
        <div className={`relative ${!isMobile && isVisible ? 'animate-fade-in-up animation-delay-400' : ''}`}>
          {filteredProjects.length > 0 ? (
            <>
              {/* Carousel */}
              <div
                ref={carouselRef}
                className="relative overflow-hidden py-2 sm:py-4"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <div className={`flex gap-4 sm:gap-6 transition-transform duration-500 ease-in-out ${
                  isMobile ? 'justify-center' : ''
                }`}>
                  {visibleProjects.map((project, index) => {
                    const Icon = categoryIcons[project.category];
                    const colorClass = categoryColors[project.category];
                    
                    return (
                      <ProjectTooltip
                        key={project.id}
                        project={project}
                        isVisible={hoveredProject === project.id}
                        onVisibilityChange={(visible) => handleProjectHover(visible ? project.id : null)}
                        isClicked={clickedProject === project.id}
                        onClick={() => handleProjectClick(project.id)}
                      >
                        <div
                          className={`bg-gray-900 border-2 border-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-6 cursor-pointer transition-all duration-300 hover:border-gray-600 hover:scale-105 ${
                            isMobile ? 'min-w-[calc(100vw-80px)] max-w-[400px]' : 'min-w-[300px] sm:min-w-[400px]'
                          } ${
                            !isMobile && isVisible ? 'animate-fade-in-up' : ''
                          }`}
                          style={{ animationDelay: `${600 + index * 100}ms` }}
                        >
                          {/* Header */}
                          <div className="flex items-center justify-between mb-3 sm:mb-5">
                            <div className="flex items-center gap-2 sm:gap-3">
                              <div className={`w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r ${colorClass} rounded-lg flex items-center justify-center`}>
                                <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                              </div>
                              <h3 className="text-white font-bold text-sm sm:text-base lg:text-xl">{project.title}</h3>
                            </div>
                            {project.featured && (
                              <Star className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-500 fill-yellow-500" />
                            )}
                          </div>
                          
                          {/* Image */}
                          <div className="relative h-32 sm:h-40 lg:h-48 overflow-hidden rounded-lg mb-3 sm:mb-5 border-2 border-gray-800">
                            <img
                              src={project.imageUrl}
                              alt={project.title}
                              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                            />
                            
                            {/* Status Badge */}
                            <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3">
                              <span className={`px-2 sm:px-3 py-1 sm:py-1.5 ${statusColors[project.status || 'completed']} border rounded-full text-xs font-bold uppercase`}>
                                {project.status?.replace('-', ' ')}
                              </span>
                            </div>
                          </div>
                          
                          {/* Description */}
                          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-5 line-clamp-3 min-h-[48px] sm:min-h-[60px]">
                            {project.description}
                          </p>
                          
                          {/* Footer */}
                          <div className="flex items-center justify-between pt-2 sm:pt-4 border-t-2 border-gray-800">
                            <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-500">
                              <span className="font-semibold">{project.date}</span>
                              {project.duration && (
                                <>
                                  <span className="hidden sm:inline">•</span>
                                  <span className="hidden sm:inline">{project.duration}</span>
                                </>
                              )}
                            </div>
                            <div className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-500">
                              {project.stats && (
                                <>
                                  <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" />
                                  <span className="font-bold">{project.stats.stars}</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </ProjectTooltip>
                    );
                  })}
                </div>
              </div>

              {/* Dots Indicator */}
              {hasMoreProjects && (
                <div className="flex justify-center gap-1.5 sm:gap-2 mt-6 sm:mt-8">
                  {Array.from({ length: Math.min(filteredProjects.length, 5) }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${
                        currentIndex === index ? 'bg-blue-500 w-4 sm:w-8' : 'bg-gray-700 hover:bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className={`text-center py-12 sm:py-20 ${!isMobile && isVisible ? 'animate-fade-in-up' : ''}`}>
              <div className="text-gray-400 text-lg sm:text-xl mb-4 sm:mb-6">No projects found matching your criteria</div>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchTerm('');
                }}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-bold transition-colors text-sm sm:text-base"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* View All Button */}
        <div className={`text-center mt-12 sm:mt-16 ${!isMobile && isVisible ? 'animate-fade-in-up animation-delay-600' : ''}`}>
          <a
            href="/projects"
            className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg sm:rounded-xl text-white font-bold text-sm sm:text-base lg:text-lg transition-transform hover:scale-105"
          >
            View All Projects
            <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
          </a>
        </div>
      </div>

      {/* Custom CSS */}
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        .animation-delay-600 { animation-delay: 0.6s; }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}
