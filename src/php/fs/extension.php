<?php

namespace Sugar\Fs;

/**
 * @name            extension
 * @namespace       php.fs
 * @type            Function
 * @platform        php
 * @status          beta
 *
 * Return the extension of the passed path
 *
 * @param     {String}      The path to parse and get the extension from
 * @return    {String}    The extension of the passed path
 *
 * @snippet             \Sugar\Fs\extension($1);
 *
 * @example    php
 * \Sugar\Fs\extension('/path/to/file.ext'); // => ext
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
function extension($path)
{
    $infos = pathinfo($path);
    if (isset($infos['extension'])) {
        return $infos['extension'];
    }
    return null;
}
