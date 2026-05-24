'use client';

import { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { hangulData, type HangulCharacter } from '@/data/hangul-data';

interface QuizStepProps {
  character: HangulCharacter;
  isReview?: boolean;
  onAnswer: (isCorrect: boolean, selected: string) => void;
  disabled: boolean;
  wasWrong?: boolean;
}

export function QuizStep({
  character,
  isReview,
  onAnswer,
  disabled,
  wasWrong,
}: QuizStepProps) {
  const [shake, setShake] = useState(false);

  useEffect(() => {
    if (wasWrong) {
      setShake(true);
      const timer = setTimeout(() => setShake(false), 400);
      return () => clearTimeout(timer);
    }
  }, [wasWrong]);

  const options = useMemo(() => {
    const sameCategory = hangulData.filter(
      (c) => c.category === character.category && c.id !== character.id
    );
    const shuffled = [...sameCategory].sort(() => Math.random() - 0.5);
    const wrongAnswers = shuffled.slice(0, 2).map((c) => c.romanization);
    const allOptions = [...wrongAnswers, character.romanization];
    // Remove duplicates just in case
    const unique = Array.from(new Set(allOptions));
    // If we lost one due to duplicate, grab another
    while (unique.length < 3 && shuffled.length > 2) {
      const extra = shuffled[unique.length]?.romanization;
      if (extra && !unique.includes(extra)) unique.push(extra);
      else break;
    }
    return unique.sort(() => Math.random() - 0.5);
  }, [character]);

  return (
    <motion.div
      animate={shake ? { x: [-8, 8, -6, 6, -4, 4, 0] } : {}}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center h-full gap-8"
    >
      <div className="flex-1 flex flex-col items-center justify-center w-full gap-6">
        <div className="flex items-center gap-2">
          <p className="text-slate-400 text-sm font-medium uppercase tracking-widest">
            What sound is this?
          </p>
          {isReview && (
            <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 text-xs font-bold rounded-full">
              Review
            </span>
          )}
        </div>

        <Card className="w-full max-w-sm border-2 border-slate-700 bg-slate-900 shadow-xl">
          <CardContent className="flex items-center justify-center py-16">
            <span className="text-9xl font-bold text-white select-none">
              {character.character}
            </span>
          </CardContent>
        </Card>

        <div className="w-full max-w-sm grid grid-cols-1 gap-3">
          {options.map((option, index) => (
            <motion.button
              key={`${character.id}-${option}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              onClick={() => onAnswer(option === character.romanization, option)}
              disabled={disabled}
              className="w-full h-14 bg-slate-800 border-2 border-slate-700 rounded-xl text-white font-semibold text-lg hover:bg-slate-700 hover:border-slate-500 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {option}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}