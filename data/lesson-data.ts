import { hangulData, type HangulCharacter } from './hangul-data';

export interface FlashcardStepData {
  type: 'flashcard';
  character: HangulCharacter;
}

export interface QuizStepData {
  type: 'quiz';
  character: HangulCharacter;
}

export type StepData = FlashcardStepData | QuizStepData;

export interface Lesson {
  id: string;
  unitId: string;
  title: string;
  steps: StepData[];
}

// Build a sample lesson: flashcard then quiz for first 4 consonants
const firstFourConsonants = hangulData.filter((c) => c.category === 'consonant').slice(0, 4);

export const sampleLesson: Lesson = {
  id: 'lesson-1',
  unitId: 'unit-1',
  title: 'First Consonants',
  steps: [
    { type: 'flashcard', character: firstFourConsonants[0] }, // ㄱ
    { type: 'quiz', character: firstFourConsonants[0] },     // quiz on ㄱ
    { type: 'flashcard', character: firstFourConsonants[1] }, // ㄴ
    { type: 'quiz', character: firstFourConsonants[1] },     // quiz on ㄴ
    { type: 'flashcard', character: firstFourConsonants[2] }, // ㄷ
    { type: 'quiz', character: firstFourConsonants[2] },     // quiz on ㄷ
    { type: 'flashcard', character: firstFourConsonants[3] }, // ㄹ
    { type: 'quiz', character: firstFourConsonants[3] },     // quiz on ㄹ
  ],
};