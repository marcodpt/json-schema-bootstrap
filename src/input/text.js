import {html} from '../../dependencies.js'
import field from '../field.js'

export default field(({
  title,
  description,
  change,
  ...schema
}) => html(({textarea}) => textarea({
  class: 'form-control validate',
  rows: 6,
  placeholder: !title ? description : null,
  keyup: ev => change(ev.target.parentNode, ev.target.value) 
}, schema.default)))
