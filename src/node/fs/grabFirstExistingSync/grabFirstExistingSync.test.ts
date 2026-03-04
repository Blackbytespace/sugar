import { test, expect, beforeAll, afterAll } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import grabFirstExistingSync from './grabFirstExistingSync.js';

let testDir: string;
let testFiles: string[];

beforeAll(() => {
  // Create temporary test directory and files
  testDir = path.join(process.cwd(), 'test-grab-first-existing-dir');

  if (!fs.existsSync(testDir)) {
    fs.mkdirSync(testDir, { recursive: true });
  }

  testFiles = [
    path.join(testDir, 'file1.txt'),
    path.join(testDir, 'file2.txt'),
    path.join(testDir, 'file3.txt'),
  ];

  // Create some of the test files
  fs.writeFileSync(testFiles[1], 'test2'); // Only create file2.txt
  fs.writeFileSync(testFiles[2], 'test3'); // Only create file3.txt
});

afterAll(() => {
  // Clean up test files
  if (fs.existsSync(testDir)) {
    fs.rmSync(testDir, { recursive: true });
  }
});

test('grabFirstExistingSync', () => {
  // Test finding the first existing file
  const result1 = grabFirstExistingSync([
    path.join(testDir, 'nonexistent1.txt'),
    testFiles[1], // This exists
    testFiles[2], // This also exists but should not be returned
  ]);
  expect(result1).toBe(testFiles[1]);

  // Test when first file exists
  const result2 = grabFirstExistingSync([
    testFiles[1], // This exists (first)
    testFiles[2], // This exists (second)
  ]);
  expect(result2).toBe(testFiles[1]);

  // Test when no files exist
  const result3 = grabFirstExistingSync([
    path.join(testDir, 'nonexistent1.txt'),
    path.join(testDir, 'nonexistent2.txt'),
    path.join(testDir, 'nonexistent3.txt'),
  ]);
  expect(result3).toBe('');

  // Test with empty array
  const result4 = grabFirstExistingSync([]);
  expect(result4).toBe('');

  // Test with relative and absolute paths
  const result5 = grabFirstExistingSync([
    './nonexistent-relative.txt',
    testFiles[2], // This exists
  ]);
  expect(result5).toBe(testFiles[2]);

  // Test with directory paths
  const result6 = grabFirstExistingSync([
    path.join(testDir, 'nonexistent-dir'),
    testDir, // This directory exists
  ]);
  expect(result6).toBe(testDir);

  // Test order matters - should return first existing path
  const result7 = grabFirstExistingSync([
    path.join(testDir, 'nonexistent.txt'),
    testFiles[2], // This exists (should be returned)
    testFiles[1], // This also exists but comes after
  ]);
  expect(result7).toBe(testFiles[2]);
});
