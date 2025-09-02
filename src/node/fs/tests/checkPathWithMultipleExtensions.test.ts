import { describe, expect, it } from 'vitest';
import checkPathWithMultipleExtensions from '../checkPathWithMultipleExtensions.js';

describe('sugar.node.fs.checkPathWithMultipleExtensions', () => {
  it('should find the test.php file', () => {
    const path = checkPathWithMultipleExtensions(
      `${__dirname}/data/checkPathWithMultipleExtensions/test.txt`,
      ['php'],
    );
    expect(path).not.toBeUndefined();
  });
  it('should not find the test.gif file', () => {
    const path = checkPathWithMultipleExtensions(
      `${__dirname}/data/checkPathWithMultipleExtensions/test.txt`,
      ['gif'],
    );
    expect(path).toBeUndefined();
  });
  it('should find first the test.ts file', () => {
    const path = checkPathWithMultipleExtensions(
      `${__dirname}/data/checkPathWithMultipleExtensions/test.ts`,
      ['ts', 'php', 'gif'],
    );
    expect(path).not.toBeUndefined();
  });
});
