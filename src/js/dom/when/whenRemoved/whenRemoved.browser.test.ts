import { describe, expect, it } from 'vitest';
import whenRemoved from './whenRemoved.js';

describe('whenRemoved', () => {
  it('resolves when element is removed from DOM', async () => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    const p = whenRemoved(el);
    document.body.removeChild(el);
    const result = await p;
    expect(result).toBe(el);
  });

  it('returns a promise', () => {
    const container = document.createElement('div');
    const el = document.createElement('span');
    container.appendChild(el);
    document.body.appendChild(container);
    const p = whenRemoved(el);
    expect(p).toBeInstanceOf(Promise);
    container.removeChild(el);
    document.body.removeChild(container);
    return p;
  });

  it('resolves with the removed element', async () => {
    const container = document.createElement('div');
    const el = document.createElement('p');
    container.appendChild(el);
    document.body.appendChild(container);
    const p = whenRemoved(el);
    container.removeChild(el);
    const result = await p;
    document.body.removeChild(container);
    expect(result).toBe(el);
  });

  it('does not resolve if a different element is removed', async () => {
    const container = document.createElement('div');
    const el = document.createElement('p');
    const other = document.createElement('span');
    container.appendChild(el);
    container.appendChild(other);
    document.body.appendChild(container);
    let resolved = false;
    const p = whenRemoved(el).then(() => {
      resolved = true;
    });
    container.removeChild(other);
    await new Promise((r) => setTimeout(r, 20));
    expect(resolved).toBe(false);
    container.removeChild(el);
    await p;
    document.body.removeChild(container);
    expect(resolved).toBe(true);
  });
});
