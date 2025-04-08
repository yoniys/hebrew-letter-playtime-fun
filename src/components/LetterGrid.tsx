
import React from "react";
import { HebrewLetter } from "@/data/hebrewLetters";
import LetterCard from "./LetterCard";

type LetterGridProps = {
  letters: HebrewLetter[];
  selectedLetter: HebrewLetter | null;
  isCorrect: boolean | null;
  onLetterClick: (letter: HebrewLetter) => void;
};

const LetterGrid: React.FC<LetterGridProps> = ({
  letters,
  selectedLetter,
  isCorrect,
  onLetterClick
}) => {
  return (
    <div 
      className={`grid gap-3 sm:gap-6 mb-6 mx-auto justify-center ${
        letters.length <= 3 
          ? "grid-cols-3" 
          : letters.length === 4 
            ? "grid-cols-2 sm:grid-cols-2" 
            : "grid-cols-3"
      }`}
      style={{ 
        maxWidth: '100%', 
        gridTemplateColumns: letters.length <= 3 
          ? 'repeat(3, minmax(70px, 1fr))' 
          : letters.length === 4 
            ? 'repeat(2, minmax(90px, 1fr))' 
            : 'repeat(3, minmax(70px, 1fr))' 
      }}
    >
      {letters.map((letter) => (
        <LetterCard
          key={letter.id}
          letter={letter}
          isSelected={selectedLetter?.id === letter.id}
          isCorrect={selectedLetter?.id === letter.id ? isCorrect : null}
          onClick={() => onLetterClick(letter)}
          size={letters.length <= 4 ? "large" : "medium"}
        />
      ))}
    </div>
  );
};

export default LetterGrid;
