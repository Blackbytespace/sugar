import { describe, expect, it } from 'vitest';
import getTransitionProperties from './getTransitionProperties.js';

describe('getTransitionProperties', () => {
  it('returns object with transitions and totalDuration', () => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    const result = getTransitionProperties(el);
    document.body.removeChild(el);
    expect(result).toHaveProperty('transitions');
    expect(result).toHaveProperty('totalDuration');
    expect(Array.isArray(result.transitions)).toBe(true);
  });

  it('returns totalDuration 0 when no transition', () => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    const result = getTransitionProperties(el);
    document.body.removeChild(el);
    expect(result.totalDuration).toBe(0);
  });

  it('parses transition duration', () => {
    const style = document.createElement('style');
    style.textContent = '.trans-el { transition: opacity 0.3s linear; }';
    document.head.appendChild(style);
    const el = document.createElement('div');
    el.className = 'trans-el';
    document.body.appendChild(el);
    const result = getTransitionProperties(el);
    document.head.removeChild(style);
    document.body.removeChild(el);
    expect(result.transitions[0].duration).toBe(300);
  });

  it('parses transition property name', () => {
    const style = document.createElement('style');
    style.textContent = '.trans-prop { transition: opacity 0.5s; }';
    document.head.appendChild(style);
    const el = document.createElement('div');
    el.className = 'trans-prop';
    document.body.appendChild(el);
    const result = getTransitionProperties(el);
    document.head.removeChild(style);
    document.body.removeChild(el);
    expect(result.transitions[0].property).toBe('opacity');
  });

  it('calculates totalDuration with delay', () => {
    const style = document.createElement('style');
    style.textContent = '.trans-delay { transition: opacity 0.5s 0.1s ease; }';
    document.head.appendChild(style);
    const el = document.createElement('div');
    el.className = 'trans-delay';
    document.body.appendChild(el);
    const result = getTransitionProperties(el);
    document.head.removeChild(style);
    document.body.removeChild(el);
    // 500ms + 100ms = 600ms
    expect(result.totalDuration).toBe(600);
  });

  it('parses multiple transitions', () => {
    const style = document.createElement('style');
    style.textContent =
      '.trans-multi { transition: opacity 0.3s, color 0.5s; }';
    document.head.appendChild(style);
    const el = document.createElement('div');
    el.className = 'trans-multi';
    document.body.appendChild(el);
    const result = getTransitionProperties(el);
    document.head.removeChild(style);
    document.body.removeChild(el);
    expect(result.transitions.length).toBe(2);
  });
});
