export default ({div, label, input}, {
  type,
  title,
  description,
  change,
  ...schema
}) => {
  const update = (e, value) => {
    const error = change(value)

    const ctrl = e.querySelector('.form-control')

    ctrl.classList.remove('is-'+(error ? '' : 'in')+'valid')
    ctrl.classList.add('is-'+(error ? 'in' : '')+'valid')

    const feedback = e.querySelector('.invalid-feedback')
    feedback.textContent = error
    feedback.classList[error ? 'remove' : 'add']('d-none')
  }

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
      class: 'col-md-'+(title ? 9 : 12)
    }, [
      input({
        class: 'form-control',
        type: type == "number" || type == "integer" ? "number" : "text",
        value: schema.default,
        keyup: ev => {
          update(ev.target.closest('div'), ev.target.value)
        }
      }),
      div({
        class: 'invalid-feedback'
      })
    ])
  ])

  if (schema.default != null) {
    update(e, schema.default)
  }

  return e
}
