import {html} from '../../dependencies.js'
import field from '../field.js'

const validaCNPJ = cnpj => {
  if (
    cnpj == "00000000000000" || 
    cnpj == "11111111111111" || 
    cnpj == "22222222222222" || 
    cnpj == "33333333333333" || 
    cnpj == "44444444444444" || 
    cnpj == "55555555555555" || 
    cnpj == "66666666666666" || 
    cnpj == "77777777777777" || 
    cnpj == "88888888888888" || 
    cnpj == "99999999999999"
  ) {
    return false
  }
       
  var tamanho = cnpj.length - 2
  var numeros = cnpj.substring(0,tamanho)
  var digitos = cnpj.substring(tamanho)
  var soma = 0
  var pos = tamanho - 7
  for (var i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos
    pos = pos - 1
    if (pos < 2) {
      pos = 9
    }
  }
  var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11
  if (resultado != digitos.charAt(0)) {
    return false
  }
       
  tamanho = tamanho + 1
  numeros = cnpj.substring(0,tamanho)
  soma = 0
  pos = tamanho - 7
  for (var i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos
    pos = pos - 1
    if (pos < 2) {
      pos = 9
    }
  }
  resultado = soma % 11 < 2 ? 0 : 11 - soma % 11

  return resultado == digitos.charAt(1)
}

const validaCPF = cpf => {
  var Soma
  var Resto
  Soma = 0
  if (cpf == "00000000000") {
    return false
  }

  for (var i = 1; i <= 9; i++) {
    Soma = Soma + parseInt(cpf.substring(i-1, i)) * (11 - i)
  }
  Resto = (Soma * 10) % 11

  if ((Resto == 10) || (Resto == 11)) {
    Resto = 0
  }
  if (Resto != parseInt(cpf.substring(9, 10)) ) {
    return false
  }

  Soma = 0
  for (var i = 1; i <= 10; i++) {
    Soma = Soma + parseInt(cpf.substring(i-1, i)) * (12 - i)
  }
  Resto = (Soma * 10) % 11

  if ((Resto == 10) || (Resto == 11)) {
    Resto = 0
  }
  return Resto == parseInt(cpf.substring(10, 11))
}

export default field(({
  title,
  description,
  format,
  change,
  ...schema
}) => html(({input}) => input({
  class: 'form-control validate',
  type: 'text',
  placeholder: !title ? description : null,
  value: schema.default,
  keyup: ev => {
    var v = ev.target.value.replace(/[^\d]+/g,'')
    change(ev.target.parentNode, v, (v, error) => {
      if (error) {
        return error
      } else if (v.length == 11) {
        return validaCPF(v) ? '' : 'CPF inválido.'
      } else if (v.length == 14) {
        return validaCNPJ(v) ? '' : 'CNPJ inválido.'
      } else {
        return ''
      }
    })
  } 
})))
