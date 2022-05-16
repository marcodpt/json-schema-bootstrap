import bool from './output/bool.js'
import simple from './output/simple.js'
import number from './output/number.js'
import date from './output/date.js'
import color from './output/color.js'
import text from './output/text.js'
import table from './output/table.js'
import item from './output/item.js'

export default {
  boolean: {
    _: bool
  },
  integer: {
    _: number,
    date: date
  },
  number: {
    _: number
  },
  string: {
    _: simple,
    date: date,
    text: text,
    color: color
  },
  object: {
    _: item
  },
  array: {
    _: table
  }
}
