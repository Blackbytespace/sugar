/**
 * @name            readFile.browser.test.ts
 * @namespace       js.clipboard
 * @type            Test
 * @platform        js
 * @status          stable
 *
 * Browser e2e tests for readFile — reads clipboard contents as a
 * ClipboardItems array via navigator.clipboard.read.
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import readFile from './readFile.js';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makePngBlob(): Blob {
  const base64 =
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
  const binary = atob(base64);
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return new Blob([bytes], { type: 'image/png' });
}

/** Create a fake ClipboardItem-like object */
function makeClipboardItem(blob: Blob): ClipboardItem {
  return new ClipboardItem({ [blob.type]: blob });
}

describe('readFile (browser)', () => {
  let readSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: {
        read: vi.fn(),
      },
    });
    readSpy = vi.spyOn(navigator.clipboard, 'read');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // -------------------------------------------------------------------------
  // Happy path
  // -------------------------------------------------------------------------

  it('should call navigator.clipboard.read once', async () => {
    const item = makeClipboardItem(makePngBlob());
    readSpy.mockResolvedValue([item]);

    await readFile();

    expect(readSpy).toHaveBeenCalledOnce();
  });

  it('should return the ClipboardItems array resolved by clipboard.read', async () => {
    const item = makeClipboardItem(makePngBlob());
    readSpy.mockResolvedValue([item]);

    const result = await readFile();

    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(1);
    expect(result[0]).toBeInstanceOf(ClipboardItem);
  });

  it('should return a Promise', () => {
    readSpy.mockResolvedValue([]);

    const result = readFile();

    expect(result).toBeInstanceOf(Promise);
  });

  it('should resolve with an empty array when clipboard is empty', async () => {
    readSpy.mockResolvedValue([]);

    const result = await readFile();

    expect(result).toEqual([]);
  });

  it('should resolve with multiple ClipboardItems', async () => {
    const item1 = makeClipboardItem(makePngBlob());
    const item2 = makeClipboardItem(new Blob(['text'], { type: 'text/plain' }));
    readSpy.mockResolvedValue([item1, item2]);

    const result = await readFile();

    expect(result).toHaveLength(2);
  });

  it('should expose the correct MIME type on returned items', async () => {
    const blob = makePngBlob();
    const item = makeClipboardItem(blob);
    readSpy.mockResolvedValue([item]);

    const [returnedItem] = await readFile();

    expect(returnedItem.types).toContain('image/png');
  });

  // -------------------------------------------------------------------------
  // Error paths
  // -------------------------------------------------------------------------

  it('should reject when clipboard.read rejects', async () => {
    readSpy.mockRejectedValue(
      new DOMException('Not allowed', 'NotAllowedError'),
    );

    await expect(readFile()).rejects.toBeInstanceOf(DOMException);
  });

  it('should reject with the API-unavailable message when clipboard is missing', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: undefined,
    });

    await expect(readFile()).rejects.toBe(
      'The Clipboard API is not available.',
    );
  });

  it('should reject with the API-unavailable message when clipboard.read is missing', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: {}, // no read method
    });

    await expect(readFile()).rejects.toBe(
      'The Clipboard API is not available.',
    );
  });
});
