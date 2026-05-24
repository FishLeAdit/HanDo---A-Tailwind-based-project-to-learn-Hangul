'use client';

import { Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProgressStore } from '@/store/progress-store';

export function HeartsDisplay() {
  const hearts = useProgressStore((state) => state.hearts);
  const maxHearts = 5;

  return (
    <div className="flex items-center gap-1">
      <AnimatePresence mode="popLayout">
        {Array.from({ length: maxHearts }).map((_, i) => (
          <motion.div
            key={i}
            initial={false}
            animate={
              i < hearts
                ? { scale: 1, opacity: 1 }
                : { scale: 0.8, opacity: 0.3 }
            }
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          >
            <Heart
              className={`w-5 h-5 ${
                i < hearts
                  ? 'fill-red-500 text-red-500'
                  : 'text-slate-600'
              }`}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}