'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { HangulCharacter } from '@/data/hangul-data';

interface FlashcardStepProps {
  character: HangulCharacter;
  isReview?: boolean;
  onContinue: () => void;
}

export function FlashcardStep({ character, isReview, onContinue }: FlashcardStepProps) {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-full gap-8">
      <div className="flex-1 flex items-center justify-center w-full">
        <div
          className="relative w-full max-w-sm aspect-[3/4] cursor-pointer"
          onClick={() => setIsRevealed(!isRevealed)}
        >
          <AnimatePresence mode="wait">
            {!isRevealed ? (
              <motion.div
                key="front"
                initial={{ rotateY: -90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                exit={{ rotateY: 90, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="absolute inset-0"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <Card className="h-full border-2 border-slate-700 bg-slate-900 shadow-xl hover:border-slate-600 transition-colors">
                  <CardContent className="flex flex-col items-center justify-center h-full p-8">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-slate-400 text-sm font-medium uppercase tracking-widest">
                        {character.category}
                      </span>
                      {isReview && (
                        <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 text-xs font-bold rounded-full">
                          Review
                        </span>
                      )}
                    </div>
                    <span className="text-9xl font-bold text-white select-none">
                      {character.character}
                    </span>
                    <p className="text-slate-500 mt-8 text-sm">Tap to reveal</p>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                key="back"
                initial={{ rotateY: 90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                exit={{ rotateY: -90, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="absolute inset-0"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <Card className="h-full border-2 border-emerald-500/50 bg-slate-900 shadow-xl">
                  <CardContent className="flex flex-col items-center justify-center h-full p-8 text-center">
                    <span className="text-6xl font-bold text-emerald-400 mb-2">
                      {character.romanization}
                    </span>
                    <div className="w-12 h-1 bg-emerald-500/30 rounded-full mb-6" />
                    <p className="text-slate-300 text-lg leading-relaxed">
                      {character.tip}
                    </p>
                    <span className="text-4xl font-bold text-slate-700 mt-6 select-none">
                      {character.character}
                    </span>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <Button
        onClick={onContinue}
        className="w-full max-w-sm h-14 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-lg rounded-xl"
      >
        Continue
      </Button>
    </div>
  );
}