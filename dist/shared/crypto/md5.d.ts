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
declare const _default: {
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
    encrypt: (message: any) => string;
};
export default _default;
