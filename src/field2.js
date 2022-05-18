import {html} from '../dependencies.js'

export default ({
  schema,
  change
}) => children => {
  const {
    title,
    description,
    ...extra
  } = schema

  return html(({div, label}) => {
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
}
