import React from 'react';
import { SERVICES } from '../data/portfolioData';
import { Service } from '../types';
import { Code2, Atom, Smartphone, Rocket, Layers, Gauge, ArrowRight, Check } from 'lucide-react';

interface ServicesProps {
  onSelectService: (serviceTitle: string) => void;
}

const ServiceIcon: React.FC<{ name: string; className?: string }> = ({ name, className = 'w-6 h-6' }) => {
  switch (name) {
    case 'Code2':
      return <Code2 className={className} />;
    case 'Atom':
      return <Atom className={className} />;
    case 'Smartphone':
      return <Smartphone className={className} />;
    case 'Rocket':
      return <Rocket className={className} />;
    case 'Layers':
      return <Layers className={className} />;
    case 'Gauge':
      return <Gauge className={className} />;
    default:
      return <Code2 className={className} />;
  }
};

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  return (
    <section id="services" className="py-24 relative overflow-hidden bg-[#0a0d14] cyber-grid">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#00f0ff]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="flex flex-col items-start mb-16">
          <div className="flex items-center gap-2 text-xs font-mono text-[#00f0ff] uppercase tracking-widest mb-2">
            <span>Capabilities & Solutions</span>
            <span aria-hidden="true">·</span>
            <span>Frontend Engineering</span>
          </div>
          <h2 className="font-['Orbitron',sans-serif] text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight metallic-text">
            SPECIALIZED SERVICES
          </h2>
          <p className="text-slate-400 mt-2 text-base sm:text-lg max-w-2xl">
            Tailored engineering solutions crafted by Karimov Shodiyor for ambitious products and global brands.
          </p>
        </div>

        {/* 6 Futuristic Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, idx) => (
            <div
              key={service.id}
              className="group relative rounded-2xl p-6 sm:p-7 glass-panel border border-slate-800 transition-all duration-300 hover:border-[#00f0ff]/40 hover:shadow-[0_15px_35px_rgba(0,240,255,0.12)] flex flex-col justify-between transform hover:-translate-y-1"
            >
              <div>
                {/* Header: Icon + Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-700/60 text-[#00f0ff] group-hover:border-[#00f0ff]/50 group-hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all">
                    <ServiceIcon name={service.icon} className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-mono text-[#00f0ff] px-2.5 py-1 rounded bg-[#00f0ff]/10 border border-[#00f0ff]/20">
                    {service.badge}
                  </span>
                </div>

                {/* Service Title */}
                <h3 className="font-['Orbitron',sans-serif] text-lg sm:text-xl font-bold text-white group-hover:text-[#00f0ff] transition-colors mb-3">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Key Deliverables */}
                <div className="space-y-2 mb-6 pt-4 border-t border-slate-800/80">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-2">
                    Included Deliverables:
                  </span>
                  {service.deliverables.map((item, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-2 text-xs text-slate-400">
                      <Check className="w-3.5 h-3.5 text-[#00f0ff] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inquiry Action Button */}
              <div className="pt-4 border-t border-slate-800/80 mt-auto">
                <button
                  onClick={() => onSelectService(service.title)}
                  className="w-full flex items-center justify-between py-2.5 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider text-slate-200 group-hover:text-[#07090e] bg-slate-900 group-hover:bg-[#00f0ff] border border-slate-700/60 group-hover:border-[#00f0ff] transition-all duration-300 cursor-pointer"
                >
                  <span>Inquire for {service.title}</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
