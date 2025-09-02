<?php

namespace Sugar\Url;

/**
 * @name            currentUrl
 * @namespace       php.url
 * @type            Function
 * @platform        php
 * @status          beta
 *
 * Return the current url
 *
 * @return    {String}    The current url
 *
 * @snippet 		\Sugar\Url\currentUrl();
 *
 * @example    php
 * \Sugar\Url\currentUrl();
 * // https://blackbyte.space/hello/world?query=string
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
function currentUrl()
{
    $protocol =
        isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on'
        ? 'https'
        : 'http';
    return $protocol . '://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
}
