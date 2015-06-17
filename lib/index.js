var utils = require('./utils');
var traverse = require('traverse');

function getRefSchema(parent, refObj) {
  var refType = utils.getRefType(refObj);
  var refVal = utils.getRefValue(refObj);

  if (refType === 'local') {
    return utils.getRefPathValue(parent, refVal);
  }
}

function derefSchema(schema) {
  return traverse(schema).map(function (node) {
    if (node && node['$ref'] && typeof node['$ref'] === 'string') {
      var newValue = getRefSchema(schema, node);
      if (newValue) {
        var value = derefSchema(newValue);
        if (value || newValue) {
          this.update(value || newValue);
        }
      }
    }
  });
}

/**
 * Derefs `$ref`'s in json schema to actual resolved values.
 * Supports local, file and web refs.
 * @param schema The json schema
 * @param options
 *          baseFolder - the base folder to get relative path files from. Default is `process.cwd()`
 * @returns {*}
 */
function deref(schema) {
  return derefSchema(schema);
}

deref.prototype.getRefPathValue = utils.getRefPathValue;

module.exports = deref;