
import { useState, useEffect, useCallback } from "react";
import { HebrewLetter, hebrewLetters } from "@/data/hebrewLetters";
import LetterCard from "./LetterCard";
import AudioButton from "./AudioButton";
import ScoreDisplay from "./ScoreDisplay";
import { speakText, playErrorSound } from "@/utils/audioUtils";
import { Button } from "@/components/ui/button";
import { Difficulty, GameMode } from "./GameConfig";
import { useToast } from "@/components/ui/use-toast";
import { ArrowRight } from "lucide-react";

type GameProps = {
  difficulty: Difficulty;
  mode: GameMode;
  questionsCount: number;
  onGameComplete: (score: number, total: number, missedLetters: HebrewLetter[]) => void;
};

const Game = ({ difficulty, mode, questionsCount, onGameComplete }: GameProps) => {
  const [availableLetters, setAvailableLetters] = useState<HebrewLetter[]>([]);
  const [currentLetters, setCurrentLetters] = useState<HebrewLetter[]>([]);
  const [targetLetter, setTargetLetter] = useState<HebrewLetter | null>(null);
  const [selectedLetter, setSelectedLetter] = useState<HebrewLetter | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [missedLetters, setMissedLetters] = useState<HebrewLetter[]>([]);
  
  const { toast } = useToast();
  
  const getLetterCount = () => {
    switch (difficulty) {
      case "easy": return 3;
      case "medium": return 4;
      case "hard": return 5;
      default: return 3;
    }
  };
  
  // Initialize the game
  useEffect(() => {
    const shuffled = [...hebrewLetters].sort(() => Math.random() - 0.5);
    setAvailableLetters(shuffled);
    nextQuestion(shuffled);
  }, [difficulty]);
  
  const nextQuestion = useCallback((letters = availableLetters) => {
    if (letters.length < getLetterCount()) {
      // Not enough letters, end the game
      onGameComplete(score, questionNumber - 1, missedLetters);
      return;
    }
    
    // Get a new set of letters for this question
    const questionLetters = letters.slice(0, getLetterCount());
    const remainingLetters = letters.slice(getLetterCount());
    
    // Pick a random target letter from this set
    const newTarget = questionLetters[Math.floor(Math.random() * questionLetters.length)];
    
    setCurrentLetters(questionLetters);
    setTargetLetter(newTarget);
    setSelectedLetter(null);
    setIsCorrect(null);
    setAvailableLetters(remainingLetters);
  }, [availableLetters, difficulty, getLetterCount, missedLetters, onGameComplete, questionNumber, score]);
  
  const playTargetAudio = useCallback(() => {
    if (targetLetter && !isAudioPlaying) {
      setIsAudioPlaying(true);
      speakText(targetLetter.name);
      
      // Simulate audio duration
      setTimeout(() => {
        setIsAudioPlaying(false);
      }, 1000);
    }
  }, [targetLetter, isAudioPlaying]);
  
  // Auto-play audio when the target letter changes
  useEffect(() => {
    if (targetLetter) {
      const timer = setTimeout(() => {
        playTargetAudio();
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [targetLetter, playTargetAudio]);
  
  const handleLetterClick = (letter: HebrewLetter) => {
    if (selectedLetter || !targetLetter) return;
    
    setSelectedLetter(letter);
    const correct = letter.id === targetLetter.id;
    setIsCorrect(correct);
    
    if (correct) {
      setScore((prev) => prev + 1);
      toast({
        title: "Correct!",
        description: `That's the letter ${targetLetter.name}`,
        className: "bg-kid-green bg-opacity-20",
      });
    } else {
      // Play error sound when the answer is wrong
      playErrorSound();
      
      // Add to missed letters
      if (!missedLetters.some(l => l.id === targetLetter.id)) {
        setMissedLetters(prev => [...prev, targetLetter]);
      }
      
      toast({
        title: "Not quite right",
        description: `Try again! Listen to the letter name again.`,
        className: "bg-kid-pink bg-opacity-20",
      });
      
      // Allow the user to try again instead of moving to the next question
      setSelectedLetter(null);
      setIsCorrect(null);
      return;
    }
    
    // Move to next question after a delay
    setTimeout(() => {
      if (questionNumber >= questionsCount) {
        // Game complete
        onGameComplete(
          score + (correct ? 1 : 0), 
          questionsCount,
          correct ? missedLetters : (
            missedLetters.some(l => l.id === targetLetter.id) 
              ? missedLetters 
              : [...missedLetters, targetLetter]
          )
        );
      } else {
        setQuestionNumber((prev) => prev + 1);
        nextQuestion();
      }
    }, 1500);
  };
  
  return (
    <div className="w-full max-w-md mx-auto py-4 px-2 sm:px-4">
      {/* Game header */}
      <div className="flex justify-between items-center mb-4 sm:mb-8">
        <div className="text-base sm:text-lg font-medium">
          Question <span className="font-bold text-kid-purple">{questionNumber}</span> of <span>{questionsCount}</span>
        </div>
        <ScoreDisplay score={score} total={questionNumber - 1} />
      </div>
      
      {/* Game prompt */}
      <div className="text-center mb-6 sm:mb-10">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Tap the letter:</h2>
        <div className="text-2xl sm:text-3xl font-bold text-kid-blue mb-2 sm:mb-4">
          {targetLetter?.name}
        </div>
        <AudioButton
          onClick={playTargetAudio}
          isPlaying={isAudioPlaying}
          isDisabled={!targetLetter}
        />
      </div>
      
      {/* Letter cards - more responsive grid */}
      <div 
        className={`grid gap-3 sm:gap-6 mb-6 mx-auto justify-center ${
          currentLetters.length <= 3 
            ? "grid-cols-3" 
            : currentLetters.length === 4 
              ? "grid-cols-2 sm:grid-cols-2" 
              : "grid-cols-3"
        }`}
        style={{ 
          maxWidth: '100%', 
          gridTemplateColumns: currentLetters.length <= 3 
            ? 'repeat(3, minmax(70px, 1fr))' 
            : currentLetters.length === 4 
              ? 'repeat(2, minmax(90px, 1fr))' 
              : 'repeat(3, minmax(70px, 1fr))' 
        }}
      >
        {currentLetters.map((letter) => (
          <LetterCard
            key={letter.id}
            letter={letter}
            isSelected={selectedLetter?.id === letter.id}
            isCorrect={selectedLetter?.id === letter.id ? isCorrect : null}
            onClick={() => handleLetterClick(letter)}
            size={currentLetters.length <= 4 ? "large" : "medium"}
          />
        ))}
      </div>
      
      {/* Next button (appears only after a correct selection) */}
      {selectedLetter && isCorrect && questionNumber < questionsCount && (
        <div className="flex justify-center">
          <Button
            onClick={() => {
              setQuestionNumber((prev) => prev + 1);
              nextQuestion();
            }}
            className="bg-kid-blue hover:bg-kid-blue/90 font-bold rounded-xl py-4 sm:py-6 px-6 sm:px-8 text-white text-sm sm:text-base"
          >
            Next Question <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default Game;
