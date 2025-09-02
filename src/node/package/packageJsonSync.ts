import fs from 'fs';
import __packageDir from './packageDir.js';

/**
 * @name                    packageJsonSync
 * @namespace               node.package
 * @type                    Function
 * @platform                node
 * @status                  beta
 *
 * This function simply take a package name (or "." for the current package) as parameter, and return the corresponding
 * package.json JSON content
 *
 * @param       {String}        [nameOrPath=process.cwd()]        the package name or path wanted
 * @param       {TComposerVendorDirSettings}      [settings={}]       Some settings to configure your process
 * @return      {JSON}                      The composer.json content
 *
 * @setting     {String}        [cwd=process.cwd()]        The directory in which you want to start the research
 * @setting     {Boolean}       [monorepo=false]         Specify if you are in a monorepo context
 * @setting     {Boolean}       [checkExistence=true]    Specify if you want to check if the vendor dir exists
 *
 * @snippet         packageJsonSync($1)
 *
 * @example         js
 * import { packageJsonSync } from '@blackbyte/sugar/package`;
 * packageJsonSync('blackbyte/sugar');
 *
 * @todo        Implement a cache strategy to avoid making same process again and again
 *
 * @since       1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

export type TPackageJsonSyncSettings = {
  cwd: string;
  monorepo: boolean;
  checkExistence: boolean;
};

export default function packageJsonSync(
  nameOrPath: string,
  settings?: Partial<TPackageJsonSyncSettings>,
): any {
  settings = {
    cwd: process.cwd(),
    monorepo: false,
    checkExistence: true,
    ...(settings ?? {}),
  };

  const packageDir = __packageDir(nameOrPath, settings);
  return JSON.parse(fs.readFileSync(`${packageDir}/package.json`, 'utf8'));
}
