import { describe, it, expect } from 'vitest';
import commonFileExtensions from './commonFileExtensions.js';

describe('commonFileExtensions', () => {
  it('should return array of all file extensions by default', () => {
    const result = commonFileExtensions();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it('should filter by specific types', () => {
    const result = commonFileExtensions({ types: ['image', 'audio'] });
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it('should add dots when dot=true', () => {
    const result = commonFileExtensions({ dot: true });
    expect(result[0]).toMatch('.');
  });

  it('should exclude specified extensions', () => {
    const result = commonFileExtensions({ exclude: ['jpg', 'mp3'] });
    expect(result).not.toContain('jpg');
    expect(result).not.toContain('mp3');
  });

  it('should include extended formats when extended=true', () => {
    const basic = commonFileExtensions({ types: ['image'] });
    const extended = commonFileExtensions({ types: ['image'], extended: true });
    expect(extended.length).toBeGreaterThan(basic.length);
  });
});