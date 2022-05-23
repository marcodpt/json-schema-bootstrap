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

  return readOnly ? it : html(({form, button, i}) => form({
    ...extra,
    novalidate: true,
    submit: ev => {
      ev.preventDefault()
      ev.stopPropagation()
      if (!readOnly) {
        console.log(data)
        if (isValid(schema, data)) {
          submit(data)
        } else {
          const b = ev.target.closest('form')
            .querySelector('button[type=submit]')
          if (b) {
            b.classList.remove('btn-primary')
            b.classList.add('disabled')
            b.classList.add('btn-danger')

            const icon = b.querySelector('i.fas')
            if (icon) {
              icon.classList.remove('fa-check')
              icon.classList.add('fa-exclamation')
            }
          }
        }
      }
    }
  }, [
    it,
    button({
      type: 'submit',
      class: 'btn btn-primary',
      blur: ev => {
        const b = ev.target.closest('button')
        if (b) {
          b.classList.remove('btn-danger')
          b.classList.add('btn-primary')
          b.classList.remove('disabled')

          const icon = b.querySelector('i.fas')
          if (icon) {
            icon.classList.remove('fa-exclamation')
            icon.classList.add('fa-check')
          }
        }
      }
    }, [
      i({
        class: 'fas fa-check'
      }),
      ' Submit'
    ])
  ]))
}
