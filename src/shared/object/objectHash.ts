import hashSum from 'hash-sum';
/**
 * @name            objectHash
 * @namespace       shared.object
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          stable
 *
 * This function allows you to get back an integrity hash passed object.
 *
 * @param           {any}            obj      The object to hash
 * @param           {IObjectHashSettings}       [settings={}]       Some settings to configure your hash generation process
 * @return          {String}                            The calculated folder hash
 *
 * @snippet             objectHash($1)
 *
 * @todo    tests
 *
 * @example         js
 * import { objectHash } from '@blackbyte/sugar/object';
 * objectHash('my/cool/folder'); // => YZOrKDx9LCLd8X39PoFTflXGpRU=,
 *
 * @see             https://www.npmjs.com/package/hash-sum
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function objectHash(obj: any): string {
  return hashSum(obj);
}
