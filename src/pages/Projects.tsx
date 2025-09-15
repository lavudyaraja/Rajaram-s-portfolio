import { useState } from "react";
import { Search, Github, ExternalLink, Sun, Moon, Code, Database, Brain, Palette, Server, Smartphone, Star, TrendingUp, Zap, Filter, Grid, List } from "lucide-react";

const allProjects = [
  {
    title: "Real-time Collaborative IDE",
    description: "A web-based IDE with real-time collaboration, syntax highlighting, and integrated debugging. Features live cursor tracking, voice chat, and code execution in multiple languages.",
    tags: ["React", "WebRTC", "Monaco Editor", "Socket.io", "Docker"],
    category: "frontend",
    github: "https://github.com",
    demo: "https://example.com",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop&crop=center",
    featured: true,
    difficulty: "Advanced",
    impact: "High",
    stats: { views: "15.2K", stars: 1240, forks: 340 }
  },
  {
    title: "3D Portfolio Experience",
    description: "An immersive 3D portfolio website built with Three.js featuring interactive scenes, physics simulations, and WebGL shaders for stunning visual effects.",
    tags: ["Three.js", "WebGL", "GLSL", "React", "Framer Motion"],
    category: "frontend",
    github: "https://github.com",
    demo: "https://example.com",
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=600&h=400&fit=crop&crop=center",
    featured: false,
    difficulty: "Expert",
    impact: "Medium",
    stats: { views: "8.7K", stars: 892, forks: 156 }
  },
  {
    title: "Component Library & Design System",
    description: "A comprehensive React component library with TypeScript, Storybook documentation, automated testing, and npm publishing pipeline.",
    tags: ["TypeScript", "Storybook", "Jest", "Rollup", "Chromatic"],
    category: "frontend",
    github: "https://github.com",
    demo: "https://example.com",
    image: "https://images.unsplash.com/photo-1581287053822-fd7bf4f4bfec?w=600&h=400&fit=crop&crop=center",
    featured: false,
    difficulty: "Advanced",
    impact: "High",
    stats: { views: "12.1K", stars: 2034, forks: 445 }
  },
  {
    title: "Distributed Video Streaming Platform",
    description: "A Netflix-like platform with microservices architecture, CDN integration, adaptive bitrate streaming, and ML-powered content recommendations.",
    tags: ["Node.js", "React", "AWS", "Docker", "Kubernetes", "Redis", "PostgreSQL"],
    category: "fullstack",
    github: "https://github.com",
    demo: "https://example.com",
    image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&h=400&fit=crop&crop=center",
    featured: true,
    difficulty: "Expert",
    impact: "High",
    stats: { views: "23.4K", stars: 3456, forks: 789 }
  },
  {
    title: "Real-time Trading Dashboard",
    description: "A high-frequency trading dashboard with WebSocket connections, real-time charts, portfolio management, and algorithmic trading strategies.",
    tags: ["React", "Node.js", "WebSockets", "D3.js", "MongoDB", "Redis"],
    category: "fullstack",
    github: "https://github.com",
    demo: "https://example.com",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop&crop=center",
    featured: true,
    difficulty: "Expert",
    impact: "High",
    stats: { views: "18.9K", stars: 2876, forks: 612 }
  },
  {
    title: "Computer Vision Defect Detection",
    description: "An AI system for manufacturing quality control using deep learning to detect product defects with 99.7% accuracy in real-time production lines.",
    tags: ["PyTorch", "OpenCV", "FastAPI", "Docker", "ONNX", "React"],
    category: "ml",
    github: "https://github.com",
    demo: "https://example.com",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop&crop=center",
    featured: true,
    difficulty: "Expert",
    impact: "High",
    stats: { views: "31.2K", stars: 4521, forks: 1034 }
  },
  {
    title: "NLP Document Intelligence",
    description: "Advanced document processing system using transformers for entity extraction, document classification, and automated insights generation.",
    tags: ["Transformers", "spaCy", "FastAPI", "PostgreSQL", "Celery"],
    category: "ml",
    github: "https://github.com",
    demo: "https://example.com",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop&crop=center",
    featured: true,
    difficulty: "Expert",
    impact: "High",
    stats: { views: "27.8K", stars: 3789, forks: 892 }
  },
  {
    title: "AR Shopping Experience",
    description: "Augmented reality mobile app allowing users to visualize furniture and products in their space before purchasing, with 3D model integration.",
    tags: ["React Native", "ARKit", "ARCore", "Three.js", "Firebase"],
    category: "mobile",
    github: "https://github.com",
    demo: "https://example.com",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop&crop=center",
    featured: true,
    difficulty: "Expert",
    impact: "High",
    stats: { views: "16.8K", stars: 2341, forks: 498 }
  }
];

function getCategoryGradient(color) {
  const gradients = {
    blue: "from-blue-600 to-blue-700",
    pink: "from-pink-600 to-pink-700",
    purple: "from-purple-600 to-purple-700",
    green: "from-green-600 to-green-700",
    orange: "from-orange-600 to-orange-700",
    cyan: "from-cyan-600 to-cyan-700",
    red: "from-red-600 to-red-700"
  };
  return gradients[color] || "from-blue-600 to-blue-700";
}

function getDifficultyBadge(difficulty) {
  const badges = {
    "Beginner": "bg-green-500 text-white",
    "Intermediate": "bg-yellow-500 text-white",
    "Advanced": "bg-orange-500 text-white",
    "Expert": "bg-red-500 text-white"
  };
  return badges[difficulty] || "bg-gray-500 text-white";
}

function StatCard({ title, value, icon, color, isDark }) {
  const colorMap = {
    blue: isDark ? 'from-blue-600 to-blue-700' : 'from-blue-500 to-blue-600',
    yellow: isDark ? 'from-yellow-500 to-yellow-600' : 'from-yellow-400 to-yellow-500',
    green: isDark ? 'from-green-600 to-green-700' : 'from-green-500 to-green-600',
    purple: isDark ? 'from-purple-600 to-purple-700' : 'from-purple-500 to-purple-600'
  };

  return (
    <div className={`p-6 rounded-2xl backdrop-blur-xl border transition-all duration-300 hover:scale-105 ${
      isDark
        ? 'bg-gray-800/30 border-gray-700/30 hover:bg-gray-800/50'
        : 'bg-white/50 border-gray-200/30 hover:bg-white/70'
    } shadow-xl`}>
      <div className="flex items-center space-x-4">
        <div className={`p-3 rounded-xl bg-gradient-to-r ${colorMap[color]} text-white shadow-lg`}>
          {icon}
        </div>
        <div>
          <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {value}
          </div>
          <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {title}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, isDark }) {
  return (
    <div className={`group rounded-3xl border backdrop-blur-xl transition-all duration-500 hover:shadow-2xl overflow-hidden transform hover:-translate-y-2 ${
      isDark 
        ? 'bg-gray-800/30 border-gray-700/30 hover:border-gray-600/50' 
        : 'bg-white/50 border-gray-200/30 hover:border-gray-300/50'
    } shadow-xl hover:scale-[1.02]`}>
      <div className="relative overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {project.featured && (
            <span className="px-3 py-1 text-xs font-bold bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full shadow-lg backdrop-blur-sm">
              ⭐ Featured
            </span>
          )}
          <span className={`px-3 py-1 text-xs font-bold rounded-full shadow-lg backdrop-blur-sm ${getDifficultyBadge(project.difficulty)}`}>
            {project.difficulty}
          </span>
        </div>

        <div className="absolute top-4 right-4 space-y-1">
          <div className="flex items-center space-x-1 text-white/90 text-xs bg-black/30 rounded-full px-2 py-1 backdrop-blur-sm">
            <Star className="w-3 h-3" />
            <span>{project.stats.stars}</span>
          </div>
          <div className="flex items-center space-x-1 text-white/90 text-xs bg-black/30 rounded-full px-2 py-1 backdrop-blur-sm">
            <TrendingUp className="w-3 h-3" />
            <span>{project.stats.views}</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className={`text-xl font-bold mb-3 line-clamp-2 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          {project.title}
        </h3>
        
        <p className={`text-sm leading-relaxed mb-4 line-clamp-3 ${
          isDark ? 'text-gray-300' : 'text-gray-600'
        }`}>
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className={`px-3 py-1 text-xs font-medium rounded-lg transition-all duration-200 ${
                isDark 
                  ? 'bg-gray-700/70 text-gray-300 hover:bg-gray-600/70' 
                  : 'bg-gray-100/70 text-gray-700 hover:bg-gray-200/70'
              }`}
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className={`px-3 py-1 text-xs font-medium rounded-lg ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}>
              +{project.tags.length - 4} more
            </span>
          )}
        </div>

        <div className="flex justify-between items-center">
          <div className="flex space-x-3">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-3 rounded-xl transition-all duration-300 hover:scale-110 ${
                isDark
                  ? 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 hover:text-white'
                  : 'bg-gray-100/50 text-gray-600 hover:bg-gray-200/50 hover:text-gray-900'
              } shadow-lg backdrop-blur-sm`}
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-3 rounded-xl transition-all duration-300 hover:scale-110 ${
                isDark
                  ? 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 hover:text-white'
                  : 'bg-gray-100/50 text-gray-600 hover:bg-gray-200/50 hover:text-gray-900'
              } shadow-lg backdrop-blur-sm`}
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
          
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 hover:scale-105 backdrop-blur-sm"
          >
            View Project
          </a>
        </div>
      </div>
    </div>
  );
}

function ProjectListItem({ project, isDark }) {
  return (
    <div className={`group flex items-center p-6 rounded-2xl border backdrop-blur-xl transition-all duration-300 hover:shadow-xl ${
      isDark 
        ? 'bg-gray-800/30 border-gray-700/30 hover:border-gray-600/50' 
        : 'bg-white/50 border-gray-200/30 hover:border-gray-300/50'
    } shadow-lg hover:scale-[1.01]`}>
      <div className="relative overflow-hidden rounded-xl mr-6 flex-shrink-0">
        <img
          src={project.image}
          alt={project.title}
          className="w-32 h-20 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        {project.featured && (
          <div className="absolute top-1 right-1">
            <span className="text-yellow-400 text-xs">⭐</span>
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between mb-2">
          <h3 className={`text-lg font-bold truncate mr-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {project.title}
          </h3>
          <div className="flex items-center space-x-4 flex-shrink-0">
            <div className="flex items-center space-x-1 text-sm">
              <Star className={`w-4 h-4 ${isDark ? 'text-yellow-400' : 'text-yellow-500'}`} />
              <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                {project.stats.stars}
              </span>
            </div>
            <div className="flex items-center space-x-1 text-sm">
              <TrendingUp className={`w-4 h-4 ${isDark ? 'text-blue-400' : 'text-blue-500'}`} />
              <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                {project.stats.views}
              </span>
            </div>
          </div>
        </div>
        
        <p className={`text-sm mb-3 line-clamp-2 ${
          isDark ? 'text-gray-400' : 'text-gray-600'
        }`}>
          {project.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className={`px-2 py-1 text-xs rounded-md ${
                  isDark 
                    ? 'bg-gray-700/50 text-gray-300' 
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className={`px-2 py-1 text-xs rounded-md ${
                isDark ? 'text-gray-500' : 'text-gray-500'
              }`}>
                +{project.tags.length - 3}
              </span>
            )}
          </div>
          
          <div className="flex space-x-2">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-lg transition-all duration-200 hover:scale-110 ${
                isDark
                  ? 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 hover:text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
              }`}
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-lg transition-all duration-200 hover:scale-110 ${
                isDark
                  ? 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 hover:text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
              }`}
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function EmptyState({ isDark }) {
  return (
    <div className="text-center py-24">
      <div className={`text-8xl mb-8 ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>
        🔍
      </div>
      <h3 className={`text-3xl font-bold mb-6 ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>
        No Projects Found
      </h3>
      <p className={`${isDark ? 'text-slate-400' : 'text-slate-600'} text-lg max-w-md mx-auto leading-relaxed`}>
        Try adjusting your search criteria or browse different categories to discover amazing projects
      </p>
    </div>
  );
}

function ProjectGrid({ projects, isDark }) {
  return projects.length > 0 ? (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
      {projects.map((project, index) => (
        <ProjectCard key={index} project={project} isDark={isDark} />
      ))}
    </div>
  ) : (
    <EmptyState isDark={isDark} />
  );
}

function ProjectList({ projects, isDark }) {
  return projects.length > 0 ? (
    <div className="space-y-6">
      {projects.map((project, index) => (
        <ProjectListItem key={index} project={project} isDark={isDark} />
      ))}
    </div>
  ) : (
    <EmptyState isDark={isDark} />
  );
}

export default function ModernPortfolio() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentCategory, setCurrentCategory] = useState("all");
  const [isDark, setIsDark] = useState(true);
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);
  
  const filteredProjects = allProjects
    .filter(project => {
      const matchesSearch = 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = currentCategory === "all" || project.category === currentCategory;
      
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "featured": return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        case "stars": return b.stats.stars - a.stats.stars;
        case "views": return parseInt(b.stats.views) - parseInt(a.stats.views);
        default: return 0;
      }
    });

  const categories = [
    { value: "all", label: "All", icon: Code, count: allProjects.length, color: "blue" },
    { value: "frontend", label: "Frontend", icon: Palette, count: 3, color: "pink" },
    { value: "fullstack", label: "Full Stack", icon: Server, count: 2, color: "purple" },
    { value: "ml", label: "AI/ML", icon: Brain, count: 2, color: "green" },
    { value: "mobile", label: "Mobile", icon: Smartphone, count: 1, color: "red" }
  ];

  const stats = {
    totalProjects: allProjects.length,
    totalStars: allProjects.reduce((sum, p) => sum + p.stats.stars, 0),
    totalViews: allProjects.reduce((sum, p) => sum + parseInt(p.stats.views), 0),
    featuredCount: allProjects.filter(p => p.featured).length
  };

  return (
    <div className={`min-h-screen transition-all duration-700 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950' 
        : 'bg-gradient-to-br from-slate-50 via-white to-gray-50'
    }`}>
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-gradient-to-r from-pink-500/10 to-orange-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-3/4 left-1/3 w-64 h-64 bg-gradient-to-r from-cyan-500/10 to-teal-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <header className={`sticky top-0 z-50 backdrop-blur-xl border-b ${
        isDark 
          ? 'bg-gray-950/80 border-gray-800/50' 
          : 'bg-white/80 border-gray-200/50'
      } shadow-xl`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur-lg opacity-75"></div>
                <div className="relative w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-700 rounded-xl flex items-center justify-center shadow-xl">
                  <Code className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h1 className={`text-2xl font-bold bg-gradient-to-r ${
                  isDark 
                    ? 'from-white to-gray-300' 
                    : 'from-gray-900 to-gray-700'
                } bg-clip-text text-transparent`}>
                  Project Showcase
                </h1>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {stats.totalProjects} projects • {stats.totalStars.toLocaleString()} stars
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`p-3 rounded-xl transition-all duration-300 ${
                  isDark
                    ? 'hover:bg-gray-800 text-gray-400 hover:text-gray-200'
                    : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                } ${showFilters ? 'bg-blue-600 text-white' : ''}`}
              >
                <Filter className="w-5 h-5" />
              </button>
              
              <button
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className={`p-3 rounded-xl transition-all duration-300 ${
                  isDark
                    ? 'hover:bg-gray-800 text-gray-400 hover:text-gray-200'
                    : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                }`}
              >
                {viewMode === 'grid' ? <List className="w-5 h-5" /> : <Grid className="w-5 h-5" />}
              </button>
              
              <button
                onClick={() => setIsDark(!isDark)}
                className={`p-3 rounded-xl transition-all duration-300 ${
                  isDark
                    ? 'hover:bg-gray-800 text-gray-400 hover:text-gray-200'
                    : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                }`}
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Projects"
            value={stats.totalProjects}
            icon={<Code className="w-5 h-5" />}
            color="blue"
            isDark={isDark}
          />
          <StatCard
            title="GitHub Stars"
            value={stats.totalStars.toLocaleString()}
            icon={<Star className="w-5 h-5" />}
            color="yellow"
            isDark={isDark}
          />
          <StatCard
            title="Total Views"
            value={`${(stats.totalViews / 1000).toFixed(1)}K`}
            icon={<TrendingUp className="w-5 h-5" />}
            color="green"
            isDark={isDark}
          />
          <StatCard
            title="Featured"
            value={stats.featuredCount}
            icon={<Zap className="w-5 h-5" />}
            color="purple"
            isDark={isDark}
          />
        </div>

        <div className="mb-8">
          <div className="relative mb-6">
            <Search className={`absolute left-4 top-4 h-5 w-5 ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`} />
            <input
              type="text"
              placeholder="Search projects, technologies, or descriptions..."
              className={`w-full pl-12 pr-4 py-4 rounded-2xl border-2 transition-all duration-300 text-lg ${
                isDark
                  ? 'bg-gray-800/50 border-gray-700/50 text-white placeholder-gray-400 focus:border-blue-500 focus:bg-gray-800/70'
                  : 'bg-white/70 border-gray-200/50 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:bg-white'
              } focus:outline-none focus:ring-4 focus:ring-blue-500/20 backdrop-blur-xl shadow-xl`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {showFilters && (
            <div className={`p-6 rounded-2xl border backdrop-blur-xl mb-6 ${
              isDark
                ? 'bg-gray-800/30 border-gray-700/30'
                : 'bg-white/50 border-gray-200/30'
            }`}>
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex items-center space-x-2">
                  <span className={`text-sm font-medium ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className={`px-3 py-2 rounded-lg border transition-all ${
                      isDark
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value="featured">Featured First</option>
                    <option value="stars">Most Stars</option>
                    <option value="views">Most Views</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = currentCategory === category.value;
            return (
              <button
                key={category.value}
                onClick={() => setCurrentCategory(category.value)}
                className={`group relative flex items-center space-x-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 overflow-hidden ${
                  isActive
                    ? 'text-white shadow-lg transform scale-105'
                    : isDark
                      ? 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/70 hover:text-white border border-gray-700/30'
                      : 'bg-white/50 text-gray-700 hover:bg-white hover:text-gray-900 border border-gray-200/30'
                } backdrop-blur-xl`}
              >
                {isActive && (
                  <div className={`absolute inset-0 bg-gradient-to-r ${getCategoryGradient(category.color)}`}></div>
                )}
                <div className="relative flex items-center space-x-3">
                  <Icon className="h-4 w-4" />
                  <span>{category.label}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    isActive 
                      ? 'bg-white/20 text-white' 
                      : isDark 
                        ? 'bg-gray-700/70 text-gray-400' 
                        : 'bg-gray-100 text-gray-600'
                  }`}>
                    {category.count}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {viewMode === 'grid' ? (
          <ProjectGrid projects={filteredProjects} isDark={isDark} />
        ) : (
          <ProjectList projects={filteredProjects} isDark={isDark} />
        )}
      </main>
    </div>
  );
}