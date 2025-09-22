<?php

namespace Sugar\Object;

/**
 * @name            deepMap
 * @namespace       php.object
 * @type            Function
 * @platform        php
 * @status          beta
 *
 * This function allows you to map deeply on an array (object)
 *
 * @param       {Array}         $array         The array to deep map on
 * @param       {Function}      $callback       The function to run on each values. Must return the new value to set
 * @return      {Array}                         The processed array
 *
 * @snippet     \Sugar\Object\deepMap($1, $2);
 * \Sugar\Array\deepMap($1, function(\$prop, \$value, \$object) {
 *      $0
 * });
 *
 * @example         php
 * \Sugar\Object\deepMap([
 *    'prop1' => 'Hello',
 *    'prop2' => 'World'
 * ], function($prop, $value, $object) {
 *      return 'Hello ' . $value;
 * });
 * // [
 * //   'prop1' => 'Hello Plop',
 * //   'prop2' => 'Hello World'
 * // ]
 *
 * @see             https://developer.wordpress.org/reference/functions/deepMap/
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
function deepMap(mixed &$value, $callback, $prop = null, &$object = null)
{
    if (is_array($value)) {
        foreach ($value as $index => $item) {
            $value[$index] = deepMap($item, $callback, $index, $value);
        }
    } elseif (is_object($value)) {
        $object_vars = get_object_vars($value);
        foreach ($object_vars as $propertyName => $propertyValue) {
            $value->$propertyName = deepMap(
                $propertyValue,
                $callback,
                $propertyName,
                $value
            );
        }
    } else {
        $currentArgs = array_keys((array) $object);
        $value = call_user_func_array($callback, [$prop, &$value, &$object]);
        $recentArgs = array_keys((array) $object);
        $newArgs = array_diff($recentArgs, $currentArgs);

        if (count($newArgs) > 0) {
            foreach ($newArgs as $newArg) {
                $object->$newArg = deepMap($object->$newArg, $callback, $newArg, $object);
            }
        }
    }

    return $value;
}
