import _ from 'lodash';

/**
* @description Replace deep keys helper
* @param {Object} [obj] Object to be remapped
* @param {Object} [keysMap] Keys and values we wish to remap
* @return {Object} Transformed object
*/
export function replaceKeysDeep(obj, keysMap) {
  return _.transform(obj, function(result, value, key) {

    var currentKey = keysMap[key] || key;

    result[currentKey] = _.isObject(value) ? replaceKeysDeep(value, keysMap) : value;
  });
}
