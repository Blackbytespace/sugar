import fs from 'fs';
import { describe, it } from 'vitest';
import copy from '../copy.js';

describe('sugar.node.fs.copy', () => {
  it('should copy correctly a file', async () => {
    if (fs.existsSync(`${__dirname}/data/copy/copy.dest`)) {
      fs.unlinkSync(`${__dirname}/data/copy/copy.dest`);
    }

    await copy(
      `${__dirname}/data/copy/copy.src`,
      `${__dirname}/data/copy/copy.dest`,
    );

    const file = fs.readFileSync(`${__dirname}/data/copy/copy.dest`, 'utf-8');
    expect(file).toEqual(`Hello world`);
  });
});
