import { test, expect } from 'vitest';
import stripCssComments from './stripCssComments';

test('stripCssComments basic functionality', () => {
  // Test basic example from documentation
  const docExample = `
// something cool
body { background-color: red; }
`;
  const docResult = stripCssComments(docExample);
  expect(docResult).toBe(`

body { background-color: red; }
`);

  // Test basic block comments
  expect(stripCssComments('/* comment */ body { color: red; }')).toBe(
    ' body { color: red; }',
  );

  // Test basic line comments
  expect(stripCssComments('// line comment\nbody { color: red; }')).toBe(
    '\nbody { color: red; }',
  );
  expect(stripCssComments('body { color: red; } // end comment')).toBe(
    'body { color: red; } ',
  );

  // Test settings
  expect(
    stripCssComments('/* block */ body { color: red; } // line', {
      block: true,
      line: false,
    }),
  ).toBe(' body { color: red; } // line');
  expect(
    stripCssComments('/* block */ body { color: red; } // line', {
      block: false,
      line: true,
    }),
  ).toBe('/* block */ body { color: red; } ');
  expect(
    stripCssComments('/* block */ body { color: red; } // line', {
      block: false,
      line: false,
    }),
  ).toBe('/* block */ body { color: red; } // line');

  // Test edge cases
  expect(stripCssComments('')).toBe('');
  expect(stripCssComments('body { color: red; }')).toBe('body { color: red; }');

  // Test null/undefined handling
  expect(stripCssComments(null as any)).toBe('');
  expect(stripCssComments(undefined as any)).toBe('');
});
