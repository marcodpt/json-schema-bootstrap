import field from '../field.js'

export default field(({input}, {
  title,
  description,
  type,
  change,
  minimum,
  maximum,
  multipleOf,
  ...schema
}) => input({
  class: 'form-control validate',
  type: 'number',
  placeholder: !title ? description : null,
  min: minimum,
  max: maximum,
  step: multipleOf,
  value: schema.default,
  change: ev => change(ev.target.parentNode, ev.target.value),
  keyup: ev => change(ev.target.parentNode, ev.target.value)
}))
