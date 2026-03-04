import { describe, expect, it } from 'vitest';
import isFocusWithin from './isFocusWithin.js';

describe('isFocusWithin', () => {
  it('returns true when a descendant of the element has focus', () => {
    const container = document.createElement('div');
    const input = document.createElement('input');
    container.appendChild(input);
    document.body.appendChild(container);
    input.focus();
    const result = isFocusWithin(container);
    document.body.removeChild(container);
    expect(result).toBe(true);
  });

  it('returns true when the element itself has focus', () => {
    const input = document.createElement('input');
    document.body.appendChild(input);
    input.focus();
    const result = isFocusWithin(input);
    document.body.removeChild(input);
    expect(result).toBe(true);
  });

  it('returns false when no descendant has focus', () => {
    const container = document.createElement('div');
    const input = document.createElement('input');
    const other = document.createElement('input');
    container.appendChild(input);
    document.body.appendChild(container);
    document.body.appendChild(other);
    other.focus();
    const result = isFocusWithin(container);
    document.body.removeChild(container);
    document.body.removeChild(other);
    expect(result).toBe(false);
  });

  it('returns a boolean', () => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    const result = isFocusWithin(el);
    document.body.removeChild(el);
    expect(typeof result).toBe('boolean');
  });
});
