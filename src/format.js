import object from './object.js'
import string from './input/string.js'
import number from './input/number.js'
import checkbox from './input/checkbox.js'
import range from './input/range.js'
import text from './input/text.js'
import date from './input/date.js'
import file from './input/file.js'

/*
import typeahead from './input/typeahead.js'
import array from './input/array.js'
*/

const Formats = {
  boolean: {
    _: checkbox
  },
  integer: {
    _: number,
    range: range,
    date: date
  },
  number: {
    _: number,
    range: range
  },
  string: {
    _: string,
    text: text,
    date: date
  },
  object: {
    _: object,
    file: file
  },
  array: {
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

  const F = Formats[schema.type]
  if (F) {
    const G = F[schema.format] || F['_']
    if (G) {
      return G(schema, children)
    }
  }
}

export default format
