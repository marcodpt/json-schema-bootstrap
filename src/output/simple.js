import wrap from '../wrap.js'
import link from '../link.js'

export default wrap(({
  href,
  ...schema
}) => link({
  href,
  title: schema.default
}))
