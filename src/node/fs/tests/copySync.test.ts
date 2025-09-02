import fs from 'fs';
import { describe, it } from 'vitest';
import copySync from '../copy.js';

describe('sugar.node.fs.copySync', () => {
  it('should copy correctly a file', async () => {
    if (fs.existsSync(`${__dirname}/data/copy/copySync.dest`)) {
      fs.unlinkSync(`${__dirname}/data/copy/copySync.dest`);
    }

    await new Promise((resolve) => {
      copySync(
        `${__dirname}/data/copy/copySync.src`,
        `${__dirname}/data/copy/copySync.dest`,
      );
      setTimeout(() => {
        resolve(true);
      }, 100);
    });

    const file = fs.readFileSync(
      `${__dirname}/data/copy/copySync.dest`,
      'utf-8',
    );

    expect(file).toEqual(`Hello world`);
  });
});
