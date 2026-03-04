import { describe, it, expect } from 'vitest';
import sleep from './sleep.js';

describe('sleep', () => {
  it('resolves after timeout', async () => {
    const start = Date.now();
    await sleep(100);
    const elapsed = Date.now() - start;
    expect(elapsed).toBeGreaterThanOrEqual(90);
  });

  it('handles zero timeout', async () => {
    const start = Date.now();
    await sleep(0);
    const elapsed = Date.now() - start;
    expect(elapsed).toBeLessThan(50);
  });

  it('handles default parameter', async () => {
    const start = Date.now();
    await sleep();
    const elapsed = Date.now() - start;
    expect(elapsed).toBeLessThan(50);
  });
});