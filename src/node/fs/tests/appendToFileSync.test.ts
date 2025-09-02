import * as fs from 'fs';
import * as path from 'path';
import { describe, expect, it } from 'vitest';
import appendToFileSync from '../appendToFileSync';

describe('sugar.node.fs.appendToFileSync', () => {
  it('should append a string to a file', () => {
    const filePath = path.join(__dirname, 'data/test.txt');
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    fs.writeFileSync(filePath, 'Hello, world!');
    appendToFileSync(filePath, 'How are you?');
    expect(fs.readFileSync(filePath, 'utf8')).toBe(
      'Hello, world!\nHow are you?',
    );
  });
});
