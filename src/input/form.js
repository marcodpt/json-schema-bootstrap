import {element} from '../../dependencies.js'
import alert from '../alert.js'

export default element(({fieldset, legend}, {
  title,
  description,
  builder,
  ...schema
}) => {
  const {children} = builder()

  return fieldset([
    !title ? null : legend(title),
    children,
    !description ? null : alert({
      type: "object",
      description: description
    })
  ])
})
