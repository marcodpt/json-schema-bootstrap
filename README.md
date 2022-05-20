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
 - table example
 - form validation
 - date br
 - use form constructor with modal in hrefSchema
 - use null for not set objects, like cep/image in input form
 - unify formats (no table for input/output)
 - create a way to extend formats
 - add description to typeahead
 - separate extra properties from schema iterator
 - use link as hyperschema and make it recursive
 - error feedback on objects and arrays
 - problem in my-3 in inputs without wrapper for example arrays
 - form pending
