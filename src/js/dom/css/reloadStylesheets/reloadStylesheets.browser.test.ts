/**
 * @name            reloadStylesheets.browser.test.ts
 * @namespace       js.dom.css
 * @type            Test
 * @platform        js
 * @status          stable
 *
 * Browser e2e tests for reloadStylesheets
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import reloadStylesheets from './reloadStylesheets.js';

describe('reloadStylesheets (browser)', () => {
  let $link: HTMLLinkElement;

  beforeEach(() => {
    // Remove any pre-existing link[rel="stylesheet"] to keep tests isolated
    document
      .querySelectorAll('link[rel="stylesheet"]')
      .forEach((l) => l.remove());
  });

  afterEach(() => {
    // Clean up any link elements added during tests
    document
      .querySelectorAll('link[rel="stylesheet"]')
      .forEach((l) => l.remove());
  });

  describe('no stylesheets', () => {
    it('should not throw when there are no link stylesheets', () => {
      expect(() => reloadStylesheets()).not.toThrow();
    });

    it('should return undefined', () => {
      expect(reloadStylesheets()).toBeUndefined();
    });
  });

  describe('appends a new link element', () => {
    beforeEach(() => {
      $link = document.createElement('link');
      $link.rel = 'stylesheet';
      $link.href = 'https://example.com/style.css';
      document.head.appendChild($link);
    });

    it('should add a new link element after the original', () => {
      const countBefore = document.querySelectorAll(
        'link[rel="stylesheet"]',
      ).length;
      reloadStylesheets();
      const countAfter = document.querySelectorAll(
        'link[rel="stylesheet"]',
      ).length;
      expect(countAfter).toBe(countBefore + 1);
    });

    it('new link should have a cache-busting query string appended', () => {
      reloadStylesheets();
      const links = document.querySelectorAll('link[rel="stylesheet"]');
      const newLink = links[links.length - 1] as HTMLLinkElement;
      expect(newLink.href).toMatch(/\?\d+$/);
    });

    it('new link href base should match the original href base', () => {
      reloadStylesheets();
      const links = document.querySelectorAll('link[rel="stylesheet"]');
      const newLink = links[links.length - 1] as HTMLLinkElement;
      // Strip the query string for comparison
      expect(newLink.href.replace(/\?.*$/, '')).toBe(
        $link.href.replace(/\?.*$/, ''),
      );
    });

    it('new link timestamp should be a recent timestamp', () => {
      const before = Date.now();
      reloadStylesheets();
      const after = Date.now();
      const links = document.querySelectorAll('link[rel="stylesheet"]');
      const newLink = links[links.length - 1] as HTMLLinkElement;
      const ts = parseInt(newLink.href.split('?')[1], 10);
      expect(ts).toBeGreaterThanOrEqual(before);
      expect(ts).toBeLessThanOrEqual(after);
    });
  });

  describe('multiple stylesheets', () => {
    beforeEach(() => {
      (['style1.css', 'style2.css', 'style3.css'] as const).forEach((file) => {
        const $l = document.createElement('link');
        $l.rel = 'stylesheet';
        $l.href = `https://example.com/${file}`;
        document.head.appendChild($l);
      });
    });

    it('should add a new link for each existing stylesheet', () => {
      const countBefore = document.querySelectorAll(
        'link[rel="stylesheet"]',
      ).length;
      reloadStylesheets();
      const countAfter = document.querySelectorAll(
        'link[rel="stylesheet"]',
      ).length;
      expect(countAfter).toBe(countBefore * 2);
    });
  });

  describe('custom $root', () => {
    it('should only reload stylesheets within the provided root element', () => {
      const $container = document.createElement('div');
      document.body.appendChild($container);

      const $localLink = document.createElement('link');
      $localLink.rel = 'stylesheet';
      $localLink.href = 'https://example.com/local.css';
      $container.appendChild($localLink);

      // Also add a stylesheet to head (outside $container)
      const $headLink = document.createElement('link');
      $headLink.rel = 'stylesheet';
      $headLink.href = 'https://example.com/head.css';
      document.head.appendChild($headLink);

      reloadStylesheets({ $root: $container });

      // Only the one inside $container should get a sibling clone
      const containerLinks = $container.querySelectorAll(
        'link[rel="stylesheet"]',
      );
      expect(containerLinks.length).toBe(2);

      // The head link should remain untouched (no clone added to head)
      const headLinks = document.head.querySelectorAll(
        'link[rel="stylesheet"]',
      );
      expect(headLinks.length).toBe(1);

      $container.remove();
    });
  });
});
