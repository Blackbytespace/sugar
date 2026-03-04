import { describe, it, expect } from 'vitest';
import commonImageFileExtensions from './commonImageFileExtensions.js';

describe('commonImageFileExtensions', () => {
  it('should return array of image file extensions', () => {
    const result = commonImageFileExtensions();
    expect(Array.isArray(result)).toBe(true);
    expect(result).toContain('jpg');
    expect(result).toContain('png');
  });

  it('should add dots when dot=true', () => {
    const result = commonImageFileExtensions({ dot: true });
    expect(result[0]).toMatch('.');
  });

  it('should exclude specified extensions', () => {
    const result = commonImageFileExtensions({ exclude: ['jpg'] });
    expect(result).not.toContain('jpg');
  });

  it('should include extended formats when extended=true', () => {
    const basic = commonImageFileExtensions();
    const extended = commonImageFileExtensions({ extended: true });
    expect(extended.length).toBeGreaterThan(basic.length);
  });
});