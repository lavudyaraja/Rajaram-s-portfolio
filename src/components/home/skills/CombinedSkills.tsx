"use client";

import { useState, useEffect } from "react";
import { 
  Code, Database, Server, Cloud, Brain, Palette, Wrench, Sparkles, 
  Zap, Award, TrendingUp, Search, Filter, Grid3x3, List, Star,
  ChevronRight, ArrowUp, Rocket, Terminal, Cpu, Globe
} from "lucide-react";

// Helper function to get real icon URLs
const getRealIconUrl = (name: any) => {
  const iconMap: { [key: string]: string } = {
    "React": "react",
    "Next.js": "nextjs",
    "Tailwind CSS": "tailwindcss",
    "Node.js": "nodejs",
    "Python": "python",
    "TypeScript": "typescript",
    "MongoDB": "mongodb",
    "PostgreSQL": "postgresql",
    "Docker": "docker",
    "Git": "git",
    "GitHub": "github",
    "JavaScript": "javascript",
    "HTML5": "html5",
    "CSS3": "css3",
    "Sass": "sass",
    "Bootstrap": "bootstrap",
    "jQuery": "jquery",
    "MySQL": "mysql",
    "Redis": "redis",
    "SQLite": "sqlite",
    "Firebase": "firebase",
    "Linux": "linux",
    "AWS": "amazonwebservices",
    "OpenCV": "opencv",
    "NumPy": "numpy",
    "Pandas": "pandas",
    "Scikit-learn": "scikitlearn",
    "Figma": "figma",
    "VS Code": "vscode",
    "Postman": "postman",
    "npm": "npm",
    "Yarn": "yarn",
    "Prisma": "prisma",
    "Neon": "neon",
    "Supabase": "supabase",
    "n8n": "n8n",
    "SciPy": "scipy",
    "spaCy": "spacy",
    "Transformers": "huggingface",
    "TextBlob": "python",
    "Matplotlib": "matplotlib",
    "Canva": "canva",
    "Keras": "keras",
    "Flask": "flask",
    // "Celery": "celery"
  };
  
  const iconName = iconMap[name] || name.toLowerCase().replace(/\s+/g, '').replace(/\./g, '');
  
  // Special cases with direct URLs
  if (name === "Transformers") return "https://huggingface.co/front/assets/huggingface_logo-noborder.svg";
  if (name === "TextBlob") return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg";
  if (name === "Canva") return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg";
  if (name === "RAG") return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg";
  if (name === "Vector Database") return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg";
//   if (name === "Prompt Engineering") return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/chatgpt/chatgpt-original.svg";
  if (name === "Computer Vision") return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg";
  if (name === "Prisma ORM") return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg";
  if (name === "Neon Database") return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg";
  if (name === "GIT") return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg";
//   if (name === "Celery") return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/celery/celery-original.svg";
  
  return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${iconName}/${iconName}-original.svg`;
  
};

// Enhanced skills data with proficiency levels and descriptions
const skillCategories = [
  {
    category: "Frontend Development",
    color: "cyan",
    description: "Building modern, responsive user interfaces",
    items: [
      { name: "React", description: "Expert in React ecosystem", icon: <img src={getRealIconUrl("React")} alt="React" className="w-8 h-8" /> },
      { name: "TypeScript", description: "Type-safe development", icon: <img src={getRealIconUrl("TypeScript")} alt="TypeScript" className="w-8 h-8" /> },
      { name: "JavaScript", description: "Core language expertise", icon: <img src={getRealIconUrl("JavaScript")} alt="JavaScript" className="w-8 h-8" /> },
      { name: "Tailwind CSS", description: "Modern CSS framework", icon: <img src={getRealIconUrl("Tailwind CSS")} alt="Tailwind CSS" className="w-8 h-8" /> },
      { name: "HTML5", description: "Semantic markup", icon: <img src={getRealIconUrl("HTML5")} alt="HTML5" className="w-8 h-8" /> },
      { name: "CSS3", description: "Advanced styling", icon: <img src={getRealIconUrl("CSS3")} alt="CSS3" className="w-8 h-8" /> },
      { name: "Sass", description: "CSS preprocessor", icon: <img src={getRealIconUrl("Sass")} alt="Sass" className="w-8 h-8" /> },
      { name: "Bootstrap", description: "Responsive framework", icon: <img src={getRealIconUrl("Bootstrap")} alt="Bootstrap" className="w-8 h-8" /> }
    ]
  },
  {
    category: "Backend Development",
    color: "purple",
    description: "Server-side architecture and APIs",
    items: [
      { name: "Node.js", description: "Server-side JavaScript", icon: <img src={getRealIconUrl("Node.js")} alt="Node.js" className="w-8 h-8" /> },
      { name: "Python", description: "Backend development", icon: <img src={getRealIconUrl("Python")} alt="Python" className="w-8 h-8" /> },
      { name: "Flask", description: "Python web framework", icon: <img src={getRealIconUrl("Flask")} alt="Flask" className="w-8 h-8" /> },
    //   { name: "Celery", description: "Distributed task queue", icon: <img src={getRealIconUrl("Celery")} alt="Celery" className="w-8 h-8" /> }
    ]
  },
  {
    category: "Database",
    color: "green",
    description: "Data management and storage solutions",
    items: [
      { name: "PostgreSQL", description: "Relational database", icon: <img src={getRealIconUrl("PostgreSQL")} alt="PostgreSQL" className="w-8 h-8" /> },
      { name: "MySQL", description: "Popular database", icon: <img src={getRealIconUrl("MySQL")} alt="MySQL" className="w-8 h-8" /> },
      { name: "SQLite", description: "Lightweight database", icon: <img src={getRealIconUrl("SQLite")} alt="SQLite" className="w-8 h-8" /> },
      { name: "Redis", description: "In-memory data store", icon: <img src={getRealIconUrl("Redis")} alt="Redis" className="w-8 h-8" /> },
      { name: "Prisma ORM", description: "Modern database toolkit", icon: <img src={getRealIconUrl("Prisma ORM")} alt="Prisma ORM" className="w-8 h-8" /> },
      { name: "Neon Database", description: "Serverless PostgreSQL", icon: <img src={getRealIconUrl("Neon Database")} alt="Neon Database" className="w-8 h-8" /> },
      { name: "Vector Database", description: "AI vector storage", icon: <img src={getRealIconUrl("Vector Database")} alt="Vector Database" className="w-8 h-8" /> }
    ]
  },
  {
    category: "DevOps & Tools",
    color: "orange",
    description: "Deployment and development tools",
    items: [
      { name: "GIT", description: "Version control", icon: <img src={getRealIconUrl("GIT")} alt="GIT" className="w-8 h-8" /> },
      { name: "GitHub", description: "Code collaboration", icon: <img src={getRealIconUrl("GitHub")} alt="GitHub" className="w-8 h-8" /> },
      { name: "Docker", description: "Containerization", icon: <img src={getRealIconUrl("Docker")} alt="Docker" className="w-8 h-8" /> },
      { name: "Linux", description: "Server administration", icon: <img src={getRealIconUrl("Linux")} alt="Linux" className="w-8 h-8" /> },
      { name: "n8n", description: "Workflow automation", icon: <img src="/n8n.png" alt="n8n" className="w-8 h-8" /> }
    ]
  },
  {
    category: "AI & Machine Learning",
    color: "yellow",
    description: "Artificial intelligence and machine learning",
    items: [
      { name: "NumPy", description: "Numerical computing", icon: <img src={getRealIconUrl("NumPy")} alt="NumPy" className="w-8 h-8" /> },
      { name: "Pandas", description: "Data manipulation", icon: <img src={getRealIconUrl("Pandas")} alt="Pandas" className="w-8 h-8" /> },
      { name: "Computer Vision", description: "Visual AI systems", icon: <img src={getRealIconUrl("Computer Vision")} alt="Computer Vision" className="w-8 h-8" /> },
      { name: "Matplotlib", description: "Data visualization", icon: <img src={getRealIconUrl("Matplotlib")} alt="Matplotlib" className="w-8 h-8" /> },
      { name: "RAG", description: "Retrieval Augmented Generation", icon: <img src={getRealIconUrl("RAG")} alt="RAG" className="w-8 h-8" /> },
    //   { name: "Prompt Engineering", description: "AI prompt optimization", icon: <img src={getRealIconUrl("Prompt Engineering")} alt="Prompt Engineering" className="w-8 h-8" /> },
      { name: "Transformers", description: "Transformer models", icon: <img src={getRealIconUrl("Transformers")} alt="Transformers" className="w-8 h-8" /> }
    ]
  },
  {
    category: "UI/UX Design",
    color: "pink",
    description: "Design and prototyping tools",
    items: [
      { name: "Figma", description: "UI design tool", icon: <img src={getRealIconUrl("Figma")} alt="Figma" className="w-8 h-8" /> },
      { name: "Canva", description: "Graphic design", icon: <img src={getRealIconUrl("Canva")} alt="Canva" className="w-8 h-8" /> }
    ]
  },
  {
    category: "Tools & Utilities",
    color: "blue",
    description: "Development and productivity tools",
    items: [
      { name: "VS Code", description: "Code editor", icon: <img src={getRealIconUrl("VS Code")} alt="VS Code" className="w-8 h-8" /> },
      { name: "Postman", description: "API testing", icon: <img src={getRealIconUrl("Postman")} alt="Postman" className="w-8 h-8" /> },
      { name: "npm", description: "Package manager", icon: <img src={getRealIconUrl("npm")} alt="npm" className="w-8 h-8" /> },
      { name: "Yarn", description: "Package manager", icon: <img src={getRealIconUrl("Yarn")} alt="Yarn" className="w-8 h-8" /> }
    ]
  }
];

// Helper function to get color classes
const getColorClasses = (color: any, type: any) => {
  const colorMap: { [key: string]: { bg: string; border: string; text: string; hover: string; gradient: string } } = {
    cyan: {
      bg: "bg-cyan-500/10",
      border: "border-cyan-400/30",
      text: "text-cyan-400",
      hover: "hover:bg-cyan-500/20 hover:border-cyan-400/50",
      gradient: "from-cyan-400 to-blue-500"
    },
    purple: {
      bg: "bg-purple-500/10",
      border: "border-purple-400/30",
      text: "text-purple-400",
      hover: "hover:bg-purple-500/20 hover:border-purple-400/50",
      gradient: "from-purple-400 to-pink-500"
    },
    green: {
      bg: "bg-green-500/10",
      border: "border-green-400/30",
      text: "text-green-400",
      hover: "hover:bg-green-500/20 hover:border-green-400/50",
      gradient: "from-green-400 to-emerald-500"
    },
    orange: {
      bg: "bg-orange-500/10",
      border: "border-orange-400/30",
      text: "text-orange-400",
      hover: "hover:bg-orange-500/20 hover:border-orange-400/50",
      gradient: "from-orange-400 to-red-500"
    },
    yellow: {
      bg: "bg-yellow-500/10",
      border: "border-yellow-400/30",
      text: "text-yellow-400",
      hover: "hover:bg-yellow-500/20 hover:border-yellow-400/50",
      gradient: "from-yellow-400 to-orange-500"
    },
    pink: {
      bg: "bg-pink-500/10",
      border: "border-pink-400/30",
      text: "text-pink-400",
      hover: "hover:bg-pink-500/20 hover:border-pink-400/50",
      gradient: "from-pink-400 to-rose-500"
    },
    blue: {
      bg: "bg-blue-500/10",
      border: "border-blue-400/30",
      text: "text-blue-400",
      hover: "hover:bg-blue-500/20 hover:border-blue-400/50",
      gradient: "from-blue-400 to-indigo-500"
    }
  };
  return (colorMap[color] as any)?.[type] || (colorMap.cyan as any)[type];
};

export default function CombinedSkills() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
    setIsVisible(true);
  }, []);

  const handleCategoryClick = (categoryName: string) => {
    setActiveCategory(activeCategory === categoryName ? null : categoryName);
  };

  // Get skills based on active category
  const displayedSkills = activeCategory 
    ? skillCategories.find(cat => cat.category === activeCategory)?.items.map(skill => ({
        ...skill,
        category: activeCategory,
        color: skillCategories.find(cat => cat.category === activeCategory)?.color
      })) || []
    : skillCategories.flatMap(category => 
        category.items.map(skill => ({
          ...skill,
          category: category.category,
          color: category.color
        }))
      );

  return (
    <section className="relative py-12 sm:py-16 lg:py-20 bg-black overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/3 w-80 h-80 bg-green-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-8 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
            <div className="relative">
              <Sparkles className="w-6 h-6 text-blue-400" />
            </div>
            <div className="w-8 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent leading-tight">
            Skills & Technologies
          </h2>
          
          <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg">
            A comprehensive showcase of my technical expertise across multiple domains
          </p>
        </div>

        {/* Category Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-8">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-3 rounded-xl border transition-all font-medium text-sm ${activeCategory === null ? "bg-blue-500/20 border-blue-500/50 text-blue-400" : "bg-gray-900/50 border-gray-700/50 text-gray-400 hover:border-gray-600/50"}`}
          >
            All Skills
          </button>
          {skillCategories.map((category) => (
            <button
              key={category.category}
              onClick={() => handleCategoryClick(category.category)}
              className={`px-4 py-3 rounded-xl border transition-all font-medium text-sm ${activeCategory === category.category ? `${getColorClasses(category.color, "bg")} ${getColorClasses(category.color, "border")} ${getColorClasses(category.color, "text")}` : "bg-gray-900/50 border-gray-700/50 text-gray-400 hover:border-gray-600/50"}`}
            >
              {category.category}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 sm:gap-4 mb-16">
          {displayedSkills.map((skill, index) => (
            <div
              key={`${skill.name}-${skill.category}`}
              className={`group relative p-3 sm:p-4 ${getColorClasses(skill.color, "bg")} border border-gray-800/50 rounded-xl transition-all duration-300 cursor-pointer overflow-hidden touch-manipulation`}
              title={`${skill.name} - ${skill.description}`}
            >
              {/* Animated Neon Border */}
              <div className="absolute inset-0 rounded-xl">
                {/* Top Border */}
                <div className="absolute top-0 left-0 right-0 h-[2px]">
                  <div className="h-full w-full bg-gradient-to-r from-transparent via-cyan-400 via-blue-400 via-purple-400 to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-500 animate-neon-flow-top" />
                </div>
                
                {/* Right Border */}
                <div className="absolute top-0 right-0 bottom-0 w-[2px]">
                  <div className="h-full w-full bg-gradient-to-b from-transparent via-purple-400 via-pink-400 to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-500 animate-neon-flow-right" />
                </div>
                
                {/* Bottom Border */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px]">
                  <div className="h-full w-full bg-gradient-to-l from-transparent via-orange-400 via-pink-400 via-purple-400 to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-500 animate-neon-flow-bottom" />
                </div>
                
                {/* Left Border */}
                <div className="absolute top-0 left-0 bottom-0 w-[2px]">
                  <div className="h-full w-full bg-gradient-to-t from-transparent via-blue-400 via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-500 animate-neon-flow-left" />
                </div>
                
                {/* Corner Glows */}
                <div className="absolute -top-1 -left-1 w-2 h-2 sm:w-3 sm:h-3 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-60 group-active:opacity-60 transition-opacity duration-500 blur-sm" />
                <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-purple-400 rounded-full opacity-0 group-hover:opacity-60 group-active:opacity-60 transition-opacity duration-500 blur-sm" />
                <div className="absolute -bottom-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-pink-400 rounded-full opacity-0 group-hover:opacity-60 group-active:opacity-60 transition-opacity duration-500 blur-sm" />
                <div className="absolute -bottom-1 -left-1 w-2 h-2 sm:w-3 sm:h-3 bg-orange-400 rounded-full opacity-0 group-hover:opacity-60 group-active:opacity-60 transition-opacity duration-500 blur-sm" />
                
                {/* Soft Glow Overlay */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400/10 via-blue-400/10 via-purple-400/10 via-pink-400/10 to-orange-400/10 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-700 blur-md" />
              </div>
              
              {/* Card Content */}
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="mb-2 transition-all duration-300 group-hover:scale-110 group-active:scale-110 group-hover:drop-shadow-lg">
                  <img src={skill.icon.props?.src || getRealIconUrl(skill.name)} alt={skill.name} className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>
                <h4 className="text-white font-semibold text-xs sm:text-xs leading-tight transition-colors duration-300 group-hover:text-gray-100">{skill.name}</h4>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="mt-16">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-gray-900/50 to-blue-900/20 border border-blue-500/20 rounded-lg hover:border-blue-500/40 transition-all duration-300 backdrop-blur-sm">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">{skillCategories.length}</div>
              <div className="text-gray-400 text-sm">Skill Categories</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-gray-900/50 to-purple-900/20 border border-purple-500/20 rounded-lg hover:border-purple-500/40 transition-all duration-300 backdrop-blur-sm">
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">{displayedSkills.length}</div>
              <div className="text-gray-400 text-sm">Total Skills</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-gray-900/50 to-green-900/20 border border-green-500/20 rounded-lg hover:border-green-500/40 transition-all duration-300 backdrop-blur-sm">
              <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">Expert</div>
              <div className="text-gray-400 text-sm">Skill Level</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Neon Border Animations */}
      <style jsx>{`
        @keyframes neon-flow-top {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes neon-flow-right {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        
        @keyframes neon-flow-bottom {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        
        @keyframes neon-flow-left {
          0% { transform: translateY(100%); }
          100% { transform: translateY(-100%); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { 
            opacity: 0.4;
            transform: scale(1);
          }
          50% { 
            opacity: 0.8;
            transform: scale(1.2);
          }
        }
        
        @keyframes pulse-slow-delayed {
          0%, 100% { 
            opacity: 0.3;
            transform: scale(1);
          }
          50% { 
            opacity: 0.7;
            transform: scale(1.15);
          }
        }
        
        .animate-neon-flow-top { 
          animation: neon-flow-top 3s ease-in-out infinite;
        }
        
        .animate-neon-flow-right { 
          animation: neon-flow-right 3s ease-in-out infinite 0.75s;
        }
        
        .animate-neon-flow-bottom { 
          animation: neon-flow-bottom 3s ease-in-out infinite 1.5s;
        }
        
        .animate-neon-flow-left { 
          animation: neon-flow-left 3s ease-in-out infinite 2.25s;
        }
        
        .animate-pulse-slow { 
          animation: pulse-slow 2s ease-in-out infinite;
        }
        
        .animate-pulse-slow-delayed { 
          animation: pulse-slow-delayed 2s ease-in-out infinite 0.5s;
        }
      `}</style>
    </section>
  );
}
