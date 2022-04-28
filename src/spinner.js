import {element} from '../dependencies.js'

export default element(({div, span}, {
  color = '',
  size = '',
  grow = false,
  inline = false
} = {}) => (inline ? span : div)({
  role: 'status',
  class: [
    'spinner-'+(grow ? 'grow' : 'border'),
    color ? 'text-'+color : '',
    !size || typeof size != "string" ? '' :
      'spinner-'+(grow ? 'grow' : 'border')+'-'+size,
  ],
  style: {
    width: size && typeof size == "number" ? size+'rem' : null,
    height: size && typeof size == "number" ? size+'rem' : null
  }
}))
