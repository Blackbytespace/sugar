import { describe, expect, test } from 'vitest';
import hexToRgba from './hexToRgba.js';

describe('hexToRgba', () => {
  test('6-digit hex', () => {
    const r = hexToRgba('#ff0000');
    expect(r).toMatchObject({ r: 255, g: 0, b: 0, a: 1 });
  });
  test('3-digit hex', () => {
    const r = hexToRgba('#f00');
    expect(r).toMatchObject({ r: 255, g: 0, b: 0, a: 1 });
  });
  test('toString', () => {
    expect(hexToRgba('#00ff00').toString()).toBe('rgba(0, 255, 0, 1)');
  });
});
