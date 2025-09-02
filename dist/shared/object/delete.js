/**
 * @name                    delete
 * @namespace               shared.object
 * @type                    Function
 * @platform                js
 * @platform                node
 * @status                  stable
 *
 * Delete an object/array property by passing a dotpath to the element you want to remove.
 *
 * @param               {Object}                 obj                The object in which to set the value
 * @param               {String|String[]}                dotpath                The dotted object/array path to delete
 *
 * @todo      tests
 *
 * @snippet         __delete($1, $2)
 *
 * @example             js
 * import { __delete } from '@blackbyte/sugar/object';
 * __delete(myObject, 'my.cool.value');
 * __delete(myObject, 'my.cool.value.0');
 *
 * @since     1.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function __delete(object, dotpath) {
    // const parentdotpath = dotpath.split('.').slice(0, -1).join('.');
    if (Array.isArray(dotpath)) {
        dotpath = dotpath.join('.');
    }
    if (!dotpath || dotpath === '' || dotpath === '.')
        return object;
    dotpath = dotpath.replace(/\[(\w+)\]/g, '.$1');
    dotpath = dotpath.replace(/^\./, '');
    const a = dotpath.split('.');
    let o = object;
    while (a.length) {
        const n = a.shift();
        if (!n)
            continue;
        if (a.length < 1) {
            if (Array.isArray(o)) {
                const idx = parseInt(n);
                o.splice(idx, 1);
            }
            else {
                delete o[n];
            }
            // __set(object, parentdotpath, o);
        }
        else {
            o = o[n];
        }
    }
    return object;
}
//# sourceMappingURL=delete.js.map