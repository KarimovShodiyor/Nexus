import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailPosition, setTrailPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    // Disable on touch devices or if prefers-reduced-motion
    if (window.matchMedia('(pointer: coarse)').matches) {
      setEnabled(false);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.closest('button') ||
          target.closest('a') ||
          target.classList.contains('cursor-pointer') ||
          target.getAttribute('role') === 'button')
      ) {
        setIsPointer(true);
      } else {
        setIsPointer(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Smooth trail interpolation
  useEffect(() => {
    if (!enabled) return;
    let animId: number;

    const follow = () => {
      setTrailPosition((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.2,
        y: prev.y + (position.y - prev.y) * 0.2,
      }));
      animId = requestAnimationFrame(follow);
    };

    animId = requestAnimationFrame(follow);
    return () => cancelAnimationFrame(animId);
  }, [position, enabled]);

  if (!enabled || !isVisible) return null;

  return (
    <>
      {/* High-speed Inner Dot */}
      <div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#00f0ff] pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_#00f0ff]"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        }}
      />

      {/* Smooth Trailing Glow Ring */}
      <div
        className={`fixed top-0 left-0 rounded-full border pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-[width,height,background-color,border-color] duration-150 ease-out ${
          isPointer
            ? 'w-10 h-10 border-[#00f0ff] bg-[#00f0ff]/10 shadow-[0_0_20px_rgba(0,240,255,0.4)]'
            : 'w-6 h-6 border-[#00f0ff]/40 bg-transparent'
        }`}
        style={{
          transform: `translate3d(${trailPosition.x}px, ${trailPosition.y}px, 0)`,
        }}
      />
    </>
  );
};
