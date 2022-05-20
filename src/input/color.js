import {html} from '../../dependencies.js'
import control from '../control.js'
import wrap from '../wrap.js'

export default wrap(control(({
  title,
  description,
  change,
  ...schema
}) => html(({input, div}) => 
  input({
    class: 'form-control form-control-color',
    type: 'color',
    name: title,
    placeholder: description,
    value: schema.default,
    change: ev => change(ev.target.value)
  })
), {text: true}))
