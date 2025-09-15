import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Contact from './pages/Contact';
import Projects from './pages/Projects'
import BlogSection from './components/home/BlogSection';
// import SkillsPage from './pages/Skills'
import NotFound from './pages/NotFound';
import AboutPage from '@/components/home/About';
import CombinedProjects from "@/components/home/combined-projects";
import CombinedSkills from "@/components/home/combined-skills";
import  ContactCTA  from "@/components/home/contact-cta";
import CertificationSection from './components/home/CertificationSection';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* <Route path="/components/home/about" element={<AboutPage />} /> */}
          <Route path="/projects" element={<Projects />} />
          {/* <Route path="/contact" element={<Contact />} /> */}
          {/* <Route path="/skills" element={<SkillsPage />} /> */}
          {/* <Route path="/blog" element={<BlogSection />} /> */}
          {/* <Route path="/combined-projects" element={<CombinedProjects />} /> */}
          {/* <Route path="/combined-skills" element={<CombinedSkills />} /> */}
          {/* <Route path="/contact-cta" element={<ContactCTA />} /> */}
          <Route path="*" element={<NotFound />} />
          {/* <Route path="/certificate" element={<CertificationSection />} /> */}
          {/* <Route path="/certifications" element={<CertificationSection />} /> */}
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;