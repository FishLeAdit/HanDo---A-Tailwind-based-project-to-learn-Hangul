'use client';

import { motion } from 'framer-motion';

export function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-emerald-500 rounded-full"
        initial={false}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      />
    </div>
  );
}