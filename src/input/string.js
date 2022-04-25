import field from '../field.js'

export default field(({input}, {
  title,
  description,
  change,
  ...schema
}) => input({
  class: 'form-control',
  type: 'text',
  placeholder: !title ? description : null,
  value: schema.default,
  keyup: ev => {change(ev.target, ev.target.value)}
}))
