import { describe, expect, test } from 'vitest';
import parseHsla from '../parseHsla/parseHsla.js';
import hslaToRgba from './hslaToRgba.js';

describe('hslaToRgba', () => {
  test('red: hsl(0,100,50)', () => {
    const r = hslaToRgba(0, 100, 50, 1);
    expect(r).toMatchObject({ r: 255, g: 0, b: 0, a: 1 });
  });
  test('green: hsl(120,100,50)', () => {
    const r = hslaToRgba(120, 100, 50, 1);
    expect(r).toMatchObject({ r: 0, g: 255, b: 0, a: 1 });
  });
  test('string input (parsed to object before call)', () => {
    const parsed = parseHsla('hsl(0, 100, 50)');
    const r = hslaToRgba(parsed.h, parsed.s, parsed.l, parsed.a);
    expect(r.r).toBe(255);
  });
  test('toString', () => {
    expect(hslaToRgba(0, 100, 50, 1).toString()).toBe('rgba(255, 0, 0, 1)');
  });
});
