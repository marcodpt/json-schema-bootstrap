import {html} from '../dependencies.js'

export default (el, {text} = {}) => ({
  change,
  valid,
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
      const x = e instanceof Array ? e[0] : e
      if (x) {
        if (err) {
          x.classList.remove(`is-valid`)
          x.classList.add(`is-invalid`)
        } else {
          x.classList.remove(`is-invalid`)
          if (valid) {
            x.classList.add(`is-valid`)
          }
        }
      }
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
