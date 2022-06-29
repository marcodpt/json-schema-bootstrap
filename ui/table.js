import {html} from '../dependencies.js'
import {interpolate} from '../lib.js'
import linker from '../link.js'

export default ({
  title,
  description,
  properties,
  minItems,
  maxItems,
  links,
  items,
  ...schema
}, submit, {
  it,
  loader,
  translations,
  watch
}) => {
  const link = linker(it, translations)

  if (submit) {
    const Data = schema.default instanceof Array ? schema.default : []
    const limitMin = n => (minItems != null && minItems >= n) || n == 0
    const limitMax = n => maxItems != null && maxItems <= n
    const setLimits = (e, n) => {
      console.log('setLimits: '+n)
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

      submit(Data)
    }

    const add = e => {
      var n = e.children.length - 1
      if (!limitMax(n)) {
        Data.push(items.default)

        e.appendChild(html(({div}) => div({
          class: 'my-3'
        }, it(items, {
          resolve: data => {
            Data[n] = data
            submit(Data)
          }
        }))))
        n = n + 1
      }
      setLimits(e, n)
    }
    
    const el = html(({fieldset, legend, span, button, i}) => fieldset([
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
            var n = e.children.length - 1
            if (!limitMin(n)) {
              e.removeChild(e.lastChild)
              Data.pop()
              n = n - 1
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
    return html(({
      table, tbody, thead, tr, td, th, span, div, button, i, input
    }) => {
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

      const toLink = (links, rel) => (links || [])
        .filter(l => !rel || l.rel == rel)
        .map(l => link(l))

      const totals = watch == null ? null : tr([
        td({
          class: 'text-center align-middle data-checked'
        }),
        (items.links || []).map(() => td()),
        Object.keys(items.properties || {}).map(key =>
          td({
            class: 'text-center align-middle data-'+key
          })
        )
      ])
      var prevent = false

      const resolveTotals = () => {
        if (!totals || !watch || prevent) {
          return
        }
        totals.querySelectorAll('td').forEach(e => {
          e.textContent = '\u200b'
        })
        Promise.resolve(watch()).then(data => {
          if (data && typeof data == 'object') {
            Object.keys(data).forEach(key => {
              totals.querySelectorAll('td.data-'+key).forEach(x => {
                x.textContent = data[key]
              })
            })
          }
        })
      }

      resolveTotals()

      return table({
        class: [
          'table',
          'table-bordered',
          'table-center',
          schema.default == null ? '' : 'table-striped',
          schema.default == null ? '' : 'table-hover'
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
          inline(toLink(links, 'self')),
          inline(toLink(links, 'alternate')),
          inline(toLink(links, 'search')),
          totals,
          tr([
            watch == null ? null : th({
              class: 'text-center align-middle'
            }, button({
              class: 'btn btn-success btn-sm',
              click: ev => {
                prevent = true
                ev.target
                  .closest('table')
                  .querySelector('tbody')
                  .querySelectorAll('input[type=checkbox]')
                  .forEach(cb => {
                    cb.click()
                  })
                prevent = false
                resolveTotals()
              }
            }, [
              i({
                class: 'fas fa-check'
              })
            ])),
            (items.links || []).map(l => th({
              class: 'text-center align-middle'
            }, l.links && l.links.length ? l.links.map(x => link({
              ...l,
              links: null,
              ...x
            })) : [
              link({
                ...l,
                href: ''
              })
            ])),
            Object.keys(items.properties || {}).map(key => {
              const {
                title,
                description,
                links
              } = items.properties[key]

              return th({
                class: 'text-center align-middle'
              }, [
                toLink(links, 'alternate'),
                span({
                  title: description
                }, title == null ? key : title),
                toLink(links, 'self')
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
            watch == null ? null : td({
              class: 'text-center align-middle'
            }, [
              input({
                class: 'form-check-input',
                type: 'checkbox',
                click: ev => {
                  row.checked = ev.target.checked
                  watch(row)
                  resolveTotals()
                },
                checked: row.checked
              })
            ]),
            (items.links || []).map(l => td({
              class: 'text-center align-middle'
            }, [
              link({
                ...l,
                href: interpolate(l.href, row),
                title: l.fas ? '' : l.title,
                links: null
              })
            ])),
            Object.keys(items.properties || {}).map(key => {
              const P = items.properties[key]
              var text = 'text-center'
              const parent = (event, value) => {
                if (event == 'text') {
                  text = 'text-'+value
                }
              }
              const el = it({
                ...P,
                href: interpolate(P.href, row),
                default: row[key]
              }, {parent})

              return td({
                class: [
                  text,
                  'align-middle'
                ]
              }, el)
            })
          ]))
        ])
      ])
    })
  }
}
