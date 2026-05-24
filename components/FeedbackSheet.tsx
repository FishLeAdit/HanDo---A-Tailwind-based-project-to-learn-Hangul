'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FeedbackSheetProps {
  type: 'correct' | 'incorrect';
  message: string;
  onContinue: () => void;
}

export function FeedbackSheet({ type, message, onContinue }: FeedbackSheetProps) {
  const isCorrect = type === 'correct';

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className={`absolute bottom-0 left-0 right-0 p-4 pb-8 border-t-2 ${
        isCorrect
          ? 'bg-emerald-950/90 border-emerald-500'
          : 'bg-red-950/90 border-red-500'
      } backdrop-blur-sm`}
    >
      <div className="max-w-md mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          {isCorrect ? (
            <CheckCircle2 className="w-8 h-8 text-emerald-400" />
          ) : (
            <XCircle className="w-8 h-8 text-red-400" />
          )}
          <div>
            <p
              className={`font-bold text-lg ${
                isCorrect ? 'text-emerald-400' : 'text-red-400'
              }`}
            >
              {isCorrect ? 'Nice!' : 'Not quite'}
            </p>
            <div className="flex items-center gap-2">
              <p className="text-slate-300 text-sm">{message}</p>
              {!isCorrect && (
                <motion.span
                  initial={{ scale: 1.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex items-center gap-0.5 text-red-400 text-xs font-bold"
                >
                  <Heart className="w-3 h-3 fill-red-400" />
                  -1
                </motion.span>
              )}
            </div>
          </div>
        </div>

        <Button
          onClick={onContinue}
          className={`h-12 px-6 font-bold rounded-xl ${
            isCorrect
              ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
              : 'bg-red-500 hover:bg-red-600 text-white'
          }`}
        >
          Continue
        </Button>
      </div>
    </motion.div>
  );
}