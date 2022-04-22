import {element} from '../../dependencies.js'

export default element(({textarea}, {
  change,
  ...schema
}) => {
  const e = textarea()
})

export default {
  title: 'TextArea',
  gh: 'https://github.com/marcodpt/bootstrap-elements',
  element: ({textarea}, schema) => textarea({
    class: 'form-control',
    name: schema.title,
    placeholder: schema.description,
    rows: (schema.ui || {}).rows,
    minlen: schema.minLength,
    maxlen: schema.maxLength,
    pattern: schema.pattern
  }, schema.default),
  samples: {
    empty: {
      attributes: {
        title: 'bio',
        description: 'Tell something about your self...',
        minLength: 1,
        maxLength: 255,
        pattern: '^.*$',
        default: '',
        ui: {
          rows: 6
        }
      }
    },
    edit: {
      attributes: {
        title: 'bio',
        description: 'Tell something about your self...',
        minLength: 1,
        maxLength: 255,
        pattern: '^.*$',
        default: 'Hello!\nI am very happy!',
        ui: {
          rows: 3
        }
      }
    }
  }
}
