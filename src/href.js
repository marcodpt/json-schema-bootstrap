import {html} from '../dependencies.js'

export default ({
  href,
  ...schema
}, children) => {
  if (href != null) {
    return html(({a}) => a({
      href: href
    }, children(schema) || '_'))
  } else {
    return children(schema)
  }
}
