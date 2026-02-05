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
    // "Nextjs": "nextjs",
    "JavaScript": "javascript",
    "HTML5": "html5",
    "CSS3": "css3",
    "Sass": "sass",
    "Bootstrap": "bootstrap",
    "jQuery": "jquery",
    // "Express": "express",
    // "Django": "django",
    // "Java": "java",
    // "Spring": "spring",
    // "PHP": "php",
    // "Laravel": "laravel",
    "MySQL": "mysql",
    "Redis": "redis",
    "SQLite": "sqlite",
    "Firebase": "firebase",
    "GitHub": "github",
    // "GitLab": "gitlab",
    "Linux": "linux",
    // "Kubernetes": "kubernetes",
    "AWS": "amazonwebservices",
    // "TensorFlow": "tensorflow",
    // "PyTorch": "pytorch",
    "OpenCV": "opencv",
    "NumPy": "numpy",
    "Pandas": "pandas",
    "Scikit-learn": "scikitlearn",
    "Figma": "figma",
    // "Adobe XD": "adobexd",
    "VS Code": "vscode",
    "Postman": "postman",
    "npm": "npm",
    "Yarn": "yarn",
    // "Chrome DevTools": "chrome",
    // "Slack": "slack",
    // Database icons
    "Prisma": "prisma",
    "Neon": "neon",
    "Supabase": "supabase",
    // DevOps & Tools icons
    "n8n": "n8n",
    // AI/ML icons
    "SciPy": "scipy",
    "NLTK": "python",
    "spaCy": "spacy",
    "Transformers": "huggingface",
    "TextBlob": "python",
    "Matplotlib": "matplotlib",
    "Canva": "canva",
    "Keras": "keras"
  };
  
  const iconName = iconMap[name] || name.toLowerCase().replace(/\s+/g, '').replace(/\./g, '');
  
  // Special cases with direct URLs
  if (name === "Transformers") return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/huggingface/huggingface-original.svg";
  if (name === "NLTK" || name === "TextBlob") return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg";
  if (name === "Canva") return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg";
  
  return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${iconName}/${iconName}-original.svg`;
  
};

// Enhanced skills data with proficiency levels and descriptions
const skillCategories = [
  {
    category: "Frontend Development",
    icon: <Code className="w-6 h-6" />,
    color: "cyan",
    description: "Building modern, responsive user interfaces",
    items: [
      { name: "React", level: 95, description: "Expert in React ecosystem", icon: <img src={getRealIconUrl("React")} alt="React" className="w-8 h-8" /> },
      { name: "TypeScript", level: 90, description: "Type-safe development", icon: <img src={getRealIconUrl("TypeScript")} alt="TypeScript" className="w-8 h-8" /> },
      { name: "JavaScript", level: 95, description: "Core language expertise", icon: <img src={getRealIconUrl("JavaScript")} alt="JavaScript" className="w-8 h-8" /> },
      { name: "Tailwind CSS", level: 92, description: "Modern CSS framework", icon: <img src={getRealIconUrl("Tailwind CSS")} alt="Tailwind CSS" className="w-8 h-8" /> },
      { name: "HTML5", level: 98, description: "Semantic markup", icon: <img src={getRealIconUrl("HTML5")} alt="HTML5" className="w-8 h-8" /> },
      { name: "CSS3", level: 95, description: "Advanced styling", icon: <img src={getRealIconUrl("CSS3")} alt="CSS3" className="w-8 h-8" /> },
      { name: "Sass", level: 85, description: "CSS preprocessor", icon: <img src={getRealIconUrl("Sass")} alt="Sass" className="w-8 h-8" /> },
      { name: "Bootstrap", level: 80, description: "Responsive framework", icon: <img src={getRealIconUrl("Bootstrap")} alt="Bootstrap" className="w-8 h-8" /> }
    ]
  },
  {
    category: "Backend Development",
    icon: <Server className="w-6 h-6" />,
    color: "purple",
    description: "Server-side architecture and APIs",
    items: [
      { name: "Node.js", level: 90, description: "Server-side JavaScript", icon: <img src={getRealIconUrl("Node.js")} alt="Node.js" className="w-8 h-8" /> },
      { name: "Python", level: 88, description: "Backend development", icon: <img src={getRealIconUrl("Python")} alt="Python" className="w-8 h-8" /> },
      { name: "Express", level: 85, description: "Web framework", icon: <img src={getRealIconUrl("Express")} alt="Express" className="w-8 h-8" /> },
      { name: "Django", level: 75, description: "Python web framework", icon: <img src={getRealIconUrl("Django")} alt="Django" className="w-8 h-8" /> }
    ]
  },
  {
    category: "Database",
    icon: <Database className="w-6 h-6" />,
    color: "green",
    description: "Data management and storage solutions",
    items: [
      { name: "PostgreSQL", level: 85, description: "Relational database", icon: <img src={getRealIconUrl("PostgreSQL")} alt="PostgreSQL" className="w-8 h-8" /> },
      { name: "MySQL", level: 80, description: "Popular database", icon: <img src={getRealIconUrl("MySQL")} alt="MySQL" className="w-8 h-8" /> },
      { name: "SQLite", level: 75, description: "Lightweight database", icon: <img src={getRealIconUrl("SQLite")} alt="SQLite" className="w-8 h-8" /> },
      { name: "Firebase", level: 70, description: "NoSQL database", icon: <img src={getRealIconUrl("Firebase")} alt="Firebase" className="w-8 h-8" /> },
      { name: "Prisma", level: 82, description: "Modern ORM", icon: <img src="/prisma.png" alt="Prisma" className="w-8 h-8" /> },
      { name: "Neon", level: 78, description: "Serverless PostgreSQL", icon: <img src="/neon.png" alt="Neon" className="w-8 h-8" /> },
      { name: "Supabase", level: 75, description: "Open source Firebase", icon: <img src={getRealIconUrl("Supabase")} alt="Supabase" className="w-8 h-8" /> }
    ]
  },
  {
    category: "DevOps & Tools",
    icon: <Cloud className="w-6 h-6" />,
    color: "orange",
    description: "Deployment and development tools",
    items: [
      { name: "Git", level: 95, description: "Version control", icon: <img src={getRealIconUrl("Git")} alt="Git" className="w-8 h-8" /> },
      { name: "GitHub", level: 92, description: "Code collaboration", icon: <img src={getRealIconUrl("GitHub")} alt="GitHub" className="w-8 h-8" /> },
      { name: "Docker", level: 80, description: "Containerization", icon: <img src={getRealIconUrl("Docker")} alt="Docker" className="w-8 h-8" /> },
      { name: "Linux", level: 78, description: "Server administration", icon: <img src={getRealIconUrl("Linux")} alt="Linux" className="w-8 h-8" /> },
      { name: "n8n", level: 75, description: "Workflow automation", icon: <img src="/n8n.png" alt="n8n" className="w-8 h-8" /> }
    ]
  },
  {
    category: "AI & Machine Learning",
    icon: <Brain className="w-6 h-6" />,
    color: "yellow",
    description: "Artificial intelligence and machine learning",
    items: [
      { name: "Python", level: 92, description: "ML programming language", icon: <img src={getRealIconUrl("Python")} alt="Python" className="w-8 h-8" /> },
      { name: "NumPy", level: 85, description: "Numerical computing", icon: <img src={getRealIconUrl("NumPy")} alt="NumPy" className="w-8 h-8" /> },
      { name: "Pandas", level: 88, description: "Data manipulation", icon: <img src={getRealIconUrl("Pandas")} alt="Pandas" className="w-8 h-8" /> },
      { name: "OpenCV", level: 75, description: "Computer vision", icon: <img src={getRealIconUrl("OpenCV")} alt="OpenCV" className="w-8 h-8" /> },
      { name: "Matplotlib", level: 80, description: "Data visualization", icon: <img src={getRealIconUrl("Matplotlib")} alt="Matplotlib" className="w-8 h-8" /> },
      { name: "NLP", level: 82, description: "Natural language processing", icon: <img src="/NLTK.png" alt="NLP" className="w-8 h-8" /> },
      { name: "SciPy", level: 78, description: "Scientific computing", icon: <img src="/sciPy.png" alt="SciPy" className="w-8 h-8" /> },
      { name: "Transformer", level: 85, description: "Transformer models", icon: <img src="/Transformers.png" alt="Transformer" className="w-8 h-8" /> }
    ]
  },
  {
    category: "UI/UX Design",
    icon: <Palette className="w-6 h-6" />,
    color: "pink",
    description: "Design and prototyping tools",
    items: [
      { name: "Figma", level: 85, description: "UI design tool", icon: <img src={getRealIconUrl("Figma")} alt="Figma" className="w-8 h-8" /> },
      { name: "Canva", level: 80, description: "Graphic design", icon: <img src={getRealIconUrl("Canva")} alt="Canva" className="w-8 h-8" /> }
    ]
  },
  {
    category: "Tools & Utilities",
    icon: <Wrench className="w-6 h-6" />,
    color: "blue",
    description: "Development and productivity tools",
    items: [
      { name: "VS Code", level: 95, description: "Code editor", icon: <img src={getRealIconUrl("VS Code")} alt="VS Code" className="w-8 h-8" /> },
      { name: "Postman", level: 88, description: "API testing", icon: <img src={getRealIconUrl("Postman")} alt="Postman" className="w-8 h-8" /> },
      { name: "npm", level: 90, description: "Package manager", icon: <img src={getRealIconUrl("npm")} alt="npm" className="w-8 h-8" /> },
      { name: "Yarn", level: 85, description: "Package manager", icon: <img src={getRealIconUrl("Yarn")} alt="Yarn" className="w-8 h-8" /> }
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

  return (
    <div className="bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-20">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
            }}
          />
        </div>
        
        {/* Floating gradient orbs - only render on client */}
        {isMounted && (
          <>
            <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
            <div className="absolute top-40 right-32 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float-delay"></div>
            <div className="absolute bottom-32 left-1/3 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-float-slow"></div>
            <div className="absolute bottom-40 right-20 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-float-delay-slow"></div>
          </>
        )}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        {/* Enhanced Header */}
        <div className={`text-center mb-16 ${isMounted && isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 backdrop-blur-sm mb-8">
            <Sparkles className="w-5 h-5 text-blue-400 animate-pulse" />
            <span className="text-blue-400 font-medium">Technical Expertise</span>
            <Zap className="w-5 h-5 text-purple-400" />
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-6">
            <span className="block text-white mb-2">Skills &</span>
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
              Technologies
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            A comprehensive showcase of my technical expertise and the tools I use to build exceptional digital experiences
          </p>
        </div>

        {/* Skills Display */}
        <div className="space-y-8">
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {skillCategories.map((category, index) => (
              <button
                key={category.category}
                onClick={() => handleCategoryClick(category.category)}
                className={`group relative px-6 py-4 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                  activeCategory === category.category
                    ? `${getColorClasses(category.color, "bg")} ${getColorClasses(category.color, "border")} shadow-2xl`
                    : 'bg-gray-900/50 border-gray-700/50 hover:border-gray-600/50'
                }`}
                style={{ 
                  animationDelay: isMounted ? `${index * 100}ms` : '0ms',
                  animation: isMounted ? 'fade-in-up 1.2s ease-out' : 'none'
                }}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 bg-gradient-to-br ${getColorClasses(category.color, "gradient")} rounded-xl flex items-center justify-center`}>
                    {category.icon}
                  </div>
                  <div className="text-left">
                    <h3 className={`font-bold text-lg ${activeCategory === category.category ? getColorClasses(category.color, "text") : 'text-gray-300'}`}>
                      {category.category}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {category.items.length} skills
                    </p>
                  </div>
                </div>
                {activeCategory === category.category && (
                  <div className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gradient-to-r ${getColorClasses(category.color, "gradient")} rounded-full`}></div>
                )}
              </button>
            ))}
          </div>

          {/* Active Category Skills */}
          {activeCategory && (
            <div className="animate-fade-in-up">
              {skillCategories
                .filter(category => category.category === activeCategory)
                .map((category) => (
                  <div key={category.category}>
                    {/* Category Header */}
                    <div className="flex items-center gap-4 mb-8">
                      <div className={`w-16 h-16 bg-gradient-to-br ${getColorClasses(category.color, "gradient")} rounded-2xl flex items-center justify-center border-2 border-white/20 shadow-2xl`}>
                        {category.icon}
                      </div>
                      <div>
                        <h2 className={`text-3xl font-bold mb-2 ${getColorClasses(category.color, "text")}`}>
                          {category.category}
                        </h2>
                        <p className="text-gray-400 text-lg">{category.description}</p>
                      </div>
                    </div>

                    {/* Skills Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                      {category.items.map((skill, skillIndex) => (
                        <div
                          key={skill.name}
                          className="group relative"
                          style={{ animationDelay: `${skillIndex * 50}ms` }}
                        >
                          <div className={`relative bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-2xl border ${getColorClasses(category.color, "border")} rounded-2xl p-6 hover:${getColorClasses(category.color, "hover")} transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer animate-fade-in-up`}>
                            {/* Skill Icon */}
                            <div className="flex justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
                              {skill.icon}
                            </div>
                            
                            {/* Skill Name */}
                            <h3 className="text-white font-semibold text-center">{skill.name}</h3>
                            
                            {/* Skill Description */}
                            <p className="text-xs text-gray-400 text-center mt-3">{skill.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          )}

          {/* Default State - Show All Categories Collapsed */}
          {!activeCategory && (
            <div className="text-center py-12">
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-gray-800/50 to-gray-900/50 border border-gray-700/50 backdrop-blur-sm">
                <Grid3x3 className="w-5 h-5 text-gray-400" />
                <span className="text-gray-400 font-medium">Click on a category to view skills</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Custom CSS */}
      {isMounted && (
        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-30px) rotate(5deg); }
          }
          @keyframes float-delay {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(-5deg); }
          }
          @keyframes float-slow {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
          }
          @keyframes float-delay-slow {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-25px) rotate(-3deg); }
          }
          @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(50px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes gradient {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          .animate-float { animation: float 8s ease-in-out infinite; }
          .animate-float-delay { animation: float-delay 10s ease-in-out infinite; }
          .animate-float-slow { animation: float-slow 12s ease-in-out infinite; }
          .animate-float-delay-slow { animation: float-delay-slow 15s ease-in-out infinite; }
          .animate-fade-in-up { animation: fade-in-up 1.2s ease-out; }
          .animate-gradient { animation: gradient 4s ease infinite; background-size: 200% 200%; }
        `}</style>
      )}
    </div>
  );
}