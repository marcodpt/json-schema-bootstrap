import {validator} from '../dependencies.js'
import lang from './lang/index.js'
import formatters from './formatters.js'

export default language => (schema, data) => {
  const l = lang[language] || lang.en
  const F = formatters[schema.format] || (value => value)
  var error = ''
  validator(schema, data, key => {
    error = l[key](F(schema[key]))
  })
  return error && schema.error ? schema.error : error
}
