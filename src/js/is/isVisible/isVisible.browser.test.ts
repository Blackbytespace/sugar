import { describe, expect, it } from 'vitest';
import isVisible from './isVisible.js';

describe('isVisible', () => {
  it('returns true for a visible element', () => {
    const el = document.createElement('div');
    el.style.width = '100px';
    el.style.height = '100px';
    document.body.appendChild(el);
    const result = isVisible(el);
    document.body.removeChild(el);
    expect(result).toBe(true);
  });

  it('returns false for an element with display:none', () => {
    const el = document.createElement('div');
    el.style.display = 'none';
    document.body.appendChild(el);
    const result = isVisible(el);
    document.body.removeChild(el);
    expect(result).toBe(false);
  });

  it('returns false for an element with visibility:hidden', () => {
    const el = document.createElement('div');
    el.style.width = '100px';
    el.style.height = '100px';
    el.style.visibility = 'hidden';
    document.body.appendChild(el);
    const result = isVisible(el);
    document.body.removeChild(el);
    expect(result).toBe(false);
  });

  it('returns false for an element with opacity:0', () => {
    const el = document.createElement('div');
    el.style.width = '100px';
    el.style.height = '100px';
    el.style.opacity = '0';
    document.body.appendChild(el);
    const result = isVisible(el);
    document.body.removeChild(el);
    expect(result).toBe(false);
  });

  it('returns true for a script element', () => {
    const el = document.createElement('script');
    document.body.appendChild(el);
    const result = isVisible(el);
    document.body.removeChild(el);
    expect(result).toBe(true);
  });

  it('returns a boolean', () => {
    const el = document.createElement('div');
    el.style.width = '10px';
    el.style.height = '10px';
    document.body.appendChild(el);
    const result = isVisible(el);
    document.body.removeChild(el);
    expect(typeof result).toBe('boolean');
  });
});
