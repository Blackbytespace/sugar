import { describe, expect, it } from 'vitest';
import whenEntersViewport from './whenEntersViewport.js';

describe('whenEntersViewport', () => {
  it('returns a promise', () => {
    const el = document.createElement('div');
    el.style.width = '10px';
    el.style.height = '10px';
    document.body.appendChild(el);
    const p = whenEntersViewport(el, { offset: '0px' });
    expect(p).toBeInstanceOf(Promise);
    document.body.removeChild(el);
    return p;
  });

  it('resolves with the element', async () => {
    const el = document.createElement('div');
    el.style.width = '10px';
    el.style.height = '10px';
    document.body.appendChild(el);
    const result = await whenEntersViewport(el, { offset: '0px' });
    document.body.removeChild(el);
    expect(result).toBe(el);
  });

  it('resolves immediately for already-visible element', async () => {
    const el = document.createElement('div');
    el.style.width = '50px';
    el.style.height = '50px';
    document.body.appendChild(el);
    const start = Date.now();
    await whenEntersViewport(el, { offset: '0px' });
    const elapsed = Date.now() - start;
    document.body.removeChild(el);
    expect(elapsed).toBeLessThan(500);
  });
});
