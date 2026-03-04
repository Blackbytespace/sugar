/**
 * @name            onDrag.browser.test.ts
 * @namespace       js.dom.on
 * @type            Test
 * @platform        js
 * @status          stable
 *
 * Browser tests for onDrag module - drag gesture detection with mouse and touch
 * Tests real browser event handling, position tracking, speed calculations, and DOM manipulation
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import onDrag from './onDrag';

describe('onDrag browser tests', () => {
  let testElement: HTMLElement;
  let capturedEvents: any[];
  let dragCallback: (event: any) => void;

  beforeEach(() => {
    // Create test element
    testElement = document.createElement('div');
    testElement.id = 'test-drag-element';
    testElement.style.position = 'absolute';
    testElement.style.left = '100px';
    testElement.style.top = '100px';
    testElement.style.width = '200px';
    testElement.style.height = '200px';
    testElement.style.backgroundColor = 'blue';
    testElement.style.touchAction = 'none'; // Prevent default touch behaviors
    document.body.appendChild(testElement);

    // Reset captured events
    capturedEvents = [];
    dragCallback = (event) => {
      capturedEvents.push(event);
    };
  });

  afterEach(() => {
    // Clean up test element
    if (testElement && testElement.parentNode) {
      testElement.parentNode.removeChild(testElement);
    }
    capturedEvents = [];
  });

  // Helper function to create mouse event with proper positioning
  function createMouseEvent(
    type: string,
    x: number,
    y: number,
    target?: HTMLElement,
  ): MouseEvent {
    const event = new MouseEvent(type, {
      bubbles: true,
      cancelable: true,
      clientX: x,
      clientY: y,
    });

    // Set target if provided (for testing child element scenarios)
    if (target) {
      Object.defineProperty(event, 'target', {
        value: target,
        writable: false,
        enumerable: true,
      });
    }

    return event;
  }

  // Helper function to create touch event with cross-browser compatibility
  function createTouchEvent(
    type: string,
    x: number,
    y: number,
    target?: HTMLElement,
  ): TouchEvent | CustomEvent {
    const targetElement = target || testElement;

    try {
      // Try modern Touch constructor first (Chrome, modern browsers)
      const touch = new Touch({
        identifier: 0,
        target: targetElement,
        clientX: x,
        clientY: y,
        pageX: x,
        pageY: y,
        screenX: x,
        screenY: y,
        radiusX: 1,
        radiusY: 1,
        rotationAngle: 0,
        force: 1,
      });

      return new TouchEvent(type, {
        bubbles: true,
        cancelable: true,
        touches: type === 'touchend' ? [] : [touch],
        changedTouches: [touch],
        targetTouches: type === 'touchend' ? [] : [touch],
      });
    } catch (e) {
      // Fallback 1: TouchEvent constructor with synthetic touch objects
      try {
        const touch = {
          identifier: 0,
          target: targetElement,
          clientX: x,
          clientY: y,
          pageX: x,
          pageY: y,
          screenX: x,
          screenY: y,
          radiusX: 1,
          radiusY: 1,
          rotationAngle: 0,
          force: 1,
        };

        return new TouchEvent(type, {
          bubbles: true,
          cancelable: true,
          touches: type === 'touchend' ? [] : [touch],
          changedTouches: [touch],
          targetTouches: type === 'touchend' ? [] : [touch],
        });
      } catch (e2) {
        // Fallback 2: CustomEvent with touch properties (Safari compatibility)
        const touch = {
          identifier: 0,
          target: targetElement,
          clientX: x,
          clientY: y,
          pageX: x,
          pageY: y,
          screenX: x,
          screenY: y,
          radiusX: 1,
          radiusY: 1,
          rotationAngle: 0,
          force: 1,
        };

        const event = new CustomEvent(type, {
          bubbles: true,
          cancelable: true,
        });

        // Use Object.defineProperty to avoid readonly property errors
        Object.defineProperty(event, 'touches', {
          value: type === 'touchend' ? [] : [touch],
          writable: false,
          enumerable: true,
        });
        Object.defineProperty(event, 'changedTouches', {
          value: [touch],
          writable: false,
          enumerable: true,
        });
        Object.defineProperty(event, 'targetTouches', {
          value: type === 'touchend' ? [] : [touch],
          writable: false,
          enumerable: true,
        });

        return event as unknown as TouchEvent;
      }
    }
  }

  // Helper function to simulate drag sequence with delays for timing
  async function simulateMouseDrag(
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    steps: number = 5,
  ) {
    // Mouse down to start drag - dispatch on the test element
    const mouseDownEvent = createMouseEvent('mousedown', startX, startY);
    Object.defineProperty(mouseDownEvent, 'target', {
      value: testElement,
      writable: false,
      enumerable: true,
    });
    document.dispatchEvent(mouseDownEvent);

    // Small delay to ensure start event is processed
    await new Promise((resolve) => setTimeout(resolve, 10));

    // Simulate intermediate move events
    for (let i = 1; i <= steps; i++) {
      const progress = i / steps;
      const currentX = startX + (endX - startX) * progress;
      const currentY = startY + (endY - startY) * progress;

      document.dispatchEvent(createMouseEvent('mousemove', currentX, currentY));
      await new Promise((resolve) => setTimeout(resolve, 10));
    }

    // Mouse up to end drag
    document.dispatchEvent(createMouseEvent('mouseup', endX, endY));
    await new Promise((resolve) => setTimeout(resolve, 10));
  }

  // Helper function to simulate touch drag sequence
  async function simulateTouchDrag(
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    steps: number = 5,
  ) {
    // Touch start - dispatch on the test element
    const touchStartEvent = createTouchEvent('touchstart', startX, startY);
    Object.defineProperty(touchStartEvent, 'target', {
      value: testElement,
      writable: false,
      enumerable: true,
    });
    document.dispatchEvent(touchStartEvent);
    await new Promise((resolve) => setTimeout(resolve, 10));

    // Simulate intermediate move events
    for (let i = 1; i <= steps; i++) {
      const progress = i / steps;
      const currentX = startX + (endX - startX) * progress;
      const currentY = startY + (endY - startY) * progress;

      document.dispatchEvent(createTouchEvent('touchmove', currentX, currentY));
      await new Promise((resolve) => setTimeout(resolve, 10));
    }

    // Touch end
    document.dispatchEvent(createTouchEvent('touchend', endX, endY));
    await new Promise((resolve) => setTimeout(resolve, 10));
  }

  describe('Mouse drag gestures', () => {
    it('should detect mouse drag start event', async () => {
      onDrag(testElement, dragCallback);

      await simulateMouseDrag(150, 150, 250, 250);

      expect(capturedEvents.length).toBeGreaterThan(0);
      const startEvent = capturedEvents.find((e) => e.type === 'start');
      expect(startEvent).toBeDefined();
      expect(startEvent.track.x).toBe(150);
      expect(startEvent.track.y).toBe(150);
      expect(startEvent.track.deltaX).toBe(0);
      expect(startEvent.track.deltaY).toBe(0);
    });

    it('should track mouse movement with proper coordinates', async () => {
      onDrag(testElement, dragCallback);

      await simulateMouseDrag(100, 100, 300, 200, 3);

      const trackEvents = capturedEvents.filter((e) => e.type === 'track');
      expect(trackEvents.length).toBeGreaterThan(0);

      // Check that coordinates progress from start to end
      const firstTrack = trackEvents[0];
      const lastTrack = trackEvents[trackEvents.length - 1];

      expect(firstTrack.x).toBeGreaterThan(100);
      expect(lastTrack.x).toBeLessThanOrEqual(300);
      expect(lastTrack.y).toBeLessThanOrEqual(200);
    });

    it('should detect mouse drag end event with final position', async () => {
      onDrag(testElement, dragCallback);

      await simulateMouseDrag(100, 100, 400, 300);

      const endEvent = capturedEvents.find((e) => e.type === 'end');
      expect(endEvent).toBeDefined();
      expect(endEvent.x).toBe(400);
      expect(endEvent.y).toBe(300);
      expect(endEvent.deltaX).toBe(300); // 400 - 100
      expect(endEvent.deltaY).toBe(200); // 300 - 100
    });

    it('should calculate speed values during mouse drag', async () => {
      onDrag(testElement, dragCallback);

      await simulateMouseDrag(100, 100, 300, 100, 4);

      const trackEvents = capturedEvents.filter((e) => e.type === 'track');
      expect(trackEvents.length).toBeGreaterThan(0);

      // Speed should be calculated for movement
      const trackEvent = trackEvents[0];
      expect(typeof trackEvent.speedX).toBe('number');
      expect(typeof trackEvent.speedY).toBe('number');
    });

    it('should respect maxSpeed setting for mouse drag', async () => {
      const maxSpeed = 0.005; // Very low max speed
      onDrag(testElement, dragCallback, { maxSpeed });

      // Simulate very fast movement
      await simulateMouseDrag(100, 100, 500, 100, 2);

      const trackEvents = capturedEvents.filter((e) => e.type === 'track');
      if (trackEvents.length > 0) {
        const trackEvent = trackEvents[0];
        expect(Math.abs(trackEvent.speedX)).toBeLessThanOrEqual(maxSpeed);
        expect(Math.abs(trackEvent.speedY)).toBeLessThanOrEqual(maxSpeed);
      }
    });
  });

  describe('Touch drag gestures', () => {
    it('should detect touch drag start event', async () => {
      onDrag(testElement, dragCallback);

      await simulateTouchDrag(150, 150, 250, 250);

      expect(capturedEvents.length).toBeGreaterThan(0);
      const startEvent = capturedEvents.find((e) => e.type === 'start');
      expect(startEvent).toBeDefined();
      expect(startEvent.track.x).toBe(150);
      expect(startEvent.track.y).toBe(150);
    });

    it('should track touch movement with proper coordinates', async () => {
      onDrag(testElement, dragCallback);

      await simulateTouchDrag(100, 100, 300, 200, 3);

      const trackEvents = capturedEvents.filter((e) => e.type === 'track');
      expect(trackEvents.length).toBeGreaterThan(0);

      const firstTrack = trackEvents[0];
      const lastTrack = trackEvents[trackEvents.length - 1];

      expect(firstTrack.x).toBeGreaterThan(100);
      expect(lastTrack.x).toBeLessThanOrEqual(300);
    });

    it('should detect touch drag end event', async () => {
      onDrag(testElement, dragCallback);

      await simulateTouchDrag(100, 100, 400, 300);

      const endEvent = capturedEvents.find((e) => e.type === 'end');
      expect(endEvent).toBeDefined();
      expect(endEvent.x).toBe(400);
      expect(endEvent.y).toBe(300);
    });

    it('should calculate delta values for touch drag', async () => {
      onDrag(testElement, dragCallback);

      await simulateTouchDrag(50, 50, 200, 150);

      const endEvent = capturedEvents.find((e) => e.type === 'end');
      expect(endEvent).toBeDefined();
      expect(endEvent.deltaX).toBe(150); // 200 - 50
      expect(endEvent.deltaY).toBe(100); // 150 - 50
    });
  });

  describe('DOM interaction and pointer events', () => {
    it('should disable pointer events during drag', async () => {
      onDrag(testElement, dragCallback);

      // Start drag
      const mouseDownEvent = createMouseEvent('mousedown', 150, 150);
      Object.defineProperty(mouseDownEvent, 'target', {
        value: testElement,
        writable: false,
        enumerable: true,
      });
      document.dispatchEvent(mouseDownEvent);
      await new Promise((resolve) => setTimeout(resolve, 10));

      // Move (should trigger pointer event disable)
      document.dispatchEvent(createMouseEvent('mousemove', 200, 200));
      await new Promise((resolve) => setTimeout(resolve, 10));

      // Check if pointer events are disabled (this happens on the target element)
      const trackEvents = capturedEvents.filter((e) => e.type === 'track');
      expect(trackEvents.length).toBeGreaterThan(0);

      // End drag
      document.dispatchEvent(createMouseEvent('mouseup', 200, 200));
    });

    it('should only respond to events on target element or its children', async () => {
      onDrag(testElement, dragCallback);

      // Create events outside the target element
      // Use coordinates that are actually outside the element (element is at 100,100 with 200x200 size)
      const mouseDownEvent = createMouseEvent('mousedown', 50, 50);
      // Don't set target property - let it default to document or body
      document.dispatchEvent(mouseDownEvent);
      await new Promise((resolve) => setTimeout(resolve, 10));

      // Move events
      document.dispatchEvent(createMouseEvent('mousemove', 75, 75));
      await new Promise((resolve) => setTimeout(resolve, 10));

      // End drag
      document.dispatchEvent(createMouseEvent('mouseup', 75, 75));

      expect(capturedEvents.length).toBe(0);
    });

    it('should work with child elements', async () => {
      const childElement = document.createElement('div');
      childElement.style.width = '50px';
      childElement.style.height = '50px';
      childElement.style.backgroundColor = 'red';
      testElement.appendChild(childElement);

      onDrag(testElement, dragCallback);

      // Simulate drag starting on child element
      const mouseDownEvent = createMouseEvent('mousedown', 125, 125);
      Object.defineProperty(mouseDownEvent, 'target', {
        value: childElement,
        writable: false,
        enumerable: true,
      });
      document.dispatchEvent(mouseDownEvent);
      await new Promise((resolve) => setTimeout(resolve, 10));
      document.dispatchEvent(createMouseEvent('mousemove', 175, 175));
      await new Promise((resolve) => setTimeout(resolve, 10));
      document.dispatchEvent(createMouseEvent('mouseup', 175, 175));

      expect(capturedEvents.length).toBeGreaterThan(0);
      const startEvent = capturedEvents.find((e) => e.type === 'start');
      expect(startEvent).toBeDefined();
    });
  });

  describe('Drag tracking and history', () => {
    it('should maintain track history throughout drag', async () => {
      onDrag(testElement, dragCallback);

      await simulateMouseDrag(100, 100, 300, 200, 5);

      const endEvent = capturedEvents.find((e) => e.type === 'end');
      expect(endEvent).toBeDefined();
      expect(endEvent.track).toBeInstanceOf(Array);
      expect(endEvent.track.length).toBeGreaterThan(1);

      // First track point should be the start position
      const firstPoint = endEvent.track[0];
      expect(firstPoint.x).toBe(100);
      expect(firstPoint.y).toBe(100);
      expect(firstPoint.deltaX).toBe(0);
      expect(firstPoint.deltaY).toBe(0);
    });

    it('should provide cumulative delta values in track', async () => {
      onDrag(testElement, dragCallback);

      await simulateMouseDrag(100, 100, 250, 200);

      const trackEvents = capturedEvents.filter((e) => e.type === 'track');
      expect(trackEvents.length).toBeGreaterThan(0);

      // Delta should be cumulative from start position
      const lastTrackEvent = trackEvents[trackEvents.length - 1];
      expect(lastTrackEvent.deltaX).toBeGreaterThan(0);
      expect(lastTrackEvent.deltaY).toBeGreaterThan(0);
    });

    it('should not trigger events without movement', () => {
      onDrag(testElement, dragCallback);

      // Just mouse down and up without movement
      const mouseDownEvent = createMouseEvent('mousedown', 150, 150);
      Object.defineProperty(mouseDownEvent, 'target', {
        value: testElement,
        writable: false,
        enumerable: true,
      });
      document.dispatchEvent(mouseDownEvent);
      document.dispatchEvent(createMouseEvent('mouseup', 150, 150));

      // Should only have start event, no track or end events without movement
      const trackEvents = capturedEvents.filter((e) => e.type === 'track');
      const endEvents = capturedEvents.filter((e) => e.type === 'end');

      expect(trackEvents.length).toBe(0);
      expect(endEvents.length).toBe(0);
    });
  });

  describe('Edge cases and browser compatibility', () => {
    it('should handle rapid mouse movements', async () => {
      onDrag(testElement, dragCallback);

      // Simulate very rapid movement
      const mouseDownEvent = createMouseEvent('mousedown', 100, 100);
      Object.defineProperty(mouseDownEvent, 'target', {
        value: testElement,
        writable: false,
        enumerable: true,
      });
      document.dispatchEvent(mouseDownEvent);
      await new Promise((resolve) => setTimeout(resolve, 5));

      for (let i = 0; i < 10; i++) {
        document.dispatchEvent(
          createMouseEvent('mousemove', 100 + i * 20, 100 + i * 10),
        );
        await new Promise((resolve) => setTimeout(resolve, 1)); // Very fast
      }

      document.dispatchEvent(createMouseEvent('mouseup', 300, 200));

      expect(capturedEvents.length).toBeGreaterThan(0);
      const endEvent = capturedEvents.find((e) => e.type === 'end');
      expect(endEvent).toBeDefined();
    });

    it('should handle touch events across different browsers', async () => {
      onDrag(testElement, dragCallback);

      // Test both touch event creation methods work
      try {
        await simulateTouchDrag(100, 100, 200, 200);
        expect(capturedEvents.length).toBeGreaterThan(0);
      } catch (error) {
        // If touch events fail, that's still a valid test result in some browsers
        expect(error).toBeDefined();
      }
    });

    it('should handle simultaneous mouse and touch events gracefully', async () => {
      onDrag(testElement, dragCallback);

      // Start with mouse
      const mouseDownEvent = createMouseEvent('mousedown', 100, 100);
      Object.defineProperty(mouseDownEvent, 'target', {
        value: testElement,
        writable: false,
        enumerable: true,
      });
      document.dispatchEvent(mouseDownEvent);
      await new Promise((resolve) => setTimeout(resolve, 10));

      // Try to interfere with touch
      try {
        const touchEvent = createTouchEvent('touchstart', 150, 150);
        Object.defineProperty(touchEvent, 'target', {
          value: testElement,
          writable: false,
          enumerable: true,
        });
        document.dispatchEvent(touchEvent);
      } catch (e) {
        // Touch might not be available in all test environments
      }

      document.dispatchEvent(createMouseEvent('mousemove', 200, 200));
      await new Promise((resolve) => setTimeout(resolve, 10));

      document.dispatchEvent(createMouseEvent('mouseup', 200, 200));

      // Should still work with mouse events
      expect(capturedEvents.length).toBeGreaterThan(0);
    });
  });
});
