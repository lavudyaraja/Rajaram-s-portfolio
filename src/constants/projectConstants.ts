import { Globe, Smartphone, Database, Zap } from 'lucide-react';

export const categoryIcons = {
  web: Globe,
  mobile: Smartphone,
  ai: Zap,
  fullstack: Database
};

export const categoryColors = {
  web: 'from-blue-500 to-cyan-500',
  mobile: 'from-purple-500 to-pink-500',
  ai: 'from-yellow-500 to-orange-500',
  fullstack: 'from-green-500 to-emerald-500'
};

export const statusColors = {
  completed: 'bg-green-500/20 text-green-400 border-green-500/30',
  'in-progress': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  maintenance: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
};
