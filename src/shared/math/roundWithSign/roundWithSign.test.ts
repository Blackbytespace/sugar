import { describe, it, expect } from 'vitest';
import roundWithSign from './roundWithSign.js';

describe('roundWithSign', () => {
  it('rounds positive numbers down', () => {
    expect(roundWithSign(1.5)).toBe(2);
    expect(roundWithSign(2.4)).toBe(2);
    expect(roundWithSign(2.6)).toBe(3);
  });

  it('rounds negative numbers toward zero', () => {
    expect(roundWithSign(-1.5)).toBe(-2);
    expect(roundWithSign(-2.4)).toBe(-2);
    expect(roundWithSign(-2.6)).toBe(-3);
  });

  it('handles edge cases', () => {
    expect(roundWithSign(0)).toBe(0);
    expect(roundWithSign(1)).toBe(1);
    expect(roundWithSign(-1)).toBe(-1);
  });
});