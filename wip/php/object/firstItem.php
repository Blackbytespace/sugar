<?php

namespace Sugar\Object;

/**
 * @name            firstItem
 * @namespace            php.object
 * @type            Function
 * @platform        php
 * @status          beta
 *
 * This function allows you to get back the first item value of an object
 *
 * @param       {Array|Object}      $object         The object to get value from
 * @return      {Any}                               The first object value
 *
 * @snippet     \Sugar\Object\firstItem($1);
 *
 * @example         php
 * \Sugar\Object\firstItem((object) [
 *  'hello' => 'world',
 *  'something' => 'cool'
 * ]); // world
 *
 * @see             https://developer.wordpress.org/reference/functions/deepMap/
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
function firstItem($object)
{
    $key = array_key_first((array) $object);
    return $object->$key;
}
