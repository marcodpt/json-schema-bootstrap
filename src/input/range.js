import field from '../field.js'

export default field(({input}, {
  title,
  description,
  change,
  minimum,
  maximum,
  multipleOf,
  ...schema
}) => input({
  class: 'form-range validate',
  type: 'range',
  min: minimum,
  max: maximum,
  step: multipleOf,
  value: schema.default,
  change: ev => change(ev.target.parentNode, ev.target.value)
}))
