import object from './object.js'
import string from './input/string.js'
import number from './input/number.js'
import checkbox from './input/checkbox.js'

/*import switch from './input/switch.js'
import range from './input/range.js'
import date from './input/date.js'
import typeahead from './input/typeahead.js',
import file from './input/file.js'

const Formats = {
  boolean: {
    _: checkbox,
    switch: switch
  },
  integer: {
    _: number,
    range: range,
    date: date,
    typeahead: typeahead
  },
  number: {
    _: number
  },
  string: {
    _: string,
    text: text,
    date: date
  },
  object: {
    _: file
  },
  array: {
    _: file
  }
}*/

const Formats = {
  boolean: {
    _: checkbox
  },
  integer: {
    _: number
  },
  number: {
    _: number
  },
  string: {
    _: string
  },
  object: {
    _: object
  }
}

const format = ({
  schema,
  children
}) => {
  if (children) {
    children = children.map(child => format(child))
  }

  const F = Formats[schema.type]
  if (F) {
    const G = F[schema.format || '_']
    if (G) {
      return G(schema, children)
    }
  }
}

export default format
