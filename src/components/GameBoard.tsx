import type { ActivePiece, Board } from '../interfaces';
import { getBoardWithActivePiece, getBoardWithGhost } from '../utils/board';
import { Cell } from './Cell';

interface GameBoardProps {
  board: Board;
  activePiece: ActivePiece | null;
}

export function GameBoard({ board, activePiece }: GameBoardProps) {
  const boardWithGhost = activePiece ? getBoardWithGhost(board, activePiece) : board;
  const displayBoard = getBoardWithActivePiece(boardWithGhost, activePiece);

  return (
    <div className="game-board">
      {displayBoard.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <Cell key={`${rowIndex}-${colIndex}`} cell={cell} />
        ))
      )}
    </div>
  );
}
