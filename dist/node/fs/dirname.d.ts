/**
 * @name            dirname
 * @namespace       node.fs
 * @type            Function
 * @platform        node
 * @status          stable
 *
 * Return the dirname the same as the dirname cjs variable.
 * The only difference is that it's a function and you need to pass the "import" variable
 * from the filename in which you use this...
 *
 * @return      {String}                            The dirname path
 *
 * @snippet         dirname()
 *
 * @example             js
 * import { dirname } from '@blackbyte/sugar/fs';
 * dirname();
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function dirname(): string;
