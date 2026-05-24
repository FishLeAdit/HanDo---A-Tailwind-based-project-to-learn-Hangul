'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FlashcardStep } from './FlashcardStep';
import { QuizStep } from './QuizStep';
import { ProgressBar } from './ProgressBar';
import { FeedbackSheet } from './FeedbackSheet';
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [feedback, setFeedback] = useState<{
    type: 'correct' | 'incorrect';
    message: string;
    correctAnswer?: string;
  } | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  const currentStep = lesson.steps[currentIndex];
  const totalSteps = lesson.steps.length;
  const progress = ((currentIndex + (feedback ? 1 : 0)) / totalSteps) * 100;

  const handleContinue = useCallback(() => {
    setFeedback(null);
    if (currentIndex < totalSteps - 1) {
      setDirection(1);
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsComplete(true);
    }
  }, [currentIndex, totalSteps]);

  const handleQuizAnswer = useCallback(
    (isCorrect: boolean, selectedAnswer: string) => {
      if (isCorrect) {
        setFeedback({
          type: 'correct',
          message: 'Nicely done!',
        });
      } else {
        const correct = currentStep.type === 'quiz'
          ? currentStep.character.romanization
          : '';
        setFeedback({
          type: 'incorrect',
          message: `Correct answer: ${correct}`,
          correctAnswer: correct,
        });
      }
    },
    [currentStep]
  );

  if (isComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center gap-6 text-center"
      >
        <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center">
          <span className="text-4xl">🎉</span>
        </div>
        <h2 className="text-3xl font-bold text-white">Lesson Complete!</h2>
        <p className="text-slate-400">You mastered {totalSteps} steps.</p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors"
        >
          Start Over
        </button>
      </motion.div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto flex flex-col h-[100dvh]">
      {/* Top bar */}
      <div className="pt-6 pb-4 px-4 space-y-3">
        <div className="flex items-center justify-between">
          <button
            onClick={() => window.location.reload()}
            className="text-slate-400 hover:text-white text-sm"
          >
            ✕
          </button>
          <span className="text-slate-400 text-sm font-medium">{lesson.title}</span>
          <span className="text-slate-400 text-sm w-6" />
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
                onContinue={handleContinue}
              />
            ) : (
              <QuizStep
                character={currentStep.character}
                onAnswer={handleQuizAnswer}
                disabled={feedback !== null}
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