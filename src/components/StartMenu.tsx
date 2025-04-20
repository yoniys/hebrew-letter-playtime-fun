
import React from "react";
import { Gamepad } from "lucide-react";

type StartMenuProps = {
  onGameSelect: () => void;
};

const StartMenu: React.FC<StartMenuProps> = ({ onGameSelect }) => {
  return (
    <div className="flex justify-center gap-8">
      <button
        onClick={onGameSelect}
        aria-label="Start Hebrew Letter Playtime Game"
        className="flex flex-col items-center justify-center rounded-xl bg-kid-blue bg-opacity-20 hover:bg-opacity-40 transition p-6 shadow-md focus:outline-none focus:ring-4 focus:ring-kid-blue"
      >
        {/* Icon with large size */}
        <Gamepad size={64} className="text-kid-blue" />
      </button>
    </div>
  );
};

export default StartMenu;
