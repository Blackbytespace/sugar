/**
 * @name            isFfolder
 * @namespace       node.is
 * @type            Function
 * @platform        node
 * @status          stable
 *
 * This function check if the passed string path is a folder or not
 *
 * @param     {String}        path        The path to check
 * @return    {Boolean}                   true if is a folder, false if not
 *
 * @todo      tests
 *
 * @snippet         isFolder($1)
 *
 * @example     js
 * import { isfolder } from '@blackbyte/sugar/is';
 * isfolder('something/cool');
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export type TIsFolderSettings = {
    symlink?: boolean;
};
export default function isfolder(path: string, settings?: TIsFolderSettings): boolean;
