# 🚀 Lavudya Raja - Next.js Developer Portfolio

A cutting-edge, fully responsive portfolio website showcasing modern web development capabilities with stunning animations, interactive components, and exceptional user experience. Built with Next.js 16, TypeScript, and TailwindCSS.

## ✨ Key Features

### 🎨 Advanced UI/UX Design
- **Multiple Navigation Themes** - Choose from Futuristic, Quantum, Cyberpunk, Minimalist, and Hidden navbar designs
- **Hidden Navbar with Welcome Message** - Elegant horizontal scrolling animation with multi-color gradients
- **Interactive Skills Section** with tabbed categories and real technology icons
- **Animated Hero Section** with floating elements and dynamic backgrounds
- **Responsive Timeline** for education and experience
- **Modern Footer** with inspirational quotes and social links
- **Dark Theme** optimized for all viewing conditions

### 🚀 Performance & Architecture
- **Next.js 16** with App Router for optimal performance
- **TypeScript** for type-safe development
- **TailwindCSS** for utility-first styling
- **Component-Based Architecture** for maintainability
- **Responsive Design** optimized for all devices
- **SEO Optimized** with proper meta tags and structure
- **Scroll Animations** for engaging user experience

## 🛠️ Technology Stack

### Frontend Framework
- **[Next.js 16](https://nextjs.org/)** - React framework with App Router
- **[React 18](https://reactjs.org/)** - Component-based UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Static type checking and enhanced developer experience

### Styling & Design
- **[TailwindCSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Lucide React](https://lucide.dev/)** - Beautiful, consistent icon library
- **[Framer Motion](https://www.framer.com/motion/)** - Custom keyframes and transitions
- **[Responsive Grid Systems](https://tailwindcss.com/)** - Mobile-first design approach

### Development Tools
- **[ESLint](https://eslint.org/)** - Code quality and consistency
- **[PostCSS](https://postcss.org/)** - CSS processing and optimization
- **[Vercel](https://vercel.com/)** - Deployment and hosting platform

## 📁 Project Structure

```
portfolio/
├── public/                    # Static assets
│   ├── images/               # Portfolio images and assets
│   ├── certificate/          # Certification images
│   └── *.ico, *.png         # Icons and favicons
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── about/           # About page
│   │   ├── admin/           # Admin section
│   │   ├── api/             # API routes
│   │   ├── globals.css      # Global styles
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx        # Home page
│   ├── components/          # Reusable components
│   │   ├── home/           # Homepage sections
│   │   │   ├── about/      # About section components
│   │   │   ├── education/  # Education timeline
│   │   │   ├── hero/       # Hero section
│   │   │   ├── skills/     # Skills showcase
│   │   │   └── projects/   # Project displays
│   │   ├── layout/         # Layout components
│   │   │   ├── footer.tsx  # Footer component
│   │   │   ├── FuturisticNavbar.tsx  # Original futuristic navbar
│   │   │   ├── QuantumNavbar.tsx     # Quantum-themed navbar
│   │   │   ├── CyberpunkNavbar.tsx    # Cyberpunk neon grid navbar
│   │   │   ├── MinimalistNavbar.tsx   # Clean minimalist navbar
│   │   │   └── HiddenNavbar.tsx      # Hidden navbar with welcome message
│   │   ├── theme/          # Theme-related components
│   │   └── ui/             # Reusable UI components
│   ├── constants/           # Project and data constants
│   ├── data/               # Static data files
│   └── index.css          # Additional global styles
├── .gitignore             # Git ignore rules
├── components.json        # Component configuration
├── eslint.config.js       # ESLint configuration
├── next.config.js        # Next.js configuration
├── package.json          # Dependencies and scripts
├── postcss.config.js     # PostCSS configuration
├── tailwind.config.ts    # TailwindCSS configuration
├── tsconfig.json         # TypeScript configuration
└── vercel.json          # Vercel deployment config
```

## 🎨 Component Showcase

### 🧭 Navigation Components
- **FuturisticNavbar** - Original futuristic design with animated particles
- **HiddenNavbar** - Hidden navbar with welcome message and scroll behavior

### 💫 Hero Section
- **ModernHero** - Dynamic background with floating elements and interactive terminal
- Matrix rain effects and neural network visualizations
- Quantum orbs and floating hexagons with animations

### 🎯 Skills & Projects
- **CombinedSkills** - Tabbed interface with technology icons and search
- **SmallProjectsView** - Carousel display with auto-play functionality
- **CombinedProjects** - Grid/carousel toggle with 3D effects

### 📚 Education & About
- **Education** - Timeline with alternating layouts and achievement displays
- **AboutPreview** - Interactive hexagon grid with floating tech icons

### 🦶 Footer
- **Footer** - Multi-column layout with rotating inspirational quotes
- Social media links with hover effects and quick navigation

## 🚀 Getting Started

### Prerequisites
- **[Node.js 18+](https://nodejs.org/)** - Latest LTS version recommended
- **[npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)** - Package manager
- **[Git](https://git-scm.com/)** - Version control

### Installation & Setup

1. **Clone the repository**
```bash
git clone https://github.com/lavudyaraja/Portfolio.git
cd Portfolio
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Start development server**
```bash
npm run dev
# or
yarn dev
```

4. **Open your browser**
Navigate to [`http://localhost:3000`](http://localhost:3000)

### Build for Production

```bash
npm run build
# or
yarn build
```

### Preview Production Build

```bash
npm run start
# or
yarn start
```

## 🎯 Customization

### Updating Personal Information
1. **Profile Details** - Modify hero section in `src/components/home/hero.tsx`
2. **Social Media Links** - Update links in the same file
3. **Contact Information** - Update email and contact details

### Adding Projects
1. **Edit Project Array** - Update `PROJECTS` array in `src/components/home/combined-projects.tsx`
2. **Add Project Details** - Include title, description, tags, and links

### Modifying Skills
1. **Update Skill Categories** - Modify `skillCategories` array in `src/components/home/combined-skills.tsx`
2. **Add Technology Icons** - Update the `iconMap` in the same file

### Changing Navigation Theme
The project includes **5 different navbar designs** that can be easily switched:

1. **FuturisticNavbar** - Original design with particle effects
5. **HiddenNavbar** - Hidden navbar with welcome message

**To switch themes:** Update the import in `src/components/home/index-page.tsx`:
```typescript
import Header from "@/components/layout/[ThemeName]Navbar";
```

## 📱 Responsive Design

The portfolio is fully responsive and optimized for:
- **Mobile devices** (320px and above)
- **Tablets** (768px and above)
- **Desktops** (1024px and above)
- **Large screens** (1440px and above)

## 🎨 Animations & Effects

- **Smooth page transitions** - CSS transitions between sections
- **Hover animations** on interactive elements
- **Scroll-triggered animations** for engaging user experience
- **Floating background elements** for depth and movement
- **3D project carousel** (desktop) with smooth sliding
- **Theme transition animations** with color shifts

## 🔧 Performance Optimizations

- **Code splitting** for faster initial loads
- **Lazy loading** for images and components
- **Optimized bundle size** with Next.js optimizations
- **Efficient re-rendering** with React.memo
- **Proper image optimization** and compression

## 📝 License

This project is licensed under the [MIT License](LICENSE) - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. **Fork the repository**
2. **Create your feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

## 📧 Contact

For any inquiries, please reach out via:
- **Email:** [codeml862@gmail.com](mailto:codeml862@gmail.com)
- **LinkedIn:** [Lavudya Raja](https://www.linkedin.com/in/lavudyaraja5228/)
- **GitHub:** [lavudyaraja](https://github.com/lavudyaraja)
- **Twitter:** [@LavudyaRaj22988](https://x.com/Lavudyaraja22988)

---

⭐ If you find this portfolio useful, please consider giving it a star on [GitHub](https://github.com/lavudyaraja/Portfolio)!