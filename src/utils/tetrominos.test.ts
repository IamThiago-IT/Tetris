import { describe, expect, it, vi } from 'vitest';
import { createTetromino, getRandomTetromino, rotateTetromino, TETROMINO_TYPES } from './tetrominos';

describe('tetrominos utils', () => {
  it('creates a tetromino with matching type and color', () => {
    const tetromino = createTetromino('T');
    expect(tetromino.type).toBe('T');
    expect(tetromino.color).toBe('#a000f0');
    expect(tetromino.shape.length).toBeGreaterThan(0);
  });

  it('returns expected rotations and wraps by modulo', () => {
    const tetromino = createTetromino('I');
    const rotation0 = rotateTetromino(tetromino, 0);
    const rotation1 = rotateTetromino(tetromino, 1);
    const rotation4 = rotateTetromino(tetromino, 4);

    expect(rotation1).not.toEqual(rotation0);
    expect(rotation4).toEqual(rotation0);
  });

  it('returns random tetromino from known set', () => {
    const spy = vi.spyOn(Math, 'random').mockReturnValue(0.5);
    const tetromino = getRandomTetromino();
    expect(TETROMINO_TYPES).toContain(tetromino.type);
    spy.mockRestore();
  });
});
