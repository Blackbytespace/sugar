import { describe, expect, it } from 'vitest';
import getAnimationProperties from './getAnimationProperties.js';

describe('getAnimationProperties', () => {
  it('returns object with totalDuration and animations array', () => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    const result = getAnimationProperties(el);
    document.body.removeChild(el);
    expect(result).toHaveProperty('totalDuration');
    expect(result).toHaveProperty('animations');
    expect(Array.isArray(result.animations)).toBe(true);
  });

  it('returns totalDuration 0 when no animation set', () => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    const result = getAnimationProperties(el);
    document.body.removeChild(el);
    expect(result.totalDuration).toBe(0);
  });

  it('parses animation duration correctly', () => {
    const style = document.createElement('style');
    style.textContent =
      '@keyframes testAnim { from { opacity: 0; } to { opacity: 1; } } .anim-el { animation: testAnim 0.5s linear; }';
    document.head.appendChild(style);
    const el = document.createElement('div');
    el.className = 'anim-el';
    document.body.appendChild(el);
    const result = getAnimationProperties(el);
    document.head.removeChild(style);
    document.body.removeChild(el);
    expect(result.animations.length).toBeGreaterThan(0);
    expect(result.animations[0].duration).toBe(500);
  });

  it('parses animation name correctly', () => {
    const style = document.createElement('style');
    style.textContent =
      '@keyframes myFade { from { opacity: 0; } to { opacity: 1; } } .anim-name-el { animation: myFade 1s; }';
    document.head.appendChild(style);
    const el = document.createElement('div');
    el.className = 'anim-name-el';
    document.body.appendChild(el);
    const result = getAnimationProperties(el);
    document.head.removeChild(style);
    document.body.removeChild(el);
    expect(result.animations[0].name).toBe('myFade');
  });

  it('calculates totalDuration for single animation', () => {
    const style = document.createElement('style');
    style.textContent =
      '@keyframes dur1 { from { opacity: 0; } to { opacity: 1; } } .anim-dur1 { animation: dur1 1s 0.2s linear; }';
    document.head.appendChild(style);
    const el = document.createElement('div');
    el.className = 'anim-dur1';
    document.body.appendChild(el);
    const result = getAnimationProperties(el);
    document.head.removeChild(style);
    document.body.removeChild(el);
    // duration 1000ms + delay 200ms = 1200ms
    expect(result.totalDuration).toBe(1200);
  });

  it('parses timing function', () => {
    const style = document.createElement('style');
    style.textContent =
      '@keyframes timingAnim { from { opacity: 0; } to { opacity: 1; } } .anim-timing { animation: timingAnim 1s ease-in-out; }';
    document.head.appendChild(style);
    const el = document.createElement('div');
    el.className = 'anim-timing';
    document.body.appendChild(el);
    const result = getAnimationProperties(el);
    document.head.removeChild(style);
    document.body.removeChild(el);
    expect(result.animations[0].timingFunction).toBe('ease-in-out');
  });
});
