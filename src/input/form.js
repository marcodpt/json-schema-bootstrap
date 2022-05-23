import wrapper from '../wrapper.js'
import {html} from '../../dependencies.js'

export default ({
  title,
  description,
  builder,
  ...schema
}) => html(({fieldset, legend, div}) => {
  const {children} = builder(wrapper)

  return fieldset([
    !title ? null : legend(title),
    children,
    !description ? null : div({
      class: [
        'alert',
        'alert-info'
      ],
      style: {
        whiteSpace: 'pre-wrap'
      },
      role: 'alert'
    }, description)
  ])
})
