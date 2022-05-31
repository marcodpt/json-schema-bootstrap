import {getType, copy, parser, interpolate} from './lib.js'
import Inputs from './inputs.js'
import Outputs from './outputs.js'

const iterator = schema => {
  const {
    type,
    change,
    valid,
    validate,
    resolver,
    properties,
    items,
    minItems,
    readOnly
  } = schema
  const base = {validate, resolver, valid}
  const t = getType(type)

  if (t == "array" && items != null) {
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
            wrapper: wrapper,
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
