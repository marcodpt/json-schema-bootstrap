# json-schema-bootstrap
My json-schema bootstrap5 user interface

[Live demo](https://marcodpt.github.io/h/?url=https%3A%2F%2Fcdn.jsdelivr.net%2Fgh%2Fmarcodpt%2Fjson-schema-bootstrap%2Fsamples.js)

## Params
 - object `schema`: JSON schema of the element
 - string `lang`: One of the available languages (default: 'en')
 - function `submit`(`data`): Function called after validation
 - function `resolver`(`url`): Function called when `href` property is present

## TODO
 - sane magic defaults
 - href rendering on table and items
 - create a way to extend formats

## NEXT
 - select multiple
 - checkbox problem table
 - link wait some time until url change
 - cancel wrapper in form and table (text-center)
 - lang for close/submit buttons
 - cache goes down the recursive tree
 - finish version 0.0.1
