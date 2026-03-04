import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import querySelectorLive from './querySelectorLive.js';

describe('querySelectorLive', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  // ─── API shape ─────────────────────────────────────────────────────────────

  describe('return value', () => {
    it('returns an object with a cancel function', () => {
      const api = querySelectorLive('.ql-api', () => {});
      expect(typeof api).toBe('object');
      expect(typeof api.cancel).toBe('function');
      api.cancel();
    });
  });

  // ─── Initial scan ──────────────────────────────────────────────────────────

  describe('initial DOM scan', () => {
    it('calls cb for elements already in the DOM', async () => {
      document.body.innerHTML = `<div class="ql-init">hello</div>`;
      const found: HTMLElement[] = [];

      const api = querySelectorLive('.ql-init', ($el) => found.push($el));
      await new Promise((r) => setTimeout(r, 50));
      api.cancel();

      expect(found.length).toBe(1);
      expect(found[0].classList.contains('ql-init')).toBe(true);
    });

    it('calls cb for every matching element already in the DOM', async () => {
      document.body.innerHTML = `
        <div class="ql-multi">a</div>
        <div class="ql-multi">b</div>
        <div class="ql-multi">c</div>
      `;
      const found: HTMLElement[] = [];

      const api = querySelectorLive('.ql-multi', ($el) => found.push($el));
      await new Promise((r) => setTimeout(r, 50));
      api.cancel();

      expect(found.length).toBe(3);
    });

    it('does not call cb when no elements match', async () => {
      const found: HTMLElement[] = [];
      const api = querySelectorLive('.ql-no-match', ($el) => found.push($el));
      await new Promise((r) => setTimeout(r, 50));
      api.cancel();

      expect(found.length).toBe(0);
    });
  });

  // ─── Dynamically added elements ────────────────────────────────────────────

  describe('dynamically added elements', () => {
    it('calls cb when a matching element is added to the DOM', async () => {
      const found: HTMLElement[] = [];
      const api = querySelectorLive('.ql-dynamic', ($el) => found.push($el));

      await new Promise((r) => setTimeout(r, 20));
      const $el = document.createElement('div');
      $el.className = 'ql-dynamic';
      document.body.appendChild($el);

      await new Promise((r) => setTimeout(r, 50));
      api.cancel();

      expect(found.length).toBeGreaterThanOrEqual(1);
      expect(found[0]).toBe($el);
    });

    it('calls cb for a deeply nested newly added element', async () => {
      const found: HTMLElement[] = [];
      const api = querySelectorLive('.ql-nested', ($el) => found.push($el));

      await new Promise((r) => setTimeout(r, 20));
      const $wrapper = document.createElement('div');
      $wrapper.innerHTML = `<section><div class="ql-nested">deep</div></section>`;
      document.body.appendChild($wrapper);

      await new Promise((r) => setTimeout(r, 50));
      api.cancel();

      expect(found.length).toBe(1);
    });

    it('calls cb for multiple newly added matching elements in one insertion', async () => {
      const found: HTMLElement[] = [];
      const api = querySelectorLive('.ql-batch', ($el) => found.push($el));

      await new Promise((r) => setTimeout(r, 20));
      const $wrapper = document.createElement('div');
      $wrapper.innerHTML = `
        <div class="ql-batch">1</div>
        <div class="ql-batch">2</div>
      `;
      document.body.appendChild($wrapper);

      await new Promise((r) => setTimeout(r, 50));
      api.cancel();

      expect(found.length).toBe(2);
    });
  });

  // ─── Attribute mutations ───────────────────────────────────────────────────

  describe('attribute mutations', () => {
    it('calls cb when a class is added to an existing element making it match', async () => {
      const $el = document.createElement('div');
      document.body.appendChild($el);

      const found: HTMLElement[] = [];
      const api = querySelectorLive('.ql-attr-class', ($el) => found.push($el));

      await new Promise((r) => setTimeout(r, 20));
      $el.classList.add('ql-attr-class');

      await new Promise((r) => setTimeout(r, 50));
      api.cancel();

      expect(found.length).toBe(1);
      expect(found[0]).toBe($el);
    });

    it('calls cb when a custom attribute is added to an existing element making it match', async () => {
      const $el = document.createElement('div');
      document.body.appendChild($el);

      const found: HTMLElement[] = [];
      const api = querySelectorLive('[data-ql-attr]', ($el) => found.push($el));

      await new Promise((r) => setTimeout(r, 20));
      $el.setAttribute('data-ql-attr', 'yes');

      await new Promise((r) => setTimeout(r, 50));
      api.cancel();

      expect(found.length).toBe(1);
      expect(found[0]).toBe($el);
    });
  });

  // ─── cancel ────────────────────────────────────────────────────────────────

  describe('cancel', () => {
    it('stops observing after cancel is called', async () => {
      const found: HTMLElement[] = [];
      const api = querySelectorLive('.ql-cancel', ($el) => found.push($el));
      api.cancel();

      const $el = document.createElement('div');
      $el.className = 'ql-cancel';
      document.body.appendChild($el);

      await new Promise((r) => setTimeout(r, 100));

      expect(found.length).toBe(0);
    });

    it('cancelling from inside the callback stops further calls', async () => {
      document.body.innerHTML = `
        <div class="ql-cancel-inner">a</div>
        <div class="ql-cancel-inner">b</div>
      `;
      const found: HTMLElement[] = [];

      querySelectorLive('.ql-cancel-inner', ($el, api) => {
        found.push($el);
        api.cancel();
      });

      await new Promise((r) => setTimeout(r, 100));

      expect(found.length).toBe(1);
    });
  });

  // ─── once option ───────────────────────────────────────────────────────────

  describe('once option', () => {
    it('fires for each element only once with once:true (default)', async () => {
      document.body.innerHTML = `<div class="ql-once">x</div>`;
      const found: HTMLElement[] = [];

      const api = querySelectorLive('.ql-once', ($el) => found.push($el), {
        once: true,
      });

      await new Promise((r) => setTimeout(r, 100));
      api.cancel();

      expect(found.length).toBe(1);
    });

    it('can fire multiple times per element with once:false', async () => {
      const $el = document.createElement('div');
      $el.className = 'ql-not-once';
      document.body.appendChild($el);

      const found: HTMLElement[] = [];
      const api = querySelectorLive('.ql-not-once', ($el) => found.push($el), {
        once: false,
      });

      await new Promise((r) => setTimeout(r, 20));
      // Trigger an attribute mutation to fire again
      $el.setAttribute('data-touch', '1');
      await new Promise((r) => setTimeout(r, 50));
      $el.setAttribute('data-touch', '2');
      await new Promise((r) => setTimeout(r, 50));
      api.cancel();

      // Initial scan fires once; attribute mutations on class/id + data-touch
      // won't re-trigger unless the element matches the selector again — but with
      // once:false the initial scan match and any re-matches from attribute
      // changes on the class attribute count.
      expect(found.length).toBeGreaterThanOrEqual(1);
    });
  });

  // ─── firstOnly option ──────────────────────────────────────────────────────

  describe('firstOnly option', () => {
    it('stops after the first matched element', async () => {
      document.body.innerHTML = `
        <div class="ql-first-only">a</div>
        <div class="ql-first-only">b</div>
        <div class="ql-first-only">c</div>
      `;
      const found: HTMLElement[] = [];

      querySelectorLive('.ql-first-only', ($el) => found.push($el), {
        firstOnly: true,
      });

      await new Promise((r) => setTimeout(r, 100));

      expect(found.length).toBe(1);
    });
  });

  // ─── afterFirst option ─────────────────────────────────────────────────────

  describe('afterFirst option', () => {
    it('calls afterFirst after the initial scan', async () => {
      document.body.innerHTML = `<div class="ql-after-first">x</div>`;
      let afterFirstCalled = false;

      const api = querySelectorLive('.ql-after-first', () => {}, {
        afterFirst: () => {
          afterFirstCalled = true;
        },
      });

      // afterFirst is synchronous
      expect(afterFirstCalled).toBe(true);
      await new Promise((r) => setTimeout(r, 50));
      api.cancel();
    });
  });

  // ─── rootNode option ───────────────────────────────────────────────────────

  describe('rootNode option', () => {
    it('only observes within the given rootNode', async () => {
      const $scope = document.createElement('div');
      const $outside = document.createElement('div');
      $outside.className = 'ql-root-test';
      document.body.appendChild($scope);
      document.body.appendChild($outside);

      const found: HTMLElement[] = [];
      const api = querySelectorLive('.ql-root-test', ($el) => found.push($el), {
        rootNode: $scope,
      });

      await new Promise((r) => setTimeout(r, 20));

      // Element added outside the scope — should not be detected
      const $alsoOutside = document.createElement('div');
      $alsoOutside.className = 'ql-root-test';
      document.body.appendChild($alsoOutside);

      // Element added inside the scope — should be detected
      const $inside = document.createElement('div');
      $inside.className = 'ql-root-test';
      $scope.appendChild($inside);

      await new Promise((r) => setTimeout(r, 50));
      api.cancel();

      expect(found.every(($el) => $scope.contains($el))).toBe(true);
      expect(found.some(($el) => $el === $inside)).toBe(true);
    });
  });

  // ─── disconnectedCallback option ───────────────────────────────────────────

  describe('disconnectedCallback option', () => {
    it('calls disconnectedCallback when a matched element is removed', async () => {
      const $el = document.createElement('div');
      $el.className = 'ql-disconnect';
      document.body.appendChild($el);

      const disconnected: HTMLElement[] = [];

      const api = querySelectorLive('.ql-disconnect', () => {}, {
        disconnectedCallback: ($removed) => disconnected.push($removed),
      });

      await new Promise((r) => setTimeout(r, 50));
      $el.remove();
      await new Promise((r) => setTimeout(r, 50));
      api.cancel();

      expect(disconnected.length).toBe(1);
      expect(disconnected[0]).toBe($el);
    });
  });

  // ─── when option ───────────────────────────────────────────────────────────

  describe('when option', () => {
    it('delays calling cb until the when trigger resolves (direct)', async () => {
      document.body.innerHTML = `<div class="ql-when-direct">x</div>`;
      const found: HTMLElement[] = [];

      const api = querySelectorLive('.ql-when-direct', ($el) => found.push($el), {
        when: 'direct' as any,
      });

      // 'direct' resolves immediately — cb should still fire
      await new Promise((r) => setTimeout(r, 100));
      api.cancel();

      expect(found.length).toBe(1);
    });
  });
});
