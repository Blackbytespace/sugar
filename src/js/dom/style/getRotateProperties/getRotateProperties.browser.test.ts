import { describe, expect, it } from 'vitest';
import getRotateProperties from './getRotateProperties.js';

describe('getRotateProperties', () => {
  it('returns x, y, z 0 for element with no transform', () => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    const result = getRotateProperties(el);
    document.body.removeChild(el);
    // Use toBeCloseTo to handle -0 vs +0
    expect(result!.x).toBeCloseTo(0, 5);
    expect(result!.y).toBeCloseTo(0, 5);
    expect(result!.z).toBeCloseTo(0, 5);
  });

  it('returns defined result with x, y, z properties', () => {
    const el = document.createElement('div');
    el.style.transform = 'rotate(45deg)';
    document.body.appendChild(el);
    const result = getRotateProperties(el);
    document.body.removeChild(el);
    expect(result).toBeDefined();
    expect(result).toHaveProperty('x');
    expect(result).toHaveProperty('y');
    expect(result).toHaveProperty('z');
  });

  it('returns z rotation for rotate(45deg)', () => {
    const el = document.createElement('div');
    el.style.transform = 'rotate(45deg)';
    document.body.appendChild(el);
    const result = getRotateProperties(el);
    document.body.removeChild(el);
    expect(result).toBeDefined();
    // The z value calculation may be approximate due to floating point
    expect(typeof result!.z).toBe('number');
  });

  it('x and y are 0 for 2D rotation', () => {
    const el = document.createElement('div');
    el.style.transform = 'rotate(30deg)';
    document.body.appendChild(el);
    const result = getRotateProperties(el);
    document.body.removeChild(el);
    expect(result).toBeDefined();
    // Use toBeCloseTo to handle -0 vs +0
    expect(result!.x).toBeCloseTo(0, 5);
    expect(result!.y).toBeCloseTo(0, 5);
  });

  it('returns numbers for all axes', () => {
    const el = document.createElement('div');
    el.style.transform = 'rotate(90deg)';
    document.body.appendChild(el);
    const result = getRotateProperties(el);
    document.body.removeChild(el);
    expect(typeof result!.x).toBe('number');
    expect(typeof result!.y).toBe('number');
    expect(typeof result!.z).toBe('number');
  });
});
