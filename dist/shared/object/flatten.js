/**
 * @name                        flatten
 * @namespace                   shared.object
 * @type                        Function
 * @platform                    js
 * @platform                    node
 * @status                      stable
 *
 * Transform the passed multiple level object into a single level one
 *
 * @param               {Object}                          object                    The object to flatten
 * @param               {Object}                          [settings={}]             An object of settings to configure your flatten process
 * @return              {Object}                                                    The flatten object
 *
 * @setting               {String}            [separation="."]          The separation character to use for preperty names
 * @setting               {String}            [prefix=""]               A prefix to add to the property names
 *
 * @todo      tests
 *
 * @snippet         flatten($1)
 *
 * @example             js
 * import { flatten } from '@blackbyte/sugar/object';
 * flatten({
 *    hello: {
 *      world: 'Coco'
 *    }
 * });
 *
 * @since       1.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function flatten(obj, settings) {
    const finalSettings = Object.assign({ separator: '.', prefix: '' }, (settings !== null && settings !== void 0 ? settings : {}));
    return Object.keys(obj).reduce((acc, k) => {
        const pre = finalSettings.prefix.length
            ? finalSettings.prefix + finalSettings.separator
            : '';
        if (typeof obj[k] === 'object' && obj[k] !== null) {
            Object.assign(acc, flatten(obj[k], Object.assign(Object.assign({}, finalSettings), { prefix: pre + k })));
        }
        else {
            acc[pre + k] = obj[k];
        }
        return acc;
    }, {});
}
//# sourceMappingURL=flatten.js.map