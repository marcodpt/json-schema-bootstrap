import wrap from '../wrap.js'
import href from '../href.js'

export default wrap(schema => href(schema, schema => schema.default ? new Date(
  typeof schema.default == "number" ? schema.default * 1000 : schema.default
).toLocaleDateString() : ''))
