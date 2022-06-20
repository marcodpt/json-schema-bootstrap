import {html} from '../dependencies.js'
import data from './data.js'
import alert from './alert.js'

export default (schema, submit, {it}) => {
  if (!submit) {
    return data(schema)
  }
  const Data = schema.default instanceof Array ? schema.default : []
  const msg = submit(Data)
  const x = alert({
    ui: 'danger',
    description: msg
  })
  if (msg) {
    x.classList.remove('d-none')
  } else {
    x.classList.add('d-none')
  }

  return html(({div, label, input}) => div({
    class: 'my-1'
  }, [
    schema.items.enum.map((item, j) => {
      const I = schema.items
      return div({
        class: [
          'form-check',
          schema.format == 'switch' ? 'form-switch' : ''
        ]
      }, [
        input({
          class: 'form-check-input',
          type: 'checkbox',
          checked: Data.indexOf(item) != -1,
          click: ev => {
            const i = Data.indexOf(item)
            if (i == -1) {
              Data.push(item)
            } else {
              Data.splice(i, 1)
            }
            const msg = submit(Data)
            const x = ev.target.closest('div.my-1').querySelector('.alert')
            x.textContent = msg
            if (msg) {
              x.classList.remove('d-none')
            } else {
              x.classList.add('d-none')
            }
          }
        }),
        label({
          class: 'form-check-label'
        }, I.labels && I.labels[j] != null ? I.labels[j] : item)
      ])
    }),
    x
  ]))
}
