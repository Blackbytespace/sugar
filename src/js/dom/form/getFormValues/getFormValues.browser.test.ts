/**
 * @name            getFormValues.browser.test.ts
 * @namespace       js.dom.form
 * @type            Test
 * @platform        js
 * @status          stable
 *
 * Browser e2e tests for getFormValues
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

import { describe, it, expect, beforeEach } from 'vitest';
import getFormValues from './getFormValues.js';

function createForm(html: string): HTMLFormElement {
  const $form = document.createElement('form');
  $form.innerHTML = html;
  document.body.appendChild($form);
  return $form;
}

describe('getFormValues (browser)', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  describe('return type', () => {
    it('should return an object', () => {
      const $form = createForm('');
      expect(typeof getFormValues($form)).toBe('object');
      expect(getFormValues($form)).not.toBeNull();
    });

    it('should return an empty object for a form with no named inputs', () => {
      const $form = createForm('<input type="text" />');
      expect(getFormValues($form)).toEqual({});
    });
  });

  describe('text inputs', () => {
    it('should return the value of a named text input', () => {
      const $form = createForm('<input type="text" name="username" />');
      const $input = $form.querySelector<HTMLInputElement>(
        'input[name="username"]',
      )!;
      $input.value = 'alice';
      expect(getFormValues($form)).toEqual({ username: 'alice' });
    });

    it('should return empty string for an unfilled text input', () => {
      const $form = createForm('<input type="text" name="email" />');
      expect(getFormValues($form)).toEqual({ email: '' });
    });

    it('should return multiple named text input values', () => {
      const $form = createForm(
        '<input type="text" name="first" /><input type="text" name="last" />',
      );
      $form.querySelector<HTMLInputElement>('input[name="first"]')!.value =
        'John';
      $form.querySelector<HTMLInputElement>('input[name="last"]')!.value =
        'Doe';
      expect(getFormValues($form)).toEqual({ first: 'John', last: 'Doe' });
    });
  });

  describe('hidden inputs', () => {
    it('should include hidden input values', () => {
      const $form = createForm(
        '<input type="hidden" name="token" value="abc123" />',
      );
      expect(getFormValues($form)).toEqual({ token: 'abc123' });
    });
  });

  describe('select elements', () => {
    it('should return the selected option value', () => {
      const $form = createForm(
        '<select name="color"><option value="red">Red</option><option value="blue">Blue</option></select>',
      );
      $form.querySelector<HTMLSelectElement>('select')!.value = 'blue';
      expect(getFormValues($form)).toEqual({ color: 'blue' });
    });
  });

  describe('textarea', () => {
    it('should return the textarea value', () => {
      const $form = createForm('<textarea name="message"></textarea>');
      $form.querySelector<HTMLTextAreaElement>('textarea')!.value =
        'Hello world';
      expect(getFormValues($form)).toEqual({ message: 'Hello world' });
    });
  });

  describe('checkboxes', () => {
    it('should include a checked checkbox value', () => {
      const $form = createForm(
        '<input type="checkbox" name="agree" value="yes" checked />',
      );
      expect(getFormValues($form)).toEqual({ agree: 'yes' });
    });

    it('should not include an unchecked checkbox', () => {
      const $form = createForm(
        '<input type="checkbox" name="agree" value="yes" />',
      );
      expect(getFormValues($form)).not.toHaveProperty('agree');
    });
  });

  describe('radio buttons', () => {
    it('should return the value of the selected radio button', () => {
      const $form = createForm(`
        <input type="radio" name="plan" value="free" />
        <input type="radio" name="plan" value="pro" checked />
      `);
      expect(getFormValues($form)).toEqual({ plan: 'pro' });
    });

    it('should not include a radio group with no selection', () => {
      const $form = createForm(`
        <input type="radio" name="plan" value="free" />
        <input type="radio" name="plan" value="pro" />
      `);
      expect(getFormValues($form)).not.toHaveProperty('plan');
    });
  });

  describe('mixed form', () => {
    it('should collect values from a realistic login form', () => {
      const $form = createForm(`
        <input type="text"     name="username" />
        <input type="password" name="password" />
        <input type="hidden"   name="csrf"     value="token-xyz" />
      `);
      $form.querySelector<HTMLInputElement>('input[name="username"]')!.value =
        'bob';
      $form.querySelector<HTMLInputElement>('input[name="password"]')!.value =
        's3cr3t';

      const values = getFormValues($form);
      expect(values.username).toBe('bob');
      expect(values.password).toBe('s3cr3t');
      expect(values.csrf).toBe('token-xyz');
    });
  });
});
