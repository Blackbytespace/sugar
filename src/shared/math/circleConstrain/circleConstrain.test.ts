import { describe, it, expect } from 'vitest';
import circleConstrain from './circleConstrain.js';

describe('circleConstrain', () => {
  it('returns point when inside circle', () => {
    const center = { x: 10, y: 10 };
    const radius = 5;
    const point = { x: 12, y: 12 };
    
    expect(circleConstrain(center, radius, point)).toEqual(point);
  });

  it('returns center when point is at center', () => {
    const center = { x: 0, y: 0 };
    const radius = 10;
    const point = { x: 0, y: 0 };
    
    expect(circleConstrain(center, radius, point)).toEqual(point);
  });

  it('constrains point outside circle', () => {
    const center = { x: 0, y: 0 };
    const radius = 5;
    const point = { x: 10, y: 0 };
    
    const result = circleConstrain(center, radius, point);
    expect(result.x).toBe(5);
    expect(result.y).toBe(0);
  });

  it('constrains point on exact boundary', () => {
    const center = { x: 0, y: 0 };
    const radius = 5;
    const point = { x: 5, y: 0 };
    
    const result = circleConstrain(center, radius, point);
    expect(Math.abs(result.x - 5)).toBeLessThan(0.001);
    expect(Math.abs(result.y - 0)).toBeLessThan(0.001);
  });
});