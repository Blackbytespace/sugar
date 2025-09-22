<?php

namespace Sugar\String;

/**
 * @name            fileNameCompliant
 * @namespace       php.string
 * @type            Function
 * @platform        php
 * @status          beta
 *
 * This function take a string as input and return a string that is compliant with the file name rules
 *
 * @param       {String}        $string         The string to process
 * @return      {String}                        The processed string
 *
 * @snippet             \Sugar\String\fileNameCompliant($1);
 *
 * @example         php
 * Sugar\String\fileNameCompliant('Hello world'); // => hello-world
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
function fileNameCompliant($string)
{
    $simplified = preg_replace('/[^a-zA-Z0-9-\._]+/', '-', $string);
    $sanitized = preg_replace('/-+/', '-', $simplified);
    return $sanitized;
}

