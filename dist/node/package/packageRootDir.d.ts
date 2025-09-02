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
export default function packageRootDir(from?: string, settings?: Partial<TPackageRootSettings>): any;
