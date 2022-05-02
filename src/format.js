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

const format = ({
  schema,
  children
}) => {
  if (children) {
    children = children.map(child => format(child))
  }

  const t = schema.type instanceof Array ? schema.type[0] : schema.type

  const F = Formats[t]
  if (F) {
    const G = F[schema.format] || F['_']
    if (G) {
      return G(schema, children)
    }
  }
}

export default format
