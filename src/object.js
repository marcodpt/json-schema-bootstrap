import alert from './alert.js'
import field from './field.js'

export default (Tags, {
  title,
  description,
  change,
  ...schema
}, children) => {
  const {fieldset, legend} = Tags

  change(copy(schema['default'] || {}))

  return fieldset([
    !title ? null : legend(title),
    children,
    alert({
      type: "object",
      description: description
    })
  ])
}
