import {html} from '../dependencies.js'
import {control, interpolate} from '../lib.js'

export default control((schema, submitter, options) =>
  html(({select, option}) => {
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
        return msg
      }
    })

    const change = ev => {
      const v = ev.target.value
      const i = indexValue(v)
      submit(i == -1 ? v : Data[i].value)
    }
    const s = select({
      class: 'form-select',
      name: title 
    })
    var e = s.cloneNode()

    const setLabel = value =>
      label != null ? interpolate(label, value) :
      value === undefined ? '\u2304' :
      typeof value == 'string' ? value :
        JSON.stringify(value)

    const renderOptions = Result => {
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
      e.addEventListener('change', change)
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
            setLabel(R.value)
          Data.push(R) 
        })
      }

      const v = schema.default == null ? '' : schema.default
      const Options = Data.concat(indexValue(schema.default) != -1 ? [] : [
        {
          value: v,
          label:
            Result == null ? '\u231B' :
            description != null && v === '' ? description :
              setLabel(schema.default),
          disabled: true
        }
      ])

      e.disabled = Options.length <= 1
      if (schema.default != null) {
        submit(schema.default)
      }
      e.innerHTML = Options.map(({
        value,
        label,
        disabled
      }) => option({
        value: value,
        disabled: disabled,
      }, label).outerHTML).join('\n')
      e.value = v
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
