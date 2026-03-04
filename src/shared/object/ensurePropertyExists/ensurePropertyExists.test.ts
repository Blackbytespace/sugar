import { test, expect } from 'vitest';
import ensurePropertyExists from './ensurePropertyExists';

test('ensurePropertyExists', () => {
  // Ensure simple property exists with default empty object
  const obj1 = { existing: 'value' };
  const result1 = ensurePropertyExists(obj1, 'newProp');
  expect(obj1).toEqual({ existing: 'value', newProp: {} });
  expect(result1).toEqual({});

  // Ensure nested property exists with custom value
  const obj2 = {};
  const result2 = ensurePropertyExists(obj2, 'level1.level2.prop', 'default');
  expect(obj2).toEqual({ level1: { level2: { prop: 'default' } } });
  expect(result2).toBe('default');

  // Property already exists - should not overwrite
  const obj3 = { existing: { nested: 'original' } };
  const result3 = ensurePropertyExists(obj3, 'existing.nested', 'new');
  expect(obj3.existing.nested).toBe('original');
  expect(result3).toBe('original');

  // Ensure deep nested property in existing structure
  const obj4 = { level1: { existing: 'value' } };
  ensurePropertyExists(obj4, 'level1.level2.newProp', 'test');
  expect(obj4).toEqual({
    level1: {
      existing: 'value',
      level2: { newProp: 'test' }
    }
  });

  // Ensure property with array value
  const obj5: any = {};
  ensurePropertyExists(obj5, 'arrayProp', ['item1', 'item2']);
  expect(obj5.arrayProp).toEqual(['item1', 'item2']);

  // Ensure property with null value explicitly
  const obj6: any = {};
  ensurePropertyExists(obj6, 'nullProp', null);
  expect(obj6.nullProp).toBeNull();

  // Return existing value even if it's falsy
  const obj7 = { falsyProp: false };
  const result7 = ensurePropertyExists(obj7, 'falsyProp', true);
  expect(result7).toBe(false);
  expect(obj7.falsyProp).toBe(false);

  // Multiple level creation
  const obj8 = {};
  ensurePropertyExists(obj8, 'a.b.c.d.e', 'deep');
  expect(obj8).toEqual({ a: { b: { c: { d: { e: 'deep' } } } } });
});