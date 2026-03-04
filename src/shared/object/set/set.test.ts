import { test, expect } from 'vitest';
import set from './set';

test('set', () => {
  const obj = {};

  // Basic dotted path setting
  set(obj, 'a.b.c', 'value');
  expect(obj).toEqual({ a: { b: { c: 'value' } } });

  // Root assignment with '.'
  const rootObj = { existing: true };
  set(rootObj, '.', { new: 'value' });
  expect(rootObj).toEqual({ existing: true, new: 'value' });

  // Array path setting
  const arrayObj = {};
  set(arrayObj, ['x', 'y', 'z'], 42);
  expect(arrayObj).toEqual({ x: { y: { z: 42 } } });

  // Overwriting existing values
  const overwriteObj = { a: { b: 'old' } };
  set(overwriteObj, 'a.b', 'new');
  expect(overwriteObj.a.b).toBe('new');
});