import { test, expect, beforeAll, afterAll } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import prependToFileSync from './prependToFileSync.js';

let testDir: string;
let testFile: string;

beforeAll(() => {
  // Create temporary test directory
  testDir = path.join(process.cwd(), 'test-prepend-dir');
  testFile = path.join(testDir, 'test-file.txt');

  if (!fs.existsSync(testDir)) {
    fs.mkdirSync(testDir, { recursive: true });
  }
});

afterAll(() => {
  // Clean up test files
  if (fs.existsSync(testDir)) {
    fs.rmSync(testDir, { recursive: true });
  }
});

test('prependToFileSync', () => {
  // Test prepending to non-existent file (should create file)
  const newFile = path.join(testDir, 'new-file.txt');
  prependToFileSync(newFile, 'First line');
  expect(fs.readFileSync(newFile, 'utf8')).toBe('First line');

  // Test prepending to existing file
  fs.writeFileSync(testFile, 'Original content');
  prependToFileSync(testFile, 'Prepended content');
  expect(fs.readFileSync(testFile, 'utf8')).toBe(
    'Prepended content\nOriginal content',
  );

  // Test prepending multiple times
  prependToFileSync(testFile, 'Another prepend');
  expect(fs.readFileSync(testFile, 'utf8')).toBe(
    'Another prepend\nPrepended content\nOriginal content',
  );

  // Test prepending empty string
  const emptyTestFile = path.join(testDir, 'empty-test.txt');
  fs.writeFileSync(emptyTestFile, 'Some content');
  prependToFileSync(emptyTestFile, '');
  expect(fs.readFileSync(emptyTestFile, 'utf8')).toBe('\nSome content');

  // Test prepending with special characters
  const specialFile = path.join(testDir, 'special-test.txt');
  fs.writeFileSync(specialFile, 'Base content');
  prependToFileSync(specialFile, 'Special chars: àáâãäåæçèé!@#$%^&*()');
  expect(fs.readFileSync(specialFile, 'utf8')).toBe(
    'Special chars: àáâãäåæçèé!@#$%^&*()\nBase content',
  );

  // Test prepending with newlines in content
  const multilineFile = path.join(testDir, 'multiline-test.txt');
  fs.writeFileSync(multilineFile, 'Existing\nMultiline');
  prependToFileSync(multilineFile, 'New\nMultiline');
  expect(fs.readFileSync(multilineFile, 'utf8')).toBe(
    'New\nMultiline\nExisting\nMultiline',
  );

  // Test prepending to empty file
  const emptyFile = path.join(testDir, 'empty-file.txt');
  fs.writeFileSync(emptyFile, '');
  prependToFileSync(emptyFile, 'Content to empty file');
  expect(fs.readFileSync(emptyFile, 'utf8')).toBe('Content to empty file\n');
});
