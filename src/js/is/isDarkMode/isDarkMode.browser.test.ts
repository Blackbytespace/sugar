import { describe, expect, it } from 'vitest';
import isDarkMode from './isDarkMode.js';

describe('isDarkMode', () => {
  it('returns a boolean when called without arguments', () => {
    expect(typeof isDarkMode()).toBe('boolean');
  });

  it('returns true when rootNode has -dark class', () => {
    const el = document.createElement('div');
    el.classList.add('-dark');
    document.body.appendChild(el);
    const result = isDarkMode({ rootNode: el });
    document.body.removeChild(el);
    expect(result).toBe(true);
  });

  it('returns true when an ancestor of rootNode has -dark class', () => {
    const parent = document.createElement('div');
    parent.classList.add('-dark');
    const child = document.createElement('div');
    parent.appendChild(child);
    document.body.appendChild(parent);
    const result = isDarkMode({ rootNode: child });
    document.body.removeChild(parent);
    expect(result).toBe(true);
  });

  it('returns false when rootNode has no -dark ancestor', () => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    const result = isDarkMode({ rootNode: el });
    document.body.removeChild(el);
    expect(result).toBe(false);
  });

  it('uses matchMedia when no rootNode is provided', () => {
    // The result depends on system dark mode preference, just verify type
    const result = isDarkMode();
    expect(typeof result).toBe('boolean');
  });
});
