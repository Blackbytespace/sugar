import { test, expect } from 'vitest';
import styleStringToObject from './styleStringToObject';

test('styleStringToObject', () => {
  // Test basic style string conversion from documentation example
  expect(styleStringToObject('padding-left:20px; display:block;')).toEqual({
    paddingLeft: '20px',
    display: 'block',
  });

  // Test kebab-case to camelCase conversion
  expect(
    styleStringToObject(
      'background-color:red; margin-top:10px; border-radius:5px;',
    ),
  ).toEqual({
    backgroundColor: 'red',
    marginTop: '10px',
    borderRadius: '5px',
  });

  // Test single property
  expect(styleStringToObject('color:blue;')).toEqual({
    color: 'blue',
  });

  // Test multiple properties with different value types (parse function converts types)
  expect(
    styleStringToObject(
      'width:100px; height:200; opacity:0.5; font-size:14px;',
    ),
  ).toEqual({
    width: '100px',
    height: 200, // Numbers get parsed as numbers
    opacity: 0.5, // Floats get parsed as floats
    fontSize: '14px',
  });

  // Test properties with numeric values that should be parsed
  expect(styleStringToObject('z-index:10; line-height:1.5; margin:0;')).toEqual(
    {
      zIndex: 10,
      lineHeight: 1.5,
      margin: 0,
    },
  );

  // Test empty string
  expect(styleStringToObject('')).toEqual({});

  // Test null/undefined input (function handles these gracefully)
  expect(styleStringToObject(null as any)).toEqual({});
  expect(styleStringToObject(undefined as any)).toEqual({});

  // Test string with only whitespace
  expect(styleStringToObject('   ')).toEqual({});

  // Test complex CSS values (note: spaces are removed by the function)
  expect(
    styleStringToObject(
      'box-shadow:0 2px 4px rgba(0,0,0,0.1); background:linear-gradient(45deg, red, blue); transform:translateX(10px) rotate(45deg);',
    ),
  ).toEqual({
    boxShadow: '02px4pxrgba(0,0,0,0.1)', // Spaces removed
    background: 'linear-gradient(45deg,red,blue)', // Spaces removed
    transform: 'translateX(10px)rotate(45deg)', // Spaces removed
    '': undefined, // Empty key due to trailing semicolon
  });

  // Test vendor prefixed properties
  expect(
    styleStringToObject(
      '-webkit-transform:scale(1.2); -moz-user-select:none; -ms-filter:blur(5px);',
    ),
  ).toEqual({
    webkitTransform: 'scale(1.2)', // camelize converts to camelCase
    mozUserSelect: 'none',
    msFilter: 'blur(5px)',
    '': undefined, // Empty key due to trailing semicolon
  });

  // Test CSS variables (custom properties) - they should be handled as is
  expect(
    styleStringToObject(
      '--main-color:#ff0000; --sidebar-width:200px; color:var(--main-color);',
    ),
  ).toEqual({
    mainColor: '#ff0000', // camelize will convert --main-color to mainColor (removes one hyphen)
    sidebarWidth: '200px',
    color: 'var(--main-color)',
  });

  // Test boolean string values that should remain as strings
  expect(
    styleStringToObject('visibility:visible; pointer-events:none;'),
  ).toEqual({
    visibility: 'visible',
    pointerEvents: 'none',
  });

  // Test special CSS keywords
  expect(
    styleStringToObject(
      'display:none; position:absolute; top:auto; left:inherit; width:initial;',
    ),
  ).toEqual({
    display: 'none',
    position: 'absolute',
    top: 'auto',
    left: 'inherit',
    width: 'initial',
  });

  // Test style string with extra whitespace and semicolons
  expect(
    styleStringToObject('  color: red ;  margin: 10px  ; padding: 0; '),
  ).toEqual({
    color: 'red', // Whitespace removed
    margin: '10px', // Whitespace removed
    padding: 0,
    '': undefined, // Empty key due to trailing semicolon
  });

  // Test malformed style strings (missing values)
  expect(styleStringToObject('color:; margin:10px; background:')).toEqual({
    color: 0, // parse('') returns 0
    margin: '10px',
    background: 0, // parse('') returns 0
  });

  // Test style string without semicolons
  expect(styleStringToObject('color:red margin:10px padding:0')).toEqual({
    color: 'redmargin', // Without semicolons, only gets first part before next colon (spaces removed)
  });

  // Test properties with colon in values (like URLs) - shows function limitation
  expect(
    styleStringToObject(
      'background-image:url(https://example.com/image.jpg); color:red;',
    ),
  ).toEqual({
    backgroundImage: 'url(https', // Split on first colon breaks URLs
    '//example.com/image.jpg)': undefined, // The rest becomes a property with no value
    color: 'red',
  });

  // Test calc() values and other CSS functions
  expect(
    styleStringToObject(
      'width:calc(100% - 20px); height:var(--custom-height);',
    ),
  ).toEqual({
    width: 'calc(100%-20px)', // Spaces are removed by the function
    height: 'var(--custom-height)',
    '': undefined, // Empty key due to trailing semicolon
  });
});
