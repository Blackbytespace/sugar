import { describe, expect, it } from 'vitest';
import when from './when.js';

describe('when', () => {
  it('resolves immediately for "direct" trigger', async () => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    const result = await when(el, ['direct'] as any);
    document.body.removeChild(el);
    expect(result).toBe(el);
  });

  it('resolves immediately for "directly" trigger', async () => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    const result = await when(el, ['directly'] as any);
    document.body.removeChild(el);
    expect(result).toBe(el);
  });

  it('resolves immediately for empty trigger array', async () => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    const result = await when(el, [] as any);
    document.body.removeChild(el);
    expect(result).toBe(el);
  });

  it('resolves for domReady trigger', async () => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    const result = await when(el, ['domReady'] as any);
    document.body.removeChild(el);
    expect(result).toBe(el);
  });

  it('resolves for timeout trigger', async () => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    const start = Date.now();
    const result = await when(el, ['timeout:50'] as any);
    const elapsed = Date.now() - start;
    document.body.removeChild(el);
    expect(result).toBe(el);
    expect(elapsed).toBeGreaterThanOrEqual(40);
  }, 3000);

  it('resolves for inViewport trigger with visible element', async () => {
    const el = document.createElement('div');
    el.style.width = '10px';
    el.style.height = '10px';
    document.body.appendChild(el);
    const result = await when(el, ['inViewport'] as any);
    document.body.removeChild(el);
    expect(result).toBe(el);
  });
});
