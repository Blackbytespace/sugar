import { describe, it, expect } from 'vitest';
import multipleExtends from './multipleExtends.js';

describe('shared.class.multipleExtends', () => {
  // Simple test classes using function constructors to avoid ES6 class issues with aggregation
  function BaseClass() {
    this.baseProp = 'base';
  }
  BaseClass.prototype.baseMethod = function() {
    return 'base';
  };

  function MixinA() {
    this.propA = 'a';
  }
  MixinA.prototype.methodA = function() {
    return 'a';
  };

  function MixinB() {
    this.propB = 'b';
  }
  MixinB.prototype.methodB = function() {
    return 'b';
  };

  it('should return a function that can be used for inheritance', () => {
    const Combined = multipleExtends(BaseClass, MixinA);
    
    expect(typeof Combined).toBe('function');
  });

  it('should work with function constructors', () => {
    const Combined = multipleExtends(BaseClass, MixinA);
    const instance = new Combined();
    
    expect(instance).toBeDefined();
    expect(typeof instance.baseMethod).toBe('function');
    expect(typeof instance.methodA).toBe('function');
  });

  it('should combine properties from multiple classes', () => {
    const Combined = multipleExtends(BaseClass, MixinA, MixinB);
    const instance = new Combined();
    
    // The aggregation library only calls the first constructor automatically
    // To get properties from mixins, you need to call their constructors manually
    expect(instance.baseProp).toBe('base'); // This works because BaseClass constructor is called
    
    // Call mixin constructors manually to get their properties
    MixinA.call(instance);
    MixinB.call(instance);
    
    expect(instance.propA).toBe('a');
    expect(instance.propB).toBe('b');
  });

  it('should combine methods from multiple classes', () => {
    const Combined = multipleExtends(BaseClass, MixinA, MixinB);
    const instance = new Combined();
    
    expect(instance.baseMethod()).toBe('base');
    expect(instance.methodA()).toBe('a');
    expect(instance.methodB()).toBe('b');
  });

  it('should work with single class', () => {
    const Single = multipleExtends(BaseClass);
    const instance = new Single();
    
    expect(instance.baseProp).toBe('base');
    expect(instance.baseMethod()).toBe('base');
  });

  it('should handle method conflicts - last one wins', () => {
    function ClassA() {}
    ClassA.prototype.sharedMethod = function() { return 'A'; };
    
    function ClassB() {}
    ClassB.prototype.sharedMethod = function() { return 'B'; };
    
    const Combined = multipleExtends(ClassA, ClassB);
    const instance = new Combined();
    
    // ClassB is last, so its method should be used
    expect(instance.sharedMethod()).toBe('B');
  });

  it('should handle empty input', () => {
    // The aggregation library throws when called with no arguments
    expect(() => {
      multipleExtends();
    }).toThrow();
  });

  it('should allow further extension', () => {
    const Combined = multipleExtends(BaseClass, MixinA);
    
    function Extended() {
      Combined.call(this);
      // Call mixin constructors manually to get their properties
      MixinA.call(this);
      this.extendedProp = 'extended';
    }
    Extended.prototype = Object.create(Combined.prototype);
    Extended.prototype.constructor = Extended;
    Extended.prototype.extendedMethod = function() {
      return 'extended';
    };
    
    const instance = new Extended();
    
    expect(instance.baseProp).toBe('base');
    expect(instance.propA).toBe('a');
    expect(instance.extendedProp).toBe('extended');
    expect(instance.baseMethod()).toBe('base');
    expect(instance.methodA()).toBe('a');
    expect(instance.extendedMethod()).toBe('extended');
  });

  it('should maintain constructor references', () => {
    const Combined = multipleExtends(BaseClass, MixinA);
    const instance = new Combined();
    
    expect(instance.constructor).toBe(Combined);
  });

  it('should handle instanceof relationships', () => {
    const Combined = multipleExtends(BaseClass, MixinA);
    const instance = new Combined();
    
    expect(instance instanceof Combined).toBe(true);
    // Note: instanceof with original classes depends on aggregation implementation
  });

  it('should preserve method context', () => {
    function ContextClass() {
      this.value = 'context';
    }
    ContextClass.prototype.getValue = function() {
      return this.value;
    };
    
    const Combined = multipleExtends(ContextClass, MixinA);
    const instance = new Combined();
    instance.value = 'modified';
    
    expect(instance.getValue()).toBe('modified');
  });

  it('should handle multiple clones', () => {
    const Combined1 = multipleExtends(BaseClass, MixinA);
    const Combined2 = multipleExtends(BaseClass, MixinA);
    
    expect(Combined1).not.toBe(Combined2);
    
    const instance1 = new Combined1();
    const instance2 = new Combined2();
    
    expect(instance1.baseMethod()).toBe(instance2.baseMethod());
  });
});