import { describe, expect, test } from 'vitest';
import parseRgba from '../parseRgba/parseRgba.js';
import rgbaToHex from './rgbaToHex.js';

describe('rgbaToHex', () => {
  test('numbers', () => expect(rgbaToHex(255, 0, 0, 1)).toBe('#ff0000'));
  test('zero-pads single digit', () => expect(rgbaToHex(0, 0, 0, 1)).toBe('#000000'));
  test('string input (parsed before call)', () => {
    const parsed = parseRgba('rgba(255, 0, 0, 1)');
    expect(rgbaToHex(parsed.r, parsed.g, parsed.b, parsed.a)).toBe('#ff0000');
  });
});
