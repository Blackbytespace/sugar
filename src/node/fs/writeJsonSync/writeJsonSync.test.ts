import { test, expect, beforeAll, afterAll } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import writeJsonSync from './writeJsonSync.js';

let testDir: string;

beforeAll(() => {
  testDir = path.join(process.cwd(), 'test-write-json-sync-dir');
  if (fs.existsSync(testDir)) {
    fs.rmSync(testDir, { recursive: true });
  }
});

afterAll(() => {
  if (fs.existsSync(testDir)) {
    fs.rmSync(testDir, { recursive: true });
  }
});

test('writeJsonSync', () => {
  // Test writing a simple object
  const testFile = path.join(testDir, 'test.json');
  const testData = { name: 'John', age: 30, city: 'New York' };

  const result = writeJsonSync(testFile, testData);

  expect(result).toBe(testFile);
  expect(fs.existsSync(testFile)).toBe(true);

  const writtenData = JSON.parse(fs.readFileSync(testFile, 'utf8'));
  expect(writtenData).toEqual(testData);

  // Test creating directory structure automatically
  const nestedFile = path.join(testDir, 'nested', 'deep', 'data.json');
  const nestedData = { nested: true, value: 42 };

  writeJsonSync(nestedFile, nestedData);

  expect(fs.existsSync(nestedFile)).toBe(true);
  expect(JSON.parse(fs.readFileSync(nestedFile, 'utf8'))).toEqual(nestedData);

  // Test writing array
  const arrayFile = path.join(testDir, 'array.json');
  const arrayData = [1, 2, 3, 'test', { nested: true }];

  writeJsonSync(arrayFile, arrayData);
  expect(JSON.parse(fs.readFileSync(arrayFile, 'utf8'))).toEqual(arrayData);

  // Test writing already stringified JSON
  const stringFile = path.join(testDir, 'string.json');
  const stringData = JSON.stringify({ fromString: true });

  writeJsonSync(stringFile, stringData);
  expect(fs.readFileSync(stringFile, 'utf8')).toBe(stringData);

  // Test overwriting existing file
  writeJsonSync(testFile, { updated: true });
  expect(JSON.parse(fs.readFileSync(testFile, 'utf8'))).toEqual({
    updated: true,
  });

  // Test formatting (should have 4-space indentation)
  const formattedFile = path.join(testDir, 'formatted.json');
  writeJsonSync(formattedFile, { level1: { level2: { value: 'test' } } });

  const formattedContent = fs.readFileSync(formattedFile, 'utf8');
  expect(formattedContent).toContain('    '); // Should have 4-space indentation
  expect(formattedContent.split('\n').length).toBeGreaterThan(1); // Should be multi-line

  // Test with null and special values
  const specialFile = path.join(testDir, 'special.json');
  const specialData = {
    nullValue: null,
    booleanTrue: true,
    booleanFalse: false,
    number: 123.456,
    unicode: 'Héllo 你好 🚀',
  };

  writeJsonSync(specialFile, specialData);
  expect(JSON.parse(fs.readFileSync(specialFile, 'utf8'))).toEqual(specialData);
});
