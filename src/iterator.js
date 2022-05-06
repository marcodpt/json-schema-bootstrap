import form from './input/form.js'
import items from './input/items.js'
import string from './input/string.js'
import number from './input/number.js'
import checkbox from './input/checkbox.js'
import range from './input/range.js'
import text from './input/text.js'
import date from './input/date.js'
import file from './input/file.js'
import color from './input/color.js'
import cnpjcpf from './input/cnpjcpf.js'
import cep from './input/cep.js'
import typeahead from './input/typeahead.js'
import {parser, interpolate} from './lib.js'

const Formats = {
  boolean: {
    _: checkbox
  },
  integer: {
    _: number,
    range: range,
    date: date,
    typeahead: typeahead
  },
  number: {
    _: number,
    range: range
  },
  string: {
    _: string,
    text: text,
    date: date,
    color: color,
    cnpjcpf: cnpjcpf,
    typeahead: typeahead
  },
  object: {
    _: form,
    file: file,
    cep: cep
  },
  array: {
    _: items,
    file: file
  }
}

const iterator = schema => {
  const {
    type,
    change,
    validate,
    resolver,
    properties,
    items,
    minItems
  } = schema
  const base = {validate, resolver}
  const t = type == null ? 'null' :
    type instanceof Array ? type[0] : type

  if (t == "object" && properties != null) {
    schema.builder = () => {
      const data = parser(t, schema.default)
      const children = []
      const resolved = {}
      const watch = {}

      Object.keys(properties).forEach(key => {
        const P = properties[key]
        data[key] = parser(P.type, P.default)
        children.push(iterator({
          ...P,
          change: value => {
            data[key] = parser(P.type, value)

            Object.keys(watch).forEach(href => {
              const url = interpolate(href, data)

              watch[href].forEach(F => F(resolved[url]))
              if (
                resolved[url] === undefined &&
                url.indexOf('{') == -1 && 
                url.indexOf('}') == -1
              ) {
                resolved[url] = null
                new Promise(resolve => resolve(resolver(url)))
                  .then(data => {
                    resolved[url] = data
                    watch[href].forEach(F => F(data))
                  }).catch(err => {
                    console.log(err)
                    watch[href].forEach(F => F(resolved[url]))
                  })
              }
            })
            return validate(P, data[key])
          },
          watch: (href, callback) => {
            if (watch[href] == null) {
              watch[href] = []
            }
            watch[href].push(callback)
          },
          ...base
        }))
      })
      return {
        error: change(data),
        children: children
      }
    }
  } else if (t == "array" && items != null) {
    schema.builder = () => {
      const data = parser(t, schema.default)
      const children = []
      for (var n = 0; n < minItems; n++) {
        const m = n
        children.push(iterator({
          ...items,
          change: value => {
            data[m] = parser(items.type, value)
            return validate(items, data[m])
          },
          ...base
        }))
      }
      return {
        error: change(data),
        add: () => {
          const n = data.length

          return iterator({
            ...items,
            change: value => {
              data[n] = parser(items.type, value)
              return validate(items, data[n])
            },
            ...base
          })
        },
        remove: () => {data.pop()},
        children: children
      }
    }
  }

  const F = Formats[t]
  if (F) {
    const G = F[schema.format] || F['_']
    if (G) {
      return G(schema)
    }
  }
}

export default iterator
