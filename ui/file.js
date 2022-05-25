import {html} from '../dependencies.js'
import {control} from '../index.js'
import {hasType} from '../lib.js'

const reader = file => new Promise((resolve, reject) => {
  var reader = new FileReader()
  var type = file.type
  reader.onloadend = function () {
    if (reader.error) {
      reject(reader.error)
    } else {
      const data = reader.result
      resolve({
        data: type.substr(-1) == '*' ? btoa(data) : data,
        mime: type,
        name: file.name
      })
    }
  }
  var M = file.type.split('/')
  if (([
    'audio',
    'video',
    'image'
  ]).indexOf(M[0]) != -1) {
    type += '*'
    reader.readAsBinaryString(file)
  } else {
    reader.readAsText(file, 'UTF-8')
  }
})

export default control(({
  title,
  description,
  submit,
  type,
  ...schema
}) => html(({input}) => input({
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
