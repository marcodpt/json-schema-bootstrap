import {html} from '../dependencies.js'

export default schema => html(({span}) => {
  if (typeof schema.default == 'boolean') {
    return span(schema.default ? '\u2611' : '\u2612')
  } else if (typeof schema.default == 'number') {
    return span(schema.default.toLocaleString())
  } else if (typeof schema.default == 'string') {
    return span({
      style: {
        whiteSpace: schema.default.indexOf('\n') != -1 ? 'pre-wrap' : null
      }
    }, schema.default)
  } else if (typeof schema.default == 'object') {
    return span({
      style: {
        whiteSpace: 'pre-wrap'
      }
    }, JSON.stringify(schema.default, undefined, 2))
  }
})
