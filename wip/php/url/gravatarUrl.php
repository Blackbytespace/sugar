<?php

namespace Sugar\gravatar;

/**
 * @name            gravatarUrl
 * @namespace            php.url
 * @type            Function
 * @platform        php
 * @status          beta
 *
 * This function returns the gravatar url for a given email address.
 *
 * @param       {String}        $email       The email address to get the gravatar url for.
 * @param       {GravatarUrlSettings}           [$settings=new GravatarUrlSettings()]       Some settings to configure your gravatar url
 * @return      {String}                    Containing either just a URL or a complete image tag
 * 
 * @setting       {String}        [$s=80]              Size in pixels, defaults to 80px [ 1 - 2048 ]
 * @setting       {String}        [$d='mp']             Default imageset to use [ 404 | mp | identicon | monsterid | wavatar ]
 * @setting       {String}        [$r='g']          Maximum rating (inclusive) [ g | pg | r | x ]
 * @setting       {Boolean}       [$img=false]            True to return a complete IMG tag False for just the URL
 * @setting       {array}         [$atts=[]]           Optional, additional key/value attributes to include in the IMG tag
 *
 * @snippet             \Sugar\gravatar\url($1, $2);
 *
 * @example         php
 * \Sugar\Url\gravatarUrl('olivier.bossel@gmail.com');
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

class GravatarUrlSettings
{
    public $s = 80;
    public $d = 'mp';
    public $r = 'g';
    public $img = false;
    public $atts = [];

}

function gravatarUrl($email, GravatarUrlSettings $settings = new GravatarUrlSettings())
{
    $url = 'https://www.gravatar.com/avatar/';
    $url .= md5(strtolower(trim($email)));
    $url .= "?s=$settings->s&d=$settings->d&r=$settings->r";
    if ($settings->img) {
        $url = '<img src="' . $url . '"';
        foreach ($settings->atts as $key => $val) {
            $url .= ' ' . $key . '="' . $val . '"';
        }
        $url .= ' />';
    }
    return $url;
}
