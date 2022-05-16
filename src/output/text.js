import {html} from '../../dependencies.js'
import field from '../field.js'

export default field(schema => html(({div}) => div({
  style: {
    whiteSpace: 'pre-wrap'
  }
}, schema.default)))
