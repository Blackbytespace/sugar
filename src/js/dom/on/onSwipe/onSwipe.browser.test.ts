import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import onSwipe from './onSwipe.js';

describe('sugar.js.dom.on.onSwipe (browser)', () => {
  let testContainer: HTMLElement;
  let swipeResults: any[] = [];

  beforeEach(async () => {
    // Create a container for our test elements
    testContainer = document.createElement('div');
    testContainer.id = 'swipe-test-container';
    testContainer.style.cssText = `
      width: 300px;
      height: 300px;
      background: lightblue;
      position: relative;
      margin: 50px;
      border: 2px solid blue;
      touch-action: none; /* Prevent default touch behaviors */
    `;
    testContainer.textContent = 'Swipe Test Area';
    document.body.appendChild(testContainer);

    // Reset swipe results
    swipeResults = [];
  });

  afterEach(() => {
    // Clean up test elements
    if (testContainer && testContainer.parentNode) {
      testContainer.parentNode.removeChild(testContainer);
    }

    // Reset swipe results
    swipeResults = [];
  });

  // Helper function to simulate touch events cross-browser compatible
  function simulateTouch(
    element: HTMLElement,
    type: string,
    x: number,
    y: number,
  ) {
    let touchEvent: TouchEvent;

    try {
      // Modern approach: Try to use Touch constructor (works in Chrome, newer browsers)
      const touch = new Touch({
        identifier: 1,
        target: element,
        clientX: x,
        clientY: y,
        screenX: x,
        screenY: y,
        pageX: x,
        pageY: y,
        radiusX: 10,
        radiusY: 10,
        rotationAngle: 0,
        force: 1,
      });

      touchEvent = new TouchEvent(type, {
        touches: type === 'touchend' ? [] : [touch],
        targetTouches: type === 'touchend' ? [] : [touch],
        changedTouches: [touch],
        bubbles: true,
        cancelable: true,
      });
    } catch (e) {
      // Fallback approach for Firefox, Safari, and older browsers
      // Create a synthetic touch object that implements Touch interface
      const syntheticTouch = {
        identifier: 1,
        target: element,
        clientX: x,
        clientY: y,
        screenX: x,
        screenY: y,
        pageX: x,
        pageY: y,
        radiusX: 10,
        radiusY: 10,
        rotationAngle: 0,
        force: 1,
      } as Touch;

      try {
        // Try modern TouchEvent constructor with synthetic touch
        touchEvent = new TouchEvent(type, {
          bubbles: true,
          cancelable: true,
          touches: type === 'touchend' ? [] : [syntheticTouch],
          targetTouches: type === 'touchend' ? [] : [syntheticTouch],
          changedTouches: [syntheticTouch],
        });
      } catch (e2) {
        // Final fallback: Use CustomEvent and manually set properties
        touchEvent = new CustomEvent(type, {
          bubbles: true,
          cancelable: true,
        }) as any;

        // Manually define touch properties using defineProperty to avoid readonly issues
        Object.defineProperty(touchEvent, 'touches', {
          value: type === 'touchend' ? [] : [syntheticTouch],
          writable: false,
          configurable: true,
        });

        Object.defineProperty(touchEvent, 'targetTouches', {
          value: type === 'touchend' ? [] : [syntheticTouch],
          writable: false,
          configurable: true,
        });

        Object.defineProperty(touchEvent, 'changedTouches', {
          value: [syntheticTouch],
          writable: false,
          configurable: true,
        });
      }
    }

    element.dispatchEvent(touchEvent);
  }

  it('should initialize swipe detection with default settings', () => {
    expect(() => {
      onSwipe(testContainer, (swipe: any) => {
        swipeResults.push(swipe);
      });
    }).not.toThrow();
  });

  it('should detect left swipe gesture', async () => {
    onSwipe(testContainer, (swipe: any) => {
      swipeResults.push(swipe);
    });

    // Simulate a left swipe (start right, end left)
    simulateTouch(testContainer, 'touchstart', 200, 150);
    await new Promise((resolve) => setTimeout(resolve, 50)); // Small delay
    simulateTouch(testContainer, 'touchend', 50, 150);

    // Wait for gesture processing
    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(swipeResults.length).toBe(1);
    expect(swipeResults[0].left).toBe(true);
    expect(swipeResults[0].right).toBe(false);
    expect(swipeResults[0].up).toBe(false);
    expect(swipeResults[0].down).toBe(false);
    expect(swipeResults[0].distanceX).toBeGreaterThan(100);
  });

  it('should detect right swipe gesture', async () => {
    onSwipe(testContainer, (swipe: any) => {
      swipeResults.push(swipe);
    });

    // Simulate a right swipe (start left, end right)
    simulateTouch(testContainer, 'touchstart', 50, 150);
    await new Promise((resolve) => setTimeout(resolve, 50));
    simulateTouch(testContainer, 'touchend', 200, 150);

    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(swipeResults.length).toBe(1);
    expect(swipeResults[0].right).toBe(true);
    expect(swipeResults[0].left).toBe(false);
    expect(swipeResults[0].up).toBe(false);
    expect(swipeResults[0].down).toBe(false);
    expect(swipeResults[0].distanceX).toBeGreaterThan(100);
  });

  it('should detect up swipe gesture', async () => {
    onSwipe(testContainer, (swipe: any) => {
      swipeResults.push(swipe);
    });

    // Simulate an up swipe (start bottom, end top)
    simulateTouch(testContainer, 'touchstart', 150, 200);
    await new Promise((resolve) => setTimeout(resolve, 50));
    simulateTouch(testContainer, 'touchend', 150, 50);

    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(swipeResults.length).toBe(1);
    expect(swipeResults[0].up).toBe(true);
    expect(swipeResults[0].down).toBe(false);
    expect(swipeResults[0].left).toBe(false);
    expect(swipeResults[0].right).toBe(false);
    expect(swipeResults[0].distanceY).toBeGreaterThan(100);
  });

  it('should detect down swipe gesture', async () => {
    onSwipe(testContainer, (swipe: any) => {
      swipeResults.push(swipe);
    });

    // Simulate a down swipe (start top, end bottom)
    simulateTouch(testContainer, 'touchstart', 150, 50);
    await new Promise((resolve) => setTimeout(resolve, 50));
    simulateTouch(testContainer, 'touchend', 150, 200);

    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(swipeResults.length).toBe(1);
    expect(swipeResults[0].down).toBe(true);
    expect(swipeResults[0].up).toBe(false);
    expect(swipeResults[0].left).toBe(false);
    expect(swipeResults[0].right).toBe(false);
    expect(swipeResults[0].distanceY).toBeGreaterThan(100);
  });

  it('should support custom threshold setting', async () => {
    onSwipe(
      testContainer,
      (swipe: any) => {
        swipeResults.push(swipe);
      },
      { threshold: 200 },
    ); // Require larger threshold

    // Simulate a small swipe that should not trigger with high threshold
    simulateTouch(testContainer, 'touchstart', 150, 150);
    await new Promise((resolve) => setTimeout(resolve, 50));
    simulateTouch(testContainer, 'touchend', 250, 150); // Only 100px movement

    await new Promise((resolve) => setTimeout(resolve, 50));

    // Should not trigger because movement (100px) is less than threshold (200px)
    expect(swipeResults.length).toBe(0);

    // Now try a swipe that meets the threshold
    simulateTouch(testContainer, 'touchstart', 50, 150);
    await new Promise((resolve) => setTimeout(resolve, 50));
    simulateTouch(testContainer, 'touchend', 300, 150); // 250px movement

    await new Promise((resolve) => setTimeout(resolve, 50));

    // Should trigger because movement (250px) exceeds threshold (200px)
    expect(swipeResults.length).toBe(1);
    expect(swipeResults[0].right).toBe(true);
  });

  it('should not trigger callback for movements below threshold', async () => {
    onSwipe(testContainer, (swipe: any) => {
      swipeResults.push(swipe);
    }); // Default threshold is 100

    // Simulate small movements below threshold
    simulateTouch(testContainer, 'touchstart', 150, 150);
    await new Promise((resolve) => setTimeout(resolve, 50));
    simulateTouch(testContainer, 'touchend', 180, 160); // Small movement

    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(swipeResults.length).toBe(0);
  });

  it('should provide accurate distance calculations', async () => {
    onSwipe(testContainer, (swipe: any) => {
      swipeResults.push(swipe);
    });

    // Simulate diagonal swipe with known coordinates
    simulateTouch(testContainer, 'touchstart', 100, 100);
    await new Promise((resolve) => setTimeout(resolve, 50));
    simulateTouch(testContainer, 'touchend', 250, 201); // 150px right, 101px down (both > threshold)

    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(swipeResults.length).toBe(1);
    expect(swipeResults[0].distanceX).toBe(150);
    expect(swipeResults[0].distanceY).toBe(101);
    expect(swipeResults[0].right).toBe(true);
    expect(swipeResults[0].down).toBe(true);
  });

  it('should handle diagonal swipes correctly', async () => {
    onSwipe(
      testContainer,
      (swipe: any) => {
        swipeResults.push(swipe);
      },
      { threshold: 80 },
    ); // Lower threshold for diagonal

    // Simulate diagonal up-left swipe
    simulateTouch(testContainer, 'touchstart', 200, 200);
    await new Promise((resolve) => setTimeout(resolve, 50));
    simulateTouch(testContainer, 'touchend', 80, 80); // 120px left, 120px up

    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(swipeResults.length).toBe(1);
    expect(swipeResults[0].left).toBe(true);
    expect(swipeResults[0].up).toBe(true);
    expect(swipeResults[0].right).toBe(false);
    expect(swipeResults[0].down).toBe(false);
  });

  it('should handle multiple swipe events on same element', async () => {
    onSwipe(testContainer, (swipe: any) => {
      swipeResults.push(swipe);
    });

    // First swipe - left
    simulateTouch(testContainer, 'touchstart', 200, 150);
    await new Promise((resolve) => setTimeout(resolve, 50));
    simulateTouch(testContainer, 'touchend', 50, 150);
    await new Promise((resolve) => setTimeout(resolve, 50));

    // Second swipe - right
    simulateTouch(testContainer, 'touchstart', 50, 150);
    await new Promise((resolve) => setTimeout(resolve, 50));
    simulateTouch(testContainer, 'touchend', 200, 150);
    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(swipeResults.length).toBe(2);
    expect(swipeResults[0].left).toBe(true);
    expect(swipeResults[1].right).toBe(true);
  });

  it('should work with touch events on different parts of element', async () => {
    onSwipe(testContainer, (swipe: any) => {
      swipeResults.push(swipe);
    });

    // Swipe from top-left corner
    simulateTouch(testContainer, 'touchstart', 60, 60);
    await new Promise((resolve) => setTimeout(resolve, 50));
    simulateTouch(testContainer, 'touchend', 240, 60);
    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(swipeResults.length).toBe(1);
    expect(swipeResults[0].right).toBe(true);

    // Swipe from bottom-right corner
    simulateTouch(testContainer, 'touchstart', 240, 240);
    await new Promise((resolve) => setTimeout(resolve, 50));
    simulateTouch(testContainer, 'touchend', 60, 240);
    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(swipeResults.length).toBe(2);
    expect(swipeResults[1].left).toBe(true);
  });

  it('should handle rapid successive swipes', async () => {
    onSwipe(testContainer, (swipe: any) => {
      swipeResults.push(swipe);
    });

    // Rapid swipes
    simulateTouch(testContainer, 'touchstart', 200, 150);
    simulateTouch(testContainer, 'touchend', 50, 150);

    simulateTouch(testContainer, 'touchstart', 50, 150);
    simulateTouch(testContainer, 'touchend', 200, 150);

    simulateTouch(testContainer, 'touchstart', 150, 200);
    simulateTouch(testContainer, 'touchend', 150, 50);

    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(swipeResults.length).toBe(3);
    expect(swipeResults[0].left).toBe(true);
    expect(swipeResults[1].right).toBe(true);
    expect(swipeResults[2].up).toBe(true);
  });

  it('should ignore incomplete touch sequences', async () => {
    onSwipe(testContainer, (swipe: any) => {
      swipeResults.push(swipe);
    });

    // Only touchstart, no touchend - should not trigger any swipe
    simulateTouch(testContainer, 'touchstart', 150, 150);
    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(swipeResults.length).toBe(0);

    // Now simulate a proper complete swipe gesture (new start and end)
    simulateTouch(testContainer, 'touchstart', 200, 150);
    await new Promise((resolve) => setTimeout(resolve, 50));
    simulateTouch(testContainer, 'touchend', 50, 150);
    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(swipeResults.length).toBe(1);
    expect(swipeResults[0].left).toBe(true);
  });
});
