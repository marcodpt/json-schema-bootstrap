import {html} from '../dependencies.js'
import {control} from '../lib.js'

export default control(({
  title,
  description,
  ...schema
}, submit) => html(({textarea}) => textarea({
  class: 'form-control',
  rows: 6,
  name: title,
  placeholder: description,
  keyup: ev => submit(ev.target.value) 
}, schema.default)), null, {
  parent: {
    text: 'left'
  }
})
