import { describe, expect, it } from 'vitest';
import whenNearViewport from './whenNearViewport.js';

describe('whenNearViewport', () => {
  it('returns a promise', () => {
    const el = document.createElement('div');
    el.style.width = '10px';
    el.style.height = '10px';
    document.body.appendChild(el);
    const p = whenNearViewport(el, { offset: '500px' });
    expect(p).toBeInstanceOf(Promise);
    // Do NOT return p — element is removed immediately so IntersectionObserver
    // may never fire in headless. Just assert it's a Promise instance.
    document.body.removeChild(el);
  });

  it('resolves with the element', async () => {
    const el = document.createElement('div');
    el.style.width = '10px';
    el.style.height = '10px';
    document.body.appendChild(el);
    const result = await whenNearViewport(el, { offset: '500px' });
    document.body.removeChild(el);
    expect(result).toBe(el);
  });

  it('resolves for a visible element', async () => {
    const el = document.createElement('div');
    el.style.width = '50px';
    el.style.height = '50px';
    document.body.appendChild(el);
    const start = Date.now();
    await whenNearViewport(el, { offset: '500px' });
    const elapsed = Date.now() - start;
    document.body.removeChild(el);
    expect(elapsed).toBeLessThan(500);
  });
});
