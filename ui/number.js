import {html} from '../dependencies.js'
import {toNumber, control} from '../lib.js'

export default control(({
  title,
  description,
  type,
  minimum,
  maximum,
  multipleOf,
  ...schema
}, submit) => html(({input}) => input({
  class: 'form-control',
  type: 'number',
  name: title,
  placeholder: description,
  min: minimum,
  max: maximum,
  step: multipleOf,
  value: schema.default,
  input: ev => submit(toNumber(ev.target.value))
})))
