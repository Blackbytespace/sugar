import { describe, expect, it } from 'vitest';
import disableTitleTooltips from './disableTitleTooltips.js';

describe('disableTitleTooltips', () => {
  it('removes title attribute from existing anchor elements', async () => {
    const a = document.createElement('a');
    a.setAttribute('title', 'my tooltip');
    a.href = '#';
    document.body.appendChild(a);

    disableTitleTooltips();

    // querySelectorLive uses MutationObserver + synchronous first scan
    // give it a microtask tick to process existing nodes
    await new Promise((r) => setTimeout(r, 50));

    const stillHasTitle = a.hasAttribute('title');
    document.body.removeChild(a);
    expect(stillHasTitle).toBe(false);
  });

  it('removes title attribute from existing img elements', async () => {
    const img = document.createElement('img');
    img.setAttribute('title', 'image tooltip');
    img.src = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';
    document.body.appendChild(img);

    disableTitleTooltips();

    await new Promise((r) => setTimeout(r, 50));

    const stillHasTitle = img.hasAttribute('title');
    document.body.removeChild(img);
    expect(stillHasTitle).toBe(false);
  });

  it('removes title attribute from anchor elements added after init', async () => {
    disableTitleTooltips();

    // insert element after the observer is set up
    await new Promise((r) => setTimeout(r, 20));

    const a = document.createElement('a');
    a.setAttribute('title', 'late tooltip');
    a.href = '#';
    document.body.appendChild(a);

    // allow MutationObserver to fire
    await new Promise((r) => setTimeout(r, 50));

    const stillHasTitle = a.hasAttribute('title');
    document.body.removeChild(a);
    expect(stillHasTitle).toBe(false);
  });

  it('does not remove title from non-anchor/img elements', async () => {
    const div = document.createElement('div');
    div.setAttribute('title', 'div tooltip');
    document.body.appendChild(div);

    disableTitleTooltips();

    await new Promise((r) => setTimeout(r, 50));

    const stillHasTitle = div.hasAttribute('title');
    document.body.removeChild(div);
    expect(stillHasTitle).toBe(true);
  });

  it('does not throw when no matching elements exist', () => {
    expect(() => disableTitleTooltips()).not.toThrow();
  });
});
