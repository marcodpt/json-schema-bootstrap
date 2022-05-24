import {html} from '../dependencies.js'
import {control} from '../index.js'

export default control(({
  title,
  description,
  submit,
  ...schema
}) => html(({input}) => input({
  class: 'form-control',
  type: 'text',
  name: title,
  placeholder: description,
  value: schema.default,
  keyup: ev => submit(ev.target.value) 
})))
