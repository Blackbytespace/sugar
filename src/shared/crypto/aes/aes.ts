import AES from 'crypto-js/aes.js';
import { toString } from '@blackbyte/sugar/string';

/**
 * @name            aes
 * @namespace       shared.crypto
 * @type            Object
 * @platform        node
 * @status          stable
 *
 * Expose two function named "encrypt" that you can use to process your content using the aes algorithm
 *
 * @snippet         aes.encrypt($1)
 *
 * @example         js
 * import { aes } from '@blackbyte/sugar/crypto';
 * aes.encrypt('hello world');
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.io)
 */
export default {
  /**
   * @name        encrypt
   * @type        Function
   *
   * Encrypt
   *
   * @param       {String}       message        The message to encrypt
   * @param       {String}       [key='blackbyte.sugar.crypto.aes']       The secret key to encrypt
   * @return      {String}                       The encrypted message
   *
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.io)
   */
  encrypt: function (message, key = 'blackbyte.sugar.crypto.aes') {
    if (typeof message !== 'string') message = toString(message);
    const aesStr = AES.encrypt(message, key).toString();
    return aesStr;
  },
};
