'use client';

import { motion } from 'framer-motion';
import { Star, Flame, RotateCcw } from 'lucide-react';
import { useProgressStore } from '@/store/progress-store';

interface LessonCompleteProps {
  lessonMistakes: number;
  lessonXp: number;
  onRestart: () => void;
}

export function LessonComplete({
  lessonMistakes,
  lessonXp,
  onRestart,
}: LessonCompleteProps) {
  const { xp, streak } = useProgressStore();
  const isPerfect = lessonMistakes === 0;
  const stars = isPerfect ? 3 : lessonMistakes === 1 ? 2 : 1;
  const bonus = isPerfect ? 50 : 0;
  const totalXp = lessonXp + bonus;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center gap-8 text-center h-full px-4"
    >
      {/* Stars */}
      <div className="flex items-center gap-3">
        {[1, 2, 3].map((star) => (
          <motion.div
            key={star}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: star <= stars ? 1 : 0.5, rotate: 0 }}
            transition={{
              delay: star * 0.15,
              type: 'spring',
              stiffness: 200,
            }}
          >
            <Star
              className={`w-16 h-16 ${
                star <= stars
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-slate-700'
              }`}
            />
          </motion.div>
        ))}
      </div>

      {/* Perfect text */}
      {isPerfect && (
        <motion.h2
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, type: 'spring' }}
          className="text-4xl font-bold text-emerald-400"
        >
          Perfect!
        </motion.h2>
      )}

      {/* XP */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="space-y-2"
      >
        <div className="text-slate-400 text-sm">XP Earned</div>
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ delay: 0.8, duration: 0.4 }}
          className="text-5xl font-bold text-emerald-400"
        >
          +{totalXp}
        </motion.div>
        {bonus > 0 && (
          <div className="text-emerald-500/70 text-sm">
            Includes +{bonus} perfect bonus
          </div>
        )}
      </motion.div>

      {/* Total XP & Streak */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="flex items-center gap-6 text-slate-400"
      >
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-white">{xp}</span>
          <span className="text-sm">total XP</span>
        </div>
        {streak > 1 && (
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-orange-500 fill-orange-500" />
            <span className="text-lg font-semibold text-orange-400">
              {streak}
            </span>
            <span className="text-sm">day streak</span>
          </div>
        )}
      </motion.div>

      {/* Restart */}
      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2 }}
        onClick={onRestart}
        className="flex items-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold text-lg transition-colors"
      >
        <RotateCcw className="w-5 h-5" />
        Continue
      </motion.button>
    </motion.div>
  );
}