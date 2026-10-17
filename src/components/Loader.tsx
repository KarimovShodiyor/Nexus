import React, { useEffect, useState } from 'react';
import { StravexLogo } from './StravexLogo';

interface LoaderProps {
  onFinish: () => void;
}

export const Loader: React.FC<LoaderProps> = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onFinish, 300);
          return 100;
        }
        const increment = Math.floor(Math.random() * 15) + 8;
        return Math.min(100, prev + increment);
      });
    }, 90);

    return () => clearInterval(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#07090e] text-white">
      {/* Background glow */}
      <div className="absolute w-72 h-72 bg-[#00f0ff]/15 rounded-full blur-[100px] pointer-events-none" />

      {/* 3D Rotating Logo Centerpiece */}
      <div className="relative z-10 flex flex-col items-center">
        <StravexLogo size="xl" showText={false} className="mb-6 animate-pulse" />

        <h1 className="font-['Orbitron',sans-serif] text-2xl sm:text-3xl font-black tracking-widest metallic-text mb-1">
          STRAVEX
        </h1>
        <div className="text-xs font-mono tracking-[0.3em] text-[#00f0ff] uppercase mb-8">
          KARIMOV SHODIYOR
        </div>

        {/* Progress Bar & Numeric Indicator */}
        <div className="w-56 sm:w-64 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>INITIALIZING 3D ENGINE</span>
            <span className="text-[#00f0ff] font-bold tabular-nums">{progress}%</span>
          </div>

          <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-[#00f0ff] to-[#38bdf8] transition-all duration-150 ease-out shadow-[0_0_12px_#00f0ff]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="mt-8 text-[11px] font-mono text-slate-400 tracking-wider">
          FRONTEND & REACT ARCHITECTURE
        </div>
      </div>
    </div>
  );
};
