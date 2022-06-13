import {html} from '../dependencies.js'
import link from '../link.js'
import data from './data.js'

export default ({
  title,
  description,
  links,
  format,
  ...schema
}, submit, {it, translations}) => {
  const linker = link(it, translations)

  return html(({div, p}) => !title && !description ? null : div({
    class: [
      'card'
    ]
  }, [
    !title ? null : div({
      class: 'card-header'
    }, [
      title
    ]),
    !description && !links && schema.default === undefined ? null : div({
      class: 'card-body'
    }, [
      !description ? null : format ? it({
        ui: format, 
        description: description
      }) : p({
        class: 'card-text',
        style: {
          whiteSpace: 'pre-wrap'
        }
      }, description),
      data(schema),
    ].concat((links || []).map(l => linker(l))))
  ]))
}
