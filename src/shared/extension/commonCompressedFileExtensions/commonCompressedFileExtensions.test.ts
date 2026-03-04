import { describe, it, expect } from 'vitest';
import commonCompressedFileExtensions from './commonCompressedFileExtensions.js';

describe('commonCompressedFileExtensions', () => {
  it('should return array of compressed file extensions', () => {
    const result = commonCompressedFileExtensions();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it('should add dots when dot=true', () => {
    const result = commonCompressedFileExtensions({ dot: true });
    expect(result[0]).toMatch('.');
  });

  it('should exclude specified extensions', () => {
    const result = commonCompressedFileExtensions({ exclude: ['zip'] });
    expect(result).not.toContain('zip');
  });

  it('should include extended formats when extended=true', () => {
    const basic = commonCompressedFileExtensions();
    const extended = commonCompressedFileExtensions({ extended: true });
    expect(extended.length).toBeGreaterThanOrEqual(basic.length);
  });
});