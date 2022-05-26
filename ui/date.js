import {html} from '../dependencies.js'
import {control} from '../index.js'

const loader = value => isNaN(value) ? value :
  !parseInt(value) ? '' :
    new Date(value * 1000).toISOString().substr(0, 10)

const parser = value => value ? parseInt(
    (new Date(value).getTime() / 1000).toFixed(0)
  ) : 0

export default control(({
  title,
  description,
  submit,
  type,
  minimum,
  maximum,
  language,
  ...schema
}) => html(({input}) => {
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
    input: ev => submit(
      type == "string" ? ev.target.value || '' : parser(ev.target.value)
    ) 
  })
}), ({
  language,
  ...schema
}) => html(({span}) => {
  var text = ''
  if (language) {
    var text = loader(schema.default)
    if (text.length) {
      const day = text.substr(8, 2)
      const month = text.substr(5, 2)
      const year = text.substr(0, 4)
      if (language == 'en') {
        text = [
          month,
          day,
          year
        ].map(x => parseInt(x)).join('/')
      } else if (language == 'pt') {
        text = [
          day,
          month,
          year
        ].join('/')
      }
    }
  } else {
    text = schema.default ? new Date(
      !isNaN(schema.default) ? schema.default * 1000 : schema.default
    ).toLocaleDateString() : ''
  }
  return span(text)
}))
