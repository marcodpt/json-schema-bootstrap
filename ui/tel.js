import {html} from '../dependencies.js'
import {control} from '../lib.js'

export default control(({
  title,
  description,
  ...schema
}, submit) => html(({input}) => input({
  class: 'form-control',
  type: 'tel',
  name: title,
  placeholder: description,
  value: schema.default,
  input: ev => submit(ev.target.value.replace(/[^\d]+/g,''))
})))
