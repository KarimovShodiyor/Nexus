import React from 'react';
import { ThreeHeroCanvas } from './ThreeHeroCanvas';
import { DEVELOPER_INFO, STATS } from '../data/portfolioData';
import { ArrowRight, Terminal, Sparkles, FolderGit2, Send } from 'lucide-react';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-between pt-24 pb-12 overflow-hidden cyber-grid">
      {/* Background Ambience & Orbital Halo */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#00f0ff]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 -right-32 w-96 h-96 bg-[#8b5cf6]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Hero Content Grid: Two-Column Split (Left: Typographic Impact, Right: 3D Centerpiece) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Brand & Developer Identity */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            {/* Status Indicator (Static, No Pulsating Dot per Three.js/Frontend Design Directive) */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0d121f] border border-[#00f0ff]/30 text-xs text-slate-300 font-mono mb-6 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#00f0ff] shrink-0" />
              <span className="tracking-wider uppercase text-[#00f0ff] font-semibold">{DEVELOPER_INFO.status}</span>
              <span className="text-slate-500">·</span>
              <span className="text-slate-400">React Specialist</span>
            </div>

            {/* Brand Title & Developer Name */}
            <h1 className="font-['Orbitron',sans-serif] text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-none mb-3">
              <span className="metallic-text block">STRAVEX</span>
              <span className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-widest text-[#00f0ff] block mt-2">
                {DEVELOPER_INFO.fullName}
              </span>
            </h1>

            {/* Sub-tagline */}
            <p className="text-xl sm:text-2xl font-medium text-slate-200 mt-2 mb-4 tracking-tight">
              “{DEVELOPER_INFO.tagline}”
            </p>

            {/* Mission / Description */}
            <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-xl mb-8">
              I create modern, responsive, and interactive digital experiences using React and modern frontend technologies.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <button
                onClick={() => onNavigate('projects')}
                className="group relative inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-sm text-[#07090e] bg-gradient-to-r from-[#00f0ff] via-[#38bdf8] to-[#0ea5e9] hover:from-[#38bdf8] hover:to-[#00f0ff] shadow-[0_0_25px_rgba(0,240,255,0.35)] hover:shadow-[0_0_35px_rgba(0,240,255,0.6)] transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
              >
                <FolderGit2 className="w-4 h-4 text-[#07090e]" />
                <span>Explore My Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-slate-200 bg-[#0d121f]/80 hover:bg-[#121829] border border-slate-700 hover:border-[#00f0ff]/50 transition-all duration-200 cursor-pointer backdrop-blur-md"
              >
                <Send className="w-4 h-4 text-[#00f0ff]" />
                <span>Contact Me</span>
              </button>
            </div>

            {/* Quiet Quick Spec Strip */}
            <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5 text-slate-300">
                <Terminal className="w-3.5 h-3.5 text-[#00f0ff]" />
                Frontend Architect
              </span>
              <span>·</span>
              <span>React 19 / Vite</span>
              <span>·</span>
              <span>Three.js Spatial Graphics</span>
              <span>·</span>
              <span>Tailwind CSS</span>
            </div>
          </div>

          {/* Right Column: 3D Centerpiece Canvas */}
          <div className="lg:col-span-6 w-full h-[450px] sm:h-[520px] lg:h-[600px] relative rounded-2xl overflow-hidden glass-panel border border-[#00f0ff]/20 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            {/* Corner High-Tech Reticle Accents */}
            <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-[#00f0ff] z-20 pointer-events-none" />
            <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-[#00f0ff] z-20 pointer-events-none" />
            <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-[#00f0ff] z-20 pointer-events-none" />
            <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-[#00f0ff] z-20 pointer-events-none" />

            <div className="absolute top-3 left-8 z-20 pointer-events-none">
              <span className="text-[10px] font-mono tracking-widest text-[#00f0ff]/80 uppercase flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" />
                3D Holographic Core · Drag to Rotate
              </span>
            </div>

            <ThreeHeroCanvas />
          </div>
        </div>
      </div>

      {/* KPI Proof Strip Below Hero Split (Adheres to Portfolio design skill 2.B) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-10 z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-xl glass-panel border border-slate-800">
          {STATS.map((stat) => (
            <div key={stat.id} className="flex flex-col px-3 py-2 border-r last:border-r-0 border-slate-800/80">
              <div className="flex items-baseline gap-0.5">
                <span className="font-['Orbitron',sans-serif] text-2xl sm:text-3xl font-bold metallic-text tabular-nums">
                  {stat.value}
                </span>
                <span className="font-['Orbitron',sans-serif] text-xl font-bold text-[#00f0ff]">
                  {stat.suffix}
                </span>
              </div>
              <span className="text-xs font-semibold text-slate-200 mt-0.5">{stat.label}</span>
              <span className="text-[11px] text-slate-400 font-mono">{stat.sublabel}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
