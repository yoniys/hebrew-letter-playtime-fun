import { useState, useCallback, useEffect } from "react";
import { HebrewLetter, hebrewLetters } from "@/data/hebrewLetters";
import { playErrorSound, playAudio, playLetterSound } from "@/utils/audioUtils";
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
  const [gameInitialized, setGameInitialized] = useState(false);
  
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
      
      // Use the actual audio file if it exists
      if (targetLetter.letter) {
        playLetterSound(targetLetter.letter)
          .finally(() => {
            setIsAudioPlaying(false);
          });
      } else {
        // Fallback to the audio path in the letter data or speech synthesis
        playAudio(targetLetter.audio)
          .finally(() => {
            setIsAudioPlaying(false);
          });
      }
    }
  }, [targetLetter, isAudioPlaying]);
  

  const handleLetterClick = (letter: HebrewLetter) => {
    if (selectedLetter || !targetLetter) return;
  
    setSelectedLetter(letter);
    const correct = letter.id === targetLetter.id;
    setIsCorrect(correct);
  
    if (correct) {
      setHasPlayedInitialAudio(1); // Reset audio play state
      setScore((prev) => prev + 1);
      toast({
        title: "Correct!",
        description: `That's the letter ${targetLetter.name}`,
        className: "bg-kid-green bg-opacity-20",
      });
    } else {
      // Play error sound when the answer is wrong
      playErrorSound();
  
      // Add to missed letters if not already in the list
      if (!missedLetters.some(l => l.id === targetLetter.id)) {
        setMissedLetters(prev => [...prev, targetLetter]);
      }
  
      toast({
        title: "Not quite right",
        description: `Try again! Listen to the letter name again.`,
        className: "bg-kid-pink bg-opacity-20",
      });
  
      // Keep the incorrect answer visible for 2 seconds before resetting
      setTimeout(() => {
        setSelectedLetter(null);
        setIsCorrect(null);
      }, 1000);
  
      return; // Stop execution, so the game doesn't proceed
    }
  
    // Move to the next question after a delay
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
  
  
  // Initialize the game once
  useEffect(() => {
    if (!gameInitialized) {
      const shuffled = [...hebrewLetters].sort(() => Math.random() - 0.5);
      setAvailableLetters(shuffled);
      nextQuestion(shuffled);
      setGameInitialized(true);
      
      // Preload audio for all letters
      const audioFiles = hebrewLetters.map(letter => `src/assets/audio/${letter.letter}.mp3`);
      import("@/utils/audioUtils").then(({ preloadAudio }) => {
        preloadAudio(audioFiles);
      });
    }
  }, [difficulty, gameInitialized, nextQuestion]);
  
  // Auto-play audio when the target letter changes, but only after initial setup
  const [hasPlayedInitialAudio, setHasPlayedInitialAudio] = useState(1);

  useEffect(() => {
    if (targetLetter && gameInitialized && hasPlayedInitialAudio) {
      playTargetAudio();
      setHasPlayedInitialAudio(0);
    }
  }, [targetLetter, gameInitialized, playTargetAudio]);

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
