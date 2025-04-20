
import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { hebrewLetters, HebrewLetter } from "@/data/hebrewLetters";
import { speakText } from "@/utils/audioUtils";

type MissingLetterGameProps = {
  onComplete: (score: number, total: number, missedLetters: HebrewLetter[]) => void;
};

const SIMPLE_WORDS = [
  // Words represented as arrays of HebrewLetters, missing one letter each
  ["alef", "bet", "gimel"], // אבג
  ["dalet", "he", "vav"],   // דהו
  ["zayin", "het", "tet"],  // זחז
  ["yod", "kaf", "lamed"],  // יקל
  ["mem", "nun", "samekh"], // מנס
];

const getRandomInt = (max: number) => Math.floor(Math.random() * max);

// Helper to get letter object by id from hebrewLetters
const getLetterById = (id: string): HebrewLetter | undefined =>
  hebrewLetters.find(l => l.id === id);

const MissingLetterGame = ({ onComplete }: MissingLetterGameProps) => {
  const [word, setWord] = useState<HebrewLetter[]>([]);
  const [missingIndex, setMissingIndex] = useState<number>(-1);
  const [options, setOptions] = useState<HebrewLetter[]>([]);
  const [selectedLetter, setSelectedLetter] = useState<HebrewLetter | null>(null);
  const [score, setScore] = useState<number>(0);
  const [questionNumber, setQuestionNumber] = useState<number>(1);
  const totalQuestions = SIMPLE_WORDS.length;
  const [missedLetters, setMissedLetters] = useState<HebrewLetter[]>([]);
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    // Initialize first word on mount
    loadNextWord();
  }, []);

  useEffect(() => {
    if (word.length > 0) {
      playWordAudio();
    }
  }, [word]);

  const loadNextWord = () => {
    const wordIds = SIMPLE_WORDS[getRandomInt(SIMPLE_WORDS.length)];
    const fullWord = wordIds.map(id => getLetterById(id)).filter(Boolean) as HebrewLetter[];
    const missingPos = getRandomInt(fullWord.length);
    setWord(fullWord);
    setMissingIndex(missingPos);

    const correctLetter = fullWord[missingPos];
    const distractors = hebrewLetters
      .filter(l => l.id !== correctLetter.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    setOptions([correctLetter, ...distractors].sort(() => Math.random() - 0.5));

    setSelectedLetter(null);
    setFeedback(null);
  };

  const playWordAudio = () => {
    if (word.length === 0) return;
    setIsSpeaking(true);

    // Pronounce the entire word letter by letter with spaces between
    const textToSpeak = word.map(l => l.name).join(" ");
    speakText(textToSpeak);

    // Estimate duration based on number of letters (approx 1s per letter)
    const duration = word.length * 1000;

    setTimeout(() => {
      setIsSpeaking(false);
    }, duration);
  };

  const handleSelect = (letter: HebrewLetter) => {
    if (selectedLetter) return; // only allow one selection per question
    setSelectedLetter(letter);

    const isCorrect = letter.id === word[missingIndex].id;
    if (isCorrect) {
      setScore((s) => s + 1);
      setFeedback("correct");
    } else {
      setMissedLetters((prev) => {
        if (prev.some(l => l.id === word[missingIndex].id)) return prev;
        return [...prev, word[missingIndex]];
      });
      setFeedback("incorrect");
    }

    setTimeout(() => {
      if (questionNumber >= totalQuestions) {
        onComplete(score + (isCorrect ? 1 : 0), totalQuestions, missedLetters);
      } else {
        setQuestionNumber((q) => q + 1);
        loadNextWord();
      }
    }, 1500);
  };

  return (
    <div className="w-full max-w-md mx-auto py-4 px-2 sm:px-4">
      <h2 className="text-center text-2xl font-bold mb-6">Complete the word!</h2>
      <div className="flex justify-center mb-6 space-x-2 text-5xl">
        {word.map((letter, idx) =>
          idx === missingIndex ? (
            <div
              key="missing"
              className="w-12 h-16 border-b-4 border-kid-blue border-dashed text-center text-kid-blue"
              aria-label="Missing letter"
            >
              &nbsp;
            </div>
          ) : (
            <div key={letter.id} aria-label={`Letter ${letter.name}`}>
              {letter.letter}
            </div>
          )
        )}
      </div>

      <div className="grid grid-cols-4 gap-4 max-w-sm mx-auto">
        {options.map((letter) => {
          const selected = selectedLetter?.id === letter.id;
          const correct = feedback === "correct" && selected;
          const incorrect = feedback === "incorrect" && selected;
          return (
            <Button
              key={letter.id}
              onClick={() => handleSelect(letter)}
              disabled={!!selectedLetter}
              variant={correct ? "default" : incorrect ? "destructive" : "outline"}
              size="lg"
              className="text-4xl"
              aria-label={`Select letter ${letter.name}`}
            >
              {letter.letter}
            </Button>
          );
        })}
      </div>

      <div className="text-center mt-6 text-lg font-semibold">
        Question {questionNumber} of {totalQuestions}
      </div>

      <div className="text-center mt-2 min-h-[28px]">
        {feedback === "correct" && <span className="text-kid-green">Correct! 🎉</span>}
        {feedback === "incorrect" && <span className="text-kid-pink">Try again next time!</span>}
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={playWordAudio}
          disabled={isSpeaking}
          className="px-4 py-2 rounded bg-kid-blue text-white hover:bg-kid-blue/80 disabled:opacity-50 transition"
          aria-label="Play word audio"
          type="button"
        >
          {isSpeaking ? "Playing..." : "🔊 Hear the word"}
        </button>
      </div>
    </div>
  );
};

export default MissingLetterGame;

