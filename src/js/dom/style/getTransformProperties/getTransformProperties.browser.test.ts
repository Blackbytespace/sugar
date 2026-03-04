import { describe, expect, it } from 'vitest';
import getTransformProperties from './getTransformProperties.js';

describe('getTransformProperties', () => {
  it('returns all six transform properties', () => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    const result = getTransformProperties(el);
    document.body.removeChild(el);
    expect(result).toHaveProperty('translateX');
    expect(result).toHaveProperty('translateY');
    expect(result).toHaveProperty('translateZ');
    expect(result).toHaveProperty('rotateX');
    expect(result).toHaveProperty('rotateY');
    expect(result).toHaveProperty('rotateZ');
  });

  it('returns zeros for element with no transform', () => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    const result = getTransformProperties(el);
    document.body.removeChild(el);
    expect(result.translateX).toBe(0);
    expect(result.translateY).toBe(0);
    expect(result.translateZ).toBe(0);
  });

  it('returns translateX for translateX(50px)', () => {
    const el = document.createElement('div');
    el.style.transform = 'translateX(50px)';
    document.body.appendChild(el);
    const result = getTransformProperties(el);
    document.body.removeChild(el);
    expect(result.translateX).toBeCloseTo(50, 0);
  });

  it('returns translateY for translateY(30px)', () => {
    const el = document.createElement('div');
    el.style.transform = 'translateY(30px)';
    document.body.appendChild(el);
    const result = getTransformProperties(el);
    document.body.removeChild(el);
    expect(result.translateY).toBeCloseTo(30, 0);
  });

  it('combines rotate and translate', () => {
    const el = document.createElement('div');
    el.style.transform = 'translateX(20px) rotate(45deg)';
    document.body.appendChild(el);
    const result = getTransformProperties(el);
    document.body.removeChild(el);
    expect(typeof result.rotateZ).toBe('number');
    expect(typeof result.translateX).toBe('number');
  });

  it('all values are numbers', () => {
    const el = document.createElement('div');
    el.style.transform = 'translate(10px, 20px)';
    document.body.appendChild(el);
    const result = getTransformProperties(el);
    document.body.removeChild(el);
    expect(typeof result.translateX).toBe('number');
    expect(typeof result.translateY).toBe('number');
    expect(typeof result.rotateX).toBe('number');
    expect(typeof result.rotateY).toBe('number');
    expect(typeof result.rotateZ).toBe('number');
  });
});
