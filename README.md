# json-schema-bootstrap
My json-schema bootstrap5 user interface

[Live demo](https://marcodpt.github.io/h/?url=https%3A%2F%2Fcdn.jsdelivr.net%2Fgh%2Fmarcodpt%2Fjson-schema-bootstrap%2Fsamples.js)

## Params
 - object `schema`: JSON schema of the element
 - string `lang`: One of the available languages (default: 'en')
 - function `submit`(`data`): Function called after validation
 - function `resolver`(`url`): Function called when `href` property is present

## TODO
 - handle null type 
 - date br
 - use null for not set objects, like cep/image in input form
 - add description to typeahead
 - error feedback on objects and arrays
 - form pending
 - unify formats (no table for input/output)
 
 - use link as hyperschema and make it recursive
 - separate extra properties from schema iterator
 - use form constructor with modal in hrefSchema
 - create a way to extend formats
 - table example
