import {html} from '../dependencies.js'
import {control} from '../index.js'

export default control(({
  title,
  description,
  submit,
  ...schema
}) => html(({textarea}) => textarea({
  class: 'form-control',
  rows: 6,
  name: title,
  placeholder: description,
  keyup: ev => submit(ev.target.value) 
}, schema.default)))
