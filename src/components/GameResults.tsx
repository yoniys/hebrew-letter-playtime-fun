
import { Button } from "@/components/ui/button";
import { HebrewLetter } from "@/data/hebrewLetters";
import confetti from 'canvas-confetti';
import { useEffect } from "react";

type GameResultsProps = {
  score: number;
  totalQuestions: number;
  onPlayAgain: () => void;
  onNewGame: () => void;
  missedLetters: HebrewLetter[];
};

const GameResults = ({
  score,
  totalQuestions,
  onPlayAgain,
  onNewGame,
  missedLetters,
}: GameResultsProps) => {
  const percentage = (score / totalQuestions) * 100;
  const isHighScore = percentage >= 80;
  
  useEffect(() => {
    if (isHighScore) {
      // Trigger confetti for high scores
      const duration = 3 * 1000;
      const end = Date.now() + duration;

      const runConfetti = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#4D96FF', '#907AD6', '#FDDB3A'],
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#52D681', '#FF7A8A', '#4D96FF'],
        });

        if (Date.now() < end) {
          requestAnimationFrame(runConfetti);
        }
      };

      runConfetti();
    }
  }, [isHighScore]);

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-3xl shadow-lg animate-pop">
      <h2 className="text-2xl font-bold text-center mb-2">
        {isHighScore ? "Great job! 🎉" : "Game Complete"}
      </h2>
      
      <div className="text-center mb-6">
        <div className="text-5xl font-bold my-4">
          {score}/{totalQuestions}
        </div>
        <div className="w-full h-4 bg-gray-200 rounded-full">
          <div
            className={`h-4 rounded-full ${
              percentage >= 80 ? "bg-kid-green" : percentage >= 50 ? "bg-kid-yellow" : "bg-kid-pink"
            }`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
      
      {missedLetters.length > 0 && (
        <div className="mt-6 mb-6">
          <h3 className="text-lg font-semibold mb-2">Letters to practice:</h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {missedLetters.map((letter) => (
              <div
                key={letter.id}
                className="flex flex-col items-center bg-gray-100 rounded-lg p-2 w-16"
              >
                <div className="text-2xl font-bold">{letter.letter}</div>
                <div className="text-xs">{letter.name}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-4 mt-4">
        <Button
          onClick={onPlayAgain}
          className="py-6 font-bold rounded-xl bg-kid-blue hover:bg-kid-blue/90 text-white"
        >
          Play Again
        </Button>
        <Button
          onClick={onNewGame}
          className="py-6 font-bold rounded-xl bg-kid-purple hover:bg-kid-purple/90 text-white"
        >
          New Game
        </Button>
      </div>
    </div>
  );
};

export default GameResults;
