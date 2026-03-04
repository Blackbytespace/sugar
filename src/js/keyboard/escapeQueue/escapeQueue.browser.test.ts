import { afterEach, describe, expect, it, vi } from 'vitest';
import escapeQueue, { escapeQueueLength } from './escapeQueue.js';

/** Fire a synthetic Escape keydown on the given target. */
function fireEscape(target: EventTarget = document) {
  target.dispatchEvent(
    new KeyboardEvent('keydown', {
      key: 'Escape',
      bubbles: true,
      cancelable: true,
    }),
  );
}

/** Wait one macrotask tick so setTimeout(0) callbacks run (e.g. _isEscaping reset). */
function tick(): Promise<void> {
  return new Promise((r) => setTimeout(r, 0));
}

// After each test, drain any remaining queue items so they don't leak into
// subsequent tests.  We fire enough Escapes to pop everything off.
afterEach(async () => {
  let safety = 20;
  while (escapeQueueLength() > 0 && safety-- > 0) {
    fireEscape();
    await tick();
  }
});

describe('escapeQueueLength', () => {
  it('returns 0 initially (or after cleanup)', () => {
    // The afterEach guarantees the queue is empty before each test runs.
    expect(escapeQueueLength()).toBe(0);
  });

  it('increments when an item is added', () => {
    const p = escapeQueue();
    expect(escapeQueueLength()).toBe(1);
    p.cancel();
  });

  it('decrements after cancel() — synchronously', () => {
    const p = escapeQueue();
    p.cancel(); // cancel() is now synchronous — no await needed
    expect(escapeQueueLength()).toBe(0);
  });
});

describe('escapeQueue', () => {
  it('resolves the promise when Escape is pressed', async () => {
    let resolved = false;
    escapeQueue().then(() => {
      resolved = true;
    });
    fireEscape();
    await tick();
    expect(resolved).toBe(true);
  });

  it('calls the callback when Escape is pressed', async () => {
    const cb = vi.fn();
    escapeQueue(cb);
    fireEscape();
    await tick();
    expect(cb).toHaveBeenCalledTimes(1);
  });

  it('processes queue LIFO — last registered fires first', async () => {
    const order: number[] = [];
    escapeQueue(() => order.push(1));
    escapeQueue(() => order.push(2));

    // First Escape pops the last item (2)
    fireEscape();
    await tick();
    expect(order).toEqual([2]);

    // Second Escape pops item 1
    fireEscape();
    await tick();
    expect(order).toEqual([2, 1]);
  });

  it('does not fire after cancel() — cancel is synchronous', async () => {
    const cb = vi.fn();
    const p = escapeQueue(cb);
    p.cancel(); // synchronous — no tick needed
    fireEscape();
    await tick();
    expect(cb).not.toHaveBeenCalled();
  });

  it('cancel() removes item from the queue length synchronously', () => {
    escapeQueue(); // item 1
    const p = escapeQueue(); // item 2
    expect(escapeQueueLength()).toBe(2);
    p.cancel(); // synchronous
    expect(escapeQueueLength()).toBe(1);
    // afterEach cleans up item 1
  });

  it('deduplicates by id — re-registering same id replaces the item', async () => {
    const cb1 = vi.fn();
    const cb2 = vi.fn();
    escapeQueue(cb1, { id: 'my-modal' });
    // Register again with same id — should replace cb1 with cb2
    escapeQueue(cb2, { id: 'my-modal' });

    // Queue length should still be 1 (deduplicated)
    expect(escapeQueueLength()).toBe(1);

    fireEscape();
    await tick();
    expect(cb1).not.toHaveBeenCalled();
    expect(cb2).toHaveBeenCalledTimes(1);
  });

  it('works without a callback (resolve-only mode)', async () => {
    let resolved = false;
    escapeQueue().then(() => {
      resolved = true;
    });
    fireEscape();
    await tick();
    expect(resolved).toBe(true);
  });

  it('does not fire for a non-Escape key', async () => {
    const cb = vi.fn();
    escapeQueue(cb);
    document.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'a', bubbles: true }),
    );
    await tick();
    expect(cb).not.toHaveBeenCalled();
    // Clean up via afterEach
  });

  it('returns a thenable (Promise-like) object', () => {
    const result = escapeQueue();
    expect(typeof result.then).toBe('function');
    // Clean up via afterEach
  });
});
