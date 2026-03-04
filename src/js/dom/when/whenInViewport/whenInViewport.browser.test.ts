import { describe, expect, it } from 'vitest';
import whenInViewport from './whenInViewport.js';

describe('whenInViewport', () => {
  it('returns a promise', () => {
    const el = document.createElement('div');
    el.style.width = '10px';
    el.style.height = '10px';
    document.body.appendChild(el);
    const p = whenInViewport(el);
    expect(p).toBeInstanceOf(Promise);
    document.body.removeChild(el);
    return p;
  });

  it('resolves with the element', async () => {
    const el = document.createElement('div');
    el.style.width = '10px';
    el.style.height = '10px';
    document.body.appendChild(el);
    const result = await whenInViewport(el);
    document.body.removeChild(el);
    expect(result).toBe(el);
  });

  it('calls whenIn callback when in viewport', async () => {
    const el = document.createElement('div');
    el.style.width = '10px';
    el.style.height = '10px';
    document.body.appendChild(el);
    let callbackCalled = false;
    await whenInViewport(el, {
      whenIn: () => {
        callbackCalled = true;
      },
    });
    document.body.removeChild(el);
    expect(callbackCalled).toBe(true);
  });

  it('resolves immediately if element is already in viewport', async () => {
    const el = document.createElement('div');
    el.style.width = '10px';
    el.style.height = '10px';
    document.body.appendChild(el);
    const start = Date.now();
    await whenInViewport(el);
    const elapsed = Date.now() - start;
    document.body.removeChild(el);
    expect(elapsed).toBeLessThan(500);
  });
});
