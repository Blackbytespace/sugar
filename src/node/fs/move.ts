import fs from 'fs-extra';

/**
 * @name                move
 * @namespace           node.fs
 * @type                Function
 * @platform            node
 * @status              stable
 *
 * Moves a file or directory, even across devices (async)
 *
 * @param       {String}              src           The source path to move
 * @param       {String}              dest          The destination path
 * @return      {Promise}                           A promise that will be resolved once the file/directory has been moved...
 *
 * @todo        tests
 *
 * @snippet         move($1, $2)
 * await move($1, $2)
 *
 * @example       js
 * import { move } from '@blackbyte/sugar/fs';
 * await move('my/cool/dir', 'another/place/for/directory').then(() => {
 *    // do something...
 * });
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function move(src: string, dest: string): Promise<void> {
  if (src === dest) {
    return Promise.resolve();
  }
  return fs.move(src, dest);
}
