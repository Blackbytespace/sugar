<?php

namespace Sugar\Array;

/**
 * @name            pickRandom
 * @namespace       php.array
 * @type            Function
 * @platform        php
 * @status          beta
 *
 * This returns you a random item of the passed array
 *
 * @param       {Array}         $array          The array in which you want to pick a random item
 * @return      {Any}                         The random array item
 *
 * @snippet         \Sugar\Array\pickRandom($1);
 *
 * @example         php
 * \Sugar\Array\pickRandom(['hello','world','test']);
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
function pickRandom(array $array)
{
    return $array[array_rand($array, 1)];
}
