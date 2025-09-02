// @ts-ignore
import sha256 from 'crypto-js/sha256.js';
import toString from '../../shared/string/toString.js';

/**
 * @name            sha256
 * @namespace       shared.crypto
 * @type            Object
 * @platform        node
 * @status          stable
 *
 * Expose two function named "encrypt" and "decrypt" that you can use to process your content using the sha256 algorithm
 *
 * @snippet         sha256.encrypt($1)
 *
 * @example         js
 * import { sha256 } from '@blackbyte/sugar/crypto';
 * sha256.encrypt('hello world');
 *
 * @todo        tests
 *
 * @since       1.0.0
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
  encrypt: function (message) {
    if (typeof message !== 'string') message = toString(message);
    const string = sha256(message).toString();
    return string;
  },
};
