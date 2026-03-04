import { test, expect } from 'vitest';
import extension from './extension.js';

test('extension', () => {
  // Test basic extension extraction
  expect(extension('hello/world.jpg')).toBe('jpg');
  expect(extension('test.txt')).toBe('txt');
  expect(extension('document.pdf')).toBe('pdf');

  // Test with multiple dots
  expect(extension('archive.tar.gz')).toBe('gz');
  expect(extension('backup.db.old')).toBe('old');

  // Test files without extension
  expect(extension('hello/world')).toBe('');
  expect(extension('README')).toBe('');
  expect(extension('Makefile')).toBe('');

  // Test with hidden files
  expect(extension('.gitignore')).toBe('gitignore');
  expect(extension('.env.local')).toBe('local');
  expect(extension('.env')).toBe('env');

  // Test edge cases
  expect(extension('')).toBe('');
  expect(extension('.')).toBe('');
  expect(extension('..')).toBe('');
  expect(extension('file.')).toBe('');

  // Test with paths
  expect(extension('/absolute/path/file.js')).toBe('js');
  expect(extension('./relative/path/file.css')).toBe('css');
  expect(extension('../parent/file.html')).toBe('html');

  // Test with spaces and special characters
  expect(extension('my file.doc')).toBe('doc');
  expect(extension('file-name.json')).toBe('json');
  expect(extension('file_name.xml')).toBe('xml');

  // Test case sensitivity
  expect(extension('image.JPG')).toBe('JPG');
  expect(extension('script.JS')).toBe('JS');
});
