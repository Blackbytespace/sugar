/**
 * @name            copyFile.browser.test.ts
 * @namespace       js.clipboard
 * @type            Test
 * @platform        js
 * @status          stable
 *
 * Browser e2e tests for copyFile — fetches a URL and copies the resulting
 * blob to the clipboard via the Clipboard API.
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import copyFile from './copyFile.js';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Build a minimal in-memory PNG blob (1×1 transparent pixel). */
function makePngBlob(): Blob {
  // Smallest valid PNG: 1×1 transparent pixel, base64-encoded
  const base64 =
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
  const binary = atob(base64);
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return new Blob([bytes], { type: 'image/png' });
}

/** Build a plain-text blob. */
function makeTextBlob(content = 'hello'): Blob {
  return new Blob([content], { type: 'text/plain' });
}

describe('copyFile (browser)', () => {
  let fetchSpy: ReturnType<typeof vi.spyOn>;
  let clipboardWriteSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    // Stub navigator.clipboard.write so we don't need real clipboard perms
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: {
        write: vi.fn().mockResolvedValue(undefined),
      },
    });
    clipboardWriteSpy = vi.spyOn(navigator.clipboard, 'write');
  });

  afterEach(() => {
    vi.restoreAllMocks();
    fetchSpy?.mockRestore();
  });

  // -------------------------------------------------------------------------
  // Happy path
  // -------------------------------------------------------------------------

  it('should fetch the URL and call clipboard.write with a ClipboardItem', async () => {
    const blob = makePngBlob();
    fetchSpy = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(new Response(blob, { status: 200 }));

    await copyFile('https://example.com/image.png');

    expect(fetchSpy).toHaveBeenCalledWith('https://example.com/image.png');
    expect(clipboardWriteSpy).toHaveBeenCalledTimes(1);

    const [items] = clipboardWriteSpy.mock.calls[0] as [ClipboardItem[]];
    expect(items).toHaveLength(1);
    expect(items[0]).toBeInstanceOf(ClipboardItem);
  });

  it('should preserve the MIME type of the fetched blob', async () => {
    const blob = makePngBlob(); // image/png
    fetchSpy = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(new Response(blob, { status: 200 }));

    await copyFile('https://example.com/image.png');

    const [items] = clipboardWriteSpy.mock.calls[0] as [ClipboardItem[]];
    const item = items[0];
    expect(item.types).toContain('image/png');
  });

  it('should work for a text/plain blob', async () => {
    const blob = makeTextBlob('hello clipboard');
    fetchSpy = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(new Response(blob, { status: 200 }));

    await copyFile('https://example.com/hello.txt');

    const [items] = clipboardWriteSpy.mock.calls[0] as [ClipboardItem[]];
    expect(items[0].types).toContain('text/plain');
  });

  it('should return the same Promise that clipboard.write returns', async () => {
    const blob = makeTextBlob();
    fetchSpy = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(new Response(blob, { status: 200 }));

    const result = copyFile('https://example.com/hello.txt');
    expect(result).toBeInstanceOf(Promise);
    await expect(result).resolves.toBeUndefined();
  });

  // -------------------------------------------------------------------------
  // Error paths
  // -------------------------------------------------------------------------

  it('should reject when fetch fails', async () => {
    fetchSpy = vi
      .spyOn(globalThis, 'fetch')
      .mockRejectedValue(new TypeError('Network error'));

    await expect(copyFile('https://example.com/fail')).rejects.toThrow(
      'Network error',
    );
    expect(clipboardWriteSpy).not.toHaveBeenCalled();
  });

  it('should reject when clipboard.write rejects', async () => {
    const blob = makePngBlob();
    fetchSpy = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(new Response(blob, { status: 200 }));
    clipboardWriteSpy.mockRejectedValue(
      new DOMException('Not allowed', 'NotAllowedError'),
    );

    await expect(
      copyFile('https://example.com/image.png'),
    ).rejects.toBeInstanceOf(DOMException);
  });
});
