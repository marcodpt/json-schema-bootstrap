import {html} from '../dependencies.js'
import {hasType, control, reader} from '../lib.js'

export default control(({
  title,
  description,
  type,
  ...schema
}, submit) => html(({input}) => input({
  class: 'form-control',
  type: 'file',
  name: title,
  placeholder: description,
  multiple: hasType(type, "array"),
  change: ev => {
    const F = ev.target.files
    const P = []
    for (var i = 0; i < F.length; i++) {
      P.push(reader(F[i]))
    }
    Promise.all(P).then(files => {
      submit(
        hasType(type, "object") && files.length == 1 ? files[0] :
        !hasType(type, "array") ? null : files
      )
    }).catch(err => {
      console.log(err)
      submit(hasType(type, "array") && !hasType(type, "null") ? [] : null)
    })
  } 
})))
