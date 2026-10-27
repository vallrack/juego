import React, { useState } from 'react';
import { Crosshair, Shield, Terminal, Zap, Sparkles, Skull, ChevronRight, Play } from 'lucide-react';
import { PlayerProfile } from '../types/game';
import { CALLING_CARDS } from '../data/operatorData';
import { tacticalAudio } from '../utils/audio';

interface MissionBriefingProps {
  player: PlayerProfile;
  onUpdatePlayer: (updated: Partial<PlayerProfile>) => void;
  onDeployMission: () => void;
  onOpenFieldManual: () => void;
}

export const MissionBriefing: React.FC<MissionBriefingProps> = ({
  player,
  onUpdatePlayer,
  onDeployMission,
  onOpenFieldManual,
}) => {
  const [isDeploying, setIsDeploying] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);

  const handleStartDeploy = () => {
    tacticalAudio.playRadioClick();
    setIsDeploying(true);
    setCountdown(3);

    let current = 3;
    const interval = setInterval(() => {
      current -= 1;
      if (current > 0) {
        setCountdown(current);
        tacticalAudio.playHudBeep(false);
      } else {
        clearInterval(interval);
        tacticalAudio.playHudBeep(true);
        onDeployMission();
      }
    }, 600);
  };

  return (
    <div className="relative max-w-5xl mx-auto px-4 py-8 select-none">
      {/* Decorative Tactical Watermark */}
      <div className="absolute right-0 top-12 opacity-5 pointer-events-none text-purple-400 font-warfare text-9xl">
        KEYSTRIKE
      </div>

      {/* Main Mission Dossier Header */}
      <div className="tactical-box p-6 md:p-8 rounded-sm mb-6 border border-purple-700/60 shadow-[0_0_25px_rgba(88,28,135,0.25)] relative overflow-hidden">
        {/* Neon accent corner glow */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-purple-800/60 pb-5 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-tech text-fuchsia-400 mb-1">
              <span className="w-2 h-2 rounded-xs bg-fuchsia-500 animate-pulse" />
              <span>INFORME DE MANDO SUPREMO // CLASIFICADO NIVEL 5</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-warfare text-transparent bg-clip-text bg-gradient-to-r from-purple-100 via-fuchsia-200 to-purple-400 tracking-wider">
              OPERACIÓN: KEYSTRIKE
            </h1>
            <p className="text-purple-300 text-sm font-tactical mt-1">
              Despliegue táctico interactivo de evaluación y combate sobre tipologías y arquitectura de teclados de computadora.
            </p>
          </div>

          {/* Mission Threat Level Badge */}
          <div className="flex flex-row md:flex-col items-center md:items-end justify-between bg-purple-950/70 p-3 rounded border border-purple-700/50">
            <span className="text-[10px] font-tech text-purple-400">ESTADO DE AMENAZA</span>
            <span className="text-xs font-tactical font-bold text-fuchsia-400 tracking-widest flex items-center gap-1.5">
              <Crosshair className="w-4 h-4 text-fuchsia-400" />
              PRIORIDAD MÁXIMA
            </span>
            <span className="text-[10px] font-tech text-purple-300 mt-0.5">META: 80+ XP REQUERIDOS</span>
          </div>
        </div>

        {/* 3-Column Tactical Grid: Directives, Operator Config, Calling Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Column 1: Mission Intel & Objectives */}
          <div className="bg-[#120824]/90 p-4 rounded border border-purple-800/40">
            <div className="flex items-center gap-2 text-xs font-tactical font-bold text-purple-200 uppercase mb-3">
              <Terminal className="w-4 h-4 text-fuchsia-400" />
              <span>DIRECTIVAS DE COMBATE</span>
            </div>
            <ul className="space-y-2.5 text-xs text-purple-300/90 font-tactical">
              <li className="flex items-start gap-2">
                <span className="text-fuchsia-400 font-tech font-bold">01.</span>
                <span><strong>10 Objetivos Tácticos:</strong> Switches mecánicos, membrana, formatos 60%/TKL, distribución ANSI/ISO y Hall Effect.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-fuchsia-400 font-tech font-bold">02.</span>
                <span><strong>Puntaje Máximo:</strong> 100 XP en juego (10 XP por baja confirmada).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-fuchsia-400 font-tech font-bold">03.</span>
                <span className="text-purple-200"><strong>Condición de Extracción:</strong> Obtén <strong className="text-fuchsia-400">80 XP o más</strong> para consagrarte como <strong className="text-fuchsia-300">Operador Élite</strong>. Menos de 80 XP resultará en derrota y caída de tu escuadrón.</span>
              </li>
            </ul>

            <button
              onClick={() => {
                tacticalAudio.playRadioClick();
                onOpenFieldManual();
              }}
              className="mt-4 w-full py-2 px-3 bg-purple-950 hover:bg-purple-900/80 border border-purple-700/60 rounded text-xs font-tactical text-purple-200 flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <span>Consultar Armería de Teclados</span>
              <ChevronRight className="w-3.5 h-3.5 text-fuchsia-400" />
            </button>
          </div>

          {/* Column 2: Operator Identity Config */}
          <div className="bg-[#120824]/90 p-4 rounded border border-purple-800/40">
            <div className="flex items-center gap-2 text-xs font-tactical font-bold text-purple-200 uppercase mb-3">
              <Shield className="w-4 h-4 text-fuchsia-400" />
              <span>FICHA DE OPERADOR</span>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-tech text-purple-400 mb-1 uppercase">
                  INDICATIVO / CALLSIGN
                </label>
                <input
                  type="text"
                  maxLength={16}
                  value={player.callsign}
                  onChange={(e) => onUpdatePlayer({ callsign: e.target.value || 'GHOST' })}
                  className="w-full bg-[#0a0414] border border-purple-700/60 rounded px-3 py-1.5 text-sm font-tactical text-purple-100 focus:outline-none focus:border-fuchsia-500 uppercase tracking-wider"
                  placeholder="GHOST-1"
                />
              </div>

              <div>
                <label className="block text-[10px] font-tech text-purple-400 mb-1 uppercase">
                  ETIQUETA DE CLAN [TAG]
                </label>
                <input
                  type="text"
                  maxLength={5}
                  value={player.clanTag}
                  onChange={(e) => onUpdatePlayer({ clanTag: e.target.value.toUpperCase() || '141' })}
                  className="w-full bg-[#0a0414] border border-purple-700/60 rounded px-3 py-1.5 text-sm font-tech text-fuchsia-300 font-bold focus:outline-none focus:border-fuchsia-500 uppercase tracking-widest"
                  placeholder="141"
                />
              </div>

              <div className="text-[11px] font-tech text-purple-400/80 pt-1">
                RANGO INICIAL: <strong className="text-purple-200">OPERADOR DE CAMPO</strong>
              </div>
            </div>
          </div>

          {/* Column 3: Calling Card Selector */}
          <div className="bg-[#120824]/90 p-4 rounded border border-purple-800/40">
            <div className="flex items-center gap-2 text-xs font-tactical font-bold text-purple-200 uppercase mb-3">
              <Sparkles className="w-4 h-4 text-fuchsia-400" />
              <span>TARJETA DE VISITA (CALLING CARD)</span>
            </div>

            <div className="space-y-2">
              {CALLING_CARDS.map((card) => {
                const isSelected = player.callingCard === card.id;
                return (
                  <button
                    key={card.id}
                    onClick={() => {
                      tacticalAudio.playHudBeep();
                      onUpdatePlayer({ callingCard: card.id });
                    }}
                    className={`w-full text-left p-2 rounded border transition-all cursor-pointer relative overflow-hidden ${
                      isSelected
                        ? 'border-fuchsia-400 bg-purple-900/60 shadow-[0_0_12px_rgba(217,70,239,0.3)]'
                        : 'border-purple-800/50 bg-[#0d051c] hover:border-purple-600'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {card.id === 'ghost-purple' ? (
                          <Skull className="w-3.5 h-3.5 text-purple-300" />
                        ) : card.id === 'neon-cyber' ? (
                          <Zap className="w-3.5 h-3.5 text-pink-400" />
                        ) : (
                          <Crosshair className="w-3.5 h-3.5 text-fuchsia-400" />
                        )}
                        <span className="text-xs font-tactical font-bold text-purple-100">{card.name}</span>
                      </div>
                      {isSelected && (
                        <span className="text-[9px] font-tech text-fuchsia-400 uppercase tracking-widest">
                          EQUIPADA
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] font-tech text-purple-400 mt-0.5 truncate">{card.tag}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Big Deployment Action Button */}
        <div className="mt-8 pt-6 border-t border-purple-800/60 flex flex-col items-center justify-center">
          {countdown !== null ? (
            <div className="text-center py-4">
              <div className="text-xs font-tech text-fuchsia-400 tracking-widest mb-1 animate-pulse">
                INICIALIZANDO SECUENCIA DE DESPLIEGUE...
              </div>
              <div className="text-6xl md:text-7xl font-warfare text-fuchsia-300 font-bold animate-ping">
                {countdown}
              </div>
            </div>
          ) : (
            <button
              onClick={handleStartDeploy}
              disabled={isDeploying}
              className="group relative px-8 md:px-14 py-4 md:py-5 bg-gradient-to-r from-purple-800 via-fuchsia-700 to-purple-800 hover:from-purple-700 hover:via-fuchsia-600 hover:to-purple-700 border-2 border-fuchsia-400 rounded-sm font-warfare text-2xl md:text-3xl text-purple-100 tracking-widest uppercase transition-all duration-300 cursor-pointer shadow-[0_0_30px_rgba(217,70,239,0.5)] hover:shadow-[0_0_45px_rgba(217,70,239,0.8)] hover:scale-[1.02] active:scale-[0.98] flex items-center gap-4"
            >
              {/* Corner reticle marks */}
              <span className="absolute top-1 left-1 text-[10px] font-tech text-fuchsia-300">⌜</span>
              <span className="absolute top-1 right-1 text-[10px] font-tech text-fuchsia-300">⌝</span>
              <span className="absolute bottom-1 left-1 text-[10px] font-tech text-fuchsia-300">⌞</span>
              <span className="absolute bottom-1 right-1 text-[10px] font-tech text-fuchsia-300">⌟</span>

              <Play className="w-6 h-6 text-fuchsia-300 fill-current group-hover:translate-x-1 transition-transform" />
              <span>DESPLEGAR MISIÓN TÁCTICA</span>
            </button>
          )}

          <p className="text-[11px] font-tech text-purple-400 mt-3 text-center">
            RECUERDA: TOTAL 100 PUNTOS (XP) // META DE EXTRACCIÓN: MÍNIMO 80 PUNTOS (XP)
          </p>
        </div>
      </div>
    </div>
  );
};
