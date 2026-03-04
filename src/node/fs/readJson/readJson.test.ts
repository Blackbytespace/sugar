import { test, expect, beforeAll, afterAll } from 'vitest';
import readJson from './readJson.js';
import * as fs from 'fs';
import * as path from 'path';

const testDir = path.join(__dirname, 'test-readJson');

beforeAll(() => {
  // Clean up any existing test directory
  if (fs.existsSync(testDir)) {
    fs.rmSync(testDir, { recursive: true, force: true });
  }
  fs.mkdirSync(testDir, { recursive: true });
});

afterAll(() => {
  // Clean up test directory
  if (fs.existsSync(testDir)) {
    fs.rmSync(testDir, { recursive: true, force: true });
  }
});

test('readJson', async () => {
  // Test reading a valid JSON file
  const validJsonFile = path.join(testDir, 'valid.json');
  const testData = { name: 'test', value: 123, nested: { key: 'value' } };
  fs.writeFileSync(validJsonFile, JSON.stringify(testData, null, 2));

  const result = await readJson(validJsonFile);
  expect(result).toEqual(testData);
  expect(result.name).toBe('test');
  expect(result.nested.key).toBe('value');

  // Test reading JSON with different data types
  const complexJsonFile = path.join(testDir, 'complex.json');
  const complexData = {
    string: 'hello',
    number: 42,
    boolean: true,
    nullValue: null,
    array: [1, 2, 3],
    emptyObject: {},
    emptyArray: [],
  };
  fs.writeFileSync(complexJsonFile, JSON.stringify(complexData));

  const complexResult = await readJson(complexJsonFile);
  expect(complexResult).toEqual(complexData);
  expect(Array.isArray(complexResult.array)).toBe(true);
  expect(complexResult.nullValue).toBeNull();

  // Test reading an empty JSON file
  const emptyJsonFile = path.join(testDir, 'empty.json');
  fs.writeFileSync(emptyJsonFile, '{}');

  const emptyResult = await readJson(emptyJsonFile);
  expect(emptyResult).toEqual({});

  // Test reading JSON with special characters
  const specialJsonFile = path.join(testDir, 'special.json');
  const specialData = {
    unicode: 'Hello 世界',
    emoji: '🎉',
    special: 'line\\nbreak\\ttab"quotes',
  };
  fs.writeFileSync(specialJsonFile, JSON.stringify(specialData));

  const specialResult = await readJson(specialJsonFile);
  expect(specialResult).toEqual(specialData);

  // Test error handling - non-existent file
  const nonExistentFile = path.join(testDir, 'non-existent.json');

  await expect(readJson(nonExistentFile)).rejects.toThrow();
  await expect(readJson(nonExistentFile)).rejects.toThrow(/does not exists/);

  // Test error handling - invalid JSON
  const invalidJsonFile = path.join(testDir, 'invalid.json');
  fs.writeFileSync(invalidJsonFile, '{ invalid json }');

  await expect(readJson(invalidJsonFile)).rejects.toThrow();

  // Test error handling - not a JSON file
  const textFile = path.join(testDir, 'text.json');
  fs.writeFileSync(textFile, 'This is not JSON');

  await expect(readJson(textFile)).rejects.toThrow();
});
