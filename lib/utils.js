var mpath = require('mpath');

/**
 * Gets the ref value of a search result from prop-search or ref object
 * @param ref The search result object from prop-search
 * @returns {*} The value of $ref or undefined if not present in search object
 */
exports.getRefValue = function (ref) {
  var thing = ref ? (ref.value ? ref.value : ref) : null;
  if (thing && thing.$ref && typeof thing.$ref === 'string') {
    return thing.$ref;
  }
};

/**
 * Gets the type of $ref from search result object.
 * @param ref The search result object from prop-search or a ref object
 * @returns {string}  `local` if it's a link to local schema.
 *                    undefined otherwise
 */
exports.getRefType = function (ref) {
  var val = exports.getRefValue(ref);
  if (val && (val.charAt(0) === '#')) {
    return 'local'
  }
};

/**
 * Determines if object is a $ref object. That is { $ref: <something> }
 * @param thing object to test
 * @returns {boolean} true if passes the test. false otherwise.
 */
exports.isRefObject = function (thing) {
  if (thing && typeof thing === 'object' && !Array.isArray(thing)) {
    var keys = Object.keys(thing);
    return keys.length === 1 && keys[0] === '$ref' && typeof thing['$ref'] === 'string';
  }
  return false;
};

/**
 * Gets the value at the ref path within schema
 * @param schema the (root) json schema to search
 * @param refPath string ref path to get within the schema. Ex. `#/definitions/id`
 * @returns {*} Returns the value at the path location or undefined if not found within the given schema
 */
exports.getRefPathValue = function (schema, refPath) {
  var rpath = refPath;
  var hashIndex = refPath.indexOf('#');
  if (hashIndex >= 0) {
    rpath = refPath.substring(hashIndex);
    if (rpath.length > 1) {
      rpath = refPath.substring(1);
    }
    else {
      rpath = '';
    }
  }

  if(rpath.charAt(0) === '/') {
    rpath = rpath.substring(1);
  }

  if (rpath.indexOf('/') >= 0) {
    rpath = rpath.replace(/\//gi, '.');
  }

  if(rpath) {
    return mpath.get(rpath, schema);
  }
};