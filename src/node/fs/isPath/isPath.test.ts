import { test, expect, beforeAll, afterAll } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import isPath from './isPath.js';

let testDir: string;
let testFile: string;

beforeAll(() => {
  // Create temporary test directory and file
  testDir = path.join(process.cwd(), 'test-tmp-dir');
  testFile = path.join(testDir, 'test-file.txt');

  if (!fs.existsSync(testDir)) {
    fs.mkdirSync(testDir, { recursive: true });
  }
  fs.writeFileSync(testFile, 'test content');
});

afterAll(() => {
  // Clean up test files
  try {
    if (fs.existsSync(testFile)) {
      fs.unlinkSync(testFile);
    }
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
  } catch (error) {
    console.warn('Cleanup failed:', error.message);
  }
});

test('isPath', () => {
  // Test valid paths without checking existence
  expect(isPath('hello/world')).toBe(true);
  expect(isPath('./relative/path')).toBe(true);
  expect(isPath('../parent/path')).toBe(true);
  expect(isPath('/absolute/path')).toBe(true);
  expect(isPath('file.txt')).toBe(true);
  expect(isPath('path/to/file.js')).toBe(true);

  // Test invalid inputs - not strings
  expect(isPath(null as any)).toBe(false);
  expect(isPath(undefined as any)).toBe(false);
  expect(isPath(123 as any)).toBe(false);
  expect(isPath([] as any)).toBe(false);
  expect(isPath({} as any)).toBe(false);

  // Test empty or whitespace-only strings
  expect(isPath('')).toBe(false);
  expect(isPath('   ')).toBe(false);
  expect(isPath('\\t')).toBe(false);
  expect(isPath('\\n')).toBe(false);

  // Test multiline content (should be invalid)
  expect(isPath('line1\\nline2')).toBe(false);
  expect(isPath('hello\\nworld')).toBe(false);

  // Test strings without slashes or dots (should be invalid based on logic)
  expect(isPath('justtext')).toBe(false);
  expect(isPath('nopathindicators')).toBe(false);

  // Test with dots but no slashes (should be valid)
  expect(isPath('file.txt')).toBe(true);
  expect(isPath('.hidden')).toBe(true);
  expect(isPath('..parent')).toBe(true);

  // Test hidden files and special directories
  expect(isPath('.gitignore')).toBe(true);
  expect(isPath('.env')).toBe(true);
  expect(isPath('.')).toBe(true);
  expect(isPath('..')).toBe(true);

  // Test with existence checking using actual files
  expect(isPath(testFile, true)).toBe(true); // existing file
  expect(isPath(testDir, true)).toBe(true); // existing directory
  expect(isPath('non/existent/path', true)).toBe(false); // non-existent path
  expect(isPath('non-existent-file.txt', true)).toBe(false); // non-existent file

  // Test valid paths that don't exist (should be true without existence check)
  expect(isPath('non/existent/path')).toBe(true);
  expect(isPath('future/file.txt')).toBe(true);

  // Test special characters in paths
  expect(isPath('path with spaces/file.txt')).toBe(true);
  expect(isPath('path-with-dashes/file.txt')).toBe(true);
  expect(isPath('path_with_underscores/file.txt')).toBe(true);

  // Test default parameter behavior
  expect(isPath(testFile)).toBe(true); // default checkExistence is false
  expect(isPath(testFile, false)).toBe(true); // explicit false
});
