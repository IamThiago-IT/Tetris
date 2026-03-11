import { useReducer, useEffect, useCallback } from 'react';
import type { GameState, GameAction, ActivePiece } from '../interfaces';
import { getRandomTetromino, rotateTetromino } from '../utils/tetrominos';
import {
  createEmptyBoard,
  isValidPosition,
  lockPiece,
  clearLines,
  calculateScore,
  calculateLevel,
  getDropInterval,
  getSpawnPosition,
} from '../utils/board';

function spawnPiece(state: GameState): GameState {
  const tetromino = state.nextPiece ?? getRandomTetromino();
  const nextPiece = getRandomTetromino();
  const shape = rotateTetromino(tetromino, 0);
  const position = getSpawnPosition(shape);

  const newPiece: ActivePiece = { tetromino, position, rotation: 0 };

  if (!isValidPosition(state.board, shape, position.x, position.y)) {
    return { ...state, gameOver: true, isRunning: false };
  }

  return { ...state, activePiece: newPiece, nextPiece };
}

function gameReducer(state: GameState, action: GameAction): GameState {
  if (action.type === 'START_GAME') {
    const freshState: GameState = {
      board: createEmptyBoard(),
      activePiece: null,
      nextPiece: getRandomTetromino(),
      score: 0,
      level: 0,
      linesCleared: 0,
      gameOver: false,
      isPaused: false,
      isRunning: true,
    };
    return spawnPiece(freshState);
  }

  if (action.type === 'RESET_GAME') {
    return {
      board: createEmptyBoard(),
      activePiece: null,
      nextPiece: null,
      score: 0,
      level: 0,
      linesCleared: 0,
      gameOver: false,
      isPaused: false,
      isRunning: false,
    };
  }

  if (action.type === 'PAUSE_GAME') {
    return { ...state, isPaused: true };
  }

  if (action.type === 'RESUME_GAME') {
    return { ...state, isPaused: false };
  }

  if (!state.isRunning || state.isPaused || state.gameOver || !state.activePiece) {
    return state;
  }

  const { activePiece, board } = state;

  if (action.type === 'MOVE_LEFT') {
    const shape = rotateTetromino(activePiece.tetromino, activePiece.rotation);
    const newX = activePiece.position.x - 1;
    if (!isValidPosition(board, shape, newX, activePiece.position.y)) return state;
    return {
      ...state,
      activePiece: { ...activePiece, position: { ...activePiece.position, x: newX } },
    };
  }

  if (action.type === 'MOVE_RIGHT') {
    const shape = rotateTetromino(activePiece.tetromino, activePiece.rotation);
    const newX = activePiece.position.x + 1;
    if (!isValidPosition(board, shape, newX, activePiece.position.y)) return state;
    return {
      ...state,
      activePiece: { ...activePiece, position: { ...activePiece.position, x: newX } },
    };
  }

  if (action.type === 'MOVE_DOWN' || action.type === 'TICK') {
    const shape = rotateTetromino(activePiece.tetromino, activePiece.rotation);
    const newY = activePiece.position.y + 1;

    if (!isValidPosition(board, shape, activePiece.position.x, newY)) {
      const lockedBoard = lockPiece(board, activePiece);
      const { board: clearedBoard, linesCleared } = clearLines(lockedBoard);
      const newLinesCleared = state.linesCleared + linesCleared;
      const newLevel = calculateLevel(newLinesCleared);
      const newScore = state.score + calculateScore(linesCleared, state.level);

      return spawnPiece({
        ...state,
        board: clearedBoard,
        activePiece: null,
        score: newScore,
        level: newLevel,
        linesCleared: newLinesCleared,
      });
    }

    return {
      ...state,
      activePiece: { ...activePiece, position: { ...activePiece.position, y: newY } },
    };
  }

  if (action.type === 'ROTATE') {
    const newRotation = (activePiece.rotation + 1) % 4;
    const newShape = rotateTetromino(activePiece.tetromino, newRotation);
    let newX = activePiece.position.x;

    if (isValidPosition(board, newShape, newX, activePiece.position.y)) {
      return { ...state, activePiece: { ...activePiece, rotation: newRotation } };
    }
    // Wall kick: try offset +1 and -1
    for (const offset of [1, -1, 2, -2]) {
      newX = activePiece.position.x + offset;
      if (isValidPosition(board, newShape, newX, activePiece.position.y)) {
        return {
          ...state,
          activePiece: {
            ...activePiece,
            rotation: newRotation,
            position: { ...activePiece.position, x: newX },
          },
        };
      }
    }
    return state;
  }

  if (action.type === 'HARD_DROP') {
    const shape = rotateTetromino(activePiece.tetromino, activePiece.rotation);
    let newY = activePiece.position.y;
    while (isValidPosition(board, shape, activePiece.position.x, newY + 1)) {
      newY++;
    }
    const droppedPiece: ActivePiece = {
      ...activePiece,
      position: { ...activePiece.position, y: newY },
    };
    const lockedBoard = lockPiece(board, droppedPiece);
    const { board: clearedBoard, linesCleared } = clearLines(lockedBoard);
    const newLinesCleared = state.linesCleared + linesCleared;
    const newLevel = calculateLevel(newLinesCleared);
    const dropBonus = (newY - activePiece.position.y) * 2;
    const newScore = state.score + calculateScore(linesCleared, state.level) + dropBonus;

    return spawnPiece({
      ...state,
      board: clearedBoard,
      activePiece: null,
      score: newScore,
      level: newLevel,
      linesCleared: newLinesCleared,
    });
  }

  return state;
}

const initialState: GameState = {
  board: createEmptyBoard(),
  activePiece: null,
  nextPiece: null,
  score: 0,
  level: 0,
  linesCleared: 0,
  gameOver: false,
  isPaused: false,
  isRunning: false,
};

export function useTetrisLogic() {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const startGame = useCallback(() => dispatch({ type: 'START_GAME' }), []);
  const pauseGame = useCallback(() => dispatch({ type: 'PAUSE_GAME' }), []);
  const resumeGame = useCallback(() => dispatch({ type: 'RESUME_GAME' }), []);
  const resetGame = useCallback(() => dispatch({ type: 'RESET_GAME' }), []);
  const moveLeft = useCallback(() => dispatch({ type: 'MOVE_LEFT' }), []);
  const moveRight = useCallback(() => dispatch({ type: 'MOVE_RIGHT' }), []);
  const moveDown = useCallback(() => dispatch({ type: 'MOVE_DOWN' }), []);
  const rotate = useCallback(() => dispatch({ type: 'ROTATE' }), []);
  const hardDrop = useCallback(() => dispatch({ type: 'HARD_DROP' }), []);

  // Gravity loop
  useEffect(() => {
    if (!state.isRunning || state.isPaused || state.gameOver) return;

    const interval = setInterval(() => {
      dispatch({ type: 'TICK' });
    }, getDropInterval(state.level));

    return () => clearInterval(interval);
  }, [state.isRunning, state.isPaused, state.gameOver, state.level]);

  return {
    state,
    startGame,
    pauseGame,
    resumeGame,
    resetGame,
    moveLeft,
    moveRight,
    moveDown,
    rotate,
    hardDrop,
  };
}
