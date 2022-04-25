import {element} from '../dependencies.js'

const update = change => (e, value) => {
  const error = change(value)

  const ctrl = e.querySelector('.form-control,.form-check-input')

  ctrl.classList.remove('is-'+(error ? '' : 'in')+'valid')
  ctrl.classList.add('is-'+(error ? 'in' : '')+'valid')

  const feedback = e.querySelector('.invalid-feedback')
  feedback.textContent = error
  feedback.classList[error ? 'remove' : 'add']('d-none')
}

const getInput = schema => ({
  ...schema,
  change: (el, value) => update(schema.change)(el.closest('div'), value)
})

const field = element(({div, label, input}, {
  type,
  title,
  description,
  change,
  ...schema
}, children) => {
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
      children,
      div({
        class: 'invalid-feedback'
      })
    ])
  ])

  if (schema.default != null) {
    update(change)(e, schema.default)
  }

  return e
})

export default el => schema => field(schema, element(el)(getInput(schema)))
