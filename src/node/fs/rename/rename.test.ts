import { test, expect, beforeAll, afterAll } from 'vitest';
import rename from './rename.js';
import * as fs from 'fs';
import * as path from 'path';

const testDir = path.join(__dirname, 'test-rename');

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

test('rename', async () => {
  // Test renaming a file
  const sourceFile = path.join(testDir, 'original-file.txt');
  fs.writeFileSync(sourceFile, 'test content');
  expect(fs.existsSync(sourceFile)).toBe(true);

  const newFileName = 'renamed-file.txt';
  const expectedNewPath = path.join(testDir, newFileName);

  await rename(sourceFile, newFileName);
  expect(fs.existsSync(sourceFile)).toBe(false);
  expect(fs.existsSync(expectedNewPath)).toBe(true);
  expect(fs.readFileSync(expectedNewPath, 'utf8')).toBe('test content');

  // Test renaming a directory
  const sourceDir = path.join(testDir, 'original-dir');
  fs.mkdirSync(sourceDir);
  fs.writeFileSync(path.join(sourceDir, 'inner-file.txt'), 'inner content');
  expect(fs.existsSync(sourceDir)).toBe(true);

  const newDirName = 'renamed-dir';
  const expectedNewDirPath = path.join(testDir, newDirName);

  await rename(sourceDir, newDirName);
  expect(fs.existsSync(sourceDir)).toBe(false);
  expect(fs.existsSync(expectedNewDirPath)).toBe(true);
  expect(fs.existsSync(path.join(expectedNewDirPath, 'inner-file.txt'))).toBe(
    true,
  );
  expect(
    fs.readFileSync(path.join(expectedNewDirPath, 'inner-file.txt'), 'utf8'),
  ).toBe('inner content');

  // Test renaming with different filename
  const sourceFile2 = path.join(testDir, 'source2.txt');
  fs.writeFileSync(sourceFile2, 'content2');

  const newFileName2 = 'renamed-with-different-name.txt';
  const expectedPath2 = path.join(testDir, newFileName2);
  await rename(sourceFile2, newFileName2);
  expect(fs.existsSync(sourceFile2)).toBe(false);
  expect(fs.existsSync(expectedPath2)).toBe(true);

  // Test renaming with override setting enabled (default behavior)
  const existing1 = path.join(testDir, 'existing1.txt');
  const existing2 = path.join(testDir, 'existing2.txt');
  fs.writeFileSync(existing1, 'content1');
  fs.writeFileSync(existing2, 'content2');

  // This should succeed since override is true by default
  await rename(existing1, 'existing2.txt');
  expect(fs.existsSync(existing1)).toBe(false);
  expect(fs.readFileSync(existing2, 'utf8')).toBe('content1'); // Should be overwritten

  // Test renaming with override setting disabled
  const existing3 = path.join(testDir, 'existing3.txt');
  const existing4 = path.join(testDir, 'existing4.txt');
  fs.writeFileSync(existing3, 'content3');
  fs.writeFileSync(existing4, 'content4');

  await expect(
    rename(existing3, 'existing4.txt', { override: false }),
  ).rejects.toThrow();
  expect(fs.existsSync(existing3)).toBe(true); // Should still exist
  expect(fs.readFileSync(existing4, 'utf8')).toBe('content4'); // Should be unchanged

  // Test return value (should be void/undefined)
  const returnTestFile = path.join(testDir, 'return-test.txt');
  fs.writeFileSync(returnTestFile, 'test');

  const result = await rename(returnTestFile, 'return-renamed.txt');
  expect(result).toBeUndefined();

  // Test renaming to same name (should be no-op)
  const sameNameFile = path.join(testDir, 'same-name.txt');
  fs.writeFileSync(sameNameFile, 'same content');

  await rename(sameNameFile, 'same-name.txt');
  expect(fs.existsSync(sameNameFile)).toBe(true);
  expect(fs.readFileSync(sameNameFile, 'utf8')).toBe('same content');

  // Test error handling - renaming non-existent file
  const nonExistentFile = path.join(testDir, 'non-existent.txt');
  await expect(rename(nonExistentFile, 'new-name.txt')).rejects.toThrow();
});
