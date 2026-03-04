import { describe, it, expect } from 'vitest';
import commonVideoFileExtensions from './commonVideoFileExtensions.js';

describe('commonVideoFileExtensions', () => {
  it('should return array of video file extensions', () => {
    const result = commonVideoFileExtensions();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it('should add dots when dot=true', () => {
    const result = commonVideoFileExtensions({ dot: true });
    expect(result[0]).toMatch('.');
  });

  it('should exclude specified extensions', () => {
    const result = commonVideoFileExtensions({ exclude: ['mp4'] });
    expect(result).not.toContain('mp4');
  });

  it('should include extended formats when extended=true', () => {
    const basic = commonVideoFileExtensions();
    const extended = commonVideoFileExtensions({ extended: true });
    expect(extended.length).toBeGreaterThanOrEqual(basic.length);
  });
});