"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Github, ExternalLink, Calendar, Star, Code, Globe, Smartphone, Database, Zap, X, Users, Clock, Award, Move, 
  Server, Package, Cpu, Cloud, GitBranch, Layers, Terminal, Settings, Globe2, Monitor, 
  Code2, FileCode, Network, Shield, Palette, Layout, BarChart, PieChart, 
  Activity, TrendingUp, Box, Package2, Lock, Key, MessageSquare, Bell, 
  Search, Filter, Download, Upload, RefreshCw, Play, Pause, SkipForward, SkipBack, 
  Volume2, Wifi, Battery, Bluetooth, Usb, HardDrive, MemoryStick, Dna, 
  Atom, Beaker, TestTube, Microscope, Stethoscope, Eye, 
  Camera, Video, Image, Music, Headphones, Speaker, Radio, Tv, Gamepad2, 
  Joystick, Trophy, Medal, ThumbsUp, ThumbsDown, MessageCircle, 
  Phone, Send, Share2, Link2, Copy, Clipboard, 
  Check, Plus, Minus, ChevronLeft, ChevronRight, ChevronUp, ChevronDown, 
  MoreHorizontal, MoreVertical, Menu, Home, User, LogOut, LogIn, 
  HelpCircle, Info, AlertCircle, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { Project } from '@/types/project';
import { categoryIcons, categoryColors, statusColors } from '@/constants/projectConstants';
import { getRealIconUrl } from '@/utils/realTechIcons';

interface DraggableTooltipProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
  initialPosition?: { x: number; y: number };
}

export default function DraggableTooltip({ project, isOpen, onClose, initialPosition = { x: 100, y: 100 } }: DraggableTooltipProps) {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const dragHandleRef = useRef<HTMLDivElement>(null);

  // Check if mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Position tooltip properly on mobile
  useEffect(() => {
    if (isOpen && isMobile) {
      // Position tooltip for mobile with proper spacing for scrollability
      const mobilePosition = {
        x: 10,
        y: 10
      };
      setPosition(mobilePosition);
    } else if (isOpen && initialPosition.x !== 100 && initialPosition.y !== 100) {
      setPosition(initialPosition);
    }
  }, [isOpen, initialPosition, isMobile]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMobile) return; // Disable dragging on mobile
    if (!dragHandleRef.current?.contains(e.target as Node)) return;
    
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
    
    e.preventDefault();
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || isMobile) return;
    
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  }, [isDragging, dragStart, isMobile]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging && !isMobile) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp, isMobile]);

  const Icon = categoryIcons[project.category];
  const colorClass = categoryColors[project.category];

  if (!isOpen) return null;

  return (
    <div
      ref={tooltipRef}
      className={`fixed z-50 bg-gray-900 border-2 border-gray-700 rounded-lg pointer-events-auto transition-all duration-200 ${
        isMobile ? 'w-[calc(100vw-20px)] max-w-none' : 'w-full max-w-[500px]'
      }`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: isDragging ? 'grabbing' : 'default'
      }}
    >
      {/* Drag Handle */}
      <div
        ref={dragHandleRef}
        className={`flex items-center justify-between px-4 py-3 border-b-2 border-gray-800 transition-colors ${
          isMobile ? 'cursor-default' : 'cursor-grab active:cursor-grabbing hover:bg-gray-800/50'
        }`}
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2">
          <Move className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-400 font-medium">
            {isMobile ? 'Project Details' : 'Drag to move'}
          </span>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 bg-gray-800 hover:bg-gray-700 rounded-md flex items-center justify-center text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      <div className={`overflow-y-auto scrollbar-hide ${
        isMobile ? 'p-4 max-h-[calc(100vh-120px)]' : 'p-6 max-h-[500px]'
      }`}>
        {/* Header */}
        <div className={`flex items-start justify-between mb-5 ${isMobile ? 'gap-2' : 'gap-3'}`}>
          <div className="flex items-start gap-3 flex-1">
            <div className={`${
              isMobile ? 'w-10 h-10' : 'w-12 h-12'
            } bg-gradient-to-r ${colorClass} rounded-lg flex items-center justify-center flex-shrink-0`}>
              <Icon className={`${isMobile ? 'w-5 h-5' : 'w-6 h-6'} text-white`} />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className={`text-white font-bold mb-2 ${
                isMobile ? 'text-lg' : 'text-xl'
              }`}>{project.title}</h4>
              <div className="flex flex-wrap items-center gap-2">
                <span className={`px-3 py-1 ${statusColors[project.status || 'completed']} border rounded-full text-xs font-semibold uppercase`}>
                  {project.status?.replace('-', ' ')}
                </span>
                <span className="text-sm text-gray-400">{project.date}</span>
              </div>
            </div>
          </div>
          {project.featured && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-500/20 border-2 border-yellow-500/40 rounded-full flex-shrink-0">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="text-yellow-500 text-xs font-bold">Featured</span>
            </div>
          )}
        </div>

        {/* Image */}
        <div className={`relative overflow-hidden rounded-lg mb-5 border-2 border-gray-800 ${
          isMobile ? 'h-40' : 'h-52'
        }`}>
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Description */}
        <div className="mb-5">
          <h5 className="text-sm font-bold text-gray-300 mb-2 uppercase">About Project</h5>
          <p className={`text-gray-400 leading-relaxed ${
            isMobile ? 'text-xs' : 'text-sm'
          }`}>
            {project.longDescription || project.description}
          </p>
        </div>

        {/* Additional Info */}
        {(project.duration || project.teamSize) && (
          <div className={`grid gap-3 mb-5 ${
            isMobile ? 'grid-cols-1' : 'grid-cols-2'
          }`}>
            {project.duration && (
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg">
                <Clock className="w-4 h-4 text-blue-400" />
                <span className={`text-gray-300 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                  {project.duration}
                </span>
              </div>
            )}
            {project.teamSize && (
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg">
                <Users className="w-4 h-4 text-green-400" />
                <span className={`text-gray-300 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                  {project.teamSize} members
                </span>
              </div>
            )}
          </div>
        )}

        {/* Achievements */}
        {project.achievements && project.achievements.length > 0 && (
          <div className="mb-5">
            <h5 className="text-sm font-bold text-gray-300 mb-3 flex items-center gap-2 uppercase">
              <Award className="w-4 h-4 text-yellow-500" />
              Key Achievements
            </h5>
            <div className="space-y-2">
              {project.achievements.map((achievement, index) => (
                <div key={index} className="flex items-start gap-2 px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span className={`text-gray-300 ${
                    isMobile ? 'text-xs' : 'text-sm'
                  }`}>{achievement}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Technologies */}
        <div className="mb-5">
          <h5 className="text-sm font-bold text-gray-300 mb-3 uppercase">Technologies</h5>
          {project.technologies ? (
            <div className={`grid gap-2 ${
              isMobile ? 'grid-cols-2' : 'grid-cols-3 sm:grid-cols-3'
            }`}>
              {Object.values(project.technologies).flat().map((tech, index) => (
                <div
                  key={`${tech}-${index}`}
                  className={`flex flex-col items-center justify-center p-2 bg-gray-800 border border-gray-700 rounded-lg hover:border-gray-600 transition-colors group cursor-pointer ${
                    isMobile ? 'p-1.5' : 'p-2'
                  }`}
                  title={tech}
                >
                  <img
                    src={getRealIconUrl(tech)}
                    alt={tech}
                    className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} mb-1 group-hover:scale-110 transition-transform`}
                    onError={(e) => {
                      // Fallback to a simple text representation if image fails
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        const fallback = document.createElement('div');
                        fallback.className = `${isMobile ? 'w-4 h-4' : 'w-5 h-5'} bg-gray-600 rounded flex items-center justify-center text-xs text-white font-bold`;
                        fallback.textContent = tech.charAt(0).toUpperCase();
                        parent.insertBefore(fallback, target);
                      }
                    }}
                  />
                  <span className={`text-gray-400 group-hover:text-gray-300 text-center truncate w-full ${
                    isMobile ? 'text-[10px]' : 'text-xs'
                  }`}>
                    {isMobile && tech.length > 6 ? tech.substring(0, 6) + '...' : 
                     !isMobile && tech.length > 8 ? tech.substring(0, 8) + '...' : tech}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className={`px-3 py-1.5 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 font-medium ${
                    isMobile ? 'text-[10px] px-2 py-1' : 'text-xs'
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Stats */}
        {project.stats && (
          <div className="mb-5">
            <h5 className="text-sm font-bold text-gray-300 mb-3 uppercase">Project Statistics</h5>
            <div className={`grid gap-3 ${
              isMobile ? 'grid-cols-3' : 'grid-cols-3'
            }`}>
              <div className="bg-gray-800 border-2 border-gray-700 rounded-lg p-3 text-center">
                <div className="flex items-center justify-center gap-1.5 text-yellow-500 mb-1">
                  <Star className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} />
                  <span className={`font-bold text-white ${
                    isMobile ? 'text-lg' : 'text-xl'
                  }`}>{project.stats.stars}</span>
                </div>
                <div className={`text-gray-400 font-semibold ${
                  isMobile ? 'text-[10px]' : 'text-xs'
                }`}>Stars</div>
              </div>
              <div className="bg-gray-800 border-2 border-gray-700 rounded-lg p-3 text-center">
                <div className="flex items-center justify-center gap-1.5 text-blue-500 mb-1">
                  <Code className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} />
                  <span className={`font-bold text-white ${
                    isMobile ? 'text-lg' : 'text-xl'
                  }`}>{project.stats.forks}</span>
                </div>
                <div className={`text-gray-400 font-semibold ${
                  isMobile ? 'text-[10px]' : 'text-xs'
                }`}>Forks</div>
              </div>
              <div className="bg-gray-800 border-2 border-gray-700 rounded-lg p-3 text-center">
                <span className={`font-bold text-white mb-1 block ${
                  isMobile ? 'text-lg' : 'text-xl'
                }`}>{project.stats.issues}</span>
                <div className={`text-gray-400 font-semibold ${
                  isMobile ? 'text-[10px]' : 'text-xs'
                }`}>Issues</div>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className={`flex grid-cols-2 items-center gap-3 pt-5 border-t-2 border-gray-800`}>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center gap-2 px-4 py-3 bg-gray-800 hover:bg-gray-700 border-2 border-gray-700 rounded-lg text-gray-300 hover:text-white transition-colors font-semibold ${
              isMobile ? 'flex-1 text-xs px-3 py-2.5' : 'flex-1 text-sm'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <Github className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} />
            View Code
          </a>
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r ${colorClass} rounded-lg text-white font-semibold transition-transform hover:scale-105 ${
              isMobile ? 'flex-1 text-xs px-3 py-2.5' : 'flex-1 text-sm'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} />
            Live Demo
          </a>
        </div>
      </div>
      
      {/* Custom CSS for scrollbar hiding */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;  /* Internet Explorer 10+ */
          scrollbar-width: none;  /* Firefox */
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;  /* Safari and Chrome */
        }
      `}</style>
    </div>
  );
}