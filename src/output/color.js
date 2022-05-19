import {html} from '../../dependencies.js'
import wrap from '../wrap.js'

export default wrap(schema => html(({div}) => div({
  style: {
    backgroundColor: schema.default
  },
  class: 'w-100 h-100'
})))
