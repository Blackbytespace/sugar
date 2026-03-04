import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'node:url';
import { describe, it, expect, afterAll } from 'vitest';
import copySync from './copySync.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('sugar.node.fs.copySync', () => {
  const destFile = `${__dirname}/../copy/data/copySync.dest`;
  
  afterAll(() => {
    // Clean up test files
    try {
      if (fs.existsSync(destFile)) {
        fs.unlinkSync(destFile);
      }
    } catch (error) {
      console.warn('Cleanup failed:', error.message);
    }
  });

  it('should copy correctly a file', () => {
    // Clean up any existing destination file
    if (fs.existsSync(destFile)) {
      fs.unlinkSync(destFile);
    }

    // Perform the copy operation
    copySync(
      `${__dirname}/../copy/data/copySync.src`,
      destFile,
    );

    // Verify the file was copied correctly
    const file = fs.readFileSync(destFile, 'utf-8');
    expect(file).toEqual(`Hello world`);
  });
});
