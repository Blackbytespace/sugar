/**
 * @name            offsetFromParent.browser.test.ts
 * @namespace       js.dom.offset
 * @type            Test
 * @platform        js
 * @status          stable
 *
 * Browser e2e tests for offsetFromParent
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

import { describe, it, expect, beforeEach } from 'vitest';
import offsetFromParent from './offsetFromParent.js';

describe('offsetFromParent (browser)', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
  });

  describe('return type', () => {
    it('should return an object with top and left numbers', () => {
      const $parent = document.createElement('div');
      $parent.style.position = 'relative';
      $parent.style.width = '300px';
      $parent.style.height = '300px';
      document.body.appendChild($parent);

      const $child = document.createElement('div');
      $child.style.width = '50px';
      $child.style.height = '50px';
      $parent.appendChild($child);

      const result = offsetFromParent($child);
      expect(typeof result.top).toBe('number');
      expect(typeof result.left).toBe('number');
    });
  });

  describe('basic offset calculation', () => {
    it('should return {top:0, left:0} when child is at origin of parent', () => {
      const $parent = document.createElement('div');
      $parent.style.cssText =
        'position:relative;width:200px;height:200px;margin:0;padding:0;';
      document.body.appendChild($parent);

      const $child = document.createElement('div');
      $child.style.cssText =
        'position:absolute;top:0;left:0;width:10px;height:10px;';
      $parent.appendChild($child);

      const result = offsetFromParent($child);
      expect(result.top).toBe(0);
      expect(result.left).toBe(0);
    });

    it('should measure the correct offset when child is offset from parent', () => {
      const $parent = document.createElement('div');
      $parent.style.cssText =
        'position:relative;width:300px;height:300px;margin:0;padding:0;top:0;left:0;';
      document.body.appendChild($parent);

      const $child = document.createElement('div');
      $child.style.cssText =
        'position:absolute;top:50px;left:100px;width:10px;height:10px;';
      $parent.appendChild($child);

      const result = offsetFromParent($child);
      expect(result.top).toBeCloseTo(50, 0);
      expect(result.left).toBeCloseTo(100, 0);
    });

    it('should account for parent padding in the offset', () => {
      const $parent = document.createElement('div');
      $parent.style.cssText =
        'position:relative;width:200px;height:200px;padding:20px;box-sizing:border-box;margin:0;';
      document.body.appendChild($parent);

      const $child = document.createElement('div');
      $child.style.cssText = 'width:10px;height:10px;';
      $parent.appendChild($child);

      const result = offsetFromParent($child);
      // Child is inside parent padding, so top and left should be ~20px
      expect(result.top).toBeGreaterThan(0);
    });
  });

  describe('nested elements', () => {
    it('should compute the offset relative to immediate parent', () => {
      const $grandparent = document.createElement('div');
      $grandparent.style.cssText =
        'position:relative;width:400px;height:400px;padding:100px;box-sizing:border-box;margin:0;';
      document.body.appendChild($grandparent);

      const $parent = document.createElement('div');
      $parent.style.cssText = 'position:relative;width:200px;height:200px;';
      $grandparent.appendChild($parent);

      const $child = document.createElement('div');
      $child.style.cssText = 'width:10px;height:10px;';
      $parent.appendChild($child);

      const result = offsetFromParent($child);
      // Child is at origin of parent, so offset should be ~0
      expect(result.top).toBeCloseTo(0, 0);
      expect(result.left).toBeCloseTo(0, 0);
    });
  });
});
