'use client';

import { LessonFlow } from '@/components/LessonFlow';
import { sampleLesson } from '@/data/lesson-data';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
      <LessonFlow lesson={sampleLesson} />
    </main>
  );
}