import { describe, expect, test } from 'vitest';
import parseHsla from './parseHsla.js';

describe('parseHsla', () => {
  test('hsla string', () => {
    const r = parseHsla('hsla(120, 50, 50, 0.5)');
    expect(r).toMatchObject({ h: 120, s: 50, l: 50, a: 0.5 });
  });
  test('hsl string defaults alpha to 1', () => {
    expect(parseHsla('hsl(120, 50, 50)').a).toBe(1);
  });
  test('toString', () => {
    expect(parseHsla('hsl(0, 0, 0)').toString()).toBe('hsla(0, 0, 0, 1)');
  });
});
