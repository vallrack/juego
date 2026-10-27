import React from 'react';
import { Volume2, VolumeX, BookOpen, Flame, Shield, Award } from 'lucide-react';
import { PlayerProfile } from '../types/game';
import { tacticalAudio } from '../utils/audio';

interface TacticalHUDHeaderProps {
  scoreXP: number; // Max 100
  currentQuestionIndex: number;
  totalQuestions: number;
  streak: number;
  player: PlayerProfile;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenFieldManual: () => void;
}

export const TacticalHUDHeader: React.FC<TacticalHUDHeaderProps> = ({
  scoreXP,
  currentQuestionIndex,
  totalQuestions,
  streak,
  player,
  isMuted,
  onToggleMute,
  onOpenFieldManual,
}) => {
  const percentage = Math.min(100, Math.max(0, scoreXP));

  return (
    <header className="w-full bg-[#0d071a]/95 border-b border-purple-900/60 backdrop-blur-md sticky top-0 z-40 select-none">
      {/* Top micro bar with compass degrees & telemetry */}
      <div className="hidden sm:flex items-center justify-between px-4 py-1 text-[10px] font-tech text-purple-400/80 border-b border-purple-950">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400 animate-ping" />
            <span>OPERACIÓN: KEYSTRIKE // CANAL TÁCTICO V-7</span>
          </span>
          <span className="text-purple-600">|</span>
          <span>LAT: 34.0522° N // LONG: 118.2437° W</span>
        </div>
        
        {/* Tactical Compass */}
        <div className="flex items-center gap-2 font-mono text-purple-300">
          <span className="text-purple-600">◀</span>
          <span className="tracking-widest">NW · 315° · N · 000° · <strong className="text-fuchsia-400 font-bold">NE · 045°</strong> · E · 090°</span>
          <span className="text-purple-600">▶</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-purple-400">ESTADO: EN COMBATE</span>
          <span className="w-2 h-2 rounded-xs bg-purple-500 inline-block" />
        </div>
      </div>

      {/* Main HUD Row */}
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Operator Profile Tag */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-sm bg-gradient-to-br from-purple-800 to-indigo-950 border border-fuchsia-500/70 p-1 flex items-center justify-center relative shadow-[0_0_12px_rgba(168,85,247,0.3)]">
            <Shield className="w-6 h-6 text-fuchsia-300" />
            <span className="absolute -bottom-1 -right-1 bg-purple-900 text-[9px] font-tech text-purple-200 px-1 border border-purple-500 rounded-xs">
              LVL {Math.floor(scoreXP / 20) + 1}
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-tech text-xs text-fuchsia-400 font-bold px-1.5 py-0.2 bg-purple-950/80 border border-purple-700/60 rounded">
                [{player.clanTag}]
              </span>
              <span className="font-tactical font-bold text-sm tracking-wide text-purple-100 uppercase">
                {player.callsign}
              </span>
            </div>
            <div className="text-[11px] font-tech text-purple-400 flex items-center gap-2">
              <span>RANGO: {scoreXP >= 80 ? 'OPERADOR ÉLITE' : scoreXP >= 50 ? 'ESPECIALISTA' : 'OPERADOR RECLUTA'}</span>
              {streak > 1 && (
                <span className="flex items-center gap-1 text-fuchsia-400 font-bold animate-pulse">
                  <Flame className="w-3.5 h-3.5 text-fuchsia-400" />
                  RACHA x{streak}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Live XP Tactical Progress Bar */}
        <div className="flex-1 min-w-[240px] max-w-lg">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-tactical font-bold text-purple-200 tracking-wider flex items-center gap-1.5">
              <Award className="w-4 h-4 text-fuchsia-400" />
              PUNTOS DE EXPERIENCIA (XP)
            </span>
            <div className="font-tech font-bold text-sm flex items-center gap-2">
              <span className="text-fuchsia-300 text-base">{scoreXP}</span>
              <span className="text-purple-400/80">/ 100 XP</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded border uppercase ${
                scoreXP >= 80 
                  ? 'bg-fuchsia-950/80 text-fuchsia-300 border-fuchsia-400 shadow-[0_0_8px_rgba(217,70,239,0.5)]' 
                  : 'bg-purple-950/70 text-purple-300 border-purple-800'
              }`}>
                {scoreXP >= 80 ? 'VICTORIA TÁCTICA' : 'META: 80 XP'}
              </span>
            </div>
          </div>

          {/* Tactical Bar Container */}
          <div className="relative h-4 bg-[#0a0514] border border-purple-700/60 rounded-xs overflow-hidden p-0.5 shadow-inner">
            {/* Grid notches */}
            <div className="absolute inset-0 grid grid-cols-10 pointer-events-none z-10 opacity-30">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="border-r border-purple-400/40 h-full" />
              ))}
            </div>

            {/* Threshold target marker at 80% */}
            <div 
              className="absolute top-0 bottom-0 w-0.5 bg-fuchsia-400 z-20 shadow-[0_0_6px_#e879f9]"
              style={{ left: '80%' }}
              title="Umbral de Extracción Segura: 80 XP"
            >
              <span className="absolute -top-3.5 -left-3 text-[8px] font-tech text-fuchsia-300 bg-purple-950 px-1 border border-fuchsia-500/80 rounded-xs">
                80XP
              </span>
            </div>

            {/* Animated XP Fill Bar */}
            <div
              className="h-full bg-gradient-to-r from-purple-800 via-fuchsia-600 to-fuchsia-400 transition-all duration-500 ease-out shadow-[0_0_12px_rgba(217,70,239,0.6)]"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-[10px] font-tech text-purple-400/80 mt-1">
            <span>OBJETIVO {currentQuestionIndex + 1} DE {totalQuestions}</span>
            <span className="text-purple-300 font-semibold">
              {scoreXP >= 80 ? '✓ UMBRAL DE ÉLITE ALCANZADO' : `FALTAN ${80 - scoreXP > 0 ? 80 - scoreXP : 0} XP PARA EXTRACCIÓN`}
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Field Manual */}
          <button
            onClick={() => {
              tacticalAudio.playRadioClick();
              onOpenFieldManual();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-950/70 hover:bg-purple-900 border border-purple-600/50 hover:border-fuchsia-400 rounded text-xs font-tactical text-purple-200 transition-all cursor-pointer shadow-sm"
            title="Abrir Manual de Campo y Armería de Teclados"
          >
            <BookOpen className="w-3.5 h-3.5 text-fuchsia-400" />
            <span className="hidden md:inline">ARMERÍA TÁCTICA</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={() => {
              onToggleMute();
              if (isMuted) {
                tacticalAudio.playHudBeep(true);
              }
            }}
            className={`p-1.5 rounded border text-xs font-tactical transition-all cursor-pointer flex items-center justify-center ${
              isMuted
                ? 'bg-purple-950/40 text-purple-500 border-purple-900'
                : 'bg-purple-900/80 text-fuchsia-300 border-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.3)]'
            }`}
            title={isMuted ? 'Activar Efectos de Sonido Tácticos' : 'Silenciar Audio'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
