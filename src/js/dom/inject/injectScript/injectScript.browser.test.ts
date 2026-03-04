/**
 * @name            injectScript.browser.test.ts
 * @namespace       js.dom.inject
 * @type            Test
 * @platform        js
 * @status          stable
 *
 * Browser e2e tests for injectScript
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

import { describe, it, expect, beforeEach } from 'vitest';
import injectScript from './injectScript.js';

/** Creates a blob URL for a JS snippet so no network request is needed. */
function blobScript(code: string): string {
  return URL.createObjectURL(new Blob([code], { type: 'application/javascript' }));
}

describe('injectScript (browser)', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  describe('return type', () => {
    it('should return a Promise', () => {
      const url = blobScript('/* noop */');
      const result = injectScript(url);
      expect(result).toBeInstanceOf(Promise);
    });

    it('should resolve with the script element', async () => {
      const url = blobScript('/* noop */');
      const $script = await injectScript(url);
      expect($script).toBeInstanceOf(HTMLScriptElement);
    });
  });

  describe('DOM injection', () => {
    it('should append a script tag to document.body by default', async () => {
      const url = blobScript('/* noop */');
      await injectScript(url);
      const scripts = document.body.querySelectorAll('script');
      expect(scripts.length).toBeGreaterThan(0);
    });

    it('should set the src of the script tag', async () => {
      const url = blobScript('/* noop */');
      const $script = await injectScript(url);
      expect($script.src).toBe(url);
    });

    it('should append to a custom parent element', async () => {
      const $div = document.createElement('div');
      document.body.appendChild($div);
      const url = blobScript('/* noop */');
      await injectScript(url, $div);
      expect($div.querySelector('script')).not.toBeNull();
    });

    it('should not append to document.body when custom parent given', async () => {
      const $div = document.createElement('div');
      document.body.appendChild($div);
      const url = blobScript('/* noop */');
      await injectScript(url, $div);
      // Only inside $div, not directly in body
      const bodyDirectChildren = Array.from(document.body.children);
      const scriptInBody = bodyDirectChildren.find(
        (el) => el.tagName === 'SCRIPT',
      );
      expect(scriptInBody).toBeUndefined();
    });
  });

  describe('script execution', () => {
    it('should execute the injected script', async () => {
      (window as any).__injectScriptFlag = false;
      const url = blobScript('window.__injectScriptFlag = true;');
      await injectScript(url);
      expect((window as any).__injectScriptFlag).toBe(true);
      delete (window as any).__injectScriptFlag;
    });

    it('should execute script that sets a counter', async () => {
      (window as any).__injectScriptCounter = 0;
      const url = blobScript('window.__injectScriptCounter = 42;');
      await injectScript(url);
      expect((window as any).__injectScriptCounter).toBe(42);
      delete (window as any).__injectScriptCounter;
    });
  });

  describe('multiple injections', () => {
    it('should inject two scripts independently', async () => {
      (window as any).__scriptA = false;
      (window as any).__scriptB = false;
      const urlA = blobScript('window.__scriptA = true;');
      const urlB = blobScript('window.__scriptB = true;');
      await Promise.all([injectScript(urlA), injectScript(urlB)]);
      expect((window as any).__scriptA).toBe(true);
      expect((window as any).__scriptB).toBe(true);
      delete (window as any).__scriptA;
      delete (window as any).__scriptB;
    });
  });
});
