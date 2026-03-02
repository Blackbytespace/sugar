/**
 * @name            copy
 * @namespace       node.fs
 * @type            Function
 * @async
 * @platform        node
 * @status          stable
 *
 * Copy a file or directory (async)
 *
 * @param       {String}              src           The source path to copy
 * @param       {String}              dest          The destination path
 * @return      {Promise}                           A promise that will be resolved when the copy is completed
 *
 * @snippet         copy($1, $2)
 * await copy($1, $2)
 *
 * @example       js
 * import { copy } from '@blackbyte/sugar/fs';
 * await copy('my/cool/file.jpg', 'my/new/file.jpg').then(() => {
 *    // do something on complete...
 * });
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function copy(src: string, dest: string): Promise<void>;
