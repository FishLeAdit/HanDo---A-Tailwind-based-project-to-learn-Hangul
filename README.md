# Hangul Dojo — Version 0.2

A minimalist flashcard app for learning Korean Hangul. Inspired by Kana Dojo

## What's New in v0.2

- **Browse the deck** — Navigate through all 14 consonants with Next/Previous buttons
- **Smooth slide animations** — Cards slide in/out with Framer Motion `AnimatePresence`
- **Progress tracking** — Visual progress bar + text counter (`3 / 14`)
- **Keyboard navigation** — Use Left/Right arrow keys to navigate
- **Auto-reset** — Card flips back to front when you move to a new character

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
hangul-dojo/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx              # Deck navigation + progress
├── components/
│   ├── ui/
│   │   ├── card.tsx
│   │   └── button.tsx
│   └── Flashcard.tsx         # Flip card with auto-reset
├── data/
│   └── hangul-data.ts        # 14 consonants + 10 vowels
├── lib/
│   └── utils.ts
└── ...config files
```

## Next Steps (v0.3)

- Structured lesson flow (flashcard → quiz → flashcard → quiz)
- Lesson completion screen
- Hearts and scoring system
