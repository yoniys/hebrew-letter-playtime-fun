
import { useState } from "react";
import Game from "@/components/Game";
import StartMenu from "@/components/StartMenu";
import InitialStartPage from "@/components/InitialStartPage";
import GameResults from "@/components/GameResults";
import { HebrewLetter } from "@/data/hebrewLetters";

type GameState = "initialStart" | "startMenu" | "config" | "playing" | "results";

const Index = () => {
  const [gameState, setGameState] = useState<GameState>("initialStart");
  const [difficulty, setDifficulty] = useState("easy");
  const [mode, setMode] = useState("standard");
  const [questionsCount, setQuestionsCount] = useState(10);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [missedLetters, setMissedLetters] = useState<HebrewLetter[]>([]);

  const handleGameStart = (config: { difficulty: string; mode: string; questionsCount: number }) => {
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
    setGameState("initialStart");
  };

  const handleSelectExistingGame = () => {
    // Move from initial start page to existing start menu 
    setGameState("startMenu");
  };

  const handleSelectGameFromStartMenu = () => {
    // Start game immediately with default config (easy, standard, 10)
    setDifficulty("easy");
    setMode("standard");
    setQuestionsCount(10);
    setGameState("playing");
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
          {gameState === "initialStart" && (
            <InitialStartPage onSelectGame={handleSelectExistingGame} />
          )}

          {gameState === "startMenu" && (
            <StartMenu onGameSelect={handleSelectGameFromStartMenu} />
          )}

          {gameState === "config" && <></> /* Optionally keep config screen if needed later */}

          {gameState === "playing" && (
            <Game
              difficulty={difficulty as any}
              mode={mode as any}
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
