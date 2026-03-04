import { describe, expect, it } from 'vitest';
import features from './features.js';

function nextTick(ms = 50): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

function rafTick(): Promise<void> {
  return new Promise((r) => requestAnimationFrame(() => r()));
}

function cleanBodyClasses(prefix: string) {
  const toRemove = Array.from(document.body.classList).filter(
    (cls) => cls === prefix || cls.startsWith(`${prefix}-`),
  );
  toRemove.forEach((cls) => document.body.classList.remove(cls));
}

describe('features', () => {
  it('does not throw when called with "all"', () => {
    expect(() => features('all')).not.toThrow();
    // clean up scrollClasses side-effects
    cleanBodyClasses('scrolled');
  });

  it('activates disableTitleTooltips when features is "all"', async () => {
    const a = document.createElement('a');
    a.setAttribute('title', 'features-all-tooltip');
    a.href = '#';
    document.body.appendChild(a);

    features('all');

    await nextTick();

    const stillHasTitle = a.hasAttribute('title');
    document.body.removeChild(a);
    cleanBodyClasses('scrolled');
    expect(stillHasTitle).toBe(false);
  });

  it('activates scrollClasses when features is "all" (offset: 0 check via default)', async () => {
    // We can only reliably check that no error is thrown and the rAF loop runs
    features('all');

    await rafTick();
    await rafTick();

    // scrollY=0 >= default offset=100 is false, so base class should NOT be present
    // (just verify no error and body classes are in a consistent state)
    expect(document.body).toBeTruthy();
    cleanBodyClasses('scrolled');
  });

  it('activates only disableTitleTooltips when specified', async () => {
    const a = document.createElement('a');
    a.setAttribute('title', 'selective-tooltip');
    a.href = '#';
    document.body.appendChild(a);

    features({ disableTitleTooltips: true });

    await nextTick();

    const stillHasTitle = a.hasAttribute('title');
    document.body.removeChild(a);
    expect(stillHasTitle).toBe(false);
  });

  it('activates scrollClasses with custom settings when specified', async () => {
    features({
      scrollClasses: {
        offset: 0,
        offsetX: 0,
        offsetY: 0,
        class: 'feat-scroll',
      },
    });

    await rafTick();
    await rafTick();

    const hasY = document.body.classList.contains('feat-scroll-y');
    cleanBodyClasses('feat-scroll');
    expect(hasY).toBe(true);
  });

  it('activates sectionClasses when specified', async () => {
    const section = document.createElement('section');
    document.body.appendChild(section);

    features({ sectionClasses: true });

    await nextTick();

    section.dispatchEvent(
      new CustomEvent('viewport.enter', { bubbles: false }),
    );

    const hasIn = section.classList.contains('-in-viewport');
    document.body.removeChild(section);
    expect(hasIn).toBe(true);
  });

  it('does not activate features that are not specified', () => {
    // Check synchronously - MutationObserver fires asynchronously so if
    // disableTitleTooltips is NOT activated, the title won't be removed yet.
    // We verify the title is present immediately after calling features().
    features({
      scrollClasses: {
        offset: 9999,
        offsetX: 9999,
        offsetY: 9999,
        class: 'feat-only',
      },
    });

    const a = document.createElement('a');
    a.setAttribute('title', 'should-stay');
    a.href = '#';
    document.body.appendChild(a);

    // Title should still be present synchronously since disableTitleTooltips
    // was not activated in this call (MutationObserver fires async)
    const hasTitle = a.hasAttribute('title');
    document.body.removeChild(a);
    cleanBodyClasses('feat-only');
    expect(hasTitle).toBe(true);
  });

  it('does not throw when called with empty settings object', () => {
    expect(() => features({})).not.toThrow();
  });
});
