import { describe, expect, it } from 'vitest';
import isScrollable from './isScrollable.js';

describe('isScrollable', () => {
  it('returns true for a vertically scrollable element', () => {
    const el = document.createElement('div');
    el.style.width = '200px';
    el.style.height = '100px';
    el.style.overflowY = 'scroll';
    const inner = document.createElement('div');
    inner.style.height = '500px';
    el.appendChild(inner);
    document.body.appendChild(el);
    const result = isScrollable(el);
    document.body.removeChild(el);
    expect(result).toBe(true);
  });

  it('returns true for a horizontally scrollable element', () => {
    const el = document.createElement('div');
    el.style.width = '100px';
    el.style.height = '100px';
    el.style.overflowX = 'scroll';
    const inner = document.createElement('div');
    inner.style.width = '500px';
    inner.style.height = '50px';
    el.appendChild(inner);
    document.body.appendChild(el);
    const result = isScrollable(el, { x: true, y: false });
    document.body.removeChild(el);
    expect(result).toBe(true);
  });

  it('returns false for a non-scrollable element', () => {
    const el = document.createElement('div');
    el.style.width = '200px';
    el.style.height = '200px';
    el.style.overflow = 'hidden';
    document.body.appendChild(el);
    const result = isScrollable(el);
    document.body.removeChild(el);
    expect(result).toBe(false);
  });

  it('returns false for a non-Element value', () => {
    expect(isScrollable({} as HTMLElement)).toBe(false);
  });

  it('returns false when only x is checked but element only scrolls vertically', () => {
    const el = document.createElement('div');
    el.style.width = '200px';
    el.style.height = '100px';
    el.style.overflowY = 'scroll';
    el.style.overflowX = 'hidden';
    const inner = document.createElement('div');
    inner.style.height = '500px';
    el.appendChild(inner);
    document.body.appendChild(el);
    const result = isScrollable(el, { x: true, y: false });
    document.body.removeChild(el);
    expect(result).toBe(false);
  });

  it('returns a boolean', () => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    const result = isScrollable(el);
    document.body.removeChild(el);
    expect(typeof result).toBe('boolean');
  });
});
