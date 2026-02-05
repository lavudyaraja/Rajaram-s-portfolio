"use client";

import React, { useState, useRef, useEffect } from 'react';
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
  const tooltipRef = useRef<HTMLDivElement>(null);
  const dragHandleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && initialPosition.x !== 100 && initialPosition.y !== 100) {
      setPosition(initialPosition);
    }
  }, [isOpen, initialPosition]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!dragHandleRef.current?.contains(e.target as Node)) return;
    
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
    
    e.preventDefault();
    e.stopPropagation();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    
    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;
    
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const tooltipWidth = Math.min(viewportWidth - 40, 700);
    const tooltipHeight = 600;
    
    const boundedX = Math.max(20, Math.min(newX, viewportWidth - tooltipWidth - 20));
    const boundedY = Math.max(20, Math.min(newY, viewportHeight - tooltipHeight - 20));
    
    setPosition({ x: boundedX, y: boundedY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = 'none';
      document.body.style.cursor = 'grabbing';
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    };
  }, [isDragging, dragStart]);

  const Icon = categoryIcons[project.category];
  const colorClass = categoryColors[project.category];

  if (!isOpen) return null;

  return (
    <div
      ref={tooltipRef}
      className="fixed z-50 bg-gray-900 border-2 border-gray-700 rounded-lg pointer-events-auto transition-all duration-200 w-full max-w-[500px]"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: isDragging ? 'grabbing' : 'default'
      }}
    >
      {/* Drag Handle */}
      <div
        ref={dragHandleRef}
        className="flex items-center justify-between px-4 py-3 border-b-2 border-gray-800 cursor-grab active:cursor-grabbing hover:bg-gray-800/50 transition-colors"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2">
          <Move className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-400 font-medium">Drag to move</span>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 bg-gray-800 hover:bg-gray-700 rounded-md flex items-center justify-center text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      <div className="p-6 overflow-y-auto max-h-[500px] scrollbar-hide">
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-start gap-3 flex-1">
            <div className={`w-12 h-12 bg-gradient-to-r ${colorClass} rounded-lg flex items-center justify-center flex-shrink-0`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-white font-bold text-xl mb-2">{project.title}</h4>
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
        <div className="relative h-52 overflow-hidden rounded-lg mb-5 border-2 border-gray-800">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Description */}
        <div className="mb-5">
          <h5 className="text-sm font-bold text-gray-300 mb-2 uppercase">About Project</h5>
          <p className="text-gray-400 text-sm leading-relaxed">
            {project.longDescription || project.description}
          </p>
        </div>

        {/* Additional Info */}
        {(project.duration || project.teamSize) && (
          <div className="grid grid-cols-2 gap-3 mb-5">
            {project.duration && (
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg">
                <Clock className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-gray-300">{project.duration}</span>
              </div>
            )}
            {project.teamSize && (
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg">
                <Users className="w-4 h-4 text-green-400" />
                <span className="text-sm text-gray-300">{project.teamSize} members</span>
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
                  <span className="text-gray-300 text-sm">{achievement}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Technologies */}
        <div className="mb-5">
          <h5 className="text-sm font-bold text-gray-300 mb-3 uppercase">Technologies</h5>
          {project.technologies ? (
            <div className="grid grid-cols-3 sm:grid-cols-3 gap-2">
              {Object.values(project.technologies).flat().map((tech, index) => (
                <div
                  key={`${tech}-${index}`}
                  className="flex flex-col items-center justify-center p-2 bg-gray-800 border border-gray-700 rounded-lg hover:border-gray-600 transition-colors group cursor-pointer"
                  title={tech}
                >
                  <img
                    src={getRealIconUrl(tech)}
                    alt={tech}
                    className="w-5 h-5 mb-1 group-hover:scale-110 transition-transform"
                    onError={(e) => {
                      // Fallback to a simple text representation if image fails
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        const fallback = document.createElement('div');
                        fallback.className = 'w-5 h-5 bg-gray-600 rounded flex items-center justify-center text-xs text-white font-bold';
                        fallback.textContent = tech.charAt(0).toUpperCase();
                        parent.insertBefore(fallback, target);
                      }
                    }}
                  />
                  <span className="text-xs text-gray-400 group-hover:text-gray-300 text-center truncate w-full">
                    {tech.length > 8 ? tech.substring(0, 8) + '...' : tech}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 bg-gray-800 border border-gray-700 rounded-lg text-xs text-gray-300 font-medium"
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
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-gray-800 border-2 border-gray-700 rounded-lg p-3 text-center">
                <div className="flex items-center justify-center gap-1.5 text-yellow-500 mb-1">
                  <Star className="w-4 h-4" />
                  <span className="text-xl font-bold text-white">{project.stats.stars}</span>
                </div>
                <div className="text-xs text-gray-400 font-semibold">Stars</div>
              </div>
              <div className="bg-gray-800 border-2 border-gray-700 rounded-lg p-3 text-center">
                <div className="flex items-center justify-center gap-1.5 text-blue-500 mb-1">
                  <Code className="w-4 h-4" />
                  <span className="text-xl font-bold text-white">{project.stats.forks}</span>
                </div>
                <div className="text-xs text-gray-400 font-semibold">Forks</div>
              </div>
              <div className="bg-gray-800 border-2 border-gray-700 rounded-lg p-3 text-center">
                <span className="text-xl font-bold text-white mb-1 block">{project.stats.issues}</span>
                <div className="text-xs text-gray-400 font-semibold">Issues</div>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-3 pt-5 border-t-2 border-gray-800">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-800 hover:bg-gray-700 border-2 border-gray-700 rounded-lg text-gray-300 hover:text-white transition-colors text-sm font-semibold"
            onClick={(e) => e.stopPropagation()}
          >
            <Github className="w-4 h-4" />
            View Code
          </a>
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r ${colorClass} rounded-lg text-white font-semibold transition-transform hover:scale-105 text-sm`}
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink className="w-4 h-4" />
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