import {html} from './dependencies.js'
import submitter from './submitter.js'
import {elRemove} from './lib.js'

export default ({
  title,
  submit,
  close = 'Close',
  label = 'Submit',
  size = 'md',
  backdrop = true,
  keyboard = true,
  focus = true
}, children) => {
  var M = null

  const el = html(({div, h5, button, i}) => div({
    class: 'modal fade'
  }, [
    div({
      class: [
        'modal-dialog',
        'modal-'+size
      ]
    }, [
      div({
        class: 'modal-content'
      }, [
        div({
          class: 'modal-header'
        }, [
          !title ? null : h5({
            class: 'modal-title'
          }, title),
          button({
            class: 'btn-close',
            dataBsDismiss: 'modal'
          })
        ]),
        !children ? null : div({
          class: 'modal-body'
        }, children),
        div({
          class: 'modal-footer'
        }, [
          button({
            type: 'button',
            class: 'btn btn-secondary',
            dataBsDismiss: 'modal'
          }, [
            i({
              class: 'fas fa-times'
            }),
            close ? ' '+close : null
          ]),
          !submit ? null : submitter({
            submit: () => Promise.resolve()
              .then(submit())
              .then(() => M.hide()),
            label
          })
        ])
      ])
    ])
  ]))

  el.addEventListener('hidden.bs.modal', () => elRemove(el))

  document.body.appendChild(el)

  M = new bootstrap.Modal(el, {
    backdrop,
    keyboard,
    focus
  })

  M.show()
}
