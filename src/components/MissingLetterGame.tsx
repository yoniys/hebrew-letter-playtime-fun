
import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { hebrewLetters, HebrewLetter } from "@/data/hebrewLetters";

type MissingLetterGameProps = {
  onComplete: (score: number, total: number, missedLetters: HebrewLetter[]) => void;
};

const SIMPLE_WORDS = [
  // Words represented as arrays of HebrewLetters, missing one letter each
  // Example words with one letter missing are simplified and made-up for learning purpose
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
  // Current word as array of HebrewLetters or undefined for missing letter
  // We'll randomly remove one letter per word and provide options to pick for missing letter
  const [word, setWord] = useState<HebrewLetter[]>([]);
  const [missingIndex, setMissingIndex] = useState<number>(-1);
  const [options, setOptions] = useState<HebrewLetter[]>([]);
  const [selectedLetter, setSelectedLetter] = useState<HebrewLetter | null>(null);
  const [score, setScore] = useState<number>(0);
  const [questionNumber, setQuestionNumber] = useState<number>(1);
  const totalQuestions = SIMPLE_WORDS.length;
  const [missedLetters, setMissedLetters] = useState<HebrewLetter[]>([]);
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);

  useEffect(() => {
    // Initialize first word on mount
    loadNextWord();
  }, []);

  const loadNextWord = () => {
    const wordIds = SIMPLE_WORDS[getRandomInt(SIMPLE_WORDS.length)];
    const fullWord = wordIds.map(id => getLetterById(id)).filter(Boolean) as HebrewLetter[];
    const missingPos = getRandomInt(fullWord.length);
    setWord(fullWord);
    setMissingIndex(missingPos);

    // Generate options including the correct missing letter plus some random distractors
    const correctLetter = fullWord[missingPos];
    const distractors = hebrewLetters
      .filter(l => l.id !== correctLetter.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    setOptions([correctLetter, ...distractors].sort(() => Math.random() - 0.5));

    setSelectedLetter(null);
    setFeedback(null);
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

    // Move to next after delay
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
    </div>
  );
};

export default MissingLetterGame;
