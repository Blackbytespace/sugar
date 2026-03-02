/**
 * @name                        isNode
 * @namespace                   shared.is
 * @type                        Function
 * @platform                    js
 * @platform                    node
 * @status                      stable
 *
 * Check if the current script is running under node runtime or not...
 *
 * @return                {Boolean}                           true if running under javascript runtime, false if not...
 *
 * @todo      tests
 *
 * @snippet         isNode()
 *
 * @example               js
 * import { isNode } from '@blackbyte/sugar/is';
 * isNode(); // => true
 *
 * @since           1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function isNode(): boolean {
  return (
    typeof process !== 'undefined' &&
    process.release &&
    process.release.name === 'node'
  );
}
