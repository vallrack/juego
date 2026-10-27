import React from 'react';

interface HitmarkerOverlayProps {
  show: boolean;
  type: 'hit' | 'kill' | 'miss';
  text?: string;
}

export const HitmarkerOverlay: React.FC<HitmarkerOverlayProps> = ({ show, type, text }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
      {/* Central Hitmarker Crosshair */}
      <div className="relative flex items-center justify-center">
        {/* Top-Left tick */}
        <span 
          className={`absolute w-3.5 h-1 origin-right -translate-x-3 -translate-y-3 -rotate-45 rounded-sm ${
            type === 'kill' 
              ? 'bg-fuchsia-400 shadow-[0_0_8px_#e879f9]' 
              : type === 'hit' 
              ? 'bg-purple-300 shadow-[0_0_6px_#c084fc]' 
              : 'bg-red-500 shadow-[0_0_8px_#ef4444]'
          }`} 
        />
        {/* Top-Right tick */}
        <span 
          className={`absolute w-3.5 h-1 origin-left translate-x-3 -translate-y-3 rotate-45 rounded-sm ${
            type === 'kill' 
              ? 'bg-fuchsia-400 shadow-[0_0_8px_#e879f9]' 
              : type === 'hit' 
              ? 'bg-purple-300 shadow-[0_0_6px_#c084fc]' 
              : 'bg-red-500 shadow-[0_0_8px_#ef4444]'
          }`} 
        />
        {/* Bottom-Left tick */}
        <span 
          className={`absolute w-3.5 h-1 origin-right -translate-x-3 translate-y-3 rotate-45 rounded-sm ${
            type === 'kill' 
              ? 'bg-fuchsia-400 shadow-[0_0_8px_#e879f9]' 
              : type === 'hit' 
              ? 'bg-purple-300 shadow-[0_0_6px_#c084fc]' 
              : 'bg-red-500 shadow-[0_0_8px_#ef4444]'
          }`} 
        />
        {/* Bottom-Right tick */}
        <span 
          className={`absolute w-3.5 h-1 origin-left translate-x-3 translate-y-3 -rotate-45 rounded-sm ${
            type === 'kill' 
              ? 'bg-fuchsia-400 shadow-[0_0_8px_#e879f9]' 
              : type === 'hit' 
              ? 'bg-purple-300 shadow-[0_0_6px_#c084fc]' 
              : 'bg-red-500 shadow-[0_0_8px_#ef4444]'
          }`} 
        />

        {/* Floating Callout Text (e.g. +10 XP BAJA CONFIRMADA) */}
        {text && (
          <div className="absolute top-10 whitespace-nowrap animate-bounce">
            <span className={`px-3 py-1 font-tactical font-bold text-xs uppercase tracking-widest border rounded shadow-lg ${
              type === 'kill'
                ? 'bg-purple-950/90 text-fuchsia-300 border-fuchsia-500 shadow-[0_0_15px_rgba(217,70,239,0.4)]'
                : type === 'hit'
                ? 'bg-purple-900/90 text-purple-200 border-purple-400'
                : 'bg-red-950/90 text-red-300 border-red-500'
            }`}>
              {text}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
