import { Project } from '../types/project';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: "Chat Assistant Platform",
    description: "Multi-provider AI conversation system integrating OpenAI, Anthropic, and Google APIs.",
    longDescription: "A comprehensive AI chat platform that integrates multiple AI providers including OpenAI GPT models, Anthropic Claude, and Google's Gemini. Features include persistent conversation history, real-time collaboration, advanced prompt engineering, custom AI model training, and enterprise-grade security.",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Neon", "AI/ML"],
    githubUrl: "https://github.com/lavudyaraja/nextgenai",
    demoUrl: "https://nextgenai-three.vercel.app/",
    imageUrl: "./images/nextgen.png",
    category: "ai",
    featured: true,
    stats: { stars: 145, forks: 23, issues: 5 },
    date: "2024-01",
    status: "completed",
    duration: "3 months",
    teamSize: 2,
    achievements: [
      "Integrated 3 major AI providers",
      "Achieved 99.9% uptime",
      "Processed 1M+ conversations"
    ],
    technologies: {
      frontend: ["Next.js", "React", "TypeScript", "TailwindCSS"],
      backend: ["Node.js", "Express", "PostgreSQL", "Redis"],
      database: ["PostgreSQL", "Redis"],
      tools: ["Docker", "AWS", "Vercel", "OpenAI API"]
    }
  },
  {
    id: '2',
    title: "Portfolio Website",
    description: "Personal portfolio showcasing projects, blogs, and contact information.",
    longDescription: "A modern, high-performance portfolio website built with Next.js 14, featuring server-side rendering, optimal SEO, and exceptional performance scores. Includes a blog system with MDX support and comprehensive analytics dashboard.",
    tags: ["Next.js", "TailwindCSS", "TypeScript", "Framer Motion"],
    githubUrl: "https://github.com/lavudyaraja/portfolio",
    demoUrl: "https://lavudyaraja.dev",
    imageUrl: "./images/ContentGeneration.jpg",
    category: "web",
    featured: true,
    stats: { stars: 89, forks: 12, issues: 2 },
    date: "2024-02",
    status: "completed",
    duration: "2 months",
    teamSize: 1,
    achievements: [
      "95+ Lighthouse performance score",
      "100% responsive design",
      "Optimized SEO implementation"
    ],
    technologies: {
      frontend: ["Next.js", "React", "TypeScript", "TailwindCSS", "Framer Motion"],
      backend: ["Next.js API Routes", "Node.js"],
      database: ["SQLite", "Prisma"],
      tools: ["Vercel", "Google Analytics", "MDX"]
    }
  },
  {
    id: '3',
    title: "Task Management App",
    description: "Collaborative task management with real-time updates and team features.",
    longDescription: "A comprehensive task management platform designed for teams of all sizes. Features include real-time collaboration, drag-and-drop interface, kanban boards, Gantt charts, and automated workflows.",
    tags: ["Vue.js", "Firebase", "Socket.io", "Vuetify"],
    githubUrl: "https://github.com/lavudyaraja/taskmanager",
    demoUrl: "https://taskmanager-demo.com",
    imageUrl: "./images/FitnessTracker.jpg",
    category: "fullstack",
    stats: { stars: 234, forks: 45, issues: 8 },
    date: "2023-12",
    status: "completed",
    duration: "4 months",
    teamSize: 3,
    achievements: [
      "10K+ active users",
      "Real-time sync across devices",
      "50+ integrations"
    ],
    technologies: {
      frontend: ["Vue.js", "Vuetify", "JavaScript", "Vuex"],
      backend: ["Node.js", "Express", "Socket.io"],
      database: ["Firebase", "MongoDB"],
      tools: ["Docker", "AWS", "Firebase", "Socket.io"]
    }
  },
  {
    id: '4',
    title: "Weather Dashboard",
    description: "Interactive weather dashboard with real-time data and forecasts.",
    longDescription: "An advanced weather analytics platform providing real-time weather data, detailed forecasts, and beautiful visualizations. Features include location-based weather alerts and historical weather patterns.",
    tags: ["React", "D3.js", "OpenWeather API", "Chart.js"],
    githubUrl: "https://github.com/lavudyaraja/weather-dashboard",
    demoUrl: "https://weather-dashboard.com",
    imageUrl: "./images/AIContentGenerator.jpg",
    category: "web",
    stats: { stars: 167, forks: 34, issues: 3 },
    date: "2023-11",
    status: "completed",
    duration: "2 months",
    teamSize: 2,
    achievements: [
      "Real-time weather updates",
      "Advanced data visualizations",
      "Mobile-responsive design"
    ],
    technologies: {
      frontend: ["React", "D3.js", "Chart.js", "Material-UI"],
      backend: ["Node.js", "Express"],
      database: ["MongoDB"],
      tools: ["OpenWeather API", "D3.js", "Chart.js", "Heroku"]
    }
  },
  {
    id: '5',
    title: "Social Media Analytics",
    description: "Comprehensive analytics platform tracking engagement and trends.",
    longDescription: "A powerful social media analytics platform that provides deep insights into social media performance across multiple platforms. Features include sentiment analysis and trend prediction.",
    tags: ["Angular", "Python", "FastAPI", "PostgreSQL"],
    githubUrl: "https://github.com/lavudyaraja/social-analytics",
    demoUrl: "https://social-analytics-demo.com",
    imageUrl: "./images/ContentGeneration.jpg",
    category: "fullstack",
    stats: { stars: 298, forks: 67, issues: 12 },
    date: "2023-10",
    status: "maintenance",
    duration: "5 months",
    teamSize: 4,
    achievements: [
      "1M+ posts analyzed daily",
      "95% accuracy in sentiment analysis",
      "Real-time trend detection"
    ],
    technologies: {
      frontend: ["Angular", "TypeScript", "RxJS", "NgRx"],
      backend: ["Python", "FastAPI", "Celery"],
      database: ["PostgreSQL", "Redis", "Elasticsearch"],
      tools: ["Docker", "Kubernetes", "Apache Kafka", "TensorFlow"]
    }
  },
  {
    id: '6',
    title: "Mobile Banking App",
    description: "Secure mobile banking with biometric authentication and real-time transactions.",
    longDescription: "A comprehensive mobile banking application featuring enterprise-grade security, biometric authentication, real-time transaction processing, and AI-powered financial insights.",
    tags: ["React Native", "Node.js", "MongoDB", "JWT"],
    githubUrl: "https://github.com/lavudyaraja/mobile-banking",
    demoUrl: "https://mobile-banking-demo.com",
    imageUrl: "./images/FitnessTracker.jpg",
    category: "mobile",
    stats: { stars: 412, forks: 89, issues: 15 },
    date: "2023-09",
    status: "in-progress",
    duration: "6 months",
    teamSize: 5,
    achievements: [
      "Bank-level security implementation",
      "Biometric authentication",
      "Real-time transaction processing"
    ],
    technologies: {
      frontend: ["React Native", "TypeScript", "Redux"],
      backend: ["Node.js", "Express", "JWT"],
      database: ["MongoDB", "Redis"],
      tools: ["Docker", "AWS", "Stripe API", "Twilio"]
    }
  }
];

export const SIMPLE_PROJECTS = [
  {
    id: '1',
    title: "CHAT ASSISTANT PLATFORM - A MULTI-PROVIDER INTELLIGENT CONVERSATION SYSTEM",
    description: "A scalable and user-friendly chat application that integrates multiple AI providers (OpenAI, Anthropic, Google) into a single platform. persistent history, and seamless provider switching. concepts with real-world AI applications.",
    tags: ["Nextjs", "Typescript", "PostgreSQL", "Neon"],
    githubUrl: "https://github.com/lavudyaraja/nextgenai",
    demoUrl: "https://nextgenai-three.vercel.app/",
    imageUrl: "./images/nextgen.png",
    color: "yellow",
    featured: true
  },
  {
    id: '2',
    title: "Portfolio Website",
    description: "A personal portfolio site showcasing projects, blogs, and contact info. Built using Next.js and TailwindCSS with optimal performance and SEO.",
    tags: ["Next.js", "TailwindCSS", "TypeScript"],
    githubUrl: "https://github.com/your/portfolio",
    demoUrl: "https://your-portfolio.com",
    imageUrl: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop&crop=center",
    color: "pink",
    featured: true
  },
  {
    id: '3',
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates, team collaboration features, and advanced project tracking capabilities.",
    tags: ["Vue.js", "Firebase", "Socket.io", "Vuetify"],
    githubUrl: "https://github.com/your/taskmanager",
    demoUrl: "https://taskmanager-demo.com",
    imageUrl: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop&crop=center",
    color: "orange"
  },
  {
    id: '4',
    title: "Weather Dashboard",
    description: "An interactive weather dashboard providing real-time weather data, forecasts, and climate analytics with beautiful data visualizations.",
    tags: ["React", "D3.js", "OpenWeather API", "Chart.js"],
    githubUrl: "https://github.com/your/weather-dashboard",
    demoUrl: "https://weather-dashboard.com",
    imageUrl: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&h=400&fit=crop&crop=center",
    color: "cyan"
  },
  {
    id: '5',
    title: "Social Media Analytics",
    description: "A comprehensive social media analytics platform that tracks engagement, analyzes trends, and provides actionable insights for content creators.",
    tags: ["Angular", "Python", "FastAPI", "PostgreSQL"],
    githubUrl: "https://github.com/your/social-analytics",
    demoUrl: "https://social-analytics-demo.com",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&crop=center",
    color: "purple"
  }
];
