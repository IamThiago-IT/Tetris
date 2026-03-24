import { describe, expect, it } from 'vitest';
import type { ActivePiece } from '../interfaces';
import { createTetromino } from './tetrominos';
import {
  BOARD_HEIGHT,
  BOARD_WIDTH,
  calculateLevel,
  calculateScore,
  clearLines,
  createEmptyBoard,
  getBoardWithGhost,
  getDropInterval,
  getGhostPosition,
  getSpawnPosition,
  isValidPosition,
  lockPiece,
} from './board';

function createActivePieceO(x = 4, y = 0): ActivePiece {
  return {
    tetromino: createTetromino('O'),
    position: { x, y },
    rotation: 0,
  };
}

describe('board utils', () => {
  it('creates an empty board with expected dimensions', () => {
    const board = createEmptyBoard();

    expect(board).toHaveLength(BOARD_HEIGHT);
    expect(board[0]).toHaveLength(BOARD_WIDTH);
    expect(board.every(row => row.every(cell => !cell.locked && cell.value === 0))).toBe(true);
  });

  it('validates piece positions against bounds and collisions', () => {
    const board = createEmptyBoard();
    const piece = createTetromino('O');
    const shape = piece.shape;

    expect(isValidPosition(board, shape, 4, 0)).toBe(true);
    expect(isValidPosition(board, shape, -1, 0)).toBe(false);
    expect(isValidPosition(board, shape, BOARD_WIDTH - 1, 0)).toBe(false);
    expect(isValidPosition(board, shape, 4, BOARD_HEIGHT - 1)).toBe(false);

    board[0][4] = { value: 1, color: '#fff', locked: true };
    expect(isValidPosition(board, shape, 4, 0)).toBe(false);
  });

  it('locks active piece cells into the board', () => {
    const board = createEmptyBoard();
    const activePiece = createActivePieceO(4, 0);
    const lockedBoard = lockPiece(board, activePiece);

    const lockedCells = lockedBoard.flat().filter(cell => cell.locked);
    expect(lockedCells).toHaveLength(4);
    expect(lockedCells.every(cell => cell.color === activePiece.tetromino.color)).toBe(true);
  });

  it('clears completed lines and prepends empty rows', () => {
    const board = createEmptyBoard();
    board[BOARD_HEIGHT - 1] = board[BOARD_HEIGHT - 1].map(() => ({
      value: 1,
      color: '#aaa',
      locked: true,
    }));

    const { board: clearedBoard, linesCleared } = clearLines(board);

    expect(linesCleared).toBe(1);
    expect(clearedBoard).toHaveLength(BOARD_HEIGHT);
    expect(clearedBoard[0].every(cell => !cell.locked && cell.value === 0)).toBe(true);
  });

  it('calculates score, level and drop interval correctly', () => {
    expect(calculateScore(1, 0)).toBe(100);
    expect(calculateScore(4, 2)).toBe(2400);
    expect(calculateLevel(0)).toBe(0);
    expect(calculateLevel(10)).toBe(1);
    expect(getDropInterval(0)).toBe(1000);
    expect(getDropInterval(20)).toBe(100);
  });

  it('calculates spawn and ghost positions', () => {
    const board = createEmptyBoard();
    const piece = createTetromino('I');
    const spawn = getSpawnPosition(piece.shape);

    expect(spawn.x).toBe(Math.floor((BOARD_WIDTH - piece.shape[0].length) / 2));
    expect(spawn.y).toBe(0);

    const activePiece = createActivePieceO(4, 0);
    const ghostY = getGhostPosition(board, activePiece);
    expect(ghostY).toBe(BOARD_HEIGHT - 2);
  });

  it('renders ghost cells only when the piece can still drop', () => {
    const board = createEmptyBoard();

    const topPiece = createActivePieceO(4, 0);
    const boardWithGhost = getBoardWithGhost(board, topPiece);
    const ghostCells = boardWithGhost.flat().filter(cell => cell.color.endsWith('44'));
    expect(ghostCells).toHaveLength(4);

    const landedPiece = createActivePieceO(4, BOARD_HEIGHT - 2);
    const boardWithoutGhost = getBoardWithGhost(board, landedPiece);
    const ghostCellsWhenLanded = boardWithoutGhost.flat().filter(cell => cell.color.endsWith('44'));
    expect(ghostCellsWhenLanded).toHaveLength(0);
  });
});
