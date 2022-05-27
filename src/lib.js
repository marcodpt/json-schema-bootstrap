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

export {getType, parser, interpolate}
