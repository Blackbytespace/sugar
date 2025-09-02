import base64 from 'crypto-js/enc-base64.js';
import encUtf8 from 'crypto-js/enc-utf8.js';
import toString from '../../shared/string/toString.js';
/**
 * @name            base64
 * @namespace       shared.crypto
 * @type            Object
 * @platform        js
 * @status          stable
 *
 * Expose two function named "encrypt" and "decrypt" that you can use to process your content using the base64 algorithm
 *
 * @snippet         base64.encrypt($1)
 *
 * @example         js
 * import { base64 } from '@blackbyte/sugar/crypto';
 * base64.encrypt('hello world');
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default {
    /**
     * @name        encrypt
     * @type        Function
     *
     * Encrypt
     *
     * @param       {String}       message        The message to encrypt
     * @return      {String}                       The encrypted message
     *
     * @since       1.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
     */
    encrypt: function (message) {
        if (typeof message !== 'string')
            message = toString(message);
        return base64.stringify(encUtf8.parse(message));
    },
    /**
     * @name        decrypt
     * @type        Function
     *
     * Decrypt
     *
     * @param       {String}      message         The message to decrypt
     * @return      {String}                      The decrypted message
     *
     * @since         1.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
     */
    decrypt: function (message) {
        if (typeof message !== 'string')
            message = toString(message);
        return base64.parse(message).toString(encUtf8);
    },
};
//# sourceMappingURL=base64.js.map