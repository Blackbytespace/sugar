import { test, expect, beforeAll, afterAll } from 'vitest';
import ensureDir from './ensureDir.js';
import * as fs from 'fs';
import * as path from 'path';

const testDir = path.join(__dirname, 'test-ensureDir');

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

test('ensureDir', async () => {
  // Test creating a single directory
  const singleDir = path.join(testDir, 'single-dir');
  expect(fs.existsSync(singleDir)).toBe(false);

  await ensureDir(singleDir);
  expect(fs.existsSync(singleDir)).toBe(true);
  expect(fs.statSync(singleDir).isDirectory()).toBe(true);

  // Test creating nested directory structure
  const nestedDir = path.join(testDir, 'nested', 'deep', 'structure');
  expect(fs.existsSync(nestedDir)).toBe(false);
  expect(fs.existsSync(path.dirname(nestedDir))).toBe(false);

  await ensureDir(nestedDir);
  expect(fs.existsSync(nestedDir)).toBe(true);
  expect(fs.statSync(nestedDir).isDirectory()).toBe(true);
  expect(fs.existsSync(path.dirname(nestedDir))).toBe(true);

  // Test ensuring existing directory (should not error)
  const existingDir = path.join(testDir, 'existing');
  fs.mkdirSync(existingDir, { recursive: true });
  expect(fs.existsSync(existingDir)).toBe(true);

  await ensureDir(existingDir);
  expect(fs.existsSync(existingDir)).toBe(true);
  expect(fs.statSync(existingDir).isDirectory()).toBe(true);

  // Test with special characters in directory name
  const specialDir = path.join(testDir, 'special chars & symbols');
  expect(fs.existsSync(specialDir)).toBe(false);

  await ensureDir(specialDir);
  expect(fs.existsSync(specialDir)).toBe(true);
  expect(fs.statSync(specialDir).isDirectory()).toBe(true);

  // Test with unicode characters
  const unicodeDir = path.join(testDir, 'unicode-目录-🚀');
  expect(fs.existsSync(unicodeDir)).toBe(false);

  await ensureDir(unicodeDir);
  expect(fs.existsSync(unicodeDir)).toBe(true);
  expect(fs.statSync(unicodeDir).isDirectory()).toBe(true);

  // Test very deep directory structure
  const veryDeepDir = path.join(
    testDir,
    'very',
    'deep',
    'directory',
    'structure',
    'with',
    'many',
    'levels',
    'for',
    'testing',
  );
  expect(fs.existsSync(veryDeepDir)).toBe(false);

  await ensureDir(veryDeepDir);
  expect(fs.existsSync(veryDeepDir)).toBe(true);
  expect(fs.statSync(veryDeepDir).isDirectory()).toBe(true);

  // Test return value (should be void/undefined)
  const returnTestDir = path.join(testDir, 'return-test');

  await ensureDir(returnTestDir);
  expect(fs.existsSync(returnTestDir)).toBe(true);

  // Test ensuring directory when parent path contains a file (should handle gracefully)
  const fileInPath = path.join(testDir, 'file-in-path.txt');
  fs.writeFileSync(fileInPath, 'content');

  const dirAfterFile = path.join(fileInPath, 'should-not-work');

  // This should throw an error because we can't create a directory inside a file
  await expect(ensureDir(dirAfterFile)).rejects.toThrow();

  // Test with empty string (should reject)
  const emptyDir = '';
  await expect(ensureDir(emptyDir)).rejects.toThrow();

  // Test with relative path
  const currentDir = process.cwd();
  const relativeDir = path.join(testDir, 'relative-test');

  // Change to test directory temporarily
  process.chdir(testDir);
  try {
    await ensureDir('relative-path');
    expect(fs.existsSync(path.join(testDir, 'relative-path'))).toBe(true);
  } finally {
    process.chdir(currentDir);
  }

  // Test concurrent directory creation
  const concurrentDirs = [
    path.join(testDir, 'concurrent1'),
    path.join(testDir, 'concurrent2'),
    path.join(testDir, 'concurrent3'),
  ];

  const promises = concurrentDirs.map((dir) => ensureDir(dir));
  await Promise.all(promises);

  concurrentDirs.forEach((dir) => {
    expect(fs.existsSync(dir)).toBe(true);
    expect(fs.statSync(dir).isDirectory()).toBe(true);
  });
});
