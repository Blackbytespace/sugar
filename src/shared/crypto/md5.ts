import md5 from 'crypto-js/md5.js';
import toString from '../../shared/string/toString.js';

/**
 * @name              md5
 * @namespace         shared.crypto
 * @type              Object
 * @platform          js
 * @status            stable
 *
 * Expose two function named "encrypt" and "decrypt" that you can use to process your content using the md5 algorithm
 *
 * @snippet         md5.encrypt($1)
 *
 * @example         js
 * import { md5 } from '@blackbyte/sugar/crypto';
 * md5.encrypt('hello world');
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default {
  /**
   * @name        encrypt
   * @type          Function
   *
   * Encrypt
   *
   * @param       {String}      message         The message to encrypt
   * @return      {String}                      The encrypted string
   *
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
   */
  encrypt: function (message: any): string {
    if (typeof message !== 'string') message = toString(message);
    const md5Str = md5(message).toString();
    return md5Str;
  },
};
