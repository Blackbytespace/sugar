// @ts-nocheck
import __sprintf from 'sprintf-js';
/**
 * @name                printf
 * @namespace           shared.string
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * printf php equavalent
 *
 * @param 		{String} 						source 			The source in which to replace the tokens
 * @param 		{Mixed} 			values... 			  Any number of arguments to replace the placeholders in the string
 * @return 	{String} 										The resulting string
 *
 * @todo      tests
 *
 * @snippet         printf($1)
 *
 * @example     js
 * import { printf } from '@blackbyte/sugar/string';
 * printf('Hello %s', 'world'); // => Hello world
 * printf('Hello %s, I\'m %s', 'world', 'John Doe'); // Hello world, I'm John Doe
 * printf('Hello %(first)s, I\'m %(name)s', { first : 'world', name : 'John Doe'}); // Hello world, I'm John Doe
 *
 * @see 				https://www.npmjs.com/package/sprintf-js
 * @since       1.0.0
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function printf(...args) {
    return __sprintf.sprintf.apply(null, args);
}
//# sourceMappingURL=printf.js.map