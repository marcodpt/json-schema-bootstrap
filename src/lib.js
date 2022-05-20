const copy = X => X !== undefined ? JSON.parse(JSON.stringify(X)) : X

const getType = type => type == null ? 'null' :
  type instanceof Array ? type[0] : type

const parser = (type, value) => {
  type = getType(type)

  if (type == "number" || type == "integer") {
    value = type == "number" ? parseFloat(value) : parseInt(value)
    if (isNaN(value)) {
      value = null
    }
  }
  if (value === undefined) {
    if (type == "array") {
      value = []
    } else if (type == "object") {
      value = {}
    }
  }

  return value
} 

const interpolate = (str, X) => {
  if (X && typeof X == 'object' && !(X instanceof Array)) {
    return str.replace(/{([^{}]*)}/g, (a, b) => {
      var r = X[b]
      return typeof r === 'string' || typeof r === 'number' ? r : a
    })
  } else {
    return str.replace(/{}/g, () =>
      X instanceof Array ? X.join(',') :
      X == null ? '' :
      X
    )
  }
}

const jsonp = uri => {
  return new Promise((resolve, reject) => {
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
}

export {copy, getType, parser, interpolate, jsonp}
