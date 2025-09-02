/**
 * @name            adoptStyleInShadowRoot
 * @namespace       js.css
 * @type            Function
 * @platform        js
 * @status          stable
 *
 * This function allows you to make a shadowRoot element adopt his host context styles
 *
 * @param       {HTMLShadowRootElement}         $shadowRoot             The shadow root you want to adopt the $context styles
 * @param      {HTMLElement}                   [$context=document]     The context from which you want to adopt the styles
 * @return      {Promise}                                               Return a promise fullfilled when the styles have been adopted
 *
 * @snippet         adoptStyleInShadowRoot($1)
 *
 * @todo        tests
 *
 * @example         js
 * import { adoptStyleInShadowRoot } from '@blackbyte/sugar/dom';
 * const myShadowRoot = $myElement.shadowRoot;
 * await adoptStyleInShadowRoot(myShadowRoot);
 *
 * @since       1.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
export default function adoptStyleInShadowRoot($shadowRoot: ShadowRoot, $context?: HTMLElement | typeof document): Promise<any>;
