import { describe, it, expect } from 'vitest';
import commonTextFileExtensions from './commonTextFileExtensions.js';

describe('commonTextFileExtensions', () => {
  it('should return array of text file extensions', () => {
    const result = commonTextFileExtensions();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it('should add dots when dot=true', () => {
    const result = commonTextFileExtensions({ dot: true });
    expect(result[0]).toMatch('.');
  });

  it('should exclude specified extensions', () => {
    const result = commonTextFileExtensions({ exclude: ['txt'] });
    expect(result).not.toContain('txt');
  });

  it('should include extended formats when extended=true', () => {
    const basic = commonTextFileExtensions();
    const extended = commonTextFileExtensions({ extended: true });
    expect(extended.length).toBeGreaterThanOrEqual(basic.length);
  });
});