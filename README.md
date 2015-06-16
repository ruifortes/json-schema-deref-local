# json-schema-deref-local

Dereference local JSON pointers in a JSON schema with their true resolved values.
Basically a lighter, local-only version of [json-schema-deref-sync](https://github.com/bojand/json-schema-deref-sync) but omits web references, file references, and custom loaders.

## Why?

This local-only fork removes the dependency on the Node.js `fs` module, allowing it to be used either in Node.js or in a web browser.

## Installation

`npm install SeedScientific/json-schema-deref-local`

## Overview

Let's say you have the following JSON Schema:

```json
{
  "description": "Just some JSON schema.",
  "title": "Basic Widget",
  "type": "object",
  "definitions": {
    "id": {
      "description": "unique identifier",
      "type": "string",
      "minLength": 1,
      "readOnly": true
    }
  },
  "properties": {
  "id": {
    "$ref": "#/definitions/id"
  }
}
```

Sometimes you just want that schema to be fully expanded, with `$ref`'s being their (true) resolved values:

```json
{
  "description": "Just some JSON schema.",
  "title": "Basic Widget",
  "type": "object",
  "definitions": {
    "id": {
      "description": "unique identifier",
      "type": "string",
      "minLength": 1,
      "readOnly": true
    }
  }
}
```

This utility lets you do that:


```js
var deref = require('json-schema-deref-local');
var myschema = require('schema.json');

var fullSchema = deref(myschema);
```

## API

### deref(schema, options)

Dereferences `$ref`'s in json schema to actual resolved values. **Supports local refs only** (ie. refs starting with '#' referring to definitions in the same schema file).

Parameters:

##### `schema`
The input JSON schema


### deref.getRefPathValue(schema, refPath)

Gets the "local" ref value given the path.

`schema` - the (root) json schema to search

`refPath` - string ref path to get within the schema. Ex. `#/definitions/id`

```js
var localValue = deref.getRefPathValue(myschema, '#/definitions/foo');
console.dir(localValue);
```
