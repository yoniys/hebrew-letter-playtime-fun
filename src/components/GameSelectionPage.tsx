
import React from "react";
import { Gamepad } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

type GameSelectionPageProps = {
  onSelectGame: (gameId: string) => void;
};

const GameSelectionPage = ({ onSelectGame }: GameSelectionPageProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className={`flex ${isMobile ? 'flex-col' : 'justify-center'} gap-6 w-full max-w-md mx-auto`}>
      {/* Hebrew Letter Playtime game button */}
      <button
        onClick={() => onSelectGame("hebrewLetterPlaytime")}
        className="flex flex-col items-center justify-center rounded-xl bg-kid-blue bg-opacity-20 hover:bg-opacity-40 transition p-6 shadow-md focus:outline-none focus:ring-4 focus:ring-kid-blue min-h-[120px]"
        aria-label="Hebrew Letter Playtime"
      >
        <Gamepad size={48} className="text-kid-blue mb-3" />
        <span className="font-semibold text-kid-blue">Hebrew Letter Playtime</span>
      </button>

      {/* Missing Letter Game button */}
      <button
        onClick={() => onSelectGame("missingLetterGame")}
        className="flex flex-col items-center justify-center rounded-xl bg-kid-purple bg-opacity-20 hover:bg-opacity-40 transition p-6 shadow-md focus:outline-none focus:ring-4 focus:ring-kid-purple min-h-[120px]"
        aria-label="Missing Letter Game"
      >
        <span className="text-kid-purple text-4xl font-bold mb-3">א_א</span>
        <span className="font-semibold text-kid-purple" dir="rtl">משחק אותיות חסרות</span>
      </button>
    </div>
  );
};

export default GameSelectionPage;
