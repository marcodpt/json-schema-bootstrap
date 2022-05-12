import {html} from '../dependencies.js'

export default ({type, description}) => !description ? null : html(({
  div
}) => div({
  class: [
    'alert',
    'alert-'+(type == "null" ? "danger" : (
      type == "object" ? "info" : "success"
    ))
  ],
  style: {
    whiteSpace: 'pre-wrap'
  },
  role: 'alert'
}, description))
