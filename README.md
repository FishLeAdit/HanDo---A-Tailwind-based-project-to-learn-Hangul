# Hangul Dojo — Version 0.3

A flashcard app for learning Korean Hangul. Inspired by Kana Dojo

## What's New in v0.3

- **Dynamic Lesson Generation** — Each lesson picks 4 random consonants. No two lessons are the same.
- **Weak Character Priority** — Characters you struggle with appear more often in lessons.
- **Mastery Tracking** — Every character has a mastery score (0-100). Correct answers increase it, wrong answers decrease it.
- **Mistake Review** — Characters you get wrong during a lesson reappear as "Review" quiz steps at the end.
- **Persistent Weak List** — Characters stay in your "weak" list across sessions until you master them (score ≥ 80).
- **Quiz Shake Animation** — The quiz area shakes when you answer wrong (Duolingo-style feedback).
- **Duplicate Option Protection** — Quiz options are guaranteed unique even when romanizations overlap.
- **Review Badge** — Flashcards and quizzes show an amber "Review" badge when it's a second-chance question.

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000]

## How It Works

### Dynamic Lessons

`generateLesson()` picks 4 characters from the pool:

1. First includes any characters in your `weakCharacters` list
2. Then fills with lowest-mastery characters
3. Shuffles the final selection so order is random

### Mastery System

- Each character starts at 50 mastery
- Correct quiz: +15 mastery
- Wrong quiz: -20 mastery
- Mastery ≥ 80: removed from weak list
- Mastery < 60: added to weak list

### Mistake Review

- During a lesson, missed characters are tracked in a `Set`
- When the main lesson steps finish, extra review quiz steps are appended
- You must pass the review steps to complete the lesson
- Review steps show an amber "Review" badge

### Quiz Improvements

- Options are deduplicated (no two identical choices)
- Wrong answers trigger a shake animation on the quiz card
- If duplicate romanizations exist in the pool, extra distractors are fetched

## Next Steps (v0.6)

- Syllable Builder step type (ㄱ + ㅏ = 가)
- Vowel lessons
- Sound / audio playback
