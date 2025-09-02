// @ts-ignore
import sha512 from 'crypto-js/sha512.js';
import toString from '../../shared/string/toString.js';
/**
 * @name            sha512
 * @namespace       shared.crypto
 * @type            Object
 * @platform        node
 * @status          stable
 *
 * Expose two function named "encrypt" and "decrypt" that you can use to process your content using the sha512 algorithm
 *
 * @snippet         sha512.encrypt($1)
 *
 * @example         js
 * import { sha512 } from '@blackbyte/sugar/crypto';
 * sha512.encrypt('hello world');
 *
 * @todo        tests
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
    encrypt: function (message) {
        if (typeof message !== 'string')
            message = toString(message);
        const string = sha512(message).toString();
        return string;
    },
};
//# sourceMappingURL=sha512.js.map