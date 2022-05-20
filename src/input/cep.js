import {html} from '../../dependencies.js'
import {jsonp} from '../lib.js'
import control from '../control.js'
import wrap from '../wrap.js'

export default wrap(control(({
  title,
  description,
  change,
  ...schema
}) => html(({input, div}) => [
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

      if (v.length != 8) {
        change(null, () => 'Digite um CEP válido')
        t.textContent = ''
        f.textContent = ''
      } else {
        change(null, () => '')
        t.textContent = 'Carregando...'
        f.textContent = ''
        e.disabled = true
        jsonp(`https://viacep.com.br/ws/${v}/json/`).then(data => {
          if (data.erro) {
            throw "Erro viacep: "+data.erro
          }
          change(data)
          t.textContent = ''
          f.textContent = `
            ${data.localidade} - ${data.uf},
            ${data.bairro},
            ${data.logradouro} ${data.complemento}
          `
          e.disabled = false
        }).catch(err => {
          console.log(err)
          e.disabled = false
          change(null, () => `
            Erro ao buscar o CEP.
            Verifique se foi digitado corretamente
            e sua conexão com a internet está ativa! 
          `)
          t.textContent = ''
          f.textContent = ''
        })
      }
    } 
  }),
  div({
    class: 'form-text'
  }),
  div({
    class: 'valid-feedback'
  })
])))
