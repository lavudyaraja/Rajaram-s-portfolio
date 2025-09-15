# Developer Portfolio

A modern, responsive developer portfolio website built with React, TypeScript, and TailwindCSS. This portfolio showcases skills, projects, and experience in an elegant, interactive interface.

## 🚀 Features

- **Responsive Design**: Works seamlessly on all devices from mobile to desktop
- **Modern UI/UX**: Sleek animations, gradients, and interactive elements
- **Dark/Light Theme**: Toggle between dark and light modes
- **Skills Showcase**: Comprehensive display of technical skills with real technology icons
- **Project Gallery**: Interactive project carousel with detailed descriptions
- **Animated Components**: Smooth transitions and hover effects throughout
- **Performance Optimized**: Fast loading times and efficient code splitting

## 🛠️ Technologies Used

### Frontend
- **React 18** - Component-based UI library
- **TypeScript** - Static type checking for JavaScript
- **TailwindCSS** - Utility-first CSS framework
- **Framer Motion** - Animation library for React
- **Lucide React** - Beautiful SVG icons

### Tools & Libraries
- **Vite** - Fast build tool and development server
- **React Router** - Declarative routing for React
- **React Query** - Data fetching and state management
- **Zod** - TypeScript-first schema declaration and validation
- **ESLint** - Code linting utility
- **Prettier** - Code formatting tool

### UI Components
- **Shadcn UI** - Reusable component library
- **Radix UI** - Unstyled, accessible UI primitives
- **Recharts** - Charting library built on D3

## 📁 Project Structure

```
src/
├── components/
│   ├── home/           # Homepage sections (hero, about, skills, projects, etc.)
│   ├── layout/         # Layout components (navbar, footer, dock)
│   ├── theme/          # Theme-related components
│   ├── ui/             # Reusable UI components from Shadcn
│   └── ThemeProvider.tsx # Theme context provider
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── pages/              # Page components for routing
├── utils/              # Helper functions
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

## 🎨 Key Sections

### Hero Section
- Animated background with floating elements
- Interactive profile card with hover effects
- Rotating role descriptions (Full-Stack Developer, ML Engineer, etc.)
- Social media links and call-to-action buttons

### About Section
- Personal introduction and professional background
- Experience timeline
- Key achievements and interests

### Skills Section
- Categorized technical skills (Frontend, Backend, Database, etc.)
- Real technology icons from Devicon
- Color-coded categories for visual distinction

### Projects Section
- Interactive 3D carousel for featured projects
- Detailed project descriptions with tags
- Links to GitHub repositories and live demos

### Contact Section
- Contact form with validation
- Social media links
- Professional contact information

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/developer-portfolio.git
cd developer-portfolio
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
# or
yarn build
```

### Previewing Production Build

```bash
npm run preview
# or
yarn preview
```

## 🎯 Customization

### Updating Personal Information
1. Modify the hero section in `src/components/home/hero.tsx`
2. Update social media links in the same file
3. Customize the profile image in `public/Rajaimage.jpg`

### Adding Projects
1. Edit the `PROJECTS` array in `src/components/home/combined-projects.tsx`
2. Add project details including title, description, tags, and links

### Modifying Skills
1. Update the `skillCategories` array in `src/components/home/combined-skills.tsx`
2. Add new technology icons to the `iconMap` in the same file

### Changing Theme
1. Modify theme configurations in `src/components/ThemeProvider.tsx`
2. Update color schemes in `tailwind.config.ts`

## 📱 Responsive Design

The portfolio is fully responsive and optimized for:
- Mobile devices (320px and above)
- Tablets (768px and above)
- Desktops (1024px and above)
- Large screens (1440px and above)

## 🎨 Animations & Effects

- Smooth page transitions
- Hover animations on interactive elements
- Scroll-triggered animations
- Floating background elements
- 3D project carousel (desktop)
- Theme transition animations

## 🔧 Performance Optimizations

- Code splitting for faster initial loads
- Lazy loading for images and components
- Optimized bundle size with Vite
- Efficient re-rendering with React.memo
- Proper image optimization

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Contact

For any inquiries, please reach out via:
- Email: codeml862@gmail.com
- LinkedIn: [Lavudya Raja](https://www.linkedin.com/in/lavudyaraja5228/)
- GitHub: [lavudyaraja](https://github.com/lavudyaraja)
- Twitter: [@LavudyaRaj22988](https://x.com/Lavudyaraja22988)

---

⭐ If you find this portfolio useful, please consider giving it a star on GitHub!