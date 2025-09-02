<?php

namespace Sugar\Fs;

/**
 * @name            relativePath
 * @namespace       php.fs
 * @type            Function
 * @platform        php
 * @status          beta
 *
 * Return the relative path between two paths
 *
 * @param       {String}        $from       The from path
 * @param       {String}        $to         The to path
 * @param       {String}        $separator  The separator to use
 *
 * @snippet             \Sugar\Fs\relativePath($1, $2);
 *
 * @example    php
 * \Sugar\Fs\relativePath('/path/to/file.ext', '/path/to); // => file.ext
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
function relativePath($from, $to, $separator = DIRECTORY_SEPARATOR)
{
    $from = str_replace(array('/', '\\'), $separator, $from);
    $to = str_replace(array('/', '\\'), $separator, $to);

    $arFrom = explode($separator, rtrim($from, $separator));
    $arTo = explode($separator, rtrim($to, $separator));
    while (count($arFrom) && count($arTo) && ($arFrom[0] == $arTo[0])) {
        array_shift($arFrom);
        array_shift($arTo);
    }

    return str_pad("", count($arFrom) * 3, '..' . $separator) . implode($separator, $arTo);
}