import { describe, it, expect } from 'vitest';
import commonProgrammingFileExtensions from './commonProgrammingFileExtensions.js';

describe('commonProgrammingFileExtensions', () => {
  it('should return array of programming file extensions', () => {
    const result = commonProgrammingFileExtensions();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it('should add dots when dot=true', () => {
    const result = commonProgrammingFileExtensions({ dot: true });
    expect(result[0]).toMatch('.');
  });

  it('should exclude specified extensions', () => {
    const result = commonProgrammingFileExtensions({ exclude: ['js'] });
    expect(result).not.toContain('js');
  });

  it('should include extended formats when extended=true', () => {
    const basic = commonProgrammingFileExtensions();
    const extended = commonProgrammingFileExtensions({ extended: true });
    expect(extended.length).toBeGreaterThanOrEqual(basic.length);
  });
});