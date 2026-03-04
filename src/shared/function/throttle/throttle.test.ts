import { describe, it, expect, vi } from 'vitest';
import throttle from './throttle.js';

describe('throttle', () => {
  it('limits function calls', async () => {
    const fn = vi.fn();
    const throttled = throttle(100, fn);
    
    throttled();
    throttled();
    throttled();
    
    expect(fn).toHaveBeenCalledOnce();
  });

  it('allows calls after threshold', async () => {
    const fn = vi.fn();
    const throttled = throttle(50, fn);
    
    throttled();
    expect(fn).toHaveBeenCalledOnce();
    
    await new Promise(resolve => setTimeout(resolve, 100));
    throttled();
    expect(fn).toHaveBeenCalledTimes(2);
  });
});