import field from '../field.js'

export default field(({input, div}, {
  title,
  description,
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
      const p = ev.target.parentNode
      change(p, ev.target.value)
      p.querySelector('.form-text').textContent = ev.target.value
    }
  }),
  div({
    class: 'form-text'
  }, schema.default)
])
