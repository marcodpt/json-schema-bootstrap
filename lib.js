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

const jsonp = uri => new Promise((resolve, reject) => {
  var id = '_' + Math.round(10000 * Math.random())
  var callbackName = 'jsonp_callback_' + id
  window[callbackName] = data => {
    delete window[callbackName]
    var ele = document.getElementById(id)
    ele.parentNode.removeChild(ele)
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
  if (X && typeof X == 'object' && !(X instanceof Array)) {
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

        if (config.input) {
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

export {copy, toNumber, jsonp, hasType, dependencies, interpolate, control}
