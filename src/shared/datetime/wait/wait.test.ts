import wait from './wait';

describe('wait', () => {
  it('should resolve after specified timeout', async () => {
    const start = Date.now();
    await wait(100);
    const elapsed = Date.now() - start;
    expect(elapsed).toBeGreaterThanOrEqual(90); // Allow some tolerance
  });

  it('should resolve immediately with 0 timeout', async () => {
    const start = Date.now();
    await wait(0);
    const elapsed = Date.now() - start;
    expect(elapsed).toBeLessThan(50);
  });

  it('should use default timeout of 0', async () => {
    const start = Date.now();
    await wait();
    const elapsed = Date.now() - start;
    expect(elapsed).toBeLessThan(50);
  });

  it('should return a promise', () => {
    const result = wait(100);
    expect(result).toBeInstanceOf(Promise);
  });
});