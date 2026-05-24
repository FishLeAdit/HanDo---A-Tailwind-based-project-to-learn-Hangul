import { Flashcard } from '@/components/Flashcard';
import { hangulData } from '@/data/hangul-data';

export default function Home() {
  const firstCharacter = hangulData[0]; // ㄱ

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-white mb-2">Hangul Dojo</h1>
        <p className="text-slate-400">Version 0.1 — Hello Hangul</p>
      </div>

      <Flashcard character={firstCharacter} />
    </main>
  );
}