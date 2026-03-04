import { describe, expect, test } from 'vitest';
import rgbaToHsla from './rgbaToHsla.js';

describe('rgbaToHsla', () => {
  test('red → h=0', () => {
    const r = rgbaToHsla(255, 0, 0, 1);
    expect(r.h).toBe(0);
    expect(r.s).toBe(100);
    expect(r.l).toBe(50);
  });
  test('string input', () => {
    const r = rgbaToHsla('rgba(255, 0, 0, 1)' as any);
    expect(r.h).toBe(0);
  });
  test('object input', () => {
    const r = rgbaToHsla({ r: 0, g: 255, b: 0, a: 1 } as any);
    expect(r.h).toBe(120);
  });
  test('toString', () => {
    expect(rgbaToHsla(255, 0, 0, 1).toString()).toBe('hsla(0, 100%, 50%, 1)');
  });
});
