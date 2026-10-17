import React from 'react';
import { Project } from '../types';
import { X, ExternalLink, Github, Sparkles, CheckCircle2, Layers, Cpu, Activity } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#07090e]/85 backdrop-blur-md"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-panel border border-[#00f0ff]/30 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.85)] z-10 flex flex-col text-slate-200">
        {/* Sticky Modal Header Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#0d121f]/95 border-b border-slate-800 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="font-['Orbitron',sans-serif] text-xs font-bold text-[#00f0ff] uppercase tracking-widest">
              STRAVEX // CASE STUDY
            </span>
            <span className="text-slate-500">·</span>
            <span className="text-xs text-slate-400 font-mono">{project.category}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00f0ff]"
            aria-label="Close project modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Hero Preview Image */}
          <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl">
            <img
              src={project.image}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-transparent to-transparent opacity-60" />
            
            {/* Quick Metrics Overlay Badge */}
            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
              {project.metrics.map((m) => (
                <div key={m.label} className="px-3 py-1.5 rounded-lg bg-[#07090e]/80 border border-[#00f0ff]/30 backdrop-blur-md text-xs font-mono">
                  <span className="text-slate-400">{m.label}: </span>
                  <span className="text-[#00f0ff] font-bold">{m.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Title & Overview */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-2">
              <h2 className="font-['Orbitron',sans-serif] text-2xl sm:text-3xl font-black text-white metallic-text">
                {project.title}
              </h2>
              <span className="text-xs font-mono text-[#00f0ff]">{project.year} Release</span>
            </div>
            <p className="text-base text-slate-300 font-medium mb-4">
              {project.subtitle}
            </p>
            <p className="text-sm text-slate-400 leading-relaxed">
              {project.fullOverview}
            </p>
          </div>

          {/* Key Architectural Challenges Solved */}
          <div className="p-5 rounded-xl bg-slate-900/50 border border-slate-800">
            <h3 className="font-['Orbitron',sans-serif] text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 mb-3">
              <Activity className="w-4 h-4 text-[#00f0ff]" />
              Engineering Breakthroughs & Challenges Solved
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
              {project.challengesSolved.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00f0ff] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies Used */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#00f0ff]" />
              Technologies & Framework Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Interactive Simulation / Working Links Bar */}
          <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>Source Repository</span>
              </a>

              <a
                href={project.liveUrl}
                onClick={(e) => {
                  e.preventDefault();
                  alert(`Demonstrating live simulator for ${project.title}. Production deployment ready on React & Vite.`);
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold text-[#07090e] bg-gradient-to-r from-[#00f0ff] to-[#38bdf8] hover:from-[#38bdf8] hover:to-[#00f0ff] shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all cursor-pointer"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Launch Interactive Demo</span>
              </a>
            </div>

            <span className="text-[11px] font-mono text-slate-500">
              Verified by Karimov Shodiyor (STRAVEX)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
