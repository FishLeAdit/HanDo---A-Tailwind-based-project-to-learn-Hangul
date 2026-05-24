# HanDo — Version 0.3

A minimalist flashcard app for learning Korean Hangul. Inspired by Kana Dojo

## What's New in v0.3

- **Structured Lesson Flow** — Duolingo-style step-by-step lessons
- **Two Step Types:**
  - **Flashcard** — Tap to reveal, then Continue
  - **Quiz** — Pick the correct romanization from 3 options
- **Progress Bar** — Fills up as you complete each step
- **Bottom Sheet Feedback** — Green "Nice!" for correct, red shake area for wrong answers
- **Lesson Complete Screen** — Celebratory finish with restart option
- **AnimatePresence** — Smooth transitions between every step

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
hangul-dojo/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx              # Renders LessonFlow
├── components/
│   ├── ui/
│   │   ├── card.tsx
│   │   └── button.tsx
│   ├── LessonFlow.tsx        # Orchestrates the lesson
│   ├── FlashcardStep.tsx     # Flashcard step UI
│   ├── QuizStep.tsx          # Quiz step UI (3 options)
│   ├── ProgressBar.tsx       # Top animated progress bar
│   └── FeedbackSheet.tsx     # Bottom correct/incorrect sheet
├── data/
│   ├── hangul-data.ts        # All Hangul characters
│   └── lesson-data.ts        # Lesson structure & types
├── lib/
│   └── utils.ts
└── ...config files
```

## How It Works

1. `lesson-data.ts` defines a `Lesson` as an array of mixed `StepData` (flashcard or quiz)
2. `LessonFlow.tsx` tracks `currentIndex`, renders the active step, and handles completion
3. Quiz options are generated dynamically — 1 correct + 2 random wrong answers from same category
4. After a quiz answer, `FeedbackSheet` slides up from bottom with Continue button
5. After the last step, a "Lesson Complete!" screen appears

## Next Steps (v0.4)

- Lesson Map / Path (Duolingo-style bubbles)
- Zustand store for tracking completed lessons
- Hearts system (lose one per wrong answer)
