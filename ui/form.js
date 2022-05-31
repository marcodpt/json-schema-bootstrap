import {html} from '../dependencies.js'
import {copy, interpolate, dependencies} from '../lib.js'

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
  readOnly,
  properties,
  ...schema
}, submit, {
  it,
  loader
}) => {
  const P = properties || {}
  const O = {}
  const Err = []
  const Data = copy(schema.default || {})
  const Watch = {}
  const Deps = {}
  const Cache = {}
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
      if (Cache[start] !== undefined) {
        cb(Cache[start])
      } else {
        Cache[start] = null
        Promise
          .resolve(loader(start))
          .then(data => {
            Cache[start] = data
            const end = interpolate(href, Data)
            if (start == end) {
              cb(data)
            }
          })
      }
    }
  }

  if (submit) {
    Object.keys(P).forEach(key => {
      if (P[key].default !== undefined) {
        Data[key] = copy(P[key].default)
      }
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
      O[key].reject = () => {
        const i = Err.indexOf(key)
        if (i < 0) {
          Err.push(key)
        }
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
      }
    })

    submit(Data)
  }

  const el = html(({fieldset, legend}) => fieldset([
    !title || submit ? null : legend({
      title: description
    }, title),
    Object.keys(P).map(key => wrapper(it, {
      default: (schema.default || {})[key],
      ...P[key]
    }, O[key])),
    description && (!title || submit) ? it({
      ui: 'info',
      description: description
    }) : null
  ]))

  if (submit && !readOnly) {
    var pending = false
    const setButton = (ev, error) => {
      const b = ev.target.closest('form')
        .querySelector('button[type=submit]')
      if (b) {
        if (error) {
          b.classList.remove('btn-primary')
          b.classList.add('btn-danger')
        } else {
          b.classList.remove('btn-danger')
          b.classList.add('btn-primary')
        }

        if (!error && !pending) {
          b.classList.remove('disabled')
        } else {
          b.classList.add('disabled')
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
    }

    return html(({form, button, i}) => form({
      novalidate: true,
      submit: ev => {
        ev.preventDefault()
        ev.stopPropagation()
        console.log(Data)

        if (!Err.length) {
          pending = true
          setButton(ev, false)
          Promise.resolve(submit(Data))
            .then(msg => {
              pending = false
              setButton(ev, msg ? true : false)
            })
            .catch(err => {
              pending = false
              setButton(ev, true)
              throw err
            })
        } else {
          setButton(ev, true)
        }
      }
    }, [
      el,
      button({
        type: 'submit',
        class: 'btn btn-primary',
        blur: ev => setButton(ev, false)
      }, [
        i({
          class: 'fas fa-check'
        }),
        ' Submit'
      ])
    ]))
  } else {
    return el
  }
}
