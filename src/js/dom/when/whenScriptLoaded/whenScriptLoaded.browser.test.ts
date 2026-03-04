import { describe, expect, it } from 'vitest';
import whenScriptLoaded from './whenScriptLoaded.js';

describe('whenScriptLoaded', () => {
  it('returns a promise', () => {
    const script = document.createElement('script');
    const p = whenScriptLoaded(script);
    expect(p).toBeInstanceOf(Promise);
    script.dispatchEvent(new Event('load'));
    return p;
  });

  it('resolves with the script element on load', async () => {
    const script = document.createElement('script');
    const p = whenScriptLoaded(script);
    script.dispatchEvent(new Event('load'));
    const result = await p;
    expect(result).toBe(script);
  });

  it('resolves with a blob script URL', async () => {
    const blob = new Blob(['window.__testScript = true;'], {
      type: 'application/javascript',
    });
    const url = URL.createObjectURL(blob);
    const script = document.createElement('script');
    script.src = url;
    document.head.appendChild(script);
    const result = await whenScriptLoaded(script);
    URL.revokeObjectURL(url);
    document.head.removeChild(script);
    expect(result).toBe(script);
  }, 5000);

  it('rejects on error', async () => {
    const script = document.createElement('script');
    const p = whenScriptLoaded(script);
    // Suppress unhandled-rejection event before awaiting
    p.catch(() => {});
    script.dispatchEvent(new ErrorEvent('error', { message: 'load failed' }));
    let caught: unknown;
    try {
      await p;
    } catch (e) {
      caught = e;
    }
    expect(caught).toBeDefined();
  });
});
