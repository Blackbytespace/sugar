import { describe, expect, it } from 'vitest';
import whenEventListener from './whenEventListener.js';

describe('whenEventListener', () => {
  it('returns a promise', () => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    const p = whenEventListener('click', el);
    expect(p).toBeInstanceOf(Promise);
    el.click();
    document.body.removeChild(el);
    return p;
  });

  it('resolves with the event object on click', async () => {
    const el = document.createElement('button');
    document.body.appendChild(el);
    const p = whenEventListener('click', el);
    el.click();
    const e = await p;
    document.body.removeChild(el);
    expect(e).toBeInstanceOf(Event);
  });

  it('resolves on custom event', async () => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    const p = whenEventListener('my-custom-event', el);
    el.dispatchEvent(new CustomEvent('my-custom-event'));
    const e = await p;
    document.body.removeChild(el);
    expect(e).toBeInstanceOf(Event);
  });

  it('only resolves once (once: true behavior)', async () => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    let count = 0;
    const p = whenEventListener('click', el).then(() => count++);
    el.click();
    el.click();
    await p;
    document.body.removeChild(el);
    expect(count).toBe(1);
  });
});
