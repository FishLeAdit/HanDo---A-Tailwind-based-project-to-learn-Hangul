# HanDo — Version 0.1

A minimalist flashcard app for learning Korean Hangul. Inspired by Kana Dojo

## Setup

```bash
# 1. Create project
npx create-next-app@latest hangul-dojo --typescript --tailwind --app --no-src-dir
cd hangul-dojo

# 2. Initialize shadcn
npx shadcn@latest init --preset b0 --template next

# 3. Install additional dependencies
npm install framer-motion zustand lucide-react class-variance-authority clsx tailwind-merge @radix-ui/react-slot

# 4. Copy all files from this archive into your project, replacing existing files

# 5. Run
npm run dev
```

Open [http://localhost:3000] to see the app.

## What's in v0.1

- One beautiful animated flashcard showing ㄱ (giyeok)
- Tap to flip with Framer Motion 3D rotation
- Dark aesthetic UI with Tailwind CSS + shadcn/ui
- Full Hangul data file ready for expansion (14 consonants + 10 vowels)
- Responsive layout that works on mobile and desktop

## Project Structure

```
hangul-dojo/
├── app/
│   ├── globals.css      # Tailwind + CSS variables
│   ├── layout.tsx       # Root layout with dark mode
│   └── page.tsx         # Home page with flashcard
├── components/
│   ├── ui/              # shadcn/ui components
│   │   ├── card.tsx
│   │   └── button.tsx
│   └── Flashcard.tsx    # Main flashcard component
├── data/
│   └── hangul-data.ts   # All Hangul characters
├── lib/
│   └── utils.ts         # Tailwind merge helper
└── ...config files
```

## Next Steps (v0.2)

- Add "Next / Previous" buttons to browse the deck
- Add other flashcards into the deck.
- Animate card transitions with AnimatePresence
- Add a progress indicator
