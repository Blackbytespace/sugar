import { test, expect, beforeAll, afterAll } from 'vitest';
import moveSync from './moveSync.js';
import * as fs from 'fs';
import * as path from 'path';

const testDir = path.join(__dirname, 'test-moveSync');

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

test('moveSync', () => {
  // Test moving a file
  const sourceFile = path.join(testDir, 'source.txt');
  const destFile = path.join(testDir, 'dest.txt');
  fs.writeFileSync(sourceFile, 'test content');

  moveSync(sourceFile, destFile);
  expect(fs.existsSync(sourceFile)).toBe(false);
  expect(fs.existsSync(destFile)).toBe(true);
  expect(fs.readFileSync(destFile, 'utf8')).toBe('test content');

  // Test moving a file to a directory that doesn't exist yet
  const sourceFile2 = destFile; // Use the previously moved file
  const nestedDest = path.join(testDir, 'nested', 'deep', 'moved.txt');

  moveSync(sourceFile2, nestedDest);
  expect(fs.existsSync(sourceFile2)).toBe(false);
  expect(fs.existsSync(nestedDest)).toBe(true);
  expect(fs.readFileSync(nestedDest, 'utf8')).toBe('test content');

  // Test moving a directory
  const sourceDir = path.join(testDir, 'source-dir');
  const destDir = path.join(testDir, 'dest-dir');

  fs.mkdirSync(sourceDir, { recursive: true });
  fs.writeFileSync(path.join(sourceDir, 'file1.txt'), 'content1');
  fs.writeFileSync(path.join(sourceDir, 'file2.txt'), 'content2');
  fs.mkdirSync(path.join(sourceDir, 'subdir'));
  fs.writeFileSync(path.join(sourceDir, 'subdir', 'file3.txt'), 'content3');

  moveSync(sourceDir, destDir);
  expect(fs.existsSync(sourceDir)).toBe(false);
  expect(fs.existsSync(destDir)).toBe(true);
  expect(fs.readFileSync(path.join(destDir, 'file1.txt'), 'utf8')).toBe(
    'content1',
  );
  expect(fs.readFileSync(path.join(destDir, 'file2.txt'), 'utf8')).toBe(
    'content2',
  );
  expect(
    fs.readFileSync(path.join(destDir, 'subdir', 'file3.txt'), 'utf8'),
  ).toBe('content3');

  // Test moving when source equals destination (should be no-op)
  const sameFile = path.join(testDir, 'same.txt');
  fs.writeFileSync(sameFile, 'same content');

  moveSync(sameFile, sameFile);
  expect(fs.existsSync(sameFile)).toBe(true);
  expect(fs.readFileSync(sameFile, 'utf8')).toBe('same content');

  // Test moving to existing file (fs-extra doesn't overwrite by default, so this should fail)
  const overwriteSource = path.join(testDir, 'overwrite-source.txt');
  const overwriteDest = path.join(testDir, 'overwrite-dest.txt');

  fs.writeFileSync(overwriteSource, 'new content');
  fs.writeFileSync(overwriteDest, 'old content');

  // fs-extra moveSync throws error when destination exists
  expect(() => moveSync(overwriteSource, overwriteDest)).toThrow(
    'dest already exists',
  );

  // Test return value (should be void/undefined)
  const testFile = path.join(testDir, 'return-test.txt');
  const testDest = path.join(testDir, 'return-dest.txt');
  fs.writeFileSync(testFile, 'test');

  const result = moveSync(testFile, testDest);
  expect(result).toBeUndefined();

  // Test error handling - moving non-existent file
  const nonExistentFile = path.join(testDir, 'non-existent.txt');
  const errorDest = path.join(testDir, 'error-dest.txt');

  expect(() => moveSync(nonExistentFile, errorDest)).toThrow();
});
