/**
 * @name            unlink
 * @namespace       node.fs
 * @type            Function
 * @platform        node
 * @status          stable
 *
 * unlinks a file or directory. The directory can have contents. If the path does not exist, silently does nothing. Like rm -rf (async)
 *
 * @param       {String}              path           The file/directory path to delete
 * @return      {Promise}                           A promise that will be resolved when the unlink is completed
 *
 * @todo        tests
 *
 * @snippet         unlink($1)
 * await unlink($1)
 *
 * @example       js
 * import { unlink } from '@blackbyte/sugar/fs';
 * await unlink('my/cool/file.json').then(() => {
 *    // do something on complete...
 * });
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function unlink(path: string): Promise<void>;
