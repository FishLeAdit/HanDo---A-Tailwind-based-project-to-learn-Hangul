'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FlashcardStep } from './FlashcardStep';
import { QuizStep } from './QuizStep';
import { ProgressBar } from './ProgressBar';
import { FeedbackSheet } from './FeedbackSheet';
import { LessonComplete } from './LessonComplete';
import { HeartsDisplay } from './HeartsDisplay';
import { useProgressStore } from '@/store/progress-store';
import type { Lesson, StepData } from '@/data/lesson-data';

const stepVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 60 : -60,
    opacity: 0,
  }),
};

export function LessonFlow({ lesson }: { lesson: Lesson }) {
  const [steps, setSteps] = useState<StepData[]>(lesson.steps);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [feedback, setFeedback] = useState<{
    type: 'correct' | 'incorrect';
    message: string;
  } | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [lessonMistakes, setLessonMistakes] = useState(0);
  const [lessonXp, setLessonXp] = useState(0);
  const [sessionMistakes, setSessionMistakes] = useState<Set<string>>(new Set());

  const loseHeart = useProgressStore((state) => state.loseHeart);
  const gainXp = useProgressStore((state) => state.gainXp);
  const resetHearts = useProgressStore((state) => state.resetHearts);
  const recordActivity = useProgressStore((state) => state.recordActivity);
  const recordQuizResult = useProgressStore((state) => state.recordQuizResult);

  const currentStep = steps[currentIndex];
  const totalSteps = steps.length;
  const progress =
    ((currentIndex + (feedback ? 1 : 0)) / totalSteps) * 100;

  const handleContinue = useCallback(() => {
    setFeedback(null);
    if (currentIndex < totalSteps - 1) {
      setDirection(1);
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Check if we need to add review steps for mistakes
      const missedChars = Array.from(sessionMistakes);
      if (missedChars.length > 0) {
        // Find the characters from hangulData
        const { hangulData } = require('@/data/hangul-data');
        const reviewSteps: StepData[] = missedChars
          .map((id) => hangulData.find((c: any) => c.id === id))
          .filter(Boolean)
          .map((char: any) => ({
            type: 'quiz' as const,
            character: char,
            isReview: true,
          }));

        if (reviewSteps.length > 0) {
          setSteps((prev) => [...prev, ...reviewSteps]);
          setSessionMistakes(new Set()); // Clear for next round
          setDirection(1);
          setCurrentIndex((prev) => prev + 1);
          return;
        }
      }

      // Truly complete
      const perfect = lessonMistakes === 0;
      const bonus = perfect ? 50 : 0;
      gainXp(lessonXp + bonus);
      resetHearts();
      recordActivity();
      setIsComplete(true);
    }
  }, [
    currentIndex,
    totalSteps,
    lessonMistakes,
    lessonXp,
    sessionMistakes,
    gainXp,
    resetHearts,
    recordActivity,
  ]);

  const handleQuizAnswer = useCallback(
    (isCorrect: boolean) => {
      const charId = currentStep.character.id;
      recordQuizResult(charId, isCorrect);

      if (isCorrect) {
        setLessonXp((prev) => prev + 10);
        setFeedback({ type: 'correct', message: 'Nicely done!' });
      } else {
        const currentHearts = useProgressStore.getState().hearts;
        if (currentHearts <= 1) {
          loseHeart();
          setIsFailed(true);
          return;
        }
        loseHeart();
        setLessonMistakes((prev) => prev + 1);
        setSessionMistakes((prev) => {
          const next = new Set(prev);
          next.add(charId);
          return next;
        });
        const correct =
          currentStep.type === 'quiz'
            ? currentStep.character.romanization
            : '';
        setFeedback({
          type: 'incorrect',
          message: `Correct answer: ${correct}`,
        });
      }
    },
    [currentStep, loseHeart, recordQuizResult]
  );

  const handleRestart = useCallback(() => {
    setSteps(lesson.steps);
    setCurrentIndex(0);
    setDirection(1);
    setFeedback(null);
    setIsComplete(false);
    setIsFailed(false);
    setLessonMistakes(0);
    setLessonXp(0);
    setSessionMistakes(new Set());
  }, [lesson.steps]);

  if (isFailed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center gap-6 text-center h-full px-4"
      >
        <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center">
          <span className="text-4xl">💔</span>
        </div>
        <h2 className="text-3xl font-bold text-white">Out of Hearts</h2>
        <p className="text-slate-400">You ran out of hearts. Try again!</p>
        <button
          onClick={handleRestart}
          className="px-6 py-3 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors"
        >
          Try Again
        </button>
      </motion.div>
    );
  }

  if (isComplete) {
    return (
      <LessonComplete
        lessonMistakes={lessonMistakes}
        lessonXp={lessonXp}
        onRestart={handleRestart}
      />
    );
  }

  return (
    <div className="w-full max-w-md mx-auto flex flex-col h-[100dvh]">
      {/* Top bar */}
      <div className="pt-6 pb-4 px-4 space-y-3">
        <div className="flex items-center justify-between">
          <button
            onClick={handleRestart}
            className="text-slate-400 hover:text-white text-sm"
          >
            ✕
          </button>
          <span className="text-slate-400 text-sm font-medium">
            {lesson.title}
          </span>
          <HeartsDisplay />
        </div>
        <ProgressBar progress={progress} />
      </div>

      {/* Step content */}
      <div className="flex-1 relative px-4">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="absolute inset-0 flex flex-col"
          >
            {currentStep.type === 'flashcard' ? (
              <FlashcardStep
                character={currentStep.character}
                isReview={currentStep.isReview}
                onContinue={handleContinue}
              />
            ) : (
              <QuizStep
                character={currentStep.character}
                isReview={currentStep.isReview}
                onAnswer={handleQuizAnswer}
                disabled={feedback !== null}
                wasWrong={feedback?.type === 'incorrect'}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Feedback sheet */}
      <AnimatePresence>
        {feedback && (
          <FeedbackSheet
            type={feedback.type}
            message={feedback.message}
            onContinue={handleContinue}
          />
        )}
      </AnimatePresence>
    </div>
  );
}