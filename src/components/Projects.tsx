import React, { useState } from 'react';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types';
import { ProjectModal } from './ProjectModal';
import { ExternalLink, Github, ArrowUpRight, Sparkles, Eye, Layers } from 'lucide-react';

const PROJECT_CATEGORIES = ['All Projects', 'React', 'JavaScript', 'UI/UX', 'Web Applications'] as const;

export const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<(typeof PROJECT_CATEGORIES)[number]>('All Projects');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = PROJECTS.filter((project) =>
    activeCategory === 'All Projects' ? true : project.category === activeCategory
  );

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-[#07090e]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-[#00f0ff]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#8b5cf6]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#00f0ff] uppercase tracking-widest mb-2">
              <span>Selected Works</span>
              <span aria-hidden="true">·</span>
              <span>Production Deployments</span>
            </div>
            <h2 className="font-['Orbitron',sans-serif] text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight metallic-text">
              FEATURED PROJECTS
            </h2>
            <p className="text-slate-400 mt-2 text-base max-w-xl">
              High-performance web applications, 3D spatial studios, and scalable design architectures.
            </p>
          </div>

          {/* Category Filter Tabs (Zero-Pill Discipline: Segmented Controls) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl bg-[#0d121f] border border-slate-800">
            {PROJECT_CATEGORIES.map((cat) => {
              const isSelected = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? 'bg-[#00f0ff]/20 text-[#00f0ff] border border-[#00f0ff]/40 shadow-[0_0_12px_rgba(0,240,255,0.25)]'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Bento & Masonry Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => {
            // Give first item prominent wide footprint if featured
            const isWide = project.featured && idx === 0;

            return (
              <div
                key={project.id}
                className={`group relative rounded-2xl glass-panel border border-slate-800/90 overflow-hidden flex flex-col transition-all duration-300 hover:border-[#00f0ff]/40 hover:shadow-[0_15px_40px_rgba(0,240,255,0.12)] transform hover:-translate-y-1 ${
                  isWide ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
              >
                {/* Image Container with Animated Zoom */}
                <div
                  className="relative aspect-video w-full overflow-hidden bg-slate-950 cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d121f] via-transparent to-transparent opacity-75" />

                  {/* Corner Category & Year Badge */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#07090e]/80 border border-slate-700 text-[11px] font-mono text-[#00f0ff] backdrop-blur-sm">
                    {project.category} · {project.year}
                  </div>

                  {/* Quick Inspect Hover Overlay Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#07090e]/40 backdrop-blur-xs">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#00f0ff] text-[#07090e] text-xs font-bold uppercase tracking-wider shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                      <Eye className="w-3.5 h-3.5" />
                      Inspect Case Study
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    {/* Project Title */}
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3
                        onClick={() => setSelectedProject(project)}
                        className="font-['Orbitron',sans-serif] text-xl font-bold text-white group-hover:text-[#00f0ff] transition-colors cursor-pointer"
                      >
                        {project.title}
                      </h3>
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="p-1 text-slate-400 group-hover:text-[#00f0ff] transition-colors shrink-0"
                        title="View Project Details"
                      >
                        <ArrowUpRight className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Subtitle */}
                    <p className="text-xs font-mono text-slate-400 mb-3">
                      {project.subtitle}
                    </p>

                    {/* Description */}
                    <p className="text-sm text-slate-300 line-clamp-2 leading-relaxed mb-4">
                      {project.description}
                    </p>

                    {/* Technologies Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-900/90 border border-slate-800 text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Action Buttons (Live Demo + GitHub) */}
                  <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Code</span>
                    </a>

                    <div className="flex items-center gap-2">
                      <a
  href={project.liveUrl}
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-[#00f0ff] hover:text-white bg-[#00f0ff]/10 hover:bg-[#00f0ff]/20 border border-[#00f0ff]/30 transition-all cursor-pointer"
>
  <ExternalLink className="w-3.5 h-3.5" />
  <span>Live Demo</span>
</a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Project Details Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
