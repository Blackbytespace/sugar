import { test, expect } from 'vitest';
import parseAuthorString from './parseAuthorString';

test('parseAuthorString', () => {
  // Standard format with name, email, and URL
  const result1 = parseAuthorString(
    'Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)',
  );
  expect(result1).toEqual({
    name: 'Olivier Bossel',
    email: 'olivier.bossel@gmail.com',
    url: 'https://blackbyte.space',
  });

  // Another standard format example
  const result2 = parseAuthorString(
    'John Doe <john@example.com> (https://johndoe.com)',
  );
  expect(result2.name).toBe('John Doe');
  expect(result2.email).toBe('john@example.com');
  expect(result2.url).toBe('https://johndoe.com');

  // Name with multiple words
  const result3 = parseAuthorString(
    'John Michael Doe <john.michael.doe@example.com> (https://johnmichaeldoe.com)',
  );
  expect(result3).toEqual({
    name: 'John Michael Doe',
    email: 'john.michael.doe@example.com',
    url: 'https://johnmichaeldoe.com',
  });

  // String with extra spaces (should be trimmed)
  const result4 = parseAuthorString(
    '  Jane Smith  <  jane@example.com  > (  https://janesmith.com  )',
  );
  expect(result4).toEqual({
    name: 'Jane Smith',
    email: 'jane@example.com',
    url: 'https://janesmith.com',
  });

  // No spaces between elements
  const result5 = parseAuthorString(
    'CompactName<compact@example.com>(https://compact.com)',
  );
  expect(result5).toEqual({
    name: 'CompactName',
    email: 'compact@example.com',
    url: 'https://compact.com',
  });

  // Complex email and URL formats
  const result6 = parseAuthorString(
    'Test User <test.user+tag@subdomain.example.com> (https://subdomain.example.com/user/profile)',
  );
  expect(result6).toEqual({
    name: 'Test User',
    email: 'test.user+tag@subdomain.example.com',
    url: 'https://subdomain.example.com/user/profile',
  });

  // Name with special characters
  const result7 = parseAuthorString(
    'José María García-López <jose@example.com> (https://jose-garcia.com)',
  );
  expect(result7).toEqual({
    name: 'José María García-López',
    email: 'jose@example.com',
    url: 'https://jose-garcia.com',
  });

  // Different URL schemes
  const result8 = parseAuthorString(
    'Protocol Test <protocol@example.com> (http://insecure.example.com)',
  );
  expect(result8.url).toBe('http://insecure.example.com');

  // URL without protocol
  const result9 = parseAuthorString(
    'Domain Only <domain@example.com> (example.com)',
  );
  expect(result9.url).toBe('example.com');

  // Malformed string - missing parts (should handle gracefully with empty strings)
  const result10 = parseAuthorString('Incomplete Name');
  expect(result10).toEqual({
    name: '',
    email: '',
    url: '',
  });

  // Empty string
  const result11 = parseAuthorString('');
  expect(result11).toEqual({
    name: '',
    email: '',
    url: '',
  });

  // Only name and email (no URL)
  const result12 = parseAuthorString('Name Only <email@example.com> ()');
  expect(result12.name).toBe('Name Only');
  expect(result12.email).toBe('email@example.com');
  expect(result12.url).toBe('');

  // Only name and URL (no email)
  const result13 = parseAuthorString('URL Only <> (https://example.com)');
  expect(result13.name).toBe('URL Only');
  expect(result13.email).toBe('');
  expect(result13.url).toBe('https://example.com');
});
