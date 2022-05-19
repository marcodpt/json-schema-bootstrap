import alert from '../alert.js'
import wrapper from '../wrapper.js'
import {html} from '../../dependencies.js'

export default ({
  title,
  description,
  builder,
  ...schema
}) => html(({fieldset, legend}) => {
  const {children} = builder(wrapper)

  return fieldset([
    !title ? null : legend({
      title: description
    }, title),
    children
  ])
})
