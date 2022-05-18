import {html} from '../../dependencies.js'
import link from '../link.js'
import {interpolate} from '../lib.js'
import {input as typeahead} from '../input/typeahead.js'

export default ({
  title,
  description,
  links,
  items,
  ...schema
}) => html(({table, tbody, thead, tr, td, th, span, div}) => {
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
        .map(p => p instanceof Array ? typeahead(p.reduce((S, l) => {
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
          default: ''
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
        }, row[key]))
      ]))
    ])
  ])
})
