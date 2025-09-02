import md5 from '../../shared/crypto/md5.js';

/**
 * @name                gravatarUrl
 * @namespace           shared.url
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Return a gravatar url depending on the passed user email and size
 *
 * @param           {String}            email             The user email
 * @param           {Number}            [size=200]        The wanted image size. From 1 to 2048
 * @return          {String}                              The generated gravatar url
 *
 * @todo      tests
 *
 * @snippet         gravatarUrl($1)
 *
 * @example       js
 * import { gravatarUrl } from '@blackbyte/sugar/url';
 * gravatarUrl('olivier.bossel@gmail.com'); // https://www.gravatar.com/avatar/b5df60055b6287bb7c90c0078ce20a5f
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function gravatarUrl(email: string, size: number = 200): string {
  return `https://www.gravatar.com/avatar/${md5.encrypt(email)}?s=${size}`;
}
