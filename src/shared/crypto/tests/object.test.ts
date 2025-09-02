import object from '../object.js';

describe('shared.crypto.object', () => {
  test('Encrypt', () => {
    const res = object.encrypt({
      hello: 'world',
    });
    expect(res).toBe(
      'eyJoZWxsbyI6IndvcmxkIn0tbG90c29mLnN1Z2FyLmNyeXB0by5vYmplY3Q=',
    );
  });
  test('Decrypt', () => {
    const res = object.decrypt(
      'eyJoZWxsbyI6IndvcmxkIn0tbG90c29mLnN1Z2FyLmNyeXB0by5vYmplY3Q',
    );
    expect(res).toEqual({
      hello: 'world',
    });
  });
});
