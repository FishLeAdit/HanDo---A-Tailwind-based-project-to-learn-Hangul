import { hangulData, type HangulCharacter } from './hangul-data';

export interface FlashcardStepData {
  type: 'flashcard';
  character: HangulCharacter;
  isReview?: boolean;
}

export interface QuizStepData {
  type: 'quiz';
  character: HangulCharacter;
  isReview?: boolean;
}

export type StepData = FlashcardStepData | QuizStepData;

export interface Lesson {
  id: string;
  unitId: string;
  title: string;
  steps: StepData[];
}

function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function generateLesson(
  title: string,
  pool: HangulCharacter[],
  count: number = 4,
  options?: {
    weakIds?: string[];
    mastery?: Record<string, number>;
  }
): Lesson {
  const weakIds = options?.weakIds ?? [];
  const mastery = options?.mastery ?? {};

  // Prioritize weak characters, then low-mastery, then random
  const weakChars = pool.filter((c) => weakIds.includes(c.id));
  const otherChars = pool.filter((c) => !weakIds.includes(c.id));

  // Sort others by mastery (lowest first) so struggling chars appear more
  otherChars.sort((a, b) => (mastery[a.id] ?? 0) - (mastery[b.id] ?? 0));

  // Build selection: weak first, then fill with low-mastery/random
  let selected = [...weakChars];
  const needed = count - selected.length;
  if (needed > 0) {
    const shuffledOthers = shuffle(otherChars);
    selected = selected.concat(shuffledOthers.slice(0, needed));
  }

  // Shuffle the final selection so weak chars aren't always at the start
  selected = shuffle(selected);

  const steps: StepData[] = [];
  selected.forEach((char) => {
    steps.push({ type: 'flashcard', character: char });
    steps.push({ type: 'quiz', character: char });
  });

  return {
    id: `lesson-${Date.now()}`,
    unitId: 'unit-1',
    title,
    steps,
  };
}

// Keep sampleLesson for backward compatibility / testing
const firstFourConsonants = hangulData
  .filter((c) => c.category === 'consonant')
  .slice(0, 4);

export const sampleLesson: Lesson = {
  id: 'lesson-1',
  unitId: 'unit-1',
  title: 'First Consonants',
  steps: [
    { type: 'flashcard', character: firstFourConsonants[0] },
    { type: 'quiz', character: firstFourConsonants[0] },
    { type: 'flashcard', character: firstFourConsonants[1] },
    { type: 'quiz', character: firstFourConsonants[1] },
    { type: 'flashcard', character: firstFourConsonants[2] },
    { type: 'quiz', character: firstFourConsonants[2] },
    { type: 'flashcard', character: firstFourConsonants[3] },
    { type: 'quiz', character: firstFourConsonants[3] },
  ],
};