import { test, expect, beforeAll, afterAll } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import ensureDirSync from './ensureDirSync.js';

let testDir: string;

beforeAll(() => {
  testDir = path.join(process.cwd(), 'test-ensure-dir-sync-dir');
  if (fs.existsSync(testDir)) {
    fs.rmSync(testDir, { recursive: true });
  }
});

afterAll(() => {
  if (fs.existsSync(testDir)) {
    fs.rmSync(testDir, { recursive: true });
  }
});

test('ensureDirSync', () => {
  // Test creating a new directory
  const newDir = path.join(testDir, 'new-directory');
  expect(fs.existsSync(newDir)).toBe(false);

  const result = ensureDirSync(newDir);

  expect(result).toBeUndefined(); // Function returns void
  expect(fs.existsSync(newDir)).toBe(true);
  expect(fs.lstatSync(newDir).isDirectory()).toBe(true);

  // Test creating nested directories
  const nestedDir = path.join(testDir, 'level1', 'level2', 'level3');
  expect(fs.existsSync(nestedDir)).toBe(false);

  ensureDirSync(nestedDir);

  expect(fs.existsSync(nestedDir)).toBe(true);
  expect(fs.lstatSync(nestedDir).isDirectory()).toBe(true);
  expect(fs.existsSync(path.join(testDir, 'level1'))).toBe(true);
  expect(fs.existsSync(path.join(testDir, 'level1', 'level2'))).toBe(true);

  // Test ensuring existing directory (should not throw)
  ensureDirSync(newDir);
  expect(fs.existsSync(newDir)).toBe(true);

  // Test ensuring directory when file with same name exists (should throw)
  const fileInsteadOfDir = path.join(testDir, 'file-instead-of-dir');
  fs.mkdirSync(testDir, { recursive: true });
  fs.writeFileSync(fileInsteadOfDir, 'this is a file');

  // This should throw an error because a file already exists at that path
  expect(() => ensureDirSync(fileInsteadOfDir)).toThrow();

  // Test with empty string path (should throw or handle gracefully)
  expect(() => ensureDirSync('')).toThrow();

  // Test with current directory
  expect(() => ensureDirSync('.')).not.toThrow();
  expect(fs.existsSync('.')).toBe(true);

  // Test with relative paths
  const relativeDir = path.join(testDir, 'relative', '..', 'relative');
  ensureDirSync(relativeDir);
  expect(fs.existsSync(relativeDir)).toBe(true);
});
