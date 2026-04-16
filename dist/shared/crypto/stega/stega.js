/**
 * @name            stega
 * @namespace       shared.crypto
 * @type            Object
 * @platform        js
 * @platform        node
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
 * @see            https://www.npmjs.com/package/@vercel/stega
 * @since          1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
import { vercelStegaEncode as _vercelStegaEncode, vercelStegaDecode, } from '@vercel/stega';
// The published types declare a 2-argument signature but the actual runtime
// implementation only takes the payload. Cast to the real signature.
const vercelStegaEncode = _vercelStegaEncode;
export default {
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
    encrypt: function (payload) {
        return vercelStegaEncode(payload);
    },
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
    decrypt: function (message) {
        var _a;
        try {
            return (_a = vercelStegaDecode(message)) !== null && _a !== void 0 ? _a : null;
        }
        catch (_b) {
            return null;
        }
    },
};
//# sourceMappingURL=stega.js.map