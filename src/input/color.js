import {html} from '../../dependencies.js'
import field from '../field.js'

export default field(({
  title,
  description,
  change,
  ...schema
}) => html(({input, div}) => [
  input({
    class: 'form-control form-control-color',
    type: 'color',
    placeholder: !title ? description : null,
    value: schema.default,
    change: ev => {
      const p = ev.target.parentNode
      change(p, ev.target.value)
      p.querySelector('.form-text').textContent = ev.target.value
    }
  }),
  input({
    class: 'validate',
    type: 'hidden'
  }),
  div({
    class: 'form-text'
  }, schema.default)
]))
