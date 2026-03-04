import { describe, expect, it } from 'vitest';
import whenOutOfViewport from './whenOutOfViewport.js';

describe('whenOutOfViewport', () => {
  it('returns a promise', () => {
    // Element not in viewport resolves immediately
    const el = document.createElement('div');
    el.style.position = 'fixed';
    el.style.top = '-9999px';
    el.style.left = '-9999px';
    el.style.width = '1px';
    el.style.height = '1px';
    document.body.appendChild(el);
    const p = whenOutOfViewport(el);
    expect(p).toBeInstanceOf(Promise);
    document.body.removeChild(el);
    return p;
  });

  it('resolves with the element', async () => {
    const el = document.createElement('div');
    el.style.position = 'fixed';
    el.style.top = '-9999px';
    el.style.width = '1px';
    el.style.height = '1px';
    document.body.appendChild(el);
    const result = await whenOutOfViewport(el);
    document.body.removeChild(el);
    expect(result).toBe(el);
  });

  it('resolves when element leaves the viewport', async () => {
    const el = document.createElement('div');
    el.style.position = 'fixed';
    el.style.top = '-9999px';
    el.style.width = '10px';
    el.style.height = '10px';
    document.body.appendChild(el);
    const p = whenOutOfViewport(el);
    const result = await p;
    document.body.removeChild(el);
    expect(result).toBe(el);
  });
});
