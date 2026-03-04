import { describe, expect, it } from 'vitest';
import isUserScrolling from './isUserScrolling.js';

describe('isUserScrolling', () => {
  it('returns false initially when no scrolling has occurred', () => {
    const el = document.createElement('div');
    el.style.width = '200px';
    el.style.height = '200px';
    el.style.overflowY = 'scroll';
    document.body.appendChild(el);
    // First call registers listeners; no scroll has occurred yet
    const result = isUserScrolling(el);
    document.body.removeChild(el);
    expect(result).toBe(false);
  });

  it('returns false for an element the pointer has not entered', () => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    // _isUserInteractive is undefined → returns false
    const result = isUserScrolling(el);
    document.body.removeChild(el);
    expect(result).toBe(false);
  });

  it('returns a boolean', () => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    const result = isUserScrolling(el);
    document.body.removeChild(el);
    expect(typeof result).toBe('boolean');
  });
});
