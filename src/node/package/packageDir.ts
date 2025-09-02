import fs from 'fs';
import path from 'path';
import nodeModulesDir from './nodeModulesDir.js';

/**
 * @name                    packageDir
 * @namespace               node.package
 * @type                    Function
 * @platform                node
 * @status                  beta
 *
 * This function simply take a package name as parameter, and return the corresponding
 * package direcory path
 *
 * @param       {String}        [nameOrPath=process.cwd()]        the package name or path wanted
 * @param       {TPackageDirSettings}     [settings={}]       Some settings to configure your process
 * @return      {String}                      The package path
 *
 * @setting     {String}        [cwd=process.cwd()]        The directory in which you want to start the research
 * @setting     {Boolean}       [monorepo=false]         Specify if you are in a monorepo context
 * @setting     {Boolean}       [checkExistence=true]    Specify if you want to check if the vendor dir exists
 *
 * @snippet         packageDir($1, $2)
 *
 * @example         js
 * import { packageDir } from '@blackbyte/sugar/package`;
 * packageDir('lodash');
 *
 * @todo        Implement a cache strategy to avoid making same process again and again
 *
 * @since       1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

export type TPackageDirSettings = {
  cwd: string;
  monorepo: boolean;
  checkExistence: boolean;
};

export default function packageDir(
  nameOrPath: string,
  settings: Partial<TPackageDirSettings>,
): any {
  settings = {
    cwd: process.cwd(),
    monorepo: false,
    checkExistence: true,
    ...(settings ?? {}),
  };

  // absolute path
  if (fs.existsSync(`${nameOrPath}/package.json`)) {
    return path.resolve(nameOrPath);
  }

  const vendorDir = nodeModulesDir(settings);

  // current package dir "."
  if (nameOrPath === '.') {
    return path.resolve(`${vendorDir}/../`);
  }

  if (
    settings.checkExistence &&
    !fs.existsSync(`${vendorDir}/${nameOrPath}/package.json`)
  ) {
    throw new Error(
      `The NPM package "<yellow>${nameOrPath}</yellow>" seems to not exists...`,
    );
  }

  return `${vendorDir}/${nameOrPath}`;
}
