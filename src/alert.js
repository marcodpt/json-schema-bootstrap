import {html} from '../dependencies.js'

export default ({
  type
}, children) => html(({div}) => div({
  class: [
    'alert',
    'alert-'+(type || 'info')
  ],
  style: {
    whiteSpace: 'pre-wrap'
  },
  role: 'alert'
}, children))
