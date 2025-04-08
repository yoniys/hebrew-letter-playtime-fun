
// Create an audio context to handle playing sounds
let audioContext: AudioContext | null = null;

// Store the loaded audio files in a cache
const audioCache: Record<string, AudioBuffer> = {};

export const playAudio = async (audioSrc: string): Promise<void> => {
  try {
    // For demo purposes, we use a simple Audio element
    // In production, we would use preloaded audio files
    const audio = new Audio();
    audio.src = audioSrc;
    audio.volume = 0.8;
    
    // Return a promise that resolves when the audio has finished playing
    return new Promise((resolve, reject) => {
      audio.onended = () => resolve();
      audio.onerror = (e) => {
        console.error("Audio error:", e);
        reject(new Error("Failed to play audio"));
      };
      audio.play().catch(reject);
    });
  } catch (error) {
    console.error("Error playing audio:", error);
    
    // Fallback to speech synthesis if audio file fails
    const utterance = new SpeechSynthesisUtterance(
      audioSrc.split("/").pop()?.split(".")[0] || "letter"
    );
    utterance.rate = 0.8;
    speechSynthesis.speak(utterance);
    
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
    const utterance = new SpeechSynthesisUtterance("incorrect");
    utterance.volume = 0.5;
    utterance.rate = 1.0;
    speechSynthesis.speak(utterance);
  }
};

export const preloadAudio = async (audioSrcs: string[]): Promise<void> => {
  // This function would preload audio files
  // For now, we just log that we would preload them
  console.log("Would preload audio files:", audioSrcs);
};

// For development, since we don't have real audio files, use speech synthesis
export const speakText = (text: string): void => {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.8;
    speechSynthesis.speak(utterance);
  }
};
