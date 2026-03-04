import { describe, expect, it } from 'vitest';
import isHover from './isHover.js';

describe('isHover', () => {
  it('returns false when the element is not hovered', () => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    // No pointer interaction — :hover should be false
    const result = isHover(el);
    document.body.removeChild(el);
    expect(result).toBe(false);
  });

  it('returns a boolean', () => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    const result = isHover(el);
    document.body.removeChild(el);
    expect(typeof result).toBe('boolean');
  });

  it('does not throw', () => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    expect(() => isHover(el)).not.toThrow();
    document.body.removeChild(el);
  });
});
