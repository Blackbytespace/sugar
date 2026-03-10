import { stega } from '@blackbyte/sugar/crypto';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import queryStegaElementsLive from './queryStegaElementsLive.js';

// Helper: create a text node carrying a stega payload mixed with visible text
function stegaText(visible: string, payload: any): string {
  return visible + stega.encrypt(payload);
}

// Helper: create a pure stega attribute value
function stegaAttr(payload: any): string {
  return stega.encrypt(payload);
}

describe('queryStegaElementsLive', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  // ─── API shape ─────────────────────────────────────────────────────────────

  describe('return value', () => {
    it('returns an object with a cancel function', () => {
      const api = queryStegaElementsLive(() => {});
      expect(typeof api).toBe('object');
      expect(typeof api.cancel).toBe('function');
      api.cancel();
    });
  });

  // ─── Initial DOM scan ──────────────────────────────────────────────────────

  describe('initial DOM scan', () => {
    it('detects stega data in a text node already in the DOM', async () => {
      const payload = { source: 'cms', field: 'title' };
      const $el = document.createElement('div');
      $el.textContent = stegaText('Hello', payload);
      document.body.appendChild($el);

      const results: any[] = [];
      const api = queryStegaElementsLive((result) => results.push(result), {
        clean: false,
      });
      await new Promise((r) => setTimeout(r, 50));
      api.cancel();

      expect(results.length).toBe(1);
      expect(results[0].$elm).toBe($el);
      expect(results[0].attr).toBeUndefined();
      expect(results[0].data).toEqual(payload);
    });

    it('detects stega data in an attribute already in the DOM', async () => {
      const payload = { source: 'cms', field: 'href' };
      const $el = document.createElement('a');
      $el.setAttribute('href', stegaAttr(payload));
      document.body.appendChild($el);

      const results: any[] = [];
      const api = queryStegaElementsLive((result) => results.push(result), {
        clean: false,
      });
      await new Promise((r) => setTimeout(r, 50));
      api.cancel();

      expect(results.length).toBe(1);
      expect(results[0].$elm).toBe($el);
      expect(results[0].attr).toBe('href');
      expect(results[0].data).toEqual(payload);
    });

    it('detects stega data in multiple elements already in the DOM', async () => {
      const payload1 = { source: 'cms', field: 'title' };
      const payload2 = { source: 'cms', field: 'body' };

      const $el1 = document.createElement('div');
      $el1.textContent = stegaText('Title', payload1);

      const $el2 = document.createElement('p');
      $el2.textContent = stegaText('Body', payload2);

      document.body.appendChild($el1);
      document.body.appendChild($el2);

      const results: any[] = [];
      const api = queryStegaElementsLive((result) => results.push(result), {
        clean: false,
      });
      await new Promise((r) => setTimeout(r, 50));
      api.cancel();

      expect(results.length).toBe(2);
    });

    it('does not fire when no stega data is present in the DOM', async () => {
      document.body.innerHTML = `<div>No stega here</div>`;

      const results: any[] = [];
      const api = queryStegaElementsLive((result) => results.push(result));
      await new Promise((r) => setTimeout(r, 50));
      api.cancel();

      expect(results.length).toBe(0);
    });

    it('detects both a text node and an attribute on the same element', async () => {
      const textPayload = { source: 'cms', field: 'title' };
      const attrPayload = { source: 'cms', field: 'alt' };

      const $el = document.createElement('img');
      $el.setAttribute('alt', stegaAttr(attrPayload));
      // img cannot have text children; use a div instead
      const $div = document.createElement('div');
      $div.textContent = stegaText('Hello', textPayload);
      $div.setAttribute('data-label', stegaAttr(attrPayload));
      document.body.appendChild($div);

      const results: any[] = [];
      const api = queryStegaElementsLive((result) => results.push(result), {
        clean: false,
      });
      await new Promise((r) => setTimeout(r, 50));
      api.cancel();

      // At least the text node and the attribute should both fire
      expect(results.length).toBeGreaterThanOrEqual(2);
    });
  });

  // ─── Dynamically added elements ────────────────────────────────────────────

  describe('dynamically added elements', () => {
    it('detects stega in a text node added after observer starts', async () => {
      const payload = { source: 'cms', field: 'dynamic' };
      const results: any[] = [];

      const api = queryStegaElementsLive((result) => results.push(result), {
        clean: false,
      });

      await new Promise((r) => setTimeout(r, 20));

      const $el = document.createElement('div');
      $el.textContent = stegaText('Dynamic', payload);
      document.body.appendChild($el);

      await new Promise((r) => setTimeout(r, 50));
      api.cancel();

      expect(results.length).toBeGreaterThanOrEqual(1);
      expect(results[0].$elm).toBe($el);
      expect(results[0].data).toEqual(payload);
    });

    it('detects stega in an attribute added after observer starts', async () => {
      const payload = { source: 'cms', field: 'dynamic-attr' };
      const results: any[] = [];

      const api = queryStegaElementsLive((result) => results.push(result), {
        clean: false,
      });

      await new Promise((r) => setTimeout(r, 20));

      const $el = document.createElement('div');
      $el.setAttribute('data-stega', stegaAttr(payload));
      document.body.appendChild($el);

      await new Promise((r) => setTimeout(r, 50));
      api.cancel();

      expect(results.length).toBeGreaterThanOrEqual(1);
      expect(results[0].$elm).toBe($el);
      expect(results[0].attr).toBe('data-stega');
      expect(results[0].data).toEqual(payload);
    });

    it('detects stega in a deeply nested element added to the DOM', async () => {
      const payload = { source: 'cms', field: 'nested' };
      const results: any[] = [];

      const api = queryStegaElementsLive((result) => results.push(result), {
        clean: false,
      });

      await new Promise((r) => setTimeout(r, 20));

      const $wrapper = document.createElement('section');
      const $inner = document.createElement('span');
      $inner.textContent = stegaText('Deep', payload);
      $wrapper.appendChild($inner);
      document.body.appendChild($wrapper);

      await new Promise((r) => setTimeout(r, 50));
      api.cancel();

      expect(results.length).toBeGreaterThanOrEqual(1);
      expect(results[0].$elm).toBe($inner);
    });

    it('detects stega when an attribute is mutated on an existing element', async () => {
      const payload = { source: 'cms', field: 'attr-mutated' };
      const results: any[] = [];

      const $el = document.createElement('div');
      document.body.appendChild($el);

      const api = queryStegaElementsLive((result) => results.push(result), {
        clean: false,
      });

      await new Promise((r) => setTimeout(r, 20));
      $el.setAttribute('data-mutated', stegaAttr(payload));

      await new Promise((r) => setTimeout(r, 50));
      api.cancel();

      expect(results.length).toBeGreaterThanOrEqual(1);
      expect(results[0].attr).toBe('data-mutated');
      expect(results[0].data).toEqual(payload);
    });

    it('detects stega when a text node content is mutated on an existing element', async () => {
      const payload = { source: 'cms', field: 'text-mutated' };
      const results: any[] = [];

      const $el = document.createElement('div');
      $el.textContent = 'Initial text';
      document.body.appendChild($el);

      const api = queryStegaElementsLive((result) => results.push(result), {
        clean: false,
      });

      await new Promise((r) => setTimeout(r, 20));
      // Mutate the existing Text node in-place (triggers characterData mutation,
      // which is handled by the observer and re-scans the parent element)
      $el.firstChild!.textContent = stegaText('Updated', payload);

      await new Promise((r) => setTimeout(r, 50));
      api.cancel();

      expect(results.length).toBeGreaterThanOrEqual(1);
      expect(results[0].$elm).toBe($el);
      expect(results[0].data).toEqual(payload);
    });
  });

  // ─── clean option ──────────────────────────────────────────────────────────

  describe('clean option', () => {
    it('strips stega payload from text node when clean:true (default)', async () => {
      const payload = { source: 'cms', field: 'clean-text' };
      const $el = document.createElement('div');
      const encoded = stegaText('Visible', payload);
      $el.textContent = encoded;
      document.body.appendChild($el);

      const api = queryStegaElementsLive(() => {}, { clean: true });
      await new Promise((r) => setTimeout(r, 100));
      api.cancel();

      // After cleaning, the zero-width stega characters should be gone
      expect($el.textContent).not.toMatch(stega.encrypt(payload));
    });

    it('strips stega payload from attribute when clean:true (default)', async () => {
      const payload = { source: 'cms', field: 'clean-attr' };
      const $el = document.createElement('div');
      const encoded = stegaAttr(payload);
      $el.setAttribute('data-clean', encoded);
      document.body.appendChild($el);

      const api = queryStegaElementsLive(() => {}, { clean: true });
      await new Promise((r) => setTimeout(r, 100));
      api.cancel();

      // Attribute should no longer contain the stega payload
      const remaining = $el.getAttribute('data-clean') ?? '';
      expect(stega.decrypt(remaining)).toBeNull();
    });

    it('preserves stega payload in the DOM when clean:false', async () => {
      const payload = { source: 'cms', field: 'no-clean' };
      const $el = document.createElement('div');
      const encoded = stegaText('Visible', payload);
      $el.textContent = encoded;
      document.body.appendChild($el);

      const api = queryStegaElementsLive(() => {}, { clean: false });
      await new Promise((r) => setTimeout(r, 100));
      api.cancel();

      // Stega payload should still be decodeable from the text content
      expect(stega.decrypt($el.textContent ?? '')).toEqual(payload);
    });
  });

  // ─── once option ───────────────────────────────────────────────────────────

  describe('once option', () => {
    it('fires the callback only once per element with once:true (default)', async () => {
      const payload = { source: 'cms', field: 'once-text' };
      const $el = document.createElement('div');
      $el.textContent = stegaText('Once', payload);
      document.body.appendChild($el);

      const results: any[] = [];
      const api = queryStegaElementsLive((r) => results.push(r), {
        clean: false,
        once: true,
      });

      await new Promise((r) => setTimeout(r, 100));
      api.cancel();

      expect(results.length).toBe(1);
    });

    it('fires the callback only once per attribute with once:true', async () => {
      const payload = { source: 'cms', field: 'once-attr' };
      const $el = document.createElement('div');
      $el.setAttribute('data-once', stegaAttr(payload));
      document.body.appendChild($el);

      const results: any[] = [];
      const api = queryStegaElementsLive((r) => results.push(r), {
        clean: false,
        once: true,
      });

      await new Promise((r) => setTimeout(r, 100));
      api.cancel();

      // Only the attribute result should appear (no text stega on this element)
      const attrResults = results.filter((r) => r.attr === 'data-once');
      expect(attrResults.length).toBe(1);
    });

    it('can fire multiple times per element/attr with once:false', async () => {
      const payload1 = { source: 'cms', field: 'multi-1' };
      const payload2 = { source: 'cms', field: 'multi-2' };

      const $el = document.createElement('div');
      $el.setAttribute('data-multi', stegaAttr(payload1));
      document.body.appendChild($el);

      const results: any[] = [];
      const api = queryStegaElementsLive((r) => results.push(r), {
        clean: false,
        once: false,
      });

      await new Promise((r) => setTimeout(r, 20));
      // Mutate the attribute with a new stega value
      $el.setAttribute('data-multi', stegaAttr(payload2));

      await new Promise((r) => setTimeout(r, 50));
      api.cancel();

      expect(results.length).toBeGreaterThanOrEqual(2);
    });
  });

  // ─── cancel ────────────────────────────────────────────────────────────────

  describe('cancel', () => {
    it('stops observing after cancel is called', async () => {
      const payload = { source: 'cms', field: 'cancel-test' };
      const results: any[] = [];

      const api = queryStegaElementsLive((r) => results.push(r), {
        clean: false,
      });
      api.cancel();

      const $el = document.createElement('div');
      $el.textContent = stegaText('After cancel', payload);
      document.body.appendChild($el);

      await new Promise((r) => setTimeout(r, 100));

      expect(results.length).toBe(0);
    });

    it('cancelling from inside the callback prevents further calls', async () => {
      const payload1 = { source: 'cms', field: 'inner-cancel-1' };
      const payload2 = { source: 'cms', field: 'inner-cancel-2' };

      const $el1 = document.createElement('div');
      $el1.textContent = stegaText('First', payload1);

      const $el2 = document.createElement('div');
      $el2.textContent = stegaText('Second', payload2);

      document.body.appendChild($el1);
      document.body.appendChild($el2);

      const results: any[] = [];
      queryStegaElementsLive(
        (r, api) => {
          results.push(r);
          api.cancel();
        },
        { clean: false },
      );

      await new Promise((r) => setTimeout(r, 100));

      expect(results.length).toBe(1);
    });
  });

  // ─── attributes option ─────────────────────────────────────────────────────

  describe('attributes option', () => {
    it('skips attribute scanning when attributes:false', async () => {
      const textPayload = { source: 'cms', field: 'text-only' };
      const attrPayload = { source: 'cms', field: 'attr-skipped' };

      const $el = document.createElement('div');
      $el.textContent = stegaText('Text', textPayload);
      $el.setAttribute('data-skip', stegaAttr(attrPayload));
      document.body.appendChild($el);

      const results: any[] = [];
      const api = queryStegaElementsLive((r) => results.push(r), {
        clean: false,
        attributes: false,
      });
      await new Promise((r) => setTimeout(r, 50));
      api.cancel();

      // Only the text result should be present; the attribute should be ignored
      expect(results.every((r) => r.attr === undefined)).toBe(true);
      expect(results.length).toBe(1);
    });

    it('only scans listed attributes when attributes is a string array', async () => {
      const allowedPayload = { source: 'cms', field: 'allowed' };
      const ignoredPayload = { source: 'cms', field: 'ignored' };

      const $el = document.createElement('div');
      $el.setAttribute('data-allowed', stegaAttr(allowedPayload));
      $el.setAttribute('data-ignored', stegaAttr(ignoredPayload));
      document.body.appendChild($el);

      const results: any[] = [];
      const api = queryStegaElementsLive((r) => results.push(r), {
        clean: false,
        attributes: ['data-allowed'],
      });
      await new Promise((r) => setTimeout(r, 50));
      api.cancel();

      expect(results.length).toBe(1);
      expect(results[0].attr).toBe('data-allowed');
    });

    it('scans all attributes when attributes:true (default)', async () => {
      const payload1 = { source: 'cms', field: 'attr-a' };
      const payload2 = { source: 'cms', field: 'attr-b' };

      const $el = document.createElement('div');
      $el.setAttribute('data-a', stegaAttr(payload1));
      $el.setAttribute('data-b', stegaAttr(payload2));
      document.body.appendChild($el);

      const results: any[] = [];
      const api = queryStegaElementsLive((r) => results.push(r), {
        clean: false,
        attributes: true,
      });
      await new Promise((r) => setTimeout(r, 50));
      api.cancel();

      const attrs = results.map((r) => r.attr);
      expect(attrs).toContain('data-a');
      expect(attrs).toContain('data-b');
    });
  });

  // ─── rootNode option ───────────────────────────────────────────────────────

  describe('rootNode option', () => {
    it('only detects stega within the given rootNode', async () => {
      const insidePayload = { source: 'cms', field: 'inside' };
      const outsidePayload = { source: 'cms', field: 'outside' };

      const $scope = document.createElement('div');
      document.body.appendChild($scope);

      const $inside = document.createElement('span');
      $inside.textContent = stegaText('Inside', insidePayload);
      $scope.appendChild($inside);

      const $outside = document.createElement('span');
      $outside.textContent = stegaText('Outside', outsidePayload);
      document.body.appendChild($outside);

      const results: any[] = [];
      const api = queryStegaElementsLive((r) => results.push(r), {
        clean: false,
        rootNode: $scope,
      });
      await new Promise((r) => setTimeout(r, 50));
      api.cancel();

      expect(results.every((r) => $scope.contains(r.$elm))).toBe(true);
      expect(results.some((r) => r.$elm === $inside)).toBe(true);
      expect(results.some((r) => r.$elm === $outside)).toBe(false);
    });

    it('does not detect stega added outside the rootNode after observer starts', async () => {
      const payload = { source: 'cms', field: 'outside-dynamic' };

      const $scope = document.createElement('div');
      document.body.appendChild($scope);

      const results: any[] = [];
      const api = queryStegaElementsLive((r) => results.push(r), {
        clean: false,
        rootNode: $scope,
      });

      await new Promise((r) => setTimeout(r, 20));

      const $outside = document.createElement('div');
      $outside.textContent = stegaText('Outside', payload);
      document.body.appendChild($outside);

      await new Promise((r) => setTimeout(r, 50));
      api.cancel();

      expect(results.length).toBe(0);
    });
  });

  // ─── disconnectedCallback option ───────────────────────────────────────────

  describe('disconnectedCallback option', () => {
    it('calls disconnectedCallback when a detected element is removed', async () => {
      const payload = { source: 'cms', field: 'disconnect' };
      const $el = document.createElement('div');
      $el.textContent = stegaText('Disconnect me', payload);
      document.body.appendChild($el);

      const disconnected: any[] = [];
      const api = queryStegaElementsLive((r) => {}, {
        clean: false,
        disconnectedCallback: (result) => disconnected.push(result),
      });

      await new Promise((r) => setTimeout(r, 50));
      $el.remove();
      await new Promise((r) => setTimeout(r, 50));
      api.cancel();

      expect(disconnected.length).toBe(1);
      expect(disconnected[0].$elm).toBe($el);
    });

    it('calls disconnectedCallback when an ancestor is removed', async () => {
      const payload = { source: 'cms', field: 'ancestor-disconnect' };

      const $wrapper = document.createElement('section');
      const $el = document.createElement('span');
      $el.textContent = stegaText('Nested', payload);
      $wrapper.appendChild($el);
      document.body.appendChild($wrapper);

      const disconnected: any[] = [];
      const api = queryStegaElementsLive((r) => {}, {
        clean: false,
        disconnectedCallback: (result) => disconnected.push(result),
      });

      await new Promise((r) => setTimeout(r, 50));
      $wrapper.remove(); // removing the ancestor, not $el directly
      await new Promise((r) => setTimeout(r, 50));
      api.cancel();

      expect(disconnected.length).toBe(1);
      expect(disconnected[0].$elm).toBe($el);
    });

    it('does not call disconnectedCallback when not set', async () => {
      const payload = { source: 'cms', field: 'no-disconnect-cb' };
      const $el = document.createElement('div');
      $el.textContent = stegaText('Remove me', payload);
      document.body.appendChild($el);

      // Should not throw even without a disconnectedCallback
      const api = queryStegaElementsLive((r) => {}, { clean: false });
      await new Promise((r) => setTimeout(r, 50));
      $el.remove();
      await new Promise((r) => setTimeout(r, 50));
      api.cancel();
    });
  });

  // ─── result shape ──────────────────────────────────────────────────────────

  describe('result shape', () => {
    it('result includes $elm, stega, and data for a text node match', async () => {
      const payload = { source: 'cms', field: 'shape-text' };
      const $el = document.createElement('div');
      $el.textContent = stegaText('Shape', payload);
      document.body.appendChild($el);

      const results: any[] = [];
      const api = queryStegaElementsLive((r) => results.push(r), {
        clean: false,
      });
      await new Promise((r) => setTimeout(r, 50));
      api.cancel();

      const result = results[0];
      expect(result.$elm).toBeInstanceOf(HTMLElement);
      expect(typeof result.stega).toBe('string');
      expect(result.data).toEqual(payload);
      expect(result.attr).toBeUndefined();
    });

    it('result includes $elm, attr, stega, and data for an attribute match', async () => {
      const payload = { source: 'cms', field: 'shape-attr' };
      const $el = document.createElement('div');
      $el.setAttribute('data-shape', stegaAttr(payload));
      document.body.appendChild($el);

      const results: any[] = [];
      const api = queryStegaElementsLive((r) => results.push(r), {
        clean: false,
      });
      await new Promise((r) => setTimeout(r, 50));
      api.cancel();

      const result = results[0];
      expect(result.$elm).toBeInstanceOf(HTMLElement);
      expect(result.attr).toBe('data-shape');
      expect(typeof result.stega).toBe('string');
      expect(result.data).toEqual(payload);
    });

    it('callback also receives the api object as the second argument', async () => {
      const payload = { source: 'cms', field: 'api-arg' };
      const $el = document.createElement('div');
      $el.textContent = stegaText('API', payload);
      document.body.appendChild($el);

      let receivedApi: any;
      const api = queryStegaElementsLive(
        (r, a) => {
          receivedApi = a;
        },
        { clean: false },
      );
      await new Promise((r) => setTimeout(r, 50));
      api.cancel();

      expect(typeof receivedApi).toBe('object');
      expect(typeof receivedApi.cancel).toBe('function');
    });
  });
});
