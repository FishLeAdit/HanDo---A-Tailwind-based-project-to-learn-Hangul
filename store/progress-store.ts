import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ProgressState {
  hearts: number;
  xp: number;
  streak: number;
  lastActiveDate: string | null;
  weakCharacters: string[];
  characterMastery: Record<string, number>;

  loseHeart: () => void;
  resetHearts: () => void;
  gainXp: (amount: number) => void;
  recordActivity: () => void;
  recordQuizResult: (characterId: string, isCorrect: boolean) => void;
}

function isYesterday(dateStr: string): boolean {
  const date = new Date(dateStr);
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return date.toDateString() === yesterday.toDateString();
}

function isToday(dateStr: string): boolean {
  return new Date(dateStr).toDateString() === new Date().toDateString();
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      hearts: 5,
      xp: 0,
      streak: 0,
      lastActiveDate: null,
      weakCharacters: [],
      characterMastery: {},

      loseHeart: () =>
        set((state) => ({ hearts: Math.max(0, state.hearts - 1) })),

      resetHearts: () => set({ hearts: 5 }),

      gainXp: (amount) => set((state) => ({ xp: state.xp + amount })),

      recordActivity: () => {
        const today = new Date().toDateString();
        const { lastActiveDate, streak } = get();

        if (!lastActiveDate) {
          set({ streak: 1, lastActiveDate: today });
        } else if (isToday(lastActiveDate)) {
          // Already active today — do nothing
        } else if (isYesterday(lastActiveDate)) {
          set({ streak: streak + 1, lastActiveDate: today });
        } else {
          // Streak broken
          set({ streak: 1, lastActiveDate: today });
        }
      },

      recordQuizResult: (characterId, isCorrect) => {
        set((state) => {
          const mastery = { ...state.characterMastery };
          const current = mastery[characterId] ?? 50;

          // Update mastery: +15 for correct, -20 for wrong, clamp 0-100
          mastery[characterId] = Math.max(0, Math.min(100, current + (isCorrect ? 15 : -20)));

          // Update weak characters list
          let weak = [...state.weakCharacters];
          if (!isCorrect) {
            if (!weak.includes(characterId)) {
              weak.push(characterId);
            }
          } else if (mastery[characterId] >= 80) {
            // Remove from weak if mastered
            weak = weak.filter((id) => id !== characterId);
          }

          return { characterMastery: mastery, weakCharacters: weak };
        });
      },
    }),
    {
      name: 'hangul-dojo-progress',
    }
  )
);