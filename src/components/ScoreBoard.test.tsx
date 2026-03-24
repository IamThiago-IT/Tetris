import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { createTetromino } from '../utils/tetrominos';
import { ScoreBoard } from './ScoreBoard';

describe('ScoreBoard', () => {
  it('shows score, level and lines', () => {
    render(
      <ScoreBoard
        score={1234}
        level={2}
        linesCleared={15}
        nextPiece={createTetromino('L')}
      />
    );

    expect(screen.getByText('SCORE')).toBeInTheDocument();
    expect(screen.getByText('LEVEL')).toBeInTheDocument();
    expect(screen.getByText('LINES')).toBeInTheDocument();
    expect(screen.getByText('0001234')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('15')).toBeInTheDocument();
  });

  it('renders empty next preview when there is no next piece', () => {
    const { container } = render(
      <ScoreBoard score={0} level={0} linesCleared={0} nextPiece={null} />
    );

    expect(container.querySelector('.next-piece-preview--empty')).toBeInTheDocument();
  });
});
