/* globals expect, test */

import { I, J, L, O, S, T, Z } from '../pieces';

const i = 'I';
const j = 'J';
const l = 'L';
const o = 'O';
const s = 'S';
const t = 'T';
const z = 'Z';
const _ = ' ';

// to run tests one by one, just say test.only(...);

test('I should be the correct shape', () => {
  // prettier-ignore
  expect(I).toEqual([
    [_,_,_,_],
    [_,_,_,_],
    [i,i,i,i],
    [_,_,_,_],
    [_,_,_,_]
  ]);
});

test('J should be the correct shape', () => {
  // prettier-ignore
  expect(J).toEqual([
    [_,_,_],
    [j,j,j],
    [_,_,j]
  ]);
});

test('L should be the correct shape', () => {
  // prettier-ignore
  expect(L).toEqual([
    [_,_,_],
    [l,l,l],
    [l,_,_]
  ]);
});

test('O should be the correct shape', () => {
  // prettier-ignore
  expect(O).toEqual([
    [o,o],
    [o,o]
  ]);
});

test('S should be the correct shape', () => {
  // prettier-ignore
  expect(S).toEqual([
    [_,s,s],
    [s,s,_]
  ]);
});

test('T should be the correct shape', () => {
  // prettier-ignore
  expect(T).toEqual([
    [_,_,_],
    [t,t,t],
    [_,t,_]
  ]);
});

test('Z should be the correct shape', () => {
  // prettier-ignore
  expect(Z).toEqual([
    [z,z,_],
    [_,z,z]
  ]);
});
