import {html} from '../../dependencies.js'
import control from '../control.js'
import wrap from '../wrap.js'

export default wrap(control(({
  title,
  minimum,
  maximum,
  multipleOf,
  change,
  ...schema
}) => html(({input}) => input({
  name: title,
  class: 'form-range',
  type: 'range',
  min: minimum,
  max: maximum,
  step: multipleOf,
  value: schema.default,
  change: ev => change(ev.target.value)
})), {text: true}))
