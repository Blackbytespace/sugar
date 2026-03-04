import { describe, expect, test } from 'vitest';
import parseHsla from '../parseHsla/parseHsla.js';
import hslaToHexa from './hslaToHexa.js';

describe('hslaToHexa', () => {
  test('red fully opaque', () => expect(hslaToHexa(0, 100, 50, 1)).toBe('#ff0000ff'));
  test('string input (parsed before call)', () => {
    const parsed = parseHsla('hsl(0, 100, 50)');
    expect(hslaToHexa(parsed.h, parsed.s, parsed.l, parsed.a)).toBe('#ff0000ff');
  });
});
