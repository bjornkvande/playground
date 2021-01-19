/* globals describe, expect, it */

import {
  addPiece,
  canAddPiece,
  getCompleteRows,
  getScore,
  hasCompleteRows,
  isRowComplete,
  removeCompleteRows,
  removeLowestCompleteRow
} from '../board';

const _ = ' ';
const X = 'X';

describe('addPiece', () => {
  it('should add the piece onto the given board', () => {
    // prettier-ignore
    expect(addPiece([
      [0,0,0,0],
      [0,0,0,0],
      [0,0,0,0],
      [0,0,0,0]
    ], {
      x:0, y:0, p: [
        [_,_,_],
        [8,8,8],
        [_,8,_]
      ]
    })).toEqual([
      [0,0,0,0],
      [8,8,8,0],
      [0,8,0,0],
      [0,0,0,0]
    ]);
  });

  it('should add the piee at the given xy position', () => {
    // prettier-ignore
    expect(addPiece([
      [0,0,0,0,0],
      [0,0,0,0,0],
      [0,0,0,0,0],
      [0,0,0,0,0],
      [0,0,0,0,0]
    ], {
      x: 1, y: 2, p: [
        [_,_,_],
        [8,8,8],
        [_,8,_]
      ]
    })).toEqual([
      [0,0,0,0,0],
      [0,0,0,0,0],
      [0,0,0,0,0],
      [0,8,8,8,0],
      [0,0,8,0,0]
    ]);
  });

  it('should not override other blocks with empty blocks', () => {
    // prettier-ignore
    expect(addPiece([
      [0,0,0,0],
      [0,0,0,0],
      [1,0,1,0],
      [0,0,0,0]
    ], {
      x:0, y:0, p: [
        [_,_,_],
        [8,8,8],
        [_,8,_]
      ]
    })).toEqual([
      [0,0,0,0],
      [8,8,8,0],
      [1,8,1,0],
      [0,0,0,0]
    ]);
  });

  it('should be able to add piece with empty bottom rows at the bottom', () => {
    // prettier-ignore
    expect(addPiece([
      [0,0,0,0],
      [0,0,0,0],
      [0,0,0,0],
      [0,0,0,0]
    ], {
      x:0, y:3, p: [
        [8,8,8],
        [_,_,_],
        [_,_,_]
      ]
    })).toEqual([
      [0,0,0,0],
      [0,0,0,0],
      [0,0,0,0],
      [8,8,8,0]
    ]);
  });
});

describe('canAddPiece - edge cases', () => {
  // prettier-ignore
  const board = [
    [0,_,_,_,_,0],
    [0,_,_,_,_,0],
    [0,_,_,_,_,0],
    [0,_,_,_,_,0],
    [0,_,_,_,_,0],
    [0,0,0,0,0,0]
  ];
  // prettier-ignore
  const piece = {
    x: 1, y: 0, p: [
      [_,_,_],
      [8,8,8],
      [_,8,_]
    ]
  };

  it('should be able to add the piece at the left edge', () => {
    expect(canAddPiece(board, { ...piece, x: 1 })).toBe(true);
    expect(canAddPiece(board, { ...piece, x: 0 })).toBe(false);
  });

  it('should be able to add the piece at the right edge', () => {
    expect(canAddPiece(board, { ...piece, x: 2 })).toBe(true);
    expect(canAddPiece(board, { ...piece, x: 3 })).toBe(false);
  });

  it('should be able to add the piece at the bottom', () => {
    expect(canAddPiece(board, { ...piece, y: 2 })).toBe(true);
    expect(canAddPiece(board, { ...piece, y: 3 })).toBe(false);
  });

  it('should be able to add the piece above the board', () => {
    expect(canAddPiece(board, { ...piece, y: -3 })).toBe(true);
    expect(canAddPiece(board, { ...piece, y: -2 })).toBe(true);
    expect(canAddPiece(board, { ...piece, y: -1 })).toBe(true);
  });

  it('should work with piece with empty sides', () => {
    // prettier-ignore
    const emptySides = {
      x: 0, y: 0, p: [
        [_,8,_],
        [_,8,_],
        [_,8,_]
      ]
    };
    expect(canAddPiece(board, { ...emptySides, x: 0 })).toBe(true);
    expect(canAddPiece(board, { ...emptySides, x: -1 })).toBe(false);
    expect(canAddPiece(board, { ...emptySides, x: 3 })).toBe(true);
    expect(canAddPiece(board, { ...emptySides, x: 4 })).toBe(false);
  });

  it('should work with piece with empty bottom', () => {
    // prettier-ignore
    const emptyBottom = {
      x: 1, y: 0, p: [
        [_,_,_],
        [8,8,8],
        [_,_,_]
      ]
    };
    expect(canAddPiece(board, { ...emptyBottom, y: 3 })).toBe(true);
    expect(canAddPiece(board, { ...emptyBottom, y: 4 })).toBe(false);
  });
});

describe('canAddPiece - blocks in the way', () => {
  // prettier-ignore
  const piece = {
    x: 0, y: 0, p: [
      [_,_,_],
      [8,8,8],
      [_,8,_]
    ]
  };

  it('should return true if the given piece can be added', () => {
    // prettier-ignore
    expect(canAddPiece([
      [_,_,_,_],
      [_,_,_,_],
      [_,_,_,_],
      [_,_,_,_]
    ], piece)).toBe(true);

    // prettier-ignore
    expect(canAddPiece([
      [2,2,2,2],
      [_,_,_,2],
      [2,_,2,2],
      [2,2,2,2]
    ], piece)).toBe(true);

    // prettier-ignore
    expect(canAddPiece([
      [2,2,2,2],
      [2,2,2,2],
      [2,_,_,_],
      [2,2,_,2]
    ], {...piece, x:1, y:1 })).toBe(true);
  });

  it('should return false if the given piece cannot be added', () => {
    // prettier-ignore
    expect(canAddPiece([
      [_,_,_,_],
      [_,_,2,_],
      [_,_,_,_],
      [_,_,_,_]
    ], piece)).toBe(false);

    // prettier-ignore
    expect(canAddPiece([
      [2,2,2,2],
      [2,2,2,2],
      [2,_,2,_],
      [2,2,_,2]
    ], {...piece, x:1, y:1 })).toBe(false);
  });

  it('should be able to add a piece with empty sides', () => {
    // prettier-ignore
    const board = [
      [_,_,_,_],
      [_,_,_,_],
      [_,_,_,_],
      [_,_,_,_]
    ];
    // prettier-ignore
    const piece = {
      x:0, y:0, p: [
        [_,8,_],
        [_,8,_],
        [_,8,_]
      ]
    };
    expect(canAddPiece(board, { ...piece, x: 0, y: 0 })).toBe(true);
    expect(canAddPiece(board, { ...piece, x: -1, y: 0 })).toBe(true);
    expect(canAddPiece(board, { ...piece, x: -2, y: 0 })).toBe(false);
    expect(canAddPiece(board, { ...piece, x: 1, y: 0 })).toBe(true);
    expect(canAddPiece(board, { ...piece, x: 2, y: 0 })).toBe(true);
    expect(canAddPiece(board, { ...piece, x: 3, y: 0 })).toBe(false);
  });

  it('should be able to add a piece with empty bottom rows at bottom', () => {
    // prettier-ignore
    const board = [
      [X,_,_,_,_,X],
      [X,_,_,_,_,X],
      [X,_,_,_,_,X],
      [X,_,_,_,_,X],
      [X,X,X,X,X,X]
    ];
    // prettier-ignore
    const piece = {
      x:0, y:0, p: [
        [8,8,8],
        [_,_,_],
        [_,_,_]
      ]
    };
    expect(canAddPiece(board, { ...piece, x: 1, y: 0 })).toBe(true);
    expect(canAddPiece(board, { ...piece, x: 1, y: 1 })).toBe(true);
    expect(canAddPiece(board, { ...piece, x: 1, y: 2 })).toBe(true);
    expect(canAddPiece(board, { ...piece, x: 1, y: 3 })).toBe(true);
    expect(canAddPiece(board, { ...piece, x: 1, y: 4 })).toBe(false);
  });
});

describe('isRowComplete', () => {
  it('should return true if the row is complete', () => {
    expect(isRowComplete([X, _, _, _, X])).toBe(false);
    expect(isRowComplete([X, 1, 1, _, X])).toBe(false);
    expect(isRowComplete([X, 1, 1, 1, X])).toBe(true);
    expect(isRowComplete([X, X, X, X, X])).toBe(false);
  });
});

describe('getCompleteRows', () => {
  it('should return the index of complete rows', () => {
    // prettier-ignore
    expect(getCompleteRows([
      [X,_,_,_,_,X],
      [X,1,_,1,1,X],
      [X,1,1,1,1,X],
      [X,_,1,_,_,X],
      [X,1,1,1,1,X],
      [X,X,X,X,X,X]
    ])).toEqual([2,4]);
    // prettier-ignore
    expect(getCompleteRows([
      [X,_,1,_,_,X],
      [X,1,1,1,1,X],
      [X,X,X,X,X,X]
    ])).toEqual([1]);
    // prettier-ignore
    expect(getCompleteRows([
      [X,_,_,_,_,X],
      [X,_,_,1,1,X],
      [X,X,X,X,X,X]
    ])).toEqual([]);
  });
});

describe('hasCompleteRows', () => {
  it('should return true for boards with complete rows', () => {
    // prettier-ignore
    expect(hasCompleteRows([
      [X,_,_,_,X],
      [X,1,_,1,X],
      [X,1,1,1,X],
      [X,X,X,X,X]
    ])).toBe(true);
  });

  it('should return false for boards with no complete rows', () => {
    // prettier-ignore
    expect(hasCompleteRows([
      [X,_,_,_,X],
      [X,1,_,1,X],
      [X,1,_,1,X],
      [X,X,X,X,X]
    ])).toBe(false);
  });
});

describe('remove complete rows', () => {
  it('should remove the lowest complete row', () => {
    // prettier-ignore
    expect(removeLowestCompleteRow([
      [X,_,_,_,_,X],
      [X,_,3,3,_,X],
      [X,2,2,2,2,X],
      [X,_,1,_,_,X],
      [X,X,X,X,X,X]
    ])).toEqual([
      [X,_,_,_,_,X],
      [X,_,_,_,_,X],
      [X,_,3,3,_,X],
      [X,_,1,_,_,X],
      [X,X,X,X,X,X]
    ]);
    // prettier-ignore
    expect(removeLowestCompleteRow([
      [X,_,_,_,_,X],
      [X,3,3,3,3,X],
      [X,2,2,2,2,X],
      [X,_,1,_,_,X],
      [X,X,X,X,X,X]
    ])).toEqual([
      [X,_,_,_,_,X],
      [X,_,_,_,_,X],
      [X,3,3,3,3,X],
      [X,_,1,_,_,X],
      [X,X,X,X,X,X]
    ]);
    // prettier-ignore
    expect(removeLowestCompleteRow([
      [X,_,_,_,_,X],
      [X,3,3,3,3,X],
      [X,2,2,2,2,X],
      [X,1,1,1,1,X],
      [X,X,X,X,X,X]
    ])).toEqual([
      [X,_,_,_,_,X],
      [X,_,_,_,_,X],
      [X,3,3,3,3,X],
      [X,2,2,2,2,X],
      [X,X,X,X,X,X]
    ]);
    // prettier-ignore
    expect(removeLowestCompleteRow([
      [X,_,_,_,_,X],
      [X,_,3,3,_,X],
      [X,_,2,2,2,X],
      [X,_,1,_,_,X],
      [X,X,X,X,X,X]
    ])).toEqual([
      [X,_,_,_,_,X],
      [X,_,3,3,_,X],
      [X,_,2,2,2,X],
      [X,_,1,_,_,X],
      [X,X,X,X,X,X]
    ]);
  });

  it('should remove all complete rows', () => {
    // prettier-ignore
    expect(removeCompleteRows([
      [X,_,4,4,_,X],
      [X,3,3,3,3,X],
      [X,2,2,2,2,X],
      [X,_,1,_,_,X],
      [X,X,X,X,X,X]
    ])).toEqual([
      [X,_,_,_,_,X],
      [X,_,_,_,_,X],
      [X,_,4,4,_,X],
      [X,_,1,_,_,X],
      [X,X,X,X,X,X]
    ]);
  });
});

describe('score', () => {
  it('should return 0 for 0 complete rows', () => {
    // prettier-ignore
    expect(getScore([
      [4,_,_,_],
      [_,3,_,_],
      [_,_,2,_],
      [_,_,_,1]
    ])).toBe(0);
  });

  it('should return 100 for 1 complete row', () => {
    // prettier-ignore
    expect(getScore([
      [4,_,_,_],
      [_,3,_,_],
      [2,2,2,2],
      [_,_,_,1]
    ])).toBe(100);
  });

  it('should return 200 for 2 complete rows', () => {
    // prettier-ignore
    expect(getScore([
      [4,_,_,_],
      [_,3,_,_],
      [2,2,2,2],
      [1,1,1,1]
    ])).toBe(200);
  });

  it('should return 400 for 3 complete rows', () => {
    // prettier-ignore
    expect(getScore([
      [4,_,_,_],
      [3,3,3,3],
      [2,2,2,2],
      [1,1,1,1]
    ])).toBe(400);
  });

  it('should return 800 for 4 complete rows', () => {
    // prettier-ignore
    expect(getScore([
      [4,4,4,4],
      [3,3,3,3],
      [2,2,2,2],
      [1,1,1,1]
    ])).toBe(800);
  });
});
