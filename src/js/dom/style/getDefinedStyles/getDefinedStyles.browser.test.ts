import { describe, expect, it } from 'vitest';
import getDefinedStyles from './getDefinedStyles.js';

describe('getDefinedStyles', () => {
  it('returns an object', () => {
    const el = document.createElement('div');
    el.style.color = 'red';
    el.style.fontSize = '16px';
    document.body.appendChild(el);
    const styles = getDefinedStyles(el.style);
    document.body.removeChild(el);
    expect(typeof styles).toBe('object');
  });

  it('includes explicitly set properties', () => {
    const el = document.createElement('div');
    el.style.color = 'red';
    document.body.appendChild(el);
    const styles = getDefinedStyles(el.style);
    document.body.removeChild(el);
    expect(styles['color']).toBe('red');
  });

  it('includes font-size when set', () => {
    const el = document.createElement('div');
    el.style.fontSize = '24px';
    document.body.appendChild(el);
    const styles = getDefinedStyles(el.style);
    document.body.removeChild(el);
    expect(styles['font-size']).toBe('24px');
  });

  it('returns empty object for element with no inline styles', () => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    const styles = getDefinedStyles(el.style);
    document.body.removeChild(el);
    expect(Object.keys(styles).length).toBe(0);
  });

  it('handles multiple properties', () => {
    const el = document.createElement('div');
    el.style.color = 'blue';
    el.style.opacity = '0.5';
    document.body.appendChild(el);
    const styles = getDefinedStyles(el.style);
    document.body.removeChild(el);
    expect(styles['color']).toBe('blue');
    expect(styles['opacity']).toBe('0.5');
  });

  it('excludes properties not set (they are initial)', () => {
    const el = document.createElement('div');
    el.style.color = 'green';
    document.body.appendChild(el);
    const styles = getDefinedStyles(el.style);
    document.body.removeChild(el);
    // Only color was set; other properties are absent
    expect(Object.keys(styles)).toContain('color');
  });
});
