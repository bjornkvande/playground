import { I, J, L, O, S, T, Z } from './pieces';

export function moveDown(piece){
  return { 
    x : piece.x,
    y : piece.y + 1,
    p : [...piece.p]
  };
};

export function moveRight(piece){
  return { 
    x : piece.x + 1,
    y : piece.y,
    p : [...piece.p]
  };
};

export function moveLeft(piece){
  return { 
    x : piece.x - 1,
    y : piece.y,
    p : [...piece.p]
  };
};

export function randomPiece(){
  const pieces = [I, J, L, O, S, T, Z];
  return pieces[Math.floor(Math.random() * pieces.length)];
};

export function right(piece){
  const N = piece.length - 1;
  return piece[0].map((e, i) => 
    piece.map((row, j) => piece[N - j][i])
  );
};

export function left(piece){
  return right(right(right(piece)))
}

export function rotateRight(piece){
  return {x : piece.x, y : piece.y, p : right([...piece.p])}
};

export function rotateLeft(piece){
  return {x : piece.x, y : piece.y, p : left([...piece.p])}
};