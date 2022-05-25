import {html} from '../dependencies.js'
import {control} from '../index.js'

export default control(({
  title,
  description,
  submit,
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
    change: ev => submit(
      type == "string" ? ev.target.value : parser(ev.target.value)
    ) 
  })
}))
