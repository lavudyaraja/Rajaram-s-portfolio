'use client'

import { useState } from "react";
import { 
  Download, 
  Mail, 
  Award, 
  Briefcase, 
  GraduationCap, 
  User, 
  Code, 
  Globe, 
  Zap, 
  ArrowRight,
  Github,
  Linkedin,
  Twitter,
  MapPin,
  Calendar,
  CheckCircle,
  ExternalLink,
  Star,
  Database,
  Server,
  Palette,
  Brain,
  Menu,
  X
} from "lucide-react";

// Skills with their respective icons
const skillIcons = {
  "React": "⚛️",
  "TypeScript": "🔷", 
  "Node.js": "🟢",
  "Python": "🐍",
  "Machine Learning": "🤖",
  "Tailwind CSS": "🎨",
  "JavaScript": "📜",
  "HTML": "🌐",
};

const getSkillIcon = (skillName: any) => {
  // Custom React icons for better visual appeal
  const iconMap: { [key: string]: React.ReactNode } = {
    "React": <div className="w-6 h-6 text-cyan-400"></div>,
    "TypeScript": <div className="w-6 h-6 text-blue-500">TS</div>,
    "Node.js": <Server className="w-6 h-6 text-green-500" />,
    "Python": <div className="w-6 h-6 text-yellow-500"></div>,
    "Machine Learning": <Brain className="w-6 h-6 text-purple-500" />,
    "Tailwind CSS": <Palette className="w-6 h-6 text-cyan-500" />,
    "JavaScript": <div className="w-6 h-6 text-yellow-400">JS</div>,
    "HTML": <Code className="w-6 h-6 text-orange-500" />,
    "CSS": <div className="w-6 h-6 text-blue-400"></div>,
    "Git": <div className="w-6 h-6 text-red-500"></div>,
    "MongoDB": <div className="w-6 h-6 text-green-400"></div>,
    "SQL": <div className="w-6 h-6 text-gray-400"></div>
  };
  
  return iconMap[skillName] || <Code className="w-6 h-6 text-gray-400" />;
};

// Experience, Education, and Certifications data
const experiences = [
  {
    company: "Vision AI Research and Organization",
    position: "Machine Learning Intern",
    period: "June 2024 - July 2024",
    description: "Worked on developing a music recommendation system using machine learning techniques such as collaborative filtering and content-based filtering. Focused on analyzing user preferences to improve the personalization and accuracy of recommendations.",
    achievements: [
      "Achieved 87% accuracy in personalized music recommendations",
      "Implemented hybrid recommendation logic combining user behavior and song metadata",
      "Optimized data preprocessing pipeline, reducing model training time by 30%",
    ]
  },
];

const education = [
  {
    degree: "BTech Computer Science and Engineering",
    institution: "Central University Of Haryana",
    period: "2022 - 2026",
    description: "Focused on advanced algorithms, Web development, software engineering, and Machine Learning.",
  },
  {
    degree: "Intermediate(MPC)",
    institution: "TTWREIS COE BOYS Narsapur",
    period: "2019 - 2021",
    description: "Completed my Intermediate with a focus on Mathematics, Physics, and Chemistry. These subjects strengthened my analytical thinking, problem-solving skills, and laid a strong foundation for my journey into technology and programming.",
  },
];

const certifications = [
  {
    name: 'Frontend Developer (React)',
    issuer: 'HackerRank',
    date: 'April 2024',
  },
  {
    name: 'JavaScript (Intermediate)',
    issuer: 'HackerRank',
    date: 'March 2025',
  },
  {
    name: 'Problem Solving (Basic)',
    issuer: 'HackerRank',
    date: 'March 2025',
  },
  {
    name: 'Python (Basic)',
    issuer: 'HackerRank',
    date: 'March 2025',
  },
  {
    name: 'SQL (Basic)',
    issuer: 'HackerRank',
    date: 'April 2024',
  },
  {
    name: 'C++',
    issuer: 'Udemy',
    date: 'March 2025',
  },
  {
    name: 'HTML, JavaScript',
    issuer: 'Udemy',
    date: 'March 2024',
  },
  {
    name: 'Java and Python',
    issuer: 'Udemy',
    date: 'March 2025',
  },
  {
    name: 'Java and Spring Boot',
    issuer: 'Udemy',
    date: 'September 2024',
  },
  {
    name: 'Machine Learning',
    issuer: 'Udemy',
    date: 'March 2025',
  },
  {
    name: 'Software Architecture',
    issuer: 'Udemy',
    date: 'March 2025',
  }
];

const skills = [
  { name: "React", level: 90, category: "Frontend" },
  { name: "TypeScript", level: 85, category: "Frontend" },
  { name: "Node.js", level: 80, category: "Backend" },
  { name: "Python", level: 75, category: "Programming" },
  { name: "Machine Learning", level: 70, category: "AI/ML" },
  { name: "Tailwind CSS", level: 85, category: "Frontend" },
];

const stats = [
  { label: "Years of Experience", value: "1+", icon: Zap },
  { label: "Projects Completed", value: "10+", icon: Code },
  { label: "Skills Mastered", value: "10+", icon: Globe },
  { label: "Certifications", value: "11", icon: Award },
];

export default function About() {
  const [activeTab, setActiveTab] = useState("experience");

  return (
    <div className="bg-black">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-purple-600/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 py-8 sm:py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Hero Section */}
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <div className="inline-flex items-center px-3 py-1 sm:px-4 sm:py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-4 sm:mb-6">
              <User className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400 mr-2" />
              <span className="text-blue-400 text-xs sm:text-sm font-medium">About Me</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 px-4">
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Lavudya Raja
              </span>
            </h1>
            
            <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-6 sm:mb-8 px-4">
              A passionate Software Engineer & ML Enthusiast crafting innovative solutions 
              with modern technologies and creative problem-solving
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 max-w-4xl mx-auto px-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div 
                    key={index} 
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 hover:bg-white/10 transition-all duration-300 group"
                  >
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-blue-400 mx-auto mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300" />
                    <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-slate-400 text-xs sm:text-sm leading-tight">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
            
            {/* Left Column - Profile & Skills */}
            <div className="xl:col-span-1 space-y-6 sm:space-y-8">
              
              {/* Profile Card */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 hover:bg-white/10 transition-all duration-500">
                <div className="text-center">
                  <div className="relative inline-block mb-4 sm:mb-6">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full bg-gradient-to-br from-blue-500 via-cyan-500 to-purple-500 p-1">
                      <div className="bg-slate-900 rounded-full w-full h-full flex items-center justify-center relative overflow-hidden">
                        <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-transparent bg-gradient-to-br from-blue-400 to-cyan-400 bg-clip-text">
                          LR
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full"></div>
                      </div>
                    </div>
                    <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-full border-2 sm:border-4 border-slate-900 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  
                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Lavudya Raja</h2>
                  <p className="text-blue-400 font-medium mb-2 text-sm sm:text-base">Software Engineer & ML Enthusiast</p>
                  
                  <div className="flex items-center justify-center text-slate-400 text-xs sm:text-sm mb-4 sm:mb-6">
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    <span>Rewari, Haryana, IN</span>
                  </div>
                  
                  {/* Social Links */}
                  <div className="flex justify-center space-x-2 sm:space-x-3 mb-6 sm:mb-8">
                    {[
                      { icon: Github, href: "https://github.com/lavudyaraja", label: "GitHub" },
                      { icon: Linkedin, href: "https://www.linkedin.com/in/lavudyaraja5228/", label: "LinkedIn" },
                      { icon: Twitter, href: "https://x.com/Lavudyaraja22988", label: "Twitter" }
                    ].map(({ icon: Icon, href, label }) => (
                      <a 
                        key={label}
                        href={href} 
                        className="w-10 h-10 sm:w-12 sm:h-12 bg-white/5 hover:bg-blue-500/20 border border-white/10 hover:border-blue-500/30 rounded-lg sm:rounded-xl flex items-center justify-center text-slate-400 hover:text-blue-400 transition-all duration-300 group"
                        title={label}
                      >
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform duration-300" />
                      </a>
                    ))}
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex flex-col gap-3">
                    <a
                      href="mailto:lavudyaraja12345@gmail.com" 
                      className="flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg sm:rounded-xl text-white font-medium transition-all duration-300 group text-sm sm:text-base"
                    >
                      <Mail className="w-3 h-3 sm:w-4 sm:h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                      Get In Touch
                    </a>
                    <a
                      href="/Rajaram-resume.pdf" 
                      download
                      className="flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 rounded-lg sm:rounded-xl text-white font-medium transition-all duration-300 group shadow-lg shadow-blue-500/25 text-sm sm:text-base"
                    >
                      <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                      Download CV
                      <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Skills & Technologies Card */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 hover:bg-white/10 transition-all duration-500">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6 flex items-center">
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 mr-2" />
                  Skills & Technologies
                </h3>
                <p className="text-gray-300 text-sm mb-4 text-center">
                  A comprehensive showcase of my technical expertise and tools I use to build exceptional digital experiences
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {skills.map((skill, index) => (
                    <div 
                      key={index}
                      className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col items-center text-center hover:bg-white/10 transition-all duration-300 group"
                    >
                      <div className="mb-3">
                        {getSkillIcon(skill.name)}
                      </div>
                      <h4 className="font-bold text-white text-sm mb-1">{skill.name}</h4>
                      <p className="text-slate-400 text-xs">{skill.category}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Content */}
            <div className="xl:col-span-2 space-y-6 sm:space-y-8">
              
              {/* Introduction */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 hover:bg-white/10 transition-all duration-500">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center">
                  <User className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400 mr-2 sm:mr-3" />
                  My Journey
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-slate-300 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                    I am passionate about building impactful, user-friendly web applications using modern frontend technologies like React.js,
                    Next.js, and Tailwind CSS. I enjoy designing clean, responsive interfaces that provide a seamless user experience, and
                    I love working with design systems like Shadcn UI and Material UI to create modern, accessible UIs.
                  </p>
                  
                  <p className="text-slate-300 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                    With a strong foundation in JavaScript and TypeScript, I focus on writing clean, maintainable code, and
                    I am comfortable using tools like Git, GitHub, Firebase, Vercel, and Netlify to develop and deploy real-world applications.
                    I also bring experience with databases like MySQL and a solid understanding of DBMS concepts, enabling me to contribute to
                    full-stack projects when needed.
                  </p>
                  
                  <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                    I have a deep interest in machine learning and natural language processing.
                    I have worked with libraries such as NumPy, Pandas, Scikit-learn, SciPy, Seaborn, Matplotlib,
                    BeautifulSoup, and NLTK to explore data, build intelligent models, and solve practical problems.
                  </p>
                </div>
              </div>

              {/* Tabbed Content */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl overflow-hidden hover:bg-white/10 transition-all duration-500">
                
                {/* Tab Navigation */}
                <div className="flex border-b border-white/10 bg-white/5 overflow-x-auto">
                  {[
                    { id: "experience", label: "Experience", icon: Briefcase },
                    { id: "education", label: "Education", icon: GraduationCap },
                    { id: "certifications", label: "Certifications", icon: Award }
                  ].map(({ id, label, icon: Icon }) => (
                    <button
                      key={id}
                      onClick={() => setActiveTab(id)}
                      className={`flex-1 min-w-0 py-3 sm:py-4 px-3 sm:px-6 text-xs sm:text-sm font-medium flex items-center justify-center transition-all duration-300 relative group whitespace-nowrap ${
                        activeTab === id
                          ? "text-blue-400"
                          : "text-slate-400 hover:text-slate-300"
                      }`}
                    >
                      <Icon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 group-hover:scale-110 transition-transform duration-300 flex-shrink-0" />
                      <span className="hidden sm:inline">{label}</span>
                      <span className="sm:hidden">{label.split(' ')[0]}</span>
                      {activeTab === id && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400"></div>
                      )}
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                <div className="p-4 sm:p-6 lg:p-8">
                  {activeTab === "experience" && (
                    <div className="space-y-4 sm:space-y-6">
                      {experiences.map((exp, index) => (
                        <div key={index} className="group">
                          <div className="flex flex-col sm:flex-row sm:items-start space-y-3 sm:space-y-0 sm:space-x-4">
                            <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg sm:rounded-xl flex items-center justify-center">
                              <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                            </div>
                            <div className="flex-grow">
                              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 space-y-1 sm:space-y-0">
                                <div>
                                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                                    {exp.position}
                                  </h3>
                                  <p className="text-blue-400 font-medium text-sm sm:text-base">{exp.company}</p>
                                </div>
                                <div className="flex items-center text-slate-400 text-xs sm:text-sm">
                                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                                  {exp.period}
                                </div>
                              </div>
                              <p className="text-slate-300 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">{exp.description}</p>
                              <div className="flex flex-wrap gap-2">
                                {exp.achievements.map((achievement, i) => (
                                  <span 
                                    key={i} 
                                    className="px-2 sm:px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-full text-xs sm:text-sm flex items-center"
                                  >
                                    <CheckCircle className="w-2 h-2 sm:w-3 sm:h-3 mr-1 flex-shrink-0" />
                                    <span className="truncate">{achievement}</span>
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === "education" && (
                    <div className="space-y-4 sm:space-y-6">
                      {education.map((edu, index) => (
                        <div key={index} className="group">
                          <div className="flex flex-col sm:flex-row sm:items-start space-y-3 sm:space-y-0 sm:space-x-4">
                            <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg sm:rounded-xl flex items-center justify-center">
                              <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                            </div>
                            <div className="flex-grow">
                              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 space-y-1 sm:space-y-0">
                                <div>
                                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-purple-400 transition-colors duration-300">
                                    {edu.degree}
                                  </h3>
                                  <p className="text-purple-400 font-medium text-sm sm:text-base">{edu.institution}</p>
                                </div>
                                <div className="flex items-center text-slate-400 text-xs sm:text-sm">
                                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                                  {edu.period}
                                </div>
                              </div>
                              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">{edu.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === "certifications" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                      {certifications.map((cert, index) => (
                        <div 
                          key={index} 
                          className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-yellow-500/30 rounded-lg sm:rounded-2xl p-3 sm:p-4 transition-all duration-300 group"
                        >
                          <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                              <Award className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                            </div>
                            <div className="flex-grow min-w-0">
                              <h3 className="font-bold text-white text-xs sm:text-sm mb-1 group-hover:text-yellow-400 transition-colors duration-300 truncate">
                                {cert.name}
                              </h3>
                              <p className="text-yellow-400 text-xs font-medium truncate">{cert.issuer}</p>
                              <div className="flex items-center text-slate-400 text-xs mt-1">
                                <Calendar className="w-3 h-3 mr-1 flex-shrink-0" />
                                {cert.date}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}