import {html} from '../../dependencies.js'
import wrap from '../wrap.js'

export default wrap(schema => html(({div}) => div({
  style: {
    whiteSpace: 'pre-wrap'
  }
}, schema.default)))
