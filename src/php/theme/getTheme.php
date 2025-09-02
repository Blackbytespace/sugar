<?php

namespace Sugar\Theme;

/**
 * @name            getTheme
 * @namespace       php.theme
 * @type            Function
 * @platform        php
 * @status          beta
 *
 * This function allows you to get the setted theme from the `theme` cookie.
 * You can simply set/restore the theme in frontend using the `__setTheme`, `__restoreTheme` functions from the
 * `@blackbyte/sugar/theme` package.
 *
 * @param       {String}        [$default=null]         The default theme to return if no theme has been setted     
 * @return      {String}                                The theme name  
 *
 * @todo      tests
 *
 * @snippet         \Sugar\Theme\getTheme($1)
 *
 * @example     php
 * $theme = \Sugar\Theme\getTheme('dark');
 *
 * @since       2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */

function getTheme(string $defaultTheme, string $cookieName = 'theme'): string
{
    // check if the theme cookie exists
    if (isset($_COOKIE[$cookieName])) {
        return $_COOKIE[$cookieName];
    }
    return $defaultTheme;
}
