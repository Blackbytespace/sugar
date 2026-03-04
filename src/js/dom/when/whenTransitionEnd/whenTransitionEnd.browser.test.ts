import { describe, expect, it } from 'vitest';
import whenTransitionEnd from './whenTransitionEnd.js';

describe('whenTransitionEnd', () => {
  it('returns a promise', () => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    const p = whenTransitionEnd(el);
    expect(p).toBeInstanceOf(Promise);
    document.body.removeChild(el);
    return p;
  });

  it('resolves with the element', async () => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    const result = await whenTransitionEnd(el);
    document.body.removeChild(el);
    expect(result).toBe(el);
  });

  it('resolves after transition duration', async () => {
    const style = document.createElement('style');
    style.textContent = '.trans-end-test { transition: opacity 0.05s linear; }';
    document.head.appendChild(style);
    const el = document.createElement('div');
    el.className = 'trans-end-test';
    document.body.appendChild(el);
    const start = Date.now();
    const result = await whenTransitionEnd(el);
    const elapsed = Date.now() - start;
    document.head.removeChild(style);
    document.body.removeChild(el);
    expect(result).toBe(el);
    // Should wait approximately 50ms
    expect(elapsed).toBeGreaterThanOrEqual(40);
  }, 3000);

  it('resolves immediately for element with no transition', async () => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    const start = Date.now();
    await whenTransitionEnd(el);
    const elapsed = Date.now() - start;
    document.body.removeChild(el);
    // totalDuration=0 so should resolve very quickly
    expect(elapsed).toBeLessThan(100);
  });
});
