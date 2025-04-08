
import React from "react";
import { HebrewLetter } from "@/data/hebrewLetters";
import LetterCard from "./LetterCard";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();
  
  // Determine the grid layout based on letter count and device
  const getGridConfig = () => {
    if (letters.length <= 3) {
      return {
        cols: isMobile ? "grid-cols-1" : "grid-cols-3",
        template: isMobile ? 'repeat(1, minmax(90px, 120px))' : 'repeat(3, minmax(90px, 1fr))',
        gap: isMobile ? "gap-6" : "gap-4"
      };
    } else if (letters.length === 4) {
      return {
        cols: isMobile ? "grid-cols-2" : "grid-cols-2",
        template: isMobile ? 'repeat(2, minmax(80px, 1fr))' : 'repeat(2, minmax(90px, 1fr))',
        gap: "gap-5"
      };
    } else {
      return {
        cols: isMobile ? "grid-cols-2" : "grid-cols-3",
        template: isMobile ? 'repeat(2, minmax(65px, 1fr))' : 'repeat(3, minmax(80px, 1fr))',
        gap: isMobile ? "gap-3" : "gap-4"
      };
    }
  };

  const gridConfig = getGridConfig();
  const cardSize = letters.length <= 3 
    ? (isMobile ? "medium" : "large") 
    : (letters.length === 4 ? (isMobile ? "small" : "medium") : (isMobile ? "small" : "medium"));

  return (
    <div 
      className={`grid ${gridConfig.gap} mb-6 mx-auto justify-center ${gridConfig.cols}`}
      style={{ 
        maxWidth: isMobile ? '100%' : '500px',
        gridTemplateColumns: gridConfig.template
      }}
    >
      {letters.map((letter) => (
        <LetterCard
          key={letter.id}
          letter={letter}
          isSelected={selectedLetter?.id === letter.id}
          isCorrect={selectedLetter?.id === letter.id ? isCorrect : null}
          onClick={() => onLetterClick(letter)}
          size={cardSize}
        />
      ))}
    </div>
  );
};

export default LetterGrid;
