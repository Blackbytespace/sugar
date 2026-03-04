import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import scrollSpy from './scrollSpy.js';

describe('sugar.js.scroll.scrollSpy (browser)', () => {
  let testContainer: HTMLElement;
  let cleanup: (() => void) | null = null;
  
  beforeEach(async () => {
    // Create a container for our test elements
    testContainer = document.createElement('div');
    testContainer.id = 'scroll-spy-test-container';
    testContainer.style.cssText = `
      width: 100%;
      height: 3000px; /* Make it tall enough to test scrolling */
      position: relative;
    `;
    document.body.appendChild(testContainer);
    
    // Reset scroll position to top
    window.scrollTo(0, 0);
  });

  afterEach(() => {
    // Clean up scroll spy listener
    if (cleanup) {
      cleanup();
      cleanup = null;
    }
    
    // Clean up test elements
    if (testContainer && testContainer.parentNode) {
      testContainer.parentNode.removeChild(testContainer);
    }
    
    // Reset scroll position
    window.scrollTo(0, 0);
  });

  it('should initialize scroll spy with default settings', async () => {
    // Create navigation links
    const nav = document.createElement('nav');
    nav.innerHTML = `
      <a href="#section1">Section 1</a>
      <a href="#section2">Section 2</a>
      <a href="#section3">Section 3</a>
    `;
    testContainer.appendChild(nav);

    // Create target sections
    const section1 = document.createElement('div');
    section1.id = 'section1';
    section1.style.cssText = `
      height: 400px;
      background: red;
      margin-bottom: 100px;
    `;
    section1.textContent = 'Section 1 Content';
    testContainer.appendChild(section1);

    const section2 = document.createElement('div');
    section2.id = 'section2';
    section2.style.cssText = `
      height: 400px;
      background: green;
      margin-bottom: 100px;
    `;
    section2.textContent = 'Section 2 Content';
    testContainer.appendChild(section2);

    const section3 = document.createElement('div');
    section3.id = 'section3';
    section3.style.cssText = `
      height: 400px;
      background: blue;
    `;
    section3.textContent = 'Section 3 Content';
    testContainer.appendChild(section3);

    const links = nav.querySelectorAll('a') as NodeListOf<HTMLAnchorElement>;
    cleanup = scrollSpy(links);
    
    expect(typeof cleanup).toBe('function');
  });

  it('should add active class to first section when at top', async () => {
    // Create navigation
    const nav = document.createElement('nav');
    nav.innerHTML = `
      <a href="#section1">Section 1</a>
      <a href="#section2">Section 2</a>
    `;
    testContainer.appendChild(nav);

    // Create sections
    const section1 = document.createElement('div');
    section1.id = 'section1';
    section1.style.cssText = `
      height: 600px;
      background: red;
      margin-bottom: 50px;
    `;
    testContainer.appendChild(section1);

    const section2 = document.createElement('div');
    section2.id = 'section2';
    section2.style.cssText = `
      height: 600px;
      background: green;
    `;
    testContainer.appendChild(section2);

    const links = nav.querySelectorAll('a') as NodeListOf<HTMLAnchorElement>;
    cleanup = scrollSpy(links);

    // Ensure we're at top and trigger scroll event on document (as scrollSpy expects)
    window.scrollTo(0, 0);
    document.dispatchEvent(new Event('scroll'));
    
    // Wait for scroll event to be processed
    await new Promise(resolve => setTimeout(resolve, 50));

    const link1 = nav.querySelector('a[href="#section1"]') as HTMLAnchorElement;
    const link2 = nav.querySelector('a[href="#section2"]') as HTMLAnchorElement;

    expect(link1.classList.contains('-active')).toBe(true);
    expect(link2.classList.contains('-active')).toBe(false);
  });

  it('should switch active class when scrolling to different sections', async () => {
    const nav = document.createElement('nav');
    nav.innerHTML = `
      <a href="#section1">Section 1</a>
      <a href="#section2">Section 2</a>
      <a href="#section3">Section 3</a>
    `;
    testContainer.appendChild(nav);

    // Create sections with substantial height
    const section1 = document.createElement('div');
    section1.id = 'section1';
    section1.style.cssText = `
      height: 800px;
      background: red;
      margin-bottom: 100px;
    `;
    testContainer.appendChild(section1);

    const section2 = document.createElement('div');
    section2.id = 'section2';
    section2.style.cssText = `
      height: 800px;
      background: green;
      margin-bottom: 100px;
    `;
    testContainer.appendChild(section2);

    const section3 = document.createElement('div');
    section3.id = 'section3';
    section3.style.cssText = `
      height: 800px;
      background: blue;
    `;
    testContainer.appendChild(section3);

    const links = nav.querySelectorAll('a') as NodeListOf<HTMLAnchorElement>;
    cleanup = scrollSpy(links);

    const link1 = nav.querySelector('a[href="#section1"]') as HTMLAnchorElement;
    const link2 = nav.querySelector('a[href="#section2"]') as HTMLAnchorElement;
    const link3 = nav.querySelector('a[href="#section3"]') as HTMLAnchorElement;

    // Initial state - first section should be active
    window.scrollTo(0, 0);
    document.dispatchEvent(new Event('scroll'));
    await new Promise(resolve => setTimeout(resolve, 50));
    
    expect(link1.classList.contains('-active')).toBe(true);
    expect(link2.classList.contains('-active')).toBe(false);
    expect(link3.classList.contains('-active')).toBe(false);

    // Scroll to second section area
    window.scrollTo(0, 600);
    document.dispatchEvent(new Event('scroll'));
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(link1.classList.contains('-active')).toBe(false);
    expect(link2.classList.contains('-active')).toBe(true);
    expect(link3.classList.contains('-active')).toBe(false);

    // Scroll to third section area  
    window.scrollTo(0, 1500);
    document.dispatchEvent(new Event('scroll'));
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(link1.classList.contains('-active')).toBe(false);
    expect(link2.classList.contains('-active')).toBe(false);
    expect(link3.classList.contains('-active')).toBe(true);
  });

  it('should support custom active class name', async () => {
    const nav = document.createElement('nav');
    nav.innerHTML = `
      <a href="#section1">Section 1</a>
      <a href="#section2">Section 2</a>
    `;
    testContainer.appendChild(nav);

    const section1 = document.createElement('div');
    section1.id = 'section1';
    section1.style.cssText = `
      height: 600px;
      background: red;
    `;
    testContainer.appendChild(section1);

    const section2 = document.createElement('div');
    section2.id = 'section2';
    section2.style.cssText = `
      height: 600px;
      background: green;
    `;
    testContainer.appendChild(section2);

    const links = nav.querySelectorAll('a') as NodeListOf<HTMLAnchorElement>;
    cleanup = scrollSpy(links, { activeClass: 'custom-active' });

    // Trigger scroll event
    window.scrollTo(0, 0);
    document.dispatchEvent(new Event('scroll'));
    await new Promise(resolve => setTimeout(resolve, 50));

    const link1 = nav.querySelector('a[href="#section1"]') as HTMLAnchorElement;
    
    expect(link1.classList.contains('custom-active')).toBe(true);
    expect(link1.classList.contains('-active')).toBe(false); // Should not have default class
  });

  it('should support custom offset setting', async () => {
    const nav = document.createElement('nav');
    nav.innerHTML = `
      <a href="#section1">Section 1</a>
      <a href="#section2">Section 2</a>
    `;
    testContainer.appendChild(nav);

    // Create sections positioned strategically
    const section1 = document.createElement('div');
    section1.id = 'section1';
    section1.style.cssText = `
      height: 400px;
      background: red;
      margin-top: 200px;
      margin-bottom: 100px;
    `;
    testContainer.appendChild(section1);

    const section2 = document.createElement('div');
    section2.id = 'section2';  
    section2.style.cssText = `
      height: 400px;
      background: green;
    `;
    testContainer.appendChild(section2);

    const links = nav.querySelectorAll('a') as NodeListOf<HTMLAnchorElement>;
    // Use small offset to trigger earlier
    cleanup = scrollSpy(links, { offset: 100 });

    const link1 = nav.querySelector('a[href="#section1"]') as HTMLAnchorElement;
    const link2 = nav.querySelector('a[href="#section2"]') as HTMLAnchorElement;

    // Scroll slightly - with small offset, section1 should become active sooner
    window.scrollTo(0, 150);
    window.dispatchEvent(new Event('scroll'));
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(link1.classList.contains('-active')).toBe(true);
    expect(link2.classList.contains('-active')).toBe(false);
  });

  it('should handle links without valid targets gracefully', async () => {
    const nav = document.createElement('nav');
    nav.innerHTML = `
      <a href="#section1">Section 1</a>
      <a href="#nonexistent">Non-existent</a>
      <a href="#section2">Section 2</a>
      <a>Link without href</a>
    `;
    testContainer.appendChild(nav);

    // Only create section1 and section2, skip the nonexistent one
    const section1 = document.createElement('div');
    section1.id = 'section1';
    section1.style.cssText = `
      height: 400px;
      background: red;
    `;
    testContainer.appendChild(section1);

    const section2 = document.createElement('div');
    section2.id = 'section2';
    section2.style.cssText = `
      height: 400px;
      background: green;
    `;
    testContainer.appendChild(section2);

    const links = nav.querySelectorAll('a') as NodeListOf<HTMLAnchorElement>;
    
    // Should not throw an error
    expect(() => {
      cleanup = scrollSpy(links);
    }).not.toThrow();

    // Trigger scroll event
    window.dispatchEvent(new Event('scroll'));
    await new Promise(resolve => setTimeout(resolve, 50));

    // Valid sections should still work
    const link1 = nav.querySelector('a[href="#section1"]') as HTMLAnchorElement;
    expect(link1.classList.contains('-active')).toBe(true);
  });

  it('should work with actual scroll events (not just dispatched)', async () => {
    const nav = document.createElement('nav');
    nav.innerHTML = `
      <a href="#section1">Section 1</a>
      <a href="#section2">Section 2</a>
    `;
    testContainer.appendChild(nav);

    const section1 = document.createElement('div');
    section1.id = 'section1';
    section1.style.cssText = `
      height: 800px;
      background: red;
      margin-bottom: 100px;
    `;
    testContainer.appendChild(section1);

    const section2 = document.createElement('div');
    section2.id = 'section2';
    section2.style.cssText = `
      height: 800px;
      background: green;
    `;
    testContainer.appendChild(section2);

    const links = nav.querySelectorAll('a') as NodeListOf<HTMLAnchorElement>;
    cleanup = scrollSpy(links);

    const link1 = nav.querySelector('a[href="#section1"]') as HTMLAnchorElement;
    const link2 = nav.querySelector('a[href="#section2"]') as HTMLAnchorElement;

    // Perform actual scroll (not just dispatch event)
    window.scrollTo(0, 600);
    
    // Wait for scroll event to be processed
    await new Promise(resolve => setTimeout(resolve, 100));

    expect(link1.classList.contains('-active')).toBe(false);
    expect(link2.classList.contains('-active')).toBe(true);
  });

  it('should clean up event listeners when cleanup function is called', async () => {
    const nav = document.createElement('nav');
    nav.innerHTML = `
      <a href="#section1">Section 1</a>
    `;
    testContainer.appendChild(nav);

    const section1 = document.createElement('div');
    section1.id = 'section1';
    section1.style.cssText = `
      height: 400px;
      background: red;
    `;
    testContainer.appendChild(section1);

    const links = nav.querySelectorAll('a') as NodeListOf<HTMLAnchorElement>;
    const cleanupFn = scrollSpy(links);

    const link1 = nav.querySelector('a[href="#section1"]') as HTMLAnchorElement;

    // Initially should be active
    window.dispatchEvent(new Event('scroll'));
    await new Promise(resolve => setTimeout(resolve, 50));
    expect(link1.classList.contains('-active')).toBe(true);

    // Clean up
    cleanupFn();

    // Remove active class manually
    link1.classList.remove('-active');

    // Scroll events should no longer affect the links
    window.dispatchEvent(new Event('scroll'));
    await new Promise(resolve => setTimeout(resolve, 50));
    
    expect(link1.classList.contains('-active')).toBe(false);

    // Set cleanup to null since we already called it
    cleanup = null;
  });

  it('should handle rapid scroll changes correctly', async () => {
    const nav = document.createElement('nav');
    nav.innerHTML = `
      <a href="#section1">Section 1</a>
      <a href="#section2">Section 2</a>
      <a href="#section3">Section 3</a>
    `;
    testContainer.appendChild(nav);

    const section1 = document.createElement('div');
    section1.id = 'section1';
    section1.style.cssText = `height: 500px; background: red;`;
    testContainer.appendChild(section1);

    const section2 = document.createElement('div');
    section2.id = 'section2';
    section2.style.cssText = `height: 500px; background: green;`;
    testContainer.appendChild(section2);

    const section3 = document.createElement('div');
    section3.id = 'section3';
    section3.style.cssText = `height: 500px; background: blue;`;
    testContainer.appendChild(section3);

    const links = nav.querySelectorAll('a') as NodeListOf<HTMLAnchorElement>;
    cleanup = scrollSpy(links);

    const link1 = nav.querySelector('a[href="#section1"]') as HTMLAnchorElement;
    const link2 = nav.querySelector('a[href="#section2"]') as HTMLAnchorElement;
    const link3 = nav.querySelector('a[href="#section3"]') as HTMLAnchorElement;

    // Rapidly change scroll positions
    window.scrollTo(0, 0);
    window.dispatchEvent(new Event('scroll'));
    
    window.scrollTo(0, 400);
    window.dispatchEvent(new Event('scroll'));
    
    window.scrollTo(0, 900);
    window.dispatchEvent(new Event('scroll'));

    // Wait for all scroll events to be processed
    await new Promise(resolve => setTimeout(resolve, 100));

    // Only one link should be active (the last scrolled to position)
    const activeLinks = [link1, link2, link3].filter(link => 
      link.classList.contains('-active')
    );
    
    expect(activeLinks.length).toBe(1);
    expect(link3.classList.contains('-active')).toBe(true);
  });

  it('should handle sections with different heights correctly', async () => {
    const nav = document.createElement('nav');
    nav.innerHTML = `
      <a href="#short">Short Section</a>
      <a href="#tall">Tall Section</a>
      <a href="#medium">Medium Section</a>
    `;
    testContainer.appendChild(nav);

    const shortSection = document.createElement('div');
    shortSection.id = 'short';
    shortSection.style.cssText = `height: 200px; background: red; margin-bottom: 50px;`;
    testContainer.appendChild(shortSection);

    const tallSection = document.createElement('div');
    tallSection.id = 'tall';
    tallSection.style.cssText = `height: 1200px; background: green; margin-bottom: 50px;`;
    testContainer.appendChild(tallSection);

    const mediumSection = document.createElement('div');
    mediumSection.id = 'medium';
    mediumSection.style.cssText = `height: 600px; background: blue;`;
    testContainer.appendChild(mediumSection);

    const links = nav.querySelectorAll('a') as NodeListOf<HTMLAnchorElement>;
    const shortLink = nav.querySelector('a[href="#short"]') as HTMLAnchorElement;
    const tallLink = nav.querySelector('a[href="#tall"]') as HTMLAnchorElement;
    const mediumLink = nav.querySelector('a[href="#medium"]') as HTMLAnchorElement;

    // Start at top first
    window.scrollTo(0, 0);
    
    // Initialize scrollSpy with smaller offset for testing
    cleanup = scrollSpy(links, { offset: 100 });

    // Manually trigger scroll handler for initial state
    document.dispatchEvent(new Event('scroll'));
    await new Promise(resolve => setTimeout(resolve, 100));
    
    expect(shortLink.classList.contains('-active')).toBe(true);

    // Scroll to tall section (past the short section)
    window.scrollTo(0, 300); 
    document.dispatchEvent(new Event('scroll'));
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(tallLink.classList.contains('-active')).toBe(true);
    expect(shortLink.classList.contains('-active')).toBe(false);

    // Scroll to medium section (past the tall section)
    window.scrollTo(0, 1600);
    document.dispatchEvent(new Event('scroll'));
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(mediumLink.classList.contains('-active')).toBe(true);
    expect(tallLink.classList.contains('-active')).toBe(false);
  });
});