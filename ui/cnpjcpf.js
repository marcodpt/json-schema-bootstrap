import {html} from '../dependencies.js'
import {control, validateCNPJ, validateCPF} from '../lib.js'

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
    } else if (value.length == 11) {
      return validateCPF(value) ? msg : 'CPF inválido.'
    } else if (value.length == 14) {
      return validateCNPJ(value) ? msg : 'CNPJ inválido.'
    } else {
      return msg
    }
  })
})))
