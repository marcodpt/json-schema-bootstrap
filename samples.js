//import schema from './src/schema.js'
import resolver from './resolver.js'
import data from './data/rows.js'
import table from './data/table.js'
import form from './data/form.js'
import item from './data/item.js'
import {builder} from './index.js'
import interfaces from './interfaces.js'

const callback = data => console.log(JSON.stringify(data, undefined, 2))

export default {
  title: 'Json Schema Bootstrap',
  gh: 'https://github.com/marcodpt/json-schema-bootstrap',
  element: builder({ui: interfaces}),
  samples: {
    nothing: {
      attributes: {}
    },
    emptyCard: {
      attributes: {
        ui: 'card'
      }
    },
    simple: {
      attributes: {
        description: 'Very simple schema.',
        ui: 'card'
      }
    },
    basic: {
      attributes: {
        title: 'Basic schema',
        description: 'Very simple schema.\nWith title!',
        ui: 'card'
      }
    },
    primary: {
      attributes: {
        title: 'primary',
        ui: 'primary'
      }
    },
    secondary: {
      attributes: {
        description: 'secondary',
        ui: 'secondary'
      }
    },
    success: {
      attributes: {
        title: 'success',
        description: 'Some alert sample!\nHope you enjoy it!',
        ui: 'success'
      }
    },
    danger: {
      attributes: {
        title: 'danger',
        ui: 'danger'
      }
    },
    warning: {
      attributes: {
        description: 'warning',
        ui: 'warning'
      }
    },
    info: {
      attributes: {
        title: 'info',
        description: 'Some alert sample!\nHope you enjoy it!',
        ui: 'info'
      }
    },
    light: {
      attributes: {
        title: 'light',
        ui: 'light'
      }
    },
    dark: {
      attributes: {
        description: 'dark',
        ui: 'dark'
      }
    },
    dataNone: {
      attributes: {
        ui: 'data'
      }
    },
    dataNull: {
      attributes: {
        default: null,
        ui: 'data'
      }
    },
    dataFalse: {
      attributes: {
        default: false,
        ui: 'data'
      }
    },
    dataTrue: {
      attributes: {
        default: true,
        ui: 'data'
      }
    },
    data7: {
      attributes: {
        default: 7,
        ui: 'data'
      }
    },
    dataPi: {
      attributes: {
        default: 3.14,
        ui: 'data'
      }
    },
    dataDog: {
      attributes: {
        default: 'dog',
        ui: 'data'
      }
    },
    dataText: {
      attributes: {
        default: 'This is a multi-line text!\nHope everything works right :)!',
        ui: 'data'
      }
    },
    dataObject: {
      attributes: {
        default: {
          id: 3,
          name: 'John'
        },
        ui: 'data'
      }
    },
    dataArray: {
      attributes: {
        default: ['cat', 'dog', 'horse'],
        ui: 'data'
      }
    },
    string0: {
      attributes: {
        default: 'test string',
        ui: 'string'
      }
    },
    string1: {
      attributes: {
        config: {
          callback: callback
        },
        default: 'test',
        ui: 'string',
        minLength: 5
      }
    },
    string2: {
      attributes: {
        config: {
          callback: callback,
          showValid: true,
          language: 'pt'
        },
        ui: 'string',
        minLength: 5,
        title: 'pt',
        description: 'This time showValid: true, pt: true, name: pt'
      }
    },
    string3: {
      attributes: {
        config: {
          callback: callback
        },
        ui: 'string',
        default: 'mama mia',
        minLength: 5
      }
    },
    text0: {
      attributes: {
        default: 'test string.\nFor text ui!',
        ui: 'text'
      }
    },
    text1: {
      attributes: {
        config: {
          callback: callback
        },
        default: 'test',
        ui: 'text',
        minLength: 5
      }
    },
    text2: {
      attributes: {
        config: {
          callback: callback,
          showValid: true,
          language: 'pt'
        },
        ui: 'text',
        minLength: 5,
        title: 'pt',
        description: 'This time showValid: true, pt: true, name: pt'
      }
    },
    text3: {
      attributes: {
        config: {
          callback: callback
        },
        ui: 'text',
        default: 'mama mia',
        minLength: 5
      }
    },
    color0: {
      attributes: {
        default: "#aaaaaa",
        ui: 'color'
      }
    },
    color1: {
      attributes: {
        config: {
          callback: callback
        },
        ui: 'color',
        default: '#888888',
        pattern: '^#[a-f].{5}$'
      }
    },
    color2: {
      attributes: {
        config: {
          callback: callback,
          showValid: true,
          language: 'pt'
        },
        ui: 'color',
        type: 'string',
        pattern: '^#[a-f].{5}$',
        title: 'Favorite Color',
        description: 'Choose your favorite color'
      }
    },
    color3: {
      attributes: {
        config: {
          callback: callback
        },
        ui: 'color',
        default: '#ffffff',
        pattern: '^#[a-f].{5}$'
      }
    },
    range0: {
      attributes: {
        default: 3.1415,
        ui: 'range'
      }
    },
    range1: {
      attributes: {
        config: {
          callback: callback
        },
        title: "debt",
        type: "number",
        ui: "range",
        default: 10,
        minimum: 1000,
        maximum: 10000,
        multipleOf: 0.01
      }
    },
    range2: {
      attributes: {
        config: {
          callback: callback,
          showValid: true,
          language: 'pt'
        },
        title: "debt",
        description: 'Something to pay for',
        type: "number",
        ui: "range",
        minimum: 1000,
        maximum: 10000,
        multipleOf: 0.01
      }
    },
    range3: {
      attributes: {
        config: {
          callback: callback
        },
        ui: 'range',
        title: "Children",
        type: "integer",
        default: 0,
        minimum: 0,
        maximum: 20,
        multipleOf: 1
      }
    },
    integer0: {
      attributes: {
        default: 7,
        ui: 'integer'
      }
    },
    integer1: {
      attributes: {
        config: {
          callback: callback
        },
        ui: "integer",
        title: "Age",
        type: "integer",
        default: 9,
        minimum: 18,
        maximum: 99,
        multipleOf: 1
      }
    },
    integer2: {
      attributes: {
        config: {
          callback: callback,
          showValid: true,
          language: 'pt'
        },
        ui: "integer",
        title: "Age",
        type: "integer",
        minimum: 18,
        maximum: 99,
        multipleOf: 1
      }
    },
    integer3: {
      attributes: {
        config: {
          callback: callback
        },
        ui: 'integer',
        title: "Age",
        default: 30,
        minimum: 18,
        maximum: 99,
        multipleOf: 1
      }
    },
    number0: {
    pi: {
      title: "Pi",
      type: "number",
      default: 3.1415926535,
      href: "https://www.google.com/search?q=pi+digits"
    },
      attributes: {
        default: 3.1415,
        ui: 'number'
      }
    },
    number1: {
      attributes: {
        config: {
          callback: callback
        },
        ui: "number",
        default: 500,
        minimum: 1000,
        maximum: 10000,
        multipleOf: 0.01
      }
    },
    number2: {
      attributes: {
        config: {
          callback: callback,
          showValid: true,
          language: 'pt'
        },
        ui: "number",
        title: "salary",
        description: 'Enter your salary...',
        type: "number",
        minimum: 1000,
        maximum: 10000,
        multipleOf: 0.01
      }
    },
    number3: {
      attributes: {
        config: {
          callback: callback
        },
        ui: 'number',
        default: 3000,
        minimum: 1000,
        maximum: 10000,
        multipleOf: 0.01
      }
    },
    /*inline: {
      attributes: {
        schema: inline,
        submit: data => new Promise(resolve => {
          setTimeout(() => {
            resolve({
              schema: {
                description: JSON.stringify(data, undefined, 2),
                format: 'success'
              }
            })
          }, 2000)
        }),
        resolver: resolver,
        valid: true
      }
    },
    input: {
      attributes: {
        schema: form,
        submit: data => {
          window.alert(JSON.stringify(data, undefined, 2))
        },
        resolver: resolver,
        valid: true
      }
    },
    item: {
      attributes: {
        schema: item
      }
    },
    table: {
      attributes: {
        schema: {
          ...table,
          default: data
        }
      }
    },
    loading: {
      attributes: {
        schema: table
      }
    }*/
  }
}
