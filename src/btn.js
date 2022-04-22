import {element} from '../dependencies.js'

export default element(({button, a}, {
  bg = 'primary',
  size = '',
  outline = false,
  ...props
} = {}, children) => (typeof props.href == "string" ? a : button)({
  ...props,
  class: [
    'btn',
    'btn-'+(outline ? 'outline-' : '')+bg,
    size ? 'btn-'+size : '',
    !props.click &&
    !props.onclick &&
    !props.href &&
    props.type != "reset" &&
    props.type != "submit" ? 'disabled' : ''
  ]
}, children))
