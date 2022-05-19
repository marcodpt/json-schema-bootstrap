import wrap from '../wrap.js'
import link from '../link.js'

export default wrap(({
  href,
  ...schema
}) => link({
  href, 
  title: schema.default ? new Date(
    typeof schema.default == "number" ? schema.default * 1000 : schema.default
  ).toLocaleDateString() : ''
}))
