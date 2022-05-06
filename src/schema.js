import btn from './btn.js'
import iterator from './iterator.js'
import validator from './validator.js'
import {parser} from './lib.js'

export default (Tags, {
  schema,
  resolver,
  submit,
  lang
}) => {
  var data = null
  const {form} = Tags

  return form({
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
        return validator(schema, data)
      },
      validate: validator(lang),
      resolver: resolver
    }),
    btn({
      type: 'submit'
    }, 'Submit')
  ])
}
