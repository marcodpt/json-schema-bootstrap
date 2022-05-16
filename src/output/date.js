import field from '../field.js'
import link from '../link.js'

export default field(({
  href,
  ...schema
}) => link({
  href, 
  title: schema.default ? new Date(
    typeof schema.default == "number" ? schema.default * 1000 : schema.default
  ).toLocaleDateString() : ''
}))
