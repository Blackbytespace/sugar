/**
 * @name                    formatPackageJson
 * @namespace               shared.package
 * @type                    Function
 * @platform                js
 * @platform                node
 * @status                  stable
 *
 * This function simply take a package.json JSON formatted object and standardize
 * some fields like the "author" one to be sure it is an object at the end,
 * the "contributors" array the same way as the "author" one, etc... Here's the list
 * of processed actions:
 * 1. Transform the string version of the "author" field into an object with the properties "name", "email" and "url"
 * 2. Transform the string version of the "contributors" field into an object with the properties "name", "email" and "url"
 *
 * @param       {Object}        json        The json to process
 * @return      {Object}                    The standardized json
 *
 * @todo      tests
 *
 * @snippet         formatPackageJson($1)
 *
 * @example       js
 * import { formatPackageJson } from '@blackbyte/sugar/package';
 * formatPackageJson({
 *    "author": "Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)"
 * }); // => {
 *    "author": {
 *      "name": "Olivier Bossel",
 *      "email": "olivier.bossel@gmail.com",
 *      "url": "https://olivierbossel.com"
 *    }
 * }
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function formatPackageJson(json: any): any;
