
import React from "react";
import ScoreDisplay from "./ScoreDisplay";

type GameHeaderProps = {
  questionNumber: number;
  questionsCount: number;
  score: number;
};

const GameHeader: React.FC<GameHeaderProps> = ({ 
  questionNumber, 
  questionsCount, 
  score 
}) => {
  return (
    <div className="flex justify-between items-center mb-4 sm:mb-8">
      <div className="text-base sm:text-lg font-medium">
        Question <span className="font-bold text-kid-purple">{questionNumber}</span> of <span>{questionsCount}</span>
      </div>
      <ScoreDisplay score={score} total={questionNumber - 1} />
    </div>
  );
};

export default GameHeader;
