export default {
  title: 'Spinner',
  gh: 'https://github.com/marcodpt/bootstrap-elements',
  element: ({div, span}, {
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
  }),
  samples: {
    default: {
      attributes: {}
    },
    inline: {
      attributes: {
        inline: true
      }
    },
    primary: {
      attributes: {
        color: 'primary'
      }
    },
    secondary: {
      attributes: {
        color: 'secondary'
      }
    },
    success: {
      attributes: {
        color: 'success'
      }
    },
    danger: {
      attributes: {
        color: 'danger'
      }
    },
    warning: {
      attributes: {
        color: 'warning'
      }
    },
    info: {
      attributes: {
        color: 'info'
      }
    },
    light: {
      attributes: {
        color: 'light'
      }
    },
    dark: {
      attributes: {
        color: 'dark'
      }
    },
    grow: {
      attributes: {
        grow: true
      }
    },
    inlineGrow: {
      attributes: {
        inline: true,
        grow: true
      }
    },
    primaryGrow: {
      attributes: {
        color: 'primary',
        grow: true
      }
    },
    secondaryGrow: {
      attributes: {
        color: 'secondary',
        grow: true
      }
    },
    successGrow: {
      attributes: {
        color: 'success',
        grow: true
      }
    },
    dangerGrow: {
      attributes: {
        color: 'danger',
        grow: true
      }
    },
    warningGrow: {
      attributes: {
        color: 'warning',
        grow: true
      }
    },
    infoGrow: {
      attributes: {
        color: 'info',
        grow: true
      }
    },
    lightGrow: {
      attributes: {
        color: 'light',
        grow: true
      }
    },
    darkGrow: {
      attributes: {
        color: 'dark',
        grow: true
      }
    },
    Small: {
      attributes: {
        size: 'sm'
      }
    },
    Large: {
      attributes: {
        size: 'lg'
      }
    },
    '2x': {
      attributes: {
        size: 2
      }
    },
    '3x': {
      attributes: {
        size: 3
      }
    },
    '5x': {
      attributes: {
        size: 5
      }
    },
    '7x': {
      attributes: {
        size: 7
      }
    },
    '11x': {
      attributes: {
        size: 11
      }
    },
    SmallGrow: {
      attributes: {
        size: 'sm',
        grow: true
      }
    },
    LargeGrow: {
      attributes: {
        size: 'lg',
        grow: true
      }
    },
    '2xGrow': {
      attributes: {
        size: 2,
        grow: true
      }
    },
    '3xGrow': {
      attributes: {
        size: 3,
        grow: true
      }
    },
    '5xGrow': {
      attributes: {
        size: 5,
        grow: true
      }
    },
    '7xGrow': {
      attributes: {
        size: 7,
        grow: true
      }
    },
    '11xGrow': {
      attributes: {
        size: 11,
        grow: true
      }
    }
  }
}
