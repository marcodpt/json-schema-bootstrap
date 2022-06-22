import {html} from './dependencies.js'
import modal from './modal.js'
import {hasType, interpolate} from './lib.js'
import lang from './lang/index.js'

export default (it, {close, label}) => {
  const info = ({title, icon, href}) => html(({i}) => [
    !icon ? null : i({class: icon}),
    icon && title ? ' ' : '',
    title,
    !icon && !title && href ? '_' : ''
  ])

  const link = ({
    links,
    ...hyperschema
  }) => {
    const {
      title,
      description,
      href,
      hrefSchema,
      ui,
      icon
    } = hyperschema
    if (links && links.length) {
      return html(({div, button, ul, li, a, i}) => div({
        class: 'btn-group'
      }, [
        !href ? null : link(hyperschema),
        button({
          class: [
            ui,
            'dropdown-toggle',
            !href ? null : 'dropdown-toggle-split'
          ],
          dataBsToggle: 'dropdown'
        }, href ? [] : info({title, icon})),
        ul({
          class: 'dropdown-menu'
        }, links.map(l => link({
          ...l,
          links: null,
          ui: 'dropdown-item'
        })))
      ]))
    } else {
      if (hrefSchema) {
        const {type} = hrefSchema
        if (
          !hasType(type, "object") &&
          !hasType(type, "array") &&
          hrefSchema.properties == null &&
          hrefSchema.items == null
        ) {
          var oldData = undefined
          return it(hrefSchema, {
            resolve: data => {
              oldData = data
              if (data == oldData) {
                setTimeout(() => {
                  const target = interpolate(href, data)
                  const base = 'javascript:'
                  const l = base.length
                  if (target.substr(0, l) == base) {
                    eval(target.substr(l))
                  } else {
                    window.location.href = target
                  }
                }, 500)
              }
            }
          })
        }
      }

      return html(({a, button, i}) => (hrefSchema ? button : a)({
        class: [
          ui,
          !href ? 'disabled' : ''
        ],
        href: hrefSchema ? null : href,
        click: !hrefSchema ? null : () => {
          var Data = undefined
          modal({
            close,
            label,
            title: title || hrefSchema.title,
            size: 'lg',
            submit: () => {
              if (Data) {
                window.location.href = interpolate(href, Data)
              } else {
                throw 'Fill all fields correctly!'
              }
            }
          }, it({
            ...hrefSchema,
            title: undefined
          }, {
            resolve: data => {
              Data = data
            },
            reject: () => {
              Data = undefined
            }
          }))
        },
        title: description
      }, info({title, icon, href})))
    }
  }

  return link
}
