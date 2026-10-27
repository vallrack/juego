export type MissionCategory = 
  | 'SWITCHES' 
  | 'FORMATOS' 
  | 'DISTRIBUCIÓN' 
  | 'COMPONENTES' 
  | 'TECNOLOGÍA_AVANZADA';

export interface TacticalQuestion {
  id: number;
  code: string;
  sector: string;
  category: MissionCategory;
  categoryLabel: string;
  title: string;
  intelBrief: string; // The tactical scenario / question
  options: {
    letter: 'A' | 'B' | 'C' | 'D';
    text: string;
    subtext?: string;
  }[];
  correctIndex: number;
  xpValue: number; // 10 XP
  intelDebrief: {
    title: string;
    summary: string;
    tacticalTakeaway: string;
    technicalSpecs: { label: string; value: string }[];
  };
}

export type GameStage = 
  | 'BRIEFING'          // Pre-game lobby
  | 'ACTIVE_MISSION'    // Answering question
  | 'OBJECTIVE_DEBRIEF' // Showing explanation after answer
  | 'DEBRIEF_SUMMARY';  // Final score screen (Victory / Defeat)

export interface PlayerProfile {
  callsign: string;
  clanTag: string;
  callingCard: string;
  rankTitle: string;
}

export interface MissionStats {
  scoreXP: number; // Max 100
  totalQuestions: number;
  answeredCount: number;
  correctAnswers: number;
  currentStreak: number;
  bestStreak: number;
  userAnswers: {
    questionId: number;
    selectedOption: number;
    isCorrect: boolean;
    timeTakenSeconds: number;
  }[];
}
