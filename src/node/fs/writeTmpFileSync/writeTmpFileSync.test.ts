import { test, expect, afterAll } from 'vitest';
import fs from 'fs';
import path from 'path';
import tmpDir from 'temp-dir';
import writeTmpFileSync from './writeTmpFileSync.js';

test('writeTmpFileSync', () => {
  let createdFiles: string[] = [];

  // Clean up function
  const cleanup = () => {
    createdFiles.forEach((file) => {
      if (fs.existsSync(file)) {
        fs.unlinkSync(file);
      }
    });
    createdFiles = [];
  };

  afterAll(() => {
    cleanup();
  });

  // Test basic file writing with string content
  const result1 = writeTmpFileSync('Hello World');
  createdFiles.push(result1);

  expect(typeof result1).toBe('string');
  expect(result1).toMatch(/\.tmp$/);
  expect(result1.startsWith(tmpDir)).toBe(true);
  expect(fs.existsSync(result1)).toBe(true);
  expect(fs.readFileSync(result1, 'utf8')).toBe('Hello World');

  // Test with custom path setting
  const customPath = 'custom-test-file-sync.txt';
  const result2 = writeTmpFileSync('Custom content', { path: customPath });
  createdFiles.push(result2);

  expect(result2).toBe(path.resolve(tmpDir, customPath));
  expect(fs.existsSync(result2)).toBe(true);
  expect(fs.readFileSync(result2, 'utf8')).toBe('Custom content');

  // Test with object data (should be converted to string)
  const objData = { name: 'test', value: 42 };
  const result3 = writeTmpFileSync(objData);
  createdFiles.push(result3);

  expect(fs.existsSync(result3)).toBe(true);
  const content3 = fs.readFileSync(result3, 'utf8');
  // Should contain the object data in some string form
  expect(content3).toContain('name');
  expect(content3).toContain('test');
  expect(content3).toContain('value');
  expect(content3).toContain('42');

  // Test with number data
  const result4 = writeTmpFileSync(12345);
  createdFiles.push(result4);

  expect(fs.existsSync(result4)).toBe(true);
  expect(fs.readFileSync(result4, 'utf8')).toBe('12345');

  // Test with boolean data
  const result5 = writeTmpFileSync(true);
  createdFiles.push(result5);

  expect(fs.existsSync(result5)).toBe(true);
  expect(fs.readFileSync(result5, 'utf8')).toBe('true');

  // Test with null data
  const result6 = writeTmpFileSync(null);
  createdFiles.push(result6);

  expect(fs.existsSync(result6)).toBe(true);
  expect(fs.readFileSync(result6, 'utf8')).toBe('null');

  // Test with undefined data
  const result7 = writeTmpFileSync(undefined);
  createdFiles.push(result7);

  expect(fs.existsSync(result7)).toBe(true);
  expect(fs.readFileSync(result7, 'utf8')).toBe('undefined');

  // Test with empty string
  const result8 = writeTmpFileSync('');
  createdFiles.push(result8);

  expect(fs.existsSync(result8)).toBe(true);
  expect(fs.readFileSync(result8, 'utf8')).toBe('');

  // Test with nested path
  const nestedPath = 'subfolder-sync/nested-file.txt';
  const result9 = writeTmpFileSync('Nested content', { path: nestedPath });
  createdFiles.push(result9);

  expect(result9).toBe(path.resolve(tmpDir, nestedPath));
  expect(fs.existsSync(result9)).toBe(true);
  expect(fs.readFileSync(result9, 'utf8')).toBe('Nested content');

  // Test uniqueness - multiple calls should create different files
  const result10 = writeTmpFileSync('File 1');
  const result11 = writeTmpFileSync('File 2');
  createdFiles.push(result10, result11);

  expect(result10).not.toBe(result11);
  expect(fs.readFileSync(result10, 'utf8')).toBe('File 1');
  expect(fs.readFileSync(result11, 'utf8')).toBe('File 2');

  // Test that files are actually created synchronously
  const result12 = writeTmpFileSync('Immediate test');
  createdFiles.push(result12);
  // Should be able to read immediately without await
  expect(fs.readFileSync(result12, 'utf8')).toBe('Immediate test');
});
