import {html} from './dependencies.js'

export default ({
  submit,
  ui = '',
  label = 'Submit',
  btn = 'primary',
  err = 'danger'
}) => {
  var pending = false

  const updateButton = (b, error) => {
    if (error) {
      b.classList.remove('btn-'+btn)
      b.classList.add('btn-'+err)
    } else {
      b.classList.remove('btn-'+err)
      b.classList.add('btn-'+btn)
    }

    if (typeof submit != 'function' || error || pending) {
      b.classList.add('disabled')
    } else {
      b.classList.remove('disabled')
    }

    const icon = b.querySelector('i.fas')
    if (icon) {
      if (error) {
        icon.classList.remove('fa-check')
        icon.classList.remove('fa-spinner')
        icon.classList.remove('fa-spin')
        icon.classList.add('fa-exclamation')
      } else if (!error && !pending) {
        icon.classList.remove('fa-exclamation')
        icon.classList.remove('fa-spinner')
        icon.classList.remove('fa-spin')
        icon.classList.add('fa-check')
      } else {
        icon.classList.remove('fa-exclamation')
        icon.classList.remove('fa-check')
        icon.classList.add('fa-spinner')
        icon.classList.add('fa-spin')
      }
    }
  }

  const b = html(({button, i}) => button({
    class: [
      'btn',
      ui
    ],
    type: 'button',
    blur: ev => {
      updateButton(ev.target.closest('button'), false)
    },
    click: ev => {
      const b = ev.target.closest('button')
      if (typeof submit == 'function') {
        pending = true
        updateButton(b, false)
        Promise.resolve()
          .then(() => submit(ev))
          .then(() => {
            pending = false
            updateButton(b, false)
          })
          .catch(err => {
            pending = false
            updateButton(b, true)
            console.log(err)
          })
      }
    }
  }, [
    i({
      class: 'fas fa-check'
    }),
    label ? ' '+label : null
  ]))

  updateButton(b, false)

  return b
}
