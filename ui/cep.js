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
    input: ev => {
      const e = ev.target
      const p = e.parentNode
      const t = p.querySelector('.form-text')
      const f = p.querySelector('.valid-feedback')

      var v = e.value.replace(/[^\d]+/g,'')

      if (v === '') {
        submit(null)
      } else if (v.length != 8) {
        submit(v, () => 'Digite um CEP válido')
        t.textContent = ''
        t.classList.add('d-none')
      } else {
        submit(null)
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
          submit(null, () => `
            Erro ao buscar o CEP.
            Verifique se foi digitado corretamente
            e sua conexão com a internet está ativa! 
          `)
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
  input: 'input'
})
