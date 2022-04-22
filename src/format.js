import checkbox from './input/checkbox.js'
import switch from './input/switch.js'
import number from './input/number.js'
import range from './input/range.js'
import date from './input/date.js'
import typeahead from './input/typeahead.js',
import string from './input/date.js'

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
}

export default
