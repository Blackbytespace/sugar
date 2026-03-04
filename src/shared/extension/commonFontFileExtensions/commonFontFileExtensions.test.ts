import { describe, it, expect } from 'vitest';
import commonFontFileExtensions from './commonFontFileExtensions.js';

describe('commonFontFileExtensions', () => {
  it('should return array of font file extensions', () => {
    const result = commonFontFileExtensions();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it('should add dots when dot=true', () => {
    const result = commonFontFileExtensions({ dot: true });
    expect(result[0]).toMatch('.');
  });

  it('should exclude specified extensions', () => {
    const result = commonFontFileExtensions({ exclude: ['ttf'] });
    expect(result).not.toContain('ttf');
  });

  it('should include extended formats when extended=true', () => {
    const basic = commonFontFileExtensions();
    const extended = commonFontFileExtensions({ extended: true });
    expect(extended.length).toBeGreaterThanOrEqual(basic.length);
  });
});