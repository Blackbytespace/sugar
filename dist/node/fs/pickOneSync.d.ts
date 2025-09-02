/**
 * @name            pickOneSync
 * @namespace       node.fs
 * @type            Function
 * @platform        node
 * @status          stable
 *
 * This function allows you to specify multiple files to check and pick one of them
 *
 * @param       {String[]}      filesNames          The names of the files you want to check
 * @param       {TPickOneSyncSettings}       [settings={}]       An object of settings to configure your research
 * @return     {SFile|String}                   Either an SFile instance if set in the config, or the path of the file found
 *
 * @todo        tests
 *
 * @setting         {String}        [cwd=process.cwd()]       The current working directory to search in
 * @setting         {Boolean}         [SFile=true]          Return an SFile instance if true, otherwise just a simple path string
 *
 * @snippet         pickOneSync([$1])
 *
 * @example         js
 * import { pickOneSync } from '@blackbyte/sugar/fs';
 * pickOneSync(['myCoolFile.json', 'myCoolFile2.json'], {});
 *
 * @since       1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export type TPickOneSyncSettings = {
    cwd: string;
};
export default function pickOneSync(filesNames: string[], settings?: Partial<TPickOneSyncSettings>): string;
