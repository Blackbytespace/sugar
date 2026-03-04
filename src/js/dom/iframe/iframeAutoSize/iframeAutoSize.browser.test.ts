/**
 * @name            iframeAutoSize.browser.test.ts
 * @namespace       js.dom.iframe
 * @type            Test
 * @platform        js
 * @status          stable
 *
 * Browser e2e tests for iframeAutoSize
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import iframeAutoSize from './iframeAutoSize.js';

/** Creates an iframe with the given srcdoc, appends it to the body and waits for it to load. */
function createIframe(srcdoc: string): Promise<HTMLIFrameElement> {
  return new Promise((resolve) => {
    const $iframe = document.createElement('iframe');
    $iframe.style.border = 'none';
    $iframe.setAttribute('srcdoc', srcdoc);
    $iframe.addEventListener(
      'load',
      () => {
        resolve($iframe);
      },
      { once: true },
    );
    document.body.appendChild($iframe);
  });
}

describe('iframeAutoSize (browser)', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  describe('return value', () => {
    it('should return undefined', async () => {
      const $iframe = await createIframe('<p>hello</p>');
      expect(iframeAutoSize($iframe)).toBeUndefined();
    });

    it('should not throw', async () => {
      const $iframe = await createIframe('<p>hello</p>');
      expect(() => iframeAutoSize($iframe)).not.toThrow();
    });
  });

  describe('auto-resize on load', () => {
    it('should set iframe height based on content after load', async () => {
      // Create the iframe first, then attach iframeAutoSize before it loads
      const srcdoc =
        '<body style="margin:0;padding:0"><div style="height:300px;width:200px"></div></body>';

      await new Promise<void>((resolve) => {
        const $iframe = document.createElement('iframe');
        $iframe.style.border = 'none';
        $iframe.setAttribute('srcdoc', srcdoc);

        // Attach before appending so iframeAutoSize registers its load listener
        iframeAutoSize($iframe);

        $iframe.addEventListener(
          'load',
          () => {
            // Give MutationObserver / setTimeout a tick to settle
            setTimeout(() => {
              const h = parseFloat($iframe.style.height);
              expect(h).toBeGreaterThan(0);
              resolve();
            }, 50);
          },
          { once: true },
        );

        document.body.appendChild($iframe);
      });
    });

    it('should set iframe width based on content after load', async () => {
      const srcdoc =
        '<body style="margin:0;padding:0"><div style="width:400px;height:10px"></div></body>';

      await new Promise<void>((resolve) => {
        const $iframe = document.createElement('iframe');
        $iframe.style.border = 'none';
        $iframe.setAttribute('srcdoc', srcdoc);

        iframeAutoSize($iframe);

        $iframe.addEventListener(
          'load',
          () => {
            setTimeout(() => {
              const w = parseFloat($iframe.style.width);
              expect(w).toBeGreaterThan(0);
              resolve();
            }, 50);
          },
          { once: true },
        );

        document.body.appendChild($iframe);
      });
    });
  });

  describe('settings: width: false', () => {
    it('should NOT modify iframe style.width when width=false', async () => {
      const srcdoc =
        '<body style="margin:0;padding:0"><div style="width:500px;height:50px"></div></body>';

      await new Promise<void>((resolve) => {
        const $iframe = document.createElement('iframe');
        $iframe.style.border = 'none';
        $iframe.setAttribute('srcdoc', srcdoc);

        iframeAutoSize($iframe, { width: false });

        $iframe.addEventListener(
          'load',
          () => {
            setTimeout(() => {
              // width should not have been set by iframeAutoSize
              expect($iframe.style.width).toBe('');
              resolve();
            }, 50);
          },
          { once: true },
        );

        document.body.appendChild($iframe);
      });
    });

    it('should still resize height when width=false', async () => {
      const srcdoc =
        '<body style="margin:0;padding:0"><div style="height:200px"></div></body>';

      await new Promise<void>((resolve) => {
        const $iframe = document.createElement('iframe');
        $iframe.style.border = 'none';
        $iframe.setAttribute('srcdoc', srcdoc);

        iframeAutoSize($iframe, { width: false });

        $iframe.addEventListener(
          'load',
          () => {
            setTimeout(() => {
              const h = parseFloat($iframe.style.height);
              expect(h).toBeGreaterThan(0);
              resolve();
            }, 50);
          },
          { once: true },
        );

        document.body.appendChild($iframe);
      });
    });
  });

  describe('settings: height: false', () => {
    it('should NOT modify iframe style.height when height=false', async () => {
      const srcdoc =
        '<body style="margin:0;padding:0"><div style="height:300px;width:100px"></div></body>';

      await new Promise<void>((resolve) => {
        const $iframe = document.createElement('iframe');
        $iframe.style.border = 'none';
        $iframe.setAttribute('srcdoc', srcdoc);

        iframeAutoSize($iframe, { height: false });

        $iframe.addEventListener(
          'load',
          () => {
            setTimeout(() => {
              expect($iframe.style.height).toBe('');
              resolve();
            }, 50);
          },
          { once: true },
        );

        document.body.appendChild($iframe);
      });
    });

    it('should still resize width when height=false', async () => {
      const srcdoc =
        '<body style="margin:0;padding:0"><div style="width:350px;height:10px"></div></body>';

      await new Promise<void>((resolve) => {
        const $iframe = document.createElement('iframe');
        $iframe.style.border = 'none';
        $iframe.setAttribute('srcdoc', srcdoc);

        iframeAutoSize($iframe, { height: false });

        $iframe.addEventListener(
          'load',
          () => {
            setTimeout(() => {
              const w = parseFloat($iframe.style.width);
              expect(w).toBeGreaterThan(0);
              resolve();
            }, 50);
          },
          { once: true },
        );

        document.body.appendChild($iframe);
      });
    });
  });

  describe('re-resize on content mutation', () => {
    it('should update height after content is dynamically added', async () => {
      // Use an iframe with fixed dimensions so layout is stable
      const srcdoc =
        '<body style="margin:0;padding:0;"><div id="c" style="height:100px;width:300px;"></div></body>';

      await new Promise<void>((resolve, reject) => {
        const $iframe = document.createElement('iframe');
        $iframe.setAttribute('srcdoc', srcdoc);
        // Give the iframe an initial explicit size so layout is forced
        $iframe.style.width = '300px';
        $iframe.style.height = '100px';
        $iframe.style.border = 'none';
        $iframe.style.overflow = 'hidden';

        iframeAutoSize($iframe);

        $iframe.addEventListener(
          'load',
          () => {
            // Wait generously for the initial resize + layout to settle
            setTimeout(() => {
              const heightBefore = parseFloat($iframe.style.height);

              // Now add a tall element — MutationObserver should trigger _resize
              const doc = $iframe.contentWindow?.document;
              if (doc) {
                const $extra = doc.createElement('div');
                $extra.style.height = '600px';
                $extra.style.width = '300px';
                doc.body.appendChild($extra);
              }

              // Poll: height should grow above the original 100px content height
              let attempts = 0;
              const check = () => {
                const h = parseFloat($iframe.style.height);
                if (h > heightBefore + 50) {
                  resolve();
                } else if (++attempts > 30) {
                  reject(
                    new Error(
                      `iframe height did not grow after mutation (before=${heightBefore}px, got=${h}px)`,
                    ),
                  );
                } else {
                  setTimeout(check, 100);
                }
              };
              setTimeout(check, 100);
            }, 300);
          },
          { once: true },
        );

        document.body.appendChild($iframe);
      });
    }, 10000);
  });
});
