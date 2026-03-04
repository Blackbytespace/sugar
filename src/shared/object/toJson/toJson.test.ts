import { test, expect } from 'vitest';
import toJson from './toJson';

test('toJson', () => {
  // Class instance conversion
  class TestClass {
    public prop1: string;
    public prop2: number;
    private _private: string;
    
    constructor() {
      this.prop1 = 'value1';
      this.prop2 = 42;
      this._private = 'hidden';
    }
    
    method() {
      return 'method';
    }
  }
  
  const instance = new TestClass();
  const json = toJson(instance);
  
  expect(json).toEqual({ 
    prop1: 'value1', 
    prop2: 42 
  });
  
  // Should not include methods or private properties
  expect(json).not.toHaveProperty('method');
  expect(json).not.toHaveProperty('_private');

  // Nested class instances
  class InnerClass {
    innerValue: string;
    constructor(value: string) {
      this.innerValue = value;
    }
  }
  
  class OuterClass {
    outer: string;
    nested: InnerClass;
    constructor() {
      this.outer = 'outer';
      this.nested = new InnerClass('inner');
    }
  }
  
  const nested = new OuterClass();
  const nestedJson = toJson(nested);
  
  expect(nestedJson).toEqual({
    outer: 'outer',
    nested: {
      innerValue: 'inner'
    }
  });

  // Plain objects should pass through
  const plainObj = { a: 1, b: 2, nested: { c: 3 } };
  expect(toJson(plainObj)).toEqual(plainObj);

  // Arrays with class instances
  class ArrayItem {
    id: number;
    name: string;
    constructor(id: number, name: string) {
      this.id = id;
      this.name = name;
    }
  }
  
  const arrayWithClasses = [
    new ArrayItem(1, 'first'),
    new ArrayItem(2, 'second')
  ];
  
  const arrayJson = toJson(arrayWithClasses);
  // toJson converts arrays to objects with numeric keys
  expect(arrayJson).toEqual({
    '0': { id: 1, name: 'first' },
    '1': { id: 2, name: 'second' }
  });

  // Mixed content
  class MixedClass {
    string: string;
    number: number;
    boolean: boolean;
    array: any[];
    object: any;
    
    constructor() {
      this.string = 'test';
      this.number = 123;
      this.boolean = true;
      this.array = [1, 2, 3];
      this.object = { key: 'value' };
    }
  }
  
  const mixed = new MixedClass();
  const mixedJson = toJson(mixed);
  
  expect(mixedJson).toEqual({
    string: 'test',
    number: 123,
    boolean: true,
    array: { '0': 1, '1': 2, '2': 3 }, // toJson converts arrays to objects
    object: { key: 'value' }
  });

  // Empty class
  class EmptyClass {}
  const empty = new EmptyClass();
  expect(toJson(empty)).toEqual({});

  // Null and undefined
  expect(toJson(null)).toEqual({});
  expect(toJson(undefined)).toEqual({});
});