import {element} from '../../dependencies.js'
import feedback from '../feedback.js'

export default element(({div, input, label}, {
  title,
  description,
  format,
  change,
  ...schema
}) => {
  const f = feedback(change)
  const e = div({
    class: [
      'my-3',
      'form-check',
      format == 'toggle' ? 'form-switch' : ''
    ]
  }, [
    input({
      class: 'form-check-input validate',
      type: 'checkbox',
      checked: schema.default ? true : false,
      click: ev => f(ev.target.parentNode, ev.target.checked ? true : false)
    }),
    label({
      class: 'form-check-label',
      title: description
    }, title),
    div({
      class: 'invalid-feedback'
    })
  ])
  if (schema.default != null) {
    f(e, schema.default)
  }
  return e
})
