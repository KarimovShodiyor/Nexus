import React, { useState } from 'react';
import { SKILLS } from '../data/portfolioData';
import { Skill } from '../types';
import { Sparkles, Terminal, Sliders, CheckCircle, Code2, Globe, Cpu } from 'lucide-react';

const CATEGORIES = ['All Skills', 'Core Web', 'Frameworks & Tooling', 'Architecture'] as const;

// Professional recognizable SVG icons for each skill
const SkillIcon: React.FC<{ type: Skill['iconType']; className?: string }> = ({ type, className = 'w-6 h-6' }) => {
  switch (type) {
    case 'react':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="50" cy="50" rx="42" ry="16" stroke="#00f0ff" strokeWidth="6" transform="rotate(0 50 50)" />
          <ellipse cx="50" cy="50" rx="42" ry="16" stroke="#00f0ff" strokeWidth="6" transform="rotate(60 50 50)" />
          <ellipse cx="50" cy="50" rx="42" ry="16" stroke="#00f0ff" strokeWidth="6" transform="rotate(120 50 50)" />
          <circle cx="50" cy="50" r="8" fill="#00f0ff" />
        </svg>
      );
    case 'js':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" rx="16" fill="#f7df1e" fillOpacity="0.15" stroke="#f7df1e" strokeWidth="4" />
          <path d="M30 65 L40 65 Q45 65 45 55 L45 35" stroke="#f7df1e" strokeWidth="7" strokeLinecap="round" />
          <path d="M55 42 Q62 35 70 42 Q78 50 68 56 Q58 62 72 65" stroke="#f7df1e" strokeWidth="7" strokeLinecap="round" fill="none" />
        </svg>
      );
    case 'tailwind':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M25 45 C32 30 45 30 52 42 C56 50 62 55 72 55 C82 55 88 45 92 38 C88 52 75 62 65 62 C55 62 48 52 42 45 C36 38 30 38 25 45 Z" fill="#38bdf8" />
          <path d="M10 65 C17 50 30 50 37 62 C41 70 47 75 57 75 C67 75 73 65 77 58 C73 72 60 82 50 82 C40 82 33 72 27 65 C21 58 15 58 10 65 Z" fill="#0ea5e9" />
        </svg>
      );
    case 'vite':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M85 18 L50 92 L15 18 L50 30 Z" fill="#8b5cf6" fillOpacity="0.3" stroke="#a855f7" strokeWidth="4" />
          <path d="M48 20 L30 52 L50 52 L42 82 L72 45 L52 45 Z" fill="#00f0ff" stroke="#38bdf8" strokeWidth="2" />
        </svg>
      );
    case 'html':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <polygon points="15,10 85,10 78,82 50,92 22,82" fill="#e44d26" fillOpacity="0.2" stroke="#e44d26" strokeWidth="4" />
          <path d="M30 30 L70 30 L66 58 L50 64 L34 58 L32 40 L45 40" stroke="#f97316" strokeWidth="6" strokeLinecap="round" />
        </svg>
      );
    case 'css':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <polygon points="15,10 85,10 78,82 50,92 22,82" fill="#264de4" fillOpacity="0.2" stroke="#264de4" strokeWidth="4" />
          <path d="M70 30 L30 30 L34 58 L50 64 L66 58 L68 44 L40 44" stroke="#38bdf8" strokeWidth="6" strokeLinecap="round" />
        </svg>
      );
    case 'git':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="18" y="18" width="64" height="64" rx="14" transform="rotate(45 50 50)" fill="#f05032" fillOpacity="0.2" stroke="#f05032" strokeWidth="4" />
          <circle cx="38" cy="62" r="7" fill="#f05032" />
          <circle cx="62" cy="38" r="7" fill="#f05032" />
          <circle cx="62" cy="62" r="7" fill="#f05032" />
          <line x1="38" y1="62" x2="62" y2="38" stroke="#f05032" strokeWidth="4" />
          <line x1="62" y1="38" x2="62" y2="62" stroke="#f05032" strokeWidth="4" />
        </svg>
      );
    case 'github':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 15 C30 15 15 30 15 50 C15 66 25 79 39 84 C41 84 41 83 41 82 L41 75 C31 77 29 72 29 72 C27 68 25 67 25 67 C22 65 25 65 25 65 C28 65 30 68 30 68 C33 73 38 72 40 71 C40 69 41 67 42 66 C34 65 26 62 26 48 C26 44 27 41 30 38 C29 37 28 33 30 29 C30 29 33 28 40 33 C43 32 47 32 50 32 C53 32 57 32 60 33 C67 28 70 29 70 29 C72 33 71 37 70 38 C73 41 74 44 74 48 C74 62 65 65 57 66 C59 67 60 70 60 75 L60 82 C60 83 61 84 63 84 C76 79 85 66 85 50 C85 30 70 15 50 15 Z" fill="#f8fafc" />
        </svg>
      );
    case 'responsive':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="12" y="20" width="56" height="42" rx="4" stroke="#00f0ff" strokeWidth="4" />
          <line x1="30" y1="62" x2="50" y2="62" stroke="#00f0ff" strokeWidth="4" />
          <rect x="58" y="38" width="30" height="48" rx="4" fill="#07090e" stroke="#38bdf8" strokeWidth="4" />
          <circle cx="73" cy="78" r="2.5" fill="#38bdf8" />
        </svg>
      );
    case 'api':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="30" cy="50" r="12" stroke="#00f0ff" strokeWidth="4" />
          <circle cx="70" cy="30" r="10" stroke="#a855f7" strokeWidth="4" />
          <circle cx="70" cy="70" r="10" stroke="#38bdf8" strokeWidth="4" />
          <line x1="42" y1="46" x2="60" y2="34" stroke="#00f0ff" strokeWidth="3" strokeDasharray="3 3" />
          <line x1="42" y1="54" x2="60" y2="66" stroke="#00f0ff" strokeWidth="3" strokeDasharray="3 3" />
        </svg>
      );
    default:
      return <Code2 className={className} />;
  }
};

export const Skills: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<(typeof CATEGORIES)[number]>('All Skills');
  const [skillLevels, setSkillLevels] = useState<{ [id: string]: number }>(() =>
    SKILLS.reduce((acc, s) => ({ ...acc, [s.id]: s.level }), {})
  );
  const [hoveredSkillId, setHoveredSkillId] = useState<string | null>(null);

  const filteredSkills = SKILLS.filter(
    (skill) => activeFilter === 'All Skills' || skill.category === activeFilter
  );

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-[#0a0d14] cyber-grid-dense">
      {/* Background Glow */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-[#00f0ff]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#00f0ff] uppercase tracking-widest mb-2">
              <span>Technical Matrix</span>
              <span aria-hidden="true">·</span>
              <span>10 Core Proficiencies</span>
            </div>
            <h2 className="font-['Orbitron',sans-serif] text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight metallic-text">
              SKILLS & TECHNOLOGIES
            </h2>
            <p className="text-slate-400 mt-2 text-base max-w-xl">
              Engineered with modern standards: React 19, modular styling, performance tooling, and API orchestration.
            </p>
          </div>

          {/* Interactive Category Filter Tabs (Zero-Pill Discipline: Segmented Controls) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl bg-[#0d121f] border border-slate-800">
            {CATEGORIES.map((category) => {
              const isSelected = activeFilter === category;
              return (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? 'bg-[#00f0ff]/20 text-[#00f0ff] border border-[#00f0ff]/40 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3D Glass Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {filteredSkills.map((skill) => {
            const currentLevel = skillLevels[skill.id] || skill.level;
            const isHovered = hoveredSkillId === skill.id;

            return (
              <div
                key={skill.id}
                onMouseEnter={() => setHoveredSkillId(skill.id)}
                onMouseLeave={() => setHoveredSkillId(null)}
                className={`relative group rounded-xl p-5 glass-panel transition-all duration-300 transform hover:-translate-y-1 ${
                  isHovered ? 'border-[#00f0ff]/50 shadow-[0_10px_30px_rgba(0,240,255,0.15)]' : 'border-slate-800'
                }`}
              >
                {/* Header: Icon + Experience badge */}
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-700/60 group-hover:border-[#00f0ff]/40 transition-colors">
                    <SkillIcon type={skill.iconType} className="w-7 h-7" />
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">
                    {skill.experienceYears}
                  </span>
                </div>

                {/* Skill Name & Category */}
                <h3 className="font-['Orbitron',sans-serif] text-base font-bold text-white tracking-wide group-hover:text-[#00f0ff] transition-colors">
                  {skill.name}
                </h3>
                <span className="text-[11px] text-slate-400 font-mono block mb-3">
                  {skill.category}
                </span>

                {/* Description */}
                <p className="text-xs text-slate-400 leading-relaxed min-h-[48px] mb-4">
                  {skill.description}
                </p>

                {/* Animated Progress Indicator */}
                <div className="mt-auto pt-2 border-t border-slate-800/70">
                  <div className="flex items-center justify-between text-xs mb-1.5 font-mono">
                    <span className="text-slate-400">Proficiency</span>
                    <span className="text-[#00f0ff] font-semibold tabular-nums">
                      {currentLevel}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className="h-full bg-gradient-to-r from-[#00f0ff] to-[#38bdf8] transition-all duration-500 rounded-full"
                      style={{ width: `${currentLevel}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
