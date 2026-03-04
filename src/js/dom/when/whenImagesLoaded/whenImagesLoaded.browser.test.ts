import { describe, expect, it } from 'vitest';
import whenImagesLoaded from './whenImagesLoaded.js';

const VALID_IMG =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';

describe('whenImagesLoaded', () => {
  it('returns a promise', () => {
    const img = new Image();
    img.src = VALID_IMG;
    const p = whenImagesLoaded([img]);
    expect(p).toBeInstanceOf(Promise);
    return p;
  });

  it('resolves with array of images', async () => {
    const img1 = new Image();
    const img2 = new Image();
    img1.src = VALID_IMG;
    img2.src = VALID_IMG;
    const result = await whenImagesLoaded([img1, img2]);
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(2);
  });

  it('resolves with all image elements', async () => {
    const img = new Image();
    img.src = VALID_IMG;
    const result = await whenImagesLoaded([img]);
    expect(result[0]).toBe(img);
  });

  it('resolves for empty array', async () => {
    const result = await whenImagesLoaded([]);
    expect(result).toEqual([]);
  }, 3000);

  it('rejects if one image errors', async () => {
    const goodImg = new Image();
    goodImg.src = VALID_IMG;
    const badImg = new Image();
    badImg.src = 'data:image/gif;base64,INVALID!!!';
    const p = whenImagesLoaded([goodImg, badImg]);
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
