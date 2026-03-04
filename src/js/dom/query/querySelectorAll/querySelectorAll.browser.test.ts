/**
 * @name            querySelectorAll.browser.test.ts
 * @namespace       js.dom.query
 * @type            Test
 * @platform        js
 * @status          stable
 *
 * Browser e2e tests for querySelectorAll
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

import { describe, it, expect, beforeEach } from 'vitest';
import querySelectorAll from './querySelectorAll.js';

describe('querySelectorAll (browser)', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  describe('return type', () => {
    it('should return an array', () => {
      document.body.innerHTML = '<p class="item">a</p>';
      expect(Array.isArray(querySelectorAll('.item'))).toBe(true);
    });
  });

  describe('basic query', () => {
    it('should find elements matching the selector', () => {
      document.body.innerHTML =
        '<div class="target"></div><div class="target"></div><span></span>';
      const result = querySelectorAll('.target');
      expect(result.length).toBe(2);
    });

    it('should return empty array when no elements match', () => {
      document.body.innerHTML = '<p>hello</p>';
      expect(querySelectorAll('.nonexistent')).toHaveLength(0);
    });
  });

  describe('rootNode option', () => {
    it('should restrict search to the provided rootNode', () => {
      document.body.innerHTML = `
        <div class="item">outside</div>
        <div id="root">
          <div class="item">inside</div>
        </div>`;
      const $root = document.getElementById('root')!;
      const result = querySelectorAll('.item', { $rootNode: $root });
      expect(result.length).toBe(1);
      expect(result[0].textContent).toBe('inside');
    });
  });

  describe('visible filter', () => {
    it('should include all elements when visible is null', () => {
      document.body.innerHTML = `
        <div class="item" style="display:none">hidden</div>
        <div class="item">visible</div>`;
      const result = querySelectorAll('.item', { visible: null });
      expect(result.length).toBe(2);
    });
  });

  describe('inViewport filter', () => {
    it('should include all elements when inViewport is null', () => {
      document.body.innerHTML =
        '<div class="item">in vp</div><div class="item" style="position:absolute;top:100000px;">off screen</div>';
      const result = querySelectorAll('.item', { inViewport: null });
      expect(result.length).toBe(2);
    });

    it('should only include in-viewport elements when inViewport is true', () => {
      const $inVp = document.createElement('div');
      $inVp.className = 'item';
      $inVp.textContent = 'in viewport';
      document.body.appendChild($inVp);

      const $offScreen = document.createElement('div');
      $offScreen.className = 'item';
      $offScreen.style.cssText =
        'position:absolute;top:100000px;width:50px;height:50px;';
      document.body.appendChild($offScreen);

      const result = querySelectorAll('.item', { inViewport: true });
      expect(result).toContain($inVp);
      expect(result).not.toContain($offScreen);
    });
  });
});
