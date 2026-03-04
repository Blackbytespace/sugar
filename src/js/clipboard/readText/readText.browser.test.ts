/**
 * @name            readText.browser.test.ts
 * @namespace       js.clipboard
 * @type            Test
 * @platform        js
 * @status          stable
 *
 * Browser e2e tests for readText — reads plain text from the clipboard via
 * navigator.clipboard.readText.
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import readText from './readText.js';

describe('readText (browser)', () => {
  let readTextSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: {
        readText: vi.fn(),
      },
    });
    readTextSpy = vi.spyOn(navigator.clipboard, 'readText');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // -------------------------------------------------------------------------
  // Happy path
  // -------------------------------------------------------------------------

  it('should call navigator.clipboard.readText once', async () => {
    readTextSpy.mockResolvedValue('hello');

    await readText();

    expect(readTextSpy).toHaveBeenCalledOnce();
  });

  it('should return the string resolved by clipboard.readText', async () => {
    readTextSpy.mockResolvedValue('Hello world');

    const result = await readText();

    expect(result).toBe('Hello world');
  });

  it('should return a Promise', () => {
    readTextSpy.mockResolvedValue('');

    const result = readText();

    expect(result).toBeInstanceOf(Promise);
  });

  it('should resolve with an empty string when clipboard is empty', async () => {
    readTextSpy.mockResolvedValue('');

    const result = await readText();

    expect(result).toBe('');
  });

  it('should resolve with a multiline string verbatim', async () => {
    const multiline = 'line one\nline two\nline three';
    readTextSpy.mockResolvedValue(multiline);

    const result = await readText();

    expect(result).toBe(multiline);
  });

  it('should resolve with special characters verbatim', async () => {
    const special = '<div class="foo">Hello &amp; world</div>';
    readTextSpy.mockResolvedValue(special);

    const result = await readText();

    expect(result).toBe(special);
  });

  it('should resolve with unicode content verbatim', async () => {
    const unicode = '日本語テスト 🎉 مرحبا';
    readTextSpy.mockResolvedValue(unicode);

    const result = await readText();

    expect(result).toBe(unicode);
  });

  it('should resolve with a very long string', async () => {
    const longText = 'x'.repeat(100_000);
    readTextSpy.mockResolvedValue(longText);

    const result = await readText();

    expect(result).toBe(longText);
    expect(result).toHaveLength(100_000);
  });

  // -------------------------------------------------------------------------
  // Error paths
  // -------------------------------------------------------------------------

  it('should reject when clipboard.readText rejects', async () => {
    readTextSpy.mockRejectedValue(
      new DOMException('Not allowed', 'NotAllowedError'),
    );

    await expect(readText()).rejects.toBeInstanceOf(DOMException);
  });

  it('should reject with the API-unavailable message when clipboard is missing', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: undefined,
    });

    await expect(readText()).rejects.toBe(
      'The Clipboard API is not available.',
    );
  });

  it('should reject with the API-unavailable message when readText method is missing', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: {}, // clipboard exists but readText does not
    });

    await expect(readText()).rejects.toBe(
      'The Clipboard API is not available.',
    );
  });
});
