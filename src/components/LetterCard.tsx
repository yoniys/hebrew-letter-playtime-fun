
import { useState } from "react";
import { HebrewLetter } from "@/data/hebrewLetters";
import { cn } from "@/lib/utils";

type LetterCardProps = {
  letter: HebrewLetter;
  isSelected: boolean;
  isCorrect: boolean | null;
  onClick: () => void;
  size?: "small" | "medium" | "large";
};

const LetterCard = ({
  letter,
  isSelected,
  isCorrect,
  onClick,
  size = "medium"
}: LetterCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const sizeClasses = {
    small: "h-16 w-16 text-3xl",
    medium: "h-24 w-24 text-5xl",
    large: "h-32 w-32 text-7xl"
  };

  return (
    <div
      className={cn(
        "letter-card animate-pop",
        sizeClasses[size],
        isSelected && "selected",
        isCorrect === true && "correct",
        isCorrect === false && "incorrect",
        isHovered && "scale-105"
      )}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      <div className="font-bold">{letter.letter}</div>
      {isSelected && isCorrect !== null && (
        <div className={cn(
          "absolute -bottom-2 left-0 right-0 text-xs font-medium text-center",
          isCorrect ? "text-kid-green" : "text-kid-pink"
        )}>
          {isCorrect ? "✓" : "✕"}
        </div>
      )}
    </div>
  );
};

export default LetterCard;
