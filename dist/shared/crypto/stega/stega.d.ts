/**
 * @name            stega
 * @namespace       shared.crypto
 * @type            Object
 * @platform        js
 * @status          stable
 *
 * Expose two functions named "encrypt" and "decrypt" to process content using the stega algorithm.
 * Delegates to the @vercel/stega package under the hood.
 *
 * @snippet         stega.encrypt($1)
 *
 * @example         js
 * import { stega } from '@blackbyte/sugar/crypto';
 * const encoded = stega.encrypt({ source: 'cms', field: 'title' });
 * const data    = stega.decrypt(encoded);
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
declare const _default: {
    /**
     * @name        encrypt
     * @type        Function
     *
     * Encodes a payload into a string using the stega algorithm via @vercel/stega.
     * Uses an empty string as the cover so the result is pure zero-width characters,
     * preserving the original return type of this function.
     *
     * @param       {any}           payload        The data to encode (will be JSON-serialized)
     * @return      {String}                       The stega-encoded string of zero-width characters
     *
     * @since       1.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
     */
    encrypt: (payload: any) => string;
    /**
     * @name        decrypt
     * @type        Function
     *
     * Extracts and decodes the stega payload hidden inside a string via @vercel/stega.
     * Returns the decoded value, or null if no payload is found or decoding fails.
     *
     * @param       {String}      message         The string containing a hidden stega payload
     * @return      {any}                         The decoded payload, or null if none found
     *
     * @since         1.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
     */
    decrypt: (message: string) => any;
};
export default _default;
