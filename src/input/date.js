import {html} from '../../dependencies.js'
import control from '../control.js'
import wrap from '../wrap.js'

export default wrap(control(({
  title,
  description,
  change,
  type,
  minimum,
  maximum,
  ...schema
}) => html(({input}) => {
  const loader = value => isNaN(value) ? value :
    !parseInt(value) ? '' :
      new Date(value * 1000).toISOString().substr(0, 10)
  const parser = value => value ? parseInt(
      (new Date(value).getTime() / 1000).toFixed(0)
    ) : null

  if (type != "string") {
    minimum = loader(minimum)
    maximum = loader(maximum)
  }

  return input({
    class: 'form-control',
    type: 'date',
    name: title,
    placeholder: description,
    value: type == "string" ? schema.default : loader(schema.default),
    min: minimum,
    max: maximum,
    change: ev => change(
      type == "string" ? ev.target.value : parser(ev.target.value)
    ) 
  })
})))
