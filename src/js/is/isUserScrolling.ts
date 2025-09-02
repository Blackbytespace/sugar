/**
 * @name      isUserScrolling
 * @namespace            js.is
 * @type      Function
 * @platform          js
 * @status        stable
 * @async
 *
 * Check the user is scrolling a particular element
 *
 * @param 		{HTMLElement} 				[$elm=document]  			The element to monitor
 * @return 		{Boolean}									If the element is in the viewport or not
 *
 * @snippet         isUserScrolling()
 *
 * @todo      tests
 *
 * @example  	js
 * import { isUserScrolling } from '@blackbyte/sugar/dom'
 * if (isUserScrolling(myCoolHTMLElement) {
 * 		// i'm in the viewport
 * }
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
let _isUserScrolling = false,
  _isUserScrollingTimeout;
try {
  document?.addEventListener?.('wheel', (e) => {
    _isUserScrolling = true;
    clearTimeout(_isUserScrollingTimeout);
    _isUserScrollingTimeout = setTimeout(() => {
      _isUserScrolling = false;
    }, 200);
  });

  document?.addEventListener?.('touchmove', (e) => {
    _isUserScrolling = true;
    clearTimeout(_isUserScrollingTimeout);
    _isUserScrollingTimeout = setTimeout(() => {
      _isUserScrolling = false;
    }, 200);
  });
} catch (e) {}

export default function isUserScrolling($elm) {
  if ($elm._isUserInteractive !== undefined) {
    return $elm._isUserInteractive && _isUserScrolling;
  }

  $elm.addEventListener('mouseover', (e) => {
    $elm._isUserInteractive = true;
  });
  $elm.addEventListener('mouseout', (e) => {
    $elm._isUserInteractive = false;
  });
  $elm.addEventListener('touchstart', (e) => {
    $elm._isUserInteractive = true;
  });
  $elm.addEventListener('touchend', (e) => {
    $elm._isUserInteractive = false;
  });

  return $elm._isUserInteractive && _isUserScrolling;
}
