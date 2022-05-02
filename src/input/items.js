import {element} from '../../dependencies.js'
import btn from '../btn.js'

const addItem = ({div, span}, {
  title,
  description
}, children) => div({
  class: 'card my-3'
}, [
  div({
    class: 'card-body'
  }, children)
]).cloneNode(true)

export default element((Tags, schema, children) => {
  const {fieldset, legend, span, i} = Tags
  const {minItems, maxItems, title, description} = schema
  const items = []
  const newItem = () => addItem(Tags, schema, children)
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

  for (var item = 0; minItems && item < minItems; item++) {
    items.push(newItem())
  }

  return fieldset([
    legend([
      span({
        title: description
      }, title),
      btn({
        bg: 'secondary',
        class: [
          'ms-2',
          limitMin(items.length) ? 'disabled' : ''
        ],
        type: 'button',
        click: ev => {
          const f = ev.target.closest('fieldset')
          var n = f.children.length - 1 

          if (!limitMin(n)) {
            f.removeChild(f.children[n])
            n = n - 1
          }
          setLimits(f, n)
        }
      }, i({
        class: 'fas fa-minus'
      })),
      btn({
        bg: 'secondary',
        type: 'button',
        class: [
          'ms-2',
          limitMax(items.length) ? 'disabled' : ''
        ],
        click: ev => {
          const f = ev.target.closest('fieldset')
          var n = f.children.length - 1 

          if (!limitMax(n)) {
            f.appendChild(newItem())
            n = n + 1
          }
          setLimits(f, n)
        }
      }, i({
        class: 'fas fa-plus'
      }))
    ]),
    items
  ])
})
