export type CellValue = 0 | 1;

export interface Cell {
  value: CellValue;
  color: string;
  locked: boolean;
}

export type Board = Cell[][];

export type TetrominoShape = number[][];

export interface Tetromino {
  shape: TetrominoShape;
  color: string;
  type: TetrominoType;
}

export type TetrominoType = 'I' | 'O' | 'T' | 'S' | 'Z' | 'J' | 'L';

export interface Position {
  x: number;
  y: number;
}

export interface ActivePiece {
  tetromino: Tetromino;
  position: Position;
  rotation: number;
}

export interface GameState {
  board: Board;
  activePiece: ActivePiece | null;
  nextPiece: Tetromino | null;
  score: number;
  level: number;
  linesCleared: number;
  gameOver: boolean;
  isPaused: boolean;
  isRunning: boolean;
}

export type GameAction =
  | { type: 'START_GAME' }
  | { type: 'PAUSE_GAME' }
  | { type: 'RESUME_GAME' }
  | { type: 'RESET_GAME' }
  | { type: 'MOVE_LEFT' }
  | { type: 'MOVE_RIGHT' }
  | { type: 'MOVE_DOWN' }
  | { type: 'ROTATE' }
  | { type: 'HARD_DROP' }
  | { type: 'TICK' };
