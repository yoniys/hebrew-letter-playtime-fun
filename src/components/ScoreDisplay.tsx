
import { cn } from "@/lib/utils";

type ScoreDisplayProps = {
  score: number;
  total: number;
  className?: string;
};

const ScoreDisplay = ({ score, total, className }: ScoreDisplayProps) => {
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
  
  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div className="text-xl font-bold text-kid-purple">Score</div>
      <div className="text-3xl font-bold">{score}/{total}</div>
      <div className="w-full h-3 bg-gray-200 rounded-full mt-2">
        <div
          className="h-3 rounded-full bg-gradient-to-r from-kid-blue to-kid-purple transition-all duration-500 ease-in-out"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ScoreDisplay;
