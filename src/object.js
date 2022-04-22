import alert from './alert.js'
import field from './field.js'

export default (Tags, {
  title,
  description,
  ...schema
}, children) => {
  const {fieldset, legend} = Tags

  return fieldset([
    !title ? null : legend(title),
    children,
    !description ? null : alert({
      type: "object",
      description: description
    })
  ])
}
