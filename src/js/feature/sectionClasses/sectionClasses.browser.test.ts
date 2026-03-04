import { describe, expect, it } from 'vitest';
import sectionClasses from './sectionClasses.js';

// Helper: dispatch a custom event on an element
function dispatch(el: Element, eventName: string) {
  el.dispatchEvent(new CustomEvent(eventName, { bubbles: false }));
}

// Helper: wait for MutationObserver / querySelectorLive to process a new node
function nextTick(ms = 50): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

describe('sectionClasses', () => {
  // This test must run FIRST before any other sectionClasses() calls pollute
  // the document-level querySelectorLive observers with keepInClassWhenAbove: false.
  it('keeps -in-viewport on viewport.leave.above when keepInClassWhenAbove is true', async () => {
    const section = document.createElement('section');
    section.classList.add('-in-viewport');
    document.body.appendChild(section);

    sectionClasses({ keepInClassWhenAbove: true });
    await nextTick();

    dispatch(section, 'viewport.leave.above');

    expect(section.classList.contains('-in-viewport')).toBe(true);
    expect(section.classList.contains('-above-viewport')).toBe(true);

    document.body.removeChild(section);
  });

  it('adds -in-viewport class on viewport.enter event', async () => {
    const section = document.createElement('section');
    document.body.appendChild(section);

    sectionClasses();

    // Allow querySelectorLive to detect the section
    await nextTick();

    dispatch(section, 'viewport.enter');

    expect(section.classList.contains('-in-viewport')).toBe(true);

    document.body.removeChild(section);
  });

  it('removes above/below classes when entering viewport', async () => {
    const section = document.createElement('section');
    section.classList.add('-above-viewport');
    section.classList.add('-below-viewport');
    document.body.appendChild(section);

    sectionClasses();
    await nextTick();

    dispatch(section, 'viewport.enter');

    expect(section.classList.contains('-above-viewport')).toBe(false);
    expect(section.classList.contains('-below-viewport')).toBe(false);

    document.body.removeChild(section);
  });

  it('adds -from-below class on viewport.enter.below event', async () => {
    const section = document.createElement('section');
    document.body.appendChild(section);

    sectionClasses();
    await nextTick();

    dispatch(section, 'viewport.enter.below');

    expect(section.classList.contains('-from-below')).toBe(true);

    document.body.removeChild(section);
  });

  it('adds -from-above class on viewport.enter.above event', async () => {
    const section = document.createElement('section');
    document.body.appendChild(section);

    sectionClasses();
    await nextTick();

    dispatch(section, 'viewport.enter.above');

    expect(section.classList.contains('-from-above')).toBe(true);

    document.body.removeChild(section);
  });

  it('removes from-above and from-below on viewport.leave', async () => {
    const section = document.createElement('section');
    section.classList.add('-from-above');
    section.classList.add('-from-below');
    document.body.appendChild(section);

    sectionClasses();
    await nextTick();

    dispatch(section, 'viewport.leave');

    expect(section.classList.contains('-from-above')).toBe(false);
    expect(section.classList.contains('-from-below')).toBe(false);

    document.body.removeChild(section);
  });

  it('adds -above-viewport and removes -in-viewport on viewport.leave.above', async () => {
    const section = document.createElement('section');
    section.classList.add('-in-viewport');
    document.body.appendChild(section);

    sectionClasses();
    await nextTick();

    dispatch(section, 'viewport.leave.above');

    expect(section.classList.contains('-above-viewport')).toBe(true);
    expect(section.classList.contains('-in-viewport')).toBe(false);

    document.body.removeChild(section);
  });

  it('adds -below-viewport and removes -in-viewport on viewport.leave.below', async () => {
    const section = document.createElement('section');
    section.classList.add('-in-viewport');
    document.body.appendChild(section);

    sectionClasses();
    await nextTick();

    dispatch(section, 'viewport.leave.below');

    expect(section.classList.contains('-below-viewport')).toBe(true);
    expect(section.classList.contains('-in-viewport')).toBe(false);

    document.body.removeChild(section);
  });

  it('respects custom class names via settings', async () => {
    const section = document.createElement('section');
    document.body.appendChild(section);

    sectionClasses({
      inClass: 'is-visible',
      aboveClass: 'is-above',
      belowClass: 'is-below',
      fromAboveClass: 'came-from-above',
      fromBelowClass: 'came-from-below',
    });
    await nextTick();

    dispatch(section, 'viewport.enter');
    expect(section.classList.contains('is-visible')).toBe(true);

    dispatch(section, 'viewport.enter.above');
    expect(section.classList.contains('came-from-above')).toBe(true);

    dispatch(section, 'viewport.leave.below');
    expect(section.classList.contains('is-below')).toBe(true);

    document.body.removeChild(section);
  });

  it('does not throw when no sections exist', () => {
    expect(() => sectionClasses()).not.toThrow();
  });
});
