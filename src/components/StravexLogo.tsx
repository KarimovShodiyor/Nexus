import React from 'react';

interface StravexLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
  isAnimated?: boolean;
}

export const StravexLogo: React.FC<StravexLogoProps> = ({
  size = 'md',
  showText = true,
  className = '',
  isAnimated = true,
}) => {
  const sizeMap = {
    sm: { icon: 30, text: 'text-base', spacing: 'gap-2' },
    md: { icon: 40, text: 'text-xl', spacing: 'gap-2.5' },
    lg: { icon: 52, text: 'text-2xl', spacing: 'gap-3' },
    xl: { icon: 72, text: 'text-4xl', spacing: 'gap-4' },
  };

  const { icon, text, spacing } = sizeMap[size];

  return (
    <div className={`flex items-center ${spacing} select-none group ${className}`}>
      {/* 3D Geometric S Emblem */}
      <div
        className={`relative flex items-center justify-center shrink-0 ${
          isAnimated ? 'transition-transform duration-500 ease-out group-hover:rotate-6 group-hover:scale-105' : ''
        }`}
        style={{ width: icon, height: icon }}
      >
        {/* Glow halo behind logo */}
        <div className="absolute inset-0 bg-[#00f0ff]/20 rounded-xl blur-md opacity-70 group-hover:opacity-100 group-hover:blur-lg transition-all duration-300" />

        {/* 3D Chamfered Badge Vector */}
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-[0_4px_12px_rgba(0,240,255,0.35)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Metallic Titanium / Dark Gradient */}
            <linearGradient id="titaniumGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="50%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#020617" />
            </linearGradient>

            {/* Mirror Chrome Edge Gradient */}
            <linearGradient id="chromeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="35%" stopColor="#94a3b8" />
              <stop offset="70%" stopColor="#f8fafc" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>

            {/* Electric Blue Neon Core */}
            <linearGradient id="electricBlue" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00f0ff" />
              <stop offset="60%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>

            {/* Outer Rim Filter */}
            <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Outer Octagonal Beveled Frame */}
          <polygon
            points="28,8 72,8 92,28 92,72 72,92 28,92 8,72 8,28"
            fill="url(#titaniumGrad)"
            stroke="url(#chromeGrad)"
            strokeWidth="3.5"
          />

          {/* Glowing Inner Perimeter */}
          <polygon
            points="32,15 68,15 85,32 85,68 68,85 32,85 15,68 15,32"
            fill="none"
            stroke="#00f0ff"
            strokeWidth="1.2"
            strokeOpacity="0.6"
          />

          {/* Extruded Geometric 'S' Emblem */}
          {/* S 3D Depth Shadow */}
          <path
            d="M33 30 L67 30 L45 47 L69 47 L67 70 L31 70 L53 53 L31 53 Z"
            fill="#020617"
            transform="translate(2, 2)"
          />

          {/* S Metallic Body */}
          <path
            d="M33 30 L67 30 L45 47 L69 47 L67 70 L31 70 L53 53 L31 53 Z"
            fill="url(#chromeGrad)"
          />

          {/* S Neon Inlay Core */}
          <path
            d="M37 34 L63 34 L43 49 L65 49 L63 66 L35 66 L55 51 L35 51 Z"
            fill="url(#electricBlue)"
            filter="url(#neonGlow)"
          />

          {/* Corner Light Glints */}
          <circle cx="28" cy="8" r="1.8" fill="#ffffff" />
          <circle cx="72" cy="8" r="1.8" fill="#00f0ff" />
          <circle cx="92" cy="28" r="1.8" fill="#ffffff" />
          <circle cx="8" cy="72" r="1.8" fill="#00f0ff" />
        </svg>
      </div>

      {/* Brand Text */}
      {showText && (
        <div className="flex flex-col">
          <span
            className={`font-['Orbitron',sans-serif] font-black tracking-widest leading-none metallic-text ${text}`}
          >
            STRAVEX
          </span>
          <span className="text-[9px] font-mono tracking-[0.25em] text-slate-400 uppercase -mt-0.5">
            KARIMOV SHODIYOR
          </span>
        </div>
      )}
    </div>
  );
};
