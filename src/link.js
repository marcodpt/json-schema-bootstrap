import {html} from '../dependencies.js'

export default ({
  title,
  description,
  href,
  icon,
  btn
}) => html(({a, i}) => a({
  class: btn ? 'btn btn-'+btn : null,
  href: href,
  title: description
}, [
  !icon ? null : i({class: icon}),
  icon && title ? ' ' : '',
  title,
  !icon && !title && href ? '_' : ''
]))
