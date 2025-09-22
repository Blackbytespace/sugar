<?php

namespace Sugar\Array;

function set(&$arr, $path, $value, $separator = '.')
{
    $keys = explode($separator, $path);

    foreach ($keys as $key) {
        $arr = &$arr[$key];
    }

    $arr = $value;

    return $arr;
}
