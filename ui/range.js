import {html} from '../dependencies.js'
import {control} from '../index.js'
import {toNumber} from '../lib.js'

export default control(({
  title,
  minimum,
  maximum,
  multipleOf,
  submit,
  ...schema
}) => html(({div, span, input}) => div([
  div({
    class: 'form-text'
  }),
  input({
    name: title,
    class: 'form-range',
    type: 'range',
    min: minimum,
    max: maximum,
    step: multipleOf,
    value: schema.default,
    change: ev => submit(toNumber(ev.target.value))
  })
])), null, {
  input: 'input',
  value: '.form-text'
})
