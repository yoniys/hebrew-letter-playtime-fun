
import { useState, useCallback, useEffect } from "react";
import { HebrewLetter, hebrewLetters } from "@/data/hebrewLetters";
import { playErrorSound, speakText } from "@/utils/audioUtils";
import { useToast } from "@/components/ui/use-toast";
import { Difficulty, GameMode } from "@/components/GameConfig";

export const useGameLogic = (
  difficulty: Difficulty,
  questionsCount: number,
  onGameComplete: (score: number, total: number, missedLetters: HebrewLetter[]) => void
) => {
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
  
  const getLetterCount = useCallback(() => {
    switch (difficulty) {
      case "easy": return 3;
      case "medium": return 4;
      case "hard": return 5;
      default: return 3;
    }
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
  }, [availableLetters, getLetterCount, missedLetters, onGameComplete, questionNumber, score]);
  
  const playTargetAudio = useCallback(() => {
    if (targetLetter && !isAudioPlaying) {
      setIsAudioPlaying(true);
      
      // Use the imported speakText function instead of requiring it
      speakText(targetLetter.name);
      
      // Simulate audio duration
      setTimeout(() => {
        setIsAudioPlaying(false);
      }, 1000);
    }
  }, [targetLetter, isAudioPlaying]);
  
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
  
  // Initialize the game
  useEffect(() => {
    // Use the imported hebrewLetters instead of requiring it
    const shuffled = [...hebrewLetters].sort(() => Math.random() - 0.5);
    setAvailableLetters(shuffled);
    nextQuestion(shuffled);
  }, [difficulty, nextQuestion]);
  
  // Auto-play audio when the target letter changes
  useEffect(() => {
    if (targetLetter) {
      const timer = setTimeout(() => {
        playTargetAudio();
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [targetLetter, playTargetAudio]);

  return {
    currentLetters,
    targetLetter,
    selectedLetter,
    isCorrect,
    score,
    questionNumber,
    isAudioPlaying,
    questionsCount,
    playTargetAudio,
    handleLetterClick,
    nextQuestion
  };
};
