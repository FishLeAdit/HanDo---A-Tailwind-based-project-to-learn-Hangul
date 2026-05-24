'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RotateCw } from 'lucide-react';
import type { HangulCharacter } from '@/data/hangul-data';

interface FlashcardProps {
  character: HangulCharacter;
}

export function Flashcard({ character }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-sm mx-auto">
      <div 
        className="relative w-full aspect-[3/4] cursor-pointer" 
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <AnimatePresence mode="wait">
          {!isFlipped ? (
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
                  <span className="text-slate-400 text-sm font-medium uppercase tracking-widest mb-4">
                    {character.category}
                  </span>
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

      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsFlipped(!isFlipped)}
        className="border-slate-700 text-slate-400 hover:text-white hover:border-slate-500"
      >
        <RotateCw className="w-4 h-4 mr-2" />
        {isFlipped ? 'Show front' : 'Show back'}
      </Button>
    </div>
  );
}