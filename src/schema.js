import btn from './btn.js'
import iterator from './iterator.js'
import validator from './validator.js'
import {parser} from './lib.js'
import {html} from '../dependencies.js'

export default ({
  schema,
  resolver,
  submit,
  lang,
  ...extra
}) => {
  var data = null
  const validate = validator(lang)
  const readOnly = typeof submit != "function"

  return html(({form}) => form({
    ...extra,
    novalidate: true,
    submit: ev => {
      ev.preventDefault()
      ev.stopPropagation()
      if (!readOnly) {
        submit(data)
      }
    }
  }, [
    iterator({
      ...schema,
      readOnly: schema.readOnly == null ? readOnly : schema.readOnly,
      change: value => {
        data = parser(schema.type, value)
        return validate(schema, data)
      },
      validate: validate,
      resolver: resolver
    }),
    readOnly ? null : btn({
      type: 'submit'
    }, 'Submit')
  ]))
}
