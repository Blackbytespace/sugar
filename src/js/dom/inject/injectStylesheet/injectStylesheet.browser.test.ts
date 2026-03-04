/**
 * @name            injectStylesheet.browser.test.ts
 * @namespace       js.dom.inject
 * @type            Test
 * @platform        js
 * @status          stable
 *
 * Browser e2e tests for injectStylesheet
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

import { describe, it, expect, beforeEach } from 'vitest';
import injectStylesheet from './injectStylesheet.js';

/** Creates a blob URL for a CSS string so no network request is needed. */
function blobCss(css: string): string {
  return URL.createObjectURL(new Blob([css], { type: 'text/css' }));
}

describe('injectStylesheet (browser)', () => {
  const injectedLinks: HTMLLinkElement[] = [];

  beforeEach(() => {
    // Remove previously injected link tags
    for (const $link of injectedLinks) {
      $link.remove();
    }
    injectedLinks.length = 0;
  });

  describe('return type', () => {
    it('should return a Promise', () => {
      const url = blobCss('body { margin: 0; }');
      const result = injectStylesheet(url);
      expect(result).toBeInstanceOf(Promise);
    });

    it('should resolve with the link element', async () => {
      const url = blobCss('body { padding: 0; }');
      const $link = await injectStylesheet(url);
      injectedLinks.push($link);
      expect($link).toBeInstanceOf(HTMLLinkElement);
    });
  });

  describe('DOM injection', () => {
    it('should append a link element to document.head', async () => {
      const url = blobCss('h1 { color: red; }');
      const $link = await injectStylesheet(url);
      injectedLinks.push($link);
      expect(document.head.contains($link)).toBe(true);
    });

    it('should set rel to stylesheet', async () => {
      const url = blobCss('p { color: blue; }');
      const $link = await injectStylesheet(url);
      injectedLinks.push($link);
      expect($link.rel).toBe('stylesheet');
    });

    it('should set the correct href', async () => {
      const url = blobCss('span { font-size: 12px; }');
      const $link = await injectStylesheet(url);
      injectedLinks.push($link);
      expect($link.href).toBe(url);
    });

    it('should set type to text/css', async () => {
      const url = blobCss('a { text-decoration: none; }');
      const $link = await injectStylesheet(url);
      injectedLinks.push($link);
      expect($link.type).toBe('text/css');
    });
  });

  describe('multiple stylesheets', () => {
    it('should inject two stylesheets independently', async () => {
      const urlA = blobCss('.ss-a { color: red; }');
      const urlB = blobCss('.ss-b { color: blue; }');
      const [$a, $b] = await Promise.all([
        injectStylesheet(urlA),
        injectStylesheet(urlB),
      ]);
      injectedLinks.push($a, $b);
      expect(document.head.contains($a)).toBe(true);
      expect(document.head.contains($b)).toBe(true);
    });
  });
});
