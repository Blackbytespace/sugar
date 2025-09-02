<?php

namespace Sugar\String;

/**
 * @name            idCompliant
 * @namespace            php.string
 * @type            Function
 * @platform        php
 * @status          beta
 *
 * This function take a string and return a version of it that you can safely use
 * in html id for example. It replace spaces with '-' as well as all the special characters
 * with their simple version like "à" will be replaces by "a"
 *
 * @param       {String}        $string         The string to process
 * @return      {String}                        The processed string
 *
 * @snippet             \Sugar\String\idCompliant($1);
 *
 * @example         php
 * Sugar\String\idCompliant('Hello world'); // => hello-world
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
function idCompliant($string)
{
    // spaces
    $string = str_replace(' ', '-', $string);
    // special characters
    $string = simplifySpecialChars($string);
    // replace characters like /, etc...
    $dict = [
        '/' => '-',
        '@' => '',
        '.' => '-',
        ',' => '-',
        '\\' => '-',
        '(' => '-',
        ')' => '-',
        '{' => '-',
        '}' => '-',
        '[' => '-',
        ']' => '-',
        '=' => '-',
        '?' => '-',
        '!' => '-',
        '&' => '-',
        '%' => '-',
        '*' => '-',
        '"' => '-',
        "'" => '-',
        '`' => '-',
        '+' => '-',
        '°' => '-',
        '$' => '-',
        '<' => '-',
        '>' => '-',
        ' =>' => '-',
        '#' => '-',
    ];
    $string = str_replace(array_keys($dict), array_values($dict), $string);
    // first and last characters + multiple ---
    $string = preg_replace('/\.{1,999}/', '.', $string);
    $string = preg_replace('/^-{1,999}/', '', $string);
    $string = preg_replace('/-{1,999}$/', '', $string);
    $string = preg_replace('/-{2,999}/', '-', $string);
    $string = preg_replace('/[^a-zA-Z0-9]{1,999}$/', '', $string);
    $string = preg_replace('/^[^a-zA-Z0-9]{1,999}/', '', $string);
    // lowercase
    $string = strtolower($string);

    return $string;
}
