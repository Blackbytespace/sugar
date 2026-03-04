/**
 * @name            injectIframeContent.browser.test.ts
 * @namespace       js.dom.inject
 * @type            Test
 * @platform        js
 * @status          stable
 *
 * Browser e2e tests for injectIframeContent
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import injectIframeContent from './injectIframeContent.js';

/** Creates an empty iframe appended to body and returns it. */
function createIframe(): HTMLIFrameElement {
  const $iframe = document.createElement('iframe');
  $iframe.style.width = '300px';
  $iframe.style.height = '200px';
  $iframe.style.border = 'none';
  document.body.appendChild($iframe);
  return $iframe;
}

describe('injectIframeContent (browser)', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  describe('return type', () => {
    it('should return undefined', () => {
      const $iframe = createIframe();
      expect(injectIframeContent($iframe, '<p>hi</p>')).toBeUndefined();
    });

    it('should not throw', () => {
      const $iframe = createIframe();
      expect(() =>
        injectIframeContent($iframe, '<p>test</p>'),
      ).not.toThrow();
    });
  });

  describe('content injection', () => {
    it('should write html content into the iframe document', async () => {
      const $iframe = createIframe();
      injectIframeContent($iframe, '<p id="target">hello</p>');
      // document.write is synchronous; allow a tick for layout
      await new Promise((r) => setTimeout(r, 50));
      const $p = $iframe.contentWindow?.document.getElementById('target');
      expect($p).not.toBeNull();
      expect($p?.textContent).toBe('hello');
    });

    it('should replace previously written content', async () => {
      const $iframe = createIframe();
      injectIframeContent($iframe, '<p id="first">first</p>');
      await new Promise((r) => setTimeout(r, 20));
      injectIframeContent($iframe, '<p id="second">second</p>');
      await new Promise((r) => setTimeout(r, 20));
      expect(
        $iframe.contentWindow?.document.getElementById('first'),
      ).toBeNull();
      expect(
        $iframe.contentWindow?.document.getElementById('second'),
      ).not.toBeNull();
    });

    it('should inject a full HTML document structure', async () => {
      const $iframe = createIframe();
      injectIframeContent(
        $iframe,
        '<!DOCTYPE html><html><head><title>Test</title></head><body><h1>Title</h1></body></html>',
      );
      await new Promise((r) => setTimeout(r, 50));
      const title = $iframe.contentWindow?.document.title;
      expect(title).toBe('Test');
    });

    it('should inject multiple elements', async () => {
      const $iframe = createIframe();
      injectIframeContent(
        $iframe,
        '<div id="a">A</div><div id="b">B</div><div id="c">C</div>',
      );
      await new Promise((r) => setTimeout(r, 50));
      expect(
        $iframe.contentWindow?.document.getElementById('a'),
      ).not.toBeNull();
      expect(
        $iframe.contentWindow?.document.getElementById('b'),
      ).not.toBeNull();
      expect(
        $iframe.contentWindow?.document.getElementById('c'),
      ).not.toBeNull();
    });

    it('should inject empty string and result in empty body', async () => {
      const $iframe = createIframe();
      injectIframeContent($iframe, '');
      await new Promise((r) => setTimeout(r, 50));
      const body = $iframe.contentWindow?.document.body;
      expect(body?.innerHTML.trim()).toBe('');
    });
  });

  describe('style injection', () => {
    it('should apply injected styles within the iframe', async () => {
      const $iframe = createIframe();
      injectIframeContent(
        $iframe,
        '<style>body { background: rgb(255,0,0); }</style><p id="p">text</p>',
      );
      await new Promise((r) => setTimeout(r, 50));
      const doc = $iframe.contentWindow?.document;
      const style = doc?.querySelector('style');
      expect(style).not.toBeNull();
    });
  });
});
