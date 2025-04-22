
import { useState, useEffect } from "react";
import Game from "@/components/Game";
import GameConfig, { Difficulty, GameMode } from "@/components/GameConfig";
import GameResults from "@/components/GameResults";
import GameSelectionPage from "@/components/GameSelectionPage";
import MissingLetterGame from "@/components/MissingLetterGame";
import { HebrewLetter } from "@/data/hebrewLetters";
import { useIsMobile } from "@/hooks/use-mobile";
import { Capacitor } from '@capacitor/core';
import { App as CapacitorApp } from '@capacitor/app';

type GameState = "gameSelection" | "config" | "playing" | "missingLetterPlaying" | "results";

const Index = () => {
  const [gameState, setGameState] = useState<GameState>("gameSelection");
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [mode, setMode] = useState<GameMode>("standard");
  const [questionsCount, setQuestionsCount] = useState(10);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [missedLetters, setMissedLetters] = useState<HebrewLetter[]>([]);
  const [missedMissingLetters, setMissedMissingLetters] = useState<string[]>([]);
  const isMobile = useIsMobile();

  // Set up back button handler for mobile devices
  useEffect(() => {
    // Only run this effect in a Capacitor environment
    if (Capacitor.isNativePlatform()) {
      let backButtonListener: any;
      
      const setupBackButtonListener = async () => {
        backButtonListener = await CapacitorApp.addListener('backButton', () => {
          if (gameState === "results" || gameState === "playing" || gameState === "missingLetterPlaying" || gameState === "config") {
            setGameState("gameSelection");
            return false; // Don't exit the app, just navigate
          }
          return true; // Allow exiting the app if we're at the home/selection screen
        });
      };
      
      setupBackButtonListener();
      
      // Cleanup listener on component unmount
      return () => {
        if (backButtonListener) {
          backButtonListener.remove();
        }
      };
    }
  }, [gameState]);

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
    // Restart the current game mode fresh
    if (gameState === "results") {
      // Check which game was just played and restart that game
      if (missedLetters.length > 0) {
        // Main Hebrew letter game
        setGameState("playing");
      } else if (missedMissingLetters.length > 0) {
        // Missing letter game
        setGameState("missingLetterPlaying");
      } else {
        // Default fallback to game selection
        setGameState("gameSelection");
      }
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
    <div className={`min-h-[100vh] h-full bg-kid-background py-4 sm:py-8 px-2 sm:px-4 ${isMobile ? 'safe-area-inset-top safe-area-inset-bottom' : ''}`}>
      <div className="container mx-auto">
        <header className="text-center mb-4 sm:mb-8">
          <h1 className={`text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-kid-blue via-kid-purple to-kid-pink bg-clip-text text-transparent mb-2 ${isMobile ? 'leading-tight' : ''}`}>
            {gameState === "missingLetterPlaying" ? "משחק מילים חסרות" : "פעילות אותיות עבריות"}
          </h1>
          <p className="text-gray-600 text-base sm:text-lg" dir={gameState === "missingLetterPlaying" ? "rtl" : "ltr"}>
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

        <footer className="text-center mt-8 sm:mt-12 text-xs sm:text-sm text-gray-500 pb-safe" dir="ltr">
          <p>© 2025 Hebrew Letter Playtime Fun | A learning game for children</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
