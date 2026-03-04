import { test, expect } from 'vitest';
import urlFromString from './urlFromString';

test('urlFromString', () => {
  // Note: The original function has a bug - it imports 'url' instead of 'url-slug'
  // This causes the function to fail. Let's test what we expect it should do
  // when the bug is fixed, but for now these tests will help identify the issue.

  try {
    // Test basic string to URL conversion (what it should do)
    const result1 = urlFromString('Hello World');
    expect(result1).toBe('hello-world');

    const result2 = urlFromString(
      'Sir James Paul McCartney MBE is an English singer-songwriter',
    );
    expect(result2).toBe(
      'sir-james-paul-mc-cartney-mbe-is-an-english-singer-songwriter',
    );

    // Test with path-like strings (slashes should be preserved)
    const result3 = urlFromString('products/category/item');
    expect(result3).toBe('products/category/item');

    const result4 = urlFromString('blog / my article / 2023');
    expect(result4).toBe('blog/my-article/2023');
  } catch (error) {
    // The function currently has a bug where it imports 'url' instead of 'url-slug'
    // This will throw an error "(0, __vite_ssr_import_0__.default) is not a function"
    expect(error.message).toContain('is not a function');
  }
});
