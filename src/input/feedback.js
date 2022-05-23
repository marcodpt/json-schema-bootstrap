import alert from '../alert.js'
import {html} from '../../dependencies.js'

export default ({
  title,
  description,
  format,
  ...schema
}) => html(({h4}) => alert({
  type: format
}, [
  !title ? null : h4({
    class: 'alert-heading'
  }, title),
  description
]))
