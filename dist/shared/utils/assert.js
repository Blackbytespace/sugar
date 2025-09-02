/**
 * @name           assert
 * @namespace      shared.utils
 * @type           Function
 * @platform       js
 * @platform       node
 * @status         stable
 *
 * Checks a condition and throws an error if the condition is not met
 *
 * @param       {boolean}           condition            The condition to check
 * @param       {string}            message              The error message to display if the condition fails
 *
 * @throws {Error} - Throws an error if the condition is not met
 *
 * @since       1.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
export default function assert(condition, message) {
    if (!condition) {
        console.error(message);
        throw new Error(message);
    }
}
//# sourceMappingURL=assert.js.map