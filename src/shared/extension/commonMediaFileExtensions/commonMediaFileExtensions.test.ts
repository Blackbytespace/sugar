import { describe, it, expect } from 'vitest';
import commonMediaFileExtensions from './commonMediaFileExtensions.js';

describe('commonMediaFileExtensions', () => {
  it('should return array of media file extensions', () => {
    const result = commonMediaFileExtensions();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it('should add dots when dot=true', () => {
    const result = commonMediaFileExtensions({ dot: true });
    expect(result[0]).toMatch('.');
  });

  it('should exclude specified extensions', () => {
    const result = commonMediaFileExtensions({ exclude: ['mp4'] });
    expect(result).not.toContain('mp4');
  });

  it('should include extended formats when extended=true', () => {
    const basic = commonMediaFileExtensions();
    const extended = commonMediaFileExtensions({ extended: true });
    expect(extended.length).toBeGreaterThanOrEqual(basic.length);
  });
});