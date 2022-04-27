import field from '../field.js'

const jsonp = uri => {
  return new Promise((resolve, reject) => {
    var id = '_' + Math.round(10000 * Math.random())
    var callbackName = 'jsonp_callback_' + id
    window[callbackName] = data => {
      delete window[callbackName]
      var ele = document.getElementById(id)
      ele.parentNode.removeChild(ele)
      resolve(data)
    }

    var src = uri+(uri.indexOf('?') !== -1 ? '&' : '?')+
        'callback='+callbackName
    var script = document.createElement('script')
    script.src = src
    script.id = id
    script.addEventListener('error', reject)
    document.body.appendChild(script)
  })
}

export default field(({input, div}, {
  title,
  description,
  change,
  ...schema
}) => [
  input({
    class: 'form-control validate',
    type: 'text',
    placeholder: !title ? description : null,
    value: schema.default,
    keyup: ev => {
      const e = ev.target
      const p = e.parentNode
      const t = p.querySelector('.form-text')
      const f = p.querySelector('.valid-feedback')

      var v = e.value.replace(/[^\d]+/g,'')

      if (v.length != 8) {
        change(p, null, () => 'Digite um CEP válido')
        t.textContent = ''
        f.textContent = ''
      } else {
        change(p, null, () => '')
        t.textContent = 'Carregando...'
        f.textContent = ''
        e.disabled = true
        jsonp(`https://viacep.com.br/ws/${v}/json/`).then(data => {
          if (data.erro) {
            throw "Erro viacep: "+data.erro
          }
          change(p, data)
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
          change(p, null, () => `
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
])
