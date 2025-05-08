
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX } from "lucide-react";

type AudioButtonProps = {
  onClick: () => void;
  isPlaying: boolean;
  isDisabled?: boolean;
  label?: string;
};

const AudioButton = ({ 
  onClick, 
  isPlaying, 
  isDisabled = false, 
  label = "Play letter sound" 
}: AudioButtonProps) => {
  return (
    <Button
      onClick={onClick}
      disabled={isDisabled || isPlaying}
      className={`rounded-full w-16 h-16 flex items-center justify-center ${
        isPlaying ? "bg-kid-blue/80" : "bg-kid-blue hover:bg-kid-blue/90"
      } shadow-lg transition-all duration-300`}
      aria-label={label}
    >
      {isPlaying ? (
        <VolumeX className="h-8 w-8 animate-pulse text-white" />
      ) : (
        <Volume2 className="h-8 w-8 text-white" />
      )}
    </Button>
  );
};

export default AudioButton;
