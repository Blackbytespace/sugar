/**
 * @name              bcrypt
 * @namespace         shared.crypto
 * @type              Object
 * @platform          js
 * @platform          node
 * @status            stable
 *
 * Expose two function named "encrypt" that you can use to process your content using the bcrypt algorithm
 *
 * @snippet         bcrypt.encrypt($1)
 *
 * @example         js
 * import { bcrypt } from '@blackbyte/sugar/crypto';
 * bcrypt.encrypt('hello world');
 *
 * @see           https://www.npmjs.com/package/bcryptjs?activeTab=readme
 * @since         1.0.0
 * @author        Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
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
    encrypt: (message: any, saltRounds?: number) => string;
    /**
     * @name        compareSync
     * @type          Function
     *
     * Compare synchronously
     *
     * @param       {String}      message         The message to compare
     * @param       {String}      hash            The hash to compare against
     * @return      {Boolean}                     True if the message matches the hash, false otherwise
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
     */
    compareSync: (message: any, hash: string) => boolean;
    /**
     * @name        compare
     * @type          Function
     *
     * Compare asynchronously
     *
     * @param       {String}      message         The message to compare
     * @param       {String}      hash            The hash to compare against
     * @return      {Promise<Boolean>}            A promise that resolves to true if the message matches the hash, false otherwise
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
     */
    compare: (message: any, hash: string) => Promise<boolean>;
};
export default _default;
