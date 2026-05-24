'use client';

import { LessonFlow } from '@/components/LessonFlow';
import { generateLesson } from '@/data/lesson-data';
import { hangulData } from '@/data/hangul-data';
import { useProgressStore } from '@/store/progress-store';
import { useState, useEffect } from 'react';
import type { Lesson } from '@/data/lesson-data';

export default function Home() {
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const weakCharacters = useProgressStore((state) => state.weakCharacters);
  const characterMastery = useProgressStore((state) => state.characterMastery);

  useEffect(() => {
    const consonants = hangulData.filter((c) => c.category === 'consonant');
    const newLesson = generateLesson('Consonant Challenge', consonants, 4, {
      weakIds: weakCharacters,
      mastery: characterMastery,
    });
    setLesson(newLesson);
  }, [weakCharacters, characterMastery]);

  if (!lesson) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-slate-400">Loading lesson...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
      <LessonFlow lesson={lesson} />
    </main>
  );
}