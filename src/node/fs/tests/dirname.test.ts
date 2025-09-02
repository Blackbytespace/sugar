import { describe, it } from 'vitest';
import __dirname from '../dirname.js';

describe('sugar.node.fs.dirname', () => {
  it('should get the dirname correctly', () => {
    const dirname = __dirname();
    expect(dirname.endsWith('sugar/src/node/fs/tests')).toBe(true);
  });
});
