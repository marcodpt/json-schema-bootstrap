import {html} from '../../dependencies.js'

export default ({
  title,
  description,
  ...schema
}) => html(({table, tbody, thead, td, th}) => {
  return table({
    class: ''
  }, [
    thead(),
    tbody()
  ])
})
