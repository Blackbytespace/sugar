/**
 * @name                    composerPackageDir
 * @namespace               node.composer
 * @type                    Function
 * @platform                node
 * @status                  beta
 *
 * This function simply take a package name as parameter, and return the corresponding
 * package direcory path
 *
 * @param       {String}        [nameOrPath=process.cwd()]        the package name or path wanted
 * @param       {TComposerPackageDirSettings}     [settings={}]       Some settings to configure your process
 * @return      {String}                      The package path
 *
 * @setting     {String}        [cwd=process.cwd()]        The directory in which you want to start the research
 * @setting     {Boolean}       [monorepo=false]         Specify if you are in a monorepo context
 * @setting     {Boolean}       [checkExistence=true]    Specify if you want to check if the vendor dir exists
 *
 * @snippet         composerPackageDir($1)
 *
 * @example         js
 * import { composerPackageDir } from '@blackbyte/sugar/composer`;
 * composerPackageDir('lodash');
 *
 * @todo        Implement a cache strategy to avoid making same process again and again
 *
 * @since       1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export type TComposerPackageDirSettings = {
    cwd: string;
    monorepo: boolean;
    checkExistence: boolean;
};
export default function composerJsonSync(nameOrPath: string, settings: Partial<TComposerPackageDirSettings>): any;
