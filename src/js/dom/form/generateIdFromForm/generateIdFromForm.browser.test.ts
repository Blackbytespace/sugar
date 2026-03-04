/**
 * @name            generateIdFromForm.browser.test.ts
 * @namespace       js.dom.form
 * @type            Test
 * @platform        js
 * @status          stable
 *
 * Browser e2e tests for generateIdFromForm
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

import { describe, it, expect, beforeEach } from 'vitest';
import generateIdFromForm from './generateIdFromForm.js';

function createForm(html: string): HTMLFormElement {
  const $form = document.createElement('form');
  $form.innerHTML = html;
  document.body.appendChild($form);
  return $form;
}

describe('generateIdFromForm (browser)', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  describe('return type', () => {
    it('should return a string', () => {
      const $form = createForm('');
      expect(typeof generateIdFromForm($form)).toBe('string');
    });

    it('should return a non-empty string', () => {
      const $form = createForm('');
      expect(generateIdFromForm($form).length).toBeGreaterThan(0);
    });

    it('should start with "f"', () => {
      const $form = createForm('');
      expect(generateIdFromForm($form).startsWith('f')).toBe(true);
    });
  });

  describe('action-based id', () => {
    it('should use the action attribute to generate the id', () => {
      const $form = createForm('');
      $form.setAttribute('action', '/login');
      const id = generateIdFromForm($form);
      expect(typeof id).toBe('string');
      expect(id.startsWith('f')).toBe(true);
    });

    it('same action should produce same id', () => {
      const $form1 = createForm('');
      $form1.setAttribute('action', '/submit');
      const $form2 = createForm('');
      $form2.setAttribute('action', '/submit');
      expect(generateIdFromForm($form1)).toBe(generateIdFromForm($form2));
    });

    it('different actions should produce different ids', () => {
      const $form1 = createForm('');
      $form1.setAttribute('action', '/login');
      const $form2 = createForm('');
      $form2.setAttribute('action', '/register');
      expect(generateIdFromForm($form1)).not.toBe(generateIdFromForm($form2));
    });
  });

  describe('attribute + named controls based id', () => {
    it('form with no action but with named inputs should produce a stable id', () => {
      const $form = createForm(
        '<input name="email" /><input name="password" />',
      );
      const id1 = generateIdFromForm($form);
      const id2 = generateIdFromForm($form);
      expect(id1).toBe(id2);
    });

    it('forms with same named controls should produce same id', () => {
      const $form1 = createForm(
        '<input name="username" /><input name="email" />',
      );
      const $form2 = createForm(
        '<input name="username" /><input name="email" />',
      );
      expect(generateIdFromForm($form1)).toBe(generateIdFromForm($form2));
    });

    it('forms with different named controls should produce different ids', () => {
      const $form1 = createForm('<input name="email" />');
      const $form2 = createForm('<input name="phone" />');
      expect(generateIdFromForm($form1)).not.toBe(generateIdFromForm($form2));
    });

    it('named controls should be order-independent (sorted)', () => {
      // Controls in different orders but same names → same id
      const $form1 = createForm(
        '<input name="b" /><input name="a" /><input name="c" />',
      );
      const $form2 = createForm(
        '<input name="a" /><input name="b" /><input name="c" />',
      );
      expect(generateIdFromForm($form1)).toBe(generateIdFromForm($form2));
    });

    it('empty form should produce a consistent id', () => {
      const $form1 = createForm('');
      const $form2 = createForm('');
      expect(generateIdFromForm($form1)).toBe(generateIdFromForm($form2));
    });
  });

  describe('action takes priority over attributes', () => {
    it('form with action and named controls should use action only', () => {
      const $formWithAction = createForm('<input name="email" />');
      $formWithAction.setAttribute('action', '/go');

      const $formActionOnly = createForm('');
      $formActionOnly.setAttribute('action', '/go');

      // Both should produce same id since action="/go" takes priority
      expect(generateIdFromForm($formWithAction)).toBe(
        generateIdFromForm($formActionOnly),
      );
    });
  });
});
