import { describe, it, expect } from 'vitest';
import commonWebFileExtensions from './commonWebFileExtensions.js';

describe('commonWebFileExtensions', () => {
  it('should return array of web file extensions', () => {
    const result = commonWebFileExtensions();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it('should add dots when dot=true', () => {
    const result = commonWebFileExtensions({ dot: true });
    expect(result[0]).toMatch('.');
  });

  it('should exclude specified extensions', () => {
    const result = commonWebFileExtensions({ exclude: ['html'] });
    expect(result).not.toContain('html');
  });

  it('should include extended formats when extended=true', () => {
    const basic = commonWebFileExtensions();
    const extended = commonWebFileExtensions({ extended: true });
    expect(extended.length).toBeGreaterThanOrEqual(basic.length);
  });
});