import Header from "@/components/layout/FuturisticNavbar";
import Hero from "@/components/home/hero";
import About from "@/components/home/About";
import CombinedProjects from "@/components/home/combined-projects";
import SkillsPreview from "@/components/home/combined-skills";
import Testimonials from "@/components/home/testimonials";
import ContactCTA from "@/components/home/contact-cta";
import  Footer  from "@/components/layout/footer";
import CertificationSectionPage from "@/components/home/CertificationSection";
import BlogSection from "@/components/home/BlogSection";

export default function HomePage() {// get current theme

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <div id="about">
          <About />
        </div>
       
        <div id="skills">
          <SkillsPreview />
        </div>
        <div id="projects">
          <CombinedProjects />
        </div>
        <div id="blog">
         <BlogSection />
        </div>
        <div id="certificates">
          <CertificationSectionPage />
        </div>
        {/* <Testimonials /> */}
        <div id="contact">
          <ContactCTA />
        </div>
      </main>
      <Footer />
    </div>
  );
}