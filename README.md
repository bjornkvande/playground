# Trailguide code training camp and playground

```
git clone https://github.com/bjornkvande/playground.git
cd playground
npm install
npm i -g jest
```

### Run the tests

```
jest
```

They should fail miserably

```
70 | test('Z should be the correct shape', () => {
      71 |   // prettier-ignore
    > 72 |   expect(Z).toEqual([
         |             ^
      73 |     [z,z,_],
      74 |     [_,z,z]
      75 |   ]);
```

### Make the tests run

Implement the code in the pieces.js and piece.js files and make the tests
run properly.

To make it easier you can run one test suite at a time using the following

```
jest pieces.test
jest piece.test
```

To make it even more controllable, you can run one and one test inside
a test file by adding a .only behind the it, describe, or test functions.

```
test.only('J should be the correct shape', () => {
  // prettier-ignore
  expect(J).toEqual([
    [_,_,_],
    [j,j,j],
    [_,_,j]
  ]);
});

```
