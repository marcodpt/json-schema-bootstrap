import field from '../field.js'

export default field(({input}, {
  title,
  description,
  change,
  ...schema
}) => input({
  class: 'form-control',
  type: 'number',
  placeholder: !title ? description : null,
  min: schema.minimum,
  max: schema.maximum,
  step: schema.multipleOf,
  value: schema.default,
  change: ev => {change(ev.target, ev.target.value)},
  keyup: ev => {change(ev.target, ev.target.value)}
}))
