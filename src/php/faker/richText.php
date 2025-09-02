<?php

namespace Sugar\Faker;

/**
 * @name            richText
 * @namespace       php.faker
 * @type            Function
 * @platform        php
 * @status          stable
 *
 * This function simply returns you a rich text content that you can use in your tests for example.
 *
 * $
 * 
 * @param       {DOMElement}    $element        The element to change the tag name
 * @param      {String}        $name           The new tag name 
 * @return      {DOMElement}                    The new element
 * 
 * @snippet         \Sugar\Faker\richText($1);
 *
 * @example         php
 * print \Sugar\Faker\richText();
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
function richText(?bool $p = true, ?bool $ul = true, ?bool $ol = true, ?bool $dl = true, ?bool $strong = true, ?bool $em = true, ?bool $sup = true, ?bool $sub = true, ?bool $small = true, ?bool $code = true, ?bool $a = true, ?bool $blockquote = true, ?bool $h1 = true, ?bool $h2 = true, ?bool $h3 = true, ?bool $h4 = true, ?bool $h5 = true, ?bool $h6 = true): string
{

    $str = [];
    $faker = \Faker\Factory::create();

    if ($h1 === null && $faker->boolean()) {
        $h1 = true;
    }
    if ($h1) {
        $str[] = '<h1>I am an H1 heading</h1>';
    }

    if ($h2 === null && $faker->boolean()) {
        $h2 = true;
    }
    if ($h2) {
        $str[] = '<h2>I am an H2 heading</h2>';
    }

    if ($h3 === null && $faker->boolean()) {
        $h3 = true;
    }
    if ($h3) {
        $str[] = '<h3>I am an H3 heading</h3>';
    }

    if ($h4 === null && $faker->boolean()) {
        $h4 = true;
    }
    if ($h4) {
        $str[] = '<h4>I am an H4 heading</h4>';
    }

    if ($h5 === null && $faker->boolean()) {
        $h5 = true;
    }
    if ($h5) {
        $str[] = '<h5>I am an H5 heading</h5>';
    }

    if ($h6 === null && $faker->boolean()) {
        $h6 = true;
    }
    if ($h6) {
        $str[] = '<h6>I am an H6 heading</h6>';
    }

    if ($p === null && $faker->boolean()) {
        $p = true;
    }
    if ($p) {
        for ($i = 0; $i < $faker->numberBetween(1, 5); $i++) {
            $str[] = '<p>' . $faker->paragraph() . '</p>';
        }
    }

    if ($ul === null && $faker->boolean()) {
        $ul = true;
    }
    if ($ul) {
        function ul($faker, $level = 0)
        {
            $ul = [];
            $ul[] = '<ul>';
            for ($i = 0; $i < $faker->numberBetween(1, 5); $i++) {
                $ul[] = '<li>';
                $ul[] = $faker->sentence();
                if ($faker->boolean() && $level === 0) {
                    $ul[] = ul($faker, $level + 1);
                }
                $ul[] = '</li>';

            }
            $ul[] = '</ul>';
            return implode("\n", $ul);
        }
        $str[] = ul($faker);
    }

    if ($ol === null && $faker->boolean()) {
        $ol = true;
    }
    if ($ol) {
        function ol($faker, $level = 0)
        {
            $ol = [];
            $ol[] = '<ol>';
            for ($i = 0; $i < $faker->numberBetween(1, 5); $i++) {
                $ol[] = '<li>';
                $ol[] = $faker->sentence();
                if ($faker->boolean() && $level === 0) {
                    $ol[] = ol($faker, $level + 1);
                }
                $ol[] = '</li>';

            }
            $ol[] = '</ol>';
            return implode("\n", $ol);
        }
        $str[] = ol($faker);

    }

    if ($dl === null && $faker->boolean()) {
        $dl = true;
    }
    if ($dl) {
        function dl($faker, $level = 0)
        {
            $dl = [];
            $dl[] = '<dl>';
            for ($i = 0; $i < $faker->numberBetween(1, 5); $i++) {
                $dl[] = '<dt>';
                $dl[] = $faker->sentence();
                $dl[] = '</dt>';
                $dl[] = '<dd>';
                $dl[] = $faker->sentence();
                if ($faker->boolean() && $level === 0) {
                    $dl[] = dl($faker, $level + 1);
                }
                $dl[] = '</dd>';

            }
            $dl[] = '</dl>';
            return implode("\n", $dl);
        }
        $str[] = dl($faker);
    }

    if ($strong === null && $faker->boolean()) {
        $strong = true;
    }
    if ($strong) {
        $str[] = '<p>I am a <strong>strong</strong> example</p>';
    }

    if ($em === null && $faker->boolean()) {
        $em = true;
    }
    if ($em) {
        $str[] = '<p>I am an <em>emphasized</em> example</p>';
    }

    if ($sup === null && $faker->boolean()) {
        $sup = true;
    }
    if ($sup) {
        $str[] = '<p>I am a <sup>superscript</sup> example</p>';
    }

    if ($sub === null && $faker->boolean()) {
        $sub = true;
    }
    if ($sub) {
        $str[] = '<p>I am a <sub>subscript</sub> example</p>';
    }

    if ($small === null && $faker->boolean()) {
        $small = true;
    }
    if ($small) {
        $str[] = '<p>I am a <small>small</small> example</p>';
    }

    if ($code === null && $faker->boolean()) {
        $code = true;
    }
    if ($code) {
        $str[] = '<p>I am a <code>code</code> example</p>';
    }

    if ($a === null && $faker->boolean()) {
        $a = true;
    }
    if ($a) {
        $str[] = '<p>I am a <a href="' . $faker->url() . '">link</a> example</p>';
    }

    if ($blockquote === null && $faker->boolean()) {
        $blockquote = true;
    }
    if ($blockquote) {
        $str[] = '<blockquote>' . $faker->sentence() . '</blockquote>';
    }

    return implode("\n", $str);

}