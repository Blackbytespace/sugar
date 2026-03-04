/**
 * @name            matches.browser.test.ts
 * @namespace       js.dom.query
 * @type            Test
 * @platform        js
 * @status          stable
 *
 * Browser e2e tests for matches
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

import { describe, it, expect, beforeEach } from 'vitest';
import matches from './matches.js';

describe('matches (browser)', () => {
  let $el: HTMLDivElement;

  beforeEach(() => {
    document.body.innerHTML = '';
    $el = document.createElement('div');
    $el.className = 'foo bar';
    $el.id = 'test-el';
    $el.setAttribute('data-value', '42');
    document.body.appendChild($el);
  });

  describe('return type', () => {
    it('should return a boolean', () => {
      expect(typeof matches($el, 'div')).toBe('boolean');
    });
  });

  describe('matching', () => {
    it('should match by tag name', () => {
      expect(matches($el, 'div')).toBe(true);
    });

    it('should match by class name', () => {
      expect(matches($el, '.foo')).toBe(true);
    });

    it('should match by id', () => {
      expect(matches($el, '#test-el')).toBe(true);
    });

    it('should match by attribute', () => {
      expect(matches($el, '[data-value]')).toBe(true);
    });

    it('should match by attribute value', () => {
      expect(matches($el, '[data-value="42"]')).toBe(true);
    });

    it('should match compound selectors', () => {
      expect(matches($el, 'div.foo')).toBe(true);
    });
  });

  describe('non-matching', () => {
    it('should return false for non-matching tag', () => {
      expect(matches($el, 'span')).toBe(false);
    });

    it('should return false for non-matching class', () => {
      expect(matches($el, '.nonexistent')).toBe(false);
    });

    it('should return false for non-matching id', () => {
      expect(matches($el, '#other')).toBe(false);
    });
  });

  describe('comment and text nodes', () => {
    it('should return false for comment nodes', () => {
      const comment = document.createComment('test') as unknown as HTMLElement;
      expect(matches(comment, 'div')).toBe(false);
    });

    it('should return false for text nodes', () => {
      const text = document.createTextNode('test') as unknown as HTMLElement;
      expect(matches(text, 'div')).toBe(false);
    });
  });
});
