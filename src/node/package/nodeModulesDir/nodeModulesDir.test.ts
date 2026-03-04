import { describe, it, expect } from 'vitest';
import __nodeModulesDir from './nodeModulesDir.js';

describe('sugar.node.package.nodeModulesDir', () => {
  it('should return the correct vendor dirs for the sugar package', () => {
    const path = __nodeModulesDir();
    expect(path.includes('sugar/node_modules')).toBe(true);
  });
});
