import {html} from '../dependencies.js'

export default (el, {text} = {}) => ({
  change,
  ...schema
}) => {
  const t = !text ? null : html(({div}) => div({
    class: 'form-text'
  }, schema.default))
  const f = html(({div}) => div({
    class: 'invalid-feedback'
  }))
  var e = null
  const update = (value, validation) => {
    var err = change(value)
    err = validation ? validation(value, err) : err

    if (e) {
      e.classList.remove(`is-${err ? '' : 'in'}valid`)
      e.classList.add(`is-${err ? 'in' : ''}valid`)
    }
    if (t) {
      t.textContent = value
    }
    if (f) {
      f.textContent = err
    }
  }
  e = el({
    ...schema,
    change: update
  })
  update(schema.default)

  return [e, t, f]
}
