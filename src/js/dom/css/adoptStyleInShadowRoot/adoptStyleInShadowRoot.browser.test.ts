/**
 * @name            adoptStyleInShadowRoot.browser.test.ts
 * @namespace       js.dom.css
 * @type            Test
 * @platform        js
 * @status          stable
 *
 * Browser e2e tests for adoptStyleInShadowRoot
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

import { describe, it, expect, beforeEach } from 'vitest';
import adoptStyleInShadowRoot from './adoptStyleInShadowRoot.js';

describe('adoptStyleInShadowRoot (browser)', () => {
  let $host: HTMLElement;
  let $shadowRoot: ShadowRoot;

  beforeEach(() => {
    document.body.innerHTML = '';
    $host = document.createElement('div');
    document.body.appendChild($host);
    $shadowRoot = $host.attachShadow({ mode: 'open' });
  });

  describe('return value', () => {
    it('should return a promise that resolves to true', async () => {
      const result = await adoptStyleInShadowRoot($shadowRoot);
      expect(result).toBe(true);
    });
  });

  describe('no stylesheets in context', () => {
    it('should resolve without error when document has no link stylesheets', async () => {
      // Remove any existing link[rel="stylesheet"] from document
      document
        .querySelectorAll('link[rel="stylesheet"]')
        .forEach((l) => l.remove());
      await expect(adoptStyleInShadowRoot($shadowRoot)).resolves.toBeDefined();
    });

    it('should leave shadow root empty when no stylesheets exist', async () => {
      document
        .querySelectorAll('link[rel="stylesheet"]')
        .forEach((l) => l.remove());
      await adoptStyleInShadowRoot($shadowRoot);
      expect(
        $shadowRoot.querySelectorAll('link[rel="stylesheet"]').length,
      ).toBe(0);
    });
  });

  describe('cloning link stylesheets into shadow root', () => {
    let $link: HTMLLinkElement;

    beforeEach(() => {
      // Remove any pre-existing link stylesheets
      document
        .querySelectorAll('link[rel="stylesheet"]')
        .forEach((l) => l.remove());

      $link = document.createElement('link');
      $link.rel = 'stylesheet';
      $link.href = 'https://example.com/style.css';
      document.head.appendChild($link);
    });

    it('should clone link elements into the shadow root', async () => {
      await adoptStyleInShadowRoot($shadowRoot);
      const links = $shadowRoot.querySelectorAll('link[rel="stylesheet"]');
      expect(links.length).toBe(1);
    });

    it('cloned link should have the same href as original', async () => {
      await adoptStyleInShadowRoot($shadowRoot);
      const cloned = $shadowRoot.querySelector(
        'link[rel="stylesheet"]',
      ) as HTMLLinkElement;
      expect(cloned.href).toBe($link.href);
    });

    it('should not move the original link out of the context', async () => {
      await adoptStyleInShadowRoot($shadowRoot);
      expect(document.head.querySelector('link[rel="stylesheet"]')).toBe($link);
    });

    it('should clone multiple stylesheets', async () => {
      const $link2 = document.createElement('link');
      $link2.rel = 'stylesheet';
      $link2.href = 'https://example.com/style2.css';
      document.head.appendChild($link2);

      await adoptStyleInShadowRoot($shadowRoot);
      const links = $shadowRoot.querySelectorAll('link[rel="stylesheet"]');
      expect(links.length).toBe(2);
    });
  });

  describe('custom context element', () => {
    it('should adopt stylesheets from a custom context element', async () => {
      const $container = document.createElement('div');
      const $link = document.createElement('link');
      $link.rel = 'stylesheet';
      $link.href = 'https://example.com/custom.css';
      $container.appendChild($link);
      document.body.appendChild($container);

      await adoptStyleInShadowRoot($shadowRoot, $container);
      const links = $shadowRoot.querySelectorAll('link[rel="stylesheet"]');
      expect(links.length).toBe(1);
    });

    it('should not adopt stylesheets from document when custom context has none', async () => {
      // Ensure document has a stylesheet
      const $docLink = document.createElement('link');
      $docLink.rel = 'stylesheet';
      $docLink.href = 'https://example.com/doc.css';
      document.head.appendChild($docLink);

      const $emptyContainer = document.createElement('div');
      document.body.appendChild($emptyContainer);

      await adoptStyleInShadowRoot($shadowRoot, $emptyContainer);
      const links = $shadowRoot.querySelectorAll('link[rel="stylesheet"]');
      expect(links.length).toBe(0);

      $docLink.remove();
    });
  });
});
