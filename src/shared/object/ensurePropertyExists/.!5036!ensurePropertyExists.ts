import __get from './get/get.js';
import __set from './set/set.js';

/**
 * @name                ensurePropertyExists
 * @namespace           shared.object
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Pass a string like "my.cool.object" and the value it has to be and this function will ensure that this deep object exist
 *
 * @param           {Object}            obj                           The object on which to check the path existence
 * @param           {String}            path                           The dotted object path to check
 * @param           {Mixed}             value                         The value to set to the object path created if not already exist
 * @para            {Any}              The value to set to the object path created
 *
 * @todo      tests
 *
 * @snippet         ensurePropertyExists($1, $2)
 *
 * @example           js
 * import { ensurePropertyExists } from '@blackbyte/sugar/object';
