import field from '../field.js'
import link from '../link.js'

export default field(({
  href,
  ...schema
}) => link({
  href,
  title: schema.default.toLocaleString()
}))
