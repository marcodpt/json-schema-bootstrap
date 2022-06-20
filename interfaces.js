import card from './ui/card.js'
import alert from './ui/alert.js'
import data from './ui/data.js'
import string from './ui/string.js'
import password from './ui/password.js'
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
import table from './ui/table.js'
import multiple from './ui/multiple.js'

export default {
  /*default interfaces with type*/
  null: card,
  boolean: checkbox,
  integer: number,
  number: number,
  string: string,
  object: form,
  array: table,

  /*default interface with enum*/
  select: typeahead,

  /*ui defined interfaces*/
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
  password: password,
  text: text,
  color: color,
  range: range,
  checkbox: checkbox,
  switch: checkbox,
  cnpjcpf: cnpjcpf,
  cep: cep,
  file: file,
  date: date,
  typeahead: typeahead,
  form: form,
  table: table,
  multiple: multiple
}
