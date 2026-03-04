import { describe, it, expect } from 'vitest';
import formatDuration from './formatDuration.js';

describe('formatDuration', () => {
  it('should be a function', () => {
    expect(typeof formatDuration).toBe('function');
  });

  it('should format duration from re-exported function', () => {
    // Test that it works (this is a re-export from datetime)
    const result = formatDuration(1000);
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });

  it('should handle zero duration', () => {
    const result = formatDuration(0);
    expect(typeof result).toBe('string');
  });

  it('should handle small durations', () => {
    const result = formatDuration(500);
    expect(typeof result).toBe('string');
  });

  it('should handle large durations', () => {
    const result = formatDuration(60000); // 1 minute
    expect(typeof result).toBe('string');
  });
});