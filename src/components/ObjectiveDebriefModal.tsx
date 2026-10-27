import React from 'react';
import { ShieldCheck, AlertTriangle, ArrowRight, Award, FileText } from 'lucide-react';
import { TacticalQuestion } from '../types/game';
import { tacticalAudio } from '../utils/audio';

interface ObjectiveDebriefModalProps {
  question: TacticalQuestion;
  isCorrect: boolean;
  questionIndex: number;
  totalQuestions: number;
  onNextObjective: () => void;
}

export const ObjectiveDebriefModal: React.FC<ObjectiveDebriefModalProps> = ({
  question,
  isCorrect,
  questionIndex,
  totalQuestions,
  onNextObjective,
}) => {
  const isFinalObjective = questionIndex + 1 >= totalQuestions;

  return (
    <div className="max-w-4xl mx-auto px-4 mt-4 animate-in fade-in slide-in-from-bottom-3 duration-300">
      <div className={`tactical-box p-5 md:p-6 rounded-sm border ${
        isCorrect 
          ? 'border-fuchsia-500/80 bg-[#160829]/95 shadow-[0_0_25px_rgba(217,70,239,0.25)]' 
          : 'border-red-600/70 bg-[#18061a]/95 shadow-[0_0_25px_rgba(239,68,68,0.25)]'
      }`}>
        {/* Banner Result */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-purple-800/60 pb-3 mb-4">
          <div className="flex items-center gap-3">
            {isCorrect ? (
              <div className="w-10 h-10 rounded-sm bg-fuchsia-950 border border-fuchsia-400 flex items-center justify-center text-fuchsia-300 shadow-[0_0_12px_rgba(217,70,239,0.5)]">
                <ShieldCheck className="w-6 h-6" />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-sm bg-red-950 border border-red-500 flex items-center justify-center text-red-400">
                <AlertTriangle className="w-6 h-6" />
              </div>
            )}

            <div>
              <div className="font-warfare text-2xl tracking-wider uppercase flex items-center gap-2">
                {isCorrect ? (
                  <span className="text-fuchsia-300">¡OBJETIVO COMPLETADO // BAJA CONFIRMADA!</span>
                ) : (
                  <span className="text-red-400">¡ALERTA TÁCTICA // OBJETIVO NO ABATIDO!</span>
                )}
              </div>
              <div className="text-xs font-tech text-purple-300">
                {isCorrect ? 'Inteligencia descifrada con éxito. +10 XP sumados a tu hoja de servicio.' : 'Respuesta errónea. El blanco evadió el protocolo.'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 font-tech font-bold text-xs rounded border uppercase ${
              isCorrect
                ? 'bg-fuchsia-900/60 text-fuchsia-200 border-fuchsia-400 shadow-[0_0_10px_rgba(217,70,239,0.3)]'
                : 'bg-red-950/60 text-red-300 border-red-600'
            }`}>
              {isCorrect ? '+10 PUNTOS (XP)' : '0 PUNTOS (XP)'}
            </span>
          </div>
        </div>

        {/* Debrief Technical Explanation */}
        <div className="mb-4">
          <div className="flex items-center gap-2 text-xs font-tactical font-bold text-fuchsia-300 mb-1">
            <FileText className="w-3.5 h-3.5" />
            <span>{question.intelDebrief.title}</span>
          </div>
          <p className="text-xs md:text-sm font-tactical text-purple-200 leading-relaxed bg-[#0b0414] p-3 rounded border border-purple-800/40">
            {question.intelDebrief.summary}
          </p>
        </div>

        {/* Technical Specs Table */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
          {question.intelDebrief.technicalSpecs.map((spec, i) => (
            <div key={i} className="bg-[#0e061c] p-2 rounded border border-purple-900/60">
              <div className="text-[10px] font-tech text-purple-400 uppercase truncate">{spec.label}</div>
              <div className="text-xs font-tactical font-bold text-purple-100 truncate">{spec.value}</div>
            </div>
          ))}
        </div>

        {/* Tactical Key Takeaway */}
        <div className="text-xs font-tech text-purple-300/90 mb-5 border-l-2 border-fuchsia-400 pl-3 py-1">
          <strong className="text-fuchsia-400">LECCIÓN TÁCTICA: </strong>
          {question.intelDebrief.tacticalTakeaway}
        </div>

        {/* Action Button to Next Objective */}
        <div className="flex justify-end pt-2 border-t border-purple-900/60">
          <button
            onClick={() => {
              tacticalAudio.playRadioClick();
              onNextObjective();
            }}
            className="px-6 py-2.5 bg-gradient-to-r from-purple-800 to-fuchsia-700 hover:from-purple-700 hover:to-fuchsia-600 border border-fuchsia-400 rounded-sm font-warfare text-lg text-purple-100 tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(217,70,239,0.4)]"
          >
            <span>{isFinalObjective ? 'VER REPORTE FINAL DE MISIÓN' : 'SIGUIENTE OBJETIVO TÁCTICO'}</span>
            <ArrowRight className="w-4 h-4 text-fuchsia-300" />
          </button>
        </div>
      </div>
    </div>
  );
};
