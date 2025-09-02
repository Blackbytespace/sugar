<?php

namespace Sugar\String;

/**
 * @name            toString
 * @namespace       php.string
 * @type            Function
 * @platform        php
 * @status          beta
 *
 * This function allows you to transform pretty much any types like Array, Object, etc... into a string version that you can display
 * in documentation, etc...
 *
 * @param       {Any}               $value                  The value to convert into a string
 * @return      {String}                        The generated string
 *
 * @snippet             \Sugar\String\toString($1);
 *
 * @example         php
 * Sugar\String\toString(['hello','world']); // => "['hello','world']"
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
function toString($value)
{
    if (is_array($value) || is_object($value)) {
        return json_encode($value);
    } elseif ($value == null) {
        return 'null';
    } elseif (is_bool($value)) {
        return $value ? 'true' : 'false';
    } elseif (is_string($value)) {
        return $value;
    } else {
        return (string) $value;
    }
}
