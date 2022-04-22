import {element} from '../../dependencies.js'

export default element(({input}, {
  change,
  ...schema
}) => {
  const e = input({
    class: 'form-check-input',
    type: 'checkbox',
    checked: schema.default ? true : false,
    change: ev => {
      ev.target.checked ? change(true) : change(false)
    }
  })
})
