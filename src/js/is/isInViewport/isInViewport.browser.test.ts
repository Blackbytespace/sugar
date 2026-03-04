import { describe, expect, it } from 'vitest';
import isInViewport from './isInViewport.js';

describe('isInViewport', () => {
  it('returns true for an element placed in the viewport', () => {
    const el = document.createElement('div');
    el.style.width = '100px';
    el.style.height = '100px';
    el.style.position = 'fixed';
    el.style.top = '0';
    el.style.left = '0';
    document.body.appendChild(el);
    const result = isInViewport(el);
    document.body.removeChild(el);
    expect(result).toBe(true);
  });

  it('returns false for an element positioned far outside the viewport', () => {
    const el = document.createElement('div');
    el.style.width = '100px';
    el.style.height = '100px';
    el.style.position = 'fixed';
    el.style.top = '-9999px';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    const result = isInViewport(el);
    document.body.removeChild(el);
    expect(result).toBe(false);
  });

  it('returns false for a hidden element with zero dimensions', () => {
    const el = document.createElement('div');
    el.style.width = '0';
    el.style.height = '0';
    el.style.position = 'fixed';
    el.style.top = '0';
    el.style.left = '0';
    document.body.appendChild(el);
    const result = isInViewport(el);
    document.body.removeChild(el);
    expect(result).toBe(false);
  });

  it('returns false when passed a falsy value', () => {
    expect(isInViewport(null as unknown as HTMLElement)).toBe(false);
  });

  it('returns a boolean', () => {
    const el = document.createElement('div');
    el.style.width = '10px';
    el.style.height = '10px';
    document.body.appendChild(el);
    const result = isInViewport(el);
    document.body.removeChild(el);
    expect(typeof result).toBe('boolean');
  });
});
