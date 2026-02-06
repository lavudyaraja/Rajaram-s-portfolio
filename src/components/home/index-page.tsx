'use client'

import { useState } from 'react';
import Header from "@/components/layout/HiddenNavbar";
import Hero from '@/components/home/hero/Hero'
import AboutPreview from '@/components/home/about/AboutPreview'
import CombinedSkills from '@/components/home/skills/CombinedSkills'
import SmallProjectsView from '@/components/home/projects/SmallProjectsView'
import BlogSection from '@/components/home/blog/BlogSection'
import CertificationSectionPage from '@/components/home/certifications/CertificationSection'
import Education from '@/components/home/education/Education'
import ContactCTA from '@/components/home/contact/ContactCTA'
import Testimonials from '@/components/home/testimonials/Testimonials'
import Footer from '@/components/layout/footer';
import Chatbot from '@/components/ui/Chatbot';

export default function HomePage() {
  const [showFullAbout, setShowFullAbout] = useState(false);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        <Hero />
        <div id="about">
            <AboutPreview onExpand={() => setShowFullAbout(true)} />
        </div>

        <div id="education">
          <Education />
        </div>

        {!showFullAbout && (
          <>
            <div id="skills">
              <CombinedSkills />
            </div>
            <div id="projects">
              <SmallProjectsView />
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
          </>
        )}
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}
