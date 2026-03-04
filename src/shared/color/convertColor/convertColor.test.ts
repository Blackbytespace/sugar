import { describe, expect, test } from 'vitest';
import convertColor from './convertColor.js';

describe('convertColor', () => {
  test('string → rgba', () => {
    const r = convertColor('rgba(255,0,0,1)', 'rgba') as any;
    expect(r).toMatchObject({ r: 255, g: 0, b: 0 });
  });
  test('string → hex', () => {
    expect(convertColor('rgba(255,0,0,1)', 'hex')).toBe('#ff0000');
  });
  test('string → hsl', () => {
    const r = convertColor('rgba(255,0,0,1)', 'hsl') as any;
    expect(r.h).toBe(0);
  });
  test('string → hsla', () => {
    const r = convertColor('rgba(255,0,0,1)', 'hsla') as any;
    expect(r.h).toBe(0);
    expect(r.a).toBe(1);
  });
  test('rgba object input → hex', () => {
    expect(convertColor({ r: 255, g: 0, b: 0, a: 1 }, 'hex')).toBe('#ff0000');
  });
  test('hsla object input → hex', () => {
    expect(convertColor({ h: 0, s: 100, l: 50 }, 'hex')).toBe('#ff0000');
  });
  test('string → rgb (no alpha)', () => {
    const r = convertColor('rgba(255,0,0,1)', 'rgb') as any;
    expect(r.r).toBe(255);
    expect(r.a).toBeUndefined();
  });
});
