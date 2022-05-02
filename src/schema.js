import v from 'https://cdn.jsdelivr.net/gh/marcodpt/json-schema/index.js'
import btn from './btn.js'
import format from './format.js'
import formatters from './formatters.js'
import lang from './lang/en.js'

const interpolate = (str, X) => {
  return str.replace(/{([^{}]*)}/g, (a, b) => {
    var r = X[b]
    return typeof r === 'string' || typeof r === 'number' ? r : a
  })
}

const parser = (type, value) => {
  if (type == "integer" && !isNaN(value) && value !== "") {
    return parseInt(value)
  } else if (type == "number" && !isNaN(value) && value !== "") {
    return parseFloat(value)
  }
  return value
}

export default (Tags, {
  schema,
  resolver,
  submit
}) => {
  const Scope = {}

  v(schema, (schema, path, validate) => {
    const F = formatters[schema.format] || (value => value)
    const getError = data => {
      const k = validate(data)
      const error = lang[k] == null ? k : lang[k](F(schema[k]))
      return error && schema.error ? schema.error : error
    }

    const parent = Object.keys(Scope).reduce(
      (parent, key) => path.substr(0, key.length) == key && (
        parent == null || key.length > parent.length
      ) ? key : parent
    , null)

    Scope[path] = {
      schema
    }

    const s = Scope[path]
    const t = schema.type instanceof Array ? schema.type[0] : schema.type
    if (schema.default !== undefined) {
      s.data = schema.default
    } else if (
      t == "object" ||
      schema.properties != null ||
      schema.additionalProperties != null
    ) {
      s.data = {}
      if (resolver) {
        s.resolved = {}
        s.watch = {}
      }
    } else if (
      t == "array" ||
      schema.prefixItems != null ||
      schema.items != null
    ) {
      s.data = []
    } else if (t == "number" || t == "integer") {
      s.data = 0
    } else if (t == "string") {
      s.data = ""
    } else if (t == "boolean") {
      s.data = false
    } else {
      s.data = null
    }

    if (!parent) {
      s.schema.change = value => {
        s.data = parser(s.schema.type, value)
        return getError(s.data)
      }
    } else {
      const P = path.substr(parent.length + 1).split('/')
      const p = Scope[parent]

      if (p.children == null) {
        p.children = []
      }
      p.children.push(s)

      if (P[0] == "properties" && P.length == 2) {
        if (p.watch) {
          s.schema.watch = (href, callback) => {
            if (p.watch[href] == null) {
              p.watch[href] = []
            }
            p.watch[href].push(callback)
          }
        }

        s.schema.change = value => {
          p.data[P[1]] = parser(s.schema.type, value)

          Object.keys(p.watch).forEach(href => {
            const R = p.resolved
            const url = interpolate(href, p.data)

            p.watch[href].forEach(F => F(R[url]))
            if (
              R[url] === undefined &&
              url.indexOf('{') == -1 && 
              url.indexOf('}') == -1
            ) {
              R[url] = null
              new Promise(resolve => resolve(resolver(url)))
                .then(data => {
                  R[url] = data
                  p.watch[href].forEach(F => F(data))
                }).catch(err => {
                  console.log(err)
                  p.watch[href].forEach(F => F(R[url]))
                })
            }
          })

          return getError(p.data[P[1]])
        }
      } else if (P[0] == "items" && P.length == 1) {
        s.schema.change = item => {
          p.data.push(item)
          p.schema.change(p.data)
        }
      }
    }
  })
  console.log(Scope)

  const {form} = Tags

  return form({
    novalidate: true,
    submit: ev => {
      ev.preventDefault()
      ev.stopPropagation()
      submit(Scope['#'].data)
    }
  }, [
    format(Scope['#']),
    btn({
      type: 'submit'
    }, 'Submit')
  ])
}
