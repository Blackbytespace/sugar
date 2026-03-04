import { describe, expect, it } from 'vitest';
import scrollClasses from './scrollClasses.js';

// Helper: wait for at least one rAF cycle
function rafTick(): Promise<void> {
  return new Promise((r) => requestAnimationFrame(() => r()));
}

// Helper: clean classes matching a prefix from body
function cleanBodyClasses(prefix: string) {
  const toRemove = Array.from(document.body.classList).filter(
    (cls) => cls === prefix || cls.startsWith(`${prefix}-`),
  );
  toRemove.forEach((cls) => document.body.classList.remove(cls));
}

describe('scrollClasses', () => {
  it('adds scrolled-y class when scrollY >= offsetY (offset: 0)', async () => {
    // With offset: 0, scrollY (which is 0) >= 0, so scrolled-y should be added
    scrollClasses({ offset: 0, offsetX: 0, offsetY: 0, class: 'sc-test1' });

    await rafTick();
    await rafTick();

    const hasY = document.body.classList.contains('sc-test1-y');
    cleanBodyClasses('sc-test1');
    expect(hasY).toBe(true);
  });

  it('adds base scrolled class when any axis threshold is met (offset: 0)', async () => {
    scrollClasses({ offset: 0, offsetX: 0, offsetY: 0, class: 'sc-test2' });

    await rafTick();
    await rafTick();

    const hasBase = document.body.classList.contains('sc-test2');
    cleanBodyClasses('sc-test2');
    expect(hasBase).toBe(true);
  });

  it('does not add scrolled class when offset is above current scroll position', async () => {
    // scrollY is 0, offset is 9999 — should NOT add class
    scrollClasses({
      offset: 9999,
      offsetX: 9999,
      offsetY: 9999,
      class: 'sc-test3',
    });

    await rafTick();
    await rafTick();

    const hasBase = document.body.classList.contains('sc-test3');
    cleanBodyClasses('sc-test3');
    expect(hasBase).toBe(false);
  });

  it('uses custom class prefix', async () => {
    scrollClasses({ offset: 0, offsetX: 0, offsetY: 0, class: 'my-scroll' });

    await rafTick();
    await rafTick();

    const hasY = document.body.classList.contains('my-scroll-y');
    const hasBase = document.body.classList.contains('my-scroll');
    cleanBodyClasses('my-scroll');
    expect(hasY).toBe(true);
    expect(hasBase).toBe(true);
  });

  it('does not add scrolled-up or scrolled-down on initial tick (no scroll delta)', async () => {
    scrollClasses({ offset: 0, offsetX: 0, offsetY: 0, class: 'sc-test4' });

    await rafTick();
    await rafTick();

    const hasUp = document.body.classList.contains('sc-test4-up');
    const hasDown = document.body.classList.contains('sc-test4-down');
    cleanBodyClasses('sc-test4');
    // On first tick currentY === scrollY so neither direction class is added
    expect(hasUp).toBe(false);
    expect(hasDown).toBe(false);
  });

  it('does not throw when called with no arguments', async () => {
    expect(() => scrollClasses()).not.toThrow();
    // clean up default class
    await rafTick();
    cleanBodyClasses('scrolled');
  });
});
