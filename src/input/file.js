import {html} from '../../dependencies.js'
import control from '../control.js'
import wrap from '../wrap.js'

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

export default wrap(control(({
  title,
  description,
  change,
  type,
  ...schema
}) => html(({input}) => input({
  class: 'form-control',
  type: 'file',
  name: title,
  placeholder: description,
  multiple: type == "array",
  change: ev => {
    const F = ev.target.files
    const P = []
    for (var i = 0; i < F.length; i++) {
      P.push(reader(F[i]))
    }
    Promise.all(P).then(files => {
      change(type == "array" ? files : files[0])
    }).catch(err => {
      console.log(err)
      change(null)
    })
  } 
}))))
