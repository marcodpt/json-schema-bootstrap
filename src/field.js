import {html} from '../dependencies.js'
import feedback from './feedback.js'

export default children => schema => {
  var f = feedback(schema.change)
  const field = ({
    type,
    title,
    description,
    change,
    readOnly,
    ...schema
  }, children) => html(({div, label}) => {
    const e = div({
      class: ['row', 'my-3']
    }, [
      !title ? null : div({
        class: 'col-md-3'
      }, [
        label({
          class: 'form-label',
          title: description
        }, title)
      ]),
      div({
        class: [
          'col-md-'+(title ? 9 : 12)
        ]
      }, [
        children,
        readOnly ? null : div({
          class: 'invalid-feedback'
        })
      ])
    ])

    if (schema.default != null) {
      f(e, schema.default)
    }

    return e
  })

  return field(schema, children(schema.readOnly ? schema : {
    ...schema,
    change: f
  }))
}
