import wrap from '../wrap.js'
import href from '../href.js'

export default wrap(schema => href(schema, schema => schema.default.toLocaleString()))
