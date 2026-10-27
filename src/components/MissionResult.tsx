import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { RotateCcw, Award, Skull, Crosshair, ChevronDown, ChevronUp, BookOpen, AlertOctagon, CheckCircle2, XCircle } from 'lucide-react';
import { PlayerProfile, MissionStats } from '../types/game';
import { KEYBOARD_MISSIONS } from '../data/keyboardMissions';
import { CALLING_CARDS } from '../data/operatorData';
import { tacticalAudio } from '../utils/audio';

interface MissionResultProps {
  stats: MissionStats;
  player: PlayerProfile;
  onRestartMission: () => void;
  onOpenFieldManual: () => void;
}

export const MissionResult: React.FC<MissionResultProps> = ({
  stats,
  player,
  onRestartMission,
  onOpenFieldManual,
}) => {
  const isVictory = stats.scoreXP >= 80;
  const [showReview, setShowReview] = useState(false);

  useEffect(() => {
    if (isVictory) {
      tacticalAudio.playVictoryFanfare();
      // Neon purple confetti burst
      try {
        const colors = ['#a855f7', '#c084fc', '#e879f9', '#7e22ce', '#ffffff', '#d946ef'];
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors,
        });

        const timer = setTimeout(() => {
          confetti({
            particleCount: 60,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors,
          });
          confetti({
            particleCount: 60,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors,
          });
        }, 400);

        return () => clearTimeout(timer);
      } catch {
        // Fallback gracefully if confetti unavailable
      }
    } else {
      tacticalAudio.playDefeatDrone();
    }
  }, [isVictory]);

  const activeCard = CALLING_CARDS.find((c) => c.id === player.callingCard) || CALLING_CARDS[0];

  return (
    <div className={`relative min-h-[85vh] max-w-5xl mx-auto px-4 py-8 select-none ${
      !isVictory ? 'static-screen' : ''
    }`}>
      {/* Background Ambience */}
      {!isVictory && (
        <div className="absolute inset-0 bg-red-950/10 pointer-events-none rounded-lg" />
      )}

      {/* Main Result Dossier Card */}
      <div className={`tactical-box p-6 md:p-10 rounded-sm border ${
        isVictory
          ? 'border-fuchsia-500/80 bg-[#120724]/95 shadow-[0_0_50px_rgba(217,70,239,0.35)]'
          : 'border-red-900/80 bg-[#0c0414]/95 shadow-[0_0_40px_rgba(30,10,40,0.8)]'
      }`}>
        
        {/* Top Status Header */}
        <div className="text-center border-b border-purple-800/60 pb-6 mb-8">
          {isVictory ? (
            <div>
              {/* Victory Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-900/80 border border-fuchsia-400 text-xs font-tech text-fuchsia-300 uppercase tracking-widest mb-3 shadow-[0_0_15px_rgba(217,70,239,0.4)]">
                <Award className="w-4 h-4 text-fuchsia-400" />
                <span>INFORME DE MANDO // EXTRACCIÓN CONFIRMADA</span>
              </div>

              {/* Title: MISIÓN CUMPLIDA */}
              <h1 className="text-4xl md:text-6xl font-warfare text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-fuchsia-300 to-purple-100 tracking-widest uppercase mb-2">
                MISIÓN CUMPLIDA
              </h1>
              <div className="text-xl md:text-2xl font-tactical font-bold text-fuchsia-400 tracking-wide uppercase mb-3">
                VICTORIA TÁCTICA // OPERADOR ÉLITE EN TECLADOS
              </div>
              <p className="max-w-2xl mx-auto text-sm md:text-base font-tactical text-purple-200">
                ¡Enhorabuena, Operador <strong className="text-fuchsia-300">[{player.clanTag}] {player.callsign}</strong>! Has demostrado dominio balístico absoluto sobre switches, formatos y topología de teclados, asegurando la condecoración de rango máximo.
              </p>
            </div>
          ) : (
            <div>
              {/* Defeat Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-950/90 border border-red-700/80 text-xs font-tech text-red-300 uppercase tracking-widest mb-3">
                <Skull className="w-4 h-4 text-red-400" />
                <span>INFORME DE COMBATE // CERO EXTRACCIÓN</span>
              </div>

              {/* Title: MISIÓN FALLIDA */}
              <h1 className="text-4xl md:text-6xl font-warfare text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-purple-300 to-red-500 tracking-widest uppercase mb-2">
                MISIÓN FALLIDA
              </h1>
              <div className="text-xl md:text-2xl font-tactical font-bold text-red-400 tracking-wide uppercase mb-3">
                CERO EXTRACCIÓN // REAGRUPAMIENTO OBLIGATORIO
              </div>

              {/* Explicit Required Prompt Messaging */}
              <div className="max-w-2xl mx-auto p-4 bg-red-950/40 border border-red-800/60 rounded text-red-200 font-tactical text-sm md:text-base mb-4 leading-relaxed">
                <p className="font-bold text-red-300 mb-1">
                  TU ESCUADRÓN CAYÓ EN COMBATE.
                </p>
                <p className="text-purple-300/90 text-sm mb-3">
                  La inteligencia táctica sobre tipologías de teclados no fue descifrada a tiempo y la extracción fue denegada por no alcanzar el mínimo táctico de 80 XP.
                </p>
                <p className="font-tech text-xs tracking-wider uppercase text-fuchsia-300 font-bold bg-purple-950/80 py-1.5 px-3 border border-purple-700 rounded-xs">
                  Reagrupa a tu escuadrón e inténtalo de nuevo
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Tactical Performance Telemetry Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {/* Total XP */}
          <div className="bg-[#0e051c] p-4 rounded border border-purple-800/60 text-center">
            <span className="block text-[10px] font-tech text-purple-400 uppercase">PUNTAJE FINAL (XP)</span>
            <div className={`font-warfare text-4xl md:text-5xl ${
              isVictory ? 'text-fuchsia-300' : 'text-purple-300'
            }`}>
              {stats.scoreXP}
              <span className="text-sm font-tech text-purple-400 ml-1">/ 100</span>
            </div>
            <span className="text-[10px] font-tech text-purple-400">
              {stats.scoreXP >= 80 ? '✓ UMBRAL SUPERADO' : '✗ POR DEBAJO DE 80 XP'}
            </span>
          </div>

          {/* Precision % */}
          <div className="bg-[#0e051c] p-4 rounded border border-purple-800/60 text-center">
            <span className="block text-[10px] font-tech text-purple-400 uppercase">PRECISIÓN TÁCTICA</span>
            <div className="font-warfare text-4xl md:text-5xl text-purple-100">
              {Math.round((stats.correctAnswers / stats.totalQuestions) * 100)}%
            </div>
            <span className="text-[10px] font-tech text-purple-400">
              {stats.correctAnswers} DE {stats.totalQuestions} BAJAS
            </span>
          </div>

          {/* Killstreak */}
          <div className="bg-[#0e051c] p-4 rounded border border-purple-800/60 text-center">
            <span className="block text-[10px] font-tech text-purple-400 uppercase">MEJOR RACHA DE BAJAS</span>
            <div className="font-warfare text-4xl md:text-5xl text-fuchsia-400">
              x{stats.bestStreak}
            </div>
            <span className="text-[10px] font-tech text-purple-400">CONSECUTIVAS</span>
          </div>

          {/* Rank Title */}
          <div className="bg-[#0e051c] p-4 rounded border border-purple-800/60 text-center flex flex-col justify-between">
            <span className="block text-[10px] font-tech text-purple-400 uppercase">RANGO ALCANZADO</span>
            <div className="font-tactical font-bold text-xs md:text-sm text-fuchsia-300 uppercase py-1">
              {isVictory ? 'OPERADOR ÉLITE EN TECLADOS' : stats.scoreXP >= 50 ? 'CABO DE ASALTO' : 'RECLUTA DE CAMPO'}
            </div>
            <span className="text-[10px] font-tech text-purple-400">
              {isVictory ? 'PRESTIGIO MÁXIMO' : 'PENDIENTE DE ASALTO'}
            </span>
          </div>
        </div>

        {/* Calling Card Showcase */}
        <div className="mb-8">
          <div className="text-[10px] font-tech text-purple-400 tracking-wider uppercase mb-2">
            HOJA DE SERVICIO Y TARJETA DE VISITA:
          </div>
          <div className={`p-4 rounded-sm border bg-gradient-to-r ${activeCard.gradient} ${activeCard.borderColor} flex flex-wrap items-center justify-between gap-4 shadow-lg`}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded bg-purple-950/80 border border-fuchsia-400 flex items-center justify-center">
                <Crosshair className="w-7 h-7 text-fuchsia-300" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-tech text-xs bg-black/60 px-2 py-0.5 rounded text-fuchsia-300 border border-purple-500/50">
                    [{player.clanTag}]
                  </span>
                  <span className="font-tactical font-bold text-lg text-white uppercase tracking-wider">
                    {player.callsign}
                  </span>
                </div>
                <div className="text-xs font-tech text-purple-200 mt-0.5">
                  {isVictory ? 'OPERADOR ÉLITE EN TECLADOS // PRESTIGIO MAESTRO' : 'MISIÓN EN EVALUACIÓN // CERO EXTRACCIÓN'}
                </div>
              </div>
            </div>

            <div className="text-right">
              <span className="font-warfare text-2xl text-purple-100">{stats.scoreXP} XP</span>
              <div className="text-[10px] font-tech text-purple-300 uppercase">ORDEN DE SERVICIO #COD-KBD</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 border-t border-purple-800/60">
          {/* Prominent Retry Button */}
          <button
            onClick={() => {
              tacticalAudio.playRadioClick();
              onRestartMission();
            }}
            className={`w-full sm:w-auto px-8 py-3.5 rounded-sm font-warfare text-xl tracking-widest uppercase transition-all duration-300 cursor-pointer flex items-center justify-center gap-3 shadow-lg ${
              !isVictory
                ? 'bg-gradient-to-r from-red-800 via-purple-900 to-red-800 hover:from-red-700 hover:to-red-700 border-2 border-red-500 text-white shadow-[0_0_25px_rgba(239,68,68,0.5)] scale-105'
                : 'bg-gradient-to-r from-purple-800 via-fuchsia-700 to-purple-800 hover:from-purple-700 hover:via-fuchsia-600 border border-fuchsia-400 text-white shadow-[0_0_20px_rgba(217,70,239,0.4)]'
            }`}
          >
            <RotateCcw className="w-5 h-5" />
            <span>REINTENTAR MISIÓN</span>
          </button>

          {/* Toggle Intel Review */}
          <button
            onClick={() => {
              tacticalAudio.playHudBeep();
              setShowReview(!showReview);
            }}
            className="w-full sm:w-auto px-6 py-3 bg-[#150a26] hover:bg-purple-900/60 border border-purple-700/60 rounded-sm font-tactical text-xs text-purple-200 flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <AlertOctagon className="w-4 h-4 text-fuchsia-400" />
            <span>{showReview ? 'Ocultar Desglose de Objetivos' : 'Revisar Desglose Táctico de Preguntas'}</span>
            {showReview ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {/* Armory */}
          <button
            onClick={() => {
              tacticalAudio.playRadioClick();
              onOpenFieldManual();
            }}
            className="w-full sm:w-auto px-6 py-3 bg-[#150a26] hover:bg-purple-900/60 border border-purple-700/60 rounded-sm font-tactical text-xs text-purple-200 flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <BookOpen className="w-4 h-4 text-fuchsia-400" />
            <span>Consultar Armería de Teclados</span>
          </button>
        </div>

        {/* Collapsible Mission Review Section */}
        {showReview && (
          <div className="mt-8 pt-6 border-t border-purple-800/60 space-y-3 animate-in fade-in duration-300">
            <div className="text-xs font-tech text-purple-400 uppercase tracking-wider mb-2">
              DESCLASIFICACIÓN DE LOS 10 OBJETIVOS DE COMBATE:
            </div>

            {KEYBOARD_MISSIONS.map((mission) => {
              const answer = stats.userAnswers.find((a) => a.questionId === mission.id);
              const wasAnswered = !!answer;
              const isCorrect = answer?.isCorrect ?? false;

              return (
                <div
                  key={mission.id}
                  className={`p-3 rounded border text-xs font-tactical ${
                    isCorrect
                      ? 'bg-purple-950/40 border-purple-700/50 text-purple-200'
                      : 'bg-red-950/30 border-red-800/60 text-purple-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-tech font-bold text-fuchsia-300">
                      {mission.code}: {mission.title}
                    </span>
                    <span className="flex items-center gap-1 font-tech">
                      {isCorrect ? (
                        <span className="text-fuchsia-400 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> +10 XP
                        </span>
                      ) : (
                        <span className="text-red-400 font-bold flex items-center gap-1">
                          <XCircle className="w-3.5 h-3.5" /> 0 XP
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="text-purple-300/80 mb-1">
                    <strong className="text-purple-200">Respuesta Correcta: </strong>
                    {mission.options[mission.correctIndex].text}
                  </div>
                  <div className="text-[11px] font-tech text-purple-400/90 italic">
                    {mission.intelDebrief.summary}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
