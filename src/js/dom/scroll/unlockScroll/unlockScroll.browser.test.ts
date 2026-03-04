/**
 * @name            unlockScroll.browser.test.ts
 * @namespace       js.dom.scroll
 * @type            Test
 * @platform        js
 * @status          stable
 *
 * Browser e2e tests for unlockScroll
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

import { describe, it, expect } from 'vitest';
import lockScroll from '../lockScroll/lockScroll.js';
import unlockScroll from './unlockScroll.js';

describe('unlockScroll (browser)', () => {
  describe('return type', () => {
    it('should return undefined', () => {
      lockScroll(window);
      expect(unlockScroll(window)).toBeUndefined();
    });

    it('should not throw', () => {
      lockScroll(window);
      expect(() => unlockScroll(window)).not.toThrow();
    });
  });

  describe('unlocking window', () => {
    it('should not throw when unlocking without prior lock', () => {
      expect(() => unlockScroll(window)).not.toThrow();
    });

    it('should unlock after locking on window', () => {
      lockScroll(window);
      expect(() => unlockScroll(window)).not.toThrow();
    });
  });

  describe('unlocking element', () => {
    it('should accept an HTMLElement as target', () => {
      const $el = document.createElement('div');
      document.body.appendChild($el);
      lockScroll($el);
      expect(() => unlockScroll($el)).not.toThrow();
      $el.remove();
    });
  });
});
