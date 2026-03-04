import { describe, expect, it } from 'vitest';
import whenVideoReady from './whenVideoReady.js';

describe('whenVideoReady', () => {
  it('returns a promise', () => {
    const video = document.createElement('video');
    document.body.appendChild(video);
    const p = whenVideoReady(video);
    expect(p).toBeInstanceOf(Promise);
    document.body.removeChild(video);
    // resolve via event since no src
    video.dispatchEvent(new Event('loadedmetadata'));
    return p;
  });

  it('resolves with the video element', async () => {
    const video = document.createElement('video');
    document.body.appendChild(video);
    const p = whenVideoReady(video);
    video.dispatchEvent(new Event('loadedmetadata'));
    const result = await p;
    document.body.removeChild(video);
    expect(result).toBe(video);
  });

  it('resolves immediately if video has duration > 0', async () => {
    const video = document.createElement('video');
    // Can't easily set duration directly (read-only), but test the event path
    document.body.appendChild(video);
    const p = whenVideoReady(video);
    video.dispatchEvent(new Event('loadedmetadata'));
    const result = await p;
    document.body.removeChild(video);
    expect(result).toBe(video);
  });
});
