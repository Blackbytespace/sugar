<?php

namespace Sugar\Dom;

/**
 * @name            changeTagName
 * @namespace       php.dom
 * @type            Function
 * @platform        php
 * @status          stable
 *
 * This function simply change the tag name of a passed element
 *
 * @param       {DOMElement}    $element        The element to change the tag name
 * @param      {String}        $name           The new tag name 
 * @return      {DOMElement}                    The new element
 * 
 * @snippet         \Sugar\Dom\changeTagName($1, $2);
 *
 * @example         php
 * print \Sugar\Dom\changeTagName($element, 'a');
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

function changeTagName(\DOMElement $element, string $name): \DOMElement
{
    $newnode = $element->ownerDocument->createElement($name);
    foreach ($element->childNodes as $child) {
        $child = $element->ownerDocument->importNode($child, true);
        $newnode->appendChild($child);
    }
    foreach ($element->attributes as $attrName => $attrNode) {
        $newnode->setAttribute($attrName, $attrNode->value);
    }
    $newnode->ownerDocument->replaceChild($newnode, $element);
    return $newnode;
}