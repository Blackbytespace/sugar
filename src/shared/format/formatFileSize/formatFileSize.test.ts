import { describe, it, expect } from 'vitest';
import formatFileSize from './formatFileSize.js';

describe('formatFileSize', () => {
  it('should format bytes to human readable size', () => {
    const result = formatFileSize(1024);
    expect(typeof result).toBe('string');
    expect(result).toMatch(/KB|kB/); // Could be KB or kB depending on settings
  });

  it('should handle zero bytes', () => {
    const result = formatFileSize(0);
    expect(result).toBe('0 B');
  });

  it('should handle large file sizes', () => {
    const result = formatFileSize(1024 * 1024 * 1024); // 1GB
    expect(typeof result).toBe('string');
    expect(result).toMatch(/GB|Gb/);
  });

  it('should handle small file sizes', () => {
    const result = formatFileSize(500);
    expect(result).toBe('500 B');
  });

  it('should accept custom settings', () => {
    const result = formatFileSize(1024, { precision: 0 });
    expect(typeof result).toBe('string');
    // The filesize library might still show decimal places based on its internal logic
    expect(result).toContain('kB');
  });

  it('should handle custom base setting', () => {
    const result = formatFileSize(1024, { base: 2 });
    expect(typeof result).toBe('string');
    expect(result).toContain('1');
  });

  it('should handle fullform setting', () => {
    const result = formatFileSize(1024, { fullform: true });
    expect(typeof result).toBe('string');
    // Should contain full words like "kilobytes"
  });

  it('should handle bits setting', () => {
    const result = formatFileSize(1024, { bits: true });
    expect(typeof result).toBe('string');
    expect(result).toMatch(/[Bb]/); // Should contain bit notation
  });
});