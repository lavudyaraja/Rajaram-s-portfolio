"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Github, ExternalLink, Calendar, Star, Code, Globe, Smartphone, Database, Zap, ChevronLeft, ChevronRight, Search, ArrowRight, Eye, GitBranch } from 'lucide-react';
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
  const [isMobile, setIsMobile] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

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

  const handleProjectClick = (project: Project, e: React.MouseEvent) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    // Adjust tooltip positioning for mobile
    if (isMobile) {
      setTooltipPosition({ x: 10, y: 10 });
    } else {
      const x = Math.max(20, Math.min(rect.left, window.innerWidth - 720));
      const y = Math.max(20, Math.min(rect.bottom + 10, window.innerHeight - 620));
      setTooltipPosition({ x, y });
    }
    setSelectedProject(project);
  };

  const handleCloseTooltip = () => {
    setSelectedProject(null);
  };

  // Create staggered animation delays for cards
  const getAnimationDelay = (index: number) => {
    return `${400 + (index * 100)}ms`;
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

        {/* Modern Masonry Grid */}
        <div className={`relative ${isVisible ? 'animate-fade-in-up animation-delay-400' : 'opacity-0'}`}>
          {filteredProjects.length > 0 ? (
            <div 
              ref={gridRef}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
            >
              {filteredProjects.map((project, index) => {
                const Icon = categoryIcons[project.category];
                const colorClass = categoryColors[project.category];
                const isEven = index % 2 === 0;
                
                return (
                  <div
                    key={project.id}
                    className={`group relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-5 sm:p-6 cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:border-gray-600/70 hover:shadow-2xl hover:shadow-gray-900/20 ${
                      isVisible ? 'animate-fade-in-up' : 'opacity-0'
                    }`}
                    style={{ animationDelay: getAnimationDelay(index) }}
                    onClick={(e) => handleProjectClick(project, e)}
                  >
                    {/* Animated Background Gradient */}
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${colorClass} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                    
                    {/* Featured Badge */}
                    {project.featured && (
                      <div className="absolute -top-2 -right-2 z-10">
                        <div className="relative">
                          <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                          <div className="absolute inset-0 w-6 h-6 bg-yellow-500/30 rounded-full animate-ping" />
                        </div>
                      </div>
                    )}

                    {/* Project Header */}
                    <div className="relative z-10 mb-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 bg-gradient-to-r ${colorClass} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h3 className="text-white font-bold text-base sm:text-lg mb-1 group-hover:text-gray-100 transition-colors">
                              {project.title}
                            </h3>
                            <span className={`inline-block px-2 py-1 text-xs font-bold rounded-full ${statusColors[project.status || 'completed']} border`}>
                              {project.status?.replace('-', ' ')}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Project Description */}
                    <div className="relative z-10 mb-4">
                      <p className="text-gray-300 text-sm leading-relaxed line-clamp-3 min-h-[60px]">
                        {project.description}
                      </p>
                    </div>

                    {/* Tech Stack */}
                    <div className="relative z-10 mb-4">
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.slice(0, 3).map((tag, tagIndex) => (
                          <div
                            key={tag}
                            className="flex items-center gap-1 px-2 py-1 bg-gray-700/50 border border-gray-600/50 rounded-lg text-xs text-gray-300 group-hover:bg-gray-600/50 transition-colors"
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
                        {project.tags.length > 3 && (
                          <span className="px-2 py-1 bg-gray-700/50 border border-gray-600/50 rounded-lg text-xs text-gray-400">
                            +{project.tags.length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Project Footer */}
                    <div className="relative z-10 pt-3 border-t border-gray-700/50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-xs text-gray-400">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{project.date}</span>
                          </div>
                          {project.stats && (
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 text-yellow-500" />
                              <span className="font-semibold">{project.stats.stars}</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-gray-700/50 hover:bg-gray-600/50 border border-gray-600/50 rounded-lg transition-all duration-200 group-hover:scale-110"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Github className="w-4 h-4 text-gray-300" />
                          </a>
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`p-2 bg-gradient-to-r ${colorClass} hover:opacity-80 rounded-lg transition-all duration-200 group-hover:scale-110`}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ExternalLink className="w-4 h-4 text-white" />
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Hover Effect Overlay */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>
                );
              })}
            </div>
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
        {/* <div className={`text-center mt-12 sm:mt-16 ${isVisible ? 'animate-fade-in-up animation-delay-600' : 'opacity-0'}`}>
          <a
            href="/projects"
            className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg sm:rounded-xl text-white font-bold text-sm sm:text-base lg:text-lg transition-transform hover:scale-105"
          >
            View All Projects
            <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
          </a>
        </div> */}
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