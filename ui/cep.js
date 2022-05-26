import {html} from '../dependencies.js'
import {jsonp, control} from '../lib.js'

export default control(({
  title,
  description,
  ...schema
}, submit) => html(({input, div}) => div([
  input({
    class: 'form-control',
    type: 'text',
    name: title,
    placeholder: description,
    value: schema.default,
    keyup: ev => {
      const e = ev.target
      const p = e.parentNode
      const t = p.querySelector('.form-text')
      const f = p.querySelector('.valid-feedback')

      var v = e.value.replace(/[^\d]+/g,'')

      if (v === '') {
        submit(null)
      } else if (v.length != 8) {
        submit(v)
        t.textContent = ''
        t.classList.add('d-none')
      } else {
        submit(true)
        t.textContent = 'Carregando...'
        t.classList.remove('d-none')
        e.disabled = true
        jsonp(`https://viacep.com.br/ws/${v}/json/`).then(data => {
          if (data.erro) {
            throw "Erro viacep: "+data.erro
          }
          submit(data)
          t.classList.remove('d-none')
          t.textContent = `
            ${data.localidade} - ${data.uf},
            ${data.bairro},
            ${data.logradouro} ${data.complemento}
          `
          e.disabled = false
        }).catch(err => {
          console.log(err)
          e.disabled = false
          submit(false)
          t.textContent = ''
          t.classList.add('d-none')
        })
      }
    } 
  }),
  div({
    class: 'form-text d-none'
  })
])), null, {
  validator: (value, msg) => {
    if (value === true) {
      return null
    } else if (value === undefined) {
      return `
        Erro ao buscar o CEP.
        Verifique se foi digitado corretamente
        e sua conexão com a internet está ativa! 
      `
    } else if (typeof value === "string") {
      return 'Digite um CEP válido'
    } else {
      return msg
    }
  },
  input: 'input'
})
