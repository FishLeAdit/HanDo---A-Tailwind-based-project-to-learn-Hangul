'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { hangulData, type HangulCharacter } from '@/data/hangul-data';

interface QuizStepProps {
  character: HangulCharacter;
  onAnswer: (isCorrect: boolean, selected: string) => void;
  disabled: boolean;
}

export function QuizStep({ character, onAnswer, disabled }: QuizStepProps) {
  const options = useMemo(() => {
    // Get 2 random wrong answers from same category
    const sameCategory = hangulData.filter(
      (c) => c.category === character.category && c.id !== character.id
    );
    const shuffled = [...sameCategory].sort(() => Math.random() - 0.5);
    const wrongAnswers = shuffled.slice(0, 2).map((c) => c.romanization);
    const allOptions = [...wrongAnswers, character.romanization];
    return allOptions.sort(() => Math.random() - 0.5);
  }, [character]);

  return (
    <div className="flex flex-col items-center justify-center h-full gap-8">
      <div className="flex-1 flex flex-col items-center justify-center w-full gap-6">
        <p className="text-slate-400 text-sm font-medium uppercase tracking-widest">
          What sound is this?
        </p>

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
    </div>
  );
}