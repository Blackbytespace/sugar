import { describe, expect, it } from 'vitest';
import whenStylesheetsReady from './whenStylesheetsReady.js';

describe('whenStylesheetsReady', () => {
  it('returns a promise', () => {
    const p = whenStylesheetsReady([]);
    expect(p).toBeInstanceOf(Promise);
    return p;
  });

  it('resolves with empty array for no stylesheets', async () => {
    const result = await whenStylesheetsReady([]);
    expect(result).toEqual([]);
  });

  it('resolves with link elements', async () => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'data:text/css,.wsr-test{color:red}';
    document.head.appendChild(link);
    const result = await whenStylesheetsReady([link]);
    document.head.removeChild(link);
    expect(result).toContain(link);
  });

  it('resolves all links', async () => {
    const link1 = document.createElement('link');
    link1.rel = 'stylesheet';
    link1.href = 'data:text/css,.wsr1{color:red}';
    const link2 = document.createElement('link');
    link2.rel = 'stylesheet';
    link2.href = 'data:text/css,.wsr2{color:blue}';
    document.head.appendChild(link1);
    document.head.appendChild(link2);
    const result = await whenStylesheetsReady([link1, link2]);
    document.head.removeChild(link1);
    document.head.removeChild(link2);
    expect(result.length).toBe(2);
  });

  it('auto-discovers page stylesheets when no argument passed', async () => {
    const result = await whenStylesheetsReady();
    expect(Array.isArray(result)).toBe(true);
  });
});
