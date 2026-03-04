import { describe, it, expect } from 'vitest';
import commonDiscFileExtensions from './commonDiscFileExtensions.js';

describe('commonDiscFileExtensions', () => {
  it('should return array of disc file extensions', () => {
    const result = commonDiscFileExtensions();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it('should add dots when dot=true', () => {
    const result = commonDiscFileExtensions({ dot: true });
    expect(result[0]).toMatch('.');
  });

  it('should exclude specified extensions', () => {
    const result = commonDiscFileExtensions({ exclude: ['iso'] });
    expect(result).not.toContain('iso');
  });

  it('should include extended formats when extended=true', () => {
    const basic = commonDiscFileExtensions();
    const extended = commonDiscFileExtensions({ extended: true });
    expect(extended.length).toBeGreaterThanOrEqual(basic.length);
  });
});