import data from './data/rows.js'
import table from './data/table.js'
import form from './data/form.js'
import item from './data/item.js'
import element from './index.js'
import countries from './data/countries.js'
import cities_us from './data/cities_us.js'
import cities_cn from './data/cities_cn.js'
import cities_br from './data/cities_br.js'
import roles from './data/roles.js'
import image from './data/base64_image.js'
import audio from './data/base64_audio.js'
import video from './data/base64_video.js'
import {html} from './dependencies.js'
import docsTable from './data/docs_table.js'
import docsForm from './data/docs_form.js'

const DB = {
  countries,
  cities_cn,
  cities_us,
  cities_br,
  roles
}

const resolve = data => console.log(JSON.stringify(data, undefined, 2))
const update = (data, time) => callback => {
  callback(null)
  setTimeout(() => callback(data), time)
}
const Totals = {
  checked: 0,
  id: data.length,
  balance: 0
}
const W = []
const watch = (row) => {
  if (!row) {
    console.log('resolveTotals...')
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(Totals)
        console.log('resolved')
      }, 2000)
    })
  } else {
    const i = W.indexOf(row.id)
    if (i < 0) {
      W.push(row.id)
      Totals.balance += row.balance
    } else {
      W.splice(i, 1)
      Totals.balance -= row.balance
    }
    Totals.checked = W.length
    Totals.balance = Math.round(100 * Totals.balance) / 100
    console.log(W)
  }
}

export default {
  title: 'Json Schema Bootstrap',
  gh: 'https://github.com/marcodpt/json-schema-bootstrap',
  element: element,
  samples: {
    docsForm: {
      attributes: docsForm
    },
    docsTable: {
      attributes: docsTable
    },
    login: {
      attributes: {
        schema: {
          properties: {
            user: {
              minLength: 1
            },
            password: {
              format: 'password',
              minLength: 3
            }
          }
        },
        options: {
          showValid: true,
          resolve: ({user, password}, e) => {
            console.log('user: '+user)
            console.log('password: '+password)
            if (user == 'John' && password == 'john') {
              e.replaceWith(element({
                schema: {
                  title: 'Access',
                  description: 'Welcome John!',
                  ui: 'card',
                  format: 'success'
                }
              }))
            } else {
              e.replaceWith(element({
                schema: {
                  title: 'Error',
                  description: 'Access denied for user: '+user,
                  ui: 'card',
                  format: 'danger'
                }
              }))
            }
          }
        }
      }
    },
    form: {
      attributes: {
        schema: form,
        options: {
          resolve: data => new Promise(resolve => {
            setTimeout(() => {
              window.alert(JSON.stringify(data, undefined, 2))
              resolve()
            }, 2000)
          }),
          loader: url => new Promise((resolve, reject) => {
            setTimeout(() => {
              if (DB[url] == null) {
                resolve(true)
              } else {
                resolve(DB[url])
              }
            }, 2000)
          }),
          language: 'pt'
        }
      }
    },
    watch: {
      attributes: {
        schema: {
          title: 'Watch sample',
          properties: {
            country: {
              title: "Country",
              default: "fr",
              href: "countries",
              ui: "typeahead"
            }
          }
        },
        options: {
          language: 'pt',
          loader: url => new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve(DB[url])
            }, 2000)
          }),
          watch: row => {
            console.log(row)
          }
        }
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
        },
        options: {
          language: 'pt',
          watch: watch
        }
      }
    },
    loading: {
      attributes: {
        schema: table
      }
    },
    nothing: {
      attributes: {}
    },
    emptyCard: {
      attributes: {
        schema: {
          ui: 'card'
        }
      }
    },
    simple: {
      attributes: {
        schema: {
          description: 'Very simple schema.',
          ui: 'card'
        }
      }
    },
    basic: {
      attributes: {
        schema: {
          title: 'Basic schema',
          description: 'Very simple schema.\nWith title!',
          ui: 'card'
        }
      }
    },
    basicWithLinks: {
      attributes: {
        schema: {
          title: 'Basic schema',
          description: 'Very simple schema.\nWith title and links!',
          ui: 'card',
          links: [
            {
              href: '#back',
              icon: 'fas fa-arrow-left',
              title: 'Back',
              ui: 'btn btn-secondary me-1'
            }, {
              href: '#submit',
              icon: 'fas fa-check',
              title: 'Submit',
              ui: 'btn btn-primary'
            }
          ]
        }
      }
    },
    confirm: {
      attributes: {
        schema: {
          title: 'Confirm',
          description: 'Do you confirm the action?',
          ui: 'card',
          format: 'info',
          links: [
            {
              href: '#back',
              icon: 'fas fa-times',
              title: 'Cancel',
              ui: 'btn btn-secondary me-1'
            }, {
              href: '#submit',
              icon: 'fas fa-check',
              title: 'Submit',
              ui: 'btn btn-primary'
            }
          ]
        }
      }
    },
    error: {
      attributes: {
        schema: {
          title: 'Error',
          description: 'Some strange error...',
          ui: 'card',
          format: 'danger',
          links: [
            {
              href: '#close',
              icon: 'fas fa-times',
              title: 'Close',
              ui: 'btn btn-secondary'
            }
          ]
        }
      }
    },
    pass: {
      attributes: {
        schema: {
          title: 'Success',
          description: 'Eveything worked fine!',
          ui: 'card',
          format: 'success',
          links: [
            {
              href: '#close',
              icon: 'fas fa-times',
              title: 'Close',
              ui: 'btn btn-secondary'
            }
          ]
        }
      }
    },
    primary: {
      attributes: {
        schema: {
          title: 'primary',
          ui: 'primary'
        }
      }
    },
    secondary: {
      attributes: {
        schema: {
          description: 'secondary',
          ui: 'secondary'
        }
      }
    },
    success: {
      attributes: {
        schema: {
          title: 'success',
          description: 'Some alert sample!\nHope you enjoy it!',
          ui: 'success'
        }
      }
    },
    danger: {
      attributes: {
        schema: {
          title: 'danger',
          ui: 'danger'
        }
      }
    },
    warning: {
      attributes: {
        schema: {
          description: 'warning',
          ui: 'warning'
        }
      }
    },
    info: {
      attributes: {
        schema: {
          title: 'info',
          description: 'Some alert sample!\nHope you enjoy it!',
          ui: 'info'
        }
      }
    },
    light: {
      attributes: {
        schema: {
          title: 'light',
          ui: 'light'
        }
      }
    },
    dark: {
      attributes: {
        schema: {
          description: 'dark',
          ui: 'dark'
        }
      }
    },
    dataNone: {
      attributes: {
        schema: {
          ui: 'data'
        }
      }
    },
    dataNoneLink: {
      attributes: {
        schema: {
          ui: 'data',
          href: '#dataNone'
        }
      }
    },
    dataNull: {
      attributes: {
        schema: {
          default: null,
          ui: 'data'
        }
      }
    },
    dataNullLink: {
      attributes: {
        schema: {
          default: null,
          ui: 'data',
          href: '#dataNull'
        }
      }
    },
    dataFalse: {
      attributes: {
        schema: {
          default: false,
          ui: 'data'
        }
      }
    },
    dataFalseLink: {
      attributes: {
        schema: {
          default: false,
          ui: 'data',
          href: '#dataFalse'
        }
      }
    },
    dataTrue: {
      attributes: {
        schema: {
          default: true,
          ui: 'data'
        }
      }
    },
    dataTrueLink: {
      attributes: {
        schema: {
          default: true,
          ui: 'data',
          href: '#dataTrue'
        }
      }
    },
    data7: {
      attributes: {
        schema: {
          default: 7,
          ui: 'data'
        }
      }
    },
    data7Link: {
      attributes: {
        schema: {
          default: 7,
          ui: 'data',
          href: '#data7'
        }
      }
    },
    dataPi: {
      attributes: {
        schema: {
          default: 3.14,
          ui: 'data'
        }
      }
    },
    dataPiLink: {
      attributes: {
        schema: {
          default: 3.14,
          ui: 'data',
          href: '#dataPi'
        }
      }
    },
    dataDog: {
      attributes: {
        schema: {
          default: 'dog',
          ui: 'data'
        }
      }
    },
    dataDogLink: {
      attributes: {
        schema: {
          default: 'dog',
          ui: 'data',
          href: '#dataDog'
        }
      }
    },
    dataBlankLink: {
      attributes: {
        schema: {
          default: '',
          ui: 'data',
          href: '#dataBlank'
        }
      }
    },
    dataText: {
      attributes: {
        schema: {
          default: [
            'This is a multi-line text!',
            'Hope everything works right :)!'
          ].join('\n'),
          ui: 'data'
        }
      }
    },
    dataTextLink: {
      attributes: {
        schema: {
          default: [
            'This is a multi-line text!',
            'Hope everything works right :)!'
          ].join('\n'),
          ui: 'data',
          href: '#dataText'
        }
      }
    },
    dataObject: {
      attributes: {
        schema: {
          default: {
            id: 3,
            name: 'John'
          },
          ui: 'data'
        }
      }
    },
    dataObjectLink: {
      attributes: {
        schema: {
          default: {
            id: 3,
            name: 'John'
          },
          ui: 'data',
          href: '#dataObject'
        }
      }
    },
    dataArray: {
      attributes: {
        schema: {
          default: ['cat', 'dog', 'horse'],
          ui: 'data'
        }
      }
    },
    dataArrayLink: {
      attributes: {
        schema: {
          default: ['cat', 'dog', 'horse'],
          ui: 'data',
          href: '#dataArray'
        }
      }
    },
    string0: {
      attributes: {
        schema: {
          default: 'test string',
          ui: 'string'
        }
      }
    },
    string1: {
      attributes: {
        options: {
          resolve: resolve
        },
        schema: {
          default: 'test',
          ui: 'string',
          minLength: 5
        }
      }
    },
    string2: {
      attributes: {
        options: {
          resolve: resolve,
          showValid: true,
          language: 'pt'
        },
        schema: {
          ui: 'string',
          minLength: 5,
          title: 'pt',
          description: 'This time showValid: true, pt: true, name: pt'
        }
      }
    },
    string3: {
      attributes: {
        options: {
          resolve: resolve
        },
        schema: {
          ui: 'string',
          default: 'mama mia',
          minLength: 5
        }
      }
    },
    password0: {
      attributes: {
        schema: {
          default: 'test',
          ui: 'password'
        }
      }
    },
    password1: {
      attributes: {
        options: {
          resolve: resolve
        },
        schema: {
          default: 'test',
          ui: 'password',
          minLength: 5
        }
      }
    },
    password2: {
      attributes: {
        options: {
          resolve: resolve,
          showValid: true,
          language: 'pt'
        },
        schema: {
          ui: 'password',
          minLength: 5,
          title: 'pt',
          description: 'This time showValid: true, pt: true, name: pt'
        }
      }
    },
    password3: {
      attributes: {
        options: {
          resolve: resolve
        },
        schema: {
          ui: 'password',
          default: 'mama mia',
          minLength: 5
        }
      }
    },
    text0: {
      attributes: {
        schema: {
          default: 'test string.\nFor text ui!',
          ui: 'text'
        }
      }
    },
    text1: {
      attributes: {
        options: {
          resolve: resolve
        },
        schema: {
          default: 'test',
          ui: 'text',
          minLength: 5
        }
      }
    },
    text2: {
      attributes: {
        options: {
          resolve: resolve,
          showValid: true,
          language: 'pt'
        },
        schema: {
          ui: 'text',
          minLength: 5,
          title: 'pt',
          description: 'This time showValid: true, pt: true, name: pt'
        }
      }
    },
    text3: {
      attributes: {
        options: {
          resolve: resolve
        },
        schema: {
          ui: 'text',
          default: 'mama mia',
          minLength: 5
        }
      }
    },
    color0: {
      attributes: {
        schema: {
          default: "#aaaaaa",
          ui: 'color'
        }
      }
    },
    color1: {
      attributes: {
        options: {
          resolve: resolve
        },
        schema: {
          ui: 'color',
          default: '#888888',
          pattern: '^#[a-f].{5}$'
        }
      }
    },
    color2: {
      attributes: {
        options: {
          resolve: resolve,
          showValid: true,
          language: 'pt'
        },
        schema: {
          ui: 'color',
          type: 'string',
          pattern: '^#[a-f].{5}$',
          title: 'Favorite Color',
          description: 'Choose your favorite color'
        }
      }
    },
    color3: {
      attributes: {
        options: {
          resolve: resolve
        },
        schema: {
          ui: 'color',
          default: '#ffffff',
          pattern: '^#[a-f].{5}$'
        }
      }
    },
    range0: {
      attributes: {
        schema: {
          default: 3.1415,
          ui: 'range'
        }
      }
    },
    range1: {
      attributes: {
        options: {
          resolve: resolve
        },
        schema: {
          title: "debt",
          type: "number",
          ui: "range",
          default: 10,
          minimum: 1000,
          maximum: 10000,
          multipleOf: 0.01
        }
      }
    },
    range2: {
      attributes: {
        options: {
          resolve: resolve,
          showValid: true,
          language: 'pt'
        },
        schema: {
          title: "debt",
          description: 'Something to pay for',
          type: "number",
          ui: "range",
          minimum: 1000,
          maximum: 10000,
          multipleOf: 0.01
        }
      }
    },
    range3: {
      attributes: {
        options: {
          resolve: resolve
        },
        schema: {
          ui: 'range',
          title: "Children",
          type: "integer",
          default: 0,
          minimum: 0,
          maximum: 20,
          multipleOf: 1
        }
      }
    },
    integer0: {
      attributes: {
        schema: {
          default: 7,
          ui: 'integer'
        }
      }
    },
    integer1: {
      attributes: {
        options: {
          resolve: resolve
        },
        schema: {
          ui: "integer",
          title: "Age",
          type: "integer",
          default: 9,
          minimum: 18,
          maximum: 99,
          multipleOf: 1
        }
      }
    },
    integer2: {
      attributes: {
        options: {
          resolve: resolve,
          showValid: true,
          language: 'pt'
        },
        schema: {
          ui: "integer",
          title: "Age",
          type: "integer",
          minimum: 18,
          maximum: 99,
          multipleOf: 1
        }
      }
    },
    integer3: {
      attributes: {
        options: {
          resolve: resolve
        },
        schema: {
          ui: 'integer',
          title: "Age",
          default: 30,
          minimum: 18,
          maximum: 99,
          multipleOf: 1
        }
      }
    },
    number0: {
      attributes: {
        schema: {
          default: 3.1415,
          ui: 'number'
        }
      }
    },
    number1: {
      attributes: {
        options: {
          resolve: resolve
        },
        schema: {
          ui: "number",
          default: 500,
          minimum: 1000,
          maximum: 10000,
          multipleOf: 0.01
        }
      }
    },
    number2: {
      attributes: {
        options: {
          resolve: resolve,
          showValid: true,
          language: 'pt'
        },
        schema: {
          ui: "number",
          title: "salary",
          description: 'Enter your salary...',
          type: "number",
          minimum: 1000,
          maximum: 10000,
          multipleOf: 0.01
        }
      }
    },
    number3: {
      attributes: {
        options: {
          resolve: resolve
        },
        schema: {
          ui: 'number',
          default: 3000,
          minimum: 1000,
          maximum: 10000,
          multipleOf: 0.01
        }
      }
    },
    bool00: {
      attributes: {
        schema: {
          default: false,
          ui: 'boolean'
        }
      }
    },
    bool01: {
      attributes: {
        schema: {
          default: true,
          ui: 'switch'
        }
      }
    },
    bool02: {
      attributes: {
        schema: {
          default: true,
          ui: 'checkbox'
        }
      }
    },
    bool03: {
      attributes: {
        schema: {
          default: null,
          ui: 'boolean'
        }
      }
    },
    bool04: {
      attributes: {
        schema: {
          ui: 'checkbox'
        }
      }
    },
    bool1: {
      attributes: {
        options: {
          resolve: resolve
        },
        schema: {
          ui: "boolean",
          title: "Accept conditions",
          default: false,
          const: true,
          error: "You must accept conditions."
        }
      }
    },
    bool2: {
      attributes: {
        options: {
          resolve: resolve,
          showValid: true,
          language: 'pt'
        },
        schema: {
          ui: "checkbox",
          title: "Accept conditions",
          const: true,
          error: "You must accept conditions."
        }
      }
    },
    bool3: {
      attributes: {
        options: {
          resolve: resolve
        },
        schema: {
          ui: 'switch',
          title: 'Subscribe newsletter',
          type: 'boolean',
          default: false
        }
      }
    },
    multiple0: {
      attributes: {
        schema: {
          default: ['dog', 'cat'],
          ui: 'multiple'
        }
      }
    },
    multiple1: {
      attributes: {
        options: {
          resolve: resolve
        },
        schema: {
          ui: 'multiple',
          default: [],
          items: {
            enum: ['horse', 'dog', 'fish', 'cat', 'bird']
          },
          minItems: 2
        }
      }
    },
    multiple2: {
      attributes: {
        options: {
          resolve: resolve,
          showValid: true,
          language: 'pt'
        },
        schema: {
          ui: 'multiple',
          format: 'switch',
          default: ['dog', 'cat'],
          items: {
            enum: ['horse', 'dog', 'fish', 'cat', 'bird'],
            labels: ['Horse', 'DOG', 'Fish']
          },
          minItems: 2
        }
      }
    },
    multiple3: {
      attributes: {
        options: {
          resolve: resolve
        },
        schema: {
          ui: 'multiple',
          default: ['dog', 'cat'],
          items: {
            enum: ['horse', 'dog', 'fish', 'cat', 'bird']
          },
          minItems: 2
        }
      }
    },
    cnpjcpf00: {
      attributes: {
        schema: {
          default: '171.395.530-09',
          ui: 'cnpjcpf'
        }
      }
    },
    cnpjcpf01: {
      attributes: {
        schema: {
          default: '02891141016',
          ui: 'cnpjcpf'
        }
      }
    },
    cnpjcpf02: {
      attributes: {
        schema: {
          default: 2891141016,
          ui: 'cnpjcpf'
        }
      }
    },
    cnpjcpf03: {
      attributes: {
        schema: {
          default: '09569041000178',
          ui: 'cnpjcpf'
        }
      }
    },
    cnpjcpf04: {
      attributes: {
        schema: {
          default: 9569041000178,
          ui: 'cnpjcpf'
        }
      }
    },
    cnpjcpf05: {
      attributes: {
        schema: {
          default: true,
          ui: 'cnpjcpf'
        }
      }
    },
    cnpjcpf1: {
      attributes: {
        options: {
          resolve: resolve
        },
        schema: {
          ui: 'cnpjcpf',
          default: '79418083000194',
          pattern: '^(|[0-9]{11}|[0-9]{14})$'
        }
      }
    },
    cnpjcpf2: {
      attributes: {
        options: {
          resolve: resolve,
          showValid: true,
          language: 'pt'
        },
        schema: {
          ui: "cnpjcpf",
          title: "cnpjcpf",
          description: 'Enter your CPF...',
          pattern: '^(|[0-9]{11}|[0-9]{14})$'
        }
      }
    },
    cnpjcpf3: {
      attributes: {
        options: {
          resolve: resolve
        },
        schema: {
          ui: 'cnpjcpf',
          default: '79418083000193',
          pattern: '^(|[0-9]{11}|[0-9]{14})$'
        }
      }
    },
    rg00: {
      attributes: {
        schema: {
          default: '27.750.976-2',
          ui: 'rg'
        }
      }
    },
    rg01: {
      attributes: {
        schema: {
          default: '277509762',
          ui: 'rg'
        }
      }
    },
    rg02: {
      attributes: {
        schema: {
          default: 277509762,
          ui: 'rg'
        }
      }
    },
    rg03: {
      attributes: {
        schema: {
          default: true,
          ui: 'rg'
        }
      }
    },
    rg1: {
      attributes: {
        options: {
          resolve: resolve,
          showValid: true,
          language: 'pt'
        },
        schema: {
          ui: "rg",
          title: "rg",
          description: 'Digite seu RG',
          default: ''
        }
      }
    },
    rg2: {
      attributes: {
        options: {
          resolve: resolve
        },
        schema: {
          ui: 'rg',
          default: ''
        }
      }
    },
    tel00: {
      attributes: {
        options: {
          language: 'pt'
        },
        schema: {
          default: '(47) 97251-7410',
          ui: 'tel'
        }
      }
    },
    tel01: {
      attributes: {
        options: {
          language: 'pt'
        },
        schema: {
          default: '47972517410',
          ui: 'tel'
        }
      }
    },
    tel02: {
      attributes: {
        options: {
          language: 'pt'
        },
        schema: {
          default: 47972517410,
          ui: 'tel'
        }
      }
    },
    tel03: {
      attributes: {
        options: {
          language: 'pt'
        },
        schema: {
          default: '(21) 3563-5323',
          ui: 'tel'
        }
      }
    },
    tel04: {
      attributes: {
        options: {
          language: 'pt'
        },
        schema: {
          default: '2135635323',
          ui: 'tel'
        }
      }
    },
    tel05: {
      attributes: {
        options: {
          language: 'pt'
        },
        schema: {
          default: 2135635323,
          ui: 'tel'
        }
      }
    },
    tel06: {
      attributes: {
        options: {
          language: 'pt'
        },
        schema: {
          default: true,
          ui: 'tel'
        }
      }
    },
    tel1: {
      attributes: {
        options: {
          resolve: resolve,
          showValid: true,
          language: 'pt'
        },
        schema: {
          ui: "tel",
          title: "tel",
          description: 'Digite seu Telefone',
          default: ''
        }
      }
    },
    tel2: {
      attributes: {
        options: {
          resolve: resolve
        },
        schema: {
          ui: 'tel',
          default: ''
        }
      }
    },
    cep00: {
      attributes: {
        schema: {
          default: '01001-001',
          ui: 'cep'
        }
      }
    },
    cep01: {
      attributes: {
        schema: {
          default: '01001001',
          ui: 'cep'
        }
      }
    },
    cep02: {
      attributes: {
        schema: {
          default: 1001001,
          ui: 'cep'
        }
      }
    },
    cep03: {
      attributes: {
        schema: {
          default: true,
          ui: 'cep'
        }
      }
    },
    cep1: {
      attributes: {
        options: {
          resolve: resolve,
          showValid: true,
          language: 'pt'
        },
        schema: {
          ui: "cep",
          title: "cep",
          description: 'Enter your CEP...',
          type: ['object', 'null'],
          default: null
        }
      }
    },
    cep2: {
      attributes: {
        options: {
          resolve: resolve
        },
        schema: {
          ui: 'cep',
          type: ['object', 'null'],
          default: null
        }
      }
    },
    file0: {
      attributes: {
        schema: {
          default: {
            data: 'Hello world!',
            name: 'sample.txt',
            mime: 'text/plain'
          },
          ui: 'file'
        }
      }
    },
    file1: {
      attributes: {
        options: {
          resolve: resolve,
          showValid: true,
          language: 'pt'
        },
        schema: {
          ui: "file",
          title: "image",
          description: 'some image...',
          type: ['object', 'null'],
          default: null
        }
      }
    },
    file2: {
      attributes: {
        options: {
          resolve: resolve
        },
        schema: {
          ui: 'file',
          type: 'array',
          default: [],
          minItems: 1,
          maxItems: 3
        }
      }
    },
    file3: {
      attributes: {
        options: {
          resolve: resolve
        },
        schema: {
          ui: 'file',
          type: ['array', 'object', 'null'],
          minItems: 1,
          maxItems: 3
        }
      }
    },
    dateA: {
      attributes: {
        schema: {
          ui: 'date',
          default: "2020-01-02"
        }
      }
    },
    dateB: {
      attributes: {
        schema: {
          ui: 'date',
          default: ""
        }
      }
    },
    dateC: {
      attributes: {
        schema: {
          ui: 'date',
          default: 0
        }
      }
    },
    dateD: {
      attributes: {
        schema: {
          ui: 'date',
          default: 1648771200
        }
      }
    },
    dateE: {
      attributes: {
        options: {
          language: 'en'
        },
        schema: {
          ui: 'date',
          default: "2020-01-02"
        }
      }
    },
    dateF: {
      attributes: {
        options: {
          language: 'pt'
        },
        schema: {
          ui: 'date',
          default: ""
        }
      }
    },
    dateG: {
      attributes: {
        options: {
          language: 'pt'
        },
        schema: {
          ui: 'date',
          default: 0
        }
      }
    },
    dateH: {
      attributes: {
        options: {
          language: 'pt'
        },
        schema: {
          ui: 'date',
          default: 1648771200
        }
      }
    },
    date1: {
      attributes: {
        options: {
          resolve: resolve,
          showValid: true,
          language: 'pt'
        },
        schema: {
          ui: 'date',
          title: 'date',
          description: 'some date',
          type: 'integer',
          minimum: 1648771200,
          maximum: 1651276800,
          default: 1638771200
        }
      }
    },
    date2: {
      attributes: {
        options: {
          resolve: resolve
        },
        schema: {
          ui: 'date',
          title: 'date',
          description: 'some date',
          type: 'integer',
          minimum: 1648771200,
          maximum: 1651276800
        }
      }
    },
    date3: {
      attributes: {
        options: {
          resolve: resolve,
          showValid: true,
          language: 'pt'
        },
        schema: {
          ui: 'date',
          maximum: 1651276800,
          default: 1649771200
        }
      }
    },
    date4: {
      attributes: {
        options: {
          resolve: resolve
        },
        schema: {
          ui: 'date',
          type: 'string',
          minimum: "2022-03-01",
          maximum: "2022-05-01",
          default: "2022-02-01"
        }
      }
    },
    date5: {
      attributes: {
        options: {
          resolve: resolve,
          showValid: true,
          language: 'pt'
        },
        schema: {
          ui: 'date',
          title: 'date',
          description: 'some date',
          type: 'string',
          minimum: "2022-03-01",
          maximum: "2022-05-01"
        }
      }
    },
    date6: {
      attributes: {
        options: {
          resolve: resolve
        },
        schema: {
          ui: 'date',
          title: 'date',
          description: 'some date',
          type: 'string',
          minimum: "2022-03-01",
          maximum: "2022-05-01",
          default: "2022-04-01"
        }
      }
    },
    typeaheadStatic: {
      attributes: {
        schema: {
          default: "Test",
          ui: 'typeahead'
        }
      }
    },
    typeaheadEmpty: {
      attributes: {
        options: {
          resolve: resolve,
          showValid: true,
          language: 'pt'
        },
        schema: {
          ui: "typeahead",
          title: "primes",
          enum: []
        }
      }
    },
    typeaheadEmptyDefault: {
      attributes: {
        options: {
          resolve: resolve,
          showValid: true,
          language: 'pt'
        },
        schema: {
          ui: "typeahead",
          title: "primes",
          enum: [],
          default: 7
        }
      }
    },
    typeaheadSport: {
      attributes: {
        options: {
          resolve: resolve
        },
        schema: {
          ui: "typeahead",
          title: "Sport",
          default: "soccer"
        }
      }
    },
    typeaheadConstLabel: {
      attributes: {
        options: {
          resolve: resolve,
          showValid: true,
          language: 'pt'
        },
        schema: {
          ui: "typeahead",
          title: "primes",
          label: 'x = 7',
          default: 7
        }
      }
    },
    typeaheadPrimesEmpty: {
      attributes: {
        options: {
          resolve: resolve,
          showValid: true,
          language: 'pt'
        },
        schema: {
          ui: "typeahead",
          title: "primes",
          enum: [2, 3, 5, 7, 11, 13, 17, 19]
        }
      }
    },
    typeaheadPrimesWrong: {
      attributes: {
        options: {
          resolve: resolve,
          showValid: true,
          language: 'pt'
        },
        schema: {
          ui: "typeahead",
          title: "primes",
          enum: [2, 3, 5, 7, 11, 13, 17, 19],
          default: 4
        }
      }
    },
    typeaheadPrimesWrongLabel: {
      attributes: {
        options: {
          resolve: resolve,
          showValid: true,
          language: 'pt'
        },
        schema: {
          ui: "typeahead",
          title: "primes",
          enum: [2, 3, 5, 7, 11, 13, 17, 19],
          label: 'x: {}',
          default: 4
        }
      }
    },
    typeaheadPrimes: {
      attributes: {
        options: {
          resolve: resolve,
          showValid: true,
          language: 'pt'
        },
        schema: {
          ui: "typeahead",
          title: "primes",
          enum: [2, 3, 5, 7, 11, 13, 17, 19],
          default: 7
        }
      }
    },
    typeaheadPrimesLabel: {
      attributes: {
        options: {
          resolve: resolve,
          showValid: true,
          language: 'pt'
        },
        schema: {
          ui: "typeahead",
          title: "primes",
          enum: [2, 3, 5, 7, 11, 13, 17, 19],
          default: 7,
          label: 'x: {}'
        }
      }
    },
    typeaheadPrimesShortWrong: {
      attributes: {
        options: {
          resolve: resolve,
          showValid: true,
          language: 'pt'
        },
        schema: {
          ui: "typeahead",
          title: "primes",
          enum: [2],
          default: 0
        }
      }
    },
    typeaheadPets: {
      attributes: {
        options: {
          resolve: resolve
        },
        schema: {
          ui: "typeahead",
          title: "pets",
          description: "Choose your favorite pet...",
          enum: ["", "dog", "cat", "horse"]
        }
      }
    },
    typeaheadPetsWrong: {
      attributes: {
        options: {
          resolve: resolve
        },
        schema: {
          ui: "typeahead",
          title: "pets",
          description: "Choose your favorite pet...",
          enum: ["", "dog", "cat", "horse"],
          default: "bird"
        }
      }
    },
    typeaheadPetsDefault: {
      attributes: {
        options: {
          resolve: resolve
        },
        schema: {
          ui: "typeahead",
          title: "pets",
          description: "Choose your favorite pet...",
          enum: ["", "dog", "cat", "horse"],
          default: "cat"
        }
      }
    },
    typeaheadPetsWrongLabels: {
      attributes: {
        options: {
          resolve: resolve
        },
        schema: {
          ui: "typeahead",
          title: "pets",
          description: "Choose your favorite pet...",
          enum: ["", "dog", "cat", "horse"],
          labels: ["Dog", "Cat"],
          default: "bird"
        }
      }
    },
    typeaheadPetsDefaultLabels: {
      attributes: {
        options: {
          resolve: resolve
        },
        schema: {
          ui: "typeahead",
          title: "pets",
          description: "Choose your favorite pet...",
          enum: ["", "dog", "cat", "horse"],
          labels: ["Dog", "Cat"],
          default: "cat"
        }
      }
    },
    typeaheadRole: {
      attributes: {
        options: {
          resolve: resolve,
          update: update(roles, 0)
        },
        schema: {
          ui: "typeahead",
          title: "Role",
          description: "List of roles..."
        }
      }
    },
    typeaheadRoleWrong: {
      attributes: {
        options: {
          resolve: resolve,
          update: update(roles, 0)
        },
        schema: {
          ui: "typeahead",
          title: "Role",
          description: "List of roles...",
          default: "teacher"
        }
      }
    },
    typeaheadRoleDefault: {
      attributes: {
        options: {
          resolve: resolve,
          update: update(roles, 0)
        },
        schema: {
          ui: "typeahead",
          title: "Role",
          description: "List of roles...",
          default: "sysadmin"
        }
      }
    },
    typeaheadCountry: {
      attributes: {
        options: {
          resolve: resolve,
          update: update(countries, 2000),
          showValid: true
        },
        schema: {
          ui: "typeahead",
          title: "Country",
          description: "Choose a country..."
        }
      }
    },
    typeaheadCountryWrong: {
      attributes: {
        options: {
          resolve: resolve,
          update: update(countries, 2000)
        },
        schema: {
          ui: "typeahead",
          title: "Country",
          default: "fr",
          enum: ['cn', 'br', 'us'],
          description: "Choose a country..."
        }
      }
    },
    typeaheadCountryDefault: {
      attributes: {
        options: {
          resolve: resolve,
          update: update(countries, 2000)
        },
        schema: {
          ui: "typeahead",
          title: "Country",
          default: "cn",
          description: "Choose a country..."
        }
      }
    },
    typeaheadCity: {
      attributes: {
        options: {
          resolve: resolve,
          update: callback => {
            callback(null)
            setTimeout(() => callback(cities_cn), 2000)
            setTimeout(() => callback(cities_br), 7000)
            setTimeout(() => callback(cities_us), 12000)
          }
        },
        schema: {
          ui: "typeahead",
          title: "City"
        }
      }
    },
    typeaheadCityWrong: {
      attributes: {
        options: {
          resolve: resolve,
          update: callback => {
            callback(null)
            setTimeout(() => callback(cities_br), 2000)
            setTimeout(() => callback(cities_us), 7000)
            setTimeout(() => callback(cities_cn), 12000)
          }
        },
        schema: {
          ui: "typeahead",
          title: "City",
          default: 8
        }
      }
    },
    typeaheadCityDefault: {
      attributes: {
        options: {
          resolve: resolve,
          update: callback => {
            callback(null)
            setTimeout(() => callback(cities_us), 2000)
            setTimeout(() => callback(cities_cn), 7000)
            setTimeout(() => callback(cities_br), 12000)
          }
        },
        schema: {
          ui: "typeahead",
          title: "City",
          default: 1
        }
      }
    },
    imageLink: {
      attributes: {
        schema: image
      }
    },
    imageCard: {
      attributes: {
        schema: {
          ...image,
          description: null,
          ui: 'card'
        }
      }
    },
    imageSrc: {
      attributes: {
        schema: {
          ...image,
          href: null,
          data: image.href
        }
      }
    },
    audio: {
      attributes: {
        schema: audio
      }
    },
    audioCard: {
      attributes: {
        schema: {
          ...audio,
          description: null,
          ui: 'card'
        }
      }
    },
    audioSrc: {
      attributes: {
        schema: {
          ...audio,
          href: null,
          data: audio.href
        }
      }
    },
    video: {
      attributes: {
        schema: video
      }
    },
    videoCard: {
      attributes: {
        schema: {
          ...video,
          description: null,
          ui: 'card'
        }
      }
    },
    videoSrc: {
      attributes: {
        schema: {
          ...video,
          href: null,
          data: video.href
        }
      }
    },
    extendUiWrong: {
      attributes: {
        schema: {
          title: 'extendUiWrong',
          description: [
            'This is a sample with wrong new ui usage!',
            'This will work with default card!'
          ].join('\n'),
          ui: 'newui'
        }
      }
    },
    extendUi: {
      attributes: {
        schema: {
          title: 'extend UI',
          description: [
            'This is a sample with new ui usage!'
          ].join('\n'),
          ui: 'newui'
        },
        options: {
          interfaces: {
            newui: ({title, description}) => html(({div, h1, p}) =>
              div({
                class: 'container'
              }, [
                h1({
                  class: 'display-1'
                }, title),
                p({
                  class: 'lead'
                }, description)
              ])
            )
          } 
        }
      }
    },
    extendUiRaw: {
      attributes: {
        schema: {
          title: 'extend UI with raw HTML',
          description: [
            'This is a sample with new ui usage with raw HTML!'
          ].join('\n'),
          ui: 'raw'
        },
        options: {
          interfaces: {
            raw: ({title, description}) => `
              <div class="container">
                <h1 class="display-1">${title}</h1>
                <p class="lead">${description}</p>
              </div>
            `
          } 
        }
      }
    },
    overrideUi: {
      attributes: {
        schema: {
          title: 'override UI',
          description: [
            'This is a sample that override default null UI!'
          ].join('\n')
        },
        options: {
          interfaces: {
            null: ({title, description}) => `
              <div class="container">
                <h1 class="display-1">${title}</h1>
                <p class="lead">${description}</p>
              </div>
            `
          } 
        }
      }
    }
  }
}
