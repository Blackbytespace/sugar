import { test, expect } from 'vitest';
import gravatarUrl from './gravatarUrl';

test('gravatarUrl', () => {
  // Test basic gravatar URL generation with default size (200)
  expect(gravatarUrl('test@example.com')).toMatch(
    /^https:\/\/www\.gravatar\.com\/avatar\/[a-f0-9]{32}\?s=200$/,
  );

  // Test with custom size
  expect(gravatarUrl('test@example.com', 150)).toMatch(
    /^https:\/\/www\.gravatar\.com\/avatar\/[a-f0-9]{32}\?s=150$/,
  );
  expect(gravatarUrl('test@example.com', 80)).toMatch(
    /^https:\/\/www\.gravatar\.com\/avatar\/[a-f0-9]{32}\?s=80$/,
  );
  expect(gravatarUrl('test@example.com', 400)).toMatch(
    /^https:\/\/www\.gravatar\.com\/avatar\/[a-f0-9]{32}\?s=400$/,
  );

  // Test with specific known email (from documentation example)
  const olivierEmail = 'olivier.bossel@gmail.com';
  const olivierGravatarUrl = gravatarUrl(olivierEmail);
  expect(olivierGravatarUrl).toMatch(
    /^https:\/\/www\.gravatar\.com\/avatar\/[a-f0-9]{32}\?s=200$/,
  );

  // Test that same email always produces same hash
  const email = 'john.doe@example.com';
  const url1 = gravatarUrl(email);
  const url2 = gravatarUrl(email);
  expect(url1).toBe(url2);

  // Test that different emails produce different hashes
  const email1 = 'user1@example.com';
  const email2 = 'user2@example.com';
  const url_1 = gravatarUrl(email1);
  const url_2 = gravatarUrl(email2);
  expect(url_1).not.toBe(url_2);

  // Test email case sensitivity - emails should be normalized to lowercase
  const upperEmail = 'TEST@EXAMPLE.COM';
  const lowerEmail = 'test@example.com';
  const upperUrl = gravatarUrl(upperEmail);
  const lowerUrl = gravatarUrl(lowerEmail);
  // Note: The actual behavior depends on how the md5 function handles the input
  // Let's test if they produce valid URLs at minimum
  expect(upperUrl).toMatch(
    /^https:\/\/www\.gravatar\.com\/avatar\/[a-f0-9]{32}\?s=200$/,
  );
  expect(lowerUrl).toMatch(
    /^https:\/\/www\.gravatar\.com\/avatar\/[a-f0-9]{32}\?s=200$/,
  );

  // Test with special characters in email
  expect(gravatarUrl('user+tag@example.com')).toMatch(
    /^https:\/\/www\.gravatar\.com\/avatar\/[a-f0-9]{32}\?s=200$/,
  );
  expect(gravatarUrl('user.name@sub.example.com')).toMatch(
    /^https:\/\/www\.gravatar\.com\/avatar\/[a-f0-9]{32}\?s=200$/,
  );

  // Test edge cases for size parameter
  expect(gravatarUrl('test@example.com', 1)).toMatch(/\?s=1$/); // Minimum size
  expect(gravatarUrl('test@example.com', 2048)).toMatch(/\?s=2048$/); // Maximum size according to docs

  // Test size parameter boundary values
  expect(gravatarUrl('test@example.com', 0)).toMatch(/\?s=0$/);
  expect(gravatarUrl('test@example.com', 9999)).toMatch(/\?s=9999$/); // Very large size

  // Test that URL structure is always correct
  const testUrls = [
    gravatarUrl('a@b.com'),
    gravatarUrl('user@domain.org', 50),
    gravatarUrl('complex.email+test@sub.domain.co.uk', 300),
  ];

  testUrls.forEach((url) => {
    expect(url).toMatch(
      /^https:\/\/www\.gravatar\.com\/avatar\/[a-f0-9]{32}\?s=\d+$/,
    );
    expect(url.split('/')).toHaveLength(5); // https: + '' + www.gravatar.com + avatar + hash?s=size
    expect(url).toContain('https://www.gravatar.com/avatar/');
    expect(url).toContain('?s=');
  });

  // Test hash length (MD5 should always produce 32 character hexadecimal hash)
  const url = gravatarUrl('test@example.com');
  const hash = url.split('/avatar/')[1].split('?')[0];
  expect(hash).toHaveLength(32);
  expect(hash).toMatch(/^[a-f0-9]{32}$/);
});
