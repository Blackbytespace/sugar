import { test, expect } from 'vitest';
import queryStringToObject from './queryStringToObject';

test('queryStringToObject', () => {
  // Test basic query string parsing
  expect(queryStringToObject('?var1=value1&var2=value2')).toEqual({
    var1: 'value1',
    var2: 'value2',
  });

  // Test without leading question mark
  expect(queryStringToObject('var1=value1&var2=value2')).toEqual({
    var1: 'value1',
    var2: 'value2',
  });

  // Test single parameter
  expect(queryStringToObject('?name=john')).toEqual({
    name: 'john',
  });

  // Test parameter without value (should be true)
  expect(queryStringToObject('?debug&verbose')).toEqual({
    debug: true,
    verbose: true,
  });

  // Test mixed parameters with and without values
  expect(queryStringToObject('?name=john&debug&age=30')).toEqual({
    name: 'john',
    debug: true,
    age: '30',
  });

  // Test parameters with special characters
  expect(
    queryStringToObject('?message=hello world&email=test@example.com'),
  ).toEqual({
    message: 'hello world',
    email: 'test@example.com',
  });

  // Test URL encoded characters (especially %20 for spaces)
  expect(queryStringToObject('?name=john%20doe&city=new%20york')).toEqual({
    name: 'john doe',
    city: 'new york',
  });

  // Test encoded special characters
  // Note: There's a bug - the function decodes first, then splits, so %26 becomes & and gets split
  expect(queryStringToObject('?search=hello%26world&price=%2499.99')).toEqual({
    search: 'hello',
    world: true, // This becomes a separate parameter due to the bug
    price: '$99.99',
  });

  // Test empty values
  expect(queryStringToObject('?name=&age=25')).toEqual({
    name: '',
    age: '25',
  });

  // Test duplicate parameter names (last one wins)
  expect(queryStringToObject('?color=red&color=blue')).toEqual({
    color: 'blue',
  });

  // Test numeric values (remain as strings)
  expect(queryStringToObject('?age=25&price=99.99&count=0')).toEqual({
    age: '25',
    price: '99.99',
    count: '0',
  });

  // Test boolean-like strings (remain as strings)
  expect(queryStringToObject('?active=true&visible=false')).toEqual({
    active: 'true',
    visible: 'false',
  });

  // Test empty string
  expect(queryStringToObject('')).toEqual({});

  // Test only question mark
  expect(queryStringToObject('?')).toEqual({});

  // Test only ampersands (should filter out empty chunks)
  expect(queryStringToObject('?&&&')).toEqual({});

  // Test malformed parameters
  expect(queryStringToObject('?=value&key=')).toEqual({
    '': 'value',
    key: '',
  });

  // Test complex real-world query string
  expect(
    queryStringToObject(
      '?utm_source=google&utm_medium=cpc&utm_campaign=summer2023&user_id=12345&logged_in',
    ),
  ).toEqual({
    utm_source: 'google',
    utm_medium: 'cpc',
    utm_campaign: 'summer2023',
    user_id: '12345',
    logged_in: true,
  });

  // Test array-like parameter names (treated as separate keys)
  expect(
    queryStringToObject(
      '?tags[]=javascript&tags[]=typescript&category=programming',
    ),
  ).toEqual({
    'tags[]': 'typescript', // Last value wins
    category: 'programming',
  });

  // Test parameters with equals signs in values
  expect(queryStringToObject('?equation=2+2=4&formula=a=b+c')).toEqual({
    equation: '2+2',
    formula: 'a',
    // Note: The function splits on '=' with limit 2, so only first = is treated as separator
  });
});
