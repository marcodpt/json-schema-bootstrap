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

  return html(({form}) => form({
    ...extra,
    novalidate: true,
    submit: ev => {
      ev.preventDefault()
      ev.stopPropagation()
      submit(data)
    }
  }, [
    iterator({
      ...schema,
      change: value => {
        data = parser(schema.type, value)
        return validate(schema, data)
      },
      validate: validate,
      resolver: resolver
    }),
    btn({
      type: 'submit'
    }, 'Submit')
  ]))
}
