import fs from 'fs';
import { describe, it, expect } from 'vitest';
import copy from '../copy/copy.js';

describe('sugar.node.fs.copy', () => {
  it('should copy correctly a file', async () => {
    if (fs.existsSync(`${__dirname}/data/copy.dest`)) {
      fs.unlinkSync(`${__dirname}/data/copy.dest`);
    }

    await copy(`${__dirname}/data/copy.src`, `${__dirname}/data/copy.dest`);

    const file = fs.readFileSync(`${__dirname}/data/copy.dest`, 'utf-8');
    expect(file).toEqual(`Hello world`);
  });
});
