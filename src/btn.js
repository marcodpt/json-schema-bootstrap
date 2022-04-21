const getText = ev => window.alert(ev.target.textContent)

export default {
  title: 'Btn',
  gh: 'https://github.com/marcodpt/bootstrap-elements',
  element: ({button, a}, {
    bg = 'primary',
    size = '',
    outline = false,
    ...props
  } = {}, children) => (typeof props.href == "string" ? a : button)({
    ...props,
    class: [
      'btn',
      'btn-'+(outline ? 'outline-' : '')+bg,
      size ? 'btn-'+size : '',
      !props.click && !props.onclick && !props.href ? 'disabled' : ''
    ]
  }, children),
  samples: {
    primary: {
      attributes: {
        click: getText
      },
      children: 'Primary'
    },
    secondary: {
      attributes: {
        bg: 'secondary',
        click: getText
      },
      children: 'Secondary'
    },
    success: {
      attributes: {
        bg: 'success',
        click: getText
      },
      children: 'Success'
    },
    danger: {
      attributes: {
        bg: 'danger',
        click: getText
      },
      children: 'Danger'
    },
    warning: {
      attributes: {
        bg: 'warning',
        click: getText
      },
      children: 'Warning'
    },
    info: {
      attributes: {
        bg: 'info',
        click: getText
      },
      children: 'Info'
    },
    light: {
      attributes: {
        bg: 'light',
        click: getText
      },
      children: 'Light'
    },
    dark: {
      attributes: {
        bg: 'dark',
        click: getText
      },
      children: 'Dark'
    },
    link: {
      attributes: {
        bg: 'link',
        click: getText
      },
      children: 'Link'
    },
    disabled: {
      attributes: {},
      children: 'Disabled'
    },
    outline: {
      attributes: {
        outline: true,
        click: getText
      },
      children: 'Outline'
    },
    small: {
      attributes: {
        size: 'sm',
        click: getText
      },
      children: 'Small'
    },
    large: {
      attributes: {
        size: 'lg',
        click: getText
      },
      children: 'Large'
    },
    hash: {
      attributes: {
        href: '#'
      },
      children: 'Hash'
    },
    linkDisabled: {
      attributes: {
        href: ''
      },
      children: 'Link Disabled'
    }
  }
}
