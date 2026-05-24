'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Flashcard } from '@/components/Flashcard';
import { hangulData } from '@/data/hangul-data';
import { Button } from '@/components/ui/button';

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 200 : -200,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 200 : -200,
    opacity: 0,
    scale: 0.95,
  }),
};

export default function Home() {
  const consonants = hangulData.filter((c) => c.category === 'consonant');
  const [[currentIndex, direction], setPage] = useState([0, 0]);

  const paginate = useCallback(
    (newDirection: number) => {
      setPage(([prev]) => {
        const next = prev + newDirection;
        if (next < 0 || next >= consonants.length) return [prev, 0];
        return [next, newDirection];
      });
    },
    [consonants.length]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') paginate(1);
      if (e.key === 'ArrowLeft') paginate(-1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [paginate]);

  const current = consonants[currentIndex];

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 gap-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-white">Hangul Dojo</h1>
        <p className="text-slate-400 text-sm">Version 0.2 — The Deck</p>
      </div>

      {/* Progress */}
      <div className="w-full max-w-sm space-y-2">
        <div className="flex justify-between text-sm text-slate-400">
          <span>Consonants</span>
          <span>
            {currentIndex + 1} / {consonants.length}
          </span>
        </div>
        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-emerald-500 rounded-full"
            initial={false}
            animate={{
              width: `${((currentIndex + 1) / consonants.length) * 100}%`,
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Card with animation */}
      <div className="relative w-full max-w-sm h-[580px]">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <Flashcard character={current} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => paginate(-1)}
          disabled={currentIndex === 0}
          className="border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 disabled:opacity-30"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>

        <span className="text-slate-500 text-sm font-medium min-w-[80px] text-center">
          {currentIndex + 1} / {consonants.length}
        </span>

        <Button
          variant="outline"
          size="icon"
          onClick={() => paginate(1)}
          disabled={currentIndex === consonants.length - 1}
          className="border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 disabled:opacity-30"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
    </main>
  );
}