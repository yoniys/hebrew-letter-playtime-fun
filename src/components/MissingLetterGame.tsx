
import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import missingLetterWords from "@/data/missingLetterWords.json";

// Hebrew alphabet array for distractors and options
const HEBREW_ALPHABET = [
  "א","ב","ג","ד","ה","ו","ז","ח","ט","י","כ","ל","מ","נ","ס","ע","פ","צ","ק","ר","ש","ת"
];

type WordObject = {
  fullWord: string;
  displayWord: string;
  audioUrl: string;
  imageUrl?: string;
  missingLetter: string;
};

type MissingLetterGameProps = {
  onComplete: (score: number, total: number, missedLetters: string[]) => void;
};

const getRandomInt = (max: number) => Math.floor(Math.random() * max);

const MissingLetterGame = ({ onComplete }: MissingLetterGameProps) => {
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(-1);
  const [options, setOptions] = useState<string[]>([]);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);
  const [questionNumber, setQuestionNumber] = useState<number>(1);
  const totalQuestions = missingLetterWords.length;
  const [missedLetters, setMissedLetters] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const audioContext: AudioContext | null = null;


  useEffect(() => {
    loadNextWord();
  }, []);

  useEffect(() => {
    if (currentWordIndex >= 0) {
      playWordAudio();
    }
  }, [currentWordIndex]);

  const loadNextWord = () => {
    // Use sequential index instead of random to avoid repetition
    const idx = questionNumber - 1;
    if (idx >= totalQuestions) return;
    setCurrentWordIndex(idx);

    const wordObj = missingLetterWords[idx];
    const correctLetter = wordObj.missingLetter;

    // Generate distractor letters (exclude correctLetter)
    let distractors = HEBREW_ALPHABET.filter(
      (l) => l !== correctLetter
    );

    // Shuffle distractors and pick 3
    for (let i = distractors.length - 1; i > 0; i--) {
      const j = getRandomInt(i + 1);
      [distractors[i], distractors[j]] = [distractors[j], distractors[i]];
    }
    distractors = distractors.slice(0, 3);

    // Combine and shuffle options
    const combined = [...distractors, correctLetter];
    for (let i = combined.length - 1; i > 0; i--) {
      const j = getRandomInt(i + 1);
      [combined[i], combined[j]] = [combined[j], combined[i]];
    }

    setOptions(combined);
    setSelectedLetter(null);
    setFeedback(null);
  };

  const playWordAudio = () => {
    if (currentWordIndex < 0) return;
    const wordObj = missingLetterWords[currentWordIndex];
    setIsSpeaking(true);

    const audio = new Audio(wordObj.audioUrl);
    if (audioContext?.state === 'suspended') {
       audioContext.resume();
    }
    audio.play();

    audio.onended = () => {
      setIsSpeaking(false);
    };
  };

  const handleSelect = (letter: string) => {
    if (selectedLetter) return; // one attempt per question
    setSelectedLetter(letter);

    const wordObj = missingLetterWords[currentWordIndex];
    const isCorrect = letter === wordObj.missingLetter;

    if (isCorrect) {
      setScore((s) => s + 1);
      setFeedback("correct");
    } else {
      setFeedback("incorrect");
      if (!missedLetters.includes(wordObj.missingLetter)) {
        setMissedLetters((prev) => [...prev, wordObj.missingLetter]);
      }
    }

    setTimeout(() => {
      if (questionNumber >= totalQuestions) {
        // Pass missedLetters as array of letters (strings)
        onComplete(score + (isCorrect ? 1 : 0), totalQuestions, missedLetters);
      } else {
        setQuestionNumber((q) => q + 1);
        loadNextWord();
      }
    }, 1500);
  };

  if (currentWordIndex < 0) {
    return <div>Loading...</div>;
  }

  const wordObj = missingLetterWords[currentWordIndex];

  return (
    <div className="w-full max-w-md mx-auto py-4 px-2 sm:px-4 text-center" dir="rtl" lang="he">
      <h2 className="text-2xl font-bold mb-6">השלים את המילה!</h2>

      {wordObj.imageUrl && (
        <img
          src={wordObj.imageUrl}
          alt={wordObj.fullWord}
          className="mx-auto mb-4 max-h-40 object-contain"
        />
      )}

      <div className="text-6xl mb-8 font-mono tracking-widest select-none" aria-label={`Word with missing letter: ${wordObj.displayWord}`}>
        {wordObj.displayWord}
      </div>

      <div className="grid grid-cols-4 gap-4 max-w-sm mx-auto mb-6">
        {options.map((letter) => {
          const selected = selectedLetter === letter;
          const correct = feedback === "correct" && selected;
          const incorrect = feedback === "incorrect" && selected;

          return (
            <Button
              key={letter}
              onClick={() => handleSelect(letter)}
              disabled={!!selectedLetter}
              variant={correct ? "default" : incorrect ? "destructive" : "outline"}
              size="lg"
              className="text-4xl"
              aria-label={`בחר אות ${letter}`}
            >
              {letter}
            </Button>
          );
        })}
      </div>

      <div className="text-lg font-semibold mb-2">
        שאלה {questionNumber} מתוך {totalQuestions}
      </div>

      <div className="min-h-[28px] mb-6">
        {feedback === "correct" && <span className="text-kid-green">נכון! 🎉</span>}
        {feedback === "incorrect" && <span className="text-kid-pink">נסה בפעם הבאה!</span>}
      </div>

      <button
        onClick={playWordAudio}
        disabled={isSpeaking}
        className="px-4 py-2 rounded bg-kid-blue text-white hover:bg-kid-blue/80 disabled:opacity-50 transition"
        aria-label="השמע את המילה"
        type="button"
      >
        {isSpeaking ? "בוחן קול..." : "🔊 השמע את המילה"}
      </button>
    </div>
  );
};

export default MissingLetterGame;

