import { test, expect, beforeAll, afterAll } from 'vitest';
import writeJson from './writeJson.js';
import * as fs from 'fs';
import * as path from 'path';

const testDir = path.join(__dirname, 'test-writeJson');

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

test('writeJson', async () => {
  // Test writing a basic object
  const basicFile = path.join(testDir, 'basic.json');
  const basicData = { name: 'test', value: 123 };

  const result = await writeJson(basicFile, basicData);
  expect(result).toBe(basicFile);
  expect(fs.existsSync(basicFile)).toBe(true);

  const written = JSON.parse(fs.readFileSync(basicFile, 'utf8'));
  expect(written).toEqual(basicData);

  // Test formatting (should have 4-space indentation)
  const content = fs.readFileSync(basicFile, 'utf8');
  expect(content).toContain('    '); // Should have 4-space indentation
  expect(content.split('\n').length).toBeGreaterThan(1); // Should be multi-line

  // Test writing to nested directory structure
  const nestedFile = path.join(testDir, 'nested', 'deep', 'data.json');
  const nestedData = { nested: { deep: { value: 'test' } } };

  await writeJson(nestedFile, nestedData);
  expect(fs.existsSync(nestedFile)).toBe(true);

  const nestedWritten = JSON.parse(fs.readFileSync(nestedFile, 'utf8'));
  expect(nestedWritten).toEqual(nestedData);

  // Test with complex data types
  const complexFile = path.join(testDir, 'complex.json');
  const complexData = {
    string: 'hello world',
    number: 42.5,
    boolean: true,
    nullValue: null,
    array: [1, 'two', { three: 3 }],
    emptyObject: {},
    emptyArray: [],
    unicode: 'Hello 世界',
    emoji: '🎉',
  };

  await writeJson(complexFile, complexData);
  expect(fs.existsSync(complexFile)).toBe(true);

  const complexWritten = JSON.parse(fs.readFileSync(complexFile, 'utf8'));
  expect(complexWritten).toEqual(complexData);
  expect(Array.isArray(complexWritten.array)).toBe(true);
  expect(complexWritten.nullValue).toBeNull();

  // Test overwriting existing file
  const overwriteFile = path.join(testDir, 'overwrite.json');
  await writeJson(overwriteFile, { old: 'data' });
  await writeJson(overwriteFile, { new: 'data' });

  const overwritten = JSON.parse(fs.readFileSync(overwriteFile, 'utf8'));
  expect(overwritten).toEqual({ new: 'data' });
  expect(overwritten.old).toBeUndefined();

  // Test with already stringified JSON
  const stringFile = path.join(testDir, 'string.json');
  const stringData = JSON.stringify({ already: 'stringified' });

  await writeJson(stringFile, stringData);
  expect(fs.existsSync(stringFile)).toBe(true);

  // When passed a string, it should write it as-is (not double-stringify)
  const stringContent = fs.readFileSync(stringFile, 'utf8');
  expect(stringContent).toBe(stringData);

  // Test empty object
  const emptyFile = path.join(testDir, 'empty.json');
  await writeJson(emptyFile, {});

  const emptyWritten = JSON.parse(fs.readFileSync(emptyFile, 'utf8'));
  expect(emptyWritten).toEqual({});
});
