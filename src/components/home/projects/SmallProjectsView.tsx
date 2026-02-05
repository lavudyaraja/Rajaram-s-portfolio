"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Github, ExternalLink, Calendar, Star, Code, Globe, Smartphone, Database, Zap, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { Project } from '@/types/project';
import { PROJECTS } from '@/data/projects';
import { categoryIcons, categoryColors, statusColors } from '@/constants/projectConstants';
import { useCarousel } from '@/hooks/useCarousel';
import { getRealIconUrl } from '@/utils/realTechIcons';
import DraggableTooltip from './DraggableTooltip';

export default function SmallProjectsView() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | Project['category']>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 100, y: 100 });
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const filteredProjects = PROJECTS.filter(project => {
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const { currentIndex, setCurrentIndex, isPaused, setIsPaused, goToSlide } = useCarousel(filteredProjects.length, 4000);

  const visibleProjects = filteredProjects.slice(currentIndex, currentIndex + 3);
  const hasMoreProjects = filteredProjects.length > 3;

  const handleProjectClick = (project: Project, e: React.MouseEvent) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const x = Math.max(20, Math.min(rect.left, window.innerWidth - 720));
    const y = Math.max(20, Math.min(rect.bottom + 10, window.innerHeight - 620));
    
    setTooltipPosition({ x, y });
    setSelectedProject(project);
  };

  const handleCloseTooltip = () => {
    setSelectedProject(null);
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className={`text-center mb-8 sm:mb-12 lg:mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4">My Projects</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base lg:text-lg">
            Click on any project to explore detailed information
          </p>
        </div>

        {/* Search and Filters */}
        <div className={`flex flex-col gap-4 sm:gap-6 items-center justify-between mb-8 sm:mb-12 ${isVisible ? 'animate-fade-in-up animation-delay-200' : 'opacity-0'}`}>
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
        <div className={`relative ${isVisible ? 'animate-fade-in-up animation-delay-400' : 'opacity-0'}`}>
          {filteredProjects.length > 0 ? (
            <>
              {/* Carousel */}
              <div
                ref={carouselRef}
                className="relative overflow-hidden py-2 sm:py-4"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <div className="flex gap-4 sm:gap-6 transition-transform duration-500 ease-in-out">
                  {visibleProjects.map((project, index) => {
                    const Icon = categoryIcons[project.category];
                    const colorClass = categoryColors[project.category];
                    
                    return (
                      <div
                        key={project.id}
                        className={`bg-gray-900 border-2 border-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-5 cursor-pointer transition-all duration-300 hover:border-gray-600 hover:scale-105 min-w-[300px] sm:min-w-[380px] ${
                          isVisible ? 'animate-fade-in-up' : 'opacity-0'
                        }`}
                        style={{ animationDelay: `${600 + index * 100}ms` }}
                        onClick={(e) => handleProjectClick(project, e)}
                      >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-3 sm:mb-4">
                          <div className="flex items-center gap-2 sm:gap-3">
                            <div className={`w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r ${colorClass} rounded-lg flex items-center justify-center`}>
                              <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                            </div>
                            <h3 className="text-white font-bold text-sm sm:text-base lg:text-lg">{project.title}</h3>
                          </div>
                          {project.featured && (
                            <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 fill-yellow-500" />
                          )}
                        </div>
                        
                        {/* Description */}
                        <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-2 min-h-[32px] sm:min-h-[40px]">
                          {project.description}
                        </p>
                        
                        {/* Footer */}
                        <div className="flex items-center justify-between pt-2 sm:pt-3 border-t-2 border-gray-800">
                          <div className="flex items-center gap-1.5 sm:gap-2">
                            <span className={`px-2 sm:px-3 py-1 ${statusColors[project.status || 'completed']} border rounded-full text-xs font-bold uppercase`}>
                              {project.status?.replace('-', ' ')}
                            </span>
                            <span className="text-xs text-gray-500 font-medium hidden sm:inline">{project.date}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-sm text-gray-500">
                            {project.stats && (
                              <>
                                <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" />
                                <span className="font-semibold text-xs sm:text-sm">{project.stats.stars}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
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
            <div className={`text-center py-12 sm:py-20 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
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
        <div className={`text-center mt-12 sm:mt-16 ${isVisible ? 'animate-fade-in-up animation-delay-600' : 'opacity-0'}`}>
          <a
            href="/projects"
            className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg sm:rounded-xl text-white font-bold text-sm sm:text-base lg:text-lg transition-transform hover:scale-105"
          >
            View All Projects
            <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
          </a>
        </div>
      </div>

      {/* Draggable Tooltip */}
      {selectedProject && (
        <DraggableTooltip
          project={selectedProject}
          isOpen={true}
          onClose={handleCloseTooltip}
          initialPosition={tooltipPosition}
        />
      )}

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
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}