import {html} from '../../dependencies.js'
import control from '../control.js'
import wrap from '../wrap.js'

export default wrap(control(({
  title,
  description,
  type,
  change,
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
  change: ev => change(ev.target.value),
  keyup: ev => change(ev.target.value)
}))))
