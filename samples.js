export default {
  title: 'Alert',
  gh: 'https://github.com/marcodpt/element',
  element: ({div}, attrs, children) => div({
    class: [
      'alert',
      'alert-'+attrs.type
    ]
  }, children),
  samples: {
    success: {
      attributes: {
        type: 'success'
      },
      children: "This is a success alert"
    },
    warning: {
      attributes: {
        type: 'warning'
      },
      children: "This is a warning alert"
    },
    danger: {
      attributes: {
        type: 'danger'
      },
      children: "This is a danger alert"
    }
  }
}
