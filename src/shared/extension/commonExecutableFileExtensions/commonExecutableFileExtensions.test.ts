import { describe, it, expect } from 'vitest';
import commonExecutableFileExtensions from './commonExecutableFileExtensions.js';

describe('commonExecutableFileExtensions', () => {
  it('should return array of executable file extensions', () => {
    const result = commonExecutableFileExtensions();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it('should add dots when dot=true', () => {
    const result = commonExecutableFileExtensions({ dot: true });
    expect(result[0]).toMatch('.');
  });

  it('should exclude specified extensions', () => {
    const result = commonExecutableFileExtensions({ exclude: ['exe'] });
    expect(result).not.toContain('exe');
  });

  it('should include extended formats when extended=true', () => {
    const basic = commonExecutableFileExtensions();
    const extended = commonExecutableFileExtensions({ extended: true });
    expect(extended.length).toBeGreaterThanOrEqual(basic.length);
  });
});