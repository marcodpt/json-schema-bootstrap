export default {
  date: value => {
    if (typeof value == "number") {
      value = !value ? '' : new Date(value * 1000).toISOString().substr(0, 10)
    }
    return !value ? value :
      new Date(value).toLocaleDateString()
  }
}
