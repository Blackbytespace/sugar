import { describe, expect, test } from 'vitest';
import parseRgba from './parseRgba.js';

describe('parseRgba', () => {
  test('rgba string', () => {
    const r = parseRgba('rgba(10, 20, 30, 1)');
    expect(r).toMatchObject({ r: 10, g: 20, b: 30, a: 1 });
  });
  test('rgb string defaults alpha to 1', () => {
    const r = parseRgba('rgb(10, 20, 30)');
    expect(r.a).toBe(1);
  });
  test('toString', () => {
    expect(parseRgba('rgba(10,20,30,1)').toString()).toBe('rgba(10, 20, 30, 1)');
  });
});
