import {html} from '../dependencies.js'
import {control, interpolate} from '../lib.js'

export default control((schema, submitter, options) =>
  html(({div, input}) => {
    const {
      title,
      description,
      label,
      labels
    } = schema
    const {
      update, it
    } = options
    var Data = []
    var current = undefined
    var pending = false

    const indexValue = value => Data.reduce((i, item, j) =>
      i == -1 && item.value == value ? j : i
    , -1)

    const submit = data => submitter(data, (value, msg, {language}) => {
      if (msg) {
        return msg
      } else if (!pending && indexValue(value) == -1) {
        if (language == 'pt') {
          return 'Escolha uma das opções possíveis!'
        } else {
          return 'Choose one of the possible options!'
        }
      } else {
        current = value
        return msg
      }
    })

    const s = div([
      input({
        class: 'form-control',
        type: 'text',
        placeholder: description
      })
    ])
    var e = s.cloneNode()

    const renderOptions = Result => {
      const setLabel = (value, block) => {
        if (Result == null) {
          return '\u231B'
        } else if (label != null) {
          return interpolate(label, value)
        } else if (value === undefined) {
          return '\u2304'
        }
        const i = block ? -1 : indexValue(value)
        if (i < 0) {
          return typeof value == 'string' ? value : JSON.stringify(value)
        } else {
          return Data[i].label
        }
      }

      if (Result === true) {
        const x = it({
          ...schema,
          enum: undefined,
          href: undefined
        }, options)
        e.replaceWith(x)
        e = x
        return
      }

      const x = s.cloneNode(true)
      e.replaceWith(x)
      e = x

      Data.length = 0
      pending = Result == null
      if (Result instanceof Array) {
        Result.forEach((row, i) => {
          const R = {}
          R.value = row && typeof row == 'object' && row.value !== undefined ?
            row.value : row
          R.label =
            row && row.label != null ? row.label : 
            labels && labels[i] != null ? labels[i] :
            setLabel(R.value, true)
          Data.push(R) 
        })
      }

      const f = e.querySelector('input')
      f.value = setLabel(schema.default)
      f.addEventListener('focus', () => {
        f.value = ''
      })
      f.addEventListener('blur', () => {
        f.value = setLabel(current)
      })
      new Autocomplete(f, {
        data: Data,
        maximumItems: 0,
        threshold: 0,
        onSelectItem: ({value}) => {
          const i = indexValue(value)
          submit(i == -1 ? value : Data[i].value)
        }
      })
      f.disabled = Data.length <= 1
      if (schema.default != null) {
        submit(schema.default)
      }
    }

    renderOptions(
      schema.enum == null && schema.default !== undefined ?
        [schema.default] : schema.enum
    )
    if (update) {
      update(renderOptions)
    }

    return e
  })
)
