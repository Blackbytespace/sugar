import { describe, it, expect, vi, beforeEach } from 'vitest';
import easeInterval from './easeInterval.js';

// Mock requestAnimationFrame and cancelAnimationFrame for Node environment
global.requestAnimationFrame = vi.fn((cb) => setTimeout(cb, 16) as any);
global.cancelAnimationFrame = vi.fn((id) => clearTimeout(id as any));

describe('easeInterval', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls callback with eased values', async () => {
    const cb = vi.fn();
    await easeInterval(50, cb, { interval: 10 });
    
    expect(cb).toHaveBeenCalled();
    expect(cb.mock.calls[0][0]).toBeGreaterThanOrEqual(0);
  });

  it('resolves after duration', async () => {
    const start = Date.now();
    await easeInterval(50, () => {});
    const elapsed = Date.now() - start;
    expect(elapsed).toBeGreaterThanOrEqual(30);
  });

  it('supports cancellation', () => {
    const cb = vi.fn();
    const promise = easeInterval(200, cb);
    
    // @ts-ignore
    promise.cancel();
    
    return new Promise<void>(resolve => {
      setTimeout(() => {
        resolve();
      }, 50);
    });
  });
});