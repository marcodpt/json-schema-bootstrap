const toNumber = x => {
  if (typeof x == 'string') {
    if (x.indexOf('.') == -1) {
      x = parseInt(x)
    } else {
      x = parseFloat(x)
    }
  }

  return isNaN(x) || typeof x != 'number' ? 0 : x
}

const jsonp = uri => new Promise((resolve, reject) => {
  var id = '_' + Math.round(10000 * Math.random())
  var callbackName = 'jsonp_callback_' + id
  window[callbackName] = data => {
    delete window[callbackName]
    var ele = document.getElementById(id)
    ele.parentNode.removeChild(ele)
    resolve(data)
  }

  var src = uri+(uri.indexOf('?') !== -1 ? '&' : '?')+
      'callback='+callbackName
  var script = document.createElement('script')
  script.src = src
  script.id = id
  script.addEventListener('error', reject)
  document.body.appendChild(script)
})

const hasType = (types, type) => types instanceof Array ?
  types.indexOf(type) >= 0 : types === type

export {toNumber, jsonp, hasType}
