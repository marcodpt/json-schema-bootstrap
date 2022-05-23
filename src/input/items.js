import {html} from '../../dependencies.js'

export default ({
  minItems, maxItems, title, description, builder
}) => html(({
  fieldset, legend, span, i, div, button
}) => {
  const {children, add, remove} = builder(children => schema => html(({
    div
  }) => div({
    class: 'my-3'
  }, children(schema))))
  const limitMin = n => minItems >= n || n == 0
  const limitMax = n => maxItems != null && maxItems <= n
  const setLimits = (f, n) => {
    const bp = f
      .querySelector('legend')
      .querySelector('i.fa-plus')
      .closest('button')

    if (limitMax(n)) {
      bp.classList.add('disabled')
    } else {
      bp.classList.remove('disabled')
    }

    const bm = f
      .querySelector('legend')
      .querySelector('i.fa-minus')
      .closest('button')

    if (limitMin(n)) {
      bm.classList.add('disabled')
    } else {
      bm.classList.remove('disabled')
    }
  }

  return fieldset([
    legend([
      span({
        title: description
      }, title),
      button({
        class: [
          'ms-2',
          'btn',
          'btn-secondary',
          limitMin(children.length) ? 'disabled' : ''
        ],
        type: 'button',
        click: ev => {
          const f = ev.target.closest('fieldset')
          var n = f.children.length - 1 

          if (!limitMin(n)) {
            f.removeChild(f.children[n])
            remove()
            n = n - 1
          }
          setLimits(f, n)
        }
      }, i({
        class: 'fas fa-minus'
      })),
      button({
        type: 'button',
        class: [
          'ms-2',
          'btn',
          'btn-secondary',
          limitMax(children.length) ? 'disabled' : ''
        ],
        click: ev => {
          const f = ev.target.closest('fieldset')
          var n = f.children.length - 1 

          if (!limitMax(n)) {
            f.appendChild(add())
            n = n + 1
          }
          setLimits(f, n)
        }
      }, i({
        class: 'fas fa-plus'
      }))
    ]),
    children 
  ])
})
