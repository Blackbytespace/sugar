import { describe, expect, it } from 'vitest';
import whenAnimationEnd from './whenAnimationEnd.js';

describe('whenAnimationEnd', () => {
  it('returns a promise', () => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    const p = whenAnimationEnd(el);
    expect(p).toBeInstanceOf(Promise);
    // Clean up: dispatch event so promise resolves
    el.dispatchEvent(new AnimationEvent('animationend'));
    document.body.removeChild(el);
    return p;
  });

  it('resolves with the element when animationend fires', async () => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    const p = whenAnimationEnd(el);
    el.dispatchEvent(new AnimationEvent('animationend'));
    const result = await p;
    document.body.removeChild(el);
    expect(result).toBe(el);
  });

  it('only resolves once', async () => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    let count = 0;
    const p = whenAnimationEnd(el).then(() => count++);
    el.dispatchEvent(new AnimationEvent('animationend'));
    el.dispatchEvent(new AnimationEvent('animationend'));
    await p;
    document.body.removeChild(el);
    expect(count).toBe(1);
  });

  it('resolves with a real CSS animation', async () => {
    const style = document.createElement('style');
    style.textContent =
      '@keyframes testFade { from { opacity: 0; } to { opacity: 1; } } .anim-end-test { animation: testFade 0.01s linear; }';
    document.head.appendChild(style);
    const el = document.createElement('div');
    el.className = 'anim-end-test';
    document.body.appendChild(el);
    const result = await whenAnimationEnd(el);
    document.head.removeChild(style);
    document.body.removeChild(el);
    expect(result).toBe(el);
  }, 3000);
});
