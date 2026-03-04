import { test, expect } from 'vitest';
import parseSchema from './parseSchema';

test('parseSchema', () => {
  // Test basic parameter matching from documentation example
  const result1 = parseSchema(
    'https://github.com/myApp/main/3',
    '{project:string}/{?branch:string}/{?idx:number}',
  );
  expect(result1.match).toBe(true);
  expect(result1.errors).toBe(null);
  expect(result1.params).toEqual({
    project: {
      optional: false,
      raw: '{project:string}',
      type: 'string',
      value: 'myApp',
    },
    branch: {
      optional: true,
      raw: '{?branch:string}',
      type: 'string',
      value: 'main',
    },
    idx: {
      optional: true,
      raw: '{?idx:number}',
      type: 'number',
      value: 3,
    },
  });

  // Test simple parameter schema - the path segments are mapped in order
  const result2 = parseSchema('/user/john/profile', '{first}/{second}/{third}');
  expect(result2.match).toBe(true);
  expect(result2.errors).toBe(null);
  expect(result2.params.first.value).toBe('user');
  expect(result2.params.second.value).toBe('john');
  expect(result2.params.third.value).toBe('profile');
  expect(result2.params.first.type).toBe(null);

  // Test optional parameters that are missing
  const result3 = parseSchema(
    '/products/electronics',
    '{category}/{?subcategory}',
  );
  expect(result3.match).toBe(true);
  expect(result3.params.category.value).toBe('products'); // First segment
  expect(result3.params.subcategory.value).toBe('electronics'); // Second segment (not null because it's present)
  expect(result3.params.subcategory.optional).toBe(true);

  // Test optional parameter that is actually missing
  const result3b = parseSchema('/products', '{category}/{?subcategory}');
  expect(result3b.match).toBe(true);
  expect(result3b.params.category.value).toBe('products');
  expect(result3b.params.subcategory.value).toBe(null); // This should be null when missing
  expect(result3b.params.subcategory.optional).toBe(true);

  // Test type validation - number type
  const result4 = parseSchema('/user/123', '{section}/{id:number}');
  expect(result4.match).toBe(true);
  expect(result4.params.section.value).toBe('user');
  expect(result4.params.id.value).toBe(123);
  expect(result4.params.id.type).toBe('number');

  // Test type validation failure - string passed where number expected
  const result5 = parseSchema('/user/john', '{section}/{id:number}');
  expect(result5.match).toBe(false);
  expect(result5.errors).not.toBe(null);
  expect(result5.errors.id.type).toBe('type');
  expect(result5.errors.id.requested).toBe('number');
  expect(result5.errors.id.passed).toBe('string');

  // Test missing required parameter
  const result6 = parseSchema('/user', '{first}/{second}');
  expect(result6.match).toBe(false);
  expect(result6.errors).not.toBe(null);
  expect(result6.errors.second.type).toBe('optional');

  // Test static path components - these must match exactly
  const result7 = parseSchema('/api/v1/users/123', 'api/v1/users/{id:number}');
  expect(result7.match).toBe(true);
  expect(result7.params.id.value).toBe(123);

  // Test static path mismatch
  const result8 = parseSchema('/api/v2/users/123', 'api/v1/users/{id:number}');
  expect(result8.match).toBe(false);

  // Test return object structure
  const result9 = parseSchema('/test/123', '{name}/{id}');
  expect(result9).toHaveProperty('errors');
  expect(result9).toHaveProperty('params');
  expect(result9).toHaveProperty('match');
  expect(result9).toHaveProperty('schema');
  expect(result9).toHaveProperty('url');
  expect(result9.schema).toBe('{name}/{id}');
  expect(result9.url).toBe('/test/123');

  // Test empty path
  const result10 = parseSchema('/', '');
  expect(result10.match).toBe(true);
  expect(result10.params).toBe(null);

  // Test URL with query string (should be ignored)
  const result11 = parseSchema(
    'https://example.com/user/john?debug=true',
    '{section}/{name}',
  );
  expect(result11.match).toBe(true);
  expect(result11.params.section.value).toBe('user');
  expect(result11.params.name.value).toBe('john');

  // Test boolean parsing
  const result12 = parseSchema('/settings/true', '{section}/{value:boolean}');
  expect(result12.match).toBe(true);
  expect(result12.params.value.value).toBe(true);
  expect(result12.params.value.type).toBe('boolean');
});
