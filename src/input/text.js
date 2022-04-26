import field from '../field.js'

export default field(({textarea}, {
  title,
  description,
  change,
  ...schema
}) => textarea({
  class: 'form-control validate',
  rows: 6,
  placeholder: !title ? description : null,
  keyup: ev => change(ev.target.parentNode, ev.target.value) 
}, schema.default))
