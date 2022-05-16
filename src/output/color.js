import {html} from '../../dependencies.js'
import field from '../field.js'

export default field(schema => html(({div}) => div({
  style: {
    backgroundColor: schema.default
  },
  class: 'w-100 h-100'
})))
