import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import viewportEvents from './viewportEvents.js';

describe('sugar.js.dom.event.viewportEvents (browser)', () => {
  let testContainer: HTMLElement;
  let mockEvents: Array<{ type: string; timestamp: number }>;
  
  beforeEach(async () => {
    // Create a container for our test elements
    testContainer = document.createElement('div');
    testContainer.id = 'test-container';
    testContainer.style.cssText = `
      width: 100%;
      height: 3000px; /* Make it tall enough to test scrolling */
      position: relative;
    `;
    document.body.appendChild(testContainer);
    
    // Reset scroll position to top
    window.scrollTo(0, 0);
    
    // Initialize event tracking
    mockEvents = [];
  });

  afterEach(() => {
    // Clean up test elements
    if (testContainer && testContainer.parentNode) {
      testContainer.parentNode.removeChild(testContainer);
    }
    
    // Reset scroll position
    window.scrollTo(0, 0);
  });

  it('should initialize IntersectionObserver for viewport tracking', async () => {
    const element = document.createElement('div');
    element.style.cssText = `
      position: absolute;
      top: 100px;
      left: 100px;
      width: 100px;
      height: 100px;
      background: red;
    `;
    testContainer.appendChild(element);

    const api = viewportEvents(element);
    
    expect(api.$elm).toBe(element);
    expect(typeof api.cancel).toBe('function');
  });

  it('should dispatch viewport.enter event when element enters viewport', async () => {
    const element = document.createElement('div');
    element.style.cssText = `
      position: absolute;
      top: 100px;
      left: 100px;
      width: 100px;
      height: 100px;
      background: red;
    `;
    testContainer.appendChild(element);

    // Track viewport events
    const enterEvents: Event[] = [];
    element.addEventListener('viewport.enter', (e) => {
      enterEvents.push(e);
      mockEvents.push({ type: 'viewport.enter', timestamp: Date.now() });
    });

    viewportEvents(element);

    // Element should already be in viewport, so event should fire
    await new Promise(resolve => setTimeout(resolve, 100));
    
    expect(enterEvents.length).toBeGreaterThan(0);
    expect(mockEvents.some(e => e.type === 'viewport.enter')).toBe(true);
  });

  it('should dispatch viewport.leave event when element leaves viewport', async () => {
    const element = document.createElement('div');
    element.style.cssText = `
      position: absolute;
      top: 100px;
      left: 100px;
      width: 100px;
      height: 100px;
      background: red;
    `;
    testContainer.appendChild(element);

    const enterEvents: Event[] = [];
    const leaveEvents: Event[] = [];
    
    element.addEventListener('viewport.enter', (e) => {
      enterEvents.push(e);
    });
    
    element.addEventListener('viewport.leave', (e) => {
      leaveEvents.push(e);
      mockEvents.push({ type: 'viewport.leave', timestamp: Date.now() });
    });

    viewportEvents(element);

    // Wait for enter event
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Scroll down to make element leave viewport
    window.scrollTo(0, 1000);
    
    // Wait for IntersectionObserver to detect the change
    await new Promise(resolve => setTimeout(resolve, 200));
    
    expect(enterEvents.length).toBeGreaterThan(0);
    expect(leaveEvents.length).toBeGreaterThan(0);
    expect(mockEvents.some(e => e.type === 'viewport.leave')).toBe(true);
  });

  it('should dispatch directional enter events (above/below)', async () => {
    const elementBelow = document.createElement('div');
    elementBelow.style.cssText = `
      position: absolute;
      top: 1200px; /* Position it below current viewport */
      left: 100px;
      width: 100px;
      height: 100px;
      background: blue;
    `;
    testContainer.appendChild(elementBelow);

    const enterAboveEvents: Event[] = [];
    const enterBelowEvents: Event[] = [];
    const genericEnterEvents: Event[] = [];
    
    elementBelow.addEventListener('viewport.enter.above', (e) => {
      enterAboveEvents.push(e);
      mockEvents.push({ type: 'viewport.enter.above', timestamp: Date.now() });
    });
    
    elementBelow.addEventListener('viewport.enter.below', (e) => {
      enterBelowEvents.push(e);
      mockEvents.push({ type: 'viewport.enter.below', timestamp: Date.now() });
    });
    
    elementBelow.addEventListener('viewport.enter', (e) => {
      genericEnterEvents.push(e);
      mockEvents.push({ type: 'viewport.enter', timestamp: Date.now() });
    });

    // Initialize at top
    window.scrollTo(0, 0);
    await new Promise(resolve => setTimeout(resolve, 100));

    // Initialize viewport events AFTER positioning
    viewportEvents(elementBelow);
    
    // Wait for initial state (element should be out of viewport)
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Scroll down to bring element into viewport from below
    // Element at 1200px, scrolling to 800px will put it at 400px from viewport top
    window.scrollTo(0, 800);
    
    // Wait for IntersectionObserver to detect the change
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Should have fired generic enter event
    expect(genericEnterEvents.length).toBeGreaterThan(0);
    
    // Should have fired enter.below when element appeared in lower half of viewport
    expect(enterBelowEvents.length).toBeGreaterThan(0);
    expect(mockEvents.some(e => e.type === 'viewport.enter.below')).toBe(true);
  });

  it('should dispatch directional leave events (above/below)', async () => {
    const element = document.createElement('div');
    element.style.cssText = `
      position: absolute;
      top: 500px;
      left: 100px;
      width: 100px;
      height: 100px;
      background: green;
    `;
    testContainer.appendChild(element);

    const leaveAboveEvents: Event[] = [];
    const leaveBelowEvents: Event[] = [];
    
    element.addEventListener('viewport.leave.above', (e) => {
      leaveAboveEvents.push(e);
      mockEvents.push({ type: 'viewport.leave.above', timestamp: Date.now() });
    });
    
    element.addEventListener('viewport.leave.below', (e) => {
      leaveBelowEvents.push(e);
      mockEvents.push({ type: 'viewport.leave.below', timestamp: Date.now() });
    });

    viewportEvents(element);

    // Wait for initial intersection
    await new Promise(resolve => setTimeout(resolve, 100));

    // Scroll down to make element leave viewport above
    window.scrollTo(0, 800);
    
    // Wait for IntersectionObserver to detect the change
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Element should leave from above
    expect(leaveAboveEvents.length).toBeGreaterThan(0);
    expect(mockEvents.some(e => e.type === 'viewport.leave.above')).toBe(true);
  });

  it('should support custom offset settings', async () => {
    const element = document.createElement('div');
    element.style.cssText = `
      position: absolute;
      top: 1500px; /* Position it below current viewport */
      left: 100px;
      width: 100px;
      height: 100px;
      background: orange;
    `;
    testContainer.appendChild(element);

    const enterEvents: Event[] = [];
    element.addEventListener('viewport.enter', (e) => {
      enterEvents.push(e);
      mockEvents.push({ type: 'viewport.enter.offset', timestamp: Date.now() });
    });

    // Use large offset to trigger early
    viewportEvents(element, { offset: 200 });

    // Scroll partway down - with offset, should trigger before element is fully visible
    window.scrollTo(0, 1200);
    
    // Wait for IntersectionObserver to detect the change
    await new Promise(resolve => setTimeout(resolve, 200));
    
    expect(enterEvents.length).toBeGreaterThan(0);
    expect(mockEvents.some(e => e.type === 'viewport.enter.offset')).toBe(true);
  });

  it('should support once=true setting', async () => {
    const element = document.createElement('div');
    element.style.cssText = `
      position: absolute;
      top: 100px;
      left: 100px;
      width: 100px;
      height: 100px;
      background: purple;
    `;
    testContainer.appendChild(element);

    const enterEvents: Event[] = [];
    const leaveEvents: Event[] = [];
    
    element.addEventListener('viewport.enter', (e) => {
      enterEvents.push(e);
    });
    
    element.addEventListener('viewport.leave', (e) => {
      leaveEvents.push(e);
    });

    viewportEvents(element, { once: true });

    // Wait for initial enter event
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Scroll to make it leave
    window.scrollTo(0, 500);
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Scroll back to make it enter again
    window.scrollTo(0, 0);
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Should only have fired enter once due to once=true
    expect(enterEvents.length).toBe(1);
  });

  it('should handle visibility change events', async () => {
    const element = document.createElement('div');
    element.style.cssText = `
      position: absolute;
      top: 100px;
      left: 100px;
      width: 100px;
      height: 100px;
      background: cyan;
    `;
    testContainer.appendChild(element);

    const enterEvents: Event[] = [];
    element.addEventListener('viewport.enter', (e) => {
      enterEvents.push(e);
    });

    viewportEvents(element);

    // Simulate visibility change (like tab switching)
    Object.defineProperty(document, 'visibilityState', {
      writable: true,
      value: 'hidden'
    });
    document.dispatchEvent(new Event('visibilitychange'));

    await new Promise(resolve => setTimeout(resolve, 50));

    Object.defineProperty(document, 'visibilityState', {
      writable: true,
      value: 'visible'
    });
    document.dispatchEvent(new Event('visibilitychange'));

    await new Promise(resolve => setTimeout(resolve, 100));

    expect(enterEvents.length).toBeGreaterThan(0);
  });

  it('should provide cancel functionality', async () => {
    const element = document.createElement('div');
    element.style.cssText = `
      position: absolute;
      top: 100px;
      left: 100px;
      width: 100px;
      height: 100px;
      background: yellow;
    `;
    testContainer.appendChild(element);

    const leaveEvents: Event[] = [];
    element.addEventListener('viewport.leave', (e) => {
      leaveEvents.push(e);
    });

    const api = viewportEvents(element);

    // Wait for initial setup
    await new Promise(resolve => setTimeout(resolve, 100));

    // Cancel the observer
    api.cancel();

    // Scroll to trigger leave event
    window.scrollTo(0, 500);
    await new Promise(resolve => setTimeout(resolve, 200));

    // Should not have received leave events after cancellation
    expect(leaveEvents.length).toBe(0);
  });

  it('should dispatch legacy viewport.in and viewport.out events', async () => {
    const element = document.createElement('div');
    element.style.cssText = `
      position: absolute;
      top: 100px;
      left: 100px;
      width: 100px;
      height: 100px;
      background: lime;
    `;
    testContainer.appendChild(element);

    const inEvents: Event[] = [];
    const outEvents: Event[] = [];
    
    element.addEventListener('viewport.in', (e) => {
      inEvents.push(e);
    });
    
    element.addEventListener('viewport.out', (e) => {
      outEvents.push(e);
    });

    viewportEvents(element);

    // Wait for enter
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Scroll to trigger leave
    window.scrollTo(0, 500);
    await new Promise(resolve => setTimeout(resolve, 200));
    
    expect(inEvents.length).toBeGreaterThan(0);
    expect(outEvents.length).toBeGreaterThan(0);
  });

  it('should prevent duplicate initialization on same element', async () => {
    const element = document.createElement('div');
    element.style.cssText = `
      position: absolute;
      top: 100px;
      left: 100px;
      width: 100px;
      height: 100px;
      background: pink;
    `;
    testContainer.appendChild(element);

    const enterEvents: Event[] = [];
    element.addEventListener('viewport.enter', (e) => {
      enterEvents.push(e);
    });

    // Initialize twice
    const api1 = viewportEvents(element);
    const api2 = viewportEvents(element);

    expect(api1.$elm).toBe(element);
    expect(api2.$elm).toBe(element);

    await new Promise(resolve => setTimeout(resolve, 100));

    // Should only receive one enter event, not multiple
    expect(enterEvents.length).toBe(1);
  });
});