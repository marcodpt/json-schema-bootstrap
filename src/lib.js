const copy = X => X !== undefined ? JSON.parse(JSON.stringify(X)) : X

const parser = (type, value) => {
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
  return str.replace(/{([^{}]*)}/g, (a, b) => {
    var r = X[b]
    return typeof r === 'string' || typeof r === 'number' ? r : a
  })
}

export {copy, parser, interpolate}
