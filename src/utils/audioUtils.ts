
// Create an audio context to handle playing sounds
let audioContext: AudioContext | null = null;

// Store the loaded audio files in a cache
const audioCache: Record<string, AudioBuffer> = {};

export const playAudio = async (audioSrc: string): Promise<void> => {
  try {
    // Get the cleaned file path by removing any leading slashes
    const cleanPath = audioSrc.startsWith('/') ? audioSrc.substring(1) : audioSrc;
    
    // Create audio element
    const audio = new Audio(cleanPath);
    audio.volume = 0.8;
    
    // Return a promise that resolves when the audio has finished playing
    return new Promise((resolve, reject) => {
      audio.onended = () => resolve();
      audio.onerror = (e) => {
        console.error("Audio error:", e);
        reject(new Error("Failed to play audio"));
      };
      
      // Resume audioContext if it's suspended
      if (audioContext?.state === 'suspended') {
        audioContext.resume();
      }
      
      audio.play().catch((error) => {
        console.error("Error playing audio:", error);
        
        // Fallback to speech synthesis if audio file fails
        const letterName = audioSrc.split("/").pop()?.split(".")[0] || "letter";
        speakText(letterName);
        resolve();
      });
    });
  } catch (error) {
    console.error("Error playing audio:", error);
    
    // Fallback to speech synthesis if audio file fails
    const letterName = audioSrc.split("/").pop()?.split(".")[0] || "letter";
    speakText(letterName);
    
    return Promise.resolve();
  }
};

export const playErrorSound = (): void => {
  try {
    // Create a simple error sound using the Web Audio API
    const context = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(220, context.currentTime); // Low A note
    oscillator.frequency.setValueAtTime(196, context.currentTime + 0.2); // Low G note
    
    gainNode.gain.setValueAtTime(0.3, context.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.5);
    
    oscillator.connect(gainNode);
    gainNode.connect(context.destination);
    
    oscillator.start(context.currentTime);
    oscillator.stop(context.currentTime + 0.5);
    
    // Clean up after the sound plays
    setTimeout(() => {
      context.close();
    }, 600);
  } catch (error) {
    console.error("Error playing error sound:", error);
    
    // Fallback to speech synthesis
    speakText("incorrect");
  }
};

export const preloadAudio = async (audioSrcs: string[]): Promise<void> => {
  try {
    // Initialize audio context if not already done
    if (!audioContext) {
      audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    // Preload audio files by creating Audio objects
    for (const src of audioSrcs) {
      const audio = new Audio(src);
      audio.load(); // Start loading the audio file
    }
    
    console.log("Preloaded audio files:", audioSrcs);
  } catch (error) {
    console.error("Error preloading audio:", error);
  }
};

// Speech synthesis fallback when audio files can't be played
export const speakText = (text: string): void => {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.8;
    speechSynthesis.speak(utterance);
  }
};

// Play a Hebrew letter sound based on the letter character
export const playLetterSound = async (letter: string): Promise<void> => {
  try {
    // Map the letter to its audio file path
    const audioPath = `src/assets/audio/${letter}.mp3`;
    return playAudio(audioPath);
  } catch (error) {
    console.error("Error playing letter sound:", error);
    
    // Fallback to speech synthesis
    speakText(letter);
    return Promise.resolve();
  }
};
