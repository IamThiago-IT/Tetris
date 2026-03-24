import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { ActivePiece } from '../interfaces';
import { createTetromino } from '../utils/tetrominos';
import { BOARD_HEIGHT, BOARD_WIDTH, createEmptyBoard } from '../utils/board';
import { GameBoard } from './GameBoard';

describe('GameBoard', () => {
  it('renders all board cells', () => {
    const board = createEmptyBoard();
    render(<GameBoard board={board} activePiece={null} />);

    const cells = document.querySelectorAll('.cell');
    expect(cells).toHaveLength(BOARD_HEIGHT * BOARD_WIDTH);
  });

  it('renders active piece and ghost cells', () => {
    const board = createEmptyBoard();
    const activePiece: ActivePiece = {
      tetromino: createTetromino('O'),
      position: { x: 4, y: 0 },
      rotation: 0,
    };

    render(<GameBoard board={board} activePiece={activePiece} />);

    const filledCells = document.querySelectorAll('.cell--filled');
    expect(filledCells.length).toBeGreaterThan(4);
  });

  it('renders board container', () => {
    const board = createEmptyBoard();
    const { container } = render(<GameBoard board={board} activePiece={null} />);
    expect(container.querySelector('.game-board')).toBeInTheDocument();
    expect(screen.queryByText('TETRIS')).not.toBeInTheDocument();
  });
});
