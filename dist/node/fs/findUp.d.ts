/**
 * @name            findUp
 * @namespace       node.fs
 * @type            Function
 * @platform        node
 * @status          beta
 * @async
 *
 * This function simply walk across upper folders to search for a file
 * and returns you the first finded
 *
 * @param       {IFindUpSearch}         search          The name of the file you search
 * @param       {TFindUpSettings}       [settings={}]       An object of settings to configure your research
 * @return      {SFile|null}                                 An SFile instance or null if nothings founded
 *
 * @todo            tests
 *
 * @snippet         findUp($1)
 * await findUp($1)
 *
 * @example         js
 * import { findUp } from '@blackbyte/sugar/fs';
 * const file = await findUp('myCoolFile.json', {});
 * console.log(file.path);
 *
 * @since       1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export type TFindUpSettings = {
    symlinks?: boolean;
    cwd?: string;
    stopWhenFound?: boolean;
};
export default function findUp(search: string, settings: TFindUpSettings): Promise<string[]>;
