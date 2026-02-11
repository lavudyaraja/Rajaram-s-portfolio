import { Project } from '../types/project';

export const PROJECTS: Project[] = [
 {
  id: '1',
  title: "EvalAI - AI Assisted Semester Exam Evaluation System",
  description: "AI-powered semester exam evaluation platform with OCR, LLM-based grading, and teacher review workflows.",
  longDescription: "EvalAI is a comprehensive AI-assisted exam evaluation system built with Next.js 14 and TypeScript. It enables teachers to upload student answer PDFs, extract handwritten text using OCR, evaluate answers using LLMs via Groq, and review results through an advanced split-screen approval interface. The platform features dashboard analytics, confidence scoring, teacher overrides, and scalable cloud deployment.",
  tags: ["Next.js", "TypeScript", "MongoDB", "PostgreSQL", "Groq", "OCR", "AI/ML"],
  githubUrl: "https://github.com/lavudyaraja/Evaluation-paper-assignment.git",
  demoUrl: "https://evaluation-paper-assignment.vercel.app/",
  imageUrl: "./images/evalai.png",
  category: "ai",
  featured: true,
  stats: { stars: 0, forks: 0, issues: 0 },
  date: "2026-02",
  status: "in-progress",
  duration: "4 months",
  teamSize: 1,
  achievements: [
    "Built AI-assisted exam evaluation workflow",
    "Implemented split-screen teacher review system",
    "Integrated OCR pipeline for PDF answer sheets",
    "Designed scalable multi-phase AI evaluation architecture"
  ],
  technologies: {
    frontend: ["Next.js 14", "React 18", "TypeScript", "TailwindCSS", "Radix UI"],
    backend: ["Node.js", "API Routes", "Groq SDK"],
    database: ["PostgreSQL (Neon)", "MongoDB"],
    ai: ["Groq LLM", "Tesseract.js", "EasyOCR", "PDF.js"],
    tools: ["Vercel", "ESLint", "Prettier"]
  }
},

 {
  id: '2',
  title: "Machine Learning Framework Setup",
  description: "A comprehensive full-stack machine learning platform with preprocessing pipeline, model training, evaluation, and deployment using Next.js and FastAPI.",
  longDescription: "A production-ready full-stack ML framework that enables dataset upload, automated preprocessing, model training, evaluation, and deployment. Built with Next.js 16 and FastAPI, it provides a complete end-to-end machine learning workflow including missing value handling, feature engineering, hyperparameter tuning, cross-validation, ROC/AUC analysis, and real-time inference APIs.",
  tags: ["Next.js", "TypeScript", "FastAPI", "Scikit-learn", "Machine Learning"],
  githubUrl: "https://github.com/lavudyaraja/Machine-learning-platform.git",
  demoUrl: "https://ml-framework-demo.vercel.app",
  imageUrl: "./images/mlframework.png",
  category: "ai",
  stats: { stars: 120, forks: 18, issues: 4 },
  date: "2026-01",
  status: "completed",
  duration: "4 months",
  teamSize: 1,
  achievements: [
    "Built end-to-end ML pipeline with 7-step preprocessing workflow",
    "Implemented automated model training and hyperparameter tuning",
    "Developed real-time inference API using FastAPI",
    "Created interactive dataset upload and exploration system"
  ],
  technologies: {
    frontend: ["Next.js 16", "TypeScript", "TailwindCSS", "Framer Motion", "Shadcn/ui"],
    backend: ["FastAPI", "Python", "REST API"],
    database: ["Local Storage / Optional PostgreSQL"],
    ai: ["Scikit-learn", "Pandas", "NumPy"],
    tools: ["Docker", "Vercel", "Git", "Joblib"]
  }
},
 {
  id: '8',
  title: "UniBrain - Comprehensive Educational Management System",
  description: "A full-scale educational management and LMS platform with multi-role access including students, teachers, department admins, and super admins built using Next.js and PostgreSQL.",
  longDescription: "UniBrain is a modern full-stack educational management system designed to streamline academic operations for colleges and universities. It provides role-based dashboards for students, teachers, department administrators, college admins, and super admins. Features include learning dashboards, assessment management, real-time communication, analytics reporting, LMS content delivery, and institutional management powered by Next.js, PostgreSQL, and NextAuth.js.",
  tags: ["Next.js", "TypeScript", "PostgreSQL", "NextAuth", "LMS"],
  githubUrl: "https://github.com/lavudyaraja/Education-platform.git",
  demoUrl: "https://education-platform-lilac-five.vercel.app/",
  imageUrl: "./images/unibrain.png",
  category: "web",
  stats: { stars: 210, forks: 35, issues: 9 },
  date: "2026-02",
  status: "completed",
  duration: "5 months",
  teamSize: 1,
  achievements: [
    "Built multi-role educational platform with 5 user hierarchies",
    "Implemented full LMS with assessments, analytics, and messaging",
    "Developed secure authentication using NextAuth.js",
    "Designed scalable academic management architecture"
  ],
  technologies: {
    frontend: ["Next.js 16", "React", "TypeScript", "TailwindCSS", "Radix UI"],
    backend: ["Next.js API Routes", "Node.js"],
    database: ["PostgreSQL", "Drizzle ORM"],
    auth: ["NextAuth.js"],
    tools: ["Supabase", "Recharts", "React Hook Form", "Zod", "ESLint"]
  }
},
  {
  id: '9',
  title: "Maternal Health Risk Predictor",
  description: "A machine learning-powered healthcare web application that predicts maternal pregnancy risk levels using patient vitals and medical history.",
  longDescription: "Maternal Health Risk Predictor is a machine learning-based healthcare application that classifies pregnancy risk into Low, Mid, and High categories using multiple ML algorithms. Built with Streamlit, Scikit-learn, and TensorFlow, the system enables real-time predictions, probability analysis, and clinical recommendations based on patient medical data. The platform supports multiple models including Logistic Regression, SVM, Decision Tree, Random Forest, and MLP neural networks with interactive dashboards and model comparison features.",
  tags: ["Python", "Machine Learning", "Streamlit", "TensorFlow", "Scikit-learn", "Healthcare AI"],
  githubUrl: "https://github.com/lavudyaraja/Maternal_Health_Risk_Predictor_Hackathon.git",
  demoUrl: "https://maternalhealthriskpredictorhackathon-kup8dpffq3nxqfsqfh4o.streamlit.app/",
  imageUrl: "./images/maternalhealth.png",
  category: "ai",
  stats: { stars: 95, forks: 12, issues: 2 },
  date: "2025-12",
  status: "completed",
  duration: "2 months",
  teamSize: 1,
  achievements: [
    "Developed multi-model maternal risk prediction system",
    "Achieved ~97% accuracy using Logistic Regression and SVM",
    "Implemented real-time clinical risk assessment dashboard",
    "Built interactive healthcare UI with Streamlit"
  ],
  technologies: {
    frontend: ["Streamlit"],
    backend: ["Python"],
    ai: ["Scikit-learn", "TensorFlow", "Random Forest", "SVM", "MLP"],
    database: ["Local Dataset"],
    tools: ["Pandas", "NumPy", "Matplotlib", "Seaborn", "Joblib"]
  }
},
  {
  id: '10',
  title: "Community Hub - Data Submission & Validation Platform",
  description: "A full-stack data submission and moderation platform with automated validation workflows, admin dashboards, and secure authentication built using Next.js and PostgreSQL.",
  longDescription: "Community Hub is a scalable full-stack platform designed for managing community-driven data submissions with automated and manual validation workflows. Built with Next.js 16, TypeScript, and PostgreSQL (Neon), it features role-based dashboards, secure authentication, file uploads (images, audio, video, documents), and an admin moderation system. The platform enables structured data collection, approval pipelines, and efficient content governance through modern web architecture.",
  tags: ["Next.js", "TypeScript", "PostgreSQL", "Neon", "Full Stack"],
  githubUrl: "https://github.com/lavudyaraja/community-hub.git",
  demoUrl: "https://community-hub-cyan.vercel.app",
  imageUrl: "./images/communityhub.png",
  category: "web",
  stats: { stars: 0, forks: 0, issues: 0 },
  date: "2026-01",
  status: "completed",
  duration: "2 months",
  teamSize: 1,
  achievements: [
    "Built role-based data submission and validation system",
    "Implemented admin moderation workflows with approval pipeline",
    "Integrated PostgreSQL database using Neon for scalable storage",
    "Developed secure authentication and protected API routes"
  ],
  technologies: {
    frontend: ["Next.js 16", "React", "TypeScript", "TailwindCSS", "Shadcn UI"],
    backend: ["Next.js API Routes", "Node.js"],
    database: ["PostgreSQL (Neon)"],
    auth: ["Custom Auth / Secure Sessions"],
    tools: ["Vercel", "Lucide React", "Turbopack"]
  }
},
 {
  id: '11',
  title: "Lavudya Raja - Next.js Developer Portfolio",
  description: "A modern, high-performance developer portfolio with advanced UI animations, multiple navigation themes, and interactive project showcases built using Next.js 16.",
  longDescription: "A cutting-edge fully responsive developer portfolio showcasing modern web engineering and AI project experience. Built with Next.js 16, TypeScript, and TailwindCSS, the platform features multiple futuristic navigation themes, animated hero sections, interactive skills visualization, 3D project displays, and optimized performance architecture. Designed with advanced UI/UX principles, smooth animations, SEO optimization, and scalable component-based structure for professional branding.",
  tags: ["Next.js", "TypeScript", "TailwindCSS", "Framer Motion", "Portfolio"],
  githubUrl: "https://github.com/lavudyaraja/Rajaram-s-portfolio.git",
  demoUrl: "https://www.lavudyaraja.in/",
  imageUrl: "./images/portfolio.png",
  category: "web",
  stats: { stars: 60, forks: 8, issues: 1 },
  date: "2026-02",
  status: "completed",
  duration: "2 months",
  teamSize: 1,
  achievements: [
    "Designed multi-theme futuristic portfolio with 5 navigation styles",
    "Built interactive project and skills visualization system",
    "Implemented advanced animations using Framer Motion",
    "Optimized performance with Next.js App Router architecture"
  ],
  technologies: {
    frontend: ["Next.js 16", "React", "TypeScript", "TailwindCSS", "Framer Motion"],
    backend: ["Next.js API Routes"],
    database: ["Static Data / Optional APIs"],
    design: ["Lucide React", "Responsive Grid Systems"],
    tools: ["Vercel", "ESLint", "PostCSS"]
  }
}
];

export const SIMPLE_PROJECTS = [
 {
  id: '7',
  title: "EVALAI - AI ASSISTED SEMESTER EXAM EVALUATION SYSTEM",
  description: "A comprehensive AI-powered exam evaluation platform that allows teachers to upload answer PDFs, extract text using OCR, generate AI-based marks with confidence scoring, and review evaluations through an intuitive split-screen workflow.",
  tags: ["Nextjs", "Typescript", "Groq", "OCR", "MongoDB", "PostgreSQL"],
  githubUrl: "https://github.com/your-repo/evalai-exam-system",
  demoUrl: "https://your-evalai-demo.vercel.app/",
  imageUrl: "./images/evalai.png",
  color: "indigo",
  featured: true
},

 {
  id: '8',
  title: "MACHINE LEARNING FRAMEWORK SETUP - FULL STACK ML PIPELINE",
  description: "A full-stack machine learning framework built with Next.js, TypeScript, and FastAPI providing complete ML workflow including preprocessing, model training, evaluation, and real-time deployment.",
  tags: ["Nextjs", "Typescript", "FastAPI", "Scikit-learn", "Pandas", "ML"],
  githubUrl: "https://github.com/your-repo/ml-framework",
  demoUrl: "https://your-ml-framework.vercel.app/",
  imageUrl: "./images/mlframework.png",
  color: "green",
  featured: true
},

  {
    id: '9',
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates, team collaboration features, and advanced project tracking capabilities.",
    tags: ["Vue.js", "Firebase", "Socket.io", "Vuetify"],
    githubUrl: "https://github.com/your/taskmanager",
    demoUrl: "https://taskmanager-demo.com",
    imageUrl: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop&crop=center",
    color: "orange"
  },
  {
    id: '10',
    title: "Weather Dashboard",
    description: "An interactive weather dashboard providing real-time weather data, forecasts, and climate analytics with beautiful data visualizations.",
    tags: ["React", "D3.js", "OpenWeather API", "Chart.js"],
    githubUrl: "https://github.com/your/weather-dashboard",
    demoUrl: "https://weather-dashboard.com",
    imageUrl: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&h=400&fit=crop&crop=center",
    color: "cyan"
  },
  {
    id: '11',
    title: "Social Media Analytics",
    description: "A comprehensive social media analytics platform that tracks engagement, analyzes trends, and provides actionable insights for content creators.",
    tags: ["Angular", "Python", "FastAPI", "PostgreSQL"],
    githubUrl: "https://github.com/your/social-analytics",
    demoUrl: "https://social-analytics-demo.com",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&crop=center",
    color: "purple"
  }
];
