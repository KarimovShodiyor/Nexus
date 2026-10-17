import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Services } from './components/Services';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { Loader } from './components/Loader';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedService, setSelectedService] = useState<string>('');

  // Smooth scroll handler
  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectService = (serviceTitle: string) => {
    setSelectedService(`Inquiry: ${serviceTitle}`);
    handleNavigate('contact');
  };

  // Active section observer
  useEffect(() => {
    const sections = ['hero', 'about', 'skills', 'projects', 'services', 'contact'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#07090e] text-[#f1f5f9] selection:bg-[#00f0ff]/20 selection:text-[#00f0ff]">
      {/* Cinematic Loader */}
      {isLoading && <Loader onFinish={() => setIsLoading(false)} />}

      {/* Futuristic Trailing Cursor */}
      <CustomCursor />

      {/* Main Navigation */}
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />

      {/* Main Content Sections */}
      <main className="relative z-10 flex flex-col">
        <Hero onNavigate={handleNavigate} />
        <About />
        <Skills />
        <Projects />
        <Services onSelectService={handleSelectService} />
        <Contact initialSubject={selectedService} />
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
