import {validator} from './dependencies.js'
import lang from './src/lang/index.js'
import ui from './interfaces.js'

const it = oldOptions => (schema, newOptions) => {
  const options = ({
    ...(oldOptions || {}),
    ...{
      resolve: null, 
      reject: null
    },
    ...(newOptions || {})
  })

  options.it = it(options)

  const {
    language,
    showValid,
    resolve,
    reject
  } = options

  const submit = !resolve && !reject ? null : (data, validate) => {
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
        x = options.it({
          ...schema,
          default: schema[key]
        }).textContent
      }

      error = l[key](x)
    })

    if (typeof validate == 'function') {
      error = validate(data, error)
    }

    if (!error && resolve) {
      resolve(data)
    } else if (error && reject) {
      reject(error, data)
    }

    return error && schema.error ? schema.error : error
  }

  return (ui[schema.ui] || (() => null))(schema, submit, options)
}

export default ({
  options,
  schema
}) => it()(schema || {}, options)
