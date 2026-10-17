import React, { useState, useEffect } from 'react';
import { StravexLogo } from './StravexLogo';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

const NAV_ITEMS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'services', label: 'Services' },
  { id: 'contact', label: 'Contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#07090e]/85 backdrop-blur-md border-b border-[#00f0ff]/15 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.6)]'
          : 'bg-transparent border-b border-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => handleLinkClick('hero')}
          className="text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00f0ff] rounded-lg"
          aria-label="STRAVEX Home"
        >
          <StravexLogo size="sm" />
        </button>

        {/* Zone 2: Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-1.5 lg:gap-3 p-1 rounded-full bg-[#0d121f]/60 border border-slate-800/80 backdrop-blur-md">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleLinkClick(item.id)}
                className={`relative px-3.5 py-1.5 text-xs font-medium tracking-wide transition-all duration-200 rounded-full whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'text-[#00f0ff] bg-[#00f0ff]/10 shadow-[0_0_12px_rgba(0,240,255,0.2)]'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-0.5 bg-[#00f0ff] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action & Mobile Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => handleLinkClick('contact')}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#07090e] bg-gradient-to-r from-[#00f0ff] to-[#38bdf8] hover:from-[#38bdf8] hover:to-[#00f0ff] rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] cursor-pointer"
          >
            <span>Let's Build</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-[#00f0ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00f0ff]"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#00f0ff]" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-t border-b border-[#00f0ff]/20 px-6 py-6 mt-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-2">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleLinkClick(item.id)}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg text-left text-sm font-medium tracking-wide transition-colors ${
                    isActive
                      ? 'text-[#00f0ff] bg-[#00f0ff]/10 border border-[#00f0ff]/20'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff]" />}
                </button>
              );
            })}

            <div className="pt-4 border-t border-slate-800 mt-2">
              <button
                onClick={() => handleLinkClick('contact')}
                className="w-full flex items-center justify-center gap-2 py-3 text-xs font-semibold uppercase tracking-wider text-[#07090e] bg-[#00f0ff] rounded-lg"
              >
                <span>Contact Karimov Shodiyor</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
