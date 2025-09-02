/**
 * @name                    composerVendorDir
 * @namespace               node.composer
 * @type                    Function
 * @platform                node
 * @status                  beta
 *
 * This function simply returns the "vendor" directory path
 *
 * @param       {TComposerVendorDirSettings}      [settings={}]       Some settings to configure your process
 * @return      {String}                      The package path
 *
 * @setting     {String}        [cwd=process.cwd()]        The directory in which you want to start the research
 * @setting     {Boolean}       [monorepo=false]         Specify if you are in a monorepo context
 * @setting     {Boolean}       [checkExistence=true]    Specify if you want to check if the vendor dir exists
 *
 * @snippet         composerVendorDir($1)
 *
 * @example         js
 * import { composerVendorDir } from '@blackbyte/sugar/composer`;
 * composerVendorDir('lodash');
 *
 * @since       1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export type TComposerVendorDirSettings = {
    cwd: string;
    monorepo: boolean;
    checkExistence: boolean;
};
export default function composerVendorDir(settings?: Partial<TComposerVendorDirSettings>): any;
