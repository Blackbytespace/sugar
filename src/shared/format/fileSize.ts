import { filesize as __filesize } from 'filesize';

/**
 * @name                formatFileSize
 * @namespace           shared.format
 * @type                Function
 * @platform            node
 * @platform            js
 * @status              stable
 *
 * Transform into human readable string a file size from a number (float or integer) or string.
 * This function use the wonderfull "filesize" npm package under the houd.
 *
 * @param               {Number|String}             size              The size to transform in bytes
 * @param               {Object}                    [settings={}]     The "filesize" settings to customize the output. See [filesize](https://www.npmjs.com/package/filesize) settings
 * @return              {String}                                      The human readable version of the passed size
 *
 * @setting             {Number}                [base=10]              (number) Number base, default is 10
 * @setting             {Boolean}               [bits=false]           (boolean) Enables `bit` sizes, default is false
 * @setting             {Number}                [exponent=0]           (number) Specifies the SI suffix via exponent, e.g. 2 is MB for bytes, default is 0
 * @setting             {Boolean}               [fullform=false]       (boolean) Enables full form of unit of measure, default is false
 * @setting             {Array}                 [fullforms]            (array) Array of full form overrides, default is []
 * @setting             {Boolean|String}        [locale=false]         (boolean|string) Localize the output, default is false
 * @setting             {Boolean}               [pad=false]             (boolean) Should the output be padded to the left, default is false
 * @setting             {Number}                [precision=2]          (number) The precision to use when outputting decimal values, default is 2
 * @setting             {Number}                [round=2]              (number) The rounding function, default is 2
 * @setting             {String}                [separator='.']         (string) Separator of thousands, default is '.'
 * @setting             {String}                [spacer=' ']            (string) Spacer of the output, default is ' '
 *
 * @snippet         formatFileSize($1)
 *
 * @todo     tests
 *
 * @example             js
 * import { formatFilesize } from '@blackbyte/sugar/fs';
 * formatFilesize(163931); // => 326.86 KB
 *
 * @see             https://www.npmjs.com/package/filesize
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

export type TFormatFileSizeSettings = {
  base?: number;
  bits?: boolean;
  exponent?: number;
  fullform?: boolean;
  fullforms?: any[];
  locale?: boolean | string;
  pad?: boolean;
  precision?: number;
  round?: number;
  separator?: string;
  spacer?: string;
};

export default function formatFileSize(
  size: number,
  settings: TFormatFileSizeSettings = {},
) {
  // @ts-ignore
  return __filesize(size, settings);
}
