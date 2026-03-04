import { describe, expect, it } from 'vitest';
import isFocus from './isFocus.js';

describe('isFocus', () => {
  it('returns true when the element has focus', async () => {
    const input = document.createElement('input');
    document.body.appendChild(input);
    input.focus();
    const result = isFocus(input);
    document.body.removeChild(input);
    expect(result).toBe(true);
  });

  it('returns false when the element does not have focus', () => {
    const input = document.createElement('input');
    const other = document.createElement('input');
    document.body.appendChild(input);
    document.body.appendChild(other);
    other.focus();
    const result = isFocus(input);
    document.body.removeChild(input);
    document.body.removeChild(other);
    expect(result).toBe(false);
  });

  it('returns false when no element is focused', () => {
    const input = document.createElement('input');
    document.body.appendChild(input);
    // blur any active element
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    const result = isFocus(input);
    document.body.removeChild(input);
    expect(result).toBe(false);
  });

  it('returns a boolean', () => {
    const el = document.createElement('button');
    document.body.appendChild(el);
    const result = isFocus(el);
    document.body.removeChild(el);
    expect(typeof result).toBe('boolean');
  });
});
