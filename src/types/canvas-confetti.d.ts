
declare module 'canvas-confetti' {
  export interface Options {
    particleCount?: number;
    angle?: number;
    spread?: number;
    startVelocity?: number;
    decay?: number;
    gravity?: number;
    drift?: number;
    ticks?: number;
    origin?: {
      x?: number;
      y?: number;
    };
    shapes?: string[];
    scalar?: number;
    zIndex?: number;
    colors?: string[];
    disableForReducedMotion?: boolean;
    useWorker?: boolean;
  }

  type confetti = (options?: Options) => void;
  export default confetti;
}
