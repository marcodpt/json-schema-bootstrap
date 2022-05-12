import {html} from '../../dependencies.js'
import field from '../field.js'

export default field(({
  title,
  description,
  change,
  ...schema
}) => html(({input}) => input({
  class: 'form-control validate',
  type: 'text',
  placeholder: !title ? description : null,
  value: schema.default,
  keyup: ev => change(ev.target.parentNode, ev.target.value) 
})))
