import {html} from '../../dependencies.js'
import wrap from '../wrap.js'

export default wrap(schema => html(({i}) =>
  typeof schema.default != "boolean" ? null : i({
    class: 'fas fa-'+(schema.default ? 'check' : 'times')
  })
))
