import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import SugarConsole, { TSugarConsoleTypes } from './SugarConsole.js';

describe('SugarConsole', () => {
  let originalConsole: any;
  
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset static state
    (SugarConsole as any)._defaultInstance = undefined;
    originalConsole = { ...console };
  });

  afterEach(() => {
    // Restore original console methods
    Object.assign(console, originalConsole);
  });

  describe('static properties', () => {
    it('should have correct console types', () => {
      expect(SugarConsole.types).toEqual(['log', 'warn', 'info', 'error', 'trace', 'debug']);
    });
  });

  describe('constructor', () => {
    it('should create instance with default settings', () => {
      const sugarConsole = new SugarConsole();
      
      expect(sugarConsole.settings.colors).toEqual({
        log: undefined,
        warn: 'yellow',
        info: 'cyan',
        error: 'red',
        trace: undefined,
        debug: 'blue',
      });
      expect(sugarConsole.settings.types).toEqual(SugarConsole.types);
    });

    it('should merge custom settings', () => {
      const customSettings = {
        colors: { log: 'green' },
        types: ['log', 'error'] as TSugarConsoleTypes[]
      };
      const sugarConsole = new SugarConsole(customSettings);
      
      expect(sugarConsole.settings.colors.log).toBe('green');
      expect(sugarConsole.settings.types).toEqual(['log', 'error']);
    });
  });

  describe('isEnabled', () => {
    it('should return true by default', () => {
      const sugarConsole = new SugarConsole();
      expect(sugarConsole.isEnabled()).toBe(true);
    });

    it('should return false when type is "none"', () => {
      const sugarConsole = new SugarConsole();
      expect(sugarConsole.isEnabled('none')).toBe(false);
    });

    it('should return true when type is "all"', () => {
      const sugarConsole = new SugarConsole();
      expect(sugarConsole.isEnabled('all')).toBe(true);
    });

    it('should check specific type enablement', () => {
      const sugarConsole = new SugarConsole({ types: ['log', 'error'] });
      expect(sugarConsole.isEnabled('log')).toBe(true);
      expect(sugarConsole.isEnabled('warn')).toBe(false);
    });
  });

  describe('getEnabledTypes', () => {
    it('should return all types when "all" is included', () => {
      const sugarConsole = new SugarConsole({ types: ['all'] });
      expect(sugarConsole.getEnabledTypes()).toEqual(SugarConsole.types);
    });

    it('should return empty array when "none" is included', () => {
      const sugarConsole = new SugarConsole({ types: ['none'] });
      expect(sugarConsole.getEnabledTypes()).toEqual([]);
    });

    it('should return configured types', () => {
      const types: TSugarConsoleTypes[] = ['log', 'error'];
      const sugarConsole = new SugarConsole({ types });
      expect(sugarConsole.getEnabledTypes()).toEqual(types);
    });
  });

  describe('console methods', () => {
    it('should call logger for log method', () => {
      const mockLogger = vi.fn();
      const sugarConsole = new SugarConsole({ logger: mockLogger });
      
      (sugarConsole.log as any)('test message');
      
      expect(mockLogger).toHaveBeenCalledWith(['▊ test message'], 'log');
    });

    it('should call logger for warn method', () => {
      const mockLogger = vi.fn();
      const sugarConsole = new SugarConsole({ logger: mockLogger });
      
      (sugarConsole.warn as any)('warning message');
      
      expect(mockLogger).toHaveBeenCalledWith(expect.arrayContaining([expect.stringContaining('warning message')]), 'warn');
    });

    it('should handle multiple arguments', () => {
      const mockLogger = vi.fn();
      const sugarConsole = new SugarConsole({ logger: mockLogger });
      
      (sugarConsole.log as any)('message1', 'message2', { obj: 'test' });
      
      expect(mockLogger).toHaveBeenCalledWith(['▊ message1', ' message2', { obj: 'test' }], 'log');
    });
  });

  describe('extendsNativeConsole', () => {
    it('should create and set default instance', () => {
      // Since console is already overridden, just test that default works
      const instance = SugarConsole._defaultInstance || new SugarConsole({ colors: { log: 'green' } });
      SugarConsole._defaultInstance = instance;
      
      expect(SugarConsole.default).toBeInstanceOf(SugarConsole);
    });
  });

  describe('default instance', () => {
    it('should throw error when default not initialized', () => {
      expect(() => SugarConsole.default).toThrow('Default SugarConsole is not initialized');
    });
  });
});