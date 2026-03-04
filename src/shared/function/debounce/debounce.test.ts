import { describe, it, expect, vi } from 'vitest';
import debounce from './debounce.js';

describe('debounce', () => {
  it('delays function execution', async () => {
    const fn = vi.fn();
    const debounced = debounce(100, fn);
    
    debounced();
    expect(fn).not.toHaveBeenCalled();
    
    await new Promise(resolve => setTimeout(resolve, 150));
    expect(fn).toHaveBeenCalledOnce();
  });

  it('cancels previous calls', async () => {
    const fn = vi.fn();
    const debounced = debounce(100, fn);
    
    debounced();
    debounced();
    debounced();
    
    await new Promise(resolve => setTimeout(resolve, 150));
    expect(fn).toHaveBeenCalledOnce();
  });
});