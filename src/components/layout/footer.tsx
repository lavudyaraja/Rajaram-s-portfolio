import {
  Github, Linkedin, Twitter, Instagram, Send, MapPin, Mail, Phone, Heart, ExternalLink, Code2, Palette, Cpu, Globe, Sparkles, Zap, Star, Brain
} from "lucide-react";
import { useState } from "react";

const techStack = [
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", color: "cyan" },
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", color: "white" },
  { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", color: "cyan" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", color: "green" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", color: "yellow" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", color: "blue" },
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", color: "green" },
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", color: "blue" },
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", color: "blue" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", color: "orange" },
];

const quickLinks = [
  { name: "Home", path: "/", icon: <Globe className="w-4 h-4" /> },
  { name: "About", path: "#about", icon: <Sparkles className="w-4 h-4" /> },
  { name: "Skills", path: "#skills", icon: <Brain className="w-4 h-4" /> },
  { name: "Projects", path: "#projects", icon: <Code2 className="w-4 h-4" /> },
  { name: "Blog", path: "#blog", icon: <Zap className="w-4 h-4" /> },
  { name: "Contact", path: "#contact", icon: <Mail className="w-4 h-4" /> },
];

const services = [
  { name: "Web Development", icon: <Globe className="w-5 h-5" />, color: "neon-blue" },
  { name: "Mobile Apps", icon: <Phone className="w-5 h-5" />, color: "neon-pink" },
  { name: "UI/UX Design", icon: <Palette className="w-5 h-5" />, color: "neon-yellow" },
  { name: "API Development", icon: <Cpu className="w-5 h-5" />, color: "neon-orange" },
  { name: "DevOps & Cloud", icon: <Zap className="w-5 h-5" />, color: "neon-cyan" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleQuickContact = () => {
    setShowSuccess(true);
    setEmail("");
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleNavClick = (path) => {
    if (path.startsWith('#')) {
      // Smooth scroll to section
      const element = document.querySelector(path);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    } else {
      // Regular navigation
      console.log(`Navigating to: ${path}`);
    }
  };

  const neonColors = {
    'neon-yellow': 'text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]',
    'neon-blue': 'text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.8)]',
    'neon-red': 'text-red-400 drop-shadow-[0_0_8px_rgba(248,113,113,0.8)]',
    'neon-orange': 'text-orange-400 drop-shadow-[0_0_8px_rgba(251,146,60,0.8)]',
    'neon-pink': 'text-pink-400 drop-shadow-[0_0_8px_rgba(244,114,182,0.8)]',
    'neon-cyan': 'text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]',
    'neon-green': 'text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.8)]',
  };

  return (
    <footer className="relative overflow-hidden bg-gray-900 text-white">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 sm:-top-20 sm:-left-20 w-20 h-20 sm:w-40 sm:h-40 bg-yellow-500 rounded-full filter blur-[50px] sm:blur-[100px] opacity-30 animate-pulse"></div>
        <div className="absolute -top-10 -right-10 sm:-top-20 sm:-right-20 w-20 h-20 sm:w-40 sm:h-40 bg-blue-500 rounded-full filter blur-[50px] sm:blur-[100px] opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute -bottom-10 left-1/2 sm:-bottom-20 w-20 h-20 sm:w-40 sm:h-40 bg-pink-500 rounded-full filter blur-[50px] sm:blur-[100px] opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Header Section */}
        {/* <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center justify-center mb-4 sm:mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-pink-500 to-blue-500 rounded-full blur-lg opacity-75"></div>
              <div className="relative w-16 h-16 sm:w-24 sm:h-24 rounded-full border-4 border-white/20 bg-gradient-to-br from-gray-800 to-gray-700 flex items-center justify-center">
                <Code2 className="w-8 h-8 sm:w-12 sm:h-12 text-cyan-400" />
              </div>
            </div>
          </div>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4 bg-gradient-to-r from-yellow-400 via-pink-500 to-blue-500 bg-clip-text text-transparent">
            Lavudya Raja
          </h3>
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-4">Software Engineer & Machine Learning Enthusiast</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-sm">
            <a href="mailto:codeml862@gmail.com" className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors">
              <Mail className="w-4 h-4" />
              <span className="break-all">codeml862@gmail.com</span>
            </a>
            <span className="flex items-center gap-2 text-pink-400">
              <MapPin className="w-4 h-4" />
              Haryana, India
            </span>
          </div>
        </div> */}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {/* Services Card */}
          <div className="md:col-span-1">
            <div className="backdrop-blur-md border border-white/10 rounded-2xl p-4 sm:p-6 h-full hover:border-yellow-400/30 transition-all duration-300">
              <h4 className="text-lg font-bold mb-4 sm:mb-6 text-yellow-400">Services</h4>
              <ul className="space-y-3 sm:space-y-4">
                {services.map((service) => (
                  <li key={service.name} className="flex items-center gap-3 group">
                    <div className={`${neonColors[service.color]}`}>
                      {service.icon}
                    </div>
                    <span className="text-sm sm:text-base text-gray-300 group-hover:text-white transition-colors">{service.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Tech Stack Card */}
          <div className="md:col-span-2 xl:col-span-2">
            <div className="backdrop-blur-md border border-white/10 rounded-2xl p-4 sm:p-6 h-full hover:border-blue-400/30 transition-all duration-300">
              <h4 className="text-lg font-bold mb-4 sm:mb-6 text-blue-400">Tech Stack</h4>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 sm:gap-4">
                {techStack.map((tech) => (
                  <div key={tech.name} className="group relative">
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-2 sm:p-3 hover:border-white/40 hover:bg-white/20 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-white/20">
                      <img src={tech.icon} alt={tech.name} className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 mx-auto" />
                    </div>
                    <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Subscribe Card */}
          <div className="md:col-span-1">
            <div className="backdrop-blur-md border border-white/10 rounded-2xl p-4 sm:p-6 h-full hover:border-pink-400/30 transition-all duration-300">
              <h4 className="text-lg font-bold mb-4 sm:mb-6 text-pink-400">Stay Connected</h4>
              <p className="text-sm text-gray-300 mb-4">Get updates on new projects and blog posts</p>
              <div className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  required
                  className="w-full px-3 sm:px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400 transition-all text-sm sm:text-base"
                />
                <button
                  onClick={handleQuickContact}
                  className="w-full px-3 sm:px-4 py-2 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-pink-500/25 transition-all duration-300 hover:scale-[1.02] text-sm sm:text-base"
                >
                  {showSuccess ? (
                    <span className="flex items-center justify-center gap-2">
                      <Star className="w-4 h-4 animate-spin" />
                      Success!
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <Send className="w-4 h-4" />
                      Subscribe
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links Bar - Redesigned */}
        <div className="backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-8 mb-8 sm:mb-12 hover:border-purple-400/30 transition-all duration-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-500/20 rounded-xl">
              <Globe className="w-6 h-6 text-purple-400" />
            </div>
            <h4 className="text-lg sm:text-xl font-bold text-purple-400">Quick Navigation</h4>
            <div className="flex-1 h-px bg-gradient-to-r from-purple-400/50 to-transparent"></div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {quickLinks.map((link, index) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.path)}
                className="group relative overflow-hidden bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 rounded-2xl p-4 transition-all duration-300 hover:scale-105"
              >
                <div className="flex flex-col items-center gap-3">
                  <div className={`p-3 rounded-xl bg-white/10 ${Object.values(neonColors)[index % 5].split(' ')[0]} ${Object.values(neonColors)[index % 5].split(' ')[1]} group-hover:scale-110 transition-transform duration-300`}>
                    {link.icon}
                  </div>
                  <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                    {link.name}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
              </button>
            ))}
            
            <a
              href="#"
              className="group relative overflow-hidden bg-gradient-to-br from-orange-500/20 to-red-500/20 hover:from-orange-500/30 hover:to-red-500/30 border border-orange-500/30 hover:border-orange-400/50 rounded-2xl p-4 transition-all duration-300 hover:scale-105"
            >
              <div className="flex flex-col items-center gap-3">
                <div className="p-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white group-hover:scale-110 transition-transform duration-300">
                  <ExternalLink className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium text-orange-400 group-hover:text-orange-300 transition-colors">
                  Resume
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400/10 to-red-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
            </a>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-6 sm:pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
            {/* Coding Quote */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="relative backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8 hover:border-gradient hover:border-purple-400/30 transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-2xl group-hover:shadow-purple-500/20">
                <div className="flex items-center justify-center mb-4">
                  <div className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-xl border border-white/20">
                    <Code2 className="w-6 h-6 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
                  </div>
                </div>
                <blockquote className="text-center">
                <p className="text-lg sm:text-xl lg:text-2xl font-medium bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-relaxed mb-4 group-hover:from-blue-300 group-hover:via-purple-300 group-hover:to-pink-300 transition-all duration-500">
                  "Any fool can write code that
                  <br /> a computer can understand.
                  <br /> Good programmers write code
                  <br /> that humans can understand"
                </p>
                <div className="flex items-center justify-center gap-3">
                  <div className="h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent w-12 group-hover:w-16 transition-all duration-300"></div>
                  <cite className="text-sm sm:text-base text-gray-400 font-medium group-hover:text-gray-300 transition-colors duration-300">
                    Martin Fowler
                  </cite>
                  <div className="h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent w-12 group-hover:w-16 transition-all duration-300"></div>
                </div>
              </blockquote>

                <div className="absolute top-4 left-4 text-6xl font-serif text-blue-500/20 group-hover:text-blue-500/30 transition-colors duration-300">
                  "
                </div>
                <div className="absolute bottom-4 right-4 text-6xl font-serif text-purple-500/20 group-hover:text-purple-500/30 transition-colors duration-300 rotate-180">
                  "
                </div>
              </div>
            </div>

            {/* Sanskrit Text */}
            <div className="text-center order-first lg:order-none">
              <p className="text-xs sm:text-sm font-medium bg-gradient-to-r from-yellow-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent leading-relaxed">
                ऊँ कृष्णाय वासुदेवाय हरये परमात्मने।
              </p>
              <p className="text-xs sm:text-sm font-medium bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent leading-relaxed">
                प्रणतः क्लेशनाशाय गोविंदाय नमो नमः।।
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 sm:gap-6">
              <a href="https://github.com/lavudyaraja" className="text-gray-400 hover:text-yellow-400 hover:scale-125 transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]">
                <Github className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
              <a href="https://www.linkedin.com/in/lavudyaraja5228/" className="text-gray-400 hover:text-blue-400 hover:scale-125 transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(96,165,250,0.8)]">
                <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
              <a href="https://x.com/LavudyaRaj22988" className="text-gray-400 hover:text-pink-400 hover:scale-125 transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(244,114,182,0.8)]">
                <Twitter className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
              <a href="https://www.instagram.com/u_no_me_1536" className="text-gray-400 hover:text-orange-400 hover:scale-125 transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(251,146,60,0.8)]">
                <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}