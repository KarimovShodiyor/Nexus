import React, { useState } from 'react';
import { DEVELOPER_INFO, PHILOSOPHY, STATS } from '../data/portfolioData';
import { downloadDeveloperCv } from '../utils/generateCv';
import { Download, FileText, CheckCircle2, Award, Zap, Code, ExternalLink } from 'lucide-react';

export const About: React.FC = () => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleCvDownload = () => {
    downloadDeveloperCv();
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 4000);
  };

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-[#07090e]">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#00f0ff]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="flex items-center gap-2 text-xs font-mono text-[#00f0ff] uppercase tracking-widest mb-2">
            <span>Identity Protocol</span>
            <span aria-hidden="true">·</span>
            <span>Architect Profile</span>
          </div>
          <h2 className="font-['Orbitron',sans-serif] text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight metallic-text">
            THE MIND BEHIND STRAVEX
          </h2>
          <p className="text-slate-400 mt-2 text-base sm:text-lg max-w-2xl">
            Passionate Frontend Developer & React specialist turning vision into ultra-responsive web experiences.
          </p>
        </div>

        {/* 2-Column Main Bio & 3D Avatar Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch mb-16">
          {/* Avatar Column with 3D Tilt Frame */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="relative group rounded-2xl p-1 bg-gradient-to-b from-[#00f0ff]/40 via-slate-800 to-transparent shadow-[0_15px_40px_rgba(0,0,0,0.7)] h-full">
              <div className="relative rounded-2xl overflow-hidden bg-[#0d121f] h-full flex flex-col">
                {/* 3D Developer Portrait */}
                <div className="relative aspect-square w-full overflow-hidden bg-slate-900">
                  <img
                    src={DEVELOPER_INFO.avatarUrl}
                    alt={`${DEVELOPER_INFO.fullName} - STRAVEX Frontend Developer`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d121f] via-transparent to-transparent opacity-80" />
                  
                  {/* Subtle Corner Reticle */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-[#07090e]/80 border border-[#00f0ff]/30 text-[10px] font-mono text-[#00f0ff] backdrop-blur-sm">
                    DEV-ID // SHODIYOR
                  </div>
                </div>

                {/* Profile Card Footer */}
                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="font-['Orbitron',sans-serif] text-xl font-bold text-white tracking-wide">
                      {DEVELOPER_INFO.fullName}
                    </h3>
                    <div className="flex items-center gap-2 text-xs font-mono text-[#00f0ff] mt-1 mb-3">
                      <span>Frontend Developer</span>
                      <span aria-hidden="true">·</span>
                      <span>React Developer</span>
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {DEVELOPER_INFO.bioSummary}
                    </p>
                  </div>

                  {/* Real Downloadable CV Action Button */}
                  <div className="mt-6 pt-4 border-t border-slate-800/80">
                    <button
                      onClick={handleCvDownload}
                      className="w-full group/btn flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider text-[#07090e] bg-gradient-to-r from-[#00f0ff] to-[#38bdf8] hover:from-[#38bdf8] hover:to-[#00f0ff] transition-all duration-300 shadow-[0_0_20px_rgba(0,240,255,0.25)] hover:shadow-[0_0_25px_rgba(0,240,255,0.5)] cursor-pointer"
                    >
                      {downloadSuccess ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-[#07090e]" />
                          <span>CV Downloaded Successfully</span>
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4 text-[#07090e] group-hover/btn:-translate-y-0.5 transition-transform" />
                          <span>Download Professional CV (.HTML / PDF)</span>
                        </>
                      )}
                    </button>
                    <span className="block text-center text-[11px] text-slate-400 font-mono mt-1.5">
                      Formatted for screen & high-res print to PDF
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bio Narrative & Stats & Philosophy */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            {/* Biography Narrative Card */}
            <div className="glass-panel p-8 rounded-2xl border border-slate-800 flex-1">
              <h3 className="font-['Orbitron',sans-serif] text-lg font-bold text-white tracking-wide flex items-center gap-2 mb-4">
                <Code className="w-5 h-5 text-[#00f0ff]" />
                Architecture & Engineering Philosophy
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4">
                {DEVELOPER_INFO.detailedBio}
              </p>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                Whether deploying responsive web applications, configuring state orchestration, or experimenting with WebGL spatial graphics, every line of code is measured against performance, clarity, and delight.
              </p>

              {/* Developer Philosophy Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-800">
                {PHILOSOPHY.map((pillar) => (
                  <div key={pillar.title} className="p-3 rounded-lg bg-slate-900/40 border border-slate-800">
                    <span className="text-xs font-semibold text-[#00f0ff] block mb-1 font-['Orbitron',sans-serif]">
                      {pillar.title}
                    </span>
                    <p className="text-xs text-slate-400 leading-normal">
                      {pillar.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Fact / Contact Adjacency Bar */}
            <div className="p-4 rounded-xl glass-panel border border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Base Location: {DEVELOPER_INFO.location}</span>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={DEVELOPER_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-400 hover:text-[#00f0ff] transition-colors flex items-center gap-1 font-mono"
                >
                  GitHub <ExternalLink className="w-3 h-3" />
                </a>
                <span className="text-slate-600">·</span>
                <a
                  href={DEVELOPER_INFO.telegram}
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-400 hover:text-[#00f0ff] transition-colors flex items-center gap-1 font-mono"
                >
                  Telegram <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
