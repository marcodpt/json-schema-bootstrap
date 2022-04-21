export default ({div}, {type, description}) => !description ? null : div({
  class: [
    'alert',
    'alert-'+type == "null" ? "danger" : (
      type == "object" ? "info" : "success"
    )
  ],
  style: {
    whiteSpace: 'pre-wrap'
  },
  role: 'alert'
}, description)
