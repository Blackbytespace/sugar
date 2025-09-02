/**
 * @name                    cyclic
 * @namespace               shared.is
 * @type                    Function
 * @platform                js
 * @platform                node
 * @status                  stable
 *
 * This function check if the passed object has circular dependencies and if so, returns where it has been found in the object
 *
 * @param           {Object}            object              The object to check
 * @return          {String|false}                              false if all is ok, a string that tells where the circular dep has been found if not
 *
 * @todo      tests
 *
 * @snippet         isCyclic($1)
 *
 * @example           js
 * import { isCyclic } from '@blackbyte/sugar/is';
 * const obj = { hello: 'world' };
 * obj.cyclic = obj;
 * isCyclic(obj);
 *
 * @see            https://stackoverflow.com/questions/14962018/detecting-and-fixing-circular-references-in-javascript
 * @since       1.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function isCyclic(obj) {
    var keys = [];
    var stack = [];
    var stackSet = new Set();
    var detected = false;
    function detect(obj, key) {
        if (obj && typeof obj != 'object') {
            return;
        }
        if (stackSet.has(obj)) {
            // it's cyclic! Print the object and its locations.
            var oldindex = stack.indexOf(obj);
            var l1 = keys.join('.') + '.' + key;
            var l2 = keys.slice(0, oldindex + 1).join('.');
            detected = true;
            return ['CIRCULAR: ' + l1 + ' = ' + l2 + ' = ' + obj, obj].join('\n');
        }
        keys.push(key);
        stack.push(obj);
        stackSet.add(obj);
        for (var k in obj) {
            //dive on the object's children
            if (Object.prototype.hasOwnProperty.call(obj, k)) {
                detect(obj[k], k);
            }
        }
        keys.pop();
        stack.pop();
        stackSet.delete(obj);
        return;
    }
    detect(obj, 'obj');
    return detected;
}
//# sourceMappingURL=isCyclic.js.map