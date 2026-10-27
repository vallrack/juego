import React, { useState } from 'react';
import { Crosshair, Target, ShieldCheck, Zap } from 'lucide-react';
import { TacticalQuestion } from '../types/game';
import { tacticalAudio } from '../utils/audio';

interface TacticalQuestionCardProps {
  question: TacticalQuestion;
  questionIndex: number;
  totalQuestions: number;
  onSelectOption: (optionIndex: number) => void;
  isDebriefing: boolean;
  selectedOptionIndex: number | null;
}

export const TacticalQuestionCard: React.FC<TacticalQuestionCardProps> = ({
  question,
  questionIndex,
  totalQuestions,
  onSelectOption,
  isDebriefing,
  selectedOptionIndex,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleOptionClick = (idx: number) => {
    if (isDebriefing) return;
    tacticalAudio.playHitmarker();
    onSelectOption(idx);
  };

  return (
    <div className="relative max-w-4xl mx-auto px-4 py-6 select-none">
      {/* Tactical HUD Target Box */}
      <div className="tactical-box p-6 md:p-8 rounded-sm border border-purple-700/60 shadow-[0_0_30px_rgba(88,28,135,0.3)] relative overflow-hidden">
        {/* Animated Scanner Laser Line */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-fuchsia-400 to-transparent opacity-40 animate-pulse pointer-events-none" />

        {/* Header Telemetry */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-purple-800/60 pb-3 mb-5">
          <div className="flex items-center gap-2">
            <span className="font-tech text-xs text-fuchsia-400 font-bold px-2 py-0.5 bg-purple-950 border border-purple-600/80 rounded-xs">
              {question.code}
            </span>
            <span className="text-xs font-tech text-purple-300 uppercase tracking-widest">
              {question.sector}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] font-tech text-purple-400 flex items-center gap-1">
              <Target className="w-3.5 h-3.5 text-fuchsia-400" />
              OBJETIVO {questionIndex + 1}/{totalQuestions}
            </span>
            <span className="px-2 py-0.5 bg-fuchsia-950 text-fuchsia-300 font-tech font-bold text-xs border border-fuchsia-500/80 rounded shadow-[0_0_8px_rgba(217,70,239,0.4)]">
              +{question.xpValue} XP
            </span>
          </div>
        </div>

        {/* Category Pill & Title */}
        <div className="mb-4">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-900/60 border border-purple-600/50 text-[10px] font-tech text-purple-200 uppercase tracking-wider mb-2">
            <Zap className="w-3 h-3 text-fuchsia-400" />
            {question.categoryLabel}
          </div>
          <h2 className="text-xl md:text-2xl font-tactical font-bold text-purple-100 tracking-wide">
            {question.title}
          </h2>
        </div>

        {/* Tactical Scenario / Intel Brief */}
        <div className="bg-[#0e051c]/95 border-l-4 border-fuchsia-500 p-4 rounded-r mb-6 shadow-inner">
          <div className="text-[10px] font-tech text-purple-400 mb-1 flex items-center gap-1">
            <span className="text-fuchsia-400 font-bold">▶</span>
            <span>TRANSMISIÓN DE INTELIGENCIA DE CAMPO:</span>
          </div>
          <p className="text-sm md:text-base font-tactical text-purple-200 leading-relaxed">
            {question.intelBrief}
          </p>
        </div>

        {/* 4 Target Response Options */}
        <div className="space-y-3">
          <div className="text-[10px] font-tech text-purple-400 tracking-wider uppercase mb-1">
            SELECCIONA CONTRAMEDIDA O PROTOCOLO TÁCTICO:
          </div>

          {question.options.map((option, idx) => {
            const isSelected = selectedOptionIndex === idx;
            const isCorrect = idx === question.correctIndex;
            const isHovered = hoveredIndex === idx;

            let buttonStyle = 'bg-[#130726]/85 border-purple-800/60 text-purple-200 hover:border-purple-500 hover:bg-purple-900/40';

            if (isDebriefing) {
              if (isCorrect) {
                buttonStyle = 'bg-fuchsia-950/90 border-fuchsia-400 text-fuchsia-100 shadow-[0_0_15px_rgba(217,70,239,0.5)]';
              } else if (isSelected && !isCorrect) {
                buttonStyle = 'bg-red-950/80 border-red-500 text-red-200';
              } else {
                buttonStyle = 'bg-[#0d041a]/60 border-purple-950/60 text-purple-500 opacity-60';
              }
            } else if (isSelected) {
              buttonStyle = 'bg-purple-800/80 border-fuchsia-400 text-fuchsia-200 shadow-[0_0_12px_rgba(217,70,239,0.4)]';
            }

            return (
              <button
                key={option.letter}
                onClick={() => handleOptionClick(idx)}
                onMouseEnter={() => {
                  if (!isDebriefing) {
                    setHoveredIndex(idx);
                    tacticalAudio.playHudBeep();
                  }
                }}
                onMouseLeave={() => setHoveredIndex(null)}
                disabled={isDebriefing}
                className={`w-full text-left p-3.5 md:p-4 rounded-sm border transition-all duration-200 cursor-pointer relative group flex items-start gap-3.5 ${buttonStyle}`}
              >
                {/* Target Acquisition Letter Box */}
                <div className={`w-8 h-8 rounded-sm font-warfare text-xl flex items-center justify-center shrink-0 border transition-colors ${
                  isDebriefing && isCorrect
                    ? 'bg-fuchsia-600 text-white border-fuchsia-300'
                    : isDebriefing && isSelected && !isCorrect
                    ? 'bg-red-700 text-white border-red-400'
                    : isSelected || isHovered
                    ? 'bg-purple-700 text-fuchsia-200 border-fuchsia-400 shadow-[0_0_8px_rgba(217,70,239,0.5)]'
                    : 'bg-purple-950 text-purple-300 border-purple-700/80'
                }`}>
                  {option.letter}
                </div>

                {/* Option Text and Subtext */}
                <div className="flex-1">
                  <div className="font-tactical font-semibold text-sm md:text-base leading-snug">
                    {option.text}
                  </div>
                  {option.subtext && (
                    <div className="text-xs font-tech text-purple-400 mt-0.5">
                      {option.subtext}
                    </div>
                  )}
                </div>

                {/* Tactical Status Icon */}
                <div className="shrink-0 pt-1">
                  {isDebriefing ? (
                    isCorrect ? (
                      <span className="flex items-center gap-1 text-xs font-tech text-fuchsia-300 font-bold">
                        <ShieldCheck className="w-5 h-5 text-fuchsia-400" />
                        CORRECTO
                      </span>
                    ) : isSelected ? (
                      <span className="text-xs font-tech text-red-400 font-bold">
                        INCORRECTO
                      </span>
                    ) : null
                  ) : (
                    <Crosshair className={`w-4 h-4 transition-transform ${
                      isHovered ? 'text-fuchsia-400 rotate-90 scale-110' : 'text-purple-600'
                    }`} />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
