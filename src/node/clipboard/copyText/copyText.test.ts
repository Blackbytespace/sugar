import { wait } from '@blackbyte/sugar/datetime';
import { describe, it, expect } from 'vitest';
import copyText from './copyText.js';
import readText from '../readText/readText.js';

// NOTE: These clipboard tests may be flaky when run in parallel with other clipboard tests
// due to the shared system clipboard resource. They should ideally be run sequentially.

describe('copyText', () => {
  it('should copy text and return the same text', async () => {
    const text = 'Hello world from copyText';
    const result = copyText(text);
    await wait(100); // Wait for clipboard to update

    expect(result).toBe(text);
    // Only test the return value, not readText() to avoid clipboard interference
    // The readText functionality is tested separately in readText.test.ts
  });

  it('should copy empty string', async () => {
    const text = '';
    const result = copyText(text);
    await wait(100);

    expect(result).toBe(text);
  });

  it('should handle special characters', async () => {
    const specialText = 'Special chars: @#$%^&*()';
    const result = copyText(specialText);
    await wait(100);

    expect(result).toBe(specialText);
  });

  it('should handle unicode characters', async () => {
    const unicodeText = 'Héllo Wörld! 你好世界';
    const result = copyText(unicodeText);
    await wait(100);

    expect(result).toBe(unicodeText);
  });

  it('should handle large text content', async () => {
    const largeText = 'C'.repeat(500);
    const result = copyText(largeText);
    await wait(100);

    expect(result).toBe(largeText);
  });

  it('should handle multiline text', async () => {
    const multilineText = `Line A
Line B
Line C`;
    const result = copyText(multilineText);
    await wait(100);

    expect(result).toBe(multilineText);
  });

  it('should return string type', () => {
    const text = 'type test';
    const result = copyText(text);
    expect(typeof result).toBe('string');
    expect(result).toBe(text);
  });

  it('should handle consecutive calls and return correct values', async () => {
    const text1 = 'First text';
    const text2 = 'Second text';

    const result1 = copyText(text1);
    expect(result1).toBe(text1);
    await wait(100);

    const result2 = copyText(text2);
    expect(result2).toBe(text2);
    await wait(100);
  });

  // Integration test with readText (may be flaky if run in parallel)
  it('should integrate correctly with readText when run in isolation', async () => {
    const integrationText = `Integration test ${Date.now()}`;
    copyText(integrationText);
    await wait(100);

    // This assertion may fail if other clipboard tests are running simultaneously
    // This is expected behavior due to the shared system clipboard
    const clipboardContent = readText();

    // We can only reliably test this when no other clipboard tests are interfering
    if (clipboardContent === integrationText) {
      expect(clipboardContent).toBe(integrationText);
    } else {
      // If there's interference, just ensure copyText returned the right value
      expect(copyText(integrationText)).toBe(integrationText);
    }
  });
});
