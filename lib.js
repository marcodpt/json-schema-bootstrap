import {html} from './dependencies.js'

const copy = X => X !== undefined ? JSON.parse(JSON.stringify(X)) : X

const toNumber = x => {
  if (typeof x == 'string') {
    if (x.indexOf('.') == -1) {
      x = parseInt(x)
    } else {
      x = parseFloat(x)
    }
  }

  return isNaN(x) || typeof x != 'number' ? 0 : x
}

const elRemove = el => {
  if (el && el.parentNode) {
    el.parentNode.removeChild(el)
  }
}

const jsonp = uri => new Promise((resolve, reject) => {
  var id = '_' + Math.round(10000 * Math.random())
  var callbackName = 'jsonp_callback_' + id
  window[callbackName] = data => {
    delete window[callbackName]
    elRemove(document.getElementById(id))
    resolve(data)
  }

  var src = uri+(uri.indexOf('?') !== -1 ? '&' : '?')+
      'callback='+callbackName
  var script = document.createElement('script')
  script.src = src
  script.id = id
  script.addEventListener('error', reject)
  document.body.appendChild(script)
})

const hasType = (types, type) => types instanceof Array ?
  types.indexOf(type) >= 0 : types === type

const dependencies = str => [...str.matchAll(/{([^{}]*)}/g)]
  .map(M => M[0].substr(1, M[0].length - 2))
  .reduce((Deps, key) => Deps.concat(Deps.indexOf(key) < 0 ? [key] : []), [])

const interpolate = (str, X) => {
  if (typeof str != 'string') {
    return str
  } else if (X && typeof X == 'object' && !(X instanceof Array)) {
    return str.replace(/{([^{}]*)}/g, (a, b) => {
      var r = X[b]
      return typeof r === 'string' || typeof r === 'number' ? r : a
    })
  } else {
    return str.replace(/{}/g, () =>
      X instanceof Array ? X.join(',') :
      X == null ? '' :
      X
    )
  }
}

const control = (input, output, config) => (schema, submit, options) =>
  html(({div}) => {
    const {
      title,
      description,
      readOnly
    } = schema
    config = config || {}

    const P = config.parent || {}
    Object.keys(P).forEach(key => {
      options.parent(key, P[key])
    })

    if (readOnly || !submit) {
      return output ? output(schema, options) : options.it({
        ...schema,
        ui: 'data'
      })
    } else {
      const feedback = div({
        class: 'invalid-feedback'
      })

      const genFeedback = (e, value, validator) => {
        var msg = submit(value, validator)

        if (config.value) {
          const v = e.querySelector(config.value)
          if (v) {
            v.textContent = value
          }
        }

        if (e && config.input) {
          e = e.querySelector(config.input)
        }

        if (e) {
          e.classList.remove(`is-valid`)
          e.classList.remove(`is-invalid`)
          if (msg) {
            e.classList.add(`is-invalid`)
          } else if (msg === '') {
            e.classList.add(`is-valid`)
          }
          feedback.textContent = typeof msg == "string" ? msg : ''
        }
      }

      var el = null

      el = input(schema,
        (value, validator) => genFeedback(el, value, validator)
      , options)

      if (schema.default !== undefined) {
        genFeedback(el, schema.default)
      }

      if (config.input) {
        const x = el.querySelector(config.input)
        if (x) {
          x.parentNode.appendChild(feedback)
        }
        return el
      } else {
        return div([
          el,
          feedback
        ])
      }
    }
  })

const validateCNPJ = cnpj => {
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

const validateCPF = cpf => {
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

const reader = file => new Promise((resolve, reject) => {
  var reader = new FileReader()
  var type = file.type
  reader.onloadend = function () {
    if (reader.error) {
      reject(reader.error)
    } else {
      const data = reader.result
      resolve({
        data: type.substr(-1) == '*' ? btoa(data) : data,
        mime: type,
        name: file.name
      })
    }
  }
  var M = file.type.split('/')
  if (([
    'audio',
    'video',
    'image'
  ]).indexOf(M[0]) != -1) {
    type += '*'
    reader.readAsBinaryString(file)
  } else {
    reader.readAsText(file, 'UTF-8')
  }
})

export {
  copy,
  toNumber,
  elRemove,
  jsonp,
  hasType,
  dependencies,
  interpolate,
  control,
  validateCNPJ,
  validateCPF,
  reader
}
