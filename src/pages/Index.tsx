
import { useState } from "react";
import Game from "@/components/Game";
import GameConfig, { Difficulty, GameMode } from "@/components/GameConfig";
import GameResults from "@/components/GameResults";
import GameSelectionPage from "@/components/GameSelectionPage";
import MissingLetterGame from "@/components/MissingLetterGame";
import { HebrewLetter } from "@/data/hebrewLetters";

type GameState = "gameSelection" | "config" | "playing" | "missingLetterPlaying" | "results";

const Index = () => {
  const [gameState, setGameState] = useState<GameState>("gameSelection");
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [mode, setMode] = useState<GameMode>("standard");
  const [questionsCount, setQuestionsCount] = useState(10);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  // For Hebrew letter main game missedLetters: HebrewLetter[]
  const [missedLetters, setMissedLetters] = useState<HebrewLetter[]>([]);
  // For Missing letter game missed missing letters are string[]
  const [missedMissingLetters, setMissedMissingLetters] = useState<string[]>([]);

  const handleGameStart = (config: { difficulty: Difficulty; mode: GameMode; questionsCount: number }) => {
    setDifficulty(config.difficulty);
    setMode(config.mode);
    setQuestionsCount(config.questionsCount);
    setGameState("playing");
  };

  // Latin letter game uses HebrewLetter[] missed letters
  const handleGameComplete = (score: number, total: number, missed: HebrewLetter[]) => {
    setScore(score);
    setTotalQuestions(total);
    setMissedLetters(missed);
    setMissedMissingLetters([]); // clear missing letter missed letters
    setGameState("results");
  };

  // Missing letter game uses string[] missed letters
  const handleMissingLetterGameComplete = (score: number, total: number, missed: string[]) => {
    setScore(score);
    setTotalQuestions(total);
    setMissedMissingLetters(missed);
    setMissedLetters([]); // clear HebrewLetter[] missed letters
    setGameState("results");
  };

  const handlePlayAgain = () => {
    if (gameState === "playing") {
      setGameState("playing");
    } else if (gameState === "missingLetterPlaying") {
      setGameState("missingLetterPlaying");
    }
  };

  const handleNewGame = () => {
    setGameState("gameSelection");
  };

  const handleSelectGameFromSelection = (gameId: string) => {
    if (gameId === "hebrewLetterPlaytime") {
      setGameState("config");
    } else if (gameId === "missingLetterGame") {
      setGameState("missingLetterPlaying");
    }
  };

  return (
    <div className="min-h-screen bg-kid-background py-8 px-4">
      <div className="container mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-kid-blue via-kid-purple to-kid-pink bg-clip-text text-transparent mb-2">
            {gameState === "missingLetterPlaying" ? "משחק מילים חסרות" : "פעילות אותיות עבריות"}
          </h1>
          <p className="text-gray-600 text-lg" dir={gameState === "missingLetterPlaying" ? "rtl" : "ltr"}>
            {gameState === "missingLetterPlaying"
              ? "השלים את האותיות החסרות במילים!"
              : "למד אותיות עבריות באמצעות משחק מהנה!"}
          </p>
        </header>

        <main className="flex flex-col items-center justify-center">
          {gameState === "gameSelection" && (
            <GameSelectionPage onSelectGame={handleSelectGameFromSelection} />
          )}

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

          {gameState === "missingLetterPlaying" && (
            <MissingLetterGame onComplete={handleMissingLetterGameComplete} />
          )}

          {gameState === "results" && (
            <GameResults
              score={score}
              totalQuestions={totalQuestions}
              onPlayAgain={handlePlayAgain}
              onNewGame={handleNewGame}
              // Show HebrewLetter[] missed letters when available (main game)
              missedLetters={missedLetters.length > 0 ? missedLetters : []}
            />
          )}
        </main>

        <footer className="text-center mt-12 text-sm text-gray-500" dir="ltr">
          <p>© 2025 Hebrew Letter Playtime Fun | A learning game for children</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
