import { describe, expect, it } from 'vitest';
import whenLinkLoaded from './whenLinkLoaded.js';

describe('whenLinkLoaded', () => {
  it('returns a promise', () => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'data:text/css,body{}';
    document.head.appendChild(link);
    const p = whenLinkLoaded(link);
    expect(p).toBeInstanceOf(Promise);
    document.head.removeChild(link);
    return p;
  });

  it('resolves with the link element', async () => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'data:text/css,.foo{color:red}';
    document.head.appendChild(link);
    const result = await whenLinkLoaded(link);
    document.head.removeChild(link);
    expect(result).toBe(link);
  });

  it('resolves via img error trick for non-already-loaded URLs', async () => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    // Use a unique data: URL that won't already be in stylesheets
    link.href = `data:text/css,.wll-test-${Date.now()}{color:blue}`;
    document.head.appendChild(link);
    const result = await whenLinkLoaded(link);
    document.head.removeChild(link);
    expect(result).toBe(link);
  });

  it('calls callback when resolved', async () => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'data:text/css,.bar{color:blue}';
    document.head.appendChild(link);
    let called = false;
    const result = await whenLinkLoaded(link, () => {
      called = true;
    });
    document.head.removeChild(link);
    expect(result).toBe(link);
    expect(called).toBe(true);
  });
});
