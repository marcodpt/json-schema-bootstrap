import {html} from '../../dependencies.js'
import control from '../control.js'
import wrap from '../wrap.js'

export default wrap(control(({
  title,
  description,
  change,
  ...schema
}) => html(({input}) => input({
  class: 'form-control',
  type: 'text',
  name: title,
  placeholder: description,
  value: schema.default,
  keyup: ev => change(ev.target.value) 
}))))
