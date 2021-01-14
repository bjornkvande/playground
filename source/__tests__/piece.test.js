/* globals describe, expect, it */

import { I, J, L, O, S, T, Z } from '../pieces';
import {
  moveDown,
  moveLeft,
  moveRight,
  left,
  right,
  randomPiece,
  rotateLeft,
  rotateRight
} from '../piece';

// to run tests one by one, just say it.only(...);

describe('right', () => {
  it('should rotate a square array', () => {
    // prettier-ignore
    expect(right([
      [0,1,2],
      [3,4,5],
      [6,7,8]
    ])).toEqual([
      [6,3,0],
      [7,4,1],
      [8,5,2]
    ]);
  });

  it('should rotate a non-square array', () => {
    // prettier-ignore
    expect(right([
      [0,1,2,3],
      [4,5,6,7]
    ])).toEqual([
      [4,0],
      [5,1],
      [6,2],
      [7,3]
    ]);
    // prettier-ignore
    expect(right([
      [4,0],
      [5,1],
      [6,2],
      [7,3]
    ])).toEqual([
      [7,6,5,4],
      [3,2,1,0]
    ]);
  });
});

describe('left', () => {
  it('should rotate a square array', () => {
    // prettier-ignore
    expect(left([
      [0,1,2],
      [3,4,5],
      [6,7,8]
    ])).toEqual([
      [2,5,8],
      [1,4,7],
      [0,3,6]
    ]);
  });

  it('should rotate a non-square array', () => {
    // prettier-ignore
    expect(left([
      [0,1,2,3],
      [4,5,6,7]
    ])).toEqual([
      [3,7],
      [2,6],
      [1,5],
      [0,4]
    ]);
    // prettier-ignore
    expect(left([
      [4,0],
      [5,1],
      [6,2],
      [7,3]
    ])).toEqual([
      [0,1,2,3],
      [4,5,6,7]
    ]);
  });
});

describe('rotateRight and rotateLeft', () => {
  // prettier-ignore
  const piece = {
    x: 0, y: 0,
    p: [
      [0,0,0],
      [8,8,8],
      [0,8,0]
    ]
  };

  it('should roate the piece to the right', () => {
    // prettier-ignore
    expect(rotateRight(piece)).toEqual({
      x: 0, y: 0,
      p: [
        [0,8,0],
        [8,8,0],
        [0,8,0]
      ]
    });
  });

  it('should roate the piece to the left', () => {
    // prettier-ignore
    expect(rotateLeft(piece)).toEqual({
      x: 0, y: 0,
      p: [
        [0,8,0],
        [0,8,8],
        [0,8,0]
      ]
    });
  });

  it('should be immutable', () => {
    expect(rotateRight(piece)).not.toBe(piece);
    expect(rotateLeft(piece)).not.toBe(piece);
  });
});

describe('move', () => {
  // prettier-ignore
  const piece = {
    x: 0, y: 0,
    p: [
      [0,0,0],
      [8,8,8],
      [0,8,0]
    ]
  };

  it('should move left', () => {
    // prettier-ignore
    expect(moveLeft(piece)).toEqual({
      x: -1, y: 0,
      p: [
        [0,0,0],
        [8,8,8],
        [0,8,0]
      ]
    });
  });

  it('should move right', () => {
    // prettier-ignore
    expect(moveRight(piece)).toEqual({
      x: 1, y: 0,
      p: [
        [0,0,0],
        [8,8,8],
        [0,8,0]
      ]
    });
  });

  it('should move down', () => {
    // prettier-ignore
    expect(moveDown(piece)).toEqual({
      x: 0, y: 1,
      p: [
        [0,0,0],
        [8,8,8],
        [0,8,0]
      ]
    });
  });

  it('should be immutable', () => {
    expect(moveLeft(piece)).not.toBe(piece);
    expect(moveRight(piece)).not.toBe(piece);
    expect(moveDown(piece)).not.toBe(piece);
  });
});

describe('randomPiece', () => {
  it('should return one of the pieces', () => {
    expect(getColor(randomPiece())).toMatch(/I|J|L|O|S|T|Z/);
  });
});

describe('color', () => {
  it('should contain the correct color', () => {
    expect(getColor(I)).toBe('I');
    expect(getColor(J)).toBe('J');
    expect(getColor(L)).toBe('L');
    expect(getColor(O)).toBe('O');
    expect(getColor(S)).toBe('S');
    expect(getColor(T)).toBe('T');
    expect(getColor(Z)).toBe('Z');
  });
});

function getColor(piece) {
  return piece
    .map(row => row.filter(c => c !== ' '))
    .filter(row => row.length > 1)
    .map(row => row.join(','))
    .map(row => row.split(','))
    .reduce(c => c)
    .reduce(c => c);
}
