const change = ev => window.alert(ev.target.value)

export default {
  title: 'Typeahead',
  gh: 'https://github.com/marcodpt/bootstrap-elements',
  element: ({select, option}, {
    options,
    value,
    noOpt,
    size,
    ...props
  } = {}) => {
    const isObj = o => o && typeof o == 'object'

    options = options instanceof Array ? options : []
    var index = -1
    options.forEach((o, i) => {
      if (index == -1 && (
        (isObj(o) && o.value == value) || o == value
      )) {
        index = i
      }
    })

    if (index == -1) {
      index = options.length
      options.push({
        disabled: true,
        value: value,
        label: noOpt == null ? value : noOpt
      })
    }

    return select({
      ...props,
      class: [
        'form-select',
        size ? 'form-select-'+size : ''
      ],
      disabled: options.length <= 1
    }, options.map((o, i) => option({
      disabled: isObj(o) && o.disabled,
      selected: i == index,
      value: isObj(o) ? o.value : o
    }, isObj(o) ? o.label : o)))
  },
  samples: {
    default: {
      attributes: {
        change: change
      }
    },
    disabled: {
      attributes: {
        change: change,
        options: ['cat'],
        value: 'cat'
      }
    },
    simple: {
      attributes: {
        change: change,
        options: ['dog', 'cat', 'bird']
      }
    },
    large: {
      attributes: {
        change: change,
        size: 'lg',
        options: ['dog', 'cat', 'bird']
      }
    },
    small: {
      attributes: {
        change: change,
        size: 'sm',
        options: ['dog', 'cat', 'bird']
      }
    },
    simpleValue: {
      attributes: {
        change: change,
        options: [
          {value: 1, label: 'dog'},
          {value: 2, label: 'cat'},
          {value: 3, label: 'bird'}
        ]
      }
    },
    noOpt: {
      attributes: {
        change: change,
        options: ['dog', 'cat', 'bird'],
        noOpt: 'Choose your favorite pet...'
      }
    },
    noOptValue: {
      attributes: {
        change: change,
        options: [
          {value: 1, label: 'dog'},
          {value: 2, label: 'cat'},
          {value: 3, label: 'bird'}
        ],
        noOpt: 'Choose your favorite pet...'
      }
    },
    withDefault: {
      attributes: {
        change: change,
        options: ['dog', 'cat', 'bird'],
        value: 'cat',
        noOpt: 'Choose your favorite pet...'
      }
    },
    withDefaultValue: {
      attributes: {
        change: change,
        options: [
          {value: 1, label: 'dog'},
          {value: 2, label: 'cat'},
          {value: 3, label: 'bird'}
        ],
        value: 2,
        noOpt: 'Choose your favorite pet...'
      }
    },
    multiple: {
      attributes: {
        change: change,
        options: ['dog', 'cat', 'bird'],
        value: 'cat',
        noOpt: 'Choose your favorite pet...',
        multiple: true
      }
    },
    multipleValue: {
      attributes: {
        change: change,
        options: [
          {value: 1, label: 'dog'},
          {value: 2, label: 'cat'},
          {value: 3, label: 'bird'}
        ],
        value: 2,
        noOpt: 'Choose your favorite pet...',
        multiple: true
      }
    }
  }
}
