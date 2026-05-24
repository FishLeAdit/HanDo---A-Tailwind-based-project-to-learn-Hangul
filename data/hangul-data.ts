export interface HangulCharacter {
  id: string;
  character: string;
  romanization: string;
  tip: string;
  category: 'consonant' | 'vowel';
}

export const hangulData: HangulCharacter[] = [
  // Consonants (14)
  { id: 'giyeok', character: 'ㄱ', romanization: 'g / k', tip: 'Back of tongue, no air. Like "g" in "game".', category: 'consonant' },
  { id: 'nieun', character: 'ㄴ', romanization: 'n', tip: 'Tip of tongue on ridge. Like "n" in "nice".', category: 'consonant' },
  { id: 'digeut', character: 'ㄷ', romanization: 'd / t', tip: 'Tip of tongue, no air. Like "d" in "dog".', category: 'consonant' },
  { id: 'rieul', character: 'ㄹ', romanization: 'r / l', tip: 'Flap tongue. Between "r" and "l".', category: 'consonant' },
  { id: 'mieum', character: 'ㅁ', romanization: 'm', tip: 'Close lips. Like "m" in "mom".', category: 'consonant' },
  { id: 'bieup', character: 'ㅂ', romanization: 'b / p', tip: 'Close lips, no air. Like "b" in "bat".', category: 'consonant' },
  { id: 'siot', character: 'ㅅ', romanization: 's', tip: 'Hiss with tongue near ridge. Like "s" in "sun".', category: 'consonant' },
  { id: 'ieung', character: 'ㅇ', romanization: 'ng / silent', tip: 'Silent at start, "ng" at end. Like "sing".', category: 'consonant' },
  { id: 'jieut', character: 'ㅈ', romanization: 'j', tip: 'Tip of tongue near ridge. Like "j" in "jam".', category: 'consonant' },
  { id: 'chieut', character: 'ㅊ', romanization: 'ch', tip: 'Same as ㅈ but with air. Like "ch" in "chop".', category: 'consonant' },
  { id: 'kieuk', character: 'ㅋ', romanization: 'k', tip: 'Same as ㄱ but with air. Like "k" in "king".', category: 'consonant' },
  { id: 'tieut', character: 'ㅌ', romanization: 't', tip: 'Same as ㄷ but with air. Like "t" in "top".', category: 'consonant' },
  { id: 'pieup', character: 'ㅍ', romanization: 'p', tip: 'Same as ㅂ but with air. Like "p" in "pop".', category: 'consonant' },
  { id: 'hieut', character: 'ㅎ', romanization: 'h', tip: 'Exhale from throat. Like "h" in "hat".', category: 'consonant' },
  // Vowels (10)
  { id: 'a', character: 'ㅏ', romanization: 'a', tip: 'Open mouth wide. Like "a" in "father".', category: 'vowel' },
  { id: 'eo', character: 'ㅓ', romanization: 'eo', tip: 'Open mouth, neutral. Like "u" in "cut".', category: 'vowel' },
  { id: 'o', character: 'ㅗ', romanization: 'o', tip: 'Round lips. Like "o" in "go".', category: 'vowel' },
  { id: 'u', character: 'ㅜ', romanization: 'u', tip: 'Tight round lips. Like "oo" in "moon".', category: 'vowel' },
  { id: 'eu', character: 'ㅡ', romanization: 'eu', tip: 'Stretch lips wide. Like "u" in "put" but deeper.', category: 'vowel' },
  { id: 'i', character: 'ㅣ', romanization: 'i', tip: 'Spread lips. Like "ee" in "see".', category: 'vowel' },
  { id: 'ae', character: 'ㅐ', romanization: 'ae', tip: 'Like ㅏ but wider. Like "a" in "cat".', category: 'vowel' },
  { id: 'e', character: 'ㅔ', romanization: 'e', tip: 'Like ㅓ but tighter. Like "e" in "bed".', category: 'vowel' },
  { id: 'ya', character: 'ㅑ', romanization: 'ya', tip: 'ㅏ with a y-glide. Like "ya" in "yacht".', category: 'vowel' },
  { id: 'yeo', character: 'ㅕ', romanization: 'yeo', tip: 'ㅓ with a y-glide. Like "yuh".', category: 'vowel' },
];