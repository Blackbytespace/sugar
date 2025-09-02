<?php

namespace Sugar\Array;

use PhpParser\Node\NullableType;

/**
 * @name            pickSome
 * @namespace       php.array
 * @type            Function
 * @platform        php
 * @status          beta
 *
 * This returns you one or more random item of the passed array
 *
 * @param       {Array}         $array          The array in which you want to pick a random item
 * @param       {Integer}       [$min=1]        The minimum number of items to pick
 * @param       {Integer}       [$max=null]        The maximum number of items to pick
 * @return      {Any}                         The random array item(s)
 *
 * @snippet         \Sugar\Array\pickSome($1,$2,$3);
 *
 * @example         php
 * \Sugar\Array\pickSome(['hello','world','test'], 1, 2);
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
function pickSome(array $array, int $min = 1, NullableType $max = null): array
{
    if ($max === null) {
        $max = count($array);
    }

    $availableIdx = [];
    for ($i = 0; $i < count($array); $i++) {
        $availableIdx[] = $i;
    }

    $picked = [];
    while (true) {

        // handle max
        if (count($picked) >= $max) {
            break;
        }

        // handle min and random continue
        if (count($picked) >= $min && rand(0, 1) === 0) {
            break;
        }

        // pick a random index
        $idx = array_rand($availableIdx, 1);

        // add the picked item to the picked array
        $picked[] = $array[$availableIdx[$idx]];

        // remove the picked index from the available ones
        array_splice($availableIdx, $idx, 1);

        // if no more available index, break
        if (count($availableIdx) === 0) {
            break;
        }
    }

    return $picked;
}
