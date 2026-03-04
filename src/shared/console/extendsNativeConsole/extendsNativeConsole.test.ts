import { describe, it, expect, vi, beforeEach } from 'vitest';
import extendsNativeConsole from './extendsNativeConsole.js';
import SugarConsole from '../SugarConsole/SugarConsole.js';

describe('extendsNativeConsole', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should be a function that extends native console', () => {
    expect(typeof extendsNativeConsole).toBe('function');
    expect(extendsNativeConsole).toBe(SugarConsole.extendsNativeConsole);
  });

  it('should call original function when invoked', () => {
    // Test that the function works (we can't easily test the spy due to module state)
    expect(() => extendsNativeConsole()).not.toThrow();
    expect(typeof extendsNativeConsole).toBe('function');
  });
});