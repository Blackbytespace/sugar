import { test, expect } from 'vitest';
import uniqid from './uniqid.js';

test('uniqid', () => {
  // Test basic functionality - should return a UUID v4 string
  const result1 = uniqid();
  expect(typeof result1).toBe('string');
  expect(result1).toBeDefined();
  expect(result1.length).toBe(36); // UUID v4 format: "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"

  // Test UUID v4 format using regex
  const uuidV4Regex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  expect(result1).toMatch(uuidV4Regex);

  // Test that it generates unique values
  const result2 = uniqid();
  const result3 = uniqid();

  expect(result2).not.toBe(result1);
  expect(result3).not.toBe(result1);
  expect(result3).not.toBe(result2);

  // Test structure - should have exactly 4 dashes in correct positions
  const parts = result1.split('-');
  expect(parts).toHaveLength(5);
  expect(parts[0]).toHaveLength(8); // First part: 8 characters
  expect(parts[1]).toHaveLength(4); // Second part: 4 characters
  expect(parts[2]).toHaveLength(4); // Third part: 4 characters (starts with '4' for v4)
  expect(parts[3]).toHaveLength(4); // Fourth part: 4 characters
  expect(parts[4]).toHaveLength(12); // Fifth part: 12 characters

  // Test version indicator - third group should start with '4' (UUID v4)
  expect(parts[2][0]).toBe('4');

  // Test variant indicator - fourth group should start with '8', '9', 'a', or 'b'
  const variantChar = parts[3][0].toLowerCase();
  expect(['8', '9', 'a', 'b']).toContain(variantChar);

  // Test that all characters are valid hexadecimal (excluding dashes)
  const hexOnly = result1.replace(/-/g, '');
  expect(hexOnly).toMatch(/^[0-9a-f]{32}$/i);

  // Test consistency - multiple calls should always return valid UUIDs
  const results: string[] = [];
  for (let i = 0; i < 10; i++) {
    const uuid = uniqid();
    expect(uuid).toMatch(uuidV4Regex);
    expect(uuid).toHaveLength(36);
    expect(results).not.toContain(uuid); // Should be unique
    results.push(uuid);
  }

  // Test return type consistency
  for (let i = 0; i < 5; i++) {
    const uuid = uniqid();
    expect(typeof uuid).toBe('string');
    expect(uuid).toBeTruthy(); // Should never be empty
  }

  // Test case sensitivity - should be lowercase
  const lowerCaseResult = uniqid();
  expect(lowerCaseResult).toBe(lowerCaseResult.toLowerCase());

  // Test randomness - generate multiple UUIDs and ensure they're different
  const uniqueIds = new Set();
  for (let i = 0; i < 100; i++) {
    const id = uniqid();
    expect(uniqueIds.has(id)).toBe(false); // Should not have duplicates
    uniqueIds.add(id);
  }
  expect(uniqueIds.size).toBe(100); // All should be unique

  // Test that no parameters are required (function takes no arguments)
  expect(() => uniqid()).not.toThrow();

  // Test edge case - rapid generation should still produce unique values
  const rapidResults: string[] = [];
  for (let i = 0; i < 1000; i++) {
    rapidResults.push(uniqid());
  }
  const rapidSet = new Set(rapidResults);
  expect(rapidSet.size).toBe(rapidResults.length); // All should be unique even when generated rapidly

  // Test UUID specification compliance
  // UUID v4 should have specific bit patterns
  const manyResults: string[] = [];
  for (let i = 0; i < 50; i++) {
    manyResults.push(uniqid());
  }

  manyResults.forEach((uuid: string) => {
    const parts = uuid.split('-');

    // Version field (first 4 bits of third octet) should be 0100 (4 in hex)
    expect(parts[2][0]).toBe('4');

    // Variant field (first 2-3 bits of fourth octet) should be 10xx (8-b in hex)
    const variantHex = parts[3][0].toLowerCase();
    expect(['8', '9', 'a', 'b']).toContain(variantHex);

    // Total format compliance
    expect(uuid).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    );
  });

  // Performance test - should complete within reasonable time
  const startTime = Date.now();
  for (let i = 0; i < 10000; i++) {
    uniqid();
  }
  const endTime = Date.now();
  const duration = endTime - startTime;
  expect(duration).toBeLessThan(1000); // Should generate 10k UUIDs in under 1 second

  console.log('All uniqid tests passed successfully');
});
