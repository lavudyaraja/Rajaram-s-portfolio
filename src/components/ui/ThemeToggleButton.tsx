"use client";

import { useState, useRef, useEffect } from "react";
import { useTheme } from "@/hooks/use-theme";
import { Sun, Moon, Monitor, ChevronDown } from "lucide-react";

const ThemeDropdown = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const themeColors = {
    dark: {
      bg: 'bg-gray-900',
      cardBg: 'bg-gray-800/50 border-gray-700/50',
      text: 'text-gray-100',
      textSecondary: 'text-gray-300',
      controlBg: 'bg-gray-800/80 hover:bg-gray-700',
      controlBorder: 'border-gray-600',
      buttonBg: 'bg-gray-700 hover:bg-gray-600',
      dotInactive: 'bg-gray-600 hover:bg-gray-500'
    },
    light: {
      bg: 'bg-gray-50',
      cardBg: 'bg-white/80 border-gray-200/50',
      text: 'text-gray-900',
      textSecondary: 'text-gray-600',
      controlBg: 'bg-white/80 hover:bg-white',
      controlBorder: 'border-gray-200',
      buttonBg: 'bg-gray-200 hover:bg-gray-300',
      dotInactive: 'bg-gray-300 hover:bg-gray-400'
    },
    system: {
      bg: 'bg-slate-800',
      cardBg: 'bg-slate-700/50 border-slate-600/50',
      text: 'text-slate-100',
      textSecondary: 'text-slate-300',
      controlBg: 'bg-slate-700/80 hover:bg-slate-600',
      controlBorder: 'border-slate-500',
      buttonBg: 'bg-slate-600 hover:bg-slate-500',
      dotInactive: 'bg-slate-500 hover:bg-slate-400'
    }
  };

  const themes = [
    {
      key: 'light',
      label: 'Light',
      icon: Sun,
      iconColor: 'text-yellow-500'
    },
    {
      key: 'dark',
      label: 'Dark',
      icon: Moon,
      iconColor: 'text-blue-400'
    },
    {
      key: 'system',
      label: 'System',
      icon: Monitor,
      iconColor: 'text-slate-400'
    }
  ];

  const currentTheme = themes.find(t => t.key === resolvedTheme) || themes[2];
  const currentColors = themeColors[resolvedTheme] || themeColors.system;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleThemeSelect = (themeKey: any) => {
    setTheme(themeKey);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-200
          ${currentColors.controlBg} ${currentColors.controlBorder} ${currentColors.text}
        `}
        aria-label="Select Theme"
        aria-expanded={isOpen}
      >
        <currentTheme.icon className={`w-4 h-4 ${currentTheme.iconColor}`} />
        <span className="text-sm font-medium">{currentTheme.label}</span>
        <ChevronDown 
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} ${currentColors.textSecondary}`} 
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className={`
          absolute top-full left-0 mt-2 min-w-[140px] rounded-lg border shadow-lg z-50 overflow-hidden
          ${currentColors.cardBg} ${currentColors.controlBorder}
        `}>
          {themes.map((themeOption) => {
            const ThemeIcon = themeOption.icon;
            const isSelected = resolvedTheme === themeOption.key;
            
            return (
              <button
                key={themeOption.key}
                onClick={() => handleThemeSelect(themeOption.key)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 text-left transition-colors duration-150
                  ${isSelected 
                    ? `${currentColors.buttonBg} ${currentColors.text}` 
                    : `hover:${currentColors.buttonBg.split(' ')[1]} ${currentColors.text}`
                  }
                `}
              >
                <ThemeIcon className={`w-4 h-4 ${themeOption.iconColor}`} />
                <span className="text-sm font-medium">{themeOption.label}</span>
                {isSelected && (
                  <div className="ml-auto w-2 h-2 rounded-full bg-blue-500"></div>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ThemeDropdown;