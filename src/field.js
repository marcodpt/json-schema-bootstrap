export default ({div, label, input}, {
  title,
  description,
  change,
  ...schema
}) => {
  const error = change(schema.default)

  const update => (e, value) => {
    const error = change(value)

    const ctrl = e.querySelector('.form-control')

    ctrl.classList.remove('is-'+(error ? '' : 'in')+'valid')
    ctrl.classList.add('is-'+(error ? 'in' : '')+'valid')

    const feedback = e.querySelector('.invalid-feedback')
    e.textContent = error
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
      }, text(title))
    ]),
    div({
      class: 'col-md-'+(title ? 9 : 12)
    }, [
      input({
        class: 'form-control',
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
