import {html} from '../dependencies.js'
import {control} from '../index.js'
import {toNumber} from '../lib.js'

export default control(({
  title,
  description,
  type,
  submit,
  minimum,
  maximum,
  multipleOf,
  ...schema
}) => html(({input}) => input({
  class: 'form-control',
  type: 'number',
  name: title,
  placeholder: description,
  min: minimum,
  max: maximum,
  step: multipleOf,
  value: schema.default,
  change: ev => submit(toNumber(ev.target.value)),
  keyup: ev => submit(toNumber(ev.target.value))
})))
