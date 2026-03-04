import { describe, expect, it } from 'vitest';
import getTranslateProperties from './getTranslateProperties.js';

describe('getTranslateProperties', () => {
  it('returns x, y, z 0 for element with no transform', () => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    const result = getTranslateProperties(el);
    document.body.removeChild(el);
    expect(result).toEqual({ x: 0, y: 0, z: 0 });
  });

  it('returns x translate for translateX', () => {
    const el = document.createElement('div');
    el.style.transform = 'translateX(50px)';
    document.body.appendChild(el);
    const result = getTranslateProperties(el);
    document.body.removeChild(el);
    expect(result.x).toBeCloseTo(50, 0);
    expect(result.y).toBeCloseTo(0, 0);
  });

  it('returns y translate for translateY', () => {
    const el = document.createElement('div');
    el.style.transform = 'translateY(30px)';
    document.body.appendChild(el);
    const result = getTranslateProperties(el);
    document.body.removeChild(el);
    expect(result.y).toBeCloseTo(30, 0);
    expect(result.x).toBeCloseTo(0, 0);
  });

  it('returns both x and y for translate', () => {
    const el = document.createElement('div');
    el.style.transform = 'translate(20px, 40px)';
    document.body.appendChild(el);
    const result = getTranslateProperties(el);
    document.body.removeChild(el);
    expect(result.x).toBeCloseTo(20, 0);
    expect(result.y).toBeCloseTo(40, 0);
  });

  it('returns z 0 for 2D transforms', () => {
    const el = document.createElement('div');
    el.style.transform = 'translateX(10px)';
    document.body.appendChild(el);
    const result = getTranslateProperties(el);
    document.body.removeChild(el);
    expect(result.z).toBe(0);
  });

  it('has x, y, z properties', () => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    const result = getTranslateProperties(el);
    document.body.removeChild(el);
    expect(result).toHaveProperty('x');
    expect(result).toHaveProperty('y');
    expect(result).toHaveProperty('z');
  });
});
