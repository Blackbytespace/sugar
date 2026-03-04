import { describe, it, expect } from 'vitest';
import existsSync from './existsSync.js';

describe('sugar.node.fs.existsSync', () => {
  it('should detect a file correctly', () => {
    expect(existsSync(`${__dirname}/../exists/data/exists.test`)).toBe(true);
  });
  it('should detect a folder correctly', () => {
    expect(existsSync(`${__dirname}/../exists/data`)).toBe(true);
  });
  it('should detect a symlinked file correctly', () => {
    expect(existsSync(`${__dirname}/../exists/data/symlink`)).toBe(true);
  });
  it('should not detect a file if "file" setting is false', () => {
    expect(
      existsSync(`${__dirname}/../exists/data/exists.test`, {
        file: false,
      }),
    ).toBe(false);
  });
  it('should not detect a folder if "directory" setting is false', () => {
    expect(
      existsSync(`${__dirname}/../exists/data`, {
        directory: false,
      }),
    ).toBe(false);
  });
  it('should not detect a symlinked file if "symlink" setting is false', () => {
    expect(
      existsSync(`${__dirname}/../exists/data/symlinkFolder/exists.test`, {
        symlink: false,
      }),
    ).toBe(false);
  });
});
