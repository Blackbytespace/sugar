import { test, expect, beforeAll, afterAll } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import removeSync from './removeSync.js';

let testDir: string;

beforeAll(() => {
  testDir = path.join(process.cwd(), 'test-remove-sync-dir');
  if (fs.existsSync(testDir)) {
    fs.rmSync(testDir, { recursive: true });
  }
});

afterAll(() => {
  if (fs.existsSync(testDir)) {
    fs.rmSync(testDir, { recursive: true });
  }
});

test('removeSync', () => {
  // Test removing a file
  const testFile = path.join(testDir, 'test-file.txt');
  fs.mkdirSync(testDir, { recursive: true });
  fs.writeFileSync(testFile, 'test content');

  expect(fs.existsSync(testFile)).toBe(true);
  const result = removeSync(testFile);
  expect(result).toBeUndefined(); // Function returns void
  expect(fs.existsSync(testFile)).toBe(false);

  // Test removing an empty directory
  const testDirEmpty = path.join(testDir, 'empty-dir');
  fs.mkdirSync(testDirEmpty, { recursive: true });

  expect(fs.existsSync(testDirEmpty)).toBe(true);
  removeSync(testDirEmpty);
  expect(fs.existsSync(testDirEmpty)).toBe(false);

  // Test removing a directory with contents
  const testDirWithContents = path.join(testDir, 'dir-with-contents');
  const nestedFile = path.join(testDirWithContents, 'nested', 'file.txt');
  fs.mkdirSync(path.dirname(nestedFile), { recursive: true });
  fs.writeFileSync(nestedFile, 'nested content');

  expect(fs.existsSync(testDirWithContents)).toBe(true);
  expect(fs.existsSync(nestedFile)).toBe(true);
  removeSync(testDirWithContents);
  expect(fs.existsSync(testDirWithContents)).toBe(false);
  expect(fs.existsSync(nestedFile)).toBe(false);

  // Test removing non-existent path (should not throw - fs-extra behavior)
  const nonExistentPath = path.join(testDir, 'non-existent');
  expect(() => removeSync(nonExistentPath)).not.toThrow();

  // Test removing non-existent file (should not throw)
  const nonExistentFile = path.join(testDir, 'non-existent.txt');
  expect(() => removeSync(nonExistentFile)).not.toThrow();

  // Test removing with special characters in path
  const specialDir = path.join(testDir, 'special chars & symbols!');
  const specialFile = path.join(specialDir, 'file with spaces.txt');
  fs.mkdirSync(specialDir, { recursive: true });
  fs.writeFileSync(specialFile, 'special content');

  expect(fs.existsSync(specialFile)).toBe(true);
  removeSync(specialDir);
  expect(fs.existsSync(specialDir)).toBe(false);
});
