describe('json-schema-deref-sync', function () {
  var expect = require('chai').expect;
  var deref = require('../lib');

  describe('deref', function () {
    it('should work with basic schema', function () {
      var basicSchema = require('./schemas/basic');

      var schema = deref(basicSchema);
      expect(schema).to.be.ok;
      expect(schema).to.deep.equal(basicSchema);
    });

    it('should work with basic local refs', function () {
      var input = require('./schemas/localrefs');
      var expected = require('./schemas/localrefs.expected.json');

      var schema = deref(input);
      expect(schema).to.be.ok;
      expect(schema).to.deep.equal(expected);
    });

    it('should work with simple web refs', function () {
      var input = require('./schemas/webrefs');
      var expected = require('./schemas/webrefs.expected.json'); // same expected output

      var schema = deref(input);
      expect(schema).to.be.ok;
      expect(schema).to.deep.equal(expected);
    });

    it('should work with web and local mixed refs', function () {
      var input = require('./schemas/webwithlocal');
      var expected = require('./schemas/webwithlocal.expected.json');

      var schema = deref(input);
      expect(schema).to.be.ok;
      expect(schema).to.deep.equal(expected);
    });

    it('should work with web refs with json pointers', function () {
      var input = require('./schemas/webrefswithpointer');
      var expected = require('./schemas/webrefswithpointer.expected.json');

      var schema = deref(input);
      expect(schema).to.be.ok;
      expect(schema).to.deep.equal(expected);
    });

    it('should work with nested json pointers', function () {
      var input = require('./schemas/api.props.json');
      var expected = require('./schemas/api.props.expected.json');

      var schema = deref(input, {baseFolder: './test/schemas'});
      expect(schema).to.be.ok;
      expect(schema).to.deep.equal(expected);
    });

    it('should work with missing properties', function () {
      var input = require('./schemas/missing.json');
      var expected = require('./schemas/missing.expected.json');

      var schema = deref(input, {baseFolder: './test/schemas'});
      expect(schema).to.be.ok;
      expect(schema).to.deep.equal(expected);
    });

    it('should work with anyOf array properties', function () {
      var input = require('./schemas/anyofref.json');
      var expected = require('./schemas/anyofref.expected.json');

      var schema = deref(input, {baseFolder: './test/schemas'});
      expect(schema).to.be.ok;
      expect(schema).to.deep.equal(expected);
    });

    it('should work with dots (.) in properties', function () {
      var input = require('./schemas/dotprop.json');
      var expected = require('./schemas/dotprop.expected.json');

      var schema = deref(input, {baseFolder: './test/schemas'});
      expect(schema).to.be.ok;
      expect(schema).to.deep.equal(expected);
    });
  });
});