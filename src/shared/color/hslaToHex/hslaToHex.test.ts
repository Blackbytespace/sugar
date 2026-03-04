import { describe, expect, test } from 'vitest';
import parseHsla from '../parseHsla/parseHsla.js';
import hslaToHex from './hslaToHex.js';

describe('hslaToHex', () => {
  test('red', () => expect(hslaToHex(0, 100, 50, 1)).toBe('#ff0000'));
  test('black', () => expect(hslaToHex(0, 0, 0, 1)).toBe('#000000'));
  test('string input (parsed before call)', () => {
    const parsed = parseHsla('hsl(0, 100, 50)');
    expect(hslaToHex(parsed.h, parsed.s, parsed.l, parsed.a)).toBe('#ff0000');
  });
});
