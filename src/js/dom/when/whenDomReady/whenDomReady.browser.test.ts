import { describe, expect, it } from 'vitest';
import whenDomReady from './whenDomReady.js';

describe('whenDomReady', () => {
  it('returns a promise', () => {
    const result = whenDomReady();
    expect(result).toBeInstanceOf(Promise);
    return result;
  });

  it('resolves immediately when DOM is already ready', async () => {
    // In a browser test the DOM is already complete
    const result = await whenDomReady();
    expect(result).toBeUndefined();
  });

  it('resolves multiple times independently', async () => {
    await Promise.all([whenDomReady(), whenDomReady()]);
  });
});
