import {html} from '../dependencies.js'
import {copy, interpolate, dependencies} from '../lib.js'
import submitter from '../submitter.js'
import link from '../link.js'

const wrapper = (it, {
  title,
  description,
  ...schema
}, options) => html(({div, label}) => div({
  class: ['row', 'my-3']
}, [
  !title ? null : div({
    class: 'col-md-3'
  }, [
    label({
      class: 'form-label',
      title: description
    }, title)
  ]),
  div({
    class: [
      'col-md-'+(title ? 9 : 12)
    ]
  }, [
    it({
      ...schema,
      ...(!title ? {description} : {})
    }, options)
  ])
]))

export default ({
  title,
  description,
  properties,
  links,
  ...schema
}, submit, {
  it,
  loader,
  root,
  cache,
  translations
}) => {
  const linker = link(it, translations)
  const P = properties || {}
  const O = {}
  const Err = []
  const Data = copy(schema.default || {})
  const Watch = {}
  const Deps = {}
  const Callbacks = {}
  const getter = key => {
    const cb = Callbacks[key]
    const href = P[key].href

    if (!cb || !href) {
      return
    } else if ((Deps[key] || []).reduce((err, dep) =>
      err || Data[dep] === undefined || Err.indexOf(dep) >= 0
    , false)) {
      cb(null)
    } else {
      cb(null)
      const start = interpolate(href, Data)
      if (cache[start] !== undefined) {
        cb(cache[start])
      } else {
        cache[start] = null
        Promise
          .resolve(loader(start))
          .then(data => {
            cache[start] = data
            const end = interpolate(href, Data)
            if (start == end) {
              cb(data)
            }
          })
      }
    }
  }

  Object.keys(P).forEach(key => {
    if (P[key].default !== undefined) {
      Data[key] = copy(P[key].default)
    }
  })

  if (submit) {
    Object.keys(P).forEach(key => {
      if (P[key].href) {
        Deps[key] = dependencies(P[key].href)
        Deps[key].forEach(dep => {
          if (Watch[dep] == null) {
            Watch[dep] = []
          }
          if (Watch[dep].indexOf(key) == -1) {
            Watch[dep].push(key)
          }
        })
      }
      O[key] = {}
      if (P[key].href) {
        O[key].update = callback => {
          Callbacks[key] = callback
          getter(key)
        }
      }
      O[key].reject = (err, data) => {
        const i = Err.indexOf(key)
        if (i < 0) {
          Err.push(key)
        }
        Data[key] = data
      }
    })

    Object.keys(P).forEach(key => {
      O[key].resolve = data => {
        const i = Err.indexOf(key)
        if (i >= 0) {
          Err.splice(i, 1)
        }
        Data[key] = data
        if (Watch[key]) {
          Watch[key].forEach(k => getter(k))
        }
        if (!root) {
          submit(Data)
        }
      }
    })

    if (!root) {
      submit(Data)
    }
  }

  const el = button => html(({fieldset, legend, div}) => {
    const L = (links || [])
      .map(l => linker({
        ...l,
        href: submit ? l.href : interpolate(l.href, Data)
      }))
      .concat(button ? [button] : [])
      .map(e => div({
        class: 'col-auto'
      }, e))

    return fieldset([
      !title ? null : legend({
        title: submit ? null : description
      }, title),
      Object.keys(P).map(key => wrapper(it, {
        default: Data[key],
        title: key,
        ...P[key],
        href: submit ? P[key].href : interpolate(P[key].href, Data)
      }, O[key])),
      description && (!title || submit) ? it({
        ui: 'info',
        description: description
      }) : null,
      !L.length ? null : div({
        class: 'row g-3 align-items-center'
      }, L)
    ])
  })

  if (submit && root) {
    return html(({form, button, i, div}) => form({
      novalidate: true,
      submit: ev => {
        ev.preventDefault()
        ev.stopPropagation()
        return false
      }
    }, [
      el(submitter({
        label: translations.label,
        submit: () => Promise.resolve(submit(Data)).then(msg => {
          if (msg) {
            throw 'Form do not pass validation!'
          }
        })
      }))
    ]))
  } else {
    return el()
  }
}
