/**
 * @name            renameSync
 * @namespace       node.fs
 * @type            Function
 * @platform        node
 * @status          stable
 *
 * This method allows you to rename a file or directory synchronously.
 *
 * @param       {String}              src           The source path to moveSync
 * @param       {String}              dest          The destination path
 * @param       {TRenameSyncSettings} [settings={}] The settings for the operation
 * @return      {String}                          The new path
 *
 * @snippet         renameSync($1, $2)
 *
 * @example       js
 * import { renameSync } from '@blackbyte/sugar/fs';
 * renameSync('my/cool/dir', 'another/place/for/directory');
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export type TRenameSyncSettings = {
    override: boolean;
    dry: boolean;
};
export default function renameSync(src: string, newName: string, settings?: Partial<TRenameSyncSettings>): string;
