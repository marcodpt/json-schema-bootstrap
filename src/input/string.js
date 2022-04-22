export default element({input}, {
  description,
  change,
  ...schema
}) => input({
  class: 'form-control',
  type: 'text',
  placeholder: description,
  value: schema.default,
  keyup: change
})
