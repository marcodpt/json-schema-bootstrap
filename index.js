import {validator, html} from './dependencies.js'
import lang from './src/lang/index.js'

const control = (input, output, config) => schema => html(({div}) => {
  const {
    title,
    description,
    submit,
    readOnly,
    it
  } = schema
  config = config || {}

  if (readOnly || !submit) {
    return output ? output(schema) : it({
      ...schema,
      ui: 'data'
    })
  } else {
    const feedback = div({
      class: 'invalid-feedback'
    })

    const genFeedback = (e, value) => {
      var msg = schema.submit(value)
      if (config.validator) {
        msg = config.validator(value, msg)
      }

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

    el = input({
      ...schema,
      submit: value => genFeedback(el, value)
    })

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

const builder = ({
  ui = {}
}) => {
  const it = schema => (ui[schema.ui] || (() => null))(schema)

  return ({
    config,
    ...schema
  }) => config ? it({
    ...schema,
    it: it,
    language: config.language,
    submit: typeof config.callback != 'function' ? null : (({
      language,
      showValid,
      callback
    }) => data => {
      const l = lang[language] || lang.en
      var error = showValid ? '' : null
      validator(schema, data, key => {
        var x = schema[key]
        if ([
          'const',
          'maximum',
          'exclusiveMaximum',
          'minimum',
          'exclusiveMinimum'
        ].indexOf(key) !== -1) {
          x = it({
            ...schema,
            it: it,
            language: config.language,
            default: schema[key]
          }).textContent
        }

        error = l[key](x)
      })

      if (!error && callback) {
        callback(data)
      }

      return error && schema.error ? schema.error : error
    })(config) 
  }) : it({
    ...schema,
    it: it
  })
}

export {builder, control}
