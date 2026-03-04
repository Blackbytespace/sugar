import { describe, it, expect } from 'vitest';
import commonEmailFileExtensions from './commonEmailFileExtensions.js';

describe('commonEmailFileExtensions', () => {
  it('should return array of email file extensions', () => {
    const result = commonEmailFileExtensions();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it('should add dots when dot=true', () => {
    const result = commonEmailFileExtensions({ dot: true });
    expect(result[0]).toMatch('.');
  });

  it('should exclude specified extensions', () => {
    const result = commonEmailFileExtensions({ exclude: ['eml'] });
    expect(result).not.toContain('eml');
  });

  it('should include extended formats when extended=true', () => {
    const basic = commonEmailFileExtensions();
    const extended = commonEmailFileExtensions({ extended: true });
    expect(extended.length).toBeGreaterThanOrEqual(basic.length);
  });
});