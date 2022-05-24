import {html} from '../dependencies.js'

export default ({
  title,
  description,
  ui 
}) => html(({div, h4}) => div({
  class: [
    'alert',
    'alert-'+ui
  ],
  style: {
    whiteSpace: 'pre-wrap'
  },
  role: 'alert'
}, [
  !title ? null : h4({
    class: 'alert-heading'
  }, title),
  description
]))
