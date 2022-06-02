import {html} from '../dependencies.js'
import {interpolate} from '../lib.js'

export default ({
  title,
  description,
  readOnly,
  properties,
  minItems,
  maxItems,
  links,
  items,
  ...schema
}, submit, {
  it,
  loader
}) => {
  if (submit && !readOnly) {
    const Data = schema.default instanceof Array ? schema.default : []
    const limitMin = n => minItems >= n || n == 0
    const limitMax = n => maxItems != null && maxItems <= n
    const setLimits = (e, n) => {
      const bp = e
        .querySelector('legend')
        .querySelector('i.fa-plus')
        .closest('button')

      if (limitMax(n)) {
        bp.classList.add('disabled')
      } else {
        bp.classList.remove('disabled')
      }

      const bm = e
        .querySelector('legend')
        .querySelector('i.fa-minus')
        .closest('button')

      if (limitMin(n)) {
        bm.classList.add('disabled')
      } else {
        bm.classList.remove('disabled')
      }
    }

    const add = e => {
      const n = Data.length
      if (!limitMax(n)) {
        Data.push(items.default)

        e.appendChild(html(({div}) => div({
          class: 'my-3'
        }, it(items, {
          resolve: data => {
            Data[n] = data
          }
        }))))
      }
      setLimits(e, n)
    }
    
    const el = html(({fieldset, legend, span, button}) => fieldset([
      legend([
        span({
          title: description
        }, title),
        button({
          class: [
            'ms-2',
            'btn',
            'btn-secondary'
          ],
          type: 'button',
          click: ev => {
            const e = ev.target.closest('fieldset')
            const n = Data.length
            if (!limitMin(n)) {
              e.removeChild(e.children[n])
              Data.pop()
            }
            setLimits(e, n)
          }
        }, i({
          class: 'fas fa-minus'
        })),
        button({
          type: 'button',
          class: [
            'ms-2',
            'btn',
            'btn-secondary'
          ],
          click: ev => add(ev.target.closest('fieldset'))
        }, i({
          class: 'fas fa-plus'
        }))
      ]) 
    ]))

    for (var i = 0; minItems && i < minItems; i++) {
      add(el)
    }

    return el
  } else {
    const el = html(({table, tbody, thead, tr, td, th, span, div}) => {
      const inline = X => !X || !X.length ? null : tr([
        th({
          class: 'text-center',
          colspan: '100%'
        }, [
          div({
            class: 'row gx-1 justify-content-center'
          }, X.map(x => div({
            class: 'col-auto'
          }, x)))
        ])
      ])

      const Prel = [
        'first',
        'prev',
        'index',
        'alternate',
        'next',
        'last'
      ]
      const Arel = [
        'search'
      ]
      const Mrel = Prel.concat(Arel)
      const L = links || []
      return table({
        class: [
          "table",
          "table-striped",
          "table-bordered",
          "table-hover",
          "table-center"
        ]
      }, [
        thead([
          !title ? null : tr([
            th({
              class: 'text-center',
              colspan: '100%'
            }, [
              span({
                title: description
              }, title)
            ])
          ]),
          inline(L.filter(l => Mrel.indexOf(l.rel) == -1).map(m => link(m))),
          inline(L
            .filter(l => Prel.indexOf(l.rel) != -1)
            .reduce((X, l) => {
              const i = Prel.indexOf(l.rel)
              if (l.rel == 'index' || l.rel == 'alternate') {
                if (X[i] == null) {
                  X[i] = []
                }
                X[i].push(l)
              } else {
                X[i] = l
              }
              return X
            }, Prel.map(() => null))
            .filter(l => l != null)
            .map(p => p instanceof Array ? iterator(p.reduce((S, l) => {
              S.enum.push(l.href)
              S.labels.push(l.title)
              return S
            }, {
              enum: [],
              labels: [],
              change: (parent, value) => {
                if (value) {
                  location.href = value
                }
              },
              default: '',
              format: 'typeahead',
              type: 'string'
            })) : link(p))
          ),
          inline(L.filter(l => Arel.indexOf(l.rel) != -1).map(m => link(m))),
          items.default == null ? null : tr([
            (items.links || []).map(() => td()),
            Object.keys(items.properties || {}).map(key =>
              td({
                class: 'text-center align-middle'
              }, items.default[key])
            )
          ]),
          tr([
            (items.links || []).map(l => th({
              class: 'text-center align-middle'
            }, [
              link({
                ...l,
                href: l.batch,
                btn: l.batch ? l.btn : '',
                title: l.fas ? '' : l.title,
                sm: true
              })
            ])),
            Object.keys(items.properties || {}).map(key => {
              const {
                title,
                description
              } = items.properties[key]

              return th({
                class: 'text-center align-middle'
              }, [
                span({
                  title: description
                }, title)
              ])
            })
          ])
        ]),
        tbody([
          schema.default ? null : tr([
            td({
              class: [
                'align-middle',
                'text-center',
                'p-5'
              ],
              colspan: '100%'
            }, [
              div({
                class: 'spinner-border',
                style: {
                  width: '5rem',
                  height: '5rem'
                }
              })
            ])
          ]),
          (schema.default || []).map(row => tr([
            (items.links || []).map(l => td({
              class: 'text-center align-middle'
            }, [
              link({
                ...l,
                href: interpolate(l.href, row),
                title: l.fas ? '' : l.title,
                sm: true
              })
            ])),
            Object.keys(items.properties || {}).map(key => td({
              class: 'text-center align-middle'
            }, it({
              ...items.properties[key],
              default: row[key],
              readOnly: true
            })))
          ]))
        ])
      ])
    })
  }
}
