import { describe, expect, test } from 'vitest';
import parseColor from './parseColor.js';

describe('parseColor', () => {
  test('rgba input → rgba', () => {
    const r = parseColor('rgba(255,0,0,1)');
    expect(r).toMatchObject({ r: 255, g: 0, b: 0, a: 1 });
  });
  test('hsl input → rgba', () => {
    const r = parseColor('hsl(0,100,50)') as any;
    expect(r.r).toBe(255);
  });
  test('hex input → rgba', () => {
    const r = parseColor('#ff0000') as any;
    expect(r.r).toBe(255);
  });
  test('rgba input → hsla', () => {
    const r = parseColor('rgba(255,0,0,1)', 'hsla') as any;
    expect(r.h).toBe(0);
  });
  test('invalid throws', () => {
    expect(() => parseColor('blue')).toThrow();
  });
});
