/**
 * @name            copyText.browser.test.ts
 * @namespace       js.clipboard
 * @type            Test
 * @platform        js
 * @status          stable
 *
 * Browser e2e tests for copyText — writes a string to the clipboard via
 * navigator.clipboard.writeText.
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import copyText from './copyText.js';

describe('copyText (browser)', () => {
  let writeTextSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    // Stub clipboard so tests don't need real clipboard permissions
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    });
    writeTextSpy = vi.spyOn(navigator.clipboard, 'writeText');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // -------------------------------------------------------------------------
  // Happy path
  // -------------------------------------------------------------------------

  it('should call navigator.clipboard.writeText with the given text', async () => {
    await copyText('Hello world');

    expect(writeTextSpy).toHaveBeenCalledOnce();
    expect(writeTextSpy).toHaveBeenCalledWith('Hello world');
  });

  it('should return a Promise that resolves to undefined on success', async () => {
    const result = copyText('some text');

    expect(result).toBeInstanceOf(Promise);
    await expect(result).resolves.toBeUndefined();
  });

  it('should pass an empty string to the clipboard without throwing', async () => {
    await expect(copyText('')).resolves.toBeUndefined();
    expect(writeTextSpy).toHaveBeenCalledWith('');
  });

  it('should pass a multiline string verbatim', async () => {
    const multiline = 'line one\nline two\nline three';
    await copyText(multiline);

    expect(writeTextSpy).toHaveBeenCalledWith(multiline);
  });

  it('should pass a string containing special characters verbatim', async () => {
    const special = '<div class="foo">Hello &amp; world</div>';
    await copyText(special);

    expect(writeTextSpy).toHaveBeenCalledWith(special);
  });

  it('should pass a very long string without errors', async () => {
    const longText = 'x'.repeat(100_000);
    await expect(copyText(longText)).resolves.toBeUndefined();
    expect(writeTextSpy).toHaveBeenCalledWith(longText);
  });

  it('should pass unicode content verbatim', async () => {
    const unicode = '日本語テスト 🎉 مرحبا';
    await copyText(unicode);

    expect(writeTextSpy).toHaveBeenCalledWith(unicode);
  });

  // -------------------------------------------------------------------------
  // Error paths
  // -------------------------------------------------------------------------

  it('should reject when clipboard.writeText rejects', async () => {
    writeTextSpy.mockRejectedValue(
      new DOMException('Not allowed', 'NotAllowedError'),
    );

    await expect(copyText('fail')).rejects.toBeInstanceOf(DOMException);
  });

  it('should reject with the API-unavailable message when clipboard is missing', async () => {
    // Remove clipboard entirely
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: undefined,
    });

    await expect(copyText('no clipboard')).rejects.toBe(
      'The Clipboard API is not available.',
    );
  });

  it('should reject with the API-unavailable message when writeText is missing', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: {}, // clipboard exists but writeText does not
    });

    await expect(copyText('no writeText')).rejects.toBe(
      'The Clipboard API is not available.',
    );
  });
});
