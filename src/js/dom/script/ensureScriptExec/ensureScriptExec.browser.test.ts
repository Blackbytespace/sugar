/**
 * @name            ensureScriptExec.browser.test.ts
 * @namespace       js.dom.script
 * @type            Test
 * @platform        js
 * @status          stable
 *
 * Browser e2e tests for ensureScriptExec
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

import { describe, it, expect, beforeEach } from 'vitest';
import ensureScriptExec from './ensureScriptExec.js';

describe('ensureScriptExec (browser)', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    // Clean up test globals
    delete (window as any).__execTest;
  });

  describe('return type', () => {
    it('should return undefined', () => {
      const $script = document.createElement('script');
      $script.innerHTML = '/* noop */';
      document.body.appendChild($script);
      expect(ensureScriptExec($script)).toBeUndefined();
    });

    it('should not throw', () => {
      const $script = document.createElement('script');
      $script.innerHTML = '/* noop */';
      document.body.appendChild($script);
      expect(() => ensureScriptExec($script)).not.toThrow();
    });
  });

  describe('script re-execution', () => {
    it('should execute the inline script content', async () => {
      (window as any).__execTest = 0;
      const $container = document.createElement('div');
      document.body.appendChild($container);

      // Create a script that won't auto-execute via innerHTML
      const $script = document.createElement('script');
      $script.innerHTML = 'window.__execTest = 42;';
      $container.appendChild($script);

      // The script inserted via DOM creation does execute, so set to 0 first
      (window as any).__execTest = 0;

      ensureScriptExec($script);
      await new Promise((r) => setTimeout(r, 50));
      expect((window as any).__execTest).toBe(42);
    });

    it('should preserve script attributes when re-creating', () => {
      const $container = document.createElement('div');
      document.body.appendChild($container);

      const $script = document.createElement('script');
      $script.setAttribute('type', 'text/javascript');
      $script.setAttribute('data-custom', 'test');
      $script.innerHTML = '/* noop */';
      $container.appendChild($script);

      ensureScriptExec($script);

      const $newScript = $container.querySelector('script')!;
      expect($newScript.getAttribute('type')).toBe('text/javascript');
      expect($newScript.getAttribute('data-custom')).toBe('test');
    });

    it('should handle an array of scripts', async () => {
      (window as any).__execCountA = 0;
      (window as any).__execCountB = 0;
      const $container = document.createElement('div');
      document.body.appendChild($container);

      const $a = document.createElement('script');
      $a.innerHTML = 'window.__execCountA++;';
      const $b = document.createElement('script');
      $b.innerHTML = 'window.__execCountB++;';
      $container.appendChild($a);
      $container.appendChild($b);

      // Reset after initial DOM insertion
      (window as any).__execCountA = 0;
      (window as any).__execCountB = 0;

      ensureScriptExec([$a, $b]);
      await new Promise((r) => setTimeout(r, 50));
      expect((window as any).__execCountA).toBe(1);
      expect((window as any).__execCountB).toBe(1);
    });

    it('should handle a NodeList of scripts', async () => {
      (window as any).__execNodeList = 0;
      const $container = document.createElement('div');
      document.body.appendChild($container);

      const $s = document.createElement('script');
      $s.innerHTML = 'window.__execNodeList++;';
      $container.appendChild($s);
      (window as any).__execNodeList = 0;

      const nodeList = $container.querySelectorAll(
        'script',
      ) as NodeListOf<HTMLScriptElement>;
      ensureScriptExec(nodeList);
      await new Promise((r) => setTimeout(r, 50));
      expect((window as any).__execNodeList).toBe(1);
    });
  });
});
