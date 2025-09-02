import isPath from '../../shared/is/isPath.js';

/**
 * @name                folderPath
 * @namespace           node.fs
 * @type                Function
 * @platform            node
 * @status              stable
 *
 * This function returns you the folder path of the file path passed.
 * You can tell the function to check for file existence before getting
 * the folder path with the second parameter.
 *
 * @param           {String}            path            The file path to get folder path from
 * @param           {Boolean}        [checkExistence=false]        Specify if you want to check the file existence before
 * @return          {String}                    The folder path or '' if not exists
 *
 * @todo            tests
 *
 * @snippet         folderPath($1)
 *
 * @example         js
 * import { folderPath } from '@blackbyte/sugar/fs';
 * folderPath('my/cool/path.js'); // => true
 *
 * @since           1.0.0
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

export type TFolderPathSettings = {
  checkExistence: boolean;
};

export default function folderPath(
  path: string,
  settings?: Partial<TFolderPathSettings>,
): string {
  const finalSettings: TFolderPathSettings = {
    checkExistence: false,
    ...(settings ?? {}),
  };

  if (finalSettings.checkExistence) {
    if (!isPath(path)) return '';
  }
  const parts = path.split('/');
  if (parts.length <= 1) {
    return '';
  }
  return parts.slice(0, -1).join('/');
}
