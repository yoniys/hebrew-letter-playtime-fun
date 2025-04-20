
import { useState } from "react";
import Game from "@/components/Game";
import GameConfig, { Difficulty, GameMode } from "@/components/GameConfig";
import GameResults from "@/components/GameResults";
import { HebrewLetter } from "@/data/hebrewLetters";

type GameState = "config" | "playing" | "results";

const Index = () => {
  const [gameState, setGameState] = useState<GameState>("config");
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [mode, setMode] = useState<GameMode>("standard");
  const [questionsCount, setQuestionsCount] = useState(10);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [missedLetters, setMissedLetters] = useState<HebrewLetter[]>([]);

  const handleGameStart = (config: { difficulty: Difficulty; mode: GameMode; questionsCount: number }) => {
    setDifficulty(config.difficulty);
    setMode(config.mode);
    setQuestionsCount(config.questionsCount);
    setGameState("playing");
  };

  const handleGameComplete = (score: number, total: number, missed: HebrewLetter[]) => {
    setScore(score);
    setTotalQuestions(total);
    setMissedLetters(missed);
    setGameState("results");
  };

  const handlePlayAgain = () => {
    setGameState("playing");
  };

  const handleNewGame = () => {
    setGameState("config");
  };

  return (
    <div className="min-h-screen bg-kid-background py-8 px-4">
      <div className="container mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-kid-blue via-kid-purple to-kid-pink bg-clip-text text-transparent mb-2">
            Hebrew Letter Playtime
          </h1>
          <p className="text-gray-600 text-lg">Learn Hebrew letters through fun and play!</p>
        </header>
        
        <main className="flex flex-col items-center justify-center">
          {gameState === "config" && (
            <GameConfig onStart={handleGameStart} />
          )}
          
          {gameState === "playing" && (
            <Game 
              difficulty={difficulty}
              mode={mode}
              questionsCount={questionsCount}
              onGameComplete={handleGameComplete}
            />
          )}
          
          {gameState === "results" && (
            <GameResults
              score={score}
              totalQuestions={totalQuestions}
              onPlayAgain={handlePlayAgain}
              onNewGame={handleNewGame}
              missedLetters={missedLetters}
            />
          )}
        </main>
        
        <footer className="text-center mt-12 text-sm text-gray-500">
          <p>© 2025 Hebrew Letter Playtime Fun | A learning game for children</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
