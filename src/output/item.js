import alert from '../alert.js'
import {html} from '../../dependencies.js'

export default ({
  title,
  description,
  builder,
  ...schema
}) => html(({fieldset, legend}) => {
  const {children} = builder()

  return fieldset([
    !title ? null : legend({
      title: description
    }, title),
    children
  ])
})
