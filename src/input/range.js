import field from '../field.js'

export default field(({input, div}, {
  title,
  description,
  type,
  change,
  minimum,
  maximum,
  multipleOf,
  ...schema
}) => [
  input({
    class: 'form-range validate',
    type: 'range',
    min: minimum,
    max: maximum,
    step: multipleOf,
    value: schema.default,
    change: ev => {
      const e = ev.target
      change(e.parentNode, e.value)
      e.parentNode.querySelector('.form-text').textContent = e.value
    }
  }),
  div({
    class: 'form-text'
  }, schema.default)
])
