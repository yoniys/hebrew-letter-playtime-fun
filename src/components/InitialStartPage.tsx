
import React from "react";
import { Gamepad } from "lucide-react";

type InitialStartPageProps = {
  onSelectGame: () => void;
};

const InitialStartPage: React.FC<InitialStartPageProps> = ({ onSelectGame }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-12">
      {/* Title */}
      <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-kid-blue via-kid-purple to-kid-pink bg-clip-text text-transparent">
        Choose a Game
      </h2>

      {/* Game options as buttons with only icons, suitable for kids */}
      <div className="flex justify-center gap-10">
        <button
          onClick={onSelectGame}
          aria-label="Select Hebrew Letter Playtime Game"
          className="flex flex-col items-center justify-center rounded-xl bg-kid-blue bg-opacity-20 hover:bg-opacity-40 transition p-8 shadow-md focus:outline-none focus:ring-4 focus:ring-kid-blue"
        >
          {/* Game icon large */}
          <Gamepad size={72} className="text-kid-blue" />
        </button>
      </div>
    </div>
  );
};

export default InitialStartPage;
