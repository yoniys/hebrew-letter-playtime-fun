
import React from "react";
import { HebrewLetter } from "@/data/hebrewLetters";
import { Difficulty, GameMode } from "./GameConfig";
import { useGameLogic } from "@/hooks/useGameLogic";
import GameHeader from "./GameHeader";
import GamePrompt from "./GamePrompt";
import LetterGrid from "./LetterGrid";
import NextButton from "./NextButton";

type GameProps = {
  difficulty: Difficulty;
  mode: GameMode;
  questionsCount: number;
  onGameComplete: (score: number, total: number, missedLetters: HebrewLetter[]) => void;
};

const Game: React.FC<GameProps> = ({ 
  difficulty, 
  mode, 
  questionsCount, 
  onGameComplete 
}) => {
  const {
    currentLetters,
    targetLetter,
    selectedLetter,
    isCorrect,
    score,
    questionNumber,
    isAudioPlaying,
    playTargetAudio,
    handleLetterClick,
    nextQuestion
  } = useGameLogic(difficulty, questionsCount, onGameComplete);
  
  return (
    <div className="w-full max-w-md mx-auto py-4 px-2 sm:px-4">
      <GameHeader 
        questionNumber={questionNumber} 
        questionsCount={questionsCount} 
        score={score} 
      />
      
      <GamePrompt 
        targetLetterName={targetLetter?.name} 
        isAudioPlaying={isAudioPlaying} 
        playTargetAudio={playTargetAudio} 
      />
      
      <LetterGrid 
        letters={currentLetters} 
        selectedLetter={selectedLetter} 
        isCorrect={isCorrect} 
        onLetterClick={handleLetterClick} 
      />
      
      {selectedLetter && isCorrect && questionNumber < questionsCount && (
        <NextButton 
          onClick={() => {
            nextQuestion();
          }} 
        />
      )}
    </div>
  );
};

export default Game;
