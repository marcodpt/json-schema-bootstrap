import field from '../field.js'

export default field(({input}, {
  title,
  description,
  change,
  type,
  minimum,
  maximum,
  ...schema
}) => {
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
    class: 'form-control validate',
    type: 'date',
    placeholder: !title ? description : null,
    value: type == "string" ? schema.default : loader(schema.default),
    min: minimum,
    max: maximum,
    change: ev => change(
      ev.target.parentNode,
      type == "string" ? ev.target.value : parser(ev.target.value)
    ) 
  })
})
