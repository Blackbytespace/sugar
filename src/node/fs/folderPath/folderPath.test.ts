import { test, expect, beforeAll, afterAll } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import folderPath from './folderPath.js';

let testDir: string;
let testFile: string;

beforeAll(() => {
  // Create temporary test directory and file
  testDir = path.join(process.cwd(), 'test-folder-path-dir');
  testFile = path.join(testDir, 'test-file.txt');

  if (!fs.existsSync(testDir)) {
    fs.mkdirSync(testDir, { recursive: true });
  }
  fs.writeFileSync(testFile, 'test content');
});

afterAll(() => {
  // Clean up test files
  if (fs.existsSync(testFile)) {
    fs.unlinkSync(testFile);
  }
  if (fs.existsSync(testDir)) {
    fs.rmdirSync(testDir);
  }
});

test('folderPath', () => {
  // Test basic folder path extraction
  expect(folderPath('my/cool/path.js')).toBe('my/cool');
  expect(folderPath('/absolute/path/file.txt')).toBe('/absolute/path');
  expect(folderPath('./relative/path/file.js')).toBe('./relative/path');
  expect(folderPath('../parent/file.html')).toBe('../parent');

  // Test single level paths (should return empty string)
  expect(folderPath('file.txt')).toBe('');
  expect(folderPath('README')).toBe('');

  // Test empty path
  expect(folderPath('')).toBe('');

  // Test paths with multiple levels
  expect(folderPath('a/b/c/d/file.js')).toBe('a/b/c/d');
  expect(folderPath('very/deep/nested/folder/structure/file.txt')).toBe(
    'very/deep/nested/folder/structure',
  );

  // Test with trailing slash (trailing slash means the path is a folder itself)
  expect(folderPath('path/to/folder/')).toBe('path/to/folder');

  // Test with special characters
  expect(folderPath('path with spaces/file.txt')).toBe('path with spaces');
  expect(folderPath('path-with-dashes/file.txt')).toBe('path-with-dashes');
  expect(folderPath('path_with_underscores/file.txt')).toBe(
    'path_with_underscores',
  );

  // Test without checkExistence (default)
  expect(folderPath('non/existent/file.txt')).toBe('non/existent');

  // Test with checkExistence setting
  expect(folderPath(testFile, { checkExistence: true })).toBe(testDir);
  expect(folderPath('non/existent/file.txt', { checkExistence: true })).toBe(
    '',
  );
  expect(folderPath('invalid-path', { checkExistence: true })).toBe('');

  // Test default settings behavior
  expect(folderPath('path/to/file.js', {})).toBe('path/to');
  expect(folderPath('path/to/file.js', { checkExistence: false })).toBe(
    'path/to',
  );

  // Test edge cases
  expect(folderPath('/')).toBe('');
  expect(folderPath('/file')).toBe('');
  expect(folderPath('/a/file')).toBe('/a');
});
