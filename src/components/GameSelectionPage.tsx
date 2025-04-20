
import React from "react";
import { Gamepad } from "lucide-react";

type GameSelectionPageProps = {
  onSelectGame: (gameId: string) => void;
};

const GameSelectionPage = ({ onSelectGame }: GameSelectionPageProps) => {
  return (
    <div className="flex justify-center gap-8">
      {/* Hebrew Letter Playtime game button */}
      <button
        onClick={() => onSelectGame("hebrewLetterPlaytime")}
        className="flex flex-col items-center justify-center rounded-xl bg-kid-blue bg-opacity-20 hover:bg-opacity-40 transition p-6 shadow-md focus:outline-none focus:ring-4 focus:ring-kid-blue"
        aria-label="Hebrew Letter Playtime"
      >
        <Gamepad size={48} className="text-kid-blue" />
      </button>

      {/* Missing Letter Game button */}
      <button
        onClick={() => onSelectGame("missingLetterGame")}
        className="flex flex-col items-center justify-center rounded-xl bg-kid-purple bg-opacity-20 hover:bg-opacity-40 transition p-6 shadow-md focus:outline-none focus:ring-4 focus:ring-kid-purple"
        aria-label="Missing Letter Game"
      >
        <span className="text-kid-purple text-4xl font-bold">א_א</span>
      </button>
    </div>
  );
};

export default GameSelectionPage;

