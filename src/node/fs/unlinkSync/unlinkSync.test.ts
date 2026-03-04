import { test, expect, beforeAll, afterAll } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import unlinkSync from './unlinkSync.js';

let testDir: string;

beforeAll(() => {
  testDir = path.join(process.cwd(), 'test-unlink-sync-dir');
  if (fs.existsSync(testDir)) {
    fs.rmSync(testDir, { recursive: true });
  }
});

afterAll(() => {
  if (fs.existsSync(testDir)) {
    fs.rmSync(testDir, { recursive: true });
  }
});

test('unlinkSync', () => {
  // Test removing a file
  const testFile = path.join(testDir, 'test-file.txt');
  fs.mkdirSync(testDir, { recursive: true });
  fs.writeFileSync(testFile, 'test content');

  expect(fs.existsSync(testFile)).toBe(true);
  unlinkSync(testFile);
  expect(fs.existsSync(testFile)).toBe(false);

  // Test removing an empty directory
  const testDirEmpty = path.join(testDir, 'empty-dir');
  fs.mkdirSync(testDirEmpty, { recursive: true });

  expect(fs.existsSync(testDirEmpty)).toBe(true);
  unlinkSync(testDirEmpty);
  expect(fs.existsSync(testDirEmpty)).toBe(false);

  // Test removing a directory with contents
  const testDirWithContents = path.join(testDir, 'dir-with-contents');
  const nestedFile = path.join(testDirWithContents, 'nested', 'file.txt');
  fs.mkdirSync(path.dirname(nestedFile), { recursive: true });
  fs.writeFileSync(nestedFile, 'nested content');

  expect(fs.existsSync(testDirWithContents)).toBe(true);
  expect(fs.existsSync(nestedFile)).toBe(true);
  unlinkSync(testDirWithContents);
  expect(fs.existsSync(testDirWithContents)).toBe(false);
  expect(fs.existsSync(nestedFile)).toBe(false);

  // Test removing non-existent path (should not throw)
  const nonExistentPath = path.join(testDir, 'non-existent');
  expect(() => unlinkSync(nonExistentPath)).not.toThrow();

  // Test removing non-existent file (should not throw)
  const nonExistentFile = path.join(testDir, 'non-existent.txt');
  expect(() => unlinkSync(nonExistentFile)).not.toThrow();

  // Test that function returns void
  fs.writeFileSync(testFile, 'test content again');
  const result = unlinkSync(testFile);
  expect(result).toBeUndefined();
});
