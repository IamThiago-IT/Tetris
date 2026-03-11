import { useEffect } from 'react';

interface GameControlsProps {
  onMoveLeft: () => void;
  onMoveRight: () => void;
  onMoveDown: () => void;
  onRotate: () => void;
  onHardDrop: () => void;
  onPause: () => void;
  onResume: () => void;
  isPaused: boolean;
  isRunning: boolean;
}

export function GameControls({
  onMoveLeft,
  onMoveRight,
  onMoveDown,
  onRotate,
  onHardDrop,
  onPause,
  onResume,
  isPaused,
  isRunning,
}: GameControlsProps) {
  useEffect(() => {
    if (!isRunning) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          if (!isPaused) onMoveLeft();
          break;
        case 'ArrowRight':
          e.preventDefault();
          if (!isPaused) onMoveRight();
          break;
        case 'ArrowDown':
          e.preventDefault();
          if (!isPaused) onMoveDown();
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (!isPaused) onRotate();
          break;
        case ' ':
          e.preventDefault();
          if (!isPaused) onHardDrop();
          break;
        case 'p':
        case 'P':
          e.preventDefault();
          if (isPaused) onResume(); else onPause();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isRunning, isPaused, onMoveLeft, onMoveRight, onMoveDown, onRotate, onHardDrop, onPause, onResume]);

  return null;
}
