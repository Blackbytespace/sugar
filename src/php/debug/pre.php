<?php

namespace Sugar\Debug;

/**
 * @name            pre
 * @namespace            php.array
 * @type            Function
 * @platform        php
 * @status          beta
 *
 * This function simply print your passed "object/array" in a "<pre>" tag using the "print_r" function.
 *
 * @param       {Array}         $toPrint        The data to print
 * @return      {String}                        The printed data
 *
 * @snippet         \Sugar\Debug\pre($1);
 *
 * @example         php
 * print \Sugar\Debug\pre([
 *    'prop1' => 'Hello',
 *    'prop2' => 'World'
 * ]);
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
function pre($data, $print = true): mixed
{
    ob_start();
    print_r($data);
    $str = ob_get_clean();
    if ($print) {
        print '<pre>' . $str . '</pre>';
    }
    return '<pre>' . $str . '</pre>';
}
