import {html} from '../dependencies.js'
import {control} from '../index.js'

export default control(({
  title,
  description,
  submit,
  ...schema
}) => html(({input, span, div}) => div([
  div({
    class: 'input-group'
  }, [
    span({
      class: 'input-group-text'
    }),
    input({
      class: 'form-control form-control-color',
      type: 'color',
      name: title,
      placeholder: description,
      value: schema.default,
      change: ev => submit(ev.target.value)
    })
  ])
])), schema => html(({div}) => div({
  style: {
    backgroundColor: schema.default
  },
  class: 'w-100 h-100'
}, '\u200b')), {
  input: 'input',
  value: 'span'
})
