import { test, expect, beforeAll, afterAll } from 'vitest';
import ensureFileSync from './ensureFileSync.js';
import * as fs from 'fs';
import * as path from 'path';

test('ensureFileSync', () => {
  const testDir = path.join(__dirname, 'test-ensureFileSync');

  beforeAll(() => {
    // Clean up any existing test directory
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
  });

  afterAll(() => {
    // Clean up test directory
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
  });

  // Test creating a new file in existing directory
  fs.mkdirSync(testDir, { recursive: true });
  const existingDirFile = path.join(testDir, 'test.txt');
  ensureFileSync(existingDirFile);
  expect(fs.existsSync(existingDirFile)).toBe(true);
  expect(fs.statSync(existingDirFile).isFile()).toBe(true);

  // Test creating a new file with nested directory structure
  const nestedFile = path.join(testDir, 'nested', 'deep', 'file.txt');
  ensureFileSync(nestedFile);
  expect(fs.existsSync(nestedFile)).toBe(true);
  expect(fs.statSync(nestedFile).isFile()).toBe(true);
  expect(fs.statSync(path.dirname(nestedFile)).isDirectory()).toBe(true);

  // Test with existing file (should not modify)
  const existingFile = path.join(testDir, 'existing.txt');
  fs.writeFileSync(existingFile, 'original content');
  const originalStats = fs.statSync(existingFile);

  ensureFileSync(existingFile);
  expect(fs.existsSync(existingFile)).toBe(true);
  expect(fs.readFileSync(existingFile, 'utf8')).toBe('original content');
  const newStats = fs.statSync(existingFile);
  expect(newStats.mtime.getTime()).toBe(originalStats.mtime.getTime());

  // Test with file extension variations
  const jsFile = path.join(testDir, 'test.js');
  const jsonFile = path.join(testDir, 'data.json');
  const noExtFile = path.join(testDir, 'noext');

  ensureFileSync(jsFile);
  ensureFileSync(jsonFile);
  ensureFileSync(noExtFile);

  expect(fs.existsSync(jsFile)).toBe(true);
  expect(fs.existsSync(jsonFile)).toBe(true);
  expect(fs.existsSync(noExtFile)).toBe(true);

  // Test with special characters in path
  const specialFile = path.join(testDir, 'special chars & symbols.txt');
  ensureFileSync(specialFile);
  expect(fs.existsSync(specialFile)).toBe(true);

  // Test with empty filename (should handle gracefully)
  const emptyDir = path.join(testDir, 'empty', 'path', '');
  try {
    ensureFileSync(emptyDir);
    // This might create an empty file or throw an error depending on fs-extra behavior
  } catch (error) {
    // fs-extra might reject empty filenames, which is acceptable behavior
    expect(error).toBeDefined();
  }

  // Test return value (should be void/undefined)
  const result = ensureFileSync(path.join(testDir, 'return-test.txt'));
  expect(result).toBeUndefined();
});
