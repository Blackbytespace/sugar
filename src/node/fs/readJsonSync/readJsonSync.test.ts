import { test, expect, beforeAll, afterAll } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import readJsonSync from './readJsonSync.js';

let testDir: string;

beforeAll(() => {
  testDir = path.join(process.cwd(), 'test-read-json-sync-dir');
  if (!fs.existsSync(testDir)) {
    fs.mkdirSync(testDir, { recursive: true });
  }
});

afterAll(() => {
  if (fs.existsSync(testDir)) {
    fs.rmSync(testDir, { recursive: true });
  }
});

test('readJsonSync', () => {
  // Test reading simple JSON object
  const simpleJsonFile = path.join(testDir, 'simple.json');
  const simpleData = { name: 'John', age: 30, city: 'New York' };
  fs.writeFileSync(simpleJsonFile, JSON.stringify(simpleData));

  const result1 = readJsonSync(simpleJsonFile);
  expect(result1).toEqual(simpleData);
  expect(result1.name).toBe('John');
  expect(result1.age).toBe(30);

  // Test reading JSON array
  const arrayJsonFile = path.join(testDir, 'array.json');
  const arrayData = [1, 2, 3, 'test', { nested: true }];
  fs.writeFileSync(arrayJsonFile, JSON.stringify(arrayData));

  const result2 = readJsonSync(arrayJsonFile);
  expect(result2).toEqual(arrayData);
  expect(Array.isArray(result2)).toBe(true);
  expect(result2.length).toBe(5);

  // Test reading nested JSON
  const nestedJsonFile = path.join(testDir, 'nested.json');
  const nestedData = {
    user: {
      profile: {
        name: 'Alice',
        preferences: {
          theme: 'dark',
          language: 'en',
        },
      },
    },
  };
  fs.writeFileSync(nestedJsonFile, JSON.stringify(nestedData, null, 2));

  const result3 = readJsonSync(nestedJsonFile);
  expect(result3).toEqual(nestedData);
  expect(result3.user.profile.name).toBe('Alice');

  // Test reading empty JSON object
  const emptyJsonFile = path.join(testDir, 'empty.json');
  fs.writeFileSync(emptyJsonFile, '{}');

  const result4 = readJsonSync(emptyJsonFile);
  expect(result4).toEqual({});

  // Test reading JSON with special characters
  const specialJsonFile = path.join(testDir, 'special.json');
  const specialData = { text: 'Hello 🌍! Héllo Wörld! 你好' };
  fs.writeFileSync(specialJsonFile, JSON.stringify(specialData));

  const result5 = readJsonSync(specialJsonFile);
  expect(result5).toEqual(specialData);

  // Test error when file doesn't exist
  const nonExistentFile = path.join(testDir, 'non-existent.json');
  expect(() => readJsonSync(nonExistentFile)).toThrow();
  expect(() => readJsonSync(nonExistentFile)).toThrow(/does not exists/);

  // Test error when file contains invalid JSON
  const invalidJsonFile = path.join(testDir, 'invalid.json');
  fs.writeFileSync(invalidJsonFile, '{ invalid json content }');

  expect(() => readJsonSync(invalidJsonFile)).toThrow();

  // Test reading JSON with null values
  const nullJsonFile = path.join(testDir, 'null.json');
  const nullData = { value: null, number: 0, boolean: false };
  fs.writeFileSync(nullJsonFile, JSON.stringify(nullData));

  const result6 = readJsonSync(nullJsonFile);
  expect(result6).toEqual(nullData);
  expect(result6.value).toBeNull();
});
