import {html} from '../dependencies.js'
import {control, validateRG} from '../lib.js'

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
  input: ev => submit(ev.target.value.replace(/[^\d]+/g,''), (value, msg) => {
    if (msg) {
      return msg
    } else if (value.length == 9) {
      return validateRG(value) ? msg : 'RG inválido.'
    } else {
      return msg
    }
  })
})))
