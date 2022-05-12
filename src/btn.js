import {html} from '../dependencies.js'

export default ({
  bg = 'primary',
  size = '',
  outline = false,
  ...props
} = {}, children) => html(({button, a}) =>
  (typeof props.href == "string" ? a : button)({
    ...props,
    class: [
      'btn',
      'btn-'+(outline ? 'outline-' : '')+bg,
      size ? 'btn-'+size : '',
        !props.click &&
        !props.onclick &&
        !props.href &&
        props.type != "reset" &&
        props.type != "submit" ?
      'disabled' : ''
    ].concat(props.class)
  }, children)
)
