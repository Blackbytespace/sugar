import { test, expect, beforeAll, afterAll } from 'vitest';
import fs from 'fs';
import path from 'path';
import tmpDir from 'temp-dir';
import writeTmpFile from './writeTmpFile.js';

test('writeTmpFile', async () => {
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
  const result1 = await writeTmpFile('Hello World');
  const result1Str = String(result1);
  createdFiles.push(result1Str);

  expect(typeof result1).toBe('string');
  expect(result1Str).toMatch(/\.tmp$/);
  expect(result1Str.startsWith(tmpDir)).toBe(true);
  expect(fs.existsSync(result1Str)).toBe(true);
  expect(fs.readFileSync(result1Str, 'utf8')).toBe('Hello World');

  // Test with custom path setting
  const customPath = 'custom-test-file.txt';
  const result2 = await writeTmpFile('Custom content', { path: customPath });
  const result2Str = String(result2);
  createdFiles.push(result2Str);

  expect(result2Str).toBe(path.resolve(tmpDir, customPath));
  expect(fs.existsSync(result2Str)).toBe(true);
  expect(fs.readFileSync(result2Str, 'utf8')).toBe('Custom content');

  // Test with object data (should be converted to string)
  const objData = { name: 'test', value: 42 };
  const result3 = await writeTmpFile(objData);
  const result3Str = String(result3);
  createdFiles.push(result3Str);

  expect(fs.existsSync(result3Str)).toBe(true);
  const content3 = fs.readFileSync(result3Str, 'utf8');
  // Should contain the object data in some string form
  expect(content3).toContain('name');
  expect(content3).toContain('test');
  expect(content3).toContain('value');
  expect(content3).toContain('42');

  // Test with number data
  const result4 = await writeTmpFile(12345);
  const result4Str = String(result4);
  createdFiles.push(result4Str);

  expect(fs.existsSync(result4Str)).toBe(true);
  expect(fs.readFileSync(result4Str, 'utf8')).toBe('12345');

  // Test with boolean data
  const result5 = await writeTmpFile(true);
  const result5Str = String(result5);
  createdFiles.push(result5Str);

  expect(fs.existsSync(result5Str)).toBe(true);
  expect(fs.readFileSync(result5Str, 'utf8')).toBe('true');

  // Test with null data
  const result6 = await writeTmpFile(null);
  const result6Str = String(result6);
  createdFiles.push(result6Str);

  expect(fs.existsSync(result6Str)).toBe(true);
  expect(fs.readFileSync(result6Str, 'utf8')).toBe('null');

  // Test with undefined data
  const result7 = await writeTmpFile(undefined);
  const result7Str = String(result7);
  createdFiles.push(result7Str);

  expect(fs.existsSync(result7Str)).toBe(true);
  expect(fs.readFileSync(result7Str, 'utf8')).toBe('undefined');

  // Test with empty string
  const result8 = await writeTmpFile('');
  const result8Str = String(result8);
  createdFiles.push(result8Str);

  expect(fs.existsSync(result8Str)).toBe(true);
  expect(fs.readFileSync(result8Str, 'utf8')).toBe('');

  // Test with nested path
  const nestedPath = 'subfolder/nested-file.txt';
  const result9 = await writeTmpFile('Nested content', { path: nestedPath });
  const result9Str = String(result9);
  createdFiles.push(result9Str);

  expect(result9Str).toBe(path.resolve(tmpDir, nestedPath));
  expect(fs.existsSync(result9Str)).toBe(true);
  expect(fs.readFileSync(result9Str, 'utf8')).toBe('Nested content');

  // Test uniqueness - multiple calls should create different files
  const result10 = await writeTmpFile('File 1');
  const result11 = await writeTmpFile('File 2');
  const result10Str = String(result10);
  const result11Str = String(result11);
  createdFiles.push(result10Str, result11Str);

  expect(result10Str).not.toBe(result11Str);
  expect(fs.readFileSync(result10Str, 'utf8')).toBe('File 1');
  expect(fs.readFileSync(result11Str, 'utf8')).toBe('File 2');
});
