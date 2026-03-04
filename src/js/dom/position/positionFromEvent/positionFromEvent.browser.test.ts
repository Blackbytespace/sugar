/**
 * @name            positionFromEvent.browser.test.ts
 * @namespace       js.dom.position
 * @type            Test
 * @platform        js
 * @status          stable
 *
 * Browser e2e tests for positionFromEvent
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

import { describe, it, expect, beforeEach } from 'vitest';
import positionFromEvent from './positionFromEvent.js';

/** Returns true if the Touch constructor can be called (not available in Firefox desktop) */
function isTouchConstructable(): boolean {
  try {
    new Touch({ identifier: 0, target: document.body });
    return true;
  } catch {
    return false;
  }
}

describe('positionFromEvent (browser)', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  describe('return type', () => {
    it('should return an object with x and y properties', () => {
      const e = new MouseEvent('mousemove', { clientX: 100, clientY: 200 });
      const result = positionFromEvent(e);
      expect(result).toHaveProperty('x');
      expect(result).toHaveProperty('y');
    });
  });

  describe('mouse events', () => {
    const mouseEventTypes = [
      'mousedown',
      'mouseup',
      'mousemove',
      'mouseover',
      'mouseout',
      'mouseenter',
      'mouseleave',
    ] as const;

    for (const type of mouseEventTypes) {
      it(`should return clientX/Y for ${type}`, () => {
        const e = new MouseEvent(type, { clientX: 150, clientY: 250 });
        const result = positionFromEvent(e);
        expect(result.x).toBe(150);
        expect(result.y).toBe(250);
      });
    }

    it('should handle (0, 0) coordinates', () => {
      const e = new MouseEvent('mousemove', { clientX: 0, clientY: 0 });
      const result = positionFromEvent(e);
      expect(result.x).toBe(0);
      expect(result.y).toBe(0);
    });

    it('should handle large coordinate values', () => {
      const e = new MouseEvent('mousemove', { clientX: 9999, clientY: 8888 });
      const result = positionFromEvent(e);
      expect(result.x).toBe(9999);
      expect(result.y).toBe(8888);
    });
  });

  describe('pointer events', () => {
    const pointerEventTypes = [
      'pointerdown',
      'pointerup',
      'pointermove',
      'pointerover',
      'pointerout',
      'pointerenter',
      'pointerleave',
    ] as const;

    for (const type of pointerEventTypes) {
      it(`should return clientX/Y for ${type}`, () => {
        const e = new PointerEvent(type, { clientX: 300, clientY: 400 });
        const result = positionFromEvent(e as unknown as MouseEvent);
        expect(result.x).toBe(300);
        expect(result.y).toBe(400);
      });
    }
  });

  describe('touch events', () => {
    it('should return pageX/Y for touchstart', () => {
      if (!isTouchConstructable()) return;
      const touch = new Touch({
        identifier: 1,
        target: document.body,
        pageX: 55,
        pageY: 77,
      });
      const e = new TouchEvent('touchstart', {
        touches: [touch],
        changedTouches: [touch],
      });
      const result = positionFromEvent(e);
      expect(result.x).toBe(55);
      expect(result.y).toBe(77);
    });

    it('should return pageX/Y for touchmove', () => {
      if (!isTouchConstructable()) return;
      const touch = new Touch({
        identifier: 2,
        target: document.body,
        pageX: 10,
        pageY: 20,
      });
      const e = new TouchEvent('touchmove', {
        touches: [touch],
        changedTouches: [touch],
      });
      const result = positionFromEvent(e);
      expect(result.x).toBe(10);
      expect(result.y).toBe(20);
    });

    it('should return pageX/Y for touchend using changedTouches', () => {
      if (!isTouchConstructable()) return;
      const touch = new Touch({
        identifier: 3,
        target: document.body,
        pageX: 42,
        pageY: 84,
      });
      const e = new TouchEvent('touchend', {
        touches: [],
        changedTouches: [touch],
      });
      const result = positionFromEvent(e);
      expect(result.x).toBe(42);
      expect(result.y).toBe(84);
    });
  });
});
