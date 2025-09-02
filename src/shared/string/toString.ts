import { decycle } from 'json-cyclic';
import mapToObj from '../convert/mapToObject.js';
import isArray from '../is/isArray.js';
import isBoolean from '../is/isBoolean.js';
import isFunction from '../is/isFunction.js';
import isJson from '../is/isJson.js';
import isMap from '../is/isMap.js';
import isObject from '../is/isObject.js';
import deepMap from '../object/deepMap.js';

/**
 * @name            toString
 * @namespace       shared.string
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          stable
 *
 * Convert passed value to a string
 *
 * @param    {Mixed}    value                           The value to convert to string
 * @param     {Object}      [settings={}]             An object of settings to configure your toString process:
 * @return    {String}                                  The resulting string
 *
 * @setting        {Boolean}        [beautify=true]        Specify if you want to beautify the output like objects, arrays, etc...
 * @setting        {Boolean}        [verbose=true]        Specify if you want to output verbose information like stack trace, etc...
 *
 * @todo      tests
 *
 * @snippet         toString($1)
 *
 * @example    js
 * import { toString } from '@blackbyte/sugar/string'
 * toString({
 * 	id:'hello'
 * }) // '{"id":"hello"}'
 *
 * @since     1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

export type TToStringSettings = {
  beautify?: boolean;
  verbose?: boolean;
};

export default function toString(
  value: any,
  settings: TToStringSettings = {},
): string {
  settings = {
    beautify: true,
    verbose: true,
    ...settings,
  };

  // string
  if (typeof value === 'string') return value;
  // null
  if (value === null) return 'null';
  // undefined
  if (value === undefined) return 'undefined';
  // error
  if (value instanceof Error) {
    const errorStr = value.toString();
    const stackStr = value.stack;
    const messageStr = value.message;
    if (settings.verbose) {
      return [
        `<red>${value.constructor.name || 'Error'}</red>`,
        '',
        messageStr,
        '',
        stackStr,
      ].join('\n');
    }
    return errorStr;
  }

  // Map
  if (isMap(value)) {
    value = mapToObj(value);
  }

  // JSON
  if (isObject(value) || isArray(value) || isJson(value)) {
    try {
      value = decycle(value);
    } catch (e) {}

    value = deepMap(value, ({ value }) => {
      if (value instanceof Map) return mapToObj(value);
      return value;
    });

    let prettyString = JSON.stringify(value, null, settings.beautify ? 4 : 0);
    prettyString = prettyString
      .replace(/"([^"]+)":/g, '$1:')
      .replace(/\uFFFF/g, '\\"');
    return prettyString;
  }
  // boolean
  if (isBoolean(value)) {
    if (value) return 'true';
    else return 'false';
  }
  // function
  if (isFunction(value)) {
    return '' + value;
  }
  // stringify
  let returnString = '';
  try {
    value = decycle(value);
    returnString = JSON.stringify(value, null, settings.beautify ? 4 : 0);
  } catch (e) {
    try {
      returnString = value.toString();
    } catch (e) {
      returnString = value;
    }
  }
  return returnString;
}
