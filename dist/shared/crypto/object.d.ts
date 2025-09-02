/**
 * @name                object
 * @namespace           shared.crypto
 * @type                Object
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Expose two function named "encrypt" and "decrypt" that you can use to process your content using the object algorithm
 *
 * @snippet         object.encrypt($1)
 *
 * @example         js
 * import { object } from '@blackbyte/sugar/crypto';
 * object.encrypt({
 *      hello: 'world'
 * });
 *
 * @since       1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.io)
 */
declare const _default: {
    /**
     * @name        encrypt
     * @type        Function
     *
     * Encrypt
     *
     * @param       {Object}       object         The object to encrypt
     * @param       {String}       [salt="blackbyte.sugar.crypto.object"]   The salt to encode the object. Needed to decode correctly the object
     * @return      {String}                       The encrypted object
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.io)
     */
    encrypt: (object: any, salt?: string) => any;
    /**
     * @name        decrypt
     * @type        Function
     *
     * Decrypt
     *
     * @param       {String}      encodedObject          The object to decrypt
     * @param       {String}      [salt='blackbyte.sugar.crypto.object']        The salt to decode the object
     * @return      {Object}                      The decrypted object
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.io)
     */
    decrypt: (encodedObject: any, salt?: string) => any;
};
export default _default;
