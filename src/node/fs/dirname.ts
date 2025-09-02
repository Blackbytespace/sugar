import path from 'path';

/**
 * @name            dirname
 * @namespace       node.fs
 * @type            Function
 * @platform        node
 * @status          stable
 *
 * Return the dirname the same as the dirname cjs variable.
 * The only difference is that it's a function and you need to pass the "import" variable
 * from the filename in which you use this...
 *
 * @return      {String}                            The dirname path
 *
 * @snippet         dirname()
 *
 * @example             js
 * import { dirname } from '@blackbyte/sugar/fs';
 * dirname();
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function dirname(): string {
  const error = new Error();

  // @ts-ignore
  const stackArray = error.stack.split('\n');

  let pathLine,
    dirnameLineFound = false;

  for (let i = 0; i < stackArray.length; i++) {
    const line = stackArray[i];
    if (!line.trim().match(/^at\s/)) {
      continue;
    }
    if (line.match(/\/dirname\.(js|ts):[0-9]+:[0-9]+\)/)) {
      dirnameLineFound = true;
      continue;
    } else if (!dirnameLineFound) {
      continue;
    }
    pathLine = line;
    break;
  }

  pathLine = pathLine
    .trim()
    .replace(/at\s/, '')
    .replace('file://', '')
    .replace('webpack-internal:///(rsc)', '')
    .split(' ')
    .pop();

  const filePathMatch = pathLine.match(
    /\(?([a-zA-Z0-9_\.-\/].*)\:[0-9]+\:[0-9]+\)?/,
  );

  if (!filePathMatch?.[1]) {
    console.log('E', stackArray, pathLine);
  }

  let finalFilePath = filePathMatch[1];

  if (finalFilePath.startsWith('/..')) {
    finalFilePath = path.resolve(
      process.cwd(),
      finalFilePath.replace(/\//, ''),
    );
  }

  return path.dirname(finalFilePath);
}
