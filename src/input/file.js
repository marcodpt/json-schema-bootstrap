import field from '../field.js'

const reader = file => new Promise((resolve, reject) => {
  var reader = new FileReader()
  var type = file.type
  reader.onloadend = function () {
    if (reader.error) {
      reject(reader.error)
    } else {
      var data = reader.result
      if (type.substr(-1) == '*') {
        const m = 'base64,'
        var D = data.split(m)
        D.splice(0, 1)
        data = D.join(m)
      }
      resolve({
        data: data,
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
    reader.readAsFileURL(file)
  } else {
    reader.readAsText(file, 'UTF-8')
  }
})

export default field(({input}, {
  title,
  description,
  change,
  type,
  ...schema
}) => input({
  class: 'form-control validate',
  type: 'file',
  placeholder: !title ? description : null,
  multiple: type == "array",
  change: ev => {
    console.log(ev.target.files)
  } 
}))
