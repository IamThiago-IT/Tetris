import type { Tetromino } from '../interfaces';
import { rotateTetromino } from '../utils/tetrominos';

interface ScoreBoardProps {
  score: number;
  level: number;
  linesCleared: number;
  nextPiece: Tetromino | null;
}

function NextPiecePreview({ piece }: { piece: Tetromino | null }) {
  if (!piece) return <div className="next-piece-preview next-piece-preview--empty" />;

  const shape = rotateTetromino(piece, 0);
  const rows = shape.length;
  const cols = shape[0]?.length ?? 0;

  return (
    <div
      className="next-piece-preview"
      style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)` }}
    >
      {shape.map((row, ri) =>
        row.map((cell, ci) => (
          <div
            key={`${ri}-${ci}`}
            className={`next-cell ${cell ? 'next-cell--filled' : ''}`}
            style={{ backgroundColor: cell ? piece.color : undefined }}
          />
        ))
      )}
    </div>
  );
}

export function ScoreBoard({ score, level, linesCleared, nextPiece }: ScoreBoardProps) {
  return (
    <div className="score-board">
      <div className="score-board__section">
        <h2 className="score-board__label">SCORE</h2>
        <p className="score-board__value">{score.toString().padStart(7, '0')}</p>
      </div>

      <div className="score-board__section">
        <h2 className="score-board__label">LEVEL</h2>
        <p className="score-board__value">{level + 1}</p>
      </div>

      <div className="score-board__section">
        <h2 className="score-board__label">LINES</h2>
        <p className="score-board__value">{linesCleared}</p>
      </div>

      <div className="score-board__section">
        <h2 className="score-board__label">NEXT</h2>
        <NextPiecePreview piece={nextPiece} />
      </div>

      <div className="score-board__section score-board__controls">
        <h2 className="score-board__label">CONTROLS</h2>
        <ul className="controls-list">
          <li><kbd>←</kbd><kbd>→</kbd> Move</li>
          <li><kbd>↑</kbd> Rotate</li>
          <li><kbd>↓</kbd> Soft drop</li>
          <li><kbd>Space</kbd> Hard drop</li>
          <li><kbd>P</kbd> Pause</li>
        </ul>
      </div>
    </div>
  );
}
