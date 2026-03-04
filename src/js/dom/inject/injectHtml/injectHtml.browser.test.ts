/**
 * @name            injectHtml.browser.test.ts
 * @namespace       js.dom.inject
 * @type            Test
 * @platform        js
 * @status          stable
 *
 * Browser e2e tests for injectHtml
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

import { describe, it, expect, beforeEach } from 'vitest';
import injectHtml from './injectHtml.js';

describe('injectHtml (browser)', () => {
  let $container: HTMLDivElement;

  beforeEach(() => {
    document.body.innerHTML = '';
    $container = document.createElement('div');
    document.body.appendChild($container);
  });

  describe('return type', () => {
    it('should return undefined', () => {
      expect(injectHtml($container, '<p>hello</p>')).toBeUndefined();
    });

    it('should not throw', () => {
      expect(() => injectHtml($container, '<p>test</p>')).not.toThrow();
    });
  });

  describe('HTML injection', () => {
    it('should set the innerHTML of the element', () => {
      injectHtml($container, '<p class="test">hello</p>');
      expect($container.querySelector('p.test')).not.toBeNull();
      expect($container.querySelector('p.test')?.textContent).toBe('hello');
    });

    it('should replace existing content', () => {
      $container.innerHTML = '<span>old</span>';
      injectHtml($container, '<span>new</span>');
      expect($container.textContent).toBe('new');
    });

    it('should inject multiple elements', () => {
      injectHtml($container, '<p>one</p><p>two</p><p>three</p>');
      expect($container.querySelectorAll('p').length).toBe(3);
    });

    it('should inject empty string and clear content', () => {
      $container.innerHTML = '<p>existing</p>';
      injectHtml($container, '');
      expect($container.innerHTML).toBe('');
    });
  });

  describe('script execution', () => {
    it('should execute inline scripts injected via html', async () => {
      // Use a flag on window to detect script execution
      (window as any).__injectHtmlTestFlag = false;
      injectHtml(
        $container,
        '<script>window.__injectHtmlTestFlag = true;</script>',
      );
      // Scripts are re-created synchronously; give one tick for execution
      await new Promise((r) => setTimeout(r, 50));
      expect((window as any).__injectHtmlTestFlag).toBe(true);
      delete (window as any).__injectHtmlTestFlag;
    });

    it('should execute multiple inline scripts', async () => {
      (window as any).__injectHtmlCount = 0;
      injectHtml(
        $container,
        '<script>window.__injectHtmlCount++;</script><script>window.__injectHtmlCount++;</script>',
      );
      await new Promise((r) => setTimeout(r, 50));
      expect((window as any).__injectHtmlCount).toBe(2);
      delete (window as any).__injectHtmlCount;
    });

    it('should preserve script attributes when re-creating', () => {
      injectHtml(
        $container,
        '<script type="text/javascript">/* noop */</script>',
      );
      const $script = $container.querySelector('script');
      expect($script?.getAttribute('type')).toBe('text/javascript');
    });
  });

  describe('mixed content', () => {
    it('should inject html with both elements and scripts', async () => {
      (window as any).__mixedFlag = false;
      injectHtml(
        $container,
        '<div class="content">Hello</div><script>window.__mixedFlag = true;</script>',
      );
      await new Promise((r) => setTimeout(r, 50));
      expect($container.querySelector('.content')?.textContent).toBe('Hello');
      expect((window as any).__mixedFlag).toBe(true);
      delete (window as any).__mixedFlag;
    });
  });
});
