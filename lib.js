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

export {toNumber}
