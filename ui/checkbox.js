import {html} from '../dependencies.js'
import {control} from '../index.js'

export default control(({
  title,
  description,
  submit,
  ui,
  ...schema
}) => html(({div, label, input}) => div({
  class: [
    'form-check',
    ui == 'switch' ? 'form-switch' : ''
  ]
}, [
  input({
    class: 'form-check-input',
    type: 'checkbox',
    checked: schema.default ? true : false,
    click: ev => submit(ev.target.checked ? true : false)
  }),
  label({
    class: 'form-check-label',
    title: description
  }, title)
])), null, {
  input: 'input'
})
