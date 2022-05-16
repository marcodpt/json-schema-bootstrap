import {html} from '../../dependencies.js'
import field from '../field.js'

export default field(schema => html(({i}) =>
  typeof schema.default != "boolean" ? null : i({
    class: 'fas fa-'+(schema.default ? 'check' : 'times')
  })
))
