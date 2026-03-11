import type { Board, Cell, ActivePiece, TetrominoShape } from '../interfaces';
import { rotateTetromino } from './tetrominos';

export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;

export const EMPTY_CELL: Cell = { value: 0, color: '', locked: false };

export function createEmptyBoard(): Board {
  return Array.from({ length: BOARD_HEIGHT }, () =>
    Array.from({ length: BOARD_WIDTH }, () => ({ ...EMPTY_CELL }))
  );
}

export function isValidPosition(
  board: Board,
  shape: TetrominoShape,
  x: number,
  y: number
): boolean {
  for (let row = 0; row < shape.length; row++) {
    for (let col = 0; col < shape[row].length; col++) {
      if (!shape[row][col]) continue;

      const newX = x + col;
      const newY = y + row;

      if (newX < 0 || newX >= BOARD_WIDTH) return false;
      if (newY >= BOARD_HEIGHT) return false;
      if (newY < 0) continue;
      if (board[newY][newX].locked) return false;
    }
  }
  return true;
}

export function lockPiece(board: Board, activePiece: ActivePiece): Board {
  const { tetromino, position, rotation } = activePiece;
  const shape = rotateTetromino(tetromino, rotation);
  const newBoard = board.map(row => row.map(cell => ({ ...cell })));

  for (let row = 0; row < shape.length; row++) {
    for (let col = 0; col < shape[row].length; col++) {
      if (!shape[row][col]) continue;
      const y = position.y + row;
      const x = position.x + col;
      if (y >= 0 && y < BOARD_HEIGHT && x >= 0 && x < BOARD_WIDTH) {
        newBoard[y][x] = { value: 1, color: tetromino.color, locked: true };
      }
    }
  }

  return newBoard;
}

export function clearLines(board: Board): { board: Board; linesCleared: number } {
  const newBoard = board.filter(row => row.some(cell => !cell.locked));
  const linesCleared = BOARD_HEIGHT - newBoard.length;

  const emptyRows = Array.from({ length: linesCleared }, () =>
    Array.from({ length: BOARD_WIDTH }, () => ({ ...EMPTY_CELL }))
  );

  return { board: [...emptyRows, ...newBoard], linesCleared };
}

export function calculateScore(linesCleared: number, level: number): number {
  const lineScores = [0, 100, 300, 500, 800];
  return (lineScores[linesCleared] ?? 800) * (level + 1);
}

export function calculateLevel(totalLines: number): number {
  return Math.floor(totalLines / 10);
}

export function getDropInterval(level: number): number {
  return Math.max(100, 1000 - level * 90);
}

export function getSpawnPosition(shape: TetrominoShape): { x: number; y: number } {
  return {
    x: Math.floor((BOARD_WIDTH - shape[0].length) / 2),
    y: 0,
  };
}

export function getBoardWithActivePiece(board: Board, activePiece: ActivePiece | null): Board {
  if (!activePiece) return board;

  const { tetromino, position, rotation } = activePiece;
  const shape = rotateTetromino(tetromino, rotation);
  const newBoard = board.map(row => row.map(cell => ({ ...cell })));

  for (let row = 0; row < shape.length; row++) {
    for (let col = 0; col < shape[row].length; col++) {
      if (!shape[row][col]) continue;
      const y = position.y + row;
      const x = position.x + col;
      if (y >= 0 && y < BOARD_HEIGHT && x >= 0 && x < BOARD_WIDTH) {
        newBoard[y][x] = { value: 1, color: tetromino.color, locked: false };
      }
    }
  }

  return newBoard;
}

export function getGhostPosition(board: Board, activePiece: ActivePiece): number {
  const { tetromino, position, rotation } = activePiece;
  const shape = rotateTetromino(tetromino, rotation);
  let ghostY = position.y;

  while (isValidPosition(board, shape, position.x, ghostY + 1)) {
    ghostY++;
  }

  return ghostY;
}

export function getBoardWithGhost(board: Board, activePiece: ActivePiece | null): Board {
  if (!activePiece) return board;

  const { tetromino, position, rotation } = activePiece;
  const shape = rotateTetromino(tetromino, rotation);
  const ghostY = getGhostPosition(board, activePiece);

  if (ghostY === position.y) return board;

  const newBoard = board.map(row => row.map(cell => ({ ...cell })));

  for (let row = 0; row < shape.length; row++) {
    for (let col = 0; col < shape[row].length; col++) {
      if (!shape[row][col]) continue;
      const y = ghostY + row;
      const x = position.x + col;
      if (y >= 0 && y < BOARD_HEIGHT && x >= 0 && x < BOARD_WIDTH && !newBoard[y][x].locked) {
        newBoard[y][x] = { value: 1, color: `${tetromino.color}44`, locked: false };
      }
    }
  }

  return newBoard;
}
