import React from 'react';
import { StravexLogo } from './StravexLogo';
import { DEVELOPER_INFO } from '../data/portfolioData';
import { ArrowUp, Github, Linkedin, MessageSquare, Mail, Terminal, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#05070a] border-t border-slate-800/80 pt-16 pb-12 overflow-hidden text-slate-400">
      {/* Background Subtle Neon Line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00f0ff]/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800/60 items-start">
          {/* Brand & Developer Identity */}
          <div className="md:col-span-5 space-y-4">
            <button
              onClick={() => onNavigate('hero')}
              className="text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00f0ff] rounded-lg"
              aria-label="STRAVEX Home"
            >
              <StravexLogo size="md" />
            </button>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Engineered by <strong className="text-slate-200">{DEVELOPER_INFO.fullName}</strong>. Crafting futuristic, responsive, and high-performance digital experiences beyond limits.
            </p>
            <div className="text-xs font-mono text-[#00f0ff] flex items-center gap-2">
              <span>{DEVELOPER_INFO.role}</span>
              <span>·</span>
              <span>Personal Brand STRAVEX</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-['Orbitron',sans-serif] text-xs font-bold text-slate-200 uppercase tracking-widest">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              {['Home', 'About', 'Skills', 'Projects', 'Services', 'Contact'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => onNavigate(item.toLowerCase() === 'home' ? 'hero' : item.toLowerCase())}
                    className="hover:text-[#00f0ff] transition-colors cursor-pointer"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Channels & Back to Top */}
          <div className="md:col-span-4 flex flex-col justify-between h-full space-y-4">
            <div>
              <h4 className="font-['Orbitron',sans-serif] text-xs font-bold text-slate-200 uppercase tracking-widest mb-3">
                Social Hub
              </h4>
              <div className="flex items-center gap-3">
                <a
                  href={DEVELOPER_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-lg bg-slate-900 hover:bg-[#00f0ff]/10 text-slate-400 hover:text-[#00f0ff] border border-slate-800 hover:border-[#00f0ff]/30 transition-all"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={DEVELOPER_INFO.telegram}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-lg bg-slate-900 hover:bg-[#00f0ff]/10 text-slate-400 hover:text-[#00f0ff] border border-slate-800 hover:border-[#00f0ff]/30 transition-all"
                  aria-label="Telegram Channel"
                >
                  <MessageSquare className="w-4 h-4" />
                </a>
                <a
                  href={`mailto:${DEVELOPER_INFO.email}`}
                  className="p-2.5 rounded-lg bg-slate-900 hover:bg-[#00f0ff]/10 text-slate-400 hover:text-[#00f0ff] border border-slate-800 hover:border-[#00f0ff]/30 transition-all"
                  aria-label="Email Karimov Shodiyor"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Back to Top Action */}
            <div className="pt-2">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-xs font-mono text-slate-300 hover:text-[#00f0ff] border border-slate-800 hover:border-[#00f0ff]/30 transition-all cursor-pointer group"
              >
                <span>Back to Top</span>
                <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Brand Integrity */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div>
            © {currentYear} <span className="text-slate-300 font-bold">STRAVEX</span>. All Rights Reserved. Engineered by{' '}
            <strong className="text-slate-200">Karimov Shodiyor</strong>.
          </div>
          <div className="flex items-center gap-1.5 text-slate-400">
            <span>Built with React 19 · Three.js · Vite · Tailwind</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
