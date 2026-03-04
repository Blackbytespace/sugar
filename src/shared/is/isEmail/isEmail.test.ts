import { describe, expect, it } from 'vitest';
import isEmail from './isEmail.js';

describe('isEmail', () => {
  it('returns true for valid emails', () => {
    expect(isEmail('test@example.com')).toBe(true);
    expect(isEmail('user.name@domain.co.uk')).toBe(true);
  });

  it('returns false for invalid emails', () => {
    expect(isEmail('invalid')).toBe(false);
    expect(isEmail('test@')).toBe(false);
    expect(isEmail('@domain.com')).toBe(false);
  });
});
