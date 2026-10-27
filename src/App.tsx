/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { GameStage, PlayerProfile, MissionStats } from './types/game';
import { KEYBOARD_MISSIONS } from './data/keyboardMissions';
import { TacticalHUDHeader } from './components/TacticalHUDHeader';
import { MissionBriefing } from './components/MissionBriefing';
import { TacticalQuestionCard } from './components/TacticalQuestionCard';
import { ObjectiveDebriefModal } from './components/ObjectiveDebriefModal';
import { MissionResult } from './components/MissionResult';
import { FieldManualModal } from './components/FieldManualModal';
import { HitmarkerOverlay } from './components/HitmarkerOverlay';
import { tacticalAudio } from './utils/audio';

export default function App() {
  const [stage, setStage] = useState<GameStage>('BRIEFING');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [isDebriefing, setIsDebriefing] = useState<boolean>(false);
  const [isFieldManualOpen, setIsFieldManualOpen] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Hitmarker feedback state
  const [hitmarker, setHitmarker] = useState<{
    show: boolean;
    type: 'hit' | 'kill' | 'miss';
    text?: string;
  }>({ show: false, type: 'hit' });

  // Player Profile
  const [player, setPlayer] = useState<PlayerProfile>({
    callsign: 'GHOST-1',
    clanTag: '141',
    callingCard: 'dark-matter',
    rankTitle: 'OPERADOR DE CAMPO',
  });

  // Mission Stats
  const [stats, setStats] = useState<MissionStats>({
    scoreXP: 0,
    totalQuestions: KEYBOARD_MISSIONS.length,
    answeredCount: 0,
    correctAnswers: 0,
    currentStreak: 0,
    bestStreak: 0,
    userAnswers: [],
  });

  const handleUpdatePlayer = (updated: Partial<PlayerProfile>) => {
    setPlayer((prev) => ({ ...prev, ...updated }));
  };

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    tacticalAudio.setMuted(nextMuted);
  };

  const handleDeployMission = () => {
    setStats({
      scoreXP: 0,
      totalQuestions: KEYBOARD_MISSIONS.length,
      answeredCount: 0,
      correctAnswers: 0,
      currentStreak: 0,
      bestStreak: 0,
      userAnswers: [],
    });
    setCurrentQuestionIndex(0);
    setSelectedOptionIndex(null);
    setIsDebriefing(false);
    setStage('ACTIVE_MISSION');
  };

  const handleSelectOption = (optionIndex: number) => {
    if (isDebriefing) return;

    setSelectedOptionIndex(optionIndex);
    setIsDebriefing(true);

    const currentQ = KEYBOARD_MISSIONS[currentQuestionIndex];
    const isCorrect = optionIndex === currentQ.correctIndex;

    // Trigger audio & visual hitmarker
    if (isCorrect) {
      tacticalAudio.playBajaConfirmada();
      setHitmarker({
        show: true,
        type: 'kill',
        text: `+${currentQ.xpValue} XP // BAJA CONFIRMADA`,
      });
    } else {
      tacticalAudio.playMissionAlarm();
      setHitmarker({
        show: true,
        type: 'miss',
        text: 'ALERTA TÁCTICA // TIRO FALLIDO',
      });
    }

    // Dismiss hitmarker after 400ms
    setTimeout(() => {
      setHitmarker((prev) => ({ ...prev, show: false }));
    }, 450);

    // Update stats
    setStats((prev) => {
      const newScore = isCorrect ? prev.scoreXP + currentQ.xpValue : prev.scoreXP;
      const newStreak = isCorrect ? prev.currentStreak + 1 : 0;
      const newBestStreak = Math.max(prev.bestStreak, newStreak);
      const newCorrect = isCorrect ? prev.correctAnswers + 1 : prev.correctAnswers;

      return {
        ...prev,
        scoreXP: newScore,
        answeredCount: prev.answeredCount + 1,
        correctAnswers: newCorrect,
        currentStreak: newStreak,
        bestStreak: newBestStreak,
        userAnswers: [
          ...prev.userAnswers,
          {
            questionId: currentQ.id,
            selectedOption: optionIndex,
            isCorrect,
            timeTakenSeconds: 0,
          },
        ],
      };
    });
  };

  const handleNextObjective = () => {
    if (currentQuestionIndex + 1 < KEYBOARD_MISSIONS.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOptionIndex(null);
      setIsDebriefing(false);
    } else {
      // Mission Complete! Transition to evaluation screen
      setStage('DEBRIEF_SUMMARY');
    }
  };

  const handleRestartMission = () => {
    handleDeployMission();
  };

  const currentQuestion = KEYBOARD_MISSIONS[currentQuestionIndex];
  const lastAnswer = stats.userAnswers[stats.userAnswers.length - 1];
  const isLastAnswerCorrect = lastAnswer?.isCorrect ?? false;

  return (
    <div className="min-h-screen bg-[#08040f] text-purple-100 tactical-camo-bg relative flex flex-col justify-between overflow-x-hidden">
      {/* Tactical scanlines overlay */}
      <div className="fixed inset-0 scanlines z-30 pointer-events-none" />

      {/* Hitmarker Flash Overlay */}
      <HitmarkerOverlay
        show={hitmarker.show}
        type={hitmarker.type}
        text={hitmarker.text}
      />

      {/* Main HUD Header */}
      <TacticalHUDHeader
        scoreXP={stats.scoreXP}
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={KEYBOARD_MISSIONS.length}
        streak={stats.currentStreak}
        player={player}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onOpenFieldManual={() => setIsFieldManualOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full relative z-20 py-4 md:py-8">
        {stage === 'BRIEFING' && (
          <MissionBriefing
            player={player}
            onUpdatePlayer={handleUpdatePlayer}
            onDeployMission={handleDeployMission}
            onOpenFieldManual={() => setIsFieldManualOpen(true)}
          />
        )}

        {stage === 'ACTIVE_MISSION' && currentQuestion && (
          <div className="animate-in fade-in duration-300">
            <TacticalQuestionCard
              question={currentQuestion}
              questionIndex={currentQuestionIndex}
              totalQuestions={KEYBOARD_MISSIONS.length}
              onSelectOption={handleSelectOption}
              isDebriefing={isDebriefing}
              selectedOptionIndex={selectedOptionIndex}
            />

            {/* If debriefing after answering */}
            {isDebriefing && (
              <ObjectiveDebriefModal
                question={currentQuestion}
                isCorrect={isLastAnswerCorrect}
                questionIndex={currentQuestionIndex}
                totalQuestions={KEYBOARD_MISSIONS.length}
                onNextObjective={handleNextObjective}
              />
            )}
          </div>
        )}

        {stage === 'DEBRIEF_SUMMARY' && (
          <MissionResult
            stats={stats}
            player={player}
            onRestartMission={handleRestartMission}
            onOpenFieldManual={() => setIsFieldManualOpen(true)}
          />
        )}
      </main>

      {/* Field Manual & Armory Modal */}
      <FieldManualModal
        isOpen={isFieldManualOpen}
        onClose={() => setIsFieldManualOpen(false)}
      />

      {/* Tactical Footer Telemetry */}
      <footer className="w-full bg-[#0a0514]/90 border-t border-purple-950 py-3 px-4 z-20 select-none">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-[11px] font-tech text-purple-400/70 gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-500 inline-block" />
            <span>OPERACIÓN: KEYSTRIKE // PROTOCOLO DE ENTRENAMIENTO DE COMBATE</span>
          </div>
          <div className="text-center sm:text-right">
            <span>TIPOLOGÍAS DE TECLADOS DE COMPUTADORA // ESTÉTICA MILITAR CALL OF DUTY</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
