import { test, expect } from 'vitest';
import propertyProxy from './propertyProxy';

test('propertyProxy', () => {
  // Basic getter proxy
  const obj1 = { title: 'World' };
  propertyProxy(obj1, 'title', {
    get: (value) => `Hello ${value}`,
    set: (value) => value,
    configurable: true,
    enumarable: true
  });
  
  expect(obj1.title).toBe('Hello World');

  // Basic setter proxy
  const obj2 = { name: 'John' };
  propertyProxy(obj2, 'name', {
    get: (value) => value,
    set: (value) => `Mr. ${value}`,
    configurable: true,
    enumarable: true
  });
  
  obj2.name = 'Smith';
  expect(obj2.name).toBe('Mr. Smith');

  // Both getter and setter
  const obj3 = { value: 10 };
  propertyProxy(obj3, 'value', {
    get: (value) => value * 2,
    set: (value) => value + 5,
    configurable: true,
    enumarable: true
  });
  
  expect(obj3.value).toBe(20); // (10 + 0) * 2, but initial value processing
  obj3.value = 15;
  expect(obj3.value).toBe(40); // (15 + 5) * 2

  // Apply setter at start
  const obj4 = { initial: 'test' };
  propertyProxy(obj4, 'initial', {
    get: (value) => value.toUpperCase(),
    set: (value) => `processed_${value}`,
    configurable: true,
    enumarable: true
  }, true); // applySetterAtStart = true
  
  expect(obj4.initial).toBe('PROCESSED_TEST');

  // Only getter (no setter)
  const obj5 = { data: 'raw' };
  propertyProxy(obj5, 'data', {
    get: (value) => `formatted: ${value}`,
    set: undefined as any,
    configurable: true,
    enumarable: true
  });
  
  expect(obj5.data).toBe('formatted: raw');
  obj5.data = 'changed';
  expect(obj5.data).toBe('formatted: changed');

  // Only setter (no getter)
  const obj6 = { input: '' };
  propertyProxy(obj6, 'input', {
    get: undefined as any,
    set: (value) => value.trim().toLowerCase(),
    configurable: true,
    enumarable: true
  });
  
  obj6.input = '  HELLO WORLD  ';
  expect(obj6.input).toBe('hello world');

  // Complex transformation
  const obj7 = { count: 0 };
  propertyProxy(obj7, 'count', {
    get: (value) => {
      if (value < 0) return 'negative';
      if (value === 0) return 'zero';
      if (value === 1) return 'one';
      return `many (${value})`;
    },
    set: (value) => Math.max(0, Math.floor(Number(value) || 0)),
    configurable: true,
    enumarable: true
  });
  
  expect(obj7.count).toBe('zero');
  obj7.count = 5.7;
  expect(obj7.count).toBe('many (5)');
  obj7.count = -3;
  expect(obj7.count).toBe('zero'); // setter prevents negative
  obj7.count = 1;
  expect(obj7.count).toBe('one');

  // Property enumeration and configuration
  const obj8 = { visible: 'yes', hidden: 'secret' };
  propertyProxy(obj8, 'hidden', {
    get: (value) => `[${value}]`,
    set: (value) => value,
    configurable: false,
    enumarable: false
  });
  
  expect(obj8.hidden).toBe('[secret]');
  expect(Object.keys(obj8)).toEqual(['visible']); // hidden should not be enumerable
  
  // Attempting to reconfigure should fail
  expect(() => {
    Object.defineProperty(obj8, 'hidden', { value: 'new' });
  }).toThrow();
});