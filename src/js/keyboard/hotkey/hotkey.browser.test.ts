import { describe, expect, it, vi } from 'vitest';
import hotkey from './hotkey.js';

/** Fire a synthetic keydown event on the given target. */
function fireKey(
  target: EventTarget,
  key: string,
  opts: {
    ctrlKey?: boolean;
    shiftKey?: boolean;
    altKey?: boolean;
    metaKey?: boolean;
  } = {},
) {
  target.dispatchEvent(
    new KeyboardEvent('keydown', {
      key,
      bubbles: true,
      cancelable: true,
      ...opts,
    }),
  );
}

describe('hotkey', () => {
  it('calls callback when the registered key is pressed', () => {
    const cb = vi.fn();
    const api = hotkey('a', cb, { ctx: document.body });
    fireKey(document.body, 'a');
    api.cancel();
    expect(cb).toHaveBeenCalledTimes(1);
  });

  it('does not call callback for a different key', () => {
    const cb = vi.fn();
    const api = hotkey('a', cb, { ctx: document.body });
    fireKey(document.body, 'b');
    api.cancel();
    expect(cb).not.toHaveBeenCalled();
  });

  it('cancel() stops the hotkey from firing', () => {
    const cb = vi.fn();
    const api = hotkey('a', cb, { ctx: document.body });
    api.cancel();
    fireKey(document.body, 'a');
    expect(cb).not.toHaveBeenCalled();
  });

  it('handles ctrl+a combination', () => {
    const cb = vi.fn();
    const api = hotkey('ctrl+a', cb, { ctx: document.body });
    fireKey(document.body, 'a', { ctrlKey: true });
    api.cancel();
    expect(cb).toHaveBeenCalledTimes(1);
  });

  it('does not fire ctrl+a when ctrl is not pressed', () => {
    const cb = vi.fn();
    const api = hotkey('ctrl+a', cb, { ctx: document.body });
    fireKey(document.body, 'a');
    api.cancel();
    expect(cb).not.toHaveBeenCalled();
  });

  it('does not fire ctrl+a when an extra unregistered modifier is pressed', () => {
    const cb = vi.fn();
    const api = hotkey('ctrl+a', cb, { ctx: document.body });
    fireKey(document.body, 'a', { ctrlKey: true, shiftKey: true });
    api.cancel();
    expect(cb).not.toHaveBeenCalled();
  });

  it('handles shift+ctrl+a combination', () => {
    const cb = vi.fn();
    const api = hotkey('shift+ctrl+a', cb, { ctx: document.body });
    fireKey(document.body, 'a', { ctrlKey: true, shiftKey: true });
    api.cancel();
    expect(cb).toHaveBeenCalledTimes(1);
  });

  it('handles Escape key (esc alias)', () => {
    const cb = vi.fn();
    const api = hotkey('esc', cb, { ctx: document.body });
    fireKey(document.body, 'Escape');
    api.cancel();
    expect(cb).toHaveBeenCalledTimes(1);
  });

  it('handles Escape key (escape alias)', () => {
    const cb = vi.fn();
    const api = hotkey('escape', cb, { ctx: document.body });
    fireKey(document.body, 'Escape');
    api.cancel();
    expect(cb).toHaveBeenCalledTimes(1);
  });

  it('handles cmd alias as meta key', () => {
    const cb = vi.fn();
    const api = hotkey('cmd+a', cb, { ctx: document.body });
    fireKey(document.body, 'a', { metaKey: true });
    api.cancel();
    expect(cb).toHaveBeenCalledTimes(1);
  });

  it('handles command alias as meta key', () => {
    const cb = vi.fn();
    const api = hotkey('command+a', cb, { ctx: document.body });
    fireKey(document.body, 'a', { metaKey: true });
    api.cancel();
    expect(cb).toHaveBeenCalledTimes(1);
  });

  it('accepts an array of keys and fires for each', () => {
    const cb = vi.fn();
    const api = hotkey(['a', 'b'], cb, { ctx: document.body });
    fireKey(document.body, 'a');
    fireKey(document.body, 'b');
    api.cancel();
    expect(cb).toHaveBeenCalledTimes(2);
  });

  it('cancel() on array hotkey stops all keys', () => {
    const cb = vi.fn();
    const api = hotkey(['a', 'b'], cb, { ctx: document.body });
    api.cancel();
    fireKey(document.body, 'a');
    fireKey(document.body, 'b');
    expect(cb).not.toHaveBeenCalled();
  });

  it('does not fire when active element is an INPUT (no modifier)', () => {
    const input = document.createElement('input');
    document.body.appendChild(input);
    input.focus();
    const cb = vi.fn();
    const api = hotkey('a', cb, { ctx: document.body });
    fireKey(document.body, 'a');
    api.cancel();
    document.body.removeChild(input);
    expect(cb).not.toHaveBeenCalled();
  });

  it('fires when active element is an INPUT but ctrl modifier is used', () => {
    const input = document.createElement('input');
    document.body.appendChild(input);
    input.focus();
    const cb = vi.fn();
    const api = hotkey('ctrl+a', cb, { ctx: document.body });
    fireKey(document.body, 'a', { ctrlKey: true });
    api.cancel();
    document.body.removeChild(input);
    expect(cb).toHaveBeenCalledTimes(1);
  });

  it('fires Escape when active element is an INPUT', () => {
    const input = document.createElement('input');
    document.body.appendChild(input);
    input.focus();
    const cb = vi.fn();
    const api = hotkey('esc', cb, { ctx: document.body });
    fireKey(document.body, 'Escape');
    api.cancel();
    document.body.removeChild(input);
    expect(cb).toHaveBeenCalledTimes(1);
  });

  it('does not fire when active element is a TEXTAREA (no modifier)', () => {
    const ta = document.createElement('textarea');
    document.body.appendChild(ta);
    ta.focus();
    const cb = vi.fn();
    const api = hotkey('a', cb, { ctx: document.body });
    fireKey(document.body, 'a');
    api.cancel();
    document.body.removeChild(ta);
    expect(cb).not.toHaveBeenCalled();
  });

  it('does not fire when active element has contenteditable (no modifier)', () => {
    const div = document.createElement('div');
    div.setAttribute('contenteditable', 'true');
    document.body.appendChild(div);
    div.focus();
    const cb = vi.fn();
    const api = hotkey('a', cb, { ctx: document.body });
    fireKey(document.body, 'a');
    api.cancel();
    document.body.removeChild(div);
    expect(cb).not.toHaveBeenCalled();
  });

  it('uses a custom ctx element', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const cb = vi.fn();
    const api = hotkey('a', cb, { ctx: div });
    fireKey(div, 'a');
    api.cancel();
    document.body.removeChild(div);
    expect(cb).toHaveBeenCalledTimes(1);
  });

  it('does not fire on a different ctx', () => {
    const div = document.createElement('div');
    const other = document.createElement('div');
    document.body.appendChild(div);
    document.body.appendChild(other);
    const cb = vi.fn();
    const api = hotkey('a', cb, { ctx: div });
    fireKey(other, 'a');
    api.cancel();
    document.body.removeChild(div);
    document.body.removeChild(other);
    expect(cb).not.toHaveBeenCalled();
  });

  it('calls callback with the KeyboardEvent as argument', () => {
    const cb = vi.fn();
    const api = hotkey('a', cb, { ctx: document.body });
    fireKey(document.body, 'a');
    api.cancel();
    expect(cb).toHaveBeenCalledWith(expect.any(KeyboardEvent));
  });

  it('returns an api object with a cancel function', () => {
    const cb = vi.fn();
    const api = hotkey('a', cb, { ctx: document.body });
    expect(typeof api.cancel).toBe('function');
    api.cancel();
  });

  it('preventDefault is called by default', () => {
    let prevented = false;
    const div = document.createElement('div');
    document.body.appendChild(div);
    const api = hotkey('a', () => {}, { ctx: div, preventDefault: true });
    const event = new KeyboardEvent('keydown', {
      key: 'a',
      bubbles: true,
      cancelable: true,
    });
    Object.defineProperty(event, 'preventDefault', {
      value: () => {
        prevented = true;
      },
    });
    div.dispatchEvent(event);
    api.cancel();
    document.body.removeChild(div);
    expect(prevented).toBe(true);
  });

  it('does not preventDefault when disabled', () => {
    let prevented = false;
    const div = document.createElement('div');
    document.body.appendChild(div);
    const api = hotkey('a', () => {}, { ctx: div, preventDefault: false });
    const event = new KeyboardEvent('keydown', {
      key: 'a',
      bubbles: true,
      cancelable: true,
    });
    Object.defineProperty(event, 'preventDefault', {
      value: () => {
        prevented = true;
      },
    });
    div.dispatchEvent(event);
    api.cancel();
    document.body.removeChild(div);
    expect(prevented).toBe(false);
  });
});
