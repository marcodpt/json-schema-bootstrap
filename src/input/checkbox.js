import {html} from '../../dependencies.js'
import control from '../control.js'

export default ({
  format,
  ...schema
}) => html(({div}) => div({
  class: [
    'my-3',
    'form-check',
    format == 'toggle' ? 'form-switch' : ''
  ]
}, control(({
  title,
  description,
  change,
  ...schema
}) => html(({input, label}) => [
  input({
    class: 'form-check-input',
    type: 'checkbox',
    checked: schema.default ? true : false,
    click: ev => change(ev.target.checked ? true : false)
  }),
  label({
    class: 'form-check-label',
    title: description
  }, title)
]))(schema)))
