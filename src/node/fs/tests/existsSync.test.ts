import { describe, it } from 'vitest';
import existsSync from '../existsSync.js';

describe('sugar.node.fs.existsSync', () => {
  it('should detect a file correctly', () => {
    expect(existsSync(`${__dirname}/data/exists/exists.test`)).toBe(true);
  });
  it('should detect a folder correctly', () => {
    expect(existsSync(`${__dirname}/data/exists`)).toBe(true);
  });
  it('should detect a symlinked file correctly', () => {
    expect(existsSync(`${__dirname}/data/exists/symlink`)).toBe(true);
  });
  it('should not detect a file if "file" setting is false', () => {
    expect(
      existsSync(`${__dirname}/data/exists/exists.test`, {
        file: false,
      }),
    ).toBe(false);
  });
  it('should not detect a folder if "directory" setting is false', () => {
    expect(
      existsSync(`${__dirname}/data/exists`, {
        directory: false,
      }),
    ).toBe(false);
  });
  it('should not detect a symlinked file if "symlink" setting is false', () => {
    expect(
      existsSync(`${__dirname}/data/exists/symlinkFolder/exists.test`, {
        symlink: false,
      }),
    ).toBe(false);
  });
});
