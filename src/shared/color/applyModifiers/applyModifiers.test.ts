import { describe, expect, test } from 'vitest';
import applyModifiers from './applyModifiers.js';

describe('applyModifiers', () => {
  test('lighten', () => {
    const r = applyModifiers('#800000', { lighten: 10 });
    expect(r.hsla.l).toBeGreaterThan(25);
  });
  test('darken', () => {
    const r = applyModifiers('#ff0000', { darken: 10 });
    expect(r.hsla.l).toBe(40);
  });
  test('lightness clamp', () => {
    const r = applyModifiers('#ff0000', { lightness: 150 });
    expect(r.hsla.l).toBe(100);
  });
  test('saturate', () => {
    const r = applyModifiers('#808080', { saturate: 20 });
    expect(r.hsla.s).toBe(20);
  });
  test('desaturate', () => {
    const r = applyModifiers('#ff0000', { desaturate: 20 });
    expect(r.hsla.s).toBe(80);
  });
  test('hue', () => {
    const r = applyModifiers('#ff0000', { hue: 120 });
    expect(r.hsla.h).toBe(120);
  });
  test('spin', () => {
    const r = applyModifiers('#ff0000', { spin: 60 });
    expect(r.hsla.h).toBe(60);
  });
  test('alpha', () => {
    const r = applyModifiers('#ff0000', { alpha: 0.5 });
    expect(r.hsla.a).toBe(0.5);
  });
  test('returns hex, rgba, hsla', () => {
    const r = applyModifiers('#ff0000', {});
    expect(r.hex).toBe('#ff0000');
    expect(r.rgba.r).toBe(255);
    expect(r.hsla.h).toBe(0);
  });
});
