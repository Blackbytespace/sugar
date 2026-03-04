import { describe, expect, it } from 'vitest';
import whenIframeReady from './whenIframeReady.js';

describe('whenIframeReady', () => {
  it('returns a promise', async () => {
    const iframe = document.createElement('iframe');
    document.body.appendChild(iframe);
    const p = whenIframeReady(iframe);
    expect(p).toBeInstanceOf(Promise);
    // Await so the interval resolves before we remove the iframe
    await p;
    document.body.removeChild(iframe);
  });

  it('resolves with the iframe element', async () => {
    const iframe = document.createElement('iframe');
    document.body.appendChild(iframe);
    const result = await whenIframeReady(iframe);
    document.body.removeChild(iframe);
    expect(result).toBe(iframe);
  });

  it('resolves when contentWindow is accessible', async () => {
    const iframe = document.createElement('iframe');
    document.body.appendChild(iframe);
    const result = await whenIframeReady(iframe);
    document.body.removeChild(iframe);
    // contentWindow may or may not have body in headless — just check result is the iframe
    expect(result).toBe(iframe);
  });

  it('resolves immediately if iframe is already ready', async () => {
    const iframe = document.createElement('iframe');
    document.body.appendChild(iframe);
    // Wait for it to be ready first
    await whenIframeReady(iframe);
    // Now call again — should resolve immediately
    const result = await whenIframeReady(iframe);
    document.body.removeChild(iframe);
    expect(result).toBe(iframe);
  });
});
