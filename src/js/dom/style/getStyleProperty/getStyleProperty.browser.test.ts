import { describe, expect, it } from 'vitest';
import getStyleProperty from './getStyleProperty.js';

describe('getStyleProperty', () => {
  it('returns null for null element', () => {
    expect(getStyleProperty(null as any, 'color')).toBeUndefined();
  });

  it('returns color property', () => {
    const el = document.createElement('div');
    el.style.color = 'rgb(255, 0, 0)';
    document.body.appendChild(el);
    const val = getStyleProperty(el, 'color');
    document.body.removeChild(el);
    expect(val).toBeTruthy();
  });

  it('returns opacity property', () => {
    const el = document.createElement('div');
    el.style.opacity = '0.5';
    document.body.appendChild(el);
    const val = getStyleProperty(el, 'opacity');
    document.body.removeChild(el);
    expect(val).toBe(0.5);
  });

  it('returns null for unknown property', () => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    const val = getStyleProperty(el, 'non-existent-property-xyz');
    document.body.removeChild(el);
    expect(val).toBeNull();
  });

  it('reads computed style from stylesheet', () => {
    const style = document.createElement('style');
    style.textContent = '.test-gsp { font-size: 20px; }';
    document.head.appendChild(style);
    const el = document.createElement('div');
    el.className = 'test-gsp';
    document.body.appendChild(el);
    const val = getStyleProperty(el, 'font-size');
    document.head.removeChild(style);
    document.body.removeChild(el);
    expect(val).toBeTruthy();
  });

  it('returns display none when set', () => {
    const el = document.createElement('div');
    el.style.display = 'none';
    document.body.appendChild(el);
    const val = getStyleProperty(el, 'display');
    document.body.removeChild(el);
    expect(val).toBe('none');
  });
});
