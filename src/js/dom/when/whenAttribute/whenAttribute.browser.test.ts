import { describe, expect, it } from 'vitest';
import whenAttribute from './whenAttribute.js';

describe('whenAttribute', () => {
  it('resolves immediately if attribute already exists', async () => {
    const el = document.createElement('div');
    el.setAttribute('data-test', 'hello');
    document.body.appendChild(el);
    const result = await whenAttribute(el, 'data-test');
    document.body.removeChild(el);
    expect(result).toBe('hello');
  });

  it('resolves when attribute is added', async () => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    const p = whenAttribute(el, 'data-lazy');
    setTimeout(() => el.setAttribute('data-lazy', 'true'), 10);
    const result = await p;
    document.body.removeChild(el);
    expect(result).toBe(true);
  });

  it('resolves when attribute changes to pass check function', async () => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    const p = whenAttribute(el, 'data-count', {
      check: (val) => val > 5,
    });
    setTimeout(() => el.setAttribute('data-count', '3'), 10);
    setTimeout(() => el.setAttribute('data-count', '10'), 20);
    const result = await p;
    document.body.removeChild(el);
    expect(result).toBeGreaterThan(5);
  });

  it('resolves with parsed number', async () => {
    const el = document.createElement('div');
    el.setAttribute('data-num', '42');
    document.body.appendChild(el);
    const result = await whenAttribute(el, 'data-num');
    document.body.removeChild(el);
    expect(result).toBe(42);
  });

  it('resolves when attribute is set to a string', async () => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    const p = whenAttribute(el, 'data-name');
    setTimeout(() => el.setAttribute('data-name', 'world'), 10);
    const result = await p;
    document.body.removeChild(el);
    expect(result).toBe('world');
  });
});
