import { describe, it, expect, vi } from 'vitest';
import proxyArray from './proxyArray.js';

describe('shared.array.proxyArray', () => {
  it('should return a proxied array with watch methods', () => {
    const array = [1, 2, 3];
    const proxied = proxyArray(array);
    
    expect(proxied).toBe(array); // same reference
    expect(typeof proxied.watch).toBe('function');
    expect(typeof proxied.unwatch).toBe('function');
    expect(proxied.__$proxied).toBe(true);
  });

  it('should not proxy array multiple times', () => {
    const array = [1, 2, 3];
    const proxied1 = proxyArray(array);
    const proxied2 = proxyArray(proxied1);
    
    expect(proxied1).toBe(proxied2);
  });

  it('should call watch handler when push method is called', () => {
    const array = [1, 2, 3];
    const proxied = proxyArray(array);
    const handler = vi.fn();
    
    proxied.watch(['push'], handler);
    proxied.push(4);
    
    expect(handler).toHaveBeenCalledTimes(1);
    const callArgs = handler.mock.calls[0][0];
    expect(callArgs.action).toBe('push');
    expect(callArgs.oldValue).toEqual([1, 2, 3]);
    expect(callArgs.value).toEqual([1, 2, 3, 4]);
    expect(callArgs.args).toEqual([4]);
    expect(callArgs.returnedValue).toBe(4); // push returns new length
  });

  it('should call watch handler when pop method is called', () => {
    const array = [1, 2, 3];
    const proxied = proxyArray(array);
    const handler = vi.fn();
    
    proxied.watch(['pop'], handler);
    const result = proxied.pop();
    
    expect(handler).toHaveBeenCalledTimes(1);
    expect(result).toBe(3);
    const callArgs = handler.mock.calls[0][0];
    expect(callArgs.action).toBe('pop');
    expect(callArgs.oldValue).toEqual([1, 2, 3]);
    expect(callArgs.value).toEqual([1, 2]);
    expect(callArgs.returnedValue).toBe(3);
  });

  it('should watch multiple methods', () => {
    const array = [1, 2, 3];
    const proxied = proxyArray(array);
    const handler = vi.fn();
    
    proxied.watch(['push', 'pop'], handler);
    
    proxied.push(4);
    proxied.pop();
    
    expect(handler).toHaveBeenCalledTimes(2);
    expect(handler.mock.calls[0][0].action).toBe('push');
    expect(handler.mock.calls[1][0].action).toBe('pop');
  });

  it('should not call handler for unwatched methods', () => {
    const array = [1, 2, 3];
    const proxied = proxyArray(array);
    const handler = vi.fn();
    
    proxied.watch(['push'], handler);
    proxied.pop(); // not watched
    
    expect(handler).not.toHaveBeenCalled();
  });

  it('should support multiple watchers', () => {
    const array = [1, 2, 3];
    const proxied = proxyArray(array);
    const handler1 = vi.fn();
    const handler2 = vi.fn();
    
    proxied.watch(['push'], handler1);
    proxied.watch(['push'], handler2);
    
    proxied.push(4);
    
    expect(handler1).toHaveBeenCalledTimes(1);
    expect(handler2).toHaveBeenCalledTimes(1);
  });

  it('should return watchId that can be used to unwatch', () => {
    const array = [1, 2, 3];
    const proxied = proxyArray(array);
    const handler = vi.fn();
    
    const watchId = proxied.watch(['push'], handler);
    expect(typeof watchId).toBe('string');
    expect(watchId).toMatch(/^s-\d+-\d+$/);
    
    proxied.push(4);
    expect(handler).toHaveBeenCalledTimes(1);
    
    proxied.unwatch(watchId);
    proxied.push(5);
    expect(handler).toHaveBeenCalledTimes(1); // not called again
  });

  it('should work with splice method', () => {
    const array = [1, 2, 3, 4, 5];
    const proxied = proxyArray(array);
    const handler = vi.fn();
    
    proxied.watch(['splice'], handler);
    const result = proxied.splice(1, 2, 'a', 'b');
    
    expect(handler).toHaveBeenCalledTimes(1);
    expect(result).toEqual([2, 3]); // removed elements
    const callArgs = handler.mock.calls[0][0];
    expect(callArgs.action).toBe('splice');
    expect(callArgs.oldValue).toEqual([1, 2, 3, 4, 5]);
    expect(callArgs.value).toEqual([1, 'a', 'b', 4, 5]);
    expect(callArgs.args).toEqual([1, 2, 'a', 'b']);
  });

  it('should work with sort method', () => {
    const array = [3, 1, 2];
    const proxied = proxyArray(array);
    const handler = vi.fn();
    
    proxied.watch(['sort'], handler);
    proxied.sort();
    
    expect(handler).toHaveBeenCalledTimes(1);
    const callArgs = handler.mock.calls[0][0];
    expect(callArgs.action).toBe('sort');
    expect(callArgs.oldValue).toEqual([3, 1, 2]);
    expect(callArgs.value).toEqual([1, 2, 3]);
  });

  it('should work with reverse method', () => {
    const array = [1, 2, 3];
    const proxied = proxyArray(array);
    const handler = vi.fn();
    
    proxied.watch(['reverse'], handler);
    proxied.reverse();
    
    expect(handler).toHaveBeenCalledTimes(1);
    const callArgs = handler.mock.calls[0][0];
    expect(callArgs.action).toBe('reverse');
    expect(callArgs.oldValue).toEqual([1, 2, 3]);
    expect(callArgs.value).toEqual([3, 2, 1]);
  });

  it('should handle empty array', () => {
    const array: any[] = [];
    const proxied = proxyArray(array);
    const handler = vi.fn();
    
    proxied.watch(['push'], handler);
    proxied.push(1);
    
    expect(handler).toHaveBeenCalledTimes(1);
    const callArgs = handler.mock.calls[0][0];
    expect(callArgs.oldValue).toEqual([]);
    expect(callArgs.value).toEqual([1]);
  });

  it('should handle multiple arguments in watched method', () => {
    const array = [1];
    const proxied = proxyArray(array);
    const handler = vi.fn();
    
    proxied.watch(['push'], handler);
    proxied.push(2, 3, 4);
    
    expect(handler).toHaveBeenCalledTimes(1);
    const callArgs = handler.mock.calls[0][0];
    expect(callArgs.args).toEqual([2, 3, 4]);
    expect(callArgs.value).toEqual([1, 2, 3, 4]);
  });

  it('should preserve original array functionality', () => {
    const array = [1, 2, 3];
    const proxied = proxyArray(array);
    
    // Test that basic array operations still work
    expect(proxied.length).toBe(3);
    expect(proxied[0]).toBe(1);
    expect(proxied.indexOf(2)).toBe(1);
    expect(proxied.includes(3)).toBe(true);
  });
});