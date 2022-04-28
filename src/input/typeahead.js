import field from '../field.js'
import spinner from '../spinner.js'

const toStr = x => typeof x != "string" ?
  (x == null ? '' : JSON.stringify(x, undefined, 2)) : x

const getOptions = ({option, i}, options, value) => {
  if (!(options instanceof Array)) {
    return [
      option({
        value: "",
        disabled: true
      }, '\u231B')
    ]
  } else {
    var choose = false
    const O = options.map(o => {
      if (
        typeof o == "object" && o != null &&
        o.value != null && typeof o.label == "string"
      ) {
        if (toStr(value) == toStr(o.value)) {
          choose = true
        }
        return option({
          value: toStr(o.value)
        }, o.label)
      } else {
        if (toStr(value) == toStr(o)) {
          choose = true
        }
        return option(toStr(o))
      }
    })

    if (!choose) {
      O.push(option({
        value: toStr(value),
        disabled: true
      }, '\u2304'))
    }

    return O 
  }
}

const setOptions = (Tags, e, options, value, change) => {
  const {select} = Tags
  const l = options.length
  e.innerHTML = select(options).innerHTML
  e.disabled = l <= 1
  e.value = toStr(value)
  if (e.parentNode) {
    change(e.parentNode, toStr(value))
  }
}

export default field((Tags, schema) => {
  const {
    title,
    description,
    label,
    href,
    change,
    watch
  } = schema
  const {select} = Tags
  var options = null
  var oldData = null
  const e = select({
    class: 'form-select',
    change: ev => change(ev.target.parentNode, ev.target.value)
  })

  if (href != null) {
    options = getOptions(Tags, null, null)
    watch(href, data => {
      if (oldData !== data) {
        oldData = data
        var o = getOptions(
          Tags, data, data == null ? null : schema.default
        )
        setOptions(Tags, e, o, o == null ? null : schema.default, change)
      }
    })
  } else if (schema.enum != null) {
    options = getOptions(Tags, schema.enum, schema.default)
  } else {
    options = getOptions(Tags, [
      {
        value: schema.default,
        label: label != null ? label : toStr(schema.default)
      }
    ], schema.default)
  }

  setOptions(Tags, e, options, options == null ? null : schema.default, change)
  return e
})
