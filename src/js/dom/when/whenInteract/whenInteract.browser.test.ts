import { describe, expect, it } from 'vitest';
import whenInteract from './whenInteract.js';

describe('whenInteract', () => {
  it('returns a promise', () => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    const p = whenInteract(el);
    expect(p).toBeInstanceOf(Promise);
    el.dispatchEvent(new PointerEvent('pointerover'));
    document.body.removeChild(el);
    return p;
  });

  it('resolves on pointerover', async () => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    const p = whenInteract(el);
    el.dispatchEvent(new PointerEvent('pointerover'));
    const result = await p;
    document.body.removeChild(el);
    expect(result).toBe('pointerover');
  });

  it('resolves on pointerdown', async () => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    const p = whenInteract(el);
    el.dispatchEvent(new PointerEvent('pointerdown'));
    const result = await p;
    document.body.removeChild(el);
    expect(result).toBe('pointerdown');
  });

  it('resolves on focus', async () => {
    const el = document.createElement('button');
    document.body.appendChild(el);
    const p = whenInteract(el);
    el.dispatchEvent(new FocusEvent('focus'));
    const result = await p;
    document.body.removeChild(el);
    expect(result).toBe('focus');
  });

  it('respects settings to disable specific events', async () => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    // Only listen for pointerdown
    const p = whenInteract(el, {
      pointerover: false,
      pointerout: false,
      pointerdown: true,
      touchstart: false,
      touchend: false,
      focus: false,
    });
    // pointerover should not resolve it
    el.dispatchEvent(new PointerEvent('pointerover'));
    let resolved = false;
    p.then(() => {
      resolved = true;
    });
    await new Promise((r) => setTimeout(r, 20));
    expect(resolved).toBe(false);
    el.dispatchEvent(new PointerEvent('pointerdown'));
    await p;
    document.body.removeChild(el);
    expect(resolved).toBe(true);
  });
});
