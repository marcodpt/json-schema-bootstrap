import card from './ui/card.js'
import alert from './ui/alert.js'
import data from './ui/data.js'
import string from './ui/string.js'
import text from './ui/text.js'
import color from './ui/color.js'
import range from './ui/range.js'
import number from './ui/number.js'
import checkbox from './ui/checkbox.js'
import cnpjcpf from './ui/cnpjcpf.js'
import cep from './ui/cep.js'
import file from './ui/file.js'
import date from './ui/date.js'
import typeahead from './ui/typeahead.js'
import form from './ui/form.js'

export default {
  card: card,
  primary: alert,
  secondary: alert,
  success: alert,
  danger: alert,
  warning: alert,
  info: alert,
  light: alert,
  dark: alert,
  data: data,
  string: string,
  text: text,
  color: color,
  range: range,
  integer: number,
  number: number,
  checkbox: checkbox,
  switch: checkbox,
  boolean: checkbox,
  cnpjcpf: cnpjcpf,
  cep: cep,
  file: file,
  date: date,
  typeahead: typeahead,
  form: form
}
