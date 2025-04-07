
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export type Difficulty = "easy" | "medium" | "hard";
export type GameMode = "standard" | "timed";

type GameConfigProps = {
  onStart: (config: { difficulty: Difficulty; mode: GameMode; questionsCount: number }) => void;
};

const GameConfig = ({ onStart }: GameConfigProps) => {
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [mode, setMode] = useState<GameMode>("standard");
  const [questionsCount, setQuestionsCount] = useState(10);
  
  const handleStart = () => {
    onStart({
      difficulty,
      mode,
      questionsCount,
    });
  };
  
  return (
    <div className="w-full max-w-md p-6 bg-white rounded-3xl shadow-lg animate-pop">
      <h2 className="text-2xl font-bold text-center mb-6 text-kid-blue">Game Settings</h2>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="difficulty">Difficulty</Label>
          <Select value={difficulty} onValueChange={(value) => setDifficulty(value as Difficulty)}>
            <SelectTrigger id="difficulty" className="w-full">
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="easy">Easy (3 letters)</SelectItem>
              <SelectItem value="medium">Medium (4 letters)</SelectItem>
              <SelectItem value="hard">Hard (5 letters)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="mode">Game Mode</Label>
          <Select value={mode} onValueChange={(value) => setMode(value as GameMode)}>
            <SelectTrigger id="mode" className="w-full">
              <SelectValue placeholder="Select mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="standard">Standard</SelectItem>
              <SelectItem value="timed">Timed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="questions">Number of Questions</Label>
          <Select 
            value={questionsCount.toString()} 
            onValueChange={(value) => setQuestionsCount(parseInt(value))}
          >
            <SelectTrigger id="questions" className="w-full">
              <SelectValue placeholder="Select number of questions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5 Questions</SelectItem>
              <SelectItem value="10">10 Questions</SelectItem>
              <SelectItem value="15">15 Questions</SelectItem>
              <SelectItem value="20">20 Questions</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button 
          onClick={handleStart}
          className="w-full py-6 text-lg font-bold rounded-xl bg-kid-purple hover:bg-kid-purple/90 text-white mt-4"
        >
          Start Game
        </Button>
      </div>
    </div>
  );
};

export default GameConfig;
