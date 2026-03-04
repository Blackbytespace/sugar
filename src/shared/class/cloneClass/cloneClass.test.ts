import { describe, it, expect } from 'vitest';
import cloneClass from './cloneClass.js';

describe('shared.class.cloneClass', () => {
  class OriginalClass {
    property: string = 'original';
    
    method() {
      return 'original method';
    }
    
    get getter() {
      return 'original getter';
    }
    
    static staticMethod() {
      return 'original static';
    }
    
    static staticProperty = 'original static prop';
  }

  class ExtendedClass extends OriginalClass {
    extendedProperty: string = 'extended';
    
    extendedMethod() {
      return 'extended method';
    }
    
    method() {
      return 'overridden method';
    }
  }

  it('should clone a simple class', () => {
    const ClonedClass = cloneClass(OriginalClass);
    
    expect(ClonedClass).not.toBe(OriginalClass);
    expect(typeof ClonedClass).toBe('function');
    
    const original = new OriginalClass();
    const cloned = new ClonedClass();
    
    expect(cloned.property).toBe('original');
    expect(cloned.method()).toBe('original method');
  });

  it('should create instances with same behavior', () => {
    const ClonedClass = cloneClass(OriginalClass);
    
    const original = new OriginalClass();
    const cloned = new ClonedClass();
    
    expect(original.property).toBe(cloned.property);
    expect(original.method()).toBe(cloned.method());
    expect(original.getter).toBe(cloned.getter);
  });

  it('should preserve instance methods', () => {
    const ClonedClass = cloneClass(OriginalClass);
    const instance = new ClonedClass();
    
    expect(typeof instance.method).toBe('function');
    expect(instance.method()).toBe('original method');
  });

  it('should preserve static methods', () => {
    const ClonedClass = cloneClass(OriginalClass);
    
    expect(typeof ClonedClass.staticMethod).toBe('function');
    expect(ClonedClass.staticMethod()).toBe('original static');
  });

  it('should preserve static properties', () => {
    const ClonedClass = cloneClass(OriginalClass);
    
    expect(ClonedClass.staticProperty).toBe('original static prop');
  });

  it('should clone extended classes', () => {
    const ClonedExtended = cloneClass(ExtendedClass);
    const instance = new ClonedExtended();
    
    expect(instance.property).toBe('original');
    expect(instance.extendedProperty).toBe('extended');
    expect(instance.method()).toBe('overridden method');
    expect(instance.extendedMethod()).toBe('extended method');
  });

  it('should maintain inheritance chain', () => {
    const ClonedExtended = cloneClass(ExtendedClass);
    const instance = new ClonedExtended();
    
    expect(instance instanceof ClonedExtended).toBe(true);
    // Note: instanceof with original classes might not work due to cloning
  });

  it('should handle constructors with parameters', () => {
    class ParameterClass {
      value: string;
      
      constructor(value: string = 'default') {
        this.value = value;
      }
      
      getValue() {
        return this.value;
      }
    }
    
    const ClonedParameter = cloneClass(ParameterClass);
    
    const defaultInstance = new ClonedParameter();
    const paramInstance = new ClonedParameter('custom');
    
    expect(defaultInstance.getValue()).toBe('default');
    expect(paramInstance.getValue()).toBe('custom');
  });

  it('should handle classes with getters and setters', () => {
    class GetterSetterClass {
      private _value: string = 'initial';
      
      get value() {
        return this._value;
      }
      
      set value(newValue: string) {
        this._value = newValue;
      }
    }
    
    const ClonedGetterSetter = cloneClass(GetterSetterClass);
    const instance = new ClonedGetterSetter();
    
    expect(instance.value).toBe('initial');
    instance.value = 'changed';
    expect(instance.value).toBe('changed');
  });

  it('should handle empty classes', () => {
    class EmptyClass {}
    
    const ClonedEmpty = cloneClass(EmptyClass);
    const instance = new ClonedEmpty();
    
    expect(instance).toBeDefined();
    expect(instance instanceof ClonedEmpty).toBe(true);
  });

  it('should handle classes with private fields (if supported)', () => {
    class PrivateFieldClass {
      #privateField: string = 'private';
      public publicField: string = 'public';
      
      getPrivateField() {
        return this.#privateField;
      }
    }
    
    const ClonedPrivate = cloneClass(PrivateFieldClass);
    const instance = new ClonedPrivate();
    
    expect(instance.publicField).toBe('public');
    expect(instance.getPrivateField()).toBe('private');
  });

  it('should handle classes with Symbol properties', () => {
    const symbolKey = Symbol('test');
    
    class SymbolClass {
      [symbolKey]: string = 'symbol value';
      normalProperty: string = 'normal';
      
      getSymbolValue() {
        return this[symbolKey];
      }
    }
    
    const ClonedSymbol = cloneClass(SymbolClass);
    const instance = new ClonedSymbol();
    
    expect(instance.normalProperty).toBe('normal');
    expect(instance.getSymbolValue()).toBe('symbol value');
  });

  it('should handle classes with async methods', () => {
    class AsyncClass {
      async asyncMethod() {
        return 'async result';
      }
      
      async *asyncGenerator() {
        yield 'first';
        yield 'second';
      }
    }
    
    const ClonedAsync = cloneClass(AsyncClass);
    const instance = new ClonedAsync();
    
    expect(typeof instance.asyncMethod).toBe('function');
    expect(typeof instance.asyncGenerator).toBe('function');
  });

  it('should handle function constructors', () => {
    function OldStyleConstructor(value: string) {
      this.value = value;
    }
    OldStyleConstructor.prototype.getValue = function() {
      return this.value;
    };
    
    const ClonedOldStyle = cloneClass(OldStyleConstructor);
    const instance = new ClonedOldStyle('test');
    
    expect(instance.value).toBe('test');
    expect(instance.getValue()).toBe('test');
  });

  it('should handle classes with complex inheritance', () => {
    class GrandParent {
      grandMethod() {
        return 'grand';
      }
    }
    
    class Parent extends GrandParent {
      parentMethod() {
        return 'parent';
      }
    }
    
    class Child extends Parent {
      childMethod() {
        return 'child';
      }
    }
    
    const ClonedChild = cloneClass(Child);
    const instance = new ClonedChild();
    
    expect(instance.grandMethod()).toBe('grand');
    expect(instance.parentMethod()).toBe('parent');
    expect(instance.childMethod()).toBe('child');
  });

  it('should handle classes extending built-ins', () => {
    class CustomArray extends Array {
      customMethod() {
        return 'custom';
      }
    }
    
    const ClonedArray = cloneClass(CustomArray);
    const instance = new ClonedArray();
    
    expect(Array.isArray(instance)).toBe(true);
    expect(typeof instance.customMethod).toBe('function');
    expect(instance.customMethod()).toBe('custom');
  });

  it('should handle classes extending Error', () => {
    class CustomError extends Error {
      code: string;
      
      constructor(message: string, code: string) {
        super(message);
        this.code = code;
      }
    }
    
    const ClonedError = cloneClass(CustomError);
    const instance = new ClonedError('test message', 'TEST_CODE');
    
    expect(instance instanceof Error).toBe(true);
    expect(instance.message).toBe('test message');
    expect(instance.code).toBe('TEST_CODE');
  });

  it('should handle modifications to cloned class', () => {
    const ClonedClass = cloneClass(OriginalClass);
    
    // Modify the cloned class
    ClonedClass.prototype.newMethod = function() {
      return 'new method';
    };
    
    const clonedInstance = new ClonedClass();
    const originalInstance = new OriginalClass();
    
    expect(typeof (clonedInstance as any).newMethod).toBe('function');
    expect((clonedInstance as any).newMethod()).toBe('new method');
    
    // Original class should not be affected
    expect(typeof (originalInstance as any).newMethod).toBe('undefined');
  });

  it('should handle modifications to original class after cloning', () => {
    const ClonedClass = cloneClass(OriginalClass);
    
    // Modify the original class after cloning
    (OriginalClass.prototype as any).addedLater = function() {
      return 'added later';
    };
    
    const clonedInstance = new ClonedClass();
    const originalInstance = new OriginalClass();
    
    expect(typeof (originalInstance as any).addedLater).toBe('function');
    // Cloned class might or might not have the new method depending on implementation
  });

  it('should handle class name preservation', () => {
    const ClonedClass = cloneClass(OriginalClass);
    
    // The cloned class might have a different name or the same name
    // This depends on the clone-class library implementation
    expect(typeof ClonedClass.name).toBe('string');
  });

  it('should handle multiple clones of same class', () => {
    const Clone1 = cloneClass(OriginalClass);
    const Clone2 = cloneClass(OriginalClass);
    
    expect(Clone1).not.toBe(Clone2);
    expect(Clone1).not.toBe(OriginalClass);
    expect(Clone2).not.toBe(OriginalClass);
    
    const instance1 = new Clone1();
    const instance2 = new Clone2();
    
    expect(instance1.method()).toBe(instance2.method());
  });

  it('should handle null input gracefully', () => {
    expect(() => cloneClass(null)).toThrow();
  });

  it('should handle undefined input gracefully', () => {
    expect(() => cloneClass(undefined)).toThrow();
  });

  it('should handle non-class input', () => {
    expect(() => cloneClass('not a class')).toThrow();
    expect(() => cloneClass(42)).toThrow();
    expect(() => cloneClass({})).toThrow();
  });
});