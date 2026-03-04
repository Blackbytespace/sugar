import { describe, expect, it } from 'vitest';
import whenImageLoaded from './whenImageLoaded.js';

// Use a 1x1 pixel data URL so no network request needed
const VALID_IMG =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';

describe('whenImageLoaded', () => {
  it('returns a promise', () => {
    const img = new Image();
    img.src = VALID_IMG;
    const p = whenImageLoaded(img);
    expect(p).toBeInstanceOf(Promise);
    return p;
  });

  it('resolves with the image element', async () => {
    const img = new Image();
    img.src = VALID_IMG;
    const result = await whenImageLoaded(img);
    expect(result).toBe(img);
  });

  it('resolves immediately when image is already loaded', async () => {
    const img = new Image();
    img.src = VALID_IMG;
    // Wait for natural load first
    await whenImageLoaded(img);
    // Now call again — should resolve immediately
    const result = await whenImageLoaded(img);
    expect(result).toBe(img);
  });

  it('rejects on error', async () => {
    const img = new Image();
    img.src = 'data:image/gif;base64,INVALID!!!';
    const p = whenImageLoaded(img);
    // Suppress unhandled-rejection event before awaiting
    p.catch(() => {});
    let caught: unknown;
    try {
      await p;
    } catch (e) {
      caught = e;
    }
    expect(caught).toBeDefined();
  });
});
