import field from '../field.js'

export default field(({input}, {
  title,
  description,
  change,
  ...schema
}) => input({
  class: 'form-check-input',
  type: 'checkbox',
  checked: schema.default ? true : false,
  change: ev => {change(ev.target, ev.target.checked ? true : false)}
}))
