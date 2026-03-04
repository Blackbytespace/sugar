import { test, expect } from 'vitest';
import styleObjectToString from './styleObjectToString';

test('styleObjectToString', () => {
  // Test basic style object conversion from documentation example
  expect(
    styleObjectToString({
      paddingLeft: '20px',
      display: 'block',
    }),
  ).toBe('padding-left:20px; display:block;');

  // Test camelCase to kebab-case conversion
  expect(
    styleObjectToString({
      backgroundColor: 'red',
      marginTop: '10px',
      borderRadius: '5px',
    }),
  ).toBe('background-color:red; margin-top:10px; border-radius:5px;');

  // Test single property
  expect(
    styleObjectToString({
      color: 'blue',
    }),
  ).toBe('color:blue;');

  // Test multiple properties with different value types
  expect(
    styleObjectToString({
      width: '100px',
      height: 200,
      opacity: 0.5,
      fontSize: '14px',
    }),
  ).toBe('width:100px; height:200; opacity:0.5; font-size:14px;');

  // Test properties with undefined values (should be filtered out)
  expect(
    styleObjectToString({
      color: 'red',
      backgroundColor: undefined,
      margin: '10px',
    }),
  ).toBe('color:red; margin:10px;');

  // Test properties with empty string values (should be filtered out)
  expect(
    styleObjectToString({
      color: 'red',
      backgroundColor: '',
      margin: '10px',
    }),
  ).toBe('color:red; margin:10px;');

  // Test properties with zero values (should be included)
  expect(
    styleObjectToString({
      margin: 0,
      padding: '0px',
      opacity: 0,
    }),
  ).toBe('margin:0; padding:0px; opacity:0;');

  // Test empty object
  expect(styleObjectToString({})).toBe('');

  // Test object with all undefined/empty values
  expect(
    styleObjectToString({
      color: undefined,
      backgroundColor: '',
      margin: undefined,
    }),
  ).toBe('');

  // Test complex CSS values
  expect(
    styleObjectToString({
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      background: 'linear-gradient(45deg, red, blue)',
      transform: 'translateX(10px) rotate(45deg)',
    }),
  ).toBe(
    'box-shadow:0 2px 4px rgba(0,0,0,0.1); background:linear-gradient(45deg, red, blue); transform:translateX(10px) rotate(45deg);',
  );

  // Test vendor prefixed properties (converted to kebab-case without leading hyphens)
  expect(
    styleObjectToString({
      WebkitTransform: 'scale(1.2)',
      MozUserSelect: 'none',
      msFilter: 'blur(5px)',
    }),
  ).toBe(
    'webkit-transform:scale(1.2); moz-user-select:none; ms-filter:blur(5px);',
  );

  // Test CSS variables (custom properties) - uncamelize removes one hyphen
  expect(
    styleObjectToString({
      '--main-color': '#ff0000',
      '--sidebar-width': '200px',
      color: 'var(--main-color)',
    }),
  ).toBe('-main-color:#ff0000; -sidebar-width:200px; color:var(--main-color);');

  // Test boolean values (should be converted to string)
  expect(
    styleObjectToString({
      visibility: true,
      disabled: false,
    }),
  ).toBe('visibility:true; disabled:false;');

  // Test null values (should be included as string)
  expect(
    styleObjectToString({
      content: null,
      color: 'red',
    }),
  ).toBe('content:null; color:red;');

  // Test special CSS keywords
  expect(
    styleObjectToString({
      display: 'none',
      position: 'absolute',
      top: 'auto',
      left: 'inherit',
      width: 'initial',
    }),
  ).toBe(
    'display:none; position:absolute; top:auto; left:inherit; width:initial;',
  );
});
