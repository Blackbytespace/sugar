import { test, expect, beforeAll, afterAll } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import writeFileSync from './writeFileSync.js';

let testDir: string;

beforeAll(() => {
  testDir = path.join(process.cwd(), 'test-write-file-sync-dir');
  if (fs.existsSync(testDir)) {
    fs.rmSync(testDir, { recursive: true });
  }
});

afterAll(() => {
  if (fs.existsSync(testDir)) {
    fs.rmSync(testDir, { recursive: true });
  }
});

test('writeFileSync', () => {
  // Test writing a simple file
  const testFile = path.join(testDir, 'test-file.txt');
  const result = writeFileSync(testFile, 'Hello World');

  expect(result).toBe(testFile);
  expect(fs.existsSync(testFile)).toBe(true);
  expect(fs.readFileSync(testFile, 'utf8')).toBe('Hello World');

  // Test creating directory structure automatically
  const nestedFile = path.join(testDir, 'nested', 'deep', 'file.txt');
  writeFileSync(nestedFile, 'Nested content');

  expect(fs.existsSync(nestedFile)).toBe(true);
  expect(fs.readFileSync(nestedFile, 'utf8')).toBe('Nested content');
  expect(fs.existsSync(path.dirname(nestedFile))).toBe(true);

  // Test overwriting existing file
  writeFileSync(testFile, 'New content');
  expect(fs.readFileSync(testFile, 'utf8')).toBe('New content');

  // Test writing different data types (should be converted to string)
  const numberFile = path.join(testDir, 'number.txt');
  writeFileSync(numberFile, 123);
  expect(fs.readFileSync(numberFile, 'utf8')).toBe('123');

  const booleanFile = path.join(testDir, 'boolean.txt');
  writeFileSync(booleanFile, true);
  expect(fs.readFileSync(booleanFile, 'utf8')).toBe('true');

  const objectFile = path.join(testDir, 'object.txt');
  writeFileSync(objectFile, { key: 'value' });
  expect(fs.readFileSync(objectFile, 'utf8')).toBe('{\n    key: "value"\n}');

  // Test with empty string
  const emptyFile = path.join(testDir, 'empty.txt');
  writeFileSync(emptyFile, '');
  expect(fs.existsSync(emptyFile)).toBe(true);
  expect(fs.readFileSync(emptyFile, 'utf8')).toBe('');

  // Test with options parameter
  const optionsFile = path.join(testDir, 'options.txt');
  writeFileSync(optionsFile, 'Content with options', { encoding: 'utf8' });
  expect(fs.readFileSync(optionsFile, 'utf8')).toBe('Content with options');

  // Test with special characters
  const specialFile = path.join(testDir, 'special.txt');
  const specialContent = 'Special chars: àáâãäåæçèé 你好 🚀';
  writeFileSync(specialFile, specialContent);
  expect(fs.readFileSync(specialFile, 'utf8')).toBe(specialContent);
});
