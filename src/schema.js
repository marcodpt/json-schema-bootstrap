import iterator from './iterator.js'
import validator from './validator.js'
import {parser} from './lib.js'
import {html} from '../dependencies.js'
import {validator as isValid} from '../dependencies.js'

export default ({
  schema,
  resolver,
  submit,
  lang,
  valid,
  ...extra
}) => {
  var data = null
  const validate = validator(lang)
  const readOnly = typeof submit != "function"

  const it = iterator({
    ...schema,
    readOnly: schema.readOnly == null ? readOnly : schema.readOnly,
    change: value => {
      data = parser(schema.type, value)
      return validate(schema, data)
    },
    validate: validate,
    resolver: resolver,
    valid: valid
  })

  return it
}
