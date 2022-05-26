import {html} from '../dependencies.js'
import {control} from '../lib.js'

export default control(({
  title,
  description,
  ...schema
}, submit) => html(({input}) => input({
  class: 'form-control',
  type: 'text',
  name: title,
  placeholder: description,
  value: schema.default,
  keyup: ev => submit(ev.target.value) 
})))
