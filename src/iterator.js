import {getType, copy, parser, interpolate} from './lib.js'
import Inputs from './inputs.js'
import Outputs from './outputs.js'

const iterator = schema => {
  const {
    type,
    change,
    validate,
    resolver,
    properties,
    items,
    minItems,
    readOnly
  } = schema
  const base = {validate, resolver}
  const t = getType(type)

  if (t == "object" && properties != null) {
    schema.builder = wrapper => {
      const data = parser(t, copy(schema.default))
      const children = []
      const resolved = {}
      const watch = {}

      Object.keys(properties).forEach(key => {
        const P = properties[key]
        if (P.default !== undefined) {
          data[key] = parser(P.type, P.default)
        }
        children.push(iterator({
          ...P,
          readOnly: P.readOnly == null ? readOnly : P.readOnly,
          default: data[key],
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
          wrapper: wrapper,
          ...base
        }))
      })
      return {
        error: change(data),
        children: children
      }
    }
  } else if (t == "array" && items != null) {
    schema.builder = wrapper => {
      const data = parser(t, copy(schema.default))
      const children = []
      for (var n = 0; n < minItems; n++) {
        const m = n
        children.push(iterator({
          ...items,
          default: parser(items.type,
            items.default === undefined ? data[m] : items.default
          ),
          readOnly: items.readOnly == null ? readOnly : items.readOnly,
          change: value => {
            data[m] = parser(items.type, value)
            return validate(items, data[m])
          },
          wrapper: wrapper,
          ...base
        }))
      }
      return {
        error: change(data),
        add: () => {
          const n = data.length

          return iterator({
            ...items,
            default: parser(items.type,
              items.default === undefined ? data[n] : items.default
            ),
            readOnly: items.readOnly == null ? readOnly : items.readOnly,
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

  const F = readOnly ? Outputs[t] : Inputs[t]
  if (F) {
    const G = F[schema.format] || F['_']
    if (G) {
      return G(schema)
    }
  }
}

export default iterator
