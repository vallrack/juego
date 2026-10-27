import React, { useState } from 'react';
import { X, BookOpen, Layers, Zap, Shield, Sliders } from 'lucide-react';
import { FIELD_MANUAL_TOPICS } from '../data/operatorData';
import { tacticalAudio } from '../utils/audio';

interface FieldManualModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FieldManualModal: React.FC<FieldManualModalProps> = ({ isOpen, onClose }) => {
  const [selectedTopicId, setSelectedTopicId] = useState(FIELD_MANUAL_TOPICS[0].id);

  if (!isOpen) return null;

  const currentTopic = FIELD_MANUAL_TOPICS.find((t) => t.id === selectedTopicId) || FIELD_MANUAL_TOPICS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md select-none animate-in fade-in duration-200">
      {/* Modal Box */}
      <div className="tactical-box w-full max-w-4xl max-h-[90vh] bg-[#0e061c] border-2 border-purple-600/80 rounded-sm shadow-[0_0_40px_rgba(147,51,234,0.35)] flex flex-col overflow-hidden">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-purple-800/80 bg-[#140826]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-sm bg-purple-950 border border-fuchsia-400 flex items-center justify-center text-fuchsia-300">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-warfare text-xl md:text-2xl text-purple-100 tracking-wider">
                ARMERÍA Y MANUAL DE CAMPO TÁCTICO
              </h3>
              <div className="text-[10px] font-tech text-purple-400">
                INTELIGENCIA DESCLASIFICADA SOBRE ARQUITECTURA DE TECLADOS
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              tacticalAudio.playRadioClick();
              onClose();
            }}
            className="p-1.5 rounded bg-purple-950 hover:bg-purple-900 text-purple-300 hover:text-fuchsia-300 border border-purple-700 cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
          {/* Left Navigation Topics */}
          <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-purple-800/80 bg-[#090314] p-3 space-y-2 overflow-y-auto">
            <div className="text-[10px] font-tech text-purple-400 uppercase tracking-widest px-2 py-1">
              SECTORES TÉCNICOS:
            </div>
            {FIELD_MANUAL_TOPICS.map((topic) => {
              const isSelected = selectedTopicId === topic.id;
              return (
                <button
                  key={topic.id}
                  onClick={() => {
                    tacticalAudio.playHudBeep();
                    setSelectedTopicId(topic.id);
                  }}
                  className={`w-full text-left p-2.5 rounded border text-xs font-tactical transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-purple-900/70 border-fuchsia-400 text-fuchsia-200 shadow-[0_0_10px_rgba(217,70,239,0.3)]'
                      : 'bg-purple-950/30 border-purple-900/60 text-purple-300 hover:border-purple-700 hover:bg-purple-950'
                  }`}
                >
                  <div className="font-bold">{topic.title}</div>
                  <div className="text-[9px] font-tech text-purple-400 mt-0.5">{topic.badge}</div>
                </button>
              );
            })}
          </div>

          {/* Right Topic Detail */}
          <div className="flex-1 p-6 overflow-y-auto bg-[#100622]">
            <div className="mb-4">
              <span className="inline-block px-2.5 py-0.5 rounded bg-fuchsia-950 text-fuchsia-300 border border-fuchsia-500/60 font-tech text-[10px] uppercase tracking-wider mb-2">
                {currentTopic.badge}
              </span>
              <h4 className="font-tactical font-bold text-xl text-purple-100">
                {currentTopic.title}
              </h4>
              <p className="text-sm font-tactical text-purple-300/90 mt-1">
                {currentTopic.summary}
              </p>
            </div>

            {/* Tactical Intel Bullet Points */}
            <div className="space-y-3 bg-[#0a0417] p-4 rounded border border-purple-800/60 mb-6">
              <div className="text-xs font-tech text-purple-400 uppercase tracking-wider mb-1">
                INFORME DETALLADO:
              </div>
              {currentTopic.bullets.map((bullet, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs md:text-sm font-tactical text-purple-200">
                  <span className="text-fuchsia-400 font-tech font-bold">▶</span>
                  <span>{bullet}</span>
                </div>
              ))}
            </div>

            {/* Quick Switch Visual Comparison Matrix if on Switches */}
            {selectedTopicId === 'switches' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-red-950/30 border border-red-800/60 rounded">
                  <div className="font-tactical font-bold text-red-300 text-xs">Switch Lineal (Rojo)</div>
                  <div className="text-[11px] font-tech text-purple-300 mt-1">Cero bache, recorrido continuo de 45g. Máxima velocidad de respuesta.</div>
                </div>
                <div className="p-3 bg-amber-950/30 border border-amber-800/60 rounded">
                  <div className="font-tactical font-bold text-amber-300 text-xs">Switch Táctil (Marrón)</div>
                  <div className="text-[11px] font-tech text-purple-300 mt-1">Bache perceptible a 2mm. Confirma la pulsación sin hacer ruido estridente.</div>
                </div>
                <div className="p-3 bg-blue-950/30 border border-blue-800/60 rounded">
                  <div className="font-tactical font-bold text-blue-300 text-xs">Switch Clicky (Azul)</div>
                  <div className="text-[11px] font-tech text-purple-300 mt-1">Resonancia metálica acústica en cada pulsación. Máximo feedback sonoro.</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-purple-800/80 bg-[#120626] flex items-center justify-between text-xs font-tech text-purple-400">
          <span>SISTEMA TÁCTICO KEYSTRIKE // VERSIÓN 4.2</span>
          <button
            onClick={() => {
              tacticalAudio.playRadioClick();
              onClose();
            }}
            className="px-4 py-1.5 bg-purple-900 hover:bg-purple-800 border border-purple-600 rounded text-purple-100 font-tactical cursor-pointer"
          >
            Cerrar Manual
          </button>
        </div>
      </div>
    </div>
  );
};
