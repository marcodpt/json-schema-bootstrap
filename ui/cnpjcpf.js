import {html} from '../dependencies.js'
import {control} from '../lib.js'

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
  keyup: ev => submit(ev.target.value.replace(/[^\d]+/g,''))
})), null, {
  validator: (value, msg) => {
    if (msg) {
      return msg
    } else if (value.length == 11) {
      return validaCPF(value) ? msg : 'CPF inválido.'
    } else if (value.length == 14) {
      return validaCNPJ(value) ? msg : 'CNPJ inválido.'
    } else {
      return msg
    }
  }
})
