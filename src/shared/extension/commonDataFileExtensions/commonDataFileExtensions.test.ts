import { describe, it, expect } from 'vitest';
import commonDataFileExtensions from './commonDataFileExtensions.js';

describe('commonDataFileExtensions', () => {
  it('should return array of data file extensions', () => {
    const result = commonDataFileExtensions();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it('should add dots when dot=true', () => {
    const result = commonDataFileExtensions({ dot: true });
    expect(result[0]).toMatch('.');
  });

  it('should exclude specified extensions', () => {
    const result = commonDataFileExtensions({ exclude: ['json'] });
    expect(result).not.toContain('json');
  });

  it('should include extended formats when extended=true', () => {
    const basic = commonDataFileExtensions();
    const extended = commonDataFileExtensions({ extended: true });
    expect(extended.length).toBeGreaterThanOrEqual(basic.length);
  });
});