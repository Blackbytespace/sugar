import { describe, it, expect } from 'vitest';
import methodExists from './methodExists.js';

describe('shared.class.methodExists', () => {
  class TestClass {
    property: string = 'value';
    
    method1() {
      return 'method1';
    }
    
    method2() {
      return 'method2';
    }
    
    get getter() {
      return 'getter';
    }
    
    set setter(value: string) {
      // setter
    }
  }

  class EmptyClass {}

  it('should return true when all methods exist', () => {
    const instance = new TestClass();
    const result = methodExists(instance, ['method1', 'method2']);
    
    expect(result).toBe(true);
  });

  it('should return array of missing methods when some methods do not exist', () => {
    const instance = new TestClass();
    const result = methodExists(instance, ['method1', 'nonExistentMethod', 'method2', 'anotherMissing']);
    
    expect(result).toEqual(['nonExistentMethod', 'anotherMissing']);
  });

  it('should return array of missing methods when no methods exist', () => {
    const instance = new TestClass();
    const result = methodExists(instance, ['nonExistent1', 'nonExistent2']);
    
    expect(result).toEqual(['nonExistent1', 'nonExistent2']);
  });

  it('should handle single method check', () => {
    const instance = new TestClass();
    
    expect(methodExists(instance, ['method1'])).toBe(true);
    expect(methodExists(instance, ['nonExistent'])).toEqual(['nonExistent']);
  });

  it('should handle empty methods array', () => {
    const instance = new TestClass();
    const result = methodExists(instance, []);
    
    expect(result).toBe(true);
  });

  it('should handle inherited methods', () => {
    class BaseClass {
      baseMethod() {
        return 'base';
      }
    }
    
    class DerivedClass extends BaseClass {
      derivedMethod() {
        return 'derived';
      }
    }
    
    const instance = new DerivedClass();
    
    expect(methodExists(instance, ['baseMethod', 'derivedMethod'])).toBe(true);
    expect(methodExists(instance, ['baseMethod', 'nonExistent'])).toEqual(['nonExistent']);
  });

  it('should handle built-in methods', () => {
    const instance = new TestClass();
    
    expect(methodExists(instance, ['toString', 'valueOf'])).toBe(true);
    expect(methodExists(instance, ['constructor'])).toBe(true);
  });

  it('should not consider properties as methods', () => {
    const instance = new TestClass();
    const result = methodExists(instance, ['property']);
    
    expect(result).toEqual(['property']);
  });

  it('should handle getters (might be treated as properties)', () => {
    const instance = new TestClass();
    
    // Getters are properties, not functions
    const result = methodExists(instance, ['getter']);
    
    expect(result).toEqual(['getter']);
  });

  it('should handle setters (might be treated as properties)', () => {
    const instance = new TestClass();
    
    // Setters are properties, not functions
    const result = methodExists(instance, ['setter']);
    
    expect(result).toEqual(['setter']);
  });

  it('should handle objects with function properties', () => {
    const obj = {
      prop: 'value',
      method: function() {
        return 'method';
      }
    };
    
    expect(methodExists(obj, ['method'])).toBe(true);
    expect(methodExists(obj, ['prop'])).toEqual(['prop']);
  });

  it('should handle arrow functions', () => {
    const obj = {
      arrowMethod: () => 'arrow',
      normalMethod: function() {
        return 'normal';
      }
    };
    
    expect(methodExists(obj, ['arrowMethod', 'normalMethod'])).toBe(true);
  });

  it('should handle null instance', () => {
    expect(() => methodExists(null, ['method'])).toThrow();
  });

  it('should handle undefined instance', () => {
    expect(() => methodExists(undefined, ['method'])).toThrow();
  });

  it('should handle arrays', () => {
    const array = [1, 2, 3];
    
    expect(methodExists(array, ['push', 'pop'])).toBe(true);
    expect(methodExists(array, ['nonExistent'])).toEqual(['nonExistent']);
  });

  it('should handle functions', () => {
    function testFunction() {
      return 'test';
    }
    
    expect(methodExists(testFunction, ['call', 'apply', 'bind'])).toBe(true);
  });

  it('should handle primitive values with methods', () => {
    const str = 'hello';
    const num = 42;
    
    expect(methodExists(str, ['charAt', 'slice'])).toBe(true);
    expect(methodExists(num, ['toString'])).toBe(true);
  });

  it('should handle Date objects', () => {
    const date = new Date();
    
    expect(methodExists(date, ['getTime', 'getFullYear'])).toBe(true);
    expect(methodExists(date, ['nonExistent'])).toEqual(['nonExistent']);
  });

  it('should handle RegExp objects', () => {
    const regex = /test/;
    
    expect(methodExists(regex, ['test', 'exec'])).toBe(true);
  });

  it('should handle methods added dynamically', () => {
    const instance = new TestClass();
    (instance as any).dynamicMethod = function() {
      return 'dynamic';
    };
    
    expect(methodExists(instance, ['method1', 'dynamicMethod'])).toBe(true);
  });

  it('should handle class with no methods', () => {
    const instance = new EmptyClass();
    
    // Should have inherited methods like constructor, toString
    expect(methodExists(instance, ['constructor'])).toBe(true);
    expect(methodExists(instance, ['nonExistent'])).toEqual(['nonExistent']);
  });

  it('should be case sensitive', () => {
    const instance = new TestClass();
    
    expect(methodExists(instance, ['method1'])).toBe(true);
    expect(methodExists(instance, ['Method1'])).toEqual(['Method1']);
    expect(methodExists(instance, ['METHOD1'])).toEqual(['METHOD1']);
  });

  it('should handle special characters in method names', () => {
    const obj = {
      '$method': function() { return '$'; },
      '_method': function() { return '_'; },
      'method$': function() { return 'end$'; }
    };
    
    expect(methodExists(obj, ['$method', '_method', 'method$'])).toBe(true);
  });

  it('should handle numeric method names', () => {
    const obj = {
      1: function() { return '1'; },
      '2': function() { return '2'; }
    };
    
    expect(methodExists(obj, ['1', '2'])).toBe(true);
  });

  it('should maintain order of missing methods', () => {
    const instance = new TestClass();
    const result = methodExists(instance, ['missing1', 'method1', 'missing2', 'missing3']);
    
    expect(result).toEqual(['missing1', 'missing2', 'missing3']);
  });

  it('should handle Symbol properties (if supported)', () => {
    const symbolMethod = Symbol('symbolMethod');
    const obj = {
      [symbolMethod]: function() {
        return 'symbol';
      },
      normalMethod: function() {
        return 'normal';
      }
    };
    
    // Symbol keys are usually not accessible by string names
    expect(methodExists(obj, ['normalMethod'])).toBe(true);
    expect(methodExists(obj, [symbolMethod.toString()])).toEqual([symbolMethod.toString()]);
  });

  it('should handle bound methods', () => {
    class BoundClass {
      value: string = 'bound';
      
      getValue() {
        return this.value;
      }
    }
    
    const instance = new BoundClass();
    const boundMethod = instance.getValue.bind(instance);
    (instance as any).boundMethod = boundMethod;
    
    expect(methodExists(instance, ['getValue', 'boundMethod'])).toBe(true);
  });
});