/**
 * @name                    composerJsonSync
 * @namespace               node.composer
 * @type                    Function
 * @platform                node
 * @status                  beta
 *
 * This function simply take a package name (or "." for the current package) as parameter, and return the corresponding
 * composer.json JSON content
 *
 * @param       {String}        [nameOrPath=process.cwd()]        the package name or path wanted
 * @param       {TComposerVendorDirSettings}      [settings={}]       Some settings to configure your process
 * @return      {JSON}                      The composer.json content
 *
 * @setting     {String}        [cwd=process.cwd()]        The directory in which you want to start the research
 * @setting     {Boolean}       [monorepo=false]         Specify if you are in a monorepo context
 * @setting     {Boolean}       [checkExistence=true]    Specify if you want to check if the vendor dir exists
 *
 * @snippet         composerJsonSync($1)
 *
 * @example         js
 * import { composerJsonSync } from '@blackbyte/sugar/composer`;
 * composerJsonSync('blackbyte/sugar');
 *
 * @todo        Implement a cache strategy to avoid making same process again and again
 *
 * @since       1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export type TComposerJsonSyncSettings = {
    cwd: string;
    monorepo: boolean;
    checkExistence: boolean;
};
export default function composerJsonSync(nameOrPath: string, settings?: Partial<TComposerJsonSyncSettings>): any;
