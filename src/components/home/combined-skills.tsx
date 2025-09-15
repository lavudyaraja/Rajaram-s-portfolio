import { 
  Code, Database, Server, Cloud, Brain, Palette, Wrench
} from "lucide-react";

// Helper function to get real icon URLs
const getRealIconUrl = (name) => {
  const iconMap = {
    "React": "react",
    "Next.js": "nextjs",
    "Tailwind CSS": "tailwindcss",
    "Node.js": "nodejs",
    "Python": "python",
    "TypeScript": "typescript",
    // "MongoDB": "mongodb",
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
    // "Redis": "redis",
    "SQLite": "sqlite",
    "Firebase": "firebase",
    "GitHub": "github",
    // "GitLab": "gitlab",
    "Linux": "linux",
    // "Kubernetes": "kubernetes",
    // "AWS": "amazonwebservices",
    // "TensorFlow": "tensorflow",
    // "PyTorch": "pytorch",
    "OpenCV": "opencv",
    "NumPy": "numpy",
    "Pandas": "pandas",
    // "Scikit-learn": "scikitlearn",
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

// Combined comprehensive skills data with real icons
const skillCategories = [
  {
    category: "Frontend Development",
    icon: <Code className="w-6 h-6" />,
    color: "cyan",
    items: [
      { name: "React", icon: <img src={getRealIconUrl("React")} alt="React" className="w-8 h-8 md:w-10 md:h-10" /> },
      // { name: "Vue.js", icon: <img src={getRealIconUrl("Vue.js")} alt="Vue.js" className="w-8 h-8 md:w-10 md:h-10" /> },
      { name: "TypeScript", icon: <img src={getRealIconUrl("TypeScript")} alt="TypeScript" className="w-8 h-8 md:w-10 md:h-10" /> },
      { name: "JavaScript", icon: <img src={getRealIconUrl("JavaScript")} alt="JavaScript" className="w-8 h-8 md:w-10 md:h-10" /> },
      { name: "HTML5", icon: <img src={getRealIconUrl("HTML5")} alt="HTML5" className="w-8 h-8 md:w-10 md:h-10" /> },
      { name: "CSS3", icon: <img src={getRealIconUrl("CSS3")} alt="CSS3" className="w-8 h-8 md:w-10 md:h-10" /> },
      { name: "Tailwind CSS", icon: <img src={getRealIconUrl("Tailwind CSS")} alt="Tailwind CSS" className="w-8 h-8 md:w-10 md:h-10" /> },
      { name: "Sass", icon: <img src={getRealIconUrl("Sass")} alt="Sass" className="w-8 h-8 md:w-10 md:h-10" /> },
      { name: "Bootstrap", icon: <img src={getRealIconUrl("Bootstrap")} alt="Bootstrap" className="w-8 h-8 md:w-10 md:h-10" /> },
      { name: "jQuery", icon: <img src={getRealIconUrl("jQuery")} alt="jQuery" className="w-8 h-8 md:w-10 md:h-10" /> }
    ]
  },
  {
    category: "Backend Development",
    icon: <Server className="w-6 h-6" />,
    color: "purple",
    items: [
      { name: "Node.js", icon: <img src={getRealIconUrl("Node.js")} alt="Node.js" className="w-8 h-8 md:w-10 md:h-10" /> },
      { name: "Express", icon: <img src={getRealIconUrl("Express")} alt="Express" className="w-8 h-8 md:w-10 md:h-10" /> },
      { name: "Python", icon: <img src={getRealIconUrl("Python")} alt="Python" className="w-8 h-8 md:w-10 md:h-10" /> },
      { name: "Django", icon: <img src={getRealIconUrl("Django")} alt="Django" className="w-8 h-8 md:w-10 md:h-10" /> },
      { name: "Java", icon: <img src={getRealIconUrl("Java")} alt="Java" className="w-8 h-8 md:w-10 md:h-10" /> },
      { name: "Spring", icon: <img src={getRealIconUrl("Spring")} alt="Spring" className="w-8 h-8 md:w-10 md:h-10" /> },
      { name: "PHP", icon: <img src={getRealIconUrl("PHP")} alt="PHP" className="w-8 h-8 md:w-10 md:h-10" /> },
      { name: "Laravel", icon: <img src={getRealIconUrl("Laravel")} alt="Laravel" className="w-8 h-8 md:w-10 md:h-10" /> }
    ]
  },
  {
    category: "Database",
    icon: <Database className="w-6 h-6" />,
    color: "green",
    items: [
      // { name: "MongoDB", icon: <img src={getRealIconUrl("MongoDB")} alt="MongoDB" className="w-8 h-8 md:w-10 md:h-10" /> },
      { name: "PostgreSQL", icon: <img src={getRealIconUrl("PostgreSQL")} alt="PostgreSQL" className="w-8 h-8 md:w-10 md:h-10" /> },
      { name: "MySQL", icon: <img src={getRealIconUrl("MySQL")} alt="MySQL" className="w-8 h-8 md:w-10 md:h-10" /> },
      // { name: "Redis", icon: <img src={getRealIconUrl("Redis")} alt="Redis" className="w-8 h-8 md:w-10 md:h-10" /> },
      { name: "SQLite", icon: <img src={getRealIconUrl("SQLite")} alt="SQLite" className="w-8 h-8 md:w-10 md:h-10" /> },
      { name: "Firebase", icon: <img src={getRealIconUrl("Firebase")} alt="Firebase" className="w-8 h-8 md:w-10 md:h-10" /> },
      // { name: "Prisma", icon: <img src={getRealIconUrl("Prisma")} alt="Prisma" className="w-8 h-8 md:w-10 md:h-10" /> },
       { 
        name: "prisma", 
        icon: (
          <img 
            src="/prisma.png" 
            alt="prisma" 
            className="w-8 h-8 md:w-10 md:h-10" 
          />
        ) 
      },
      // { name: "Neon", icon: <img src={getRealIconUrl("Neon")} alt="Neon" className="w-8 h-8 md:w-10 md:h-10" /> },
      { 
        name: "neon", 
        icon: (
          <img 
            src="/neon.png" 
            alt="neon" 
            className="w-8 h-8 md:w-10 md:h-10" 
          />
        ) 
      },

      { name: "Supabase", icon: <img src={getRealIconUrl("Supabase")} alt="Supabase" className="w-8 h-8 md:w-10 md:h-10" /> }
    ]
  },
  {
    category: "DevOps & Tools",
    icon: <Cloud className="w-6 h-6" />,
    color: "orange",
    items: [
      { name: "Git", icon: <img src={getRealIconUrl("Git")} alt="Git" className="w-8 h-8 md:w-10 md:h-10" /> },
      { name: "GitHub", icon: <img src={getRealIconUrl("GitHub")} alt="GitHub" className="w-8 h-8 md:w-10 md:h-10" /> },
      // { name: "GitLab", icon: <img src={getRealIconUrl("GitLab")} alt="GitLab" className="w-8 h-8 md:w-10 md:h-10" /> },
      { name: "Docker", icon: <img src={getRealIconUrl("Docker")} alt="Docker" className="w-8 h-8 md:w-10 md:h-10" /> },
      { name: "Linux", icon: <img src={getRealIconUrl("Linux")} alt="Linux" className="w-8 h-8 md:w-10 md:h-10" /> },
      // { name: "Kubernetes", icon: <img src={getRealIconUrl("Kubernetes")} alt="Kubernetes" className="w-8 h-8 md:w-10 md:h-10" /> },
      // { name: "AWS", icon: <img src={getRealIconUrl("AWS")} alt="AWS" className="w-8 h-8 md:w-10 md:h-10" /> },
      // { name: "n8n", icon: <img src={getRealIconUrl("n8n")} alt="n8n" className="w-8 h-8 md:w-10 md:h-10" /> }
      { 
  name: "n8n", 
  icon: (
    <img 
      src="/n8n.png" 
      alt="n8n" 
      className="w-8 h-8 md:w-10 md:h-10" 
    />
  ) 
}

    ]
  },
  {
    category: "AI & Machine Learning",
    icon: <Brain className="w-6 h-6" />,
    color: "yellow",
    items: [
      { name: "Python", icon: <img src={getRealIconUrl("Python")} alt="Python" className="w-8 h-8 md:w-10 md:h-10" /> },
      // { name: "TensorFlow", icon: <img src={getRealIconUrl("TensorFlow")} alt="TensorFlow" className="w-8 h-8 md:w-10 md:h-10" /> },
      // { name: "PyTorch", icon: <img src={getRealIconUrl("PyTorch")} alt="PyTorch" className="w-8 h-8 md:w-10 md:h-10" /> },
      // { name: "Keras", icon: <img src={getRealIconUrl("Keras")} alt="Keras" className="w-8 h-8 md:w-10 md:h-10" /> },
      { name: "NumPy", icon: <img src={getRealIconUrl("NumPy")} alt="NumPy" className="w-8 h-8 md:w-10 md:h-10" /> },
      { name: "Pandas", icon: <img src={getRealIconUrl("Pandas")} alt="Pandas" className="w-8 h-8 md:w-10 md:h-10" /> },
      // { name: "SciPy", icon: <img src={getRealIconUrl("SciPy")} alt="SciPy" className="w-8 h-8 md:w-10 md:h-10" /> },
      // { name: "NLTK", icon: <img src={getRealIconUrl("NLTK")} alt="NLTK" className="w-8 h-8 md:w-10 md:h-10" /> },
       { 
        name: "NLP", 
        icon: (
          <img 
            src="/NLTK.png" 
            alt="NLTK" 
            className="w-8 h-8 md:w-10 md:h-10" 
          />
        ) 
      },
      // { name: "spaCy", icon: <img src={getRealIconUrl("spaCy")} alt="spaCy" className="w-8 h-8 md:w-10 md:h-10" /> },
       { 
        name: "sciPy", 
        icon: (
          <img 
            src="/sciPy.png" 
            alt="sciPy" 
            className="w-8 h-8 md:w-10 md:h-10" 
          />
        ) 
      },
       { 
        name: "Transformer", 
        icon: (
          <img 
            src="/Transformers.png" 
            alt="Transformer" 
            className="w-8 h-8 md:w-10 md:h-10" 
          />
        ) 
      },
      //  { 
      //   name: "TextBlow", 
      //   icon: (
      //     <img 
      //       src="/neon.png" 
      //       alt="neon" 
      //       className="w-8 h-8 md:w-10 md:h-10" 
      //     />
      //   ) 
      // },
      { name: "OpenCV", icon: <img src={getRealIconUrl("OpenCV")} alt="OpenCV" className="w-8 h-8 md:w-10 md:h-10" /> },
      { name: "Matplotlib", icon: <img src={getRealIconUrl("Matplotlib")} alt="Matplotlib" className="w-8 h-8 md:w-10 md:h-10" /> }
    ]
  },
  {
    category: "UI/UX Design",
    icon: <Palette className="w-6 h-6" />,
    color: "pink",
    items: [
      { name: "Figma", icon: <img src={getRealIconUrl("Figma")} alt="Figma" className="w-8 h-8 md:w-10 md:h-10" /> },
      { name: "Canva", icon: <img src={getRealIconUrl("Canva")} alt="Canva" className="w-8 h-8 md:w-10 md:h-10" /> }
    ]
  },
  {
    category: "Tools & Utilities",
    icon: <Wrench className="w-6 h-6" />,
    color: "blue",
    items: [
      { name: "VS Code", icon: <img src={getRealIconUrl("VS Code")} alt="VS Code" className="w-8 h-8 md:w-10 md:h-10" /> },
      { name: "Postman", icon: <img src={getRealIconUrl("Postman")} alt="Postman" className="w-8 h-8 md:w-10 md:h-10" /> },
      { name: "npm", icon: <img src={getRealIconUrl("npm")} alt="npm" className="w-8 h-8 md:w-10 md:h-10" /> },
      { name: "Yarn", icon: <img src={getRealIconUrl("Yarn")} alt="Yarn" className="w-8 h-8 md:w-10 md:h-10" /> },
      // { name: "Chrome DevTools", icon: <img src={getRealIconUrl("Chrome DevTools")} alt="Chrome DevTools" className="w-8 h-8 md:w-10 md:h-10" /> },
      // { name: "Slack", icon: <img src={getRealIconUrl("Slack")} alt="Slack" className="w-8 h-8 md:w-10 md:h-10" /> }
    ]
  }
];

// Helper function to get color classes
const getColorClasses = (color, type) => {
  const colorMap = {
    cyan: {
      bg: "bg-cyan-500/10",
      border: "border-cyan-400/30",
      text: "text-cyan-400",
      hover: "hover:bg-cyan-500/20 hover:border-cyan-400/50"
    },
    purple: {
      bg: "bg-purple-500/10",
      border: "border-purple-400/30",
      text: "text-purple-400",
      hover: "hover:bg-purple-500/20 hover:border-purple-400/50"
    },
    green: {
      bg: "bg-green-500/10",
      border: "border-green-400/30",
      text: "text-green-400",
      hover: "hover:bg-green-500/20 hover:border-green-400/50"
    },
    orange: {
      bg: "bg-orange-500/10",
      border: "border-orange-400/30",
      text: "text-orange-400",
      hover: "hover:bg-orange-500/20 hover:border-orange-400/50"
    },
    yellow: {
      bg: "bg-yellow-500/10",
      border: "border-yellow-400/30",
      text: "text-yellow-400",
      hover: "hover:bg-yellow-500/20 hover:border-yellow-400/50"
    },
    pink: {
      bg: "bg-pink-500/10",
      border: "border-pink-400/30",
      text: "text-pink-400",
      hover: "hover:bg-pink-500/20 hover:border-pink-400/50"
    },
    blue: {
      bg: "bg-blue-500/10",
      border: "border-blue-400/30",
      text: "text-blue-400",
      hover: "hover:bg-blue-500/20 hover:border-blue-400/50"
    }
  };
  return colorMap[color]?.[type] || colorMap.cyan[type];
};

export default function CombinedSkills() {
  const categoriesToShow = [
    { key: "Frontend Development", color: "cyan" },
    // { key: "Backend Development", color: "purple" },
    { key: "Database", color: "green" },
    { key: "DevOps & Tools", color: "orange" },
    { key: "AI & Machine Learning", color: "yellow" },
    { key: "UI/UX Design", color: "pink" },
    { key: "Tools & Utilities", color: "blue" },
  ];
  
  return (
    <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 md:mb-6 text-white tracking-tight">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 text-transparent bg-clip-text animate-gradient-x">
              Skills & Technologies
            </span>
          </h2>
          <p className="text-base md:text-lg text-gray-300 max-w-2xl md:max-w-3xl mx-auto">
            A showcase of the technologies and tools I use to build amazing digital experiences.
          </p>
        </div>
        
        {categoriesToShow.map(({ key, color }) => {
          const category = skillCategories.find(c => c.category === key);
          if (!category) return null;
          
          return (
            <div key={key} className="mb-12">
              <h3 className={`text-xl md:text-2xl font-bold mb-6 flex items-center gap-3 ${getColorClasses(color, "text")}`}>
                 {category.icon} {key}
              </h3>
              
              <div className="flex flex-wrap justify-center sm:justify-start gap-4 md:gap-6">
                {category.items.map((skill, idx) => (
                  <div
                    key={`${key}-${idx}`}
                    className={`group relative flex flex-col items-center justify-center w-24 h-24 sm:w-28 sm:h-28 rounded-xl border transition-all duration-300
                      ${getColorClasses(color, "border")} 
                      ${getColorClasses(color, "bg")} 
                      ${getColorClasses(color, "hover")} 
                      hover:shadow-lg hover:shadow-white/10`}
                  >
                    <div className="transition-transform duration-300 group-hover:-translate-y-2">
                      {skill.icon}
                    </div>
                    <p className="absolute bottom-3 text-xs md:text-sm font-medium text-gray-300 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      {skill.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}