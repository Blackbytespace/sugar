<?php

namespace Sugar\Is;

/**
 * @name            isRequestFromIframe
 * @namespace       php.is
 * @type            Function
 * @platform        php
 * @status          beta
 *
 * This function simply check if the request has been made from an iframe
 *
 * @return      {Boolean}                       true if from iframe, false if not
 *
 * @snippet             \Sugar\Is\requestFromIframe($1);
 *
 * @example         php
 * \Sugar\Is\requestFromIframe();
 *
 * @see                 https://www.php.net/manual/en/function.preg-match.php#93824
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
function requestFromIframe()
{
    if (isset($_SERVER['HTTP_SEC_FETCH_DEST'])) {
        return $_SERVER['HTTP_SEC_FETCH_DEST'] === 'iframe';
    }

    if (isset($_SERVER['QUERY_STRING'])) {
        return str_starts_with($_SERVER['QUERY_STRING'], 'iframe');
    }

    return false;
}
