import {element} from '../../dependencies.js'
import alert from '../alert.js'

export default element(({fieldset, legend}, {
  title,
  description,
  ...schema
}, children) => fieldset([
  !title ? null : legend(title),
  children,
  !description ? null : alert({
    type: "object",
    description: description
  })
]))
