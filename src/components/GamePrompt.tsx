
import React from "react";
import AudioButton from "./AudioButton";

type GamePromptProps = {
  targetLetterName: string | undefined;
  isAudioPlaying: boolean;
  playTargetAudio: () => void;
};

const GamePrompt: React.FC<GamePromptProps> = ({
  targetLetterName,
  isAudioPlaying,
  playTargetAudio
}) => {
  return (
    <div className="text-center mb-6 sm:mb-10">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Tap the letter:</h2>
      <div className="text-2xl sm:text-3xl font-bold text-kid-blue mb-2 sm:mb-4">
        {targetLetterName}
      </div>
      <AudioButton
        onClick={playTargetAudio}
        isPlaying={isAudioPlaying}
        isDisabled={!targetLetterName}
      />
    </div>
  );
};

export default GamePrompt;
