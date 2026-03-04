import { describe, it, expect, beforeEach } from 'vitest';
import querySelector from './querySelector.js';

describe('sugar.js.dom.query.querySelector (browser)', () => {
  beforeEach(async () => {
    // Clear the document body before each test
    document.body.innerHTML = '';
  });

  it('should select elements with basic CSS selector', async () => {
    document.body.innerHTML = `
      <div class="container">
        <p data-testid="target-paragraph">Test content</p>
        <button class="btn primary">Click me</button>
      </div>
    `;

    const element = querySelector('[data-testid="target-paragraph"]');
    expect(element).toBeInstanceOf(HTMLParagraphElement);
    expect(element?.textContent).toBe('Test content');
  });

  it('should handle complex CSS selectors', async () => {
    document.body.innerHTML = `
      <div class="container">
        <nav>
          <ul class="navigation">
            <li><a href="#" class="nav-link active">Home</a></li>
            <li><a href="#" class="nav-link">About</a></li>
          </ul>
        </nav>
      </div>
    `;

    const activeLink = querySelector('.container .navigation .nav-link.active');
    expect(activeLink).toBeInstanceOf(HTMLAnchorElement);
    expect(activeLink?.textContent).toBe('Home');
    expect(activeLink?.className).toContain('active');
  });

  it('should return undefined when element does not exist', async () => {
    document.body.innerHTML = `
      <div class="container">
        <p>Some content</p>
      </div>
    `;

    const element = querySelector('.non-existent-element');
    expect(element).toBeUndefined();
  });

  it('should use custom root node for queries', async () => {
    document.body.innerHTML = `
      <div id="container-1">
        <p class="paragraph">Container 1 paragraph</p>
      </div>
      <div id="container-2">
        <p class="paragraph">Container 2 paragraph</p>
      </div>
    `;

    const container2 = document.getElementById('container-2') as HTMLElement;
    const paragraph = querySelector('.paragraph', { $rootNode: container2 });

    expect(paragraph).toBeInstanceOf(HTMLParagraphElement);
    expect(paragraph?.textContent).toBe('Container 2 paragraph');
  });

  it('should filter by visibility when visible=true', async () => {
    document.body.innerHTML = `
      <div class="visible-element" style="display: block;">Visible</div>
      <div class="hidden-element" style="display: none;">Hidden</div>
    `;

    // Should find visible element
    const visibleElement = querySelector('div', { visible: true });
    expect(visibleElement?.textContent).toBe('Visible');
    expect(visibleElement?.style.display).toBe('block');
  });

  it('should filter by visibility when visible=false', async () => {
    document.body.innerHTML = `
      <div class="visible-element" style="display: block;">Visible</div>
      <div class="hidden-element" style="display: none;">Hidden</div>
    `;

    // Should find hidden element
    const hiddenElement = querySelector('div', { visible: false });
    expect(hiddenElement?.textContent).toBe('Hidden');
    expect(hiddenElement?.style.display).toBe('none');
  });

  it('should work with viewport filtering when inViewport=true', async () => {
    // Create elements both in and out of viewport
    document.body.innerHTML = `
      <div id="in-viewport" style="position: absolute; top: 100px; left: 100px;">In viewport</div>
      <div id="out-viewport" style="position: absolute; top: 2000px; left: 100px;">Out of viewport</div>
    `;

    // Element should be in viewport at normal scroll position
    window.scrollTo(0, 0);

    // Allow time for viewport calculations
    await new Promise((resolve) => setTimeout(resolve, 100));

    const inViewportElement = querySelector('div', { inViewport: true });
    expect(inViewportElement?.id).toBe('in-viewport');
  });

  it('should work with viewport filtering when inViewport=false', async () => {
    // Create elements both in and out of viewport
    document.body.innerHTML = `
      <div id="in-viewport" style="position: absolute; top: 100px; left: 100px;">In viewport</div>
      <div id="out-viewport" style="position: absolute; top: 2000px; left: 100px;">Out of viewport</div>
    `;

    // Scroll to top to ensure first element is in viewport
    window.scrollTo(0, 0);

    // Allow time for viewport calculations
    await new Promise((resolve) => setTimeout(resolve, 100));

    const outViewportElement = querySelector('div', { inViewport: false });
    expect(outViewportElement?.id).toBe('out-viewport');
  });

  it('should handle combined visibility and viewport filters', async () => {
    document.body.innerHTML = `
      <div id="visible-in-viewport" style="position: absolute; top: 100px; left: 100px; display: block;">Visible in viewport</div>
      <div id="hidden-in-viewport" style="position: absolute; top: 200px; left: 100px; display: none;">Hidden in viewport</div>
      <div id="visible-out-viewport" style="position: absolute; top: 2000px; left: 100px; display: block;">Visible out viewport</div>
    `;

    window.scrollTo(0, 0);
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Find element that is both visible and in viewport
    const element = querySelector('div', { visible: true, inViewport: true });
    expect(element?.id).toBe('visible-in-viewport');
  });

  it('should work with form elements and complex DOM structures', async () => {
    document.body.innerHTML = `
      <form class="login-form">
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" name="email" class="form-control" />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" name="password" class="form-control" />
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    `;

    const emailInput = querySelector('input[type="email"]') as HTMLInputElement;
    const submitButton = querySelector(
      'form .btn.btn-primary',
    ) as HTMLButtonElement;

    expect(emailInput).toBeInstanceOf(HTMLInputElement);
    expect(emailInput?.type).toBe('email');
    expect(submitButton).toBeInstanceOf(HTMLButtonElement);
    expect(submitButton?.type).toBe('submit');
  });

  it('should handle dynamic content changes', async () => {
    document.body.innerHTML = `
      <div id="dynamic-container">
        <p class="original">Original content</p>
      </div>
    `;

    // Initial query
    let element = querySelector('.original');
    expect(element?.textContent).toBe('Original content');

    // Add new content dynamically
    const container = document.getElementById('dynamic-container');
    if (container) {
      container.innerHTML += '<p class="new-content">New content</p>';
    }

    // Query for new content
    const newElement = querySelector('.new-content');
    expect(newElement?.textContent).toBe('New content');
  });

  it('should maintain compatibility with legacy rootNode setting', async () => {
    document.body.innerHTML = `
      <div id="legacy-container">
        <span class="legacy-element">Legacy content</span>
      </div>
    `;

    const container = document.getElementById(
      'legacy-container',
    ) as HTMLElement;

    // Test legacy rootNode property (should be converted to $rootNode internally)
    const element = querySelector('.legacy-element', {
      // @ts-ignore - testing legacy compatibility
      rootNode: container,
    });

    expect(element?.textContent).toBe('Legacy content');
  });
});
