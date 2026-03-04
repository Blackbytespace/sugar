import { test, expect } from 'vitest';
import filename from './filename.js';

test('filename', () => {
  // Test basic filename extraction with extension
  expect(filename('hello/world.js')).toBe('world.js');
  expect(filename('test.txt')).toBe('test.txt');
  expect(filename('/absolute/path/file.pdf')).toBe('file.pdf');

  // Test filename extraction without extension
  expect(filename('hello/world.js', false)).toBe('world');
  expect(filename('test.txt', false)).toBe('test');
  expect(filename('/absolute/path/file.pdf', false)).toBe('file');

  // Test files without extension
  expect(filename('hello/world')).toBe('world');
  expect(filename('hello/world', false)).toBe('world');
  expect(filename('README')).toBe('README');
  expect(filename('README', false)).toBe('README');

  // Test with multiple extensions
  expect(filename('archive.tar.gz')).toBe('archive.tar.gz');
  expect(filename('archive.tar.gz', false)).toBe('archive.tar');
  expect(filename('backup.db.old')).toBe('backup.db.old');
  expect(filename('backup.db.old', false)).toBe('backup.db');

  // Test hidden files
  expect(filename('.gitignore')).toBe('.gitignore');
  expect(filename('.gitignore', false)).toBe('');
  expect(filename('.env.local')).toBe('.env.local');
  expect(filename('.env.local', false)).toBe('.env');

  // Test edge cases
  expect(filename('')).toBe('');
  expect(filename('', false)).toBe('');
  expect(filename('.')).toBe('.');
  expect(filename('.', false)).toBe('.');
  expect(filename('..')).toBe('..');
  expect(filename('..', false)).toBe('..');

  // Test different path separators
  expect(filename('./relative/path/file.css')).toBe('file.css');
  expect(filename('./relative/path/file.css', false)).toBe('file');
  expect(filename('../parent/file.html')).toBe('file.html');
  expect(filename('../parent/file.html', false)).toBe('file');

  // Test with spaces and special characters
  expect(filename('my file.doc')).toBe('my file.doc');
  expect(filename('my file.doc', false)).toBe('my file');
  expect(filename('file-name.json')).toBe('file-name.json');
  expect(filename('file-name.json', false)).toBe('file-name');

  // Test case sensitivity
  expect(filename('image.JPG')).toBe('image.JPG');
  expect(filename('image.JPG', false)).toBe('image');

  // Test default parameter behavior
  expect(filename('test.js', true)).toBe('test.js');
  expect(filename('test.js')).toBe('test.js'); // default is true
});
