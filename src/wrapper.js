import {html} from '../dependencies.js'

export default children => ({
  title,
  description,
  ...extra
}) => html(({div, label}) => div({
  class: ['row', 'my-3']
}, [
  !title ? null : div({
    class: 'col-md-3'
  }, [
    label({
      class: 'form-label',
      title: description
    }, title)
  ]),
  div({
    class: [
      'col-md-'+(title ? 9 : 12)
    ]
  }, [
    children({
      ...extra,
      ...(!title ? {description} : {})
    })
  ])
]))
