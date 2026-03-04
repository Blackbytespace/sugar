/**
 * @name            onScrollEnd.browser.test.ts
 * @namespace       js.dom.on
 * @type            Test
 * @platform        js
 * @status          stable
 *
 * Browser e2e tests for onScrollEnd
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

import { describe, it, expect, beforeEach } from 'vitest';
import onScrollEnd from './onScrollEnd.js';

/** Creates a scrollable container with overflowing content */
function createScrollable(height = 200, contentHeight = 800): HTMLDivElement {
  const $container = document.createElement('div');
  $container.style.cssText = `width:200px;height:${height}px;overflow-y:scroll;`;

  const $content = document.createElement('div');
  $content.style.cssText = `height:${contentHeight}px;`;
  $container.appendChild($content);
  document.body.appendChild($container);
  return $container;
}

describe('onScrollEnd (browser)', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  describe('return type', () => {
    it('should return undefined', () => {
      const $el = createScrollable();
      expect(onScrollEnd($el, () => {})).toBeUndefined();
    });

    it('should not throw', () => {
      const $el = createScrollable();
      expect(() => onScrollEnd($el, () => {})).not.toThrow();
    });
  });

  describe('callback on scroll end', () => {
    it('should call callback when scrolled to the bottom', async () => {
      const $container = createScrollable(200, 800);
      let called = false;
      onScrollEnd($container, () => {
        called = true;
      });
      // Scroll to bottom
      $container.scrollTop = $container.scrollHeight - $container.offsetHeight;
      $container.dispatchEvent(new Event('scroll'));
      await new Promise((r) => setTimeout(r, 50));
      expect(called).toBe(true);
    });

    it('should not call callback when not at bottom', async () => {
      const $container = createScrollable(200, 800);
      let called = false;
      onScrollEnd($container, () => {
        called = true;
      });
      $container.scrollTop = 10;
      $container.dispatchEvent(new Event('scroll'));
      await new Promise((r) => setTimeout(r, 50));
      expect(called).toBe(false);
    });

    it('should call callback multiple times by default', async () => {
      const $container = createScrollable(200, 800);
      let count = 0;
      onScrollEnd($container, () => {
        count++;
      });
      // Scroll to bottom twice: scroll to bottom, then back, then to bottom again
      $container.scrollTop = $container.scrollHeight - $container.offsetHeight;
      $container.dispatchEvent(new Event('scroll'));
      await new Promise((r) => setTimeout(r, 20));

      $container.scrollTop = 0;
      $container.dispatchEvent(new Event('scroll'));
      await new Promise((r) => setTimeout(r, 20));

      $container.scrollTop = $container.scrollHeight - $container.offsetHeight;
      $container.dispatchEvent(new Event('scroll'));
      await new Promise((r) => setTimeout(r, 20));

      // At least 2 invocations (browsers may deliver extra synthetic scroll events)
      expect(count).toBeGreaterThanOrEqual(2);
    });
  });

  describe('once option', () => {
    it('should call callback only once when once:true', async () => {
      const $container = createScrollable(200, 800);
      let count = 0;
      onScrollEnd($container, () => count++, {
        once: true,
        offset: 20,
        times: -1,
      });

      for (let i = 0; i < 3; i++) {
        $container.scrollTop =
          $container.scrollHeight - $container.offsetHeight;
        $container.dispatchEvent(new Event('scroll'));
        await new Promise((r) => setTimeout(r, 10));
        $container.scrollTop = 0;
        $container.dispatchEvent(new Event('scroll'));
        await new Promise((r) => setTimeout(r, 10));
      }

      expect(count).toBe(1);
    });
  });

  describe('times option', () => {
    it('should stop after specified times', async () => {
      const $container = createScrollable(200, 800);
      let count = 0;
      onScrollEnd($container, () => count++, {
        offset: 20,
        once: false,
        times: 2,
      });

      for (let i = 0; i < 5; i++) {
        $container.scrollTop =
          $container.scrollHeight - $container.offsetHeight;
        $container.dispatchEvent(new Event('scroll'));
        await new Promise((r) => setTimeout(r, 10));
        $container.scrollTop = 0;
        $container.dispatchEvent(new Event('scroll'));
        await new Promise((r) => setTimeout(r, 10));
      }

      expect(count).toBe(2);
    });
  });

  describe('offset option', () => {
    it('should trigger before reaching the very bottom when offset is large', async () => {
      const $container = createScrollable(200, 800);
      let called = false;
      onScrollEnd(
        $container,
        () => {
          called = true;
        },
        {
          offset: 200,
          once: false,
          times: -1,
        },
      );
      // Scroll to 80% — the large offset means it should still trigger
      $container.scrollTop = Math.round(
        ($container.scrollHeight - $container.offsetHeight) * 0.8,
      );
      $container.dispatchEvent(new Event('scroll'));
      await new Promise((r) => setTimeout(r, 50));
      expect(called).toBe(true);
    });
  });
});
