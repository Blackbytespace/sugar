import { describe, expect, it } from 'vitest';
import getScaleProperty from './getScaleProperty.js';

describe('getScaleProperty', () => {
  it('returns undefined when no transform', () => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    const result = getScaleProperty(el);
    document.body.removeChild(el);
    // no transform = no matrix computed = returns undefined
    expect(result).toBeUndefined();
  });

  it('returns x, y, z 1 for identity scale', () => {
    const el = document.createElement('div');
    el.style.transform = 'scale(1)';
    document.body.appendChild(el);
    const result = getScaleProperty(el);
    document.body.removeChild(el);
    expect(result).toBeDefined();
    expect(result!.x).toBeCloseTo(1, 5);
    expect(result!.y).toBeCloseTo(1, 5);
  });

  it('returns correct x scale for scaleX(2)', () => {
    const el = document.createElement('div');
    el.style.transform = 'scaleX(2)';
    document.body.appendChild(el);
    const result = getScaleProperty(el);
    document.body.removeChild(el);
    expect(result).toBeDefined();
    expect(result!.x).toBeCloseTo(2, 5);
    expect(result!.y).toBeCloseTo(1, 5);
  });

  it('returns correct y scale for scaleY(3)', () => {
    const el = document.createElement('div');
    el.style.transform = 'scaleY(3)';
    document.body.appendChild(el);
    const result = getScaleProperty(el);
    document.body.removeChild(el);
    expect(result).toBeDefined();
    expect(result!.x).toBeCloseTo(1, 5);
    expect(result!.y).toBeCloseTo(3, 5);
  });

  it('returns x and y for scale(2, 3)', () => {
    const el = document.createElement('div');
    el.style.transform = 'scale(2, 3)';
    document.body.appendChild(el);
    const result = getScaleProperty(el);
    document.body.removeChild(el);
    expect(result).toBeDefined();
    expect(result!.x).toBeCloseTo(2, 5);
    expect(result!.y).toBeCloseTo(3, 5);
  });

  it('z is always 1', () => {
    const el = document.createElement('div');
    el.style.transform = 'scale(2)';
    document.body.appendChild(el);
    const result = getScaleProperty(el);
    document.body.removeChild(el);
    expect(result!.z).toBe(1);
  });
});
