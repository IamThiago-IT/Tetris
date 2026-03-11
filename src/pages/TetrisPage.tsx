import { useTetrisLogic } from '../hooks/useTetrisLogic';
import { GameBoard } from '../components/GameBoard';
import { ScoreBoard } from '../components/ScoreBoard';
import { GameControls } from '../components/GameControls';

export function TetrisPage() {
  const {
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
  } = useTetrisLogic();

  const { board, activePiece, nextPiece, score, level, linesCleared, gameOver, isPaused, isRunning } = state;

  return (
    <div className="tetris-page">
      <h1 className="tetris-title">TETRIS</h1>

      <div className="tetris-container">
        <div className="game-wrapper">
          <GameBoard board={board} activePiece={activePiece} />

          {!isRunning && !gameOver && (
            <div className="game-overlay">
              <h2>TETRIS</h2>
              <button className="btn btn--primary" onClick={startGame}>
                START GAME
              </button>
            </div>
          )}

          {isPaused && (
            <div className="game-overlay">
              <h2>PAUSED</h2>
              <button className="btn btn--primary" onClick={resumeGame}>
                RESUME
              </button>
              <button className="btn btn--secondary" onClick={resetGame}>
                QUIT
              </button>
            </div>
          )}

          {gameOver && (
            <div className="game-overlay">
              <h2>GAME OVER</h2>
              <p className="overlay-score">Score: {score}</p>
              <button className="btn btn--primary" onClick={startGame}>
                PLAY AGAIN
              </button>
            </div>
          )}
        </div>

        <ScoreBoard
          score={score}
          level={level}
          linesCleared={linesCleared}
          nextPiece={nextPiece}
        />
      </div>

      {isRunning && !gameOver && (
        <div className="mobile-controls">
          <div className="mobile-controls__row">
            <button className="mobile-btn" onClick={rotate}>↑</button>
          </div>
          <div className="mobile-controls__row">
            <button className="mobile-btn" onClick={moveLeft}>←</button>
            <button className="mobile-btn" onClick={moveDown}>↓</button>
            <button className="mobile-btn" onClick={moveRight}>→</button>
          </div>
          <div className="mobile-controls__row">
            <button className="mobile-btn mobile-btn--wide" onClick={hardDrop}>DROP</button>
            <button className="mobile-btn" onClick={isPaused ? resumeGame : pauseGame}>
              {isPaused ? '▶' : '⏸'}
            </button>
          </div>
        </div>
      )}

      <GameControls
        onMoveLeft={moveLeft}
        onMoveRight={moveRight}
        onMoveDown={moveDown}
        onRotate={rotate}
        onHardDrop={hardDrop}
        onPause={pauseGame}
        onResume={resumeGame}
        isPaused={isPaused}
        isRunning={isRunning}
      />
    </div>
  );
}
