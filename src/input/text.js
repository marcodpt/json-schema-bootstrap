import {html} from '../../dependencies.js'
import control from '../control.js'
import wrap from '../wrap.js'

export default wrap(control(({
  title,
  description,
  change,
  ...schema
}) => html(({textarea}) => textarea({
  class: 'form-control',
  rows: 6,
  name: title,
  placeholder: description,
  keyup: ev => change(ev.target.value) 
}, schema.default))))
