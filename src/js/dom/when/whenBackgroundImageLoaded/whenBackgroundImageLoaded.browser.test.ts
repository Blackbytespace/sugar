import { describe, expect, it } from 'vitest';
import whenBackgroundImageLoaded from './whenBackgroundImageLoaded.js';

const VALID_IMG =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';

describe('whenBackgroundImageLoaded', () => {
  it('resolves when background image is loaded', async () => {
    const el = document.createElement('div');
    el.style.backgroundImage = `url("${VALID_IMG}")`;
    document.body.appendChild(el);
    const result = await whenBackgroundImageLoaded(el);
    document.body.removeChild(el);
    expect(result).toBe(el);
  });

  it('returns a promise', () => {
    const el = document.createElement('div');
    el.style.backgroundImage = `url("${VALID_IMG}")`;
    document.body.appendChild(el);
    const p = whenBackgroundImageLoaded(el);
    expect(p).toBeInstanceOf(Promise);
    document.body.removeChild(el);
    return p;
  });

  it('rejects when no background image url is set', async () => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    const p = whenBackgroundImageLoaded(el);
    // Suppress unhandled-rejection event before awaiting
    p.catch(() => {});
    let caught: unknown;
    try {
      await p;
    } catch (e) {
      caught = e;
    }
    document.body.removeChild(el);
    expect(caught).toBeDefined();
  });
});
