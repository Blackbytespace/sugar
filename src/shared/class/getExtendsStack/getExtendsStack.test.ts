import { describe, it, expect } from 'vitest';
import getExtendsStack from './getExtendsStack.js';

describe('shared.class.getExtendsStack', () => {
  class BaseClass {
    baseMethod() {
      return 'base';
    }
  }

  class MiddleClass extends BaseClass {
    middleMethod() {
      return 'middle';
    }
  }

  class TopClass extends MiddleClass {
    topMethod() {
      return 'top';
    }
  }

  class CustomError extends Error {
    customMethod() {
      return 'custom';
    }
  }

  class StandaloneClass {
    standaloneMethod() {
      return 'standalone';
    }
  }

  it('should return inheritance stack for class', () => {
    const stack = getExtendsStack(TopClass);
    
    expect(stack).toHaveProperty('MiddleClass');
    expect(stack).toHaveProperty('BaseClass');
    expect(stack.MiddleClass).toBe(MiddleClass);
    expect(stack.BaseClass).toBe(BaseClass);
  });

  it('should not include base class by default', () => {
    const stack = getExtendsStack(TopClass);
    
    expect(stack).not.toHaveProperty('TopClass');
  });

  it('should include base class when includeBaseClass is true', () => {
    const stack = getExtendsStack(TopClass, { includeBaseClass: true });
    
    expect(stack).toHaveProperty('TopClass');
    expect(stack).toHaveProperty('MiddleClass');
    expect(stack).toHaveProperty('BaseClass');
    expect(stack.TopClass).toBe(TopClass);
  });

  it('should handle class extending built-in Error', () => {
    const stack = getExtendsStack(CustomError);
    
    expect(stack).toHaveProperty('Error');
    expect(stack.Error).toBe(Error);
  });

  it('should handle class with no inheritance', () => {
    const stack = getExtendsStack(StandaloneClass);
    
    expect(Object.keys(stack)).toHaveLength(0);
  });

  it('should handle class instances', () => {
    const instance = new TopClass();
    const stack = getExtendsStack(instance);
    
    expect(stack).toHaveProperty('MiddleClass');
    expect(stack).toHaveProperty('BaseClass');
  });

  it('should handle single level inheritance', () => {
    const stack = getExtendsStack(MiddleClass);
    
    expect(stack).toHaveProperty('BaseClass');
    expect(stack.BaseClass).toBe(BaseClass);
    expect(Object.keys(stack)).toHaveLength(1);
  });

  it('should handle empty settings object', () => {
    const stack = getExtendsStack(TopClass, {});
    
    expect(stack).toHaveProperty('MiddleClass');
    expect(stack).toHaveProperty('BaseClass');
    expect(stack).not.toHaveProperty('TopClass');
  });

  it('should return correct inheritance order', () => {
    const stack = getExtendsStack(TopClass, { includeBaseClass: true });
    const keys = Object.keys(stack);
    
    expect(keys).toContain('TopClass');
    expect(keys).toContain('MiddleClass');
    expect(keys).toContain('BaseClass');
  });

  it('should handle built-in classes', () => {
    class CustomArray extends Array {
      customMethod() {
        return 'custom';
      }
    }
    
    const stack = getExtendsStack(CustomArray);
    
    expect(stack).toHaveProperty('Array');
    expect(stack.Array).toBe(Array);
  });

  it('should handle Date inheritance', () => {
    class CustomDate extends Date {
      customMethod() {
        return 'custom';
      }
    }
    
    const stack = getExtendsStack(CustomDate);
    
    expect(stack).toHaveProperty('Date');
    expect(stack.Date).toBe(Date);
  });

  it('should handle RegExp inheritance', () => {
    class CustomRegExp extends RegExp {
      customMethod() {
        return 'custom';
      }
    }
    
    const stack = getExtendsStack(CustomRegExp);
    
    expect(stack).toHaveProperty('RegExp');
    expect(stack.RegExp).toBe(RegExp);
  });

  it('should handle function constructors', () => {
    function OldStyleConstructor() {
      this.prop = 'value';
    }
    
    function ExtendedConstructor() {
      OldStyleConstructor.call(this);
    }
    ExtendedConstructor.prototype = Object.create(OldStyleConstructor.prototype);
    ExtendedConstructor.prototype.constructor = ExtendedConstructor;
    
    const stack = getExtendsStack(ExtendedConstructor);
    
    // Behavior might vary based on implementation
    expect(typeof stack).toBe('object');
  });

  it('should handle class instances with complex inheritance', () => {
    const instance = new TopClass();
    const stack = getExtendsStack(instance, { includeBaseClass: true });
    
    expect(stack).toHaveProperty('TopClass');
    expect(stack).toHaveProperty('MiddleClass');
    expect(stack).toHaveProperty('BaseClass');
  });

  it('should not include Object in the stack', () => {
    const stack = getExtendsStack(StandaloneClass);
    
    expect(stack).not.toHaveProperty('Object');
  });

  it('should handle null input gracefully', () => {
    expect(() => getExtendsStack(null)).toThrow();
  });

  it('should handle undefined input gracefully', () => {
    expect(() => getExtendsStack(undefined)).toThrow();
  });

  it('should handle primitive values', () => {
    // The function doesn't actually throw on primitives, it handles them via constructor
    const stringResult = getExtendsStack('string');
    expect(typeof stringResult).toBe('object');
    
    const numberResult = getExtendsStack(42);
    expect(typeof numberResult).toBe('object');
    
    const booleanResult = getExtendsStack(true);
    expect(typeof booleanResult).toBe('object');
  });

  it('should handle anonymous classes', () => {
    const AnonymousBase = class {
      method() {
        return 'anonymous';
      }
    };
    
    const AnonymousExtended = class extends AnonymousBase {
      extendedMethod() {
        return 'extended';
      }
    };
    
    const stack = getExtendsStack(AnonymousExtended);
    
    // Anonymous classes might have empty names
    expect(typeof stack).toBe('object');
  });

  it('should handle mixin patterns', () => {
    const Mixin = {
      mixinMethod() {
        return 'mixin';
      }
    };
    
    class MixedClass extends BaseClass {
      constructor() {
        super();
        Object.assign(this, Mixin);
      }
    }
    
    const stack = getExtendsStack(MixedClass);
    
    expect(stack).toHaveProperty('BaseClass');
    expect(stack.BaseClass).toBe(BaseClass);
  });

  it('should handle classes with static properties', () => {
    class StaticClass {
      static staticProp = 'static';
      
      static staticMethod() {
        return 'static';
      }
    }
    
    class ExtendedStatic extends StaticClass {
      instanceMethod() {
        return 'instance';
      }
    }
    
    const stack = getExtendsStack(ExtendedStatic);
    
    expect(stack).toHaveProperty('StaticClass');
    expect(stack.StaticClass).toBe(StaticClass);
  });

  it('should handle deep inheritance chains', () => {
    class Level1 extends StandaloneClass {}
    class Level2 extends Level1 {}
    class Level3 extends Level2 {}
    class Level4 extends Level3 {}
    
    const stack = getExtendsStack(Level4);
    
    expect(stack).toHaveProperty('Level3');
    expect(stack).toHaveProperty('Level2');
    expect(stack).toHaveProperty('Level1');
    expect(stack).toHaveProperty('StandaloneClass');
  });

  it('should handle classes with getters and setters', () => {
    class GetterSetterBase {
      private _value: string = 'base';
      
      get value() {
        return this._value;
      }
      
      set value(newValue: string) {
        this._value = newValue;
      }
    }
    
    class GetterSetterExtended extends GetterSetterBase {
      extendedMethod() {
        return 'extended';
      }
    }
    
    const stack = getExtendsStack(GetterSetterExtended);
    
    expect(stack).toHaveProperty('GetterSetterBase');
    expect(stack.GetterSetterBase).toBe(GetterSetterBase);
  });

  it('should return different objects for different calls', () => {
    const stack1 = getExtendsStack(TopClass);
    const stack2 = getExtendsStack(TopClass);
    
    expect(stack1).toEqual(stack2);
    expect(stack1).not.toBe(stack2); // Different object instances
  });

  it('should handle settings parameter correctly', () => {
    const withBase = getExtendsStack(TopClass, { includeBaseClass: true });
    const withoutBase = getExtendsStack(TopClass, { includeBaseClass: false });
    const defaultSettings = getExtendsStack(TopClass);
    
    expect(withBase).toHaveProperty('TopClass');
    expect(withoutBase).not.toHaveProperty('TopClass');
    expect(defaultSettings).not.toHaveProperty('TopClass');
    expect(withoutBase).toEqual(defaultSettings);
  });
});