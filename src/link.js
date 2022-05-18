import {html} from '../dependencies.js'

export default ({
  title,
  description,
  href,
  btn,
  fas,
  sm
}) => html(({a, i}) => a({
  class: [
    btn ? 'btn btn-'+btn : '',
    btn && sm ? 'btn-sm' : '',
    !href && btn ? 'disabled' : ''
  ],
  href: href,
  title: description
}, [
  !fas ? null : i({class: 'fas fa-'+fas}),
  fas && title ? ' ' : '',
  title,
  !fas && !title && href ? '_' : ''
]))
