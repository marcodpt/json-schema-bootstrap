import {html} from '../dependencies.js'
import {control} from '../lib.js'
import data from './data.js'

export default control(({
  title,
  description,
  ...schema
}, submit) => html(({input}) => input({
  class: 'form-control',
  type: 'password',
  name: title,
  placeholder: description,
  value: schema.default,
  input: ev => submit(ev.target.value) 
})), schema => data({
  ...schema,
  default: schema.default == null ? schema.default : 
    Array(String(schema.default).length + 1).join('*')
}))
