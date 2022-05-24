import {html} from '../dependencies.js'

export default ({
  title,
  description,
  ...schema
}) => html(({div, h5}) => div({
  class: 'card'
}, [
  div({
    class: 'card-body',
    style: {
      whiteSpace: 'pre-wrap'
    }
  }, [
    !title ? null : h5({
      class: 'card-title'
    }, title),
    description
  ])
]))
