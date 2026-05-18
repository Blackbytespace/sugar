import bcryptjs from 'bcryptjs';
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
    encrypt: function (message, saltRounds = 10) {
        if (typeof message !== 'string')
            message = String(message);
        const salt = bcryptjs.genSaltSync(saltRounds);
        return bcryptjs.hashSync(message, salt);
    },
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
    compareSync: function (message, hash) {
        if (typeof message !== 'string')
            message = String(message);
        return bcryptjs.compareSync(message, hash);
    },
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
    compare: function (message, hash) {
        if (typeof message !== 'string')
            message = String(message);
        return bcryptjs.compare(message, hash);
    },
};
//# sourceMappingURL=bcrypt.js.map