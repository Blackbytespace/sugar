import findPkgJson from 'find-package-json';
import fs from 'fs';
import objectHash from '../../shared/object/objectHash.js';
import isFile from '../is/isFile.js';

/**
 * @name                    packageRootDir
 * @namespace               node.path
 * @type                    Function
 * @platform                node
 * @status                  beta
 *
 * Return the path to either the first finded package root going up the folders, or the highest package root finded
 *
 * @feature         Support file path as input
 * @feature         Allows you to specify if you want the highest package.json founded using the ```highest``` parameter
 *
 * @setting         {Boolean}           [highest=false]         Specify if you want the highest package possible
 * @setting         {Number}            [upCount=undefined]         Specify a number of packages to go up. Cannot be used alongside the `highest` setting
 * @setting         {String[]}          [requiredProperties=['name','version']]             Specify some required properties that MUST be present in the package.json to be considered as a valid package
 *
 * @param           {String}              [from=process.cwd()]    Specify from where the research has to be done
 * @param           {Boolean}             [settings={}]         Some settings to configure the research
 * @return          {String}                                      The finded package path or false if not finded
 *
 * @snippet         packageRootDir()
 *
 * @example         js
 * import { packageRootDir } from '@blackbyte/sugar/path';
 * const root = packageRootDir();
 *
 * @see       https://www.npmjs.com/package/find-package-json
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

export type TPackageRootSettings = {
  highest: boolean;
  upCount: number | undefined;
  requiredProperties: string[];
};

const packageRootDirsCache = {};
export default function packageRootDir(
  from = process.cwd(),
  settings?: Partial<TPackageRootSettings>,
) {
  const finalSettings: TPackageRootSettings = {
    highest: false,
    upCount: undefined,
    requiredProperties: ['name', 'version'],
    ...(settings ?? {}),
  };

  // cache
  const storageKey = objectHash({
    from,
    ...finalSettings,
  });
  if (!from && packageRootDirsCache[storageKey]) {
    return packageRootDirsCache[storageKey];
  }

  if (isFile(from)) {
    from = from.split('/').slice(0, -1).join('/');
  }

  if (fs.existsSync(`${from}/package.json`)) {
    return from;
  }

  const f = findPkgJson(from);
  let file = f.next();

  let finalFile,
    upCountIdx = 0;

  // no file found so return the process cwd
  if (!file || !file.filename) {
    return false;
  }

  while (!file.done) {
    if (file.done) {
      break;
    }

    if (finalSettings.upCount && !finalSettings.highest) {
      if (upCountIdx >= finalSettings.upCount) {
        break;
      }
    }

    if (!finalSettings.highest) {
      // required properties
      if (finalSettings.requiredProperties) {
        let allProps = true;
        finalSettings.requiredProperties.forEach((prop) => {
          if (!allProps) return;
          if (file.value[prop] === undefined) allProps = false;
        });
        if (allProps) {
          upCountIdx++;
          finalFile = file;
          if (!finalSettings.upCount) {
            break;
          }
        }
      } else {
        upCountIdx++;
        finalFile = file;
        if (!finalSettings.upCount) {
          break;
        }
      }
    } else {
      finalFile = file;
    }
    file = f.next();
  }

  if (!finalFile) {
    return false;
  }

  const finalPath = finalFile.filename.split('/').slice(0, -1).join('/');
  packageRootDirsCache[storageKey] = finalPath;
  return finalPath;
}
