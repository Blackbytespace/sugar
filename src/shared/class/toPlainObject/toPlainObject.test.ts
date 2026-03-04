import { describe, it, expect } from 'vitest';
import toPlainObject from './toPlainObject.js';

describe('shared.class.toPlainObject', () => {
  class SimpleClass {
    public stringProp: string;
    public numberProp: number;
    public booleanProp: boolean;
    
    constructor() {
      this.stringProp = 'hello';
      this.numberProp = 42;
      this.booleanProp = true;
    }
    
    method() {
      return 'method';
    }
  }

  class ComplexClass {
    public objectProp: object;
    public arrayProp: any[];
    public nullProp: null;
    public undefinedProp: undefined;
    
    constructor() {
      this.objectProp = { nested: 'value' };
      this.arrayProp = [1, 2, 3];
      this.nullProp = null;
      this.undefinedProp = undefined;
    }
  }

  it('should convert class instance to plain object', () => {
    const instance = new SimpleClass();
    const result = toPlainObject(instance);
    
    expect(result).toEqual({
      stringProp: 'hello',
      numberProp: 42,
      booleanProp: true
    });
    
    // Ensure it's a plain object, not the class instance
    expect(result.constructor).toBe(Object);
    expect(result instanceof SimpleClass).toBe(false);
  });

  it('should not include methods in plain object', () => {
    const instance = new SimpleClass();
    const result = toPlainObject(instance);
    
    expect(result.method).toBeUndefined();
    expect(typeof result.method).toBe('undefined');
  });

  it('should handle complex data types', () => {
    const instance = new ComplexClass();
    const result = toPlainObject(instance);
    
    expect(result).toEqual({
      objectProp: { nested: 'value' },
      arrayProp: [1, 2, 3],
      nullProp: null,
      undefinedProp: undefined
    });
  });

  it('should handle empty class instances', () => {
    class EmptyClass {}
    const instance = new EmptyClass();
    const result = toPlainObject(instance);
    
    expect(result).toEqual({});
  });

  it('should handle class with only methods', () => {
    class MethodOnlyClass {
      method1() {
        return 'method1';
      }
      
      method2() {
        return 'method2';
      }
    }
    
    const instance = new MethodOnlyClass();
    const result = toPlainObject(instance);
    
    expect(result).toEqual({});
  });

  it('should handle properties added after instantiation', () => {
    const instance = new SimpleClass();
    (instance as any).dynamicProp = 'dynamic';
    
    const result = toPlainObject(instance);
    
    expect(result).toEqual({
      stringProp: 'hello',
      numberProp: 42,
      booleanProp: true,
      dynamicProp: 'dynamic'
    });
  });

  it('should handle inherited properties', () => {
    class BaseClass {
      baseProp: string;
      
      constructor() {
        this.baseProp = 'base';
      }
    }
    
    class DerivedClass extends BaseClass {
      derivedProp: string;
      
      constructor() {
        super();
        this.derivedProp = 'derived';
      }
    }
    
    const instance = new DerivedClass();
    const result = toPlainObject(instance);
    
    expect(result).toEqual({
      baseProp: 'base',
      derivedProp: 'derived'
    });
  });

  it('should handle null input', () => {
    const result = toPlainObject(null);
    expect(result).toEqual({});
  });

  it('should handle undefined input', () => {
    const result = toPlainObject(undefined);
    expect(result).toEqual({});
  });

  it('should handle plain object input', () => {
    const plainObj = { a: 1, b: 'hello', c: true };
    const result = toPlainObject(plainObj);
    
    expect(result).toEqual(plainObj);
    expect(result).not.toBe(plainObj); // Should be a copy
  });

  it('should handle primitive values', () => {
    // String objects have properties like indices and length
    const stringResult = toPlainObject('string');
    expect(stringResult).toEqual({
      '0': 's',
      '1': 't', 
      '2': 'r',
      '3': 'i',
      '4': 'n',
      '5': 'g',
      'length': 6
    });
    
    // Numbers and booleans have fewer properties
    expect(toPlainObject(42)).toEqual({});
    expect(toPlainObject(true)).toEqual({});
  });

  it('should handle arrays', () => {
    const array = [1, 2, 3];
    (array as any).customProp = 'custom';
    
    const result = toPlainObject(array);
    
    expect(result).toEqual({
      '0': 1,
      '1': 2,
      '2': 3,
      'length': 3, // Arrays have length property
      customProp: 'custom'
    });
  });

  it('should handle functions with properties', () => {
    function fn() {}
    (fn as any).prop = 'value';
    
    const result = toPlainObject(fn);
    
    // Functions have built-in properties like name, length, prototype
    expect(result).toEqual({
      length: 0,
      name: 'fn',
      prop: 'value',
      prototype: expect.any(Object)
    });
  });

  it('should handle getters and setters as properties', () => {
    class ClassWithGetters {
      private _value: string = 'internal';
      
      get value() {
        return this._value;
      }
      
      set value(newValue: string) {
        this._value = newValue;
      }
    }
    
    const instance = new ClassWithGetters();
    const result = toPlainObject(instance);
    
    // Should only include enumerable own properties
    expect(result).toEqual({
      _value: 'internal'
    });
  });

  it('should handle Symbol properties', () => {
    const symbolKey = Symbol('test');
    const instance = new SimpleClass();
    (instance as any)[symbolKey] = 'symbol value';
    
    const result = toPlainObject(instance);
    
    // getOwnPropertyNames doesn't include symbols
    expect(result[symbolKey]).toBeUndefined();
    expect(result).toEqual({
      stringProp: 'hello',
      numberProp: 42,
      booleanProp: true
    });
  });

  it('should handle non-enumerable properties', () => {
    const instance = new SimpleClass();
    Object.defineProperty(instance, 'hiddenProp', {
      value: 'hidden',
      enumerable: false,
      writable: true,
      configurable: true
    });
    
    const result = toPlainObject(instance);
    
    // getOwnPropertyNames includes non-enumerable properties
    expect(result).toEqual({
      stringProp: 'hello',
      numberProp: 42,
      booleanProp: true,
      hiddenProp: 'hidden'
    });
  });

  it('should handle circular references gracefully', () => {
    class CircularClass {
      prop: string;
      self?: CircularClass;
      
      constructor() {
        this.prop = 'value';
        this.self = this; // Circular reference
      }
    }
    
    const instance = new CircularClass();
    const result = toPlainObject(instance);
    
    expect(result.prop).toBe('value');
    expect(result.self).toBe(instance); // Circular reference preserved
  });

  it('should preserve property descriptors behavior', () => {
    const instance = new SimpleClass();
    const result = toPlainObject(instance);
    
    // All properties should be enumerable, writable, and configurable in the result
    const descriptor = Object.getOwnPropertyDescriptor(result, 'stringProp');
    expect(descriptor?.enumerable).toBe(true);
    expect(descriptor?.writable).toBe(true);
    expect(descriptor?.configurable).toBe(true);
  });
});